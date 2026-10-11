/**
 * Cena do Hero (D-066, docs/21 §6): renders oficiais do ecossistema MC-01 compostos sobre o
 * ambiente aprovado. Tudo decorativo (a cena é aria-hidden). Derivados de runtime gerados a partir
 * das fontes em `design/source/hero/` e `design/source/mc-cart/`, recortados no alfa e dimensionados
 * pelo tamanho real de exibição (2× DPR). Caminhos relativos a `public/`.
 */
export interface HeroSceneImage {
  src: string;
  /** Larguras disponíveis (`srcset` com descritores `w`). */
  srcset: string;
  width: number;
  height: number;
}

export interface HeroScene {
  /** Ambiente (setup MC-01) desfocado e escurecido: plano de fundo, nunca um banner. */
  ambient: string;
  crt: HeroSceneImage;
  console: HeroSceneImage;
  controller: HeroSceneImage;
  /** MC-CART MC-001 em 3/4 (D-065). */
  cart: HeroSceneImage;
  /** SYSTEM HORIZON reduzido para a tela do CRT (substitui a arte de 215 KB nesta cena). */
  screen: { src: string; width: number; height: number };
}

const image = (name: string, small: number, large: number, height: number): HeroSceneImage => ({
  src: `assets/hero/${name}-${large}.webp`,
  srcset: `assets/hero/${name}-${small}.webp ${small}w, assets/hero/${name}-${large}.webp ${large}w`,
  width: large,
  height,
});

export const HERO_SCENE: HeroScene = {
  ambient: 'assets/hero/ambient-1280.webp',
  crt: image('crt', 480, 900, 794),
  console: image('console', 640, 1040, 704),
  controller: image('controller', 360, 680, 479),
  cart: image('cart', 160, 300, 243),
  screen: { src: 'assets/hero/screen-440.webp', width: 440, height: 330 },
};

/**
 * Vidro do CRT no render recortado (`crt-*.webp`, sistema de coordenadas 1167 × 1029): leve
 * perspectiva (lado direito mais alto) e cantos arredondados. A tela é recortada por esse caminho.
 */
export const CRT_GLASS = {
  viewBox: '0 0 1167 1029',
  box: { x: 119, y: 136, width: 706, height: 596 },
  path: 'M170 176L776 139Q821 136 822 181L825 687Q825 732 780 731L164 717Q119 716 120 671L125 224Q125 179 170 176Z',
} as const;
