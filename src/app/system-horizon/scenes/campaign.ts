import { HorizonStop, HorizonWorld, isReadable } from '../content/horizon-world';
import { ITEM_ROW } from '../content/horizon-map';
import { Renderer, VIEW } from '../engine/renderer';
import { SheetSpec } from '../engine/sprite-sheet';
import { Art, SHEETS } from '../world/assets';
import { campaignTrailY, drawCampaignTerrain } from '../world/campaign-terrain';
import { PlayerPose } from '../world/entities';
import { Palette } from '../world/palette';

/** Passo do jogador por tick (36 px/s a 12 fps). */
export const CAMPAIGN_SPEED = 3;
/** Distância (px) em que uma parada fica "próxima" e pode ser lida. */
export const NEAR_RADIUS = 12;
/** Duração da formação do MC-CART na forja (~1,8 s). */
export const FORGE_TICKS = 22;
/** O jogador para à esquerda da forja (o altar fica à vista durante a formação). */
const FORGE_STAND = 12;
/** O texto do mirante dá lugar a A CAMPANHA CONTINUA... depois de ~2 s. */
const HORIZON_CAPTION_TICKS = 24;
/** Margem do jogador em relação às bordas do mundo. */
const EDGE = 8;
/** Posição do jogador na tela (a câmera segue). */
const CAMERA_LEAD = 64;
/** Para onde as especialidades coletadas voam: o HUD, acima da tela. */
const HUD_POINT = { x: 152, y: -6 } as const;

/**
 * Marcadores do jogo (`sh-markers.png`, build-campaign.mjs): quadros 12 × 24, pivot nos pés.
 * 0 placa · 1 placa lida · 2 checkpoint · 3 checkpoint ativo · 4 forja · 5 forja acesa · 6 selo
 * "não lido" · 7 MC-001 no pedestal · 8 MC-CART no pedestal.
 */
export const MARKERS: SheetSpec = {
  file: 'sh-markers.png',
  frameWidth: 12,
  frameHeight: 24,
  frames: 9,
  columns: 9,
  pivot: { x: 6, y: 23 },
};
const FRAME = {
  plate: 0,
  plateRead: 1,
  flag: 2,
  flagUp: 3,
  forge: 4,
  forgeLit: 5,
  badge: 6,
  cart: 8,
} as const;

/** Arte do jogo: a do teaser + a folha de marcadores (sem ela, formas simples no lugar). */
export interface CampaignArt extends Art {
  readonly markers: CanvasImageSource | null;
}

export interface CampaignOptions {
  /** Sem parallax nem flutuação; a formação do MC-CART vai direto ao resultado. */
  readonly reducedMotion?: boolean;
}

/** O que a cena avisa à página (que traduz em DOM, região viva e painéis). */
export type CampaignEvent =
  | { readonly type: 'act'; readonly act: number }
  | { readonly type: 'near'; readonly stop: HorizonStop | null }
  | { readonly type: 'collected'; readonly stop: HorizonStop }
  | { readonly type: 'checkpoint'; readonly stop: HorizonStop }
  | { readonly type: 'unlocked'; readonly stop: HorizonStop }
  | { readonly type: 'arrived' };

/** Texto sobre a tela, em coordenadas nativas (160 × 120); `y` é o centro da linha. */
export interface CampaignCaption {
  readonly kind: 'stop' | 'unlocked' | 'serial' | 'horizon' | 'continues';
  readonly x: number;
  readonly y: number;
  readonly stop?: HorizonStop;
  readonly align?: 'start' | 'center';
}

interface Walker {
  x: number;
  pose: PlayerPose;
  poseTicks: number;
  facing: 1 | -1;
}

/**
 * Cena jogável do SYSTEM HORIZON (D-103, docs/23 §18): o visitante anda pelo mundo dos cinco atos,
 * coleta as quatro especialidades ao passar, lê os marcos (o painel é DOM, na página), ativa os
 * checkpoints, forma o MC-CART MC-001 na forja e chega ao mirante. Determinística por tick (o
 * estado só depende do mundo e da sequência de comandos): testável sem canvas.
 */
