import { DOCUMENT, NgComponentOutlet, ViewportScroller } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  Injector,
  signal,
  Type,
  untracked,
} from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { McCart, McConsole, McCrtFront } from '../../shared/signature';
import { Project } from '../../models';
import { McAction, McIcon, McSectionHeader, McStatus } from '../../shared/ui';
import { AttractPlayback } from '../../system-horizon/attract-playback';
import { CartridgeLibrary } from './cartridge-library';
import {
  cartridgeSelection,
  initialInventoryState,
  InventoryEvent,
  inventoryView,
  nextInventoryState,
} from './inventory.machine';
import { INVENTORY_PROJECTS } from './inventory.projects';
import { ProjectCase } from './project-case';

/** Inserção (só transform) e carregamento do MC-01; ejetar faz o caminho inverso. */
const MOVE_MS = 620;
const BOOT_MS = 450;
const EJECT_MS = 600;

/**
 * Project Inventory — H2, Physical Cartridge Experience (D-077, docs/24 §17). O MC-CART é inserido
 * no MC-01 montado em camadas; o CRT frontal mostra a arte oficial e, sob demanda, o teaser; o
 * case fica fora do vidro, em HTML. Um único estado de domínio (`inventory.machine.ts`) decide
 * textos, controles, indicadores e anúncios. Com 2 ou mais cartuchos aprovados, aparece a
 * biblioteca MC-CART (D-087): escolher seleciona; com um cartucho inserido, a mesma escolha troca.
 */
