import { ScriptedController, ScriptStep } from '../control/scripted-controller';
import { ATTRACT_COLLECTIBLES } from '../content/attract-content';
import { Renderer, VIEW } from '../engine/renderer';
import { Art, LAYERS, SHEETS } from '../world/assets';
import { Player } from '../world/entities';
import { Palette } from '../world/palette';
import { trailY, WORLD } from '../world/trail';
import { Caption, Scene } from './scene';

/** ~7 s a 12 fps (D-068). */
export const ATTRACT_TICKS = 84;
/** Quadro-chave oficial (reduced motion / pausado): os 4 itens formaram o MC-CART. */
export const KEYFRAME_TICK = 58;

/** Marcos do roteiro (ticks). As coletas acontecem quando o jogador alcança cada item. */
export const BEATS = {
  bootScene: 9,
  hud: 10,
  merge: 48,
  form: 52,
  toHud: 60,
  cartInHud: 64,
  horizon: 64,
  continues: 75,
} as const;

const SCRIPT: readonly ScriptStep[] = [
  { from: 0, pose: 'idle' },
  { from: 10, pose: 'walk' },
  { from: 48, pose: 'idle' },
  { from: 60, pose: 'walk' },
  { from: 70, pose: 'look' },
];

const START_X = 12;
const SPEED = 2.5;
const SLOT = { x: 109, y: 6, gap: 11 } as const;
const CART = { x: 80, y: 52 } as const;
const HUD_CART = { x: 140, y: 4 } as const;
const QUADRANTS = [
  [-3, -3],
  [3, -3],
  [-3, 3],
  [3, 3],
] as const;
const INTERFERENCE = [
  [18, 47, 83, 101],
  [9, 60, 92],
] as const;

export interface AttractOptions {
  /** Liga o CRT na primeira volta (só no primeiro play da página, D-068). */
  readonly boot: boolean;
}

/**
 * Attract mode do SYSTEM HORIZON (D-068, docs/22): o modo demonstração do jogo, conduzido por
 * roteiro. experiência → progresso → conquista → campanha: o jogador caminha pela trilha, coleta
 * BUILD, PRODUCT, AI e GAME DNA, os quatro formam o MC-CART MC-001 e ele chega ao mirante.
 * Determinística: o estado de cada tick só depende do roteiro (permite o quadro-chave exato).
 */
export class AttractScene implements Scene {
  private readonly controller = new ScriptedController(SCRIPT);
  private player: Player = { x: START_X, pose: 'idle', poseTicks: 0 };
  private collectedAt: number[] = [];
  private booting: boolean;
  tick = 0;
  /** Voltas completas desde o início. */
  loops = 0;

  constructor(options: AttractOptions) {
    this.booting = options.boot;
    this.resetWorld();
  }

  /** Cena parada no quadro-chave (sem boot). */
  static keyframe(): AttractScene {
    const scene = new AttractScene({ boot: false });
    while (scene.tick < KEYFRAME_TICK) scene.step();
    return scene;
  }

  step(): void {
    this.tick++;
    if (this.tick >= ATTRACT_TICKS) {
      this.tick = 0;
      this.loops++;
      this.booting = false;
      this.resetWorld();
      return;
    }
    const pose = this.controller.intent(this.tick);
    this.player.poseTicks = pose === this.player.pose ? this.player.poseTicks + 1 : 0;
    this.player.pose = pose;
    if (pose === 'walk') this.player.x += SPEED;
    ATTRACT_COLLECTIBLES.forEach((item, i) => {
      if (this.collectedAt[i] < 0 && this.player.x >= item.x) this.collectedAt[i] = this.tick;
    });
  }

  /** Tick em que cada item foi coletado (−1 = ainda na trilha). */
  get collected(): readonly number[] {
    return this.collectedAt;
  }

  get playerState(): Readonly<Player> {
    return this.player;
  }

  /** Quadro atual da formação do MC-CART (−1 fora da formação). */
  get cartFrame(): number {
    const t = this.tick;
    if (t < BEATS.form || t >= BEATS.toHud) return -1;
    return Math.min(t - BEATS.form, SHEETS.cartForm.frames - 1);
  }

  draw(r: Renderer, art: Art, palette: Palette): void {
    const t = this.tick;
    if (this.booting && t < BEATS.bootScene) {
      this.drawBoot(r, palette, t);
      return;
    }
    const cam = this.camera();
    for (const layer of LAYERS) {
      r.image(art.layers[layer.id], -Math.round(cam * layer.parallax), 0);
    }
    this.drawItems(r, art, cam);
    this.drawPlayer(r, art, cam);
    this.drawHud(r, art);
    this.drawCart(r, art);
    // Reinício do loop: 2 quadros de interferência, sem tela preta nem flash (D-068).
    if (!this.booting && t < INTERFERENCE.length) {
      r.ctx.globalAlpha = 0.5;
      for (const y of INTERFERENCE[t]) r.rect(0, y, VIEW.width, 1, palette.dust);
      r.ctx.globalAlpha = 1;
    }
  }

