// Geometria do portátil (D-095), medida no render do Eduardo (design/source/handheld/handheld.png,
// 1868 × 2412). O cartucho em escala do console (699 × 500) passa ATRÁS do corpo, centrado, como em
// reference-with-cartridge.png: encaixado, 341 px dele ficam acima do corpo. A tela digital é o
// visor do render (x 118–1755 · y 156–1336), com 2 px de folga para dentro da moldura preta.

const A = 'assets/handheld/';

/** Sistema de coordenadas do render (px da arte original). */
export const MC_HANDHELD = {
  width: 1868,
  height: 2412,
  /** Espaço acima do corpo para o cartucho fora (pose `out`, topo em y −761). */
  headroom: 780,
  body: {
    src: `${A}handheld-1200.webp`,
    srcset: [480, 800, 1200].map((w) => `${A}handheld-${w}.webp ${w}w`).join(', '),
    width: 1868,
    height: 2412,
  },
  screen: { left: 120, top: 158, width: 1633, height: 1176 },
  /** Cartucho ENCAIXADO (1354 × 968): topo 341 px acima do corpo; o resto fica atrás dele. */
  slot: { left: 257, top: -341, width: 1354, height: 968 },
  /** Deslocamento vertical do cartucho (px do render; 0 = encaixado). */
  poses: { out: -420, seated: 0 },
} as const;

export type McHandheldPose = keyof typeof MC_HANDHELD.poses;

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

/** Variáveis CSS (em %) que posicionam corpo, tela e cartucho num container com a proporção total. */
export function handheldVars(): Record<string, string> {
  const h = MC_HANDHELD;
  const total = h.height + h.headroom;
  const y = (v: number) => pct(v + h.headroom, total);
  return {
    '--ratio': `${h.width} / ${total}`,
    '--body-top': y(0),
    '--body-h': pct(h.height, total),
    '--screen-left': pct(h.screen.left, h.width),
    '--screen-top': y(h.screen.top),
    '--screen-w': pct(h.screen.width, h.width),
    '--screen-h': pct(h.screen.height, total),
    '--slot-left': pct(h.slot.left, h.width),
    '--slot-top': y(h.slot.top),
    '--slot-w': pct(h.slot.width, h.width),
    '--out': pct(h.poses.out, h.slot.height),
  };
}
