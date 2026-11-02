import { Renderer } from '../engine/renderer';
import { Art } from '../world/assets';
import { Palette } from '../world/palette';

/**
 * Minijogos do SYSTEM HORIZON (D-104): um por marco que tem uma mecânica natural, curtos (20–45 s),
 * uma ação só, sem game over (errou, volta ao começo da tela) e sempre com "Voltar à campanha".
 * Representam o marco; não contam nada novo sobre o Eduardo (o texto do marco vem do Diário).
 */
export type MinigameId = 'jungle-run';

/** Controle do minijogo: direção mantida e pulo (segurado). */
export interface PadInput {
  readonly dir: -1 | 0 | 1;
  readonly jump: boolean;
}

/** Arte dos minijogos: a do jogo (personagem) + as folhas próprias (sem elas, formas simples). */
export interface MinigameArt extends Art {
  readonly jungle: CanvasImageSource | null;
  readonly jungleBg: CanvasImageSource | null;
}

/** Minijogo: determinístico por tick, como as cenas (testável sem canvas). */
export interface Minigame {
  readonly id: MinigameId;
  readonly tick: number;
  /** Chegou ao objetivo. */
  readonly done: boolean;
  /** Quantas vezes voltou ao começo de uma tela (só para a região viva; não é pontuação). */
  readonly retries: number;
  step(input: PadInput): void;
  draw(r: Renderer, art: MinigameArt, palette: Palette): void;
}