export class CampaignScene {
  tick = 0;
  private readonly player: Walker;
  private move: -1 | 0 | 1 = 0;
  private target: number | null = null;
  private readonly collectedAt = new Map<string, number>();
  private readonly checkpoints = new Set<string>();
  private readonly read = new Set<string>();
  private forgeAt = -1;
  private unlockedFlag = false;
  private arrivedAt = -1;
  private currentAct = -1;
  private nearStop: HorizonStop | null = null;
  private queue: CampaignEvent[] = [];
  /** Cor das formas mínimas (sem a folha de marcadores): token do design system. */
  private fallback = '';

  constructor(
    readonly world: HorizonWorld,
    private readonly options: CampaignOptions = {},
  ) {
    this.player = { x: world.startX, pose: 'idle', poseTicks: 0, facing: 1 };
  }

  // Comandos -----------------------------------------------------------------------------------

  /** Direção mantida pelo visitante (teclado ou botão pressionado); cancela a caminhada automática. */
  setMove(dir: -1 | 0 | 1): void {
    this.move = dir;
    if (dir) this.target = null;
  }

  /** Caminhada automática até `x` do mundo (toque na tela, "próximo marco"). */
  walkTo(x: number): void {
    this.target = this.clampX(x);
  }

  /** Vai até a próxima parada na direção (`1` à frente, `-1` atrás); devolve a parada ou `null`. */
  goToNext(dir: 1 | -1): HorizonStop | null {
    const x = this.player.x;
    const ahead = this.world.stops.filter((s) => (dir > 0 ? s.x > x + 2 : s.x < x - 2));
    const stop = dir > 0 ? ahead[0] : ahead[ahead.length - 1];
    if (stop) this.walkTo(stop.x);
    return stop ?? null;
  }

  markRead(id: string): void {
    this.read.add(id);
  }

  // Estado -------------------------------------------------------------------------------------

  get playerState(): Readonly<Walker> {
    return this.player;
  }

  get act(): number {
    return this.currentAct;
  }

  get near(): HorizonStop | null {
    return this.nearStop;
  }

  /** A formação do MC-CART está em curso (o jogador espera). */
  get forging(): boolean {
    return this.forgeAt >= 0;
  }

  get unlocked(): boolean {
    return this.unlockedFlag;
  }

  get arrived(): boolean {
    return this.arrivedAt >= 0;
  }

  isRead(id: string): boolean {
    return this.read.has(id);
  }

  isCollected(id: string): boolean {
    return this.collectedAt.has(id);
  }

  isCheckpoint(id: string): boolean {
    return this.checkpoints.has(id);
  }

  /** Eventos desde a última leitura. */
  drain(): CampaignEvent[] {
    const out = this.queue;
    this.queue = [];
    return out;
  }

  camera(): number {
    const max = this.world.width - VIEW.width;
    return Math.min(Math.max(Math.round(this.player.x - CAMERA_LEAD), 0), max);
  }

  /** Posição do mundo sob um ponto da tela (coordenada nativa). */
  worldX(screenX: number): number {
    return screenX + this.camera();
  }

  // Passo --------------------------------------------------------------------------------------

  step(): void {
    this.tick++;
    const p = this.player;
    let dir: -1 | 0 | 1 = 0;

    if (this.forgeAt >= 0) {
      if (this.tick - this.forgeAt >= FORGE_TICKS) this.finishForge();
    } else {
      dir = this.move;
      if (this.target !== null) {
        const dx = this.target - p.x;
        if (Math.abs(dx) <= CAMPAIGN_SPEED) {
          p.x = this.target;
          this.target = null;
          dir = 0;
        } else {
          dir = dx > 0 ? 1 : -1;
        }
      }
      if (dir) {
        p.x = this.clampX(p.x + dir * CAMPAIGN_SPEED);
        p.facing = dir;
      }
    }

    const pose: PlayerPose = dir
      ? 'walk'
      : this.arrived && this.nearStop?.kind === 'closing'
        ? 'look'
        : 'idle';
    p.poseTicks = pose === p.pose ? p.poseTicks + 1 : 0;
    p.pose = pose;

    this.touchStops();
    this.updateAct();
    this.updateNear();
  }