@Component({
  selector: 'app-project-inventory-section',
  imports: [
    NgComponentOutlet,
    McSectionHeader,
    McStatus,
    McAction,
    CartridgeLibrary,
    McIcon,
    McCart,
    McConsole,
    McCrtFront,
    ProjectCase,
  ],
  templateUrl: './project-inventory-section.html',
  styleUrls: ['./project-inventory-section.scss', './project-inventory-devices.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInventorySection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  private readonly injector = inject(Injector);
  private readonly scroller = inject(ViewportScroller);
  private readonly window = inject(DOCUMENT).defaultView;

  protected readonly projects = inject(INVENTORY_PROJECTS);
  protected readonly state = signal(initialInventoryState(this.projects[0]?.id ?? ''));
  protected readonly view = computed(() => inventoryView(this.state()));
  /** Cartucho FÍSICO (sobre o slot, entrando, encaixado ou saindo): console, CRT, status e case. */
  protected readonly project = computed(
    () => this.projects.find((p) => p.id === this.state().cartridge) ?? this.projects[0],
  );
  /** Escolhido × inserido (D-087): diferem só durante a troca e com o slot vazio. */
  protected readonly selection = computed(() => cartridgeSelection(this.state()));
  /** Editorial do cartucho ESCOLHIDO (na troca, o que vai entrar). */
  protected readonly chosenProject = computed(() =>
    this.projects.find((p) => p.id === this.selection().selected),
  );
  /** Sem render em escala do console, o cartucho não entra no MC-01 (fallback). */
  protected readonly cartridge = computed(() => this.project()?.cartridge.renders?.console ?? null);
  /** Texto do slot, do mesmo estado: SLOT VAZIO · CARREGANDO MC-001 · MC-001 INSERIDO · EJETANDO MC-001. */
  protected readonly slotText = computed(() => {
    const slot = this.ui().inventory.slot;
    const serial = this.project()?.serial ?? '';
    switch (this.view().slot) {
      case 'empty':
        return slot.empty;
      case 'loading':
        return `${slot.loading} ${serial}`;
      case 'inserted':
        return `${serial} ${slot.inserted}`;
      case 'ejecting':
        return `${slot.ejecting} ${serial}`;
      case 'unavailable':
        return slot.unavailable;
    }
  });
  /**
   * "Teaser disponível · Campanha jogável em desenvolvimento": rótulo do projeto + estado da UI. Faz
   * parte do editorial, então segue o cartucho ESCOLHIDO (na troca, o que vai entrar).
   */
  protected readonly experiences = computed(() => {
    const status = this.ui().inventory.experience;
    return (this.chosenProject()?.experiences ?? []).map(
      (e) =>
        `${this.locale.pick(e.label)} ${e.status === 'available' ? status.available : status.inDevelopment}`,
    );
  });
  /** Intenção de inserir (hover/foco na ação ou no console): aproxima o cartucho do slot. */
  protected readonly lifted = signal(false);
  /** Anúncio da última transição (role="status"); vazio até o visitante agir. */
  protected readonly announcement = signal('');
  /**
   * Troca pela biblioteca em curso: guarda o projeto que estava PRONTO. O case dele só reserva o
   * espaço (invisível e inerte) até o novo PRONTO, sem mostrar dados do projeto que ainda carrega.
   * O READY da troca é anunciado, sem levar o foco nem rolar até o CRT (o visitante continua na
   * biblioteca). O "Inserir cartucho" mantém o comportamento do H2.
   */
  protected readonly swapCase = signal<Project | null>(null);

  protected readonly playback = new AttractPlayback();
  /** Tela do teaser, carregada sob demanda (o chunk é o mesmo da Hero). */
  protected readonly teaserScreen = signal<Type<unknown> | null>(null);

  constructor() {
    // Temporizadores das transições: cada estado de movimento agenda o próximo evento.
    effect((onCleanup) => {
      const kind = this.state().kind;
      const ms =
        kind === 'inserting'
          ? MOVE_MS
          : kind === 'loading'
            ? BOOT_MS
            : kind === 'ejecting'
              ? EJECT_MS
              : 0;
      if (!ms) return;
      const event: InventoryEvent =
        kind === 'inserting'
          ? { type: 'seated' }
          : kind === 'loading'
            ? { type: 'loaded' }
            : { type: 'ejected' };
      const timer = setTimeout(() => this.dispatch(event), ms);
      onCleanup(() => clearTimeout(timer));
    });
    // Fallback: projeto sem render do console não entra no MC-01.
    effect(() => {
      if (this.project() && !this.cartridge())
        untracked(() => this.dispatch({ type: 'assets-failed' }));
    });
    // Preferência de movimento mudou para reduzir: pausa o teaser (como a Hero).
    const reduce = this.window?.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => event.matches && this.playback.pause();
    reduce?.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => {
      reduce?.removeEventListener('change', onChange);
      this.playback.pause();
    });
  }

  protected insert(): void {
    this.dispatch({ type: 'insert', reduced: this.reducedMotion() });
  }

  protected eject(): void {
    this.dispatch({ type: 'eject', reduced: this.reducedMotion() });
  }

  protected select(id: string): void {
    this.dispatch({ type: 'select', cartridge: id, reduced: this.reducedMotion() });
  }

  /** Escolha na biblioteca: seleciona (slot vazio) ou troca (cartucho inserido), com anúncio curto. */
  protected choose(id: string): void {
    const before = this.state();
    const previous = this.project() ?? null;
    this.select(id);
    const after = this.state();
    // Só a troca animada chega a um READY posterior (o dispatch do select não lê a marca).
    this.swapCase.set(before.kind === 'ready' && after.kind === 'ejecting' ? previous : null);
    if (after === before) return;
    const next = this.projects.find((p) => p.id === id);
    if (!next) return;
    const s = this.ui().inventory.status;
    const name = `${next.serial} — ${this.locale.pick(next.title)}`;
    if (after.kind === 'empty') this.announcement.set(`${s.selected} ${name}.`);
    else if (after.kind === 'ejecting') this.announcement.set(`${s.swapping} ${name}.`);
    else if (after.kind === 'ready') this.announcement.set(`${name} ${s.ready}`);
  }

  /** Teaser sob demanda: carrega a tela, depois reproduz; falha = estado próprio do READY. */
  protected async toggleTeaser(): Promise<void> {
    const state = this.state();
    if (state.kind !== 'ready') return;
    if (state.screen === 'teaser') return this.playback.toggle();
    if (state.screen !== 'art') return;
    try {
      const { SystemHorizonScreen } = await import('../../system-horizon/system-horizon-screen');
      this.teaserScreen.set(SystemHorizonScreen);
      this.dispatch({ type: 'play' });
      this.playback.play();
    } catch {
      this.dispatch({ type: 'teaser-failed' });
    }
  }

  protected assetsFailed(): void {
    this.dispatch({ type: 'assets-failed' });
  }

  protected artFailed(): void {
    this.dispatch({ type: 'art-failed' });
  }

  /** Foco no Inserir: intenção de inserir; por teclado, traz o console inteiro à vista (A3). */
  protected onInsertFocus(event: FocusEvent): void {
    this.lifted.set(true);
    const button = event.target as HTMLElement;
    if (!button.matches(':focus-visible')) return;
    const area = button.closest('.console-area');
    const header =
      this.window?.document.querySelector('app-site-header')?.getBoundingClientRect().bottom ?? 0;
    if (area && area.getBoundingClientRect().top < header) {
      area.scrollIntoView({ block: 'end', behavior: this.reducedMotion() ? 'auto' : 'smooth' });
    }
  }

  /** Aplica a transição e os efeitos de foco, rolagem e anúncio do novo estado. */
  private dispatch(event: InventoryEvent): void {
    const before = this.state();
    const after = nextInventoryState(before, event);
    if (after === before) return;
    this.state.set(after);
    if (after.kind !== 'ready' || after.screen !== 'teaser') this.playback.pause();
    const announce = inventoryView(after).announce;
    const s = this.ui().inventory.status;
    this.announcement.set(
      announce === 'loading'
        ? s.loading
        : announce === 'ejected'
          ? s.ejected
          : announce === 'teaser-unavailable'
            ? s.teaserUnavailable
            : '',
    );
    // Falha no meio da troca: o fallback mostra o case normalmente.
    if (after.kind === 'unavailable') this.swapCase.set(null);
    // Troca pela biblioteca: o READY é anunciado em texto; foco e rolagem ficam onde estão.
    if (after.kind === 'ready' && before.kind !== 'ready' && this.swapCase()) {
      this.swapCase.set(null);
      const p = this.project();
      if (p) this.announcement.set(`${p.serial} — ${this.locale.pick(p.title)} ${s.ready}`);
      return;
    }
    // READY: rola até o CRT e leva o foco ao estado (o foco anuncia; sem anúncio duplicado).
    if (after.kind === 'ready' && before.kind !== 'ready') {
      this.afterRender(() => {
        this.scroller.scrollToAnchor('project-viewer', {
          behavior: this.reducedMotion() ? 'auto' : 'smooth',
        });
        this.byId('inventory-status')?.focus({ preventScroll: true });
      });
    }
    // Ejetar: o "Inserir cartucho" volta na hora (bloqueado durante a volta) e recebe o foco (A2).
    const ejectedNow = after.kind === 'empty' && after.ejected && before.kind !== 'ejecting';
    if ((after.kind === 'ejecting' && !after.then) || ejectedNow) {
      this.afterRender(() => this.byId('inventory-insert')?.focus());
    }
    // Teaser falhou: o botão Reproduzir sai; o foco vai ao estado da tela, que diz a falha (A1).
    if (after.kind === 'ready' && after.screen === 'teaser-unavailable') {
      this.afterRender(() => this.byId('inventory-status')?.focus({ preventScroll: true }));
    }
  }

  private afterRender(fn: () => void): void {
    afterNextRender(fn, { injector: this.injector });
  }

  private byId(id: string): HTMLElement | null | undefined {
    return this.window?.document.getElementById(id);
  }

  private reducedMotion(): boolean {
    return this.window?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }
}
