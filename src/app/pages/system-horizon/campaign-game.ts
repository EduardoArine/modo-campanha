import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  DOCUMENT,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { LocaleService } from '../../core/i18n';
import { HORIZON_BALLOONS, SKILL_LOADOUT, SOCIAL_LINKS } from '../../data';
import { McAction, McIcon } from '../../shared/ui';
import { HorizonStop, HorizonWorld } from '../../system-horizon/content/horizon-world';
import { HeldInput } from '../../system-horizon/control/held-input';
import { FixedClock } from '../../system-horizon/engine/clock';
import { Renderer, VIEW } from '../../system-horizon/engine/renderer';
import { JungleRun } from '../../system-horizon/minigames/jungle-run';
import { Minigame, MinigameArt, MinigameId } from '../../system-horizon/minigames/minigame';
import {
  CampaignArt,
  CampaignCaption,
  CampaignEvent,
  CampaignScene,
  NEAR_RADIUS,
} from '../../system-horizon/scenes/campaign';
import { loadCampaignArt } from '../../system-horizon/world/campaign-art';
import { Palette, readPalette } from '../../system-horizon/world/palette';
import { actLabel, stopLabel } from './horizon-labels';
import { HorizonEntry } from './horizon-entry';
import { HorizonMinigameCard } from './horizon-minigame-card';

/** O card do ato fica ~3 s na tela (ticks de 12 fps). */
const ACT_CARD_TICKS = 36;

/** Teclas de pulo nos minijogos (Enter e Espaço também, fora de botões). */
const JUMP_KEYS = new Set(['ArrowUp', 'w', 'W', ' ', 'Enter']);

const MINIGAMES: Record<MinigameId, () => Minigame> = {
  'jungle-run': () => new JungleRun(),
};

/** Minijogo aberto num marco: cartão de abertura, jogo, cartão de conclusão. */
export interface MinigameRun {
  readonly stop: HorizonStop;
  readonly game: Minigame;
  readonly phase: 'intro' | 'play' | 'done';
}

const KEY_DIR: Record<string, -1 | 1> = {
  ArrowLeft: -1,
  a: -1,
  A: -1,
  ArrowRight: 1,
  d: 1,
  D: 1,
};

/**
 * Jogo do SYSTEM HORIZON (D-103, docs/23 §18; balões e minijogos em D-104): canvas 160 × 120 em
 * escala inteira (decorativo, `aria-hidden`) + tudo o que importa em DOM: HUD, card do ato, balão do
 * marco próximo (frase curta), cartões do minijogo, região viva e pausa. A história completa fica no
 * Diário e na versão em texto; o painel `<dialog>` só abre no encerramento (contatos) e nos slots do
 * HUD (habilidades). O laço só anda com o jogo ativo, a aba visível e nenhum painel aberto.
 */