  private touchStops(): void {
    const x = this.player.x;
    for (const stop of this.world.stops) {
      if (
        stop.kind === 'collectible' &&
        !this.collectedAt.has(stop.id) &&
        Math.abs(x - stop.x) <= 6
      ) {
        this.collectedAt.set(stop.id, this.tick);
        this.queue.push({ type: 'collected', stop });
      } else if (stop.kind === 'checkpoint' && !this.checkpoints.has(stop.id) && x >= stop.x - 6) {
        this.checkpoints.add(stop.id);
        this.queue.push({ type: 'checkpoint', stop });
      } else if (
        stop.kind === 'forge' &&
        !this.unlockedFlag &&
        this.forgeAt < 0 &&
        x >= stop.x - FORGE_STAND
      ) {
        this.target = null;
        this.forgeAt = this.tick;
        if (this.options.reducedMotion) this.finishForge();
      } else if (stop.kind === 'closing' && this.arrivedAt < 0 && x >= stop.x - NEAR_RADIUS) {
        this.arrivedAt = this.tick;
        this.queue.push({ type: 'arrived' });
      }
    }
  }

  private finishForge(): void {
    const forge = this.world.stops.find((s) => s.kind === 'forge');
    this.forgeAt = -1;
    this.unlockedFlag = true;
    if (forge) this.queue.push({ type: 'unlocked', stop: forge });
  }

  private updateAct(): void {
    const x = this.player.x;
    let act = 0;
    this.world.acts.forEach((a, i) => x >= a.x && (act = i));
    if (act === this.currentAct) return;
    this.currentAct = act;
    this.queue.push({ type: 'act', act });
  }

  private updateNear(): void {
    let best: HorizonStop | null = null;
    if (!this.forging) {
      for (const stop of this.world.stops) {
        if (!isReadable(stop) || (stop.kind === 'forge' && !this.unlockedFlag)) continue;
        const d = Math.abs(this.player.x - stop.x);
        if (d <= NEAR_RADIUS && (!best || d < Math.abs(this.player.x - best.x))) best = stop;
      }
    }
    if (best === this.nearStop) return;
    this.nearStop = best;
    this.queue.push({ type: 'near', stop: best });
  }

  private clampX(x: number): number {
    return Math.min(Math.max(x, EDGE), this.world.width - EDGE * 2);
  }

  // Desenho ------------------------------------------------------------------------------------

  draw(r: Renderer, art: CampaignArt, palette: Palette): void {
    this.fallback = palette.orange;
    const cam = this.camera();
    const still = !!this.options.reducedMotion;
    drawCampaignTerrain(r, art, cam, this.world.finalStart, !still);
    this.world.stops.forEach((stop, i) => {
      const sx = stop.x - cam;
      if (sx < -16 || sx > VIEW.width + 16) return;
      this.drawStop(r, art, stop, sx, this.trail(stop.x), still ? 0 : this.bob(i));
    });
    const p = this.player;
    const name = p.pose === 'walk' ? 'playerWalk' : p.pose === 'look' ? 'playerLook' : 'playerIdle';
    const frame = Math.floor(p.poseTicks / (p.pose === 'walk' ? 2 : p.pose === 'look' ? 8 : 6));
    r.sprite(art.sheets[name], SHEETS[name], frame, p.x - cam, this.trail(p.x), p.facing < 0);
    if (this.forging) this.drawForging(r, art, cam);
  }

  captions(): readonly CampaignCaption[] {
    const cam = this.camera();
    const out: CampaignCaption[] = [];
    const near = this.nearStop;
    if (near && near.kind !== 'closing') {
      out.push({ kind: 'stop', stop: near, x: near.x - cam, y: this.trail(near.x) - 31 });
    }
    if (this.forging) {
      const s = this.tick - this.forgeAt;
      const forge = this.world.stops.find((st) => st.kind === 'forge');
      if (forge && s >= 10) {
        out.push({ kind: 'unlocked', x: 80, y: 18 });
        out.push({
          kind: 'serial',
          x: forge.x - cam + 16,
          y: this.trail(forge.x) - 40,
          align: 'start',
        });
      }
    }
    if (this.arrived) {
      const since = this.tick - this.arrivedAt;
      out.push(
        since < HORIZON_CAPTION_TICKS
          ? { kind: 'horizon', x: 80, y: 30 }
          : { kind: 'continues', x: 80, y: 30 },
      );
    }
    return out;
  }

  private trail(x: number): number {
    return campaignTrailY(x, this.world.finalStart);
  }

  private bob(i: number): number {
    return Math.floor((this.tick + i * 2) / 6) % 2;
  }

