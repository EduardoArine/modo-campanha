import { DOCUMENT } from '@angular/common';
import { DestroyRef, EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';
import { Router, Scroll } from '@angular/router';

/**
 * Navegação por âncora (menu e CTAs, D-098): depois de rolar até a seção, o foco vai ao título dela
 * (`tabindex="-1"`, sem rolar de novo). O próximo Tab continua dentro da seção e o leitor de tela
 * anuncia onde o visitante chegou. A classe `mc-anchor-target` tira o anel do foco programático.
 */
export function provideAnchorFocus(): EnvironmentProviders {
  return provideAppInitializer(() => {
    const document = inject(DOCUMENT);
    const subscription = inject(Router).events.subscribe((event) => {
      if (!(event instanceof Scroll) || !event.anchor) return;
      const section = document.getElementById(event.anchor);
      const target = section?.querySelector<HTMLElement>('h2') ?? section;
      if (!target) return;
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.classList.add('mc-anchor-target');
      target.focus({ preventScroll: true });
    });
    inject(DestroyRef).onDestroy(() => subscription.unsubscribe());
  });
}
