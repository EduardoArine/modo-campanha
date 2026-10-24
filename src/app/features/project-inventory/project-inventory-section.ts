import { DOCUMENT, NgComponentOutlet, NgTemplateOutlet, ViewportScroller } from '@angular/common';
import {
  afterNextRender,
  ApplicationRef,
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
  viewChild,
} from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { McCart, McConsole, McCrtFront, McHandheld } from '../../shared/signature';
import { McAction, McIcon, McSectionHeader, McStatus } from '../../shared/ui';
import { AttractPlayback } from '../../system-horizon/attract-playback';
import { CartridgeLibrary } from './cartridge-library';
import { ScreenZoom } from './screen-zoom';
import { CrtCover } from './crt-cover';
import { CrtDossier, dossierSections } from './crt-dossier';
import {
  cartridgeSelection,
  initialInventoryState,
  insertedInventoryState,
  InventoryEvent,
  inventoryView,
  nextInventoryState,
} from './inventory.machine';
import { INVENTORY_PROJECTS, INVENTORY_START } from './inventory.projects';
import { ProjectCase } from './project-case';

/** A primeira Home montada no navegador já hidratou (as seguintes nascem no cliente). */
let hydratedOnce = false;

/** Inserção (só transform) e carregamento do MC-01; ejetar faz o caminho inverso. */
const MOVE_MS = 620;
const BOOT_MS = 450;
const EJECT_MS = 600;

/** Cenário da estação (D-094): estante desfocada e mesa; derivados de build-station.mjs. */
const STATION_BACKGROUND_WIDTHS = [640, 960, 1280, 1672];
const STATION_BACKGROUND = {
  src: 'assets/inventory/station-background-1672.webp',
  srcset: STATION_BACKGROUND_WIDTHS.map(
    (w) => `assets/inventory/station-background-${w}.webp ${w}w`,
  ).join(', '),
};

/**
 * Project Inventory — H3, MC-CART Library + CRT Project Viewer (D-093, docs/24 §19), evolução do
 * H2 (D-077) e da biblioteca (D-087). A biblioteca escolhe, o MC-01 carrega, o CRT apresenta: no
 * READY, a CAPA do projeto dentro do tubo; EXPLORAR PROJETO abre o DOSSIÊ, também dentro do tubo.
 * Um único estado de domínio (`inventory.machine.ts`) decide cartucho, transição, capa/dossiê e
 * seção ativa. No fallback (MC-01 indisponível), o case segue acessível em HTML, fora do vidro.
 */
