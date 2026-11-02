import { Renderer, VIEW } from '../engine/renderer';
import { SheetSpec } from '../engine/sprite-sheet';
import { SHEETS } from '../world/assets';
import { Palette } from '../world/palette';
import { Minigame, MinigameArt, PadInput } from './minigame';

/**
 * CORRIDA NA SELVA (D-104), o minijogo do marco "Primeiro contato" (c. 1991, o Atari 2600): uma
 * homenagem aos jogos de selva da época, com mecânicas de gênero e arte própria (nunca o nome, o
 * personagem ou a tela de um jogo real). Três telas que trocam inteiras, como no 2600:
 * 1. a cobra parada e o escorpião que patrulha (pular);
 * 2. o lago com o cipó (pular no cipó, soltar do outro lado);
 * 3. o lago dos jacarés (pular de cabeça em cabeça com a boca fechada) até o joystick.
 * Sem game over: encostar num bicho ou cair na água volta ao começo da tela.
 */

/**
 * Folha `sh-jungle.png` (PixelLab reduzido 2:1, build-jungle.mjs): quadros 16 × 16, pés no pivot 8,15.
 * O fundo `sh-jungle-bg.png` (160 × 120) já traz o chão (y ≥ GROUND).
 */
export const JUNGLE_SHEET: SheetSpec = {
  file: 'sh-jungle.png',
  frameWidth: 16,
  frameHeight: 16,
  frames: 7,
  columns: 7,
  pivot: { x: 8, y: 15 },
};
export const JUNGLE_BG = 'sh-jungle-bg.png';
const SPRITE = {
  scorpionA: 0,
  scorpionB: 1,
  crocClosed: 2,
  crocOpen: 3,
  snake: 4,
  joystick: 5,
  spider: 6,
};

/** Chão (pés), superfície da água e o fundo do lago. */
export const GROUND = 98;
const WATER = 101;
const SINK = 106;
const RUN = 2;
/** Impulso máximo ao soltar o cipó e raio de alcance da mão (px). */
const RELEASE_MAX = 3.5;
const GRAB_RADIUS = 6;
const JUMP = -6.4;
const GRAVITY = 0.7;
/** Corpo do jogador para colisão (a partir dos pés). */
const BODY = { halfWidth: 3, height: 20 };

interface Vine {
  readonly x: number;
  readonly y: number;
  readonly length: number;
  /** Amplitude (rad) e período (ticks) do balanço. */
  readonly amplitude: number;
  readonly period: number;
}

interface Screen {
  readonly lake?: readonly [number, number];
  readonly vine?: Vine;
  readonly snakes?: readonly number[];
  readonly scorpions?: readonly (readonly [number, number])[];
  readonly crocs?: readonly number[];
  /** Aranhas que descem do alto e sobem de novo (passar quando estão em cima). */
  readonly spiders?: readonly number[];
  readonly goal?: number;
}

export const JUNGLE_SCREENS: readonly Screen[] = [
  { snakes: [46], scorpions: [[70, 104]], spiders: [132] },
  { lake: [44, 116], vine: { x: 80, y: 12, length: 62, amplitude: 0.72, period: 34 } },
  { lake: [30, 136], crocs: [54, 83, 112], goal: 148 },
];

/** Ciclo da boca dos jacarés (ticks): fechada, depois aberta. */
export const CROC_CYCLE = { closed: 20, open: 10 } as const;
const CROC_HALF = 7;
/** Topo da cabeça do jacaré fechado (onde o jogador pisa). */
const CROC_TOP = WATER - 4;
/** Aranha: o fio desce do alto e sobe em ciclo. */
const SPIDER = { top: 30, drop: 56, period: 44, half: 4 } as const;
const START_X = 12;

interface Runner {
  x: number;
  y: number;
  vy: number;
  onGround: boolean;
  hanging: boolean;
  facing: 1 | -1;
  /** Ticks na pose atual. */
  poseTicks: number;
}

export class JungleRun implements Minigame {
  readonly id = 'jungle-run' as const;
  tick = 0;
  screen = 0;
  done = false;
  retries = 0;
  /** Ticks restantes do "piscar" depois de voltar ao começo da tela. */
  flash = 0;
  private readonly p: Runner = {
    x: START_X,
    y: GROUND,
    vy: 0,
    onGround: true,
    hanging: false,
    facing: 1,
    poseTicks: 0,
  };
  private jumpWas = false;
  private moving = false;
  /** Impulso horizontal ao soltar o cipó (até tocar o chão). */
  private releaseVx = 0;
  /** Pode agarrar o cipó (falso depois de soltar, até tocar o chão). */
  private regrab = true;

  /** `still`: sem o piscar depois de voltar ao começo da tela (reduced motion). */
  constructor(private readonly still = false) {}

