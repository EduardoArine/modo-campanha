import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Modo Campanha — Eduardo Arine',
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePage),
  },
  { path: '**', redirectTo: '' },
];
