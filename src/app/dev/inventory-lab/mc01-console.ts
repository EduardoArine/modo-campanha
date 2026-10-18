// ⚠️ PROTÓTIPO DEV-ONLY (docs/24 §16). Geometria do MC-01 montado em camadas, medida por registro
// de pixels contra a referência oficial (design/source/mc-01/console-reference.png, 1254 × 1074):
// traseira e frente são recortes exatos da referência; o cartucho em escala do console encaixa em
// (277, 0) sem escala. As coordenadas pertencem ao CONSOLE, não ao projeto: qualquer MC-CART com
// render em escala do console (699 × 500) usa o mesmo slot.

/** Sistema de coordenadas da referência (px da arte original). */
export const MC01_CONSOLE = {
  width: 1254,
  height: 1074,
  /** Espaço acima do console para o cartucho fora do slot (pose `out`). */
  headroom: 230,
  back: { src: 'assets/mc-01/console-back.webp', top: 205, width: 1254, height: 229 },
  front: { src: 'assets/mc-01/console-front.webp', top: 434, width: 1254, height: 640 },
  /** Posição do cartucho ENCAIXADO; 66 px da base ficam atrás da frente (y ≥ 434). */
  slot: { left: 277, top: 0, width: 699, height: 500 },
  /** Deslocamento vertical do cartucho em cada pose (px da referência; 0 = encaixado). */
  poses: { out: -230, aligned: -167, partial: -33, seated: 0 },
} as const;

export type Mc01Pose = keyof typeof MC01_CONSOLE.poses;

/** Vidro do CRT frontal (crt-front.webp, recortado para 1108 × 1013): área da camada digital. */
export const MC01_CRT = {
  src: 'assets/mc-01/crt-front.webp',
  width: 1108,
  height: 1013,
  glass: { left: 121, top: 120, width: 862, height: 656 },
} as const;

export const MC01_CONTROLLER = {
  src: 'assets/mc-01/controller.webp',
  width: 1230,
  height: 867,
} as const;

/** Variáveis CSS (em %) para posicionar as camadas num container com a proporção do console. */
export function consoleVars(): Record<string, string> {
  const c = MC01_CONSOLE;
  const h = c.height + c.headroom;
  const pctY = (v: number) => `${((v + c.headroom) / h) * 100}%`;
  return {
    '--ratio': `${c.width} / ${h}`,
    '--back-top': pctY(c.back.top),
    '--back-h': `${(c.back.height / h) * 100}%`,
    '--front-top': pctY(c.front.top),
    '--front-h': `${(c.front.height / h) * 100}%`,
    '--slot-left': `${(c.slot.left / c.width) * 100}%`,
    '--slot-top': pctY(c.slot.top),
    '--slot-w': `${(c.slot.width / c.width) * 100}%`,
    '--slot-h': `${(c.slot.height / h) * 100}%`,
    // Sombra de contato sobre a tampa, logo atrás da borda do slot (y 262–302 da referência).
    '--shadow-top': pctY(262),
    '--shadow-h': `${(40 / h) * 100}%`,
  };
}

/** translateY da pose em % da altura do próprio cartucho (escala junto com o container). */
export function poseY(pose: Mc01Pose): string {
  return `${(MC01_CONSOLE.poses[pose] / MC01_CONSOLE.slot.height) * 100}%`;
}

export function glassVars(): Record<string, string> {
  const t = MC01_CRT;
  return {
    '--tv-ratio': `${t.width} / ${t.height}`,
    '--glass-left': `${(t.glass.left / t.width) * 100}%`,
    '--glass-top': `${(t.glass.top / t.height) * 100}%`,
    '--glass-w': `${(t.glass.width / t.width) * 100}%`,
    '--glass-h': `${(t.glass.height / t.height) * 100}%`,
  };
}
