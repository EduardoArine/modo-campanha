import { Routes } from '@angular/router';

import { DEV_ROUTES } from './dev/dev.routes';

// Um caminho por idioma (D-020): `/` → pt-BR, `/en` → en. O LocaleService lê o idioma da URL
// e cuida do título; por isso as rotas não definem `title`.
// DEV_ROUTES é vazio em produção (ver src/app/dev/dev.routes.ts).
const loadHome = () => import('./pages/home/home-page').then((m) => m.HomePage);

export const routes: Routes = [
  { path: '', loadComponent: loadHome },
  { path: 'en', loadComponent: loadHome },
  ...DEV_ROUTES,
  { path: '**', redirectTo: '' },
];
