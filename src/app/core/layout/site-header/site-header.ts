import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { LOCALES, LocaleService } from '../../i18n';
import { SOCIAL_LINKS } from '../../../data';
import { McAction, McIcon } from '../../../shared/ui';

/**
 * Header do site (Home Slice 01-A, D-037). Sólido e fixo; persiste entre `/` e `/en`.
 * Marca provisória (MC + MODO CAMPANHA) até o monograma/wordmark final.
 * Sem metadados técnicos (ONLINE, build, versão, MC-01).
 * Currículo só aparece quando existir URL real.
 */
@Component({
  selector: 'app-site-header',
  imports: [RouterLink, McAction, McIcon],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  private readonly router = inject(Router);
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;

  protected readonly navItems = computed(() => {
    const nav = this.ui().nav;
    return [
      { label: nav.about, fragment: 'player-status' },
      { label: nav.projects, fragment: 'project-inventory' },
      { label: nav.journey, fragment: 'campaign-log' },
      { label: nav.contact, fragment: 'final-checkpoint' },
    ];
  });

  /** Links de idioma: mesma URL (caminho + âncora) no outro idioma. */
  protected readonly languages = computed(() =>
    LOCALES.map((locale) => ({
      locale,
      short: this.ui().language.short[locale],
      name: this.ui().language.names[locale],
      link: this.router.parseUrl(this.locale.urlFor(locale)),
      current: this.locale.locale() === locale,
    })),
  );

  /** Currículo: só com URL real (nenhum href placeholder). */
  protected readonly resume = SOCIAL_LINKS.find((link) => link.kind === 'resume');
}
