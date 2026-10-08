import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { Locale, localeFromUrl, Localized, localizedUrl } from './locale';
import { UI_EN } from './ui.en';
import { UI_PT_BR, UiDictionary } from './ui.pt-BR';

const UI_DICTIONARIES: Record<Locale, UiDictionary> = { 'pt-BR': UI_PT_BR, en: UI_EN };

/**
 * Idioma ativo derivado da URL (fonte da verdade, D-020). Trocar de idioma = navegar.
 * Mantém `<html lang>`, título e description em sincronia com o idioma.
 */
@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly locale = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => localeFromUrl(event.urlAfterRedirects)),
    ),
    { initialValue: localeFromUrl(this.router.url) },
  );

  /** Dicionário de UI do idioma ativo. */
  readonly ui = computed(() => UI_DICTIONARIES[this.locale()]);

  constructor() {
    effect(() => {
      const ui = this.ui();
      this.document.documentElement.lang = this.locale();
      this.title.setTitle(ui.meta.title);
      this.meta.updateTag({ name: 'description', content: ui.meta.description });
    });
  }

  /** Resolve um valor de conteúdo bilíngue no idioma ativo. */
  pick<T>(value: Localized<T>): T {
    return value[this.locale()];
  }

  /** URL atual no idioma informado (para links de troca de idioma). */
  urlFor(target: Locale): string {
    return localizedUrl(this.router.url, target);
  }

  switchTo(target: Locale): Promise<boolean> {
    return this.router.navigateByUrl(this.urlFor(target));
  }
}
