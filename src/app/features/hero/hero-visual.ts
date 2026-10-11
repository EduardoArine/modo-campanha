import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { McCrtFrame } from '../../shared/signature';

/** Passos do boot na tela do CRT (FASE 5, D-059). `ready` = estado aprovado "INSERT CARTRIDGE". */
type BootStep = 'initializing' | 'player' | 'ready';

/** Duração de cada passo: 2 passos ≈ 840 ms (≤ 1 s, docs/02). */
const BOOT_STEP_MS = 420;
/** Uma vez por sessão: não repetir o boot de forma intrusiva (docs/02). */
const BOOT_SEEN_KEY = 'mc-boot-seen';

/**
 * Cena do Hero (Home Slice 01-C, D-037): CRT sobre o console MC-01 + luz quente.
 * Puramente decorativa (aria-hidden): não comunica informação necessária ao Hero.
 * O console é CSS local (ainda não é componente: um só uso).
 * Boot / Intro (FASE 5, D-059): na primeira visita da sessão, a tela mostra INITIALIZING
 * CAMPAIGN... → PLAYER FOUND antes de INSERT CARTRIDGE (≤ 1 s). Não bloqueia nada, não muda o
 * layout e não acontece com `prefers-reduced-motion`.
 */
@Component({
  selector: 'app-hero-visual',
  imports: [McCrtFrame],
  template: `
    <div class="scene">
      <mc-crt-frame class="crt">
        <p class="screen-message">{{ message() }}</p>
      </mc-crt-frame>

      <div class="console">
        <span class="console-label">{{ ui().crt.identification }}</span>
        <span class="console-slot"></span>
        <span class="console-vents"></span>
        <span class="console-buttons"><span></span><span></span></span>
        <span class="console-led"></span>
      </div>
    </div>
  `,
  styleUrl: './hero-visual.scss',
  host: { 'aria-hidden': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroVisual {
  protected readonly ui = inject(LocaleService).ui;
  private readonly step = signal<BootStep>('ready');

  protected readonly message = computed(() => {
    const ui = this.ui();
    switch (this.step()) {
      case 'initializing':
        return ui.boot.initializing;
      case 'player':
        return ui.boot.playerFound;
      default:
        return ui.crt.empty;
    }
  });

  constructor() {
    const win = inject(DOCUMENT).defaultView;
    if (!win || !shouldBoot(win)) return;
    this.step.set('initializing');
    const timers = [
      setTimeout(() => this.step.set('player'), BOOT_STEP_MS),
      setTimeout(() => this.step.set('ready'), 2 * BOOT_STEP_MS),
    ];
    inject(DestroyRef).onDestroy(() => timers.forEach(clearTimeout));
  }
}

/** Boot só na primeira visita da sessão e sem `prefers-reduced-motion`. */
function shouldBoot(win: Window): boolean {
  if (win.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    if (win.sessionStorage.getItem(BOOT_SEEN_KEY)) return false;
    win.sessionStorage.setItem(BOOT_SEEN_KEY, '1');
  } catch {
    // Sem storage (modo privado restrito): melhor não repetir o boot a cada visita.
    return false;
  }
  return true;
}
