/** Ponto normalizado (0–1) dentro da caixa da tela. */
export type QuadPoint = readonly [number, number];

/**
 * Cantos do vidro onde a tela é exibida, em frações da caixa do host, na ordem: superior
 * esquerdo, superior direito, inferior direito, inferior esquerdo. Permite seguir o ângulo de um
 * CRT fotografado (perspectiva), sem distorcer a lógica da cena.
 */
export type ScreenQuad = readonly [QuadPoint, QuadPoint, QuadPoint, QuadPoint];

/**
 * `matrix3d` que leva o retângulo `w × h` (origem no canto superior esquerdo) ao quadrilátero
 * `quad` (projeção de quadrado para quadrilátero, Heckbert 1989). Usar com
 * `transform-origin: 0 0`.
 */
export function quadTransform(w: number, h: number, quad: ScreenQuad): string {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = quad.map(([x, y]) => [x * w, y * h]);
  const dx1 = x1 - x2;
  const dx2 = x3 - x2;
  const dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2;
  const dy2 = y3 - y2;
  const dy3 = y0 - y1 + y2 - y3;
  const det = dx1 * dy2 - dx2 * dy1;
  const g = det ? (dx3 * dy2 - dx2 * dy3) / det : 0;
  const k = det ? (dx1 * dy3 - dx3 * dy1) / det : 0;
  // Quadrado unitário → quadrilátero; dividir por w/h faz o retângulo da tela virar o quadrado.
  const a = (x1 - x0 + g * x1) / w;
  const b = (x3 - x0 + k * x3) / h;
  const d = (y1 - y0 + g * y1) / w;
  const e = (y3 - y0 + k * y3) / h;
  const m = [a, d, 0, g / w, b, e, 0, k / h, 0, 0, 1, 0, x0, y0, 0, 1];
  return `matrix3d(${m.map((v) => +v.toFixed(8)).join(', ')})`;
}
