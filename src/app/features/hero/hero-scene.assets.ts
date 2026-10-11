/**
 * Assets dedicados da cena do Hero (docs/21-hero-refinement.md, §3). Enquanto um campo estiver
 * ausente, a cena usa a versão vetorial (SVG + CSS). Todos são decorativos: a cena é aria-hidden.
 * Caminhos relativos a `public/` (ex.: `assets/hero/hero-hardware.webp`).
 */
export interface HeroSceneAssets {
  /** Console + controle + cartucho num único render, fundo transparente (~2:1). */
  hardware?: string;
  /** Ambiente atrás da Hero (parede + mesa); lado do texto escuro e vazio. */
  backdrop?: string;
  /** Tela do CRT com o cartucho em execução (4:3). Ausente = artwork do MC-001. */
  screen?: string;
}

export const HERO_SCENE_ASSETS: HeroSceneAssets = {};
