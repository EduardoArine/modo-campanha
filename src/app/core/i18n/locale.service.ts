import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { DEFAULT_LOCALE, Locale, localeFromUrl, Localized, localizedUrl, LOCALES } from './locale';
import { UI_EN } from './ui.en';
import { UI_PT_BR, UiDictionary } from './ui.pt-BR';

const UI_DICTIONARIES: Record<Locale, UiDictionary> = { 'pt-BR': UI_PT_BR, en: UI_EN };

/** Formato de idioma do Open Graph. */
const OG_LOCALE: Record<Locale, string> = { 'pt-BR': 'pt_BR', en: 'en_US' };

/**
 * Idioma ativo derivado da URL (fonte da verdade, D-020). Trocar de idioma = navegar.
 * Mantém `<html lang>`, título, description, Open Graph, `hreflang` e canonical em sincronia com o
 * idioma (SEO bilíngue, FASE 8, D-060). URLs absolutas a partir do `<base href>`.
 */
@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  /** URL atual do Router (inclui fragmento), atualizada a cada navegação. */
  readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  readonly locale = computed(() => localeFromUrl(this.url()));

  /** Dicionário de UI do idioma ativo. */
  readonly ui = computed(() => UI_DICTIONARIES[this.locale()]);

  constructor() {
    effect(() => {
      const ui = this.ui();
      this.document.documentElement.lang = this.locale();
      this.title.setTitle(ui.meta.title);
      this.meta.updateTag({ name: 'description', content: ui.meta.description });
      // Open Graph por idioma, com a imagem de compartilhamento de cada idioma (D-085).
      const locale = this.locale();
      this.meta.updateTag({ property: 'og:title', content: ui.meta.title });
      this.meta.updateTag({ property: 'og:description', content: ui.meta.description });
      this.meta.updateTag({ property: 'og:locale', content: OG_LOCALE[locale] });
      const other = LOCALES.find((candidate) => candidate !== locale) ?? DEFAULT_LOCALE;
      this.meta.updateTag({ property: 'og:locale:alternate', content: OG_LOCALE[other] });
      this.meta.updateTag({ property: 'og:url', content: this.absoluteUrl(locale) });
      this.meta.updateTag({
        property: 'og:image',
        content: new URL(`og-image-${locale}.png`, this.document.baseURI).href,
      });
      this.meta.updateTag({ property: 'og:image:alt', content: ui.meta.imageAlt });
      for (const alternate of LOCALES) {
        this.setLink('alternate', this.absoluteUrl(alternate), alternate);
      }
      this.setLink('alternate', this.absoluteUrl(DEFAULT_LOCALE), 'x-default');
      this.setLink('canonical', this.absoluteUrl(locale));
    });
  }

  /** Resolve um valor de conteúdo bilíngue no idioma ativo. */
  pick<T>(value: Localized<T>): T {
    return value[this.locale()];
  }

  /** URL atual no idioma informado (para links de troca de idioma). */
  urlFor(target: Locale): string {
    return localizedUrl(this.url(), target);
  }

  /** Caminho da Home no idioma ativo (`/` ou `/en`). */
  homePath(): string {
    return localizedUrl('/', this.locale());
  }

  switchTo(target: Locale): Promise<boolean> {
    return this.router.navigateByUrl(this.urlFor(target));
  }

  /** URL absoluta da página atual no idioma informado, sem query nem fragmento. */
  private absoluteUrl(target: Locale): string {
    const path = localizedUrl(this.url().split(/[?#]/)[0], target).slice(1);
    return new URL(path, this.document.baseURI).href;
  }

  private setLink(rel: 'alternate' | 'canonical', href: string, hreflang?: string): void {
    const selector = `link[rel="${rel}"]` + (hreflang ? `[hreflang="${hreflang}"]` : '');
    let link = this.document.head.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      if (hreflang) link.hreflang = hreflang;
      this.document.head.appendChild(link);
    }
    link.href = href;
  }
}
