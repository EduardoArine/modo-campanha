import { ViewportScroller } from '@angular/common';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { LocaleService } from './core/i18n';
import { provideAnchorFocus } from './core/layout/anchor-focus';

/** Respiro entre o header fixo e o topo da seção ao navegar por âncora (= --mc-space-4). */
const ANCHOR_GAP = 16;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // A Home chega pré-renderizada (D-098): o navegador reaproveita o HTML e repete os cliques
    // feitos antes de o JavaScript carregar.
    provideClientHydration(withEventReplay()),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      // Clicar de novo na marca ou numa âncora já ativa volta a rolar (onepage).
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    // Âncoras levam o foco ao título da seção de destino (D-098).
    provideAnchorFocus(),
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
