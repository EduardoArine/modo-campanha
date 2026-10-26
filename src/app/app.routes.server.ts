import { RenderMode, ServerRoute } from '@angular/ssr';

// Pré-renderização (D-098): a Home e o SYSTEM HORIZON nos dois idiomas saem em HTML no build; o resto (redirecionamento
// e rotas de desenvolvimento) fica só no navegador.
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'en', renderMode: RenderMode.Prerender },
  // SYSTEM HORIZON (D-103): a tela de título sai em HTML; o jogo liga no navegador.
  { path: 'system-horizon', renderMode: RenderMode.Prerender },
  { path: 'en/system-horizon', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
