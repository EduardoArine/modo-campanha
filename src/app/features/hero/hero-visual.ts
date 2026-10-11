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
import { PROJECTS } from '../../data';
import { CRT_GLASS, HERO_SCENE } from './hero-scene.assets';

/** Passos do boot na tela do CRT (FASE 5, D-059). `ready` = cartucho em execução. */
type BootStep = 'initializing' | 'player' | 'ready';

/** Duração de cada passo: 2 passos ≈ 840 ms (≤ 1 s, docs/02). */
const BOOT_STEP_MS = 420;
/** Uma vez por sessão: não repetir o boot de forma intrusiva (docs/02). */
const BOOT_SEEN_KEY = 'mc-boot-seen';
/** Cartucho em execução no MC-01 da Hero: o próprio Modo Campanha (MC-001). */
const RUNNING_SERIAL = 'MC-001';

/**
 * Cena do Hero (D-066, docs/21 §6): o ecossistema MC-01 composto com os renders oficiais (CRT,
 * console com cartucho, MC-CART 3/4, controle) sobre o ambiente aprovado, em três planos. Nada é
 * redesenhado em CSS: o CSS só posiciona, escala, ilumina e integra. Puramente decorativa
 * (aria-hidden). Boot / Intro (D-059) na tela do CRT: INITIALIZING CAMPAIGN... → PLAYER FOUND
 * (≤ 1 s, uma vez por sessão, nunca com `prefers-reduced-motion`), depois SYSTEM HORIZON.
 */
@Component({
  selector: 'app-hero-visual',
  templateUrl: './hero-visual.html',
  styleUrl: './hero-visual.scss',
  host: { 'aria-hidden': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroVisual {
  private readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly scene = HERO_SCENE;
  protected readonly glass = CRT_GLASS;
  protected readonly ambient = `url(${HERO_SCENE.ambient})`;
  private readonly step = signal<BootStep>('ready');

  /** Cartucho em execução (serial e nome aprovados do MC-001). */
  protected readonly cartridge = computed(() => {
    const project = PROJECTS.find((p) => p.serial === RUNNING_SERIAL);
    return project ? { serial: project.serial, title: this.locale.pick(project.title) } : null;
  });

  /** Tela pronta mostra o cartucho; sem cartucho aprovado, volta a "INSERT CARTRIDGE". */
  protected readonly running = computed(() => (this.step() === 'ready' ? this.cartridge() : null));

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
