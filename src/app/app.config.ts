import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { LocaleService } from './core/i18n';

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
  ],
};