  captions(): readonly Caption[] {
    const t = this.tick;
    if (this.booting && t < BEATS.bootScene) {
      return t >= 4
        ? [
            { key: 'console', x: 80, y: 52 },
            { key: 'title', x: 80, y: 66 },
          ]
        : [];
    }
    const out: Caption[] = [];
    if (t >= BEATS.hud) out.push({ key: 'player', x: 8, y: 11, align: 'start', minor: true });
    const cam = this.camera();
    ATTRACT_COLLECTIBLES.forEach((item, i) => {
      const at = this.collectedAt[i];
      if (at >= 0 && t - at <= 3) {
        out.push({ key: item.id, x: item.x - cam, y: trailY(item.x) - 24, minor: true });
      }
    });
    if (t >= 54 && t < 63) {
      out.push({ key: 'unlocked', x: 80, y: 26 }, { key: 'serial', x: 80, y: 78 });
    }
    if (t >= BEATS.horizon && t < BEATS.continues) out.push({ key: 'horizon', x: 80, y: 30 });
    if (t >= BEATS.continues) out.push({ key: 'continues', x: 80, y: 60 });
    return out;
  }

  private resetWorld(): void {
    this.player = { x: START_X, pose: 'idle', poseTicks: 0 };
    this.collectedAt = ATTRACT_COLLECTIBLES.map(() => -1);
  }

  private camera(): number {
    return Math.min(Math.max(Math.round(this.player.x - 56), 0), WORLD.width - VIEW.width);
  }

  /** CRT ligando (só no primeiro play): uma linha que se abre; depois o cartão MC-01. */
  private drawBoot(r: Renderer, palette: Palette, t: number): void {
    r.rect(0, 0, VIEW.width, VIEW.height, palette.night);
    const line = [1, 3, 12, 40][t];
    if (line) r.rect(0, (VIEW.height - line) / 2, VIEW.width, line, palette.creamDim);
  }

  private drawItems(r: Renderer, art: Art, cam: number): void {
    const t = this.tick;
    ATTRACT_COLLECTIBLES.forEach((item, i) => {
      const at = this.collectedAt[i];
      const x = item.x - cam;
      const y = trailY(item.x) - 12;
      if (at < 0) {
        const bob = Math.floor((t + i * 2) / 3) % 2;
        const glint = Math.floor((t + i * 3) / 4) % 2;
        r.sprite(art.sheets.items, SHEETS.items, item.row * 2 + glint, x, y - bob);
        return;
      }
      const since = t - at;
      if (since <= 2) r.sprite(art.sheets.collectFx, SHEETS.collectFx, since, x, y);
      // O item voa até o seu slot do HUD.
      if (since >= 1 && since <= 3 && t < BEATS.merge) {
        const p = since / 3;
        const [sx, sy] = slotCenter(i);
        r.sprite(art.sheets.items, SHEETS.items, item.row * 2, lerp(x, sx, p), lerp(y, sy, p));
      }
    });
  }

  private drawPlayer(r: Renderer, art: Art, cam: number): void {
    const { x, pose, poseTicks } = this.player;
    const name = pose === 'walk' ? 'playerWalk' : pose === 'look' ? 'playerLook' : 'playerIdle';
    const frame = Math.floor(poseTicks / (pose === 'walk' ? 2 : pose === 'look' ? 8 : 6));
    r.sprite(art.sheets[name], SHEETS[name], frame, x - cam, trailY(x));
  }

  private drawHud(r: Renderer, art: Art): void {
    const t = this.tick;
    if (t < BEATS.hud || t >= BEATS.form) return;
    ATTRACT_COLLECTIBLES.forEach((item, i) => {
      const [sx, sy] = slotCenter(i);
      if (t < BEATS.merge) {
        const filled = this.collectedAt[i] >= 0 && t >= this.collectedAt[i] + 3;
        r.sprite(art.sheets.hudSlot, SHEETS.hudSlot, filled ? 1 : 0, sx - 5, sy - 5);
        if (filled) r.sprite(art.sheets.items, SHEETS.items, item.row * 2, sx, sy);
        return;
      }
      // Os quatro saem dos slots e convergem para o rótulo do cartucho.
      const p = (t - BEATS.merge + 1) / (BEATS.form - BEATS.merge);
      const [qx, qy] = QUADRANTS[i];
      r.sprite(
        art.sheets.items,
        SHEETS.items,
        item.row * 2,
        lerp(sx, CART.x + qx, p),
        lerp(sy, CART.y + qy, p),
      );
    });
  }

  private drawCart(r: Renderer, art: Art): void {
    const t = this.tick;
    const frame = this.cartFrame;
    if (frame >= 0) {
      r.sprite(art.sheets.cartForm, SHEETS.cartForm, frame, CART.x, CART.y);
      return;
    }
    if (t < BEATS.toHud) return;
    // O MC-CART vai para o HUD e fica lá até o fim da volta.
    const p = Math.min(1, (t - BEATS.toHud + 1) / (BEATS.cartInHud - BEATS.toHud));
    const fromX = CART.x - 6;
    const fromY = CART.y - 7;
    r.sprite(
      art.sheets.cartMini,
      SHEETS.cartMini,
      0,
      lerp(fromX, HUD_CART.x, p),
      lerp(fromY, HUD_CART.y, p),
    );
  }
}

function slotCenter(i: number): [number, number] {
  return [SLOT.x + i * SLOT.gap + 5, SLOT.y + 5];
}

function lerp(a: number, b: number, p: number): number {
  return a + (b - a) * p;
}