  get runner(): Readonly<Runner> {
    return this.p;
  }

  step(input: PadInput): void {
    if (this.done) return;
    this.tick++;
    if (this.flash) this.flash--;
    const p = this.p;
    const pressed = input.jump && !this.jumpWas;
    this.jumpWas = input.jump;
    const s = JUNGLE_SCREENS[this.screen];
    const wasMoving = this.moving;

    if (p.hanging && s.vine) {
      const tip = vineTip(s.vine, this.tick);
      p.x = tip.x;
      p.y = tip.y + 21;
      this.moving = false;
      if (pressed) {
        // Solta para o lado em que o cipó está indo, com impulso limitado; não agarra de novo até
        // tocar o chão (ou cair na água).
        const next = vineTip(s.vine, this.tick + 1);
        p.hanging = false;
        p.onGround = false;
        p.vy = -3;
        p.facing = next.x >= tip.x ? 1 : -1;
        const swing = (next.x - tip.x) * 0.6;
        this.releaseVx = Math.max(-RELEASE_MAX, Math.min(RELEASE_MAX, swing)) || p.facing * RUN;
        this.regrab = false;
      }
    } else {
      const vx = p.onGround || !this.releaseVx ? input.dir * RUN : this.releaseVx + input.dir * 0.5;
      if (input.dir) p.facing = input.dir;
      p.x += vx;
      this.moving = !!input.dir && p.onGround;
      if (pressed && p.onGround) {
        p.vy = JUMP;
        p.onGround = false;
      }
      if (!p.onGround) {
        p.vy += GRAVITY;
        p.y += p.vy;
      }
      this.land(s);
      if (!p.onGround && this.regrab && s.vine && p.vy > -2) {
        const tip = vineTip(s.vine, this.tick);
        if (Math.hypot(tip.x - p.x, tip.y - (p.y - 21)) <= GRAB_RADIUS) {
          p.hanging = true;
          this.releaseVx = 0;
        }
      }
    }
    p.poseTicks = this.moving === wasMoving ? p.poseTicks + 1 : 0;

    this.crossScreens();
    if (this.hit(JUNGLE_SCREENS[this.screen])) this.restartScreen();
    const goal = JUNGLE_SCREENS[this.screen].goal;
    if (goal !== undefined && p.onGround && p.x >= goal - 6) this.done = true;
  }

  /** Chão, cabeças de jacaré fechadas e água. */
  private land(s: Screen): void {
    const p = this.p;
    if (p.onGround) {
      // Saiu da borda (ou a boca abriu embaixo dele): começa a cair.
      if (!this.support(s)) {
        p.onGround = false;
        p.vy = 0;
      }
      return;
    }
    if (p.vy < 0) return;
    const top = this.support(s);
    if (top !== null && p.y >= top) {
      p.y = top;
      p.vy = 0;
      p.onGround = true;
      this.releaseVx = 0;
      this.regrab = true;
      return;
    }
    if (p.y >= SINK) this.restartScreen();
  }

  /** Altura do apoio sob o jogador (chão ou cabeça de jacaré fechada), ou `null` sobre a água. */
  private support(s: Screen): number | null {
    const x = this.p.x;
    if (!s.lake || x < s.lake[0] || x > s.lake[1]) return GROUND;
    const croc = (s.crocs ?? []).findIndex((cx) => Math.abs(cx - x) <= CROC_HALF);
    if (croc >= 0 && !crocOpen(croc, this.tick)) return CROC_TOP;
    return null;
  }

  private crossScreens(): void {
    const p = this.p;
    if (p.x > VIEW.width - 4 && this.screen < JUNGLE_SCREENS.length - 1) {
      this.screen++;
      p.x = 6;
    } else if (p.x < 2 && this.screen > 0) {
      this.screen--;
      p.x = VIEW.width - 8;
    }
    p.x = Math.min(Math.max(p.x, 4), VIEW.width - 4);
  }

  private hit(s: Screen): boolean {
    const p = this.p;
    if (this.flash) return false;
    const low = p.y > GROUND - 8;
    const near = (x: number, w: number) => Math.abs(x - p.x) < w + BODY.halfWidth;
    if (low && (s.snakes ?? []).some((x) => near(x, 4))) return true;
    if (low && (s.scorpions ?? []).some((path) => near(scorpionX(path, this.tick), 4))) return true;
    // A aranha pega quem passa com ela embaixo (os pés dela abaixo da cabeça do jogador).
    const head = p.y - BODY.height;
    return (s.spiders ?? []).some((x) => near(x, SPIDER.half) && spiderY(this.tick) > head);
  }

  private restartScreen(): void {
    const p = this.p;
    Object.assign(p, { x: START_X, y: GROUND, vy: 0, onGround: true, hanging: false, facing: 1 });
    this.releaseVx = 0;
    this.regrab = true;
    this.retries++;
    this.flash = 8;
  }

