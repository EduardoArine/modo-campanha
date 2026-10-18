import { DOCUMENT, ViewportScroller } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  Injector,
  input,
  model,
  signal,
} from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { PROJECTS } from '../../data';
import { McAction, McIcon } from '../../shared/ui';
import { AttractPlayback } from '../../system-horizon/attract-playback';
import { SystemHorizonScreen } from '../../system-horizon/system-horizon-screen';
import { LAB_COPY } from './lab-copy';
import {
  consoleVars,
  glassVars,
  MC01_CONSOLE,
  MC01_CONTROLLER,
  MC01_CRT,
  Mc01Pose,
  poseY,
} from './mc01-console';
import type { LabPhase } from './inventory-lab-page';

/** Movimento do cartucho até o encaixe; depois o MC-01 carrega e o CRT liga. */
const MOVE_MS = 620;
/** Ejetar: o mesmo caminho ao contrário. */
const EJECT_MS = 600;
const BOOT_MS = 450;

/**
 * ⚠️ PROTÓTIPO DEV-ONLY — H2, Physical Cartridge Experience (docs/24 §16). MC-01 montado em três
 * camadas oficiais (traseira < cartucho < frente) num sistema de coordenadas único; o cartucho
 * desce por `transform` e some atrás da frente. CRT frontal oficial com a camada digital no vidro
 * (arte do SYSTEM HORIZON, teaser sob demanda, carregamento, fallback). O case fica fora do vidro.
 */
@Component({
  selector: 'app-lab-physical',
  imports: [McAction, McIcon, SystemHorizonScreen],
  templateUrl: './lab-physical.html',
  styleUrls: ['./lab-physical.scss', './lab-physical-layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabPhysical {
  readonly phase = model.required<LabPhase>();
  readonly error = input(false);
  readonly pad = input(false);
  /** Pose fixa para capturas (`?pose=out|aligned|partial|seated`); sem transição. */
  readonly pose = input<Mc01Pose | null>(null);

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly copy = computed(() => LAB_COPY[this.locale.locale()]);
  private readonly injector = inject(Injector);
  private readonly scroller = inject(ViewportScroller);
  private readonly window = inject(DOCUMENT).defaultView;
  private timers: ReturnType<typeof setTimeout>[] = [];

  protected readonly project = PROJECTS[0];
  protected readonly back = MC01_CONSOLE.back;
  protected readonly front = MC01_CONSOLE.front;
  protected readonly slot = MC01_CONSOLE.slot;
  protected readonly cart = 'assets/cartridges/mc-001/console-scale.webp';
  protected readonly crt = MC01_CRT;
  protected readonly controller = MC01_CONTROLLER;
  protected readonly artwork = this.project.cartridge.artwork!;
  protected readonly consoleStyle = consoleVars();
  protected readonly glassStyle = glassVars();

  protected readonly booting = signal(false);
  protected readonly ejecting = signal(false);
  protected readonly teaser = signal(false);
  protected readonly status = signal('');
  protected readonly playback = new AttractPlayback();

  /** Pose do cartucho: fora no INITIAL, encaixado ao inserir (a transição faz o caminho). */
  protected readonly cartY = computed(() =>
    poseY(
      this.pose() ?? (this.phase() === 'initial' || this.phase() === 'selected' ? 'out' : 'seated'),
    ),
  );
  /** Sombra de contato: só com o cartucho fora do slot (some enquanto ele entra). */
  protected readonly shadow = computed(() => {
    const pose = this.pose();
    if (pose) return pose === 'out' ? 1 : pose === 'aligned' ? 0.6 : 0;
    return this.phase() === 'initial' || this.phase() === 'selected' ? 1 : 0;
  });
  protected readonly screen = computed(() => {
    const phase = this.phase();
    if (phase === 'ready') return this.error() ? 'error' : this.teaser() ? 'teaser' : 'art';
    // Captura da pose `seated` em INSERTING mostra o carregamento (o encaixe já terminou).
    if (phase === 'inserting' && (this.booting() || this.pose() === 'seated')) return 'loading';
    return 'off';
  });

  constructor() {
    // Preferência de movimento mudou para reduzir: pausa o teaser (como o Hero).
    const reduce = this.window?.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => event.matches && this.playback.pause();
    reduce?.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => {
      this.clear();
      reduce?.removeEventListener('change', onChange);
    });
  }

  protected insert(): void {
    if (this.phase() === 'inserting' || this.phase() === 'ready') return;
    this.clear();
    this.status.set(this.copy().status.loading);
    if (this.reducedMotion()) return this.onReady();
    this.booting.set(false);
    this.phase.set('inserting');
    this.timers.push(setTimeout(() => this.booting.set(true), MOVE_MS));
    this.timers.push(setTimeout(() => this.onReady(), MOVE_MS + BOOT_MS));
  }

  /** Movimento inverso: o cartucho volta à pose `out`; o CRT desliga na hora. */
  protected eject(): void {
    this.clear();
    this.teaser.set(false);
    this.playback.pause();
    // B1: durante a volta, o "levantar" do hover/foco não encurta a transição.
    this.ejecting.set(true);
    this.timers.push(setTimeout(() => this.ejecting.set(false), EJECT_MS));
    this.phase.set('initial');
    this.status.set(this.copy().status.ejected);
    this.focus('lab-h2-insert', false);
  }

  /** Teaser sob demanda (a tela mostra a arte oficial até o visitante pedir). */
  protected toggleTeaser(): void {
    if (!this.teaser()) {
      this.teaser.set(true);
      this.playback.play();
      return;
    }
    this.playback.toggle();
  }

  private onReady(): void {
    this.booting.set(false);
    this.phase.set('ready');
    this.status.set('');
    afterNextRender(
      () => {
        this.scroller.scrollToAnchor('lab-h2-tv', {
          behavior: this.reducedMotion() ? 'auto' : 'smooth',
        });
        this.window?.document.getElementById('lab-h2-status')?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }

  private focus(id: string, preventScroll: boolean): void {
    afterNextRender(() => this.window?.document.getElementById(id)?.focus({ preventScroll }), {
      injector: this.injector,
    });
  }

  private clear(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }

  private reducedMotion(): boolean {
    return this.window?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }
}