@Component({
  selector: 'app-project-inventory-section',
  imports: [
    NgComponentOutlet,
    NgTemplateOutlet,
    McSectionHeader,
    McStatus,
    McAction,
    CartridgeLibrary,
    CrtCover,
    CrtDossier,
    McIcon,
    McCart,
    McConsole,
    McCrtFront,
    McHandheld,
    ProjectCase,
    ScreenZoom,
  ],
  templateUrl: './project-inventory-section.html',
  styleUrls: ['./project-inventory-section.scss', './project-inventory-devices.scss'],
  // Última interação: ponteiro (toque/mouse) ou teclado. Decide se a escolha traz a tela à vista.
  // Os handlers devolvem void: uma expressão que vale false faria o Angular cancelar o evento
  // (preventDefault), e nenhuma tecla funcionaria na seção.
  host: { '(pointerdown)': 'markPointer(true)', '(keydown)': 'markPointer(false)' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInventorySection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly stationBackground = STATION_BACKGROUND;
  private readonly injector = inject(Injector);
  private readonly appRef = inject(ApplicationRef);
  private readonly scroller = inject(ViewportScroller);
  private readonly window = inject(DOCUMENT).defaultView;

  protected readonly projects = inject(INVENTORY_PROJECTS);
  /** Abre com o MC-001 encaixado, na capa (D-101); `INVENTORY_START` = 'empty' abre com o slot vazio. */
  protected readonly state = signal(
    inject(INVENTORY_START) === 'inserted' && this.projects[0]
      ? insertedInventoryState(this.projects[0].id)
      : initialInventoryState(this.projects[0]?.id ?? ''),
  );
  protected readonly view = computed(() => inventoryView(this.state()));
  /** Cartucho FÍSICO (sobre o slot, entrando, encaixado ou saindo): console, CRT, status e case. */
  protected readonly project = computed(
    () => this.projects.find((p) => p.id === this.state().cartridge) ?? this.projects[0],
  );
  /** Escolhido × inserido (D-087): diferem só durante a troca e com o slot vazio. */
  protected readonly selection = computed(() => cartridgeSelection(this.state()));
  /** Cartucho ESCOLHIDO (na troca, o que vai entrar): nome do "Inserir cartucho". */
  protected readonly chosen = computed(
    () => this.projects.find((p) => p.id === this.selection().selected) ?? this.project()!,
  );
  /** Dossiê aberto (D-093): a biblioteca recolhe e o CRT ganha destaque. */
  protected readonly dossier = computed(() => {
    const s = this.state();
    return s.kind === 'ready' && s.screen === 'dossier';
  });
  /** Seção ativa do dossiê. */
  protected readonly section = computed(() => {
    const s = this.state();
    return s.kind === 'ready' ? (s.section ?? 0) : 0;
  });
  /** Sem render em escala do console, o cartucho não entra no MC-01 (fallback). */
  protected readonly cartridge = computed(() => this.project()?.cartridge.renders?.console ?? null);
  /** Estado do slot, do mesmo estado (o nome do cartucho fica na linha de cima da barra). */
  protected readonly slotText = computed(() => this.ui().inventory.slot[this.view().slot]);
  /** Intenção de inserir (hover/foco na ação ou no console): aproxima o cartucho do slot. */
  protected readonly lifted = signal(false);
  /** Anúncio da última transição (role="status"); vazio até o visitante agir. */
  protected readonly announcement = signal('');
  /**
   * Troca pela biblioteca em curso: o READY é anunciado, sem levar o foco nem rolar até o CRT (o
   * visitante continua na biblioteca). O "Inserir cartucho" mantém o comportamento do H2.
   */
  private librarySwap = false;
  /** A última interação na seção foi por ponteiro (toque ou mouse). */
  protected pointer = false;

  protected markPointer(pointer: boolean): void {
    this.pointer = pointer;
  }

  /** Celular (< 768, D-095): o portátil substitui o MC-01 + CRT. */
  private readonly phoneQuery = this.window?.matchMedia?.('(max-width: 767.98px)');
  /**
   * Página pré-renderizada (D-098) sendo hidratada: o primeiro render repete o do servidor (CRT) e
   * o portátil entra logo depois, no celular. Assim a seção hidrata como o resto da página e os
   * cliques feitos antes de o JavaScript carregar são repetidos. Navegação no cliente, dev e
   * testes decidem o aparelho de imediato.
   */
  private readonly hydrating =
    !hydratedOnce && !!this.window?.document.querySelector('[ng-server-context]');
  protected readonly handheld = signal(!this.hydrating && (this.phoneQuery?.matches ?? false));
  /**
   * Celular, já durante a hidratação (antes de o portátil entrar): escolher um cartucho insere
   * (um toque feito antes de o JavaScript carregar é repetido com a regra do celular).
   */
  protected readonly phone = computed(
    () => this.handheld() || (this.hydrating && (this.phoneQuery?.matches ?? false)),
  );

  protected readonly playback = new AttractPlayback();
  /** Tela do teaser, carregada sob demanda (o chunk é o mesmo da Hero). */
  /** Tela cheia do dossiê no celular (D-096), quando aberta. */
  private readonly zoom = viewChild(ScreenZoom);
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
    // A troca espera a hidratação terminar e os cliques guardados serem repetidos (eles miram os
    // botões do HTML do servidor, que saem com a troca).
    afterNextRender(() => {
      hydratedOnce = true;
      if (!this.hydrating) return;
      void this.appRef
        .whenStable()
        .then(() => setTimeout(() => this.phoneQuery?.matches && this.switchDevice(true)));
    });
    const onPhone = (event: MediaQueryListEvent) => this.switchDevice(event.matches);
    this.phoneQuery?.addEventListener('change', onPhone);
    inject(DestroyRef).onDestroy(() => {
      reduce?.removeEventListener('change', onChange);
      this.phoneQuery?.removeEventListener('change', onPhone);
      this.playback.pause();
    });
  }

  /**
   * Celular ↔ tablet/desktop (D-095): troca o aparelho sem mexer no estado. Se o foco estava nele,
   * vai ao equivalente no novo (título do dossiê, título da capa ou estado do slot).
   */
  private switchDevice(phone: boolean): void {
    const active = this.window?.document.activeElement;
    // Inclui a tela cheia do dossiê no celular (D-096).
    const inside = !!active?.closest('#project-viewer, .bar, app-screen-zoom');
    this.handheld.set(phone);
    if (!inside) return;
    const s = this.state();
    const target =
      s.kind === 'ready' && s.screen === 'dossier'
        ? 'dossier-title'
        : s.kind === 'ready' && s.screen !== 'teaser'
          ? 'crt-cover-title'
          : 'inventory-status';
    this.afterRender(() => this.byId(target)?.focus({ preventScroll: true }));
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
    this.revealScreen();
    // Portátil (D-095): o cartucho já selecionado com o slot vazio entra direto.
    if (this.phone() && before.kind === 'empty' && before.cartridge === id) {
      this.librarySwap = true;
      this.insert();
      return;
    }
    this.select(id);
    const after = this.state();
    // Só a troca animada chega a um READY posterior (o dispatch do select não lê a marca).
    this.librarySwap = before.kind === 'ready' && after.kind === 'ejecting';
    if (after === before) return;
    const next = this.projects.find((p) => p.id === id);
    if (!next) return;
    const s = this.ui().inventory.status;
    const name = `${next.serial} — ${this.locale.pick(next.title)}`;
    // Portátil (D-095): escolher com o slot vazio já insere; o READY não rola nem leva o foco.
    if (after.kind === 'empty' && this.phone()) {
      this.librarySwap = true;
      this.insert();
      return;
    }
    if (after.kind === 'empty') this.announcement.set(`${s.selected} ${name}.`);
    else if (after.kind === 'ejecting') this.announcement.set(`${s.swapping} ${name}.`);
    else if (after.kind === 'ready') this.announcement.set(`${name} ${s.ready}`);
  }

  /**
   * Escolha por toque ou mouse (D-098): se a tela do aparelho (vidro do CRT ou visor do portátil)
   * não estiver inteira à vista, rola o mínimo para mostrá-la; o visitante vê o cartucho entrar e
   * a capa aparecer. Pelo teclado nada se move (o foco segue no carrossel).
   */
  private revealScreen(always = false): void {
    if (!this.pointer && !always) return;
    const screen = this.window?.document.querySelector(
      '#project-viewer .glass, #project-viewer .screen',
    );
    if (!screen || !this.window) return;
    const rect = screen.getBoundingClientRect();
    const header =
      this.window.document.querySelector('app-site-header')?.getBoundingClientRect().bottom ?? 0;
    if (rect.top >= header && rect.bottom <= this.window.innerHeight) return;
    screen.scrollIntoView({ block: 'nearest', behavior: this.reducedMotion() ? 'auto' : 'smooth' });
  }

  /** EXPLORAR PROJETO: abre o dossiê na 1ª seção e traz a estação à vista; o foco vai ao título. */
  protected explore(): void {
    this.dispatch({ type: 'explore' });
    // Celular (D-096): a tela cheia cresce do visor e cuida do foco; a página não rola.
    if (this.handheld()) return;
    this.afterRender(() => {
      this.scroller.scrollToAnchor('inventory-station', {
        behavior: this.reducedMotion() ? 'auto' : 'smooth',
      });
      this.byId('dossier-title')?.focus({ preventScroll: true });
    });
  }

  protected goSection(index: number): void {
    const project = this.project();
    if (!project) return;
    const last = dossierSections(project).length - 1;
    this.dispatch({ type: 'section', index: Math.min(Math.max(0, index), last) });
  }

  /** Voltar à capa (do dossiê ou do teaser): o cartucho continua inserido; foco no EXPLORAR. */
  protected toCover(): void {
    // Celular (D-096): a tela cheia encolhe até o visor antes de a capa voltar.
    const zoom = this.zoom();
    if (zoom) {
      void zoom.collapse().then(() => this.coverNow());
      return;
    }
    this.coverNow();
  }

  private coverNow(): void {
    this.dispatch({ type: 'cover' });
    // A biblioteca reaparece acima e empurra a capa: a tela volta à vista antes do foco (D-098).
    this.afterRender(() => {
      this.revealScreen(true);
      this.byId('inventory-explore')?.focus({ preventScroll: true });
    });
  }

  /** Voltar à biblioteca: a capa volta e a biblioteca reaparece; foco no cartucho inserido. */
  protected toLibrary(): void {
    this.dispatch({ type: 'cover' });
    this.afterRender(() => {
      const current = this.window?.document.querySelector<HTMLElement>(
        '#library-strip .cart[aria-current="true"]',
      );
      this.scroller.scrollToAnchor('project-inventory', {
        behavior: this.reducedMotion() ? 'auto' : 'smooth',
      });
      // A faixa foi recriada no início: centraliza nela o cartucho inserido antes de focá-lo.
      const strip = current?.closest('ul');
      const slot = current?.closest('li');
      if (strip && slot) {
        strip.scrollLeft = slot.offsetLeft - (strip.clientWidth - slot.offsetWidth) / 2;
      }
      current?.focus({ preventScroll: true });
    });
  }

  /** Teaser sob demanda: carrega a tela, depois reproduz; falha = estado próprio do READY. */
  protected async toggleTeaser(): Promise<void> {
    const state = this.state();
    if (state.kind !== 'ready') return;
    if (state.screen === 'teaser') return this.playback.toggle();
    if (state.screen !== 'art' && state.screen !== 'art-unavailable') return;
    const cartridge = state.cartridge;
    // Durante o import(), o visitante pode trocar de cartucho ou abrir o dossiê: só segue se nada mudou.
    const stillOnCover = () => {
      const now = this.state();
      return (
        now.kind === 'ready' &&
        now.cartridge === cartridge &&
        (now.screen === 'art' || now.screen === 'art-unavailable')
      );
    };
    try {
      const { SystemHorizonScreen } = await import('../../system-horizon/system-horizon-screen');
      if (!stillOnCover()) return;
      this.teaserScreen.set(SystemHorizonScreen);
      this.dispatch({ type: 'play' });
      this.playback.play();
      // A capa sai do vidro: o foco vai ao Pausar, no mesmo lugar da ação.
      this.afterRender(() => this.byId('teaser-toggle')?.focus());
    } catch {
      if (stillOnCover()) this.dispatch({ type: 'teaser-failed' });
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
    const area = button.closest('.console-area, .handheld-area');
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
    // Falha no meio da troca: a marca não pode sobrar.
    if (after.kind === 'unavailable') this.librarySwap = false;
    // Troca pela biblioteca: o READY é anunciado em texto; foco e rolagem ficam onde estão.
    if (after.kind === 'ready' && before.kind !== 'ready' && this.librarySwap) {
      this.librarySwap = false;
      const p = this.project();
      if (p) this.announcement.set(`${p.serial} — ${this.locale.pick(p.title)} ${s.ready}`);
      return;
    }
    // READY: rola até o CRT e leva o foco ao título da capa, dentro do vidro (o próximo Tab é o
    // EXPLORAR PROJETO); o estado é anunciado em texto.
    if (after.kind === 'ready' && before.kind !== 'ready') {
      const p = this.project();
      if (p) this.announcement.set(`${p.serial} — ${this.locale.pick(p.title)} ${s.ready}`);
      this.afterRender(() => {
        this.scroller.scrollToAnchor('project-viewer', {
          behavior: this.reducedMotion() ? 'auto' : 'smooth',
        });
        this.byId('crt-cover-title')?.focus({ preventScroll: true });
      });
    }
    // Ejetar (também do dossiê): a biblioteca volta e o "Inserir cartucho" recebe o foco (A2).
    const ejectedNow = after.kind === 'empty' && after.ejected && before.kind !== 'ejecting';
    if ((after.kind === 'ejecting' && !after.then) || ejectedNow) {
      this.afterRender(() => this.byId('inventory-insert')?.focus());
    }
    // Teaser falhou: o botão Reproduzir sai; o foco vai ao título da capa, que mostra o aviso (A1).
    if (after.kind === 'ready' && after.screen === 'teaser-unavailable') {
      this.afterRender(() => this.byId('crt-cover-title')?.focus({ preventScroll: true }));
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