  // Desenho --------------------------------------------------------------------------------------

  draw(r: Renderer, art: MinigameArt, palette: Palette): void {
    const s = JUNGLE_SCREENS[this.screen];
    if (art.jungleBg) {
      r.image(art.jungleBg, 0, 0);
    } else {
      r.rect(0, 0, VIEW.width, VIEW.height, palette.petrol);
      r.rect(0, GROUND, VIEW.width, VIEW.height - GROUND, palette.gold);
    }
    if (s.lake) {
      const [a, b] = s.lake;
      r.rect(a, WATER, b - a, VIEW.height - WATER, palette.petrol);
      const wave = Math.floor(this.tick / 3) % 4;
      for (let x = a + wave; x < b - 2; x += 6) r.rect(x, WATER + 1, 3, 1, palette.teal);
      r.rect(a, GROUND, b - a, WATER - GROUND, palette.night);
    }
    if (s.vine) this.drawVine(r, s.vine, palette);
    const sheet = art.jungle;
    const sprite = (
      frame: number,
      x: number,
      y: number,
      flip = false,
      fallback = palette.orange,
    ) => {
      if (sheet) r.sprite(sheet, JUNGLE_SHEET, frame, x, y, flip);
      else r.rect(x - 6, y - 8, 12, 8, fallback);
    };
    (s.crocs ?? []).forEach((x, i) =>
      sprite(crocOpen(i, this.tick) ? SPRITE.crocOpen : SPRITE.crocClosed, x, WATER + 3),
    );
    (s.snakes ?? []).forEach((x) => sprite(SPRITE.snake, x, GROUND));
    (s.spiders ?? []).forEach((x) => {
      const y = spiderY(this.tick);
      for (let t = 0; t < y - 12; t += 2) r.rect(x, t, 1, 1, palette.creamDim);
      sprite(SPRITE.spider, x, y);
    });
    (s.scorpions ?? []).forEach((path) => {
      const x = scorpionX(path, this.tick);
      const frame = Math.floor(this.tick / 3) % 2 ? SPRITE.scorpionB : SPRITE.scorpionA;
      sprite(frame, x, GROUND, scorpionDir(path, this.tick) > 0);
    });
    if (s.goal !== undefined) sprite(SPRITE.joystick, s.goal, GROUND, false, palette.gold);
    this.drawRunner(r, art);
  }

  private drawVine(r: Renderer, vine: Vine, palette: Palette): void {
    const tip = vineTip(vine, this.tick);
    const steps = Math.ceil(vine.length / 2);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      r.rect(vine.x + (tip.x - vine.x) * t, vine.y + (tip.y - vine.y) * t, 1, 2, palette.gold);
    }
  }

  private drawRunner(r: Renderer, art: MinigameArt): void {
    const p = this.p;
    if (this.flash && this.flash % 2 && !this.still) return;
    const flip = p.facing < 0;
    if (!p.onGround || p.hanging) {
      // No ar e no cipó: o quadro de passada aberta (sem arte nova).
      r.sprite(art.sheets.playerWalk, SHEETS.playerWalk, p.hanging ? 0 : 1, p.x, p.y, flip);
      return;
    }
    const name = this.moving ? 'playerWalk' : 'playerIdle';
    const frame = Math.floor(p.poseTicks / (this.moving ? 2 : 6));
    r.sprite(art.sheets[name], SHEETS[name], frame, p.x, p.y, flip);
  }
}

export function vineTip(vine: Vine, tick: number): { x: number; y: number } {
  const a = vine.amplitude * Math.sin((2 * Math.PI * tick) / vine.period);
  return { x: vine.x + vine.length * Math.sin(a), y: vine.y + vine.length * Math.cos(a) };
}

export function crocOpen(index: number, tick: number): boolean {
  const cycle = CROC_CYCLE.closed + CROC_CYCLE.open;
  return (tick + index * 9) % cycle >= CROC_CYCLE.closed;
}

/** Escorpião vai e volta entre `from` e `to`, 1 px por tick. */
export function scorpionX([from, to]: readonly [number, number], tick: number): number {
  const span = to - from;
  const t = tick % (span * 2);
  return t < span ? to - t : from + (t - span);
}

function scorpionDir(path: readonly [number, number], tick: number): number {
  return scorpionX(path, tick + 1) - scorpionX(path, tick);
}

/** Pés da aranha (o fio vem do alto): sobe e desce em ciclo suave. */
export function spiderY(tick: number): number {
  const phase = (1 - Math.cos((2 * Math.PI * tick) / SPIDER.period)) / 2;
  return Math.round(SPIDER.top + SPIDER.drop * phase);
}
