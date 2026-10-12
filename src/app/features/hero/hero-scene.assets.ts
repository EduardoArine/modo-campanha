import { ScreenQuad } from '../../system-horizon/screen-quad';

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

/**
 * Cantos do vidro do CRT na imagem de fundo, em frações da caixa x 1157–1473, y 151–405 da fonte
 * (posicionada em `hero-scene.scss`). A TV está levemente girada: o lado direito da tela é mais
 * alto (topo 161 → 151, base 400 → 405). A tela do SYSTEM HORIZON é projetada nesses cantos.
 */
export const HERO_CRT_GLASS: ScreenQuad = [
  [0, 0.0394],
  [1, 0],
  [0.9937, 1],
  [0, 0.9803],
];
