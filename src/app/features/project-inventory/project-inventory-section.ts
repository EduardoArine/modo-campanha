import { DOCUMENT, ViewportScroller } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  Injector,
  isDevMode,
  signal,
  viewChild,
} from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { TAGS, inventoryProjects } from '../../data';
import { Project } from '../../models';
import {
  McCart,
  McCartArtwork,
  McCartRender,
  McCrtProjectViewer,
  McProjectSummary,
  McSummaryChip,
} from '../../shared/signature';
import { McAction, McIcon, McSectionHeader } from '../../shared/ui';
import { ProjectCase } from './project-case';

interface InventoryItem {
  id: string;
  serial: string;
  title: string;
  type: string;
  description: string;
  shell: Project['cartridge']['shell'];
  accent: Project['cartridge']['accent'];
  artwork?: McCartArtwork;
  /** Render frontal oficial (D-065): quando existe, é o objeto mostrado no grid. */
  render?: McCartRender;
  chips: McSummaryChip[];
}

/** idle: nada inserido · loading: boot curto do CRT · ready: case exibido. */
type CartridgePhase = 'idle' | 'loading' | 'ready';

/** Boot do CRT ("LOADING CARTRIDGE...") antes do case; total da inserção ≈ 600 ms (docs/05). */
const BOOT_MS = 450;

/**
 * Project Inventory (Home Slice 02-C, D-044; FASE 5, D-058). Grade de MC-CARTs + Project Summary,
 * só com projetos `publication: 'approved'`. Inserir um cartucho (botão no resumo ou clique no
 * cartucho) liga o CRT Project Viewer abaixo da grade com o case do projeto; um por vez.
 * Com `prefers-reduced-motion`, o case aparece direto, sem boot nem deslocamento.
 */
@Component({
  selector: 'app-project-inventory-section',
  imports: [
    McSectionHeader,
    McCart,
    McProjectSummary,
    McAction,
    McIcon,
    McCrtProjectViewer,
    ProjectCase,
  ],
  templateUrl: './project-inventory-section.html',
  styleUrl: './project-inventory-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInventorySection {
  private readonly locale = inject(LocaleService);
  private readonly injector = inject(Injector);
  private readonly scroller = inject(ViewportScroller);
  private readonly window = inject(DOCUMENT).defaultView;
  protected readonly ui = this.locale.ui;

  private readonly projects = inventoryProjects(isDevMode());
  private readonly case = viewChild(ProjectCase);
  private timer?: ReturnType<typeof setTimeout>;

  protected readonly selectedId = signal<string | null>(null);
  protected readonly phase = signal<CartridgePhase>('idle');
  protected readonly selected = computed(
    () => this.projects.find((p) => p.id === this.selectedId()) ?? null,
  );

  protected readonly items = computed<InventoryItem[]>(() => {
    // pick() lê o idioma ativo: o computed recalcula na troca de rota.
    const pick = this.locale.pick.bind(this.locale);
    return this.projects.map((p) => ({
      id: p.id,
      serial: p.serial,
      title: pick(p.title),
      type: pick(p.type),
      description: pick(p.description),
      shell: p.cartridge.shell,
      accent: p.cartridge.accent,
      artwork: p.cartridge.artwork && {
        src: p.cartridge.artwork.src,
        alt: pick(p.cartridge.artwork.alt),
      },
      render: p.cartridge.renders?.front,
      chips: p.tags.map((id) => ({ label: pick(TAGS[id].label), tone: TAGS[id].tone })),
    }));
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  /** Insere o cartucho (ou ejeta, se ele já estiver inserido). Outro cartucho troca na hora. */
  protected toggle(id: string): void {
    if (this.selectedId() === id) {
      this.eject();
      return;
    }
    clearTimeout(this.timer);
    this.selectedId.set(id);
    const reduced = this.prefersReducedMotion();
    this.phase.set(reduced ? 'ready' : 'loading');
    afterNextRender(
      () =>
        this.scroller.scrollToAnchor('project-viewer', { behavior: reduced ? 'auto' : 'smooth' }),
      { injector: this.injector },
    );
    if (reduced) {
      this.focusCase();
      return;
    }
    this.timer = setTimeout(() => {
      this.phase.set('ready');
      this.focusCase();
    }, BOOT_MS);
  }

  /** Ejeta o cartucho: desliga o CRT e devolve o foco ao botão do projeto. */
  protected eject(): void {
    const id = this.selectedId();
    clearTimeout(this.timer);
    this.selectedId.set(null);
    this.phase.set('idle');
    if (id) {
      afterNextRender(
        () => this.window?.document.getElementById(`insert-${id}`)?.focus({ preventScroll: true }),
        { injector: this.injector },
      );
    }
  }

  private focusCase(): void {
    afterNextRender(() => this.case()?.focus(), { injector: this.injector });
  }

  private prefersReducedMotion(): boolean {
    return this.window?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }
}
