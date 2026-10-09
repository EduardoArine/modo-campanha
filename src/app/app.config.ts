import { ViewportScroller } from '@angular/common';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { LocaleService } from './core/i18n';

/** Respiro entre o header fixo e o topo da seção ao navegar por âncora (= --mc-space-4). */
const ANCHOR_GAP = 16;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      // Clicar de novo na marca ou numa âncora já ativa volta a rolar (onepage).
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    // Instancia o LocaleService no boot para sincronizar <html lang>, título e description.
    provideAppInitializer(() => {
      inject(LocaleService);
    }),
    // O ViewportScroller do Angular ignora o scroll-margin do CSS: o offset do header fixo
    // é aplicado aqui, medindo a altura real do header a cada navegação por âncora.
    provideAppInitializer(() => {
      inject(ViewportScroller).setOffset(() => {
        const header = document.querySelector('app-site-header');
        return [0, (header?.getBoundingClientRect().height ?? 0) + ANCHOR_GAP];
      });
    }),
  ],
};
