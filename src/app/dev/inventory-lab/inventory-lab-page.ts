import { DOCUMENT, NgTemplateOutlet, ViewportScroller } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { LocaleService } from '../../core/i18n';
import { PROJECTS, TAGS } from '../../data';
import { McCart, McCrtProjectViewer } from '../../shared/signature';
import { McAction, McChip, McIcon, McSectionHeader } from '../../shared/ui';
import { AttractPlayback } from '../../system-horizon/attract-playback';
import { SystemHorizonScreen } from '../../system-horizon/system-horizon-screen';
import { LAB_COPY } from './lab-copy';
import { LabPhysical } from './lab-physical';
import { Mc01Pose } from './mc01-console';

/** Direções do checkpoint visual (docs/24): A, B e o híbrido recomendado. */
export type LabDirection = 'a' | 'b' | 'h' | 'h2';
/** Estados explícitos da experiência (brief §5). `error` = asset ou teaser falhou. */
export type LabPhase = 'initial' | 'selected' | 'inserting' | 'ready';

/** Inserção curta: o cartucho desce ao slot e o MC-01 carrega (≈ 600 ms; docs/05, D-058). */
const INSERT_MS = 600;

/**
 * ⚠️ PROTÓTIPO DEV-ONLY do Project Inventory (docs/24). Rota `/dev/inventory-lab`, só no build de
 * desenvolvimento (`dev.routes.development.ts`). Não é a implementação definitiva: serve para o
 * Eduardo escolher a direção visual. Usa dados reais do MC-001, os renders oficiais, o CRT oficial
 * e a tela do SYSTEM HORIZON sem modificá-los. Query params: `dir` (a|b|h), `state`
 * (initial|selected|inserting|ready), `error` (1 = asset/teaser falhou), `clean` (1 = sem barra).
 */
@Component({
  selector: 'app-inventory-lab-page',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    McSectionHeader,
    McCart,
    McCrtProjectViewer,
    McAction,
    McChip,
    McIcon,
    SystemHorizonScreen,
    LabPhysical,
  ],
  templateUrl: './inventory-lab-page.html',
  // Quatro folhas (orçamento de 4 kB por folha): destaque, sistema, tela + faixa, case.
  styleUrls: [
    './inventory-lab-page.scss',
    './lab-system.scss',
    './lab-screen.scss',
    './lab-case.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryLabPage {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly copy = computed(() => LAB_COPY[this.locale.locale()]);
  private readonly injector = inject(Injector);
  private readonly window = inject(DOCUMENT).defaultView;
  private readonly scroller = inject(ViewportScroller);
  private readonly query = inject(ActivatedRoute).snapshot.queryParamMap;
  private readonly caseTitle = viewChild<ElementRef<HTMLElement>>('caseTitle');
  private timer?: ReturnType<typeof setTimeout>;

  protected readonly project = PROJECTS[0];
  protected readonly chips = this.project.tags.map((id) => TAGS[id]);
  protected readonly front = this.project.cartridge.renders!.front;
  protected readonly threeQuarter = this.project.cartridge.renders!.threeQuarter!;
  protected readonly artwork = this.project.cartridge.artwork!;

  protected readonly direction = signal<LabDirection>(
    this.param('dir', ['a', 'b', 'h', 'h2'], 'h'),
  );
  protected readonly phase = signal<LabPhase>(
    this.param('state', ['initial', 'selected', 'inserting', 'ready'], 'initial'),
  );
  /** Falha simulada: render do cartucho e teaser indisponíveis (fallback textual). */
  protected readonly error = signal(this.query.get('error') === '1');
  protected readonly clean = this.query.get('clean') === '1';
  /** H2: controle MC-01 na composição (`pad=1`) e pose fixa do cartucho para capturas. */
  protected readonly pad = signal(this.query.get('pad') === '1');
  protected readonly pose = this.query.get('pose') as Mc01Pose | null;
  protected readonly status = signal('');
  protected readonly playback = new AttractPlayback();

  /** O CRT fica visível desde o início só na Biblioteca (B). */
  protected readonly systemFirst = computed(() => this.direction() === 'b');
  /** Na A e no híbrido, o MC-01 só aparece depois da inserção. */
  protected readonly loaded = computed(() => ['inserting', 'ready'].includes(this.phase()));

  constructor() {
    // Preferência de movimento mudou para reduzir: pausa o teaser (como o Hero).
    const reduce = this.window?.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => event.matches && this.playback.pause();
    reduce?.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.timer);
      reduce?.removeEventListener('change', onChange);
    });
    if (this.phase() === 'ready') this.startTeaser();
  }

  protected setDirection(dir: LabDirection): void {
    this.direction.set(dir);
    this.eject(false);
  }

  /** Seleciona o cartucho (B). Na A/H, a seleção é o foco/hover; o clique já insere. */
  protected select(): void {
    if (this.phase() !== 'initial') return;
    this.phase.set('selected');
    this.status.set(this.copy().status.selected);
  }

  protected insert(): void {
    if (this.phase() === 'inserting') return;
    clearTimeout(this.timer);
    const reduced = this.reducedMotion();
    this.status.set(this.copy().status.loading);
    this.phase.set(reduced ? 'ready' : 'inserting');
    if (reduced) return this.onReady();
    this.timer = setTimeout(() => this.onReady(), INSERT_MS);
  }

  protected eject(announce = true): void {
    clearTimeout(this.timer);
    this.playback.pause();
    this.phase.set('initial');
    this.status.set(announce ? this.copy().status.ejected : '');
    // O foco volta ao controle de origem: o item da biblioteca (B) ou o "Inserir cartucho".
    if (announce) this.focusAfterRender(this.direction() === 'b' ? 'lab-item' : 'lab-insert');
  }

  protected setPhase(phase: LabPhase): void {
    clearTimeout(this.timer);
    this.phase.set(phase);
    if (phase === 'ready') this.startTeaser();
    else this.playback.pause();
  }

  protected toggleError(): void {
    this.error.update((e) => !e);
  }

  /**
   * READY: rola até o sistema (offset do header no ViewportScroller) e leva o foco ao estado do
   * slot (B/H: em seguida vêm Pausar e Ejetar) ou ao título do case (A). Sem status: o foco já
   * anuncia (evita o anúncio duplo).
   */
  private onReady(): void {
    this.phase.set('ready');
    this.status.set('');
    this.startTeaser();
    const reduced = this.reducedMotion();
    afterNextRender(
      () => {
        this.scroller.scrollToAnchor('lab-system', { behavior: reduced ? 'auto' : 'smooth' });
        const target =
          this.direction() === 'a'
            ? this.caseTitle()?.nativeElement
            : this.window?.document.getElementById('lab-slot');
        target?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }

  private focusAfterRender(id: string): void {
    afterNextRender(
      // Sem preventScroll: o controle de origem volta à tela (scroll-padding-top respeita o header).
      () => this.window?.document.getElementById(id)?.focus(),
      { injector: this.injector },
    );
  }

  /** Teaser no CRT do Inventory: mesma engine do Hero, instância própria; pausado com reduced motion. */
  private startTeaser(): void {
    if (!this.error() && !this.reducedMotion()) this.playback.play();
  }

  private reducedMotion(): boolean {
    return this.window?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }

  private param<T extends string>(name: string, allowed: readonly T[], fallback: T): T {
    const value = this.query.get(name) as T | null;
    return value && allowed.includes(value) ? value : fallback;
  }
}
