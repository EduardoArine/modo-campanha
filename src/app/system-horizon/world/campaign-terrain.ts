import { Renderer, VIEW } from '../engine/renderer';
import { Art, LAYERS } from './assets';
import { trailY } from './trail';

/**
 * Terreno do jogo (D-103): o mesmo cenário do teaser, repetido sem arte nova. Montanhas e árvores
 * se repetem espelhadas (a borda de cada cópia casa com a seguinte); o chão repete o trecho do vale
 * (x 0–100 da arte, quase plano) espelhado, e o mundo termina no chão original inteiro (vale →
 * mirante com a placa), o mesmo final do teaser. A repetição do chão é ancorada no trecho final: a
 * cópia logo antes dele é espelhada, e a sua borda direita é a coluna 0 da arte, onde o final começa.
 */
export const VALLEY = { from: 0, width: 100 } as const;

/** Altura dos pés na trilha do jogo, em `x` do mundo. */
export function campaignTrailY(x: number, finalStart: number): number {
  if (x >= finalStart) return trailY(x - finalStart);
  const u = x - finalStart;
  const k = Math.floor(u / VALLEY.width);
  const local = u - k * VALLEY.width;
  // Na cópia normal a trilha vai de y(0) a y(100); na espelhada, volta.
  return trailY(VALLEY.from + (odd(k) ? VALLEY.width - local : local));
}

/**
 * Desenha o cenário com a câmera em `cam`. Sem parallax (reduced motion), céu, montanhas e árvores
 * ficam parados e só o chão anda.
 */
export function drawCampaignTerrain(
  r: Renderer,
  art: Art,
  cam: number,
  finalStart: number,
  parallax: boolean,
): void {
  for (const layer of LAYERS) {
    const source = art.layers[layer.id];
    if (layer.id === 'sky') {
      r.image(source, 0, 0);
      continue;
    }
    if (layer.id === 'ground') {
      if (cam < finalStart) {
        mirrorTile(r, source, VALLEY.from, VALLEY.width, layer.height, cam, finalStart, finalStart);
      }
      if (cam + VIEW.width > finalStart) r.image(source, finalStart - cam, 0);
      continue;
    }
    const offset = parallax ? Math.round(cam * layer.parallax) : 0;
    mirrorTile(r, source, 0, layer.width, layer.height, offset, 0, Infinity);
  }
}

/**
 * Repete a faixa `[sx, sx + w)` espelhando uma cópia sim, outra não. `offset` = posição do mundo na
 * borda esquerda da tela; as cópias começam em `anchor + k·w` (as de índice ímpar, espelhadas) e vão
 * até `end` (fim do trecho repetido no mundo).
 */
function mirrorTile(
  r: Renderer,
  source: CanvasImageSource,
  sx: number,
  w: number,
  h: number,
  offset: number,
  anchor: number,
  end: number,
): void {
  const last = Math.min(offset + VIEW.width, end);
  for (let k = Math.floor((offset - anchor) / w); anchor + k * w < last; k++) {
    r.strip(source, sx, w, h, anchor + k * w - offset, 0, odd(k));
  }
}

function odd(k: number): boolean {
  return ((k % 2) + 2) % 2 === 1;
}
