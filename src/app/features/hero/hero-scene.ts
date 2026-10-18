import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { McIcon } from '../../shared/ui';
import { AttractPlayback } from '../../system-horizon/attract-playback';
import { SystemHorizonScreen } from '../../system-horizon/system-horizon-screen';
import { HERO_BACKGROUND, HERO_CRT_GLASS } from './hero-scene.assets';

/**
 * Cena da Hero: o fundo aprovado (D-067) e, atrás do tubo transparente do CRT da imagem (D-080),
 * o attract mode do SYSTEM HORIZON (D-068, docs/22). O teaser só carrega depois do `load` da
 * página, no idle (não disputa o LCP); antes dele, o tubo mostra a TV desligada. Toca sozinho (até 3
 * voltas) salvo com `prefers-reduced-motion`; o controle de pausa é o único elemento interativo.
 */
@Component({
  selector: 'app-hero-scene',
  imports: [McIcon, SystemHorizonScreen],
  templateUrl: './hero-scene.html',
  styleUrl: './hero-scene.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroScene {
  protected readonly ui = inject(LocaleService).ui;
  protected readonly background = HERO_BACKGROUND;
  protected readonly glass = HERO_CRT_GLASS;
  protected readonly playback = new AttractPlayback();
  protected readonly teaserReady = signal(false);

  constructor() {
    const win = inject(DOCUMENT).defaultView;
    afterNextRender(() => win && whenLoadedAndIdle(win, () => this.teaserReady.set(true)));

    const reduce = win?.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!reduce?.matches) this.playback.play();
    // Se o sistema passar a pedir menos movimento, para no quadro-chave.
    const onChange = (event: MediaQueryListEvent) => event.matches && this.playback.pause();
    reduce?.addEventListener?.('change', onChange);
    inject(DestroyRef).onDestroy(() => reduce?.removeEventListener?.('change', onChange));
  }
}

/** Pausa entre a página pronta e o teaser: a Hero assenta antes do CRT ligar (e fora do LCP). */
const TEASER_DELAY_MS = 1000;

/** Depois do `load` (imagem da Hero, fontes), quando o navegador estiver ocioso, + TEASER_DELAY_MS. */
function whenLoadedAndIdle(win: Window, done: () => void): void {
  const later = () => win.setTimeout(done, TEASER_DELAY_MS);
  const idle = () =>
    win.requestIdleCallback ? win.requestIdleCallback(later, { timeout: 2000 }) : later();
  if (win.document.readyState === 'complete') idle();
  else win.addEventListener('load', idle, { once: true });
}
