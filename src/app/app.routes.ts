import { Routes } from '@angular/router';

// Um caminho por idioma (D-020): `/` → pt-BR, `/en` → en. O LocaleService lê o idioma da URL
// e cuida do título; por isso as rotas não definem `title`.
const loadHome = () => import('./pages/home/home-page').then((m) => m.HomePage);

export const routes: Routes = [
  { path: '', loadComponent: loadHome },
  { path: 'en', loadComponent: loadHome },
  { path: '**', redirectTo: '' },
];