  private drawStop(
    r: Renderer,
    art: CampaignArt,
    stop: HorizonStop,
    x: number,
    y: number,
    bob: number,
  ): void {
    const unread = isReadable(stop) && !this.read.has(stop.id);
    switch (stop.kind) {
      case 'milestone':
        this.marker(r, art, unread ? FRAME.plate : FRAME.plateRead, x, y);
        break;
      case 'checkpoint':
        this.marker(r, art, this.checkpoints.has(stop.id) ? FRAME.flagUp : FRAME.flag, x, y);
        return;
      case 'cartridge':
        this.marker(r, art, FRAME.cart, x, y);
        break;
      case 'forge':
        this.marker(r, art, this.unlockedFlag ? FRAME.forgeLit : FRAME.forge, x, y);
        if (!this.unlockedFlag) return;
        r.sprite(art.sheets.cartMini, SHEETS.cartMini, 0, x - 6, y - 22);
        if (unread) this.marker(r, art, FRAME.badge, x, y - 4 - bob);
        return;
      case 'collectible':
        this.drawCollectible(r, art, stop, x, y, bob);
        return;
      case 'closing':
        // A placa do mirante já está na arte do chão; o selo fica sobre ela.
        if (unread) this.marker(r, art, FRAME.badge, x + 12, y - 7 - bob);
        return;
    }
    if (unread) this.marker(r, art, FRAME.badge, x, y - bob);
  }

  private drawCollectible(
    r: Renderer,
    art: CampaignArt,
    stop: HorizonStop & { kind: 'collectible' },
    x: number,
    y: number,
    bob: number,
  ): void {
    const row = ITEM_ROW[stop.group.id];
    const at = this.collectedAt.get(stop.id);
    if (at === undefined) {
      const glint = Math.floor(this.tick / 4) % 2;
      r.sprite(art.sheets.items, SHEETS.items, row * 2 + glint, x, y - 12 - bob);
      return;
    }
    const since = this.tick - at;
    if (since <= 2) r.sprite(art.sheets.collectFx, SHEETS.collectFx, since, x, y - 12);
    if (since >= 1 && since <= 4) {
      const p = since / 4;
      r.sprite(
        art.sheets.items,
        SHEETS.items,
        row * 2,
        lerp(x, HUD_POINT.x, p),
        lerp(y - 12, HUD_POINT.y, p),
      );
    }
  }

  /** As quatro especialidades descem do HUD, formam o MC-CART e ele pousa na forja. */
  private drawForging(r: Renderer, art: CampaignArt, cam: number): void {
    const forge = this.world.stops.find((s) => s.kind === 'forge');
    if (!forge) return;
    const s = this.tick - this.forgeAt;
    const x = forge.x - cam;
    const y = this.trail(forge.x);
    const cy = y - 40;
    const rows = this.world.stops.flatMap((st) =>
      st.kind === 'collectible' && this.collectedAt.has(st.id) ? [ITEM_ROW[st.group.id]] : [],
    );
    if (s < 6) {
      const p = (s + 1) / 6;
      rows.forEach((row, i) => {
        const qx = i % 2 ? 3 : -3;
        const qy = i < 2 ? -3 : 3;
        r.sprite(
          art.sheets.items,
          SHEETS.items,
          row * 2,
          lerp(HUD_POINT.x - i * 11, x + qx, p),
          lerp(HUD_POINT.y, cy + qy, p),
        );
      });
      return;
    }
    if (s < 18) {
      r.sprite(art.sheets.cartForm, SHEETS.cartForm, Math.min(s - 6, 5), x, cy);
      return;
    }
    const p = (s - 17) / (FORGE_TICKS - 17);
    r.sprite(art.sheets.cartMini, SHEETS.cartMini, 0, x - 6, lerp(cy - 7, y - 22, p));
  }

  private marker(r: Renderer, art: CampaignArt, frame: number, x: number, y: number): void {
    if (art.markers) {
      r.sprite(art.markers, MARKERS, frame, x, y);
      return;
    }
    // Sem a folha: uma forma mínima, para a parada nunca sumir.
    const badge = frame === FRAME.badge;
    r.rect(x - 3, y - (badge ? 22 : 12), 6, badge ? 3 : 12, this.fallback);
  }
}

function lerp(a: number, b: number, p: number): number {
  return a + (b - a) * p;
}
