/** Imagem responsiva (derivados WebP em `public/assets/hero/`). */
export interface HeroImage {
  src: string;
  srcset: string;
  width: number;
  height: number;
}

const image = (name: string, widths: number[], width: number, height: number): HeroImage => ({
  src: `assets/hero/${name}-${widths[widths.length - 1]}.webp`,
  srcset: widths.map((w) => `assets/hero/${name}-${w}.webp ${w}w`).join(', '),
  width,
  height,
});

/**
 * Fundo da Hero (D-067): a imagem aprovada do setup MC-01 ao pôr do sol, usada direto (sem montar
 * a cena com renders separados). Fonte em `design/source/hero/hero-background.png` (1672 × 941).
 * `mobile` é um recorte quadrado da mesma imagem (console, CRT e controle; x 628–1569), para o
 * celular não baixar a imagem inteira só para mostrar o centro dela.
 */
export const HERO_BACKGROUND = {
  full: image('background', [640, 960, 1280, 1672], 1672, 941),
  mobile: image('background-mobile', [480, 800], 800, 800),
};
