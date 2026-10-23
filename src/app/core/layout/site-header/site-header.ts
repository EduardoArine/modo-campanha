import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { LOCALES, LocaleService } from '../../i18n';
import { SOCIAL_LINKS } from '../../../data';
import { McAction, McIcon } from '../../../shared/ui';

/**
 * Header do site (Home Slice 01-A, D-037). Sólido e fixo; persiste entre `/` e `/en`.
 * Marca: símbolo do Modo Campanha (D-085) + wordmark MODO CAMPANHA.
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
    // Só destinos que existem na Home de produção, na ordem da página. Jornada aponta para o
    // Diário de Campanha (conteúdo real desde D-074); Contato, para o Final Checkpoint (D-052).
    return [
      { label: nav.about, fragment: 'player-status' },
      { label: nav.projects, fragment: 'project-inventory' },
      { label: nav.journey, fragment: 'campaign-log' },
      { label: nav.contact, fragment: 'final-checkpoint' },
    ];
  });

  /**
   * Seção que o visitante está lendo (D-098): a última cujo topo já passou de um terço da tela,
   * abaixo do header; no fim da página, a última. Antes do Sobre (no Hero), nenhuma.
   */
  protected readonly active = signal<string | null>(null);

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

  constructor() {
    // Altura real do header (65 px no desktop, maior no mobile com a nav em 2ª linha, D-057)
    // publicada como --mc-header-block: base do scroll-padding de âncoras e foco (D-060).
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const root = inject(DOCUMENT).documentElement;
    const destroyRef = inject(DestroyRef);
    const view = inject(DOCUMENT).defaultView;
    afterNextRender(() => {
      if (!view) return;
      let frame = 0;
      const update = () => {
        frame = 0;
        const line = view.innerHeight / 3;
        const ids = this.navItems().map((item) => item.fragment);
        // No topo nunca é "fim" (no primeiro cálculo a página ainda pode estar curta).
        const atEnd = view.scrollY > 0 && view.innerHeight + view.scrollY >= root.scrollHeight - 2;
        let current: string | null = atEnd ? ids[ids.length - 1] : null;
        if (!atEnd)
          for (const id of ids) {
            const top = view.document.getElementById(id)?.getBoundingClientRect().top;
            if (top !== undefined && top <= line) current = id;
          }
        this.active.set(current);
      };
      const onScroll = () => (frame ||= view.requestAnimationFrame(update));
      view.addEventListener('scroll', onScroll, { passive: true });
      view.addEventListener('resize', onScroll, { passive: true });
      update();
      destroyRef.onDestroy(() => {
        view.removeEventListener('scroll', onScroll);
        view.removeEventListener('resize', onScroll);
        if (frame) view.cancelAnimationFrame(frame);
      });
    });
    afterNextRender(() => {
      if (typeof ResizeObserver === 'undefined') return;
      const observer = new ResizeObserver(([entry]) =>
        root.style.setProperty(
          '--mc-header-block',
          `${Math.round(entry.borderBoxSize[0].blockSize)}px`,
        ),
      );
      observer.observe(host);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /** Currículo: só com URL real (nenhum href placeholder). */
  protected readonly resume = SOCIAL_LINKS.find((link) => link.kind === 'resume');
}
