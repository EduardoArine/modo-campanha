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
 * Fundo da Hero (D-067; arte final D-086, revista em D-089): o setup MC-01 ao pôr do sol com as
 * peças oficiais (CRT, MC-01, MC-001, controle), usado direto. Mestre 2× em
 * `design/source/hero/hero-background.png` (3344 × 1882, tubo do CRT transparente); derivados
 * gerados por `build-background.mjs`.
 * Coordenadas nos comentários e no SCSS estão na fonte 1× (1672 × 941).
 * `mobile` é um recorte quadrado da mesma imagem (console, CRT e controle; x 628–1569), para o
 * celular não baixar a imagem inteira só para mostrar o centro dela.
 */
export const HERO_BACKGROUND = {
  full: image('background', [640, 960, 1280, 1672, 2560, 3344], 3344, 1882),
  mobile: image('background-mobile', [480, 800, 1200], 1200, 1200),
};

/**
 * Cantos da tela do SYSTEM HORIZON, em frações da caixa x 1152,5–1480, y 149,5–405 da fonte
 * (posicionada em `hero-scene.scss`). O tubo do CRT é transparente na imagem (D-080) e a tela fica
 * ATRÁS dela. A folga é só lateral (~4,5 px além do vidro), porque a tela 4:3 escala pela altura:
 * folga vertical ampliaria o teaser e levaria o HUD para baixo do aro. Em cima e embaixo, onde o
 * tubo é abaulado, sobram até ~3,6 px da fonte (≤ 3 px CSS) de vidro escuro. A TV está levemente
 * girada (lado direito mais alto).
 */
export const HERO_CRT_GLASS: ScreenQuad = [
  [0.004, 0.042],
  [1, 0],
  [0.998, 1],
  [0, 0.971],
];