@Component({
  selector: 'app-campaign-game',
  imports: [HorizonEntry, HorizonMinigameCard, McAction, McIcon, RouterLink],
  templateUrl: './campaign-game.html',
  styleUrls: ['./campaign-game.scss', './campaign-game-panels.scss'],
  host: { '(keydown)': 'onKeydown($event)', '(focusout)': 'onFocusOut($event)' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignGame {
  readonly world = input.required<HorizonWorld>();
  /** A página está mostrando o jogo (oculto = pausado, estado preservado). */
  readonly active = input(true);
  readonly reducedMotion = input(false);
  readonly showText = output<void>();

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');
  private readonly reader = viewChild.required<ElementRef<HTMLDialogElement>>('reader');
  private readonly pauseMenu = viewChild.required<ElementRef<HTMLDialogElement>>('pauseMenu');

  private readonly clock = new FixedClock();
  private readonly input = new HeldInput();
  private renderer: Renderer | null = null;
  private art: (CampaignArt & MinigameArt) | null = null;
  /** Pulo segurado (teclas e botão Saltar) no minijogo. */
  private jumpHeld = new Set<string>();
  private palette: Palette | null = null;
  private frame = 0;
  private last = 0;
  private actCardUntil = 0;
  /** Quem abriu a leitura ou a pausa (recebe o foco de volta). */
  private opener: HTMLElement | null = null;
  /** Alterna um espaço invisível: o mesmo anúncio repetido muda o DOM e volta a ser lido. */
  private echo = false;

  protected readonly scene = signal<CampaignScene | null>(null);
  private readonly ready = signal(false);
  private readonly pageVisible = signal(true);
  protected readonly paused = signal(false);
  protected readonly reading = signal<HorizonStop | null>(null);
  protected readonly minigame = signal<MinigameRun | null>(null);

  // Estado espelhado da cena para o DOM (atualizado pelos eventos).
  protected readonly act = signal(0);
  protected readonly actCard = signal(false);
  protected readonly near = signal<HorizonStop | null>(null);
  protected readonly collected = signal<ReadonlySet<string>>(new Set());
  protected readonly read = signal<ReadonlySet<string>>(new Set());
  /** Minijogos concluídos nesta visita (marco com o selo apagado). */
  protected readonly played = signal<ReadonlySet<string>>(new Set());
  protected readonly unlocked = signal(false);
  protected readonly captions = signal<readonly CampaignCaption[]>([]);
  protected readonly announcement = signal('');

  protected readonly socialLinks = SOCIAL_LINKS;
  /** As quatro especialidades, na ordem do Arsenal; cada slot aponta para a parada da coleta. */
  protected readonly slots = computed(() =>
    SKILL_LOADOUT.map((group) => ({
      group,
      stop: this.world().stops.find((s) => s.kind === 'collectible' && s.group.id === group.id),
    })).filter((slot) => slot.stop),
  );
  protected readonly actName = computed(() => {
    const act = this.world().acts[this.act()];
    return act ? actLabel(act, this.locale) : '';
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => void this.setup(destroyRef));

    // Um mundo novo (ou recomeçar) = cena nova.
    effect(() => {
      const world = this.world();
      untracked(() => this.restart(world));
    });

    effect(() => {
      const running =
        this.ready() &&
        this.active() &&
        this.pageVisible() &&
        !this.paused() &&
        !this.reading() &&
        !!this.scene();
      untracked(() => (running ? this.resume() : this.suspend()));
    });

    // Saiu da tela (versão em texto): solta as teclas.
    effect(() => {
      if (!this.active()) untracked(() => this.release());
    });

    destroyRef.onDestroy(() => this.suspend());
  }

  // Ações ---------------------------------------------------------------------------------------

  protected restart(world = this.world()): void {
    this.closeDialogs();
    this.release();
    this.scene.set(new CampaignScene(world, { reducedMotion: this.reducedMotion() }));
    this.act.set(0);
    this.near.set(null);
    this.collected.set(new Set());
    this.read.set(new Set());
    this.played.set(new Set());
    this.minigame.set(null);
    this.unlocked.set(false);
    this.actCard.set(true);
    this.actCardUntil = 0;
    this.draw();
  }

  protected readNear(): void {
    const stop = this.near();
    if (!stop) return;
    if (stop.kind === 'milestone' && stop.game) this.openMinigame(stop, stop.game);
    else if (stop.kind === 'closing') this.openReader(stop);
  }

  /** A parada próxima tem uma ação (minijogo ou encerramento); as outras só têm o balão. */
  protected action(stop: HorizonStop): string | null {
    const game = this.ui().systemHorizon.game;
    if (stop.kind === 'milestone' && stop.game) {
      return `${game.minigame.play}: ${game.minigame.games[stop.game].title}`;
    }
    return stop.kind === 'closing' ? `${game.read.closing}: ${this.label(stop)}` : null;
  }

  // Minijogos ----------------------------------------------------------------------------------

  private openMinigame(stop: HorizonStop, id: MinigameId): void {
    this.release();
    this.minigame.set({ stop, game: MINIGAMES[id](), phase: 'intro' });
    this.say(this.ui().systemHorizon.game.minigame.games[id].title);
    this.draw();
  }

  protected startMinigame(): void {
    const run = this.minigame();
    if (!run) return;
    this.minigame.set({ ...run, phase: 'play' });
    this.focusStage();
  }

  /** Volta à campanha (desistir, ou depois de concluir). */
  protected leaveMinigame(): void {
    const run = this.minigame();
    if (!run) return;
    this.release();
    this.minigame.set(null);
    this.draw();
    this.focusStage();
  }

  protected jumpPress(source: string, event?: Event): void {
    event?.preventDefault();
    this.jumpHeld.add(source);
  }

  protected jumpRelease(source: string): void {
    this.jumpHeld.delete(source);
  }

  /** HUD: uma especialidade já coletada abre o mesmo painel (habilidades do grupo). */
  protected openSlot(stop: HorizonStop | undefined): void {
    if (stop && this.collected().has(stop.id)) this.openReader(stop);
  }

  protected goNext(dir: 1 | -1): void {
    this.scene()?.goToNext(dir);
    this.focusStage();
  }

  protected pause(): void {
    this.release();
    this.rememberOpener();
    this.paused.set(true);
    this.pauseMenu().nativeElement.showModal?.();
  }

  protected resumeGame(): void {
    this.pauseMenu().nativeElement.close?.();
    this.paused.set(false);
    this.restoreFocus();
  }

  protected toText(): void {
    this.resumeGame();
    this.showText.emit();
  }

  protected restartFromMenu(): void {
    this.restart();
    this.focusStage();
  }

  protected closeReader(): void {
    this.reader().nativeElement.close?.();
    this.onReaderClosed();
  }

  /** Fechou (botão, Esc ou `close()` nativo): marca a parada como lida e devolve o foco. */
  protected onReaderClosed(): void {
    const stop = this.reading();
    if (!stop) return;
    this.reading.set(null);
    this.scene()?.markRead(stop.id);
    this.read.update((ids) => new Set(ids).add(stop.id));
    this.draw();
    this.restoreFocus();
  }

  protected onPauseCancel(event: Event): void {
    event.preventDefault();
    this.resumeGame();
  }

  // Entrada ------------------------------------------------------------------------------------

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.active() || this.paused() || this.reading() || event.ctrlKey || event.metaKey) return;
    const target = event.target as HTMLElement | null;
    const onControl = !!target?.closest('button, a, input, summary');
    const run = this.minigame();
    if (run?.phase === 'play') {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.leaveMinigame();
        return;
      }
      if (
        JUMP_KEYS.has(event.key) &&
        !(onControl && (event.key === ' ' || event.key === 'Enter'))
      ) {
        event.preventDefault();
        this.jumpPress(event.key.toLowerCase());
        return;
      }
    } else if (run) {
      // Abertura e conclusão: Esc volta; Enter/Espaço fora de um botão faz a ação principal.
      if (event.key === 'Escape') {
        event.preventDefault();
        this.leaveMinigame();
      } else if ((event.key === 'Enter' || event.key === ' ') && !onControl) {
        event.preventDefault();
        if (run.phase === 'intro') this.startMinigame();
        else this.leaveMinigame();
      }
      return;
    }
    const dir = KEY_DIR[event.key];
    if (dir) {
      event.preventDefault();
      if (!event.repeat) this.input.press(event.key.toLowerCase(), dir);
      this.scene()?.setMove(this.input.dir);
      return;
    }
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (onControl) return;
        event.preventDefault();
        this.readNear();
        return;
      case 'n':
      case 'N':
        this.goNext(1);
        return;
      case 'b':
      case 'B':
        this.goNext(-1);
        return;
      case 'Escape':
      case 'p':
      case 'P':
        event.preventDefault();
        this.pause();
        return;
    }
  }

  /** Soltar a tecla: ouvido na janela (a tecla pode ser solta com o foco em outro lugar). */
  private onKeyup(event: KeyboardEvent): void {
    if (JUMP_KEYS.has(event.key)) this.jumpRelease(event.key.toLowerCase());
    if (!KEY_DIR[event.key]) return;
    this.input.release(event.key.toLowerCase());
    this.scene()?.setMove(this.input.dir);
  }

  /** O foco saiu do jogo (Tab para fora, outro elemento da página): para de andar. */
  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !(event.currentTarget as HTMLElement).contains(next)) this.release();
  }

  /** Botões ◀ ▶: segurar anda; pelo teclado (sem ponteiro), vão à parada seguinte. */
  protected hold(event: PointerEvent, dir: -1 | 1): void {
    event.preventDefault();
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    this.input.press(`pointer-${dir}`, dir);
    this.scene()?.setMove(this.input.dir);
  }

  protected letGo(dir: -1 | 1): void {
    this.input.release(`pointer-${dir}`);
    this.scene()?.setMove(this.input.dir);
  }

  protected stepButton(event: MouseEvent, dir: -1 | 1): void {
    if (event.detail === 0) this.goNext(dir);
  }

  /** Toque/clique na tela: anda até a parada mais perto do ponto (ou até o ponto). */
  protected onStageClick(event: MouseEvent): void {
    if (this.minigame()) return;
    const scene = this.scene();
    const canvas = this.canvas().nativeElement;
    const rect = canvas.getBoundingClientRect();
    if (!scene || !rect.width) return;
    const x = scene.worldX(((event.clientX - rect.left) / rect.width) * VIEW.width);
    const hit = scene.world.stops.find((s) => Math.abs(s.x - x) <= NEAR_RADIUS);
    scene.walkTo(hit ? hit.x : x);
    this.focusStage();
  }

  // Textos -------------------------------------------------------------------------------------

  protected label(stop: HorizonStop): string {
    return stopLabel(stop, this.locale);
  }

  protected captionText(caption: CampaignCaption): string {
    const sh = this.ui().systemHorizon;
    switch (caption.kind) {
      case 'stop':
        return caption.stop ? this.label(caption.stop) : '';
      case 'unlocked':
        return sh.unlocked;
      case 'serial':
        return this.forgeSerial() ?? '';
      case 'horizon':
        return sh.title;
      case 'continues':
        return sh.continues;
    }
  }

  /** Frase curta da parada (D-104): o balão do marco, do capítulo, do cartucho ou da forja. */
  protected balloon(stop: HorizonStop): string {
    const own = HORIZON_BALLOONS[stop.id];
    if (own) return this.locale.pick(own);
    switch (stop.kind) {
      case 'cartridge':
        return `${this.locale.pick(stop.project.title)} · ${this.locale.pick(stop.project.type)}`;
      case 'forge':
        return this.ui().systemHorizon.game.unlockedLead;
      case 'milestone':
        return this.locale.pick(stop.entry.title);
      case 'checkpoint':
        return this.label(stop);
      default:
        return '';
    }
  }

  /** O balão nunca sai da tela: o centro fica entre 32% e 68% da largura. */
  protected clampX(x: number): number {
    return Math.min(Math.max(x / 1.6, 32), 68);
  }

  /** Posição do balão (em % da tela), acima da parada próxima. */
  protected readonly balloonAt = computed(() => {
    const caption = this.captions().find((c) => c.kind === 'stop');
    const stop = caption?.stop;
    if (!caption || !stop || stop.kind === 'closing' || this.minigame()) return null;
    return { stop, x: caption.x, y: caption.y };
  });

  private forgeSerial(): string | null {
    const forge = this.world().stops.find((s) => s.kind === 'forge');
    return forge?.kind === 'forge' ? forge.project.serial : null;
  }

  // Laço ---------------------------------------------------------------------------------------

  private async setup(destroyRef: DestroyRef): Promise<void> {
    const win = this.document.defaultView;
    if (!win) return;
    // Entrada primeiro (vale mesmo sem canvas): soltar a tecla ou sair da janela para de andar.
    const onBlur = () => this.release();
    const onKeyup = (event: KeyboardEvent) => this.onKeyup(event);
    win.addEventListener('blur', onBlur);
    win.addEventListener('keyup', onKeyup);
    destroyRef.onDestroy(() => {
      win.removeEventListener('blur', onBlur);
      win.removeEventListener('keyup', onKeyup);
    });
    const canvas = this.canvas().nativeElement;
    this.renderer = Renderer.create(canvas);
    if (!this.renderer) return;
    this.palette = readPalette(win.getComputedStyle(canvas));
    let destroyed = false;
    destroyRef.onDestroy(() => (destroyed = true));
    this.art = await loadCampaignArt(this.document, this.palette);
    if (destroyed) return;
    const resize = new win.ResizeObserver(() => {
      this.renderer?.resize(canvas.clientWidth, win.devicePixelRatio || 1);
      this.draw();
    });
    resize.observe(canvas);
    const onVisibility = () => this.pageVisible.set(this.document.visibilityState === 'visible');
    this.document.addEventListener('visibilitychange', onVisibility);
    destroyRef.onDestroy(() => {
      resize.disconnect();
      this.document.removeEventListener('visibilitychange', onVisibility);
    });
    this.ready.set(true);
    this.draw();
  }

  private resume(): void {
    if (this.frame) return;
    this.clock.reset();
    this.last = performance.now();
    this.frame = requestAnimationFrame(this.tick);
  }

  private suspend(): void {
    if (!this.frame) return;
    cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  private readonly tick = (now: number): void => {
    const steps = this.clock.advance(now - this.last);
    this.last = now;
    const run = this.minigame();
    if (run) {
      if (run.phase === 'play' && steps) {
        const pad = { dir: this.input.dir, jump: this.jumpHeld.size > 0 };
        for (let i = 0; i < steps && !run.game.done; i++) run.game.step(pad);
        if (run.game.done) this.finishMinigame(run);
        this.draw();
      }
      this.frame = requestAnimationFrame(this.tick);
      return;
    }
    const scene = this.scene();
    if (scene) {
      for (let i = 0; i < steps; i++) scene.step();
      if (steps) {
        this.handle(scene.drain(), scene);
        if (this.actCard() && this.actCardUntil && scene.tick >= this.actCardUntil) {
          this.actCard.set(false);
        }
        this.draw();
      }
    }
    this.frame = requestAnimationFrame(this.tick);
  };

  private finishMinigame(run: MinigameRun): void {
    this.release();
    this.minigame.set({ ...run, phase: 'done' });
    this.played.update((ids) => new Set(ids).add(run.stop.id));
    this.scene()?.markRead(run.stop.id);
    this.read.update((ids) => new Set(ids).add(run.stop.id));
    this.say(`${this.ui().systemHorizon.game.minigame.done}. ${this.balloon(run.stop)}`);
  }

  private say(text: string): void {
    this.echo = !this.echo;
    this.announcement.set(text + (this.echo ? '\u00a0' : ''));
  }

  private handle(events: readonly CampaignEvent[], scene: CampaignScene): void {
    const game = this.ui().systemHorizon.game;
    const say: string[] = [];
    for (const event of events) {
      switch (event.type) {
        case 'act':
          this.act.set(event.act);
          this.actCard.set(true);
          this.actCardUntil = scene.tick + ACT_CARD_TICKS;
          say.push(this.actName());
          break;
        case 'near': {
          const stop = event.stop;
          this.near.set(stop);
          if (!stop) break;
          const action = this.action(stop);
          const hint = stop.kind === 'closing' ? game.announce.enter : game.announce.play;
          say.push(action ? `${this.balloon(stop)} ${hint}` : this.balloon(stop));
          // Sem ação, o balão é a leitura: a parada fica lida (o selo some).
          if (!action) {
            scene.markRead(stop.id);
            this.read.update((ids) => new Set(ids).add(stop.id));
          }
          break;
        }
        case 'collected':
          this.collected.update((ids) => new Set(ids).add(event.stop.id));
          say.push(`${this.label(event.stop)} ${game.announce.collected}`);
          break;
        case 'checkpoint':
          say.push(`${this.label(event.stop)} ${game.announce.checkpoint}`);
          break;
        case 'unlocked':
          this.unlocked.set(true);
          say.push(game.announce.unlocked);
          break;
        case 'arrived':
          say.push(game.announce.arrived);
          break;
      }
    }
    if (say.length) this.say(say.join(' '));
  }

  private draw(): void {
    const { renderer, art, palette } = this;
    const scene = this.scene();
    if (!renderer || !art || !palette || !scene) return;
    const run = this.minigame();
    if (run) {
      run.game.draw(renderer, art, palette);
      renderer.present();
      return;
    }
    scene.draw(renderer, art, palette);
    renderer.present();
    this.captions.set(scene.captions());
  }

  // Apoio --------------------------------------------------------------------------------------

  private openReader(stop: HorizonStop): void {
    this.release();
    this.rememberOpener();
    this.reading.set(stop);
    const dialog = this.reader().nativeElement;
    dialog.showModal?.();
    // O título anuncia o conteúdo (o showModal focaria o primeiro controle); só existe depois
    // de renderizar o conteúdo novo.
    afterNextRender(
      () => {
        dialog.scrollTop = 0;
        dialog.querySelector('.reader-body')?.scrollTo?.(0, 0);
        dialog.querySelector<HTMLElement>('#horizon-reader-title')?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }

  private closeDialogs(): void {
    if (this.reading()) this.closeReader();
    if (this.paused()) {
      this.pauseMenu().nativeElement.close?.();
      this.paused.set(false);
    }
  }

  private release(): void {
    this.input.clear();
    this.jumpHeld.clear();
    this.scene()?.setMove(0);
  }

  private rememberOpener(): void {
    const active = this.document.activeElement as HTMLElement | null;
    this.opener = active && !active.closest('dialog') ? active : null;
  }

  private restoreFocus(): void {
    const opener = this.opener;
    this.opener = null;
    if (opener?.isConnected && !opener.closest('[hidden]')) opener.focus({ preventScroll: true });
    else this.focusStage();
  }

  private focusStage(): void {
    this.stage().nativeElement.focus({ preventScroll: true });
  }
}
