/** Mundo do attract mode: 240 × 120 (a câmera de 160 px anda de 0 a 80). */
export const WORLD = { width: 240, height: 120 } as const;

/**
 * Perfil da trilha (x, y dos pés do jogador). A arte do chão (`sh-bg-ground.png`) deve seguir
 * exatamente este perfil (docs/22 §4.1): do vale à esquerda ao mirante plano à direita.
 */
export const TRAIL: readonly (readonly [number, number])[] = [
  [0, 104],
  [100, 102],
  [112, 98],
  [122, 90],
  [128, 86],
  [240, 86],
];

/** Início do mirante (ponto alto de onde se vê o horizonte). */
export const LOOKOUT_X = 128;

/** Altura da trilha em `x` (interpolação linear entre os pontos do perfil). */
export function trailY(x: number): number {
  for (let i = 1; i < TRAIL.length; i++) {
    const [x0, y0] = TRAIL[i - 1];
    const [x1, y1] = TRAIL[i];
    if (x <= x1) return Math.round(y0 + ((Math.max(x, x0) - x0) / (x1 - x0)) * (y1 - y0));
  }
  return TRAIL[TRAIL.length - 1][1];
}
