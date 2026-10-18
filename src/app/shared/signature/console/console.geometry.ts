// Geometria do MC-01 em camadas (D-076/D-077), medida por registro de pixels contra a referência
// oficial (design/source/mc-01/console-reference.png, 1254 × 1074): traseira e frente são recortes
// exatos; o cartucho em escala do console encaixa em (277, 0) sem escala. As coordenadas pertencem
// ao CONSOLE: qualquer MC-CART com render em escala do console (699 × 500) usa o mesmo slot.

const A = 'assets/mc-01/';

/** Sistema de coordenadas da referência (px da arte original). */
export const MC01_CONSOLE = {
  width: 1254,
  height: 1074,
  /** Espaço acima do console para o cartucho fora do slot (pose `out`). */
  headroom: 230,
  back: {
    src: `${A}console-back-1254.webp`,
    srcset: `${A}console-back-640.webp 640w, ${A}console-back-960.webp 960w, ${A}console-back-1254.webp 1254w`,
    top: 205,
    width: 1254,
    height: 229,
  },
  front: {
    src: `${A}console-front-1254.webp`,
    srcset: `${A}console-front-640.webp 640w, ${A}console-front-960.webp 960w, ${A}console-front-1254.webp 1254w`,
    top: 434,
    width: 1254,
    height: 640,
  },
  /** Cartucho ENCAIXADO; 66 px da base ficam atrás da frente (y ≥ 434). */
  slot: { left: 277, top: 0, width: 699, height: 500 },
  /** Deslocamento vertical do cartucho (px da referência; 0 = encaixado). */
  poses: { out: -230, seated: 0 },
  /** Sombra de contato sobre a tampa com o cartucho fora (y 262–302). */
  shadow: { top: 262, height: 40 },
} as const;

export type McConsolePose = keyof typeof MC01_CONSOLE.poses;

/** Vidro do CRT frontal (recorte de 1108 × 1013): área da camada digital. */
export const MC01_CRT = {
  src: `${A}crt-front-1108.webp`,
  srcset: `${A}crt-front-560.webp 560w, ${A}crt-front-800.webp 800w, ${A}crt-front-1108.webp 1108w`,
  width: 1108,
  height: 1013,
  glass: { left: 121, top: 120, width: 862, height: 656 },
} as const;

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

/** Variáveis CSS (em %) que posicionam as camadas num container com a proporção do console. */
export function consoleVars(): Record<string, string> {
  const c = MC01_CONSOLE;
  const h = c.height + c.headroom;
  const y = (v: number) => pct(v + c.headroom, h);
  return {
    '--ratio': `${c.width} / ${h}`,
    '--back-top': y(c.back.top),
    '--front-top': y(c.front.top),
    '--slot-left': pct(c.slot.left, c.width),
    '--slot-top': y(c.slot.top),
    '--slot-w': pct(c.slot.width, c.width),
    '--shadow-top': y(c.shadow.top),
    '--shadow-h': pct(c.shadow.height, h),
    '--out': pct(c.poses.out, c.slot.height),
  };
}

export function crtVars(): Record<string, string> {
  const t = MC01_CRT;
  return {
    '--tv-ratio': `${t.width} / ${t.height}`,
    '--glass-left': pct(t.glass.left, t.width),
    '--glass-top': pct(t.glass.top, t.height),
    '--glass-w': pct(t.glass.width, t.width),
    '--glass-h': pct(t.glass.height, t.height),
  };
}
