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
 * Cantos da tela do SYSTEM HORIZON, em frações da caixa x 1152–1477, y 151–405 da fonte
 * (posicionada em `hero-scene.scss`). O tubo do CRT é transparente na imagem (D-080) e a tela fica
 * ATRÁS dela. A folga é só lateral (~4,5 px além do vidro), porque a tela 4:3 escala pela altura:
 * folga vertical ampliaria o teaser e levaria o HUD para baixo do aro. Em cima e embaixo, onde o
 * tubo é abaulado, sobram até ~3 px de vidro escuro. A TV está levemente girada (lado direito mais alto).
 */
export const HERO_CRT_GLASS: ScreenQuad = [
  [0, 0.04],
  [1, 0],
  [0.994, 1],
  [0, 0.98],
];
