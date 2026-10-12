import { Renderer } from '../engine/renderer';
import { Art } from '../world/assets';
import { Palette } from '../world/palette';

/** Textos da tela. Vêm do dicionário (linguagem de sistema), nunca desenhados nos pixels. */
export type CaptionKey =
  | 'console'
  | 'title'
  | 'player'
  | 'build'
  | 'product'
  | 'ai'
  | 'gameDna'
  | 'unlocked'
  | 'serial'
  | 'horizon'
  | 'continues';

/** Texto posicionado em coordenadas nativas (160 × 120); `y` é o centro da linha. */
export interface Caption {
  readonly key: CaptionKey;
  readonly x: number;
  readonly y: number;
  readonly align?: 'start' | 'center';
  /** Texto secundário: some em telas muito pequenas (mobile). */
  readonly minor?: boolean;
}

/** Cena do SYSTEM HORIZON: avança em ticks fixos, desenha e informa os textos ativos. */
export interface Scene {
  readonly tick: number;
  step(): void;
  draw(r: Renderer, art: Art, palette: Palette): void;
  captions(): readonly Caption[];
}
