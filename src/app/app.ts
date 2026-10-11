import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LocaleService } from './core/i18n';
import { SiteHeader } from './core/layout/site-header/site-header';

/**
 * Shell: link "pular para o conteúdo" (FASE 8, D-060) + header + rota.
 * O link leva o foco ao `<main id="main-content">` da página, sem mudar a URL
 * (um `href="#..."` navegaria a partir do `<base href>` e poderia trocar o idioma).
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader],
  template: `
    <a class="skip-link" href="#main-content" (click)="skipToContent($event)">
      {{ ui().a11y.skipToContent }}
    </a>
    <app-site-header />
    <router-outlet />
  `,
  styles: `
    @use 'mc' as *;

    // Fora da tela até receber foco por teclado; então aparece sobre o header.
    .skip-link {
      position: fixed;
      top: space(2);
      left: space(2);
      z-index: 20;
      padding: space(3) space(4);
      @include type(body-s);
      font-weight: 500;
      background: var(--mc-surface);
      color: var(--mc-text);
      border: var(--mc-border-width-default) solid var(--mc-border-default);
      text-decoration: none;
      transform: translateY(calc(-100% - #{space(4)}));

      &:focus {
        transform: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly ui = inject(LocaleService).ui;
  private readonly document = inject(DOCUMENT);

  protected skipToContent(event: Event): void {
    const main = this.document.getElementById('main-content');
    if (!main) return;
    event.preventDefault();
    main.focus();
  }
}
