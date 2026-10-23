import { RenderMode, ServerRoute } from '@angular/ssr';

// Pré-renderização (D-098): a Home nos dois idiomas sai em HTML no build; o resto (redirecionamento
// e rotas de desenvolvimento) fica só no navegador.
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'en', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
