// Geometria do MC-01 em camadas (D-076/D-077; ângulo frontal desde D-095). Referência: o render do
// Eduardo design/source/mc-01/console-v2/reference.png (2508 × 1170); traseira (tampa com a
// abertura do slot, y 0–296) e frente (y 296–1170) são recortes exatos dela (diferença < 0,05%).
// O cartucho em escala do console (699 × 500) entra na abertura laranja: 1150 px de largura,
// centrado; encaixado, a frente esconde tudo abaixo de y 296, logo acima da faixa do rótulo. As
// coordenadas pertencem ao CONSOLE: qualquer MC-CART com render em escala do console usa o mesmo slot.

const A = 'assets/mc-01/';
const set = (name: string) => [640, 960, 1280].map((w) => `${A}${name}-${w}.webp ${w}w`).join(', ');

/** Sistema de coordenadas da referência (px da arte original). */
export const MC01_CONSOLE = {
  width: 2508,
  height: 1170,
  /** Espaço acima do console para o cartucho fora do slot (pose `out`, topo em y −805). */
  headroom: 820,
  back: {
    src: `${A}mc01-back-1280.webp`,
    srcset: set('mc01-back'),
    top: 0,
    width: 2508,
    height: 296,
  },
  front: {
    src: `${A}mc01-front-1280.webp`,
    srcset: set('mc01-front'),
    top: 296,
    width: 2508,
    height: 874,
  },
  /** Cartucho ENCAIXADO (1150 × 823): do topo em y −245, a base passa atrás da frente (y ≥ 296). */
  slot: { left: 679, top: -245, width: 1150, height: 823 },
  /** Deslocamento vertical do cartucho (px da referência; 0 = encaixado; fora = acima da tampa). */
  poses: { out: -560, seated: 0 },
  /** Sombra de contato sobre a abertura do slot com o cartucho fora. */
  shadow: { top: 150, height: 70 },
} as const;

export type McConsolePose = keyof typeof MC01_CONSOLE.poses;

/**
 * Vidro do CRT frontal (recorte de 1108 × 1013): área da camada digital, ATRÁS do render. O tubo é
 * transparente no render (D-080); a camada cobre o furo inteiro (folga de 1 a 8 px conforme a borda) e o aro esconde a sobra.
 */
export const MC01_CRT = {
  src: `${A}crt-front-1108.webp`,
  srcset: `${A}crt-front-560.webp 560w, ${A}crt-front-800.webp 800w, ${A}crt-front-1108.webp 1108w`,
  width: 1108,
  height: 1013,
  glass: { left: 118, top: 117, width: 868, height: 662 },
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
