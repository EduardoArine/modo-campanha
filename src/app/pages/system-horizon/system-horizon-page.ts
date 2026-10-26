import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  DOCUMENT,
  effect,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { LocaleService } from '../../core/i18n';
import { McAction, McIcon } from '../../shared/ui';
import { AttractPlayback } from '../../system-horizon/attract-playback';
import { ATTRACT_CARTRIDGE_SERIAL } from '../../system-horizon/content/attract-content';
import { SystemHorizonScreen } from '../../system-horizon/system-horizon-screen';
import { CampaignGame } from './campaign-game';
import { HORIZON_WORLD } from './horizon-world.provider';
import { HorizonText } from './horizon-text';

type Phase = 'title' | 'howto' | 'play' | 'text';

/**
 * SYSTEM HORIZON interativo (D-103, docs/23 §18): rota própria (`/system-horizon`, `/en/...`),
 * carregada sob demanda. Tela de título com o attract mode ao fundo → como jogar → jogo; a versão
 * em texto (a mesma jornada, em DOM) fica a um clique em qualquer momento. O jogo continua vivo
 * (oculto e pausado) enquanto o visitante lê a versão em texto.
 */
@Component({
  selector: 'app-system-horizon-page',
  imports: [CampaignGame, HorizonText, McAction, McIcon, RouterLink, SystemHorizonScreen],
  templateUrl: './system-horizon-page.html',
  styleUrl: './system-horizon-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemHorizonPage {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly world = inject(HORIZON_WORLD);
  protected readonly playback = new AttractPlayback();
  protected readonly phase = signal<Phase>('title');
  /** O jogo já começou (fica montado, oculto, durante a versão em texto). */
  protected readonly started = signal(false);
  protected readonly reducedMotion = signal(false);
  private returnTo: Phase = 'title';
  private readonly injector = inject(Injector);
  private readonly document = inject(DOCUMENT);
  protected readonly serial = ATTRACT_CARTRIDGE_SERIAL;

  constructor() {
    const title = inject(Title);
    // Depois do efeito do LocaleService (título do site), o título desta página.
    effect(() => title.setTitle(this.ui().systemHorizon.game.pageTitle));

    const win = this.document.defaultView;
    const reduce = win?.matchMedia?.('(prefers-reduced-motion: reduce)');
    this.reducedMotion.set(!!reduce?.matches);
    if (win && !reduce?.matches) this.playback.play();
    const onChange = (event: MediaQueryListEvent) => {
      this.reducedMotion.set(event.matches);
      if (event.matches) this.playback.pause();
    };
    reduce?.addEventListener?.('change', onChange);
    inject(DestroyRef).onDestroy(() => reduce?.removeEventListener?.('change', onChange));
  }

  protected howTo(): void {
    this.go('howto', '#horizon-howto-title');
  }

  protected play(): void {
    this.started.set(true);
    this.go('play', '.stage');
  }

  protected showText(): void {
    this.returnTo = this.phase() === 'text' ? this.returnTo : this.phase();
    this.go('text', '#horizon-text-title');
  }

  protected leaveText(): void {
    const back = this.returnTo === 'play' ? 'play' : 'title';
    this.go(back, back === 'play' ? '.stage' : '#horizon-start');
  }

  private go(phase: Phase, focus: string): void {
    this.phase.set(phase);
    afterNextRender(
      () => this.document.querySelector<HTMLElement>(focus)?.focus({ preventScroll: false }),
      { injector: this.injector },
    );
  }
}
