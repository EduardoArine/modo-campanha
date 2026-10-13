import { LayerSpec, SheetSpec } from '../engine/sprite-sheet';

/**
 * Especificação dos assets do SYSTEM HORIZON (D-068, docs/22 §4): a mesma tabela que a arte final
 * deve seguir. Hoje os quadros vêm de placeholders técnicos gerados com essa geometria
 * (`placeholder-art.ts`); trocar pela arte final = carregar estes arquivos, sem mudar a cena.
 */
export const ASSET_BASE = 'assets/system-horizon/';

export const SHEETS = {
  // Personagem em quadros 16 × 24, pés no pivot 8,23 (docs/22 §4.2, revisado em §13).
  playerIdle: sheet('sh-player-idle.png', 16, 24, 2, 2, 8, 23),
  playerWalk: sheet('sh-player-walk.png', 16, 24, 4, 4, 8, 23),
  playerLook: sheet('sh-player-look.png', 16, 24, 2, 2, 8, 23),
  // Linha = item (BUILD, PRODUCT, AI, GAME DNA); coluna 0 = base, 1 = brilho.
  items: sheet('sh-items.png', 8, 8, 8, 2, 4, 4),
  collectFx: sheet('sh-collect-fx.png', 12, 12, 3, 3, 6, 6),
  hudSlot: sheet('sh-hud-slot.png', 10, 10, 2, 2, 0, 0),
  cartMini: sheet('sh-cart-mini.png', 12, 15, 1, 1, 0, 0),
  cartForm: sheet('sh-cart-form.png', 24, 30, 6, 6, 12, 15),
} as const satisfies Record<string, SheetSpec>;

export type SheetName = keyof typeof SHEETS;

export const LAYERS = [
  { id: 'sky', file: 'sh-bg-sky.png', width: 160, height: 120, parallax: 0 },
  { id: 'mountains', file: 'sh-bg-mountains.png', width: 180, height: 120, parallax: 0.25 },
  { id: 'trees', file: 'sh-bg-trees.png', width: 200, height: 120, parallax: 0.5 },
  { id: 'ground', file: 'sh-bg-ground.png', width: 240, height: 120, parallax: 1 },
] as const satisfies readonly LayerSpec[];

export type LayerId = (typeof LAYERS)[number]['id'];

/** Grupos com arte final integrada (docs/22 §11–§12); o resto segue placeholder. */
export const FINAL_LAYERS: readonly LayerId[] = ['sky', 'mountains', 'trees', 'ground'];
export const FINAL_SHEETS: readonly SheetName[] = ['playerIdle', 'playerWalk', 'playerLook'];

/** Imagens prontas para desenhar (arte final onde já integrada; placeholders no resto). */
export interface Art {
  readonly sheets: Record<SheetName, CanvasImageSource>;
  readonly layers: Record<LayerId, CanvasImageSource>;
}

function sheet(
  file: string,
  frameWidth: number,
  frameHeight: number,
  frames: number,
  columns: number,
  pivotX: number,
  pivotY: number,
): SheetSpec {
  return { file, frameWidth, frameHeight, frames, columns, pivot: { x: pivotX, y: pivotY } };
}
