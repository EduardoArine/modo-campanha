import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';

import { LocaleService } from '../core/i18n';
import { AttractPlayback, AUTO_STOP_LOOPS } from './attract-playback';
import { ATTRACT_CARTRIDGE_SERIAL } from './content/attract-content';
import { FixedClock } from './engine/clock';
import { Renderer } from './engine/renderer';
import { AttractScene } from './scenes/attract';
import { Caption, CaptionKey } from './scenes/scene';
import { quadTransform, ScreenQuad } from './screen-quad';
import { Art } from './world/assets';
import { Palette, readPalette } from './world/palette';
import { createPlaceholderArt } from './world/placeholder-art';

/**
 * Tela do SYSTEM HORIZON (D-068, docs/22): canvas 160 × 120 em escala inteira + textos de sistema
 * (dicionário) por cima. Roda o attract mode enquanto `playback` está tocando e a tela está
 * visível (pausa fora da viewport e com a aba oculta); pausado = quadro-chave. Decorativa
 * (aria-hidden): a mensagem já está no texto da Hero. Não conhece o lugar onde é exibida; com
 * `quad`, projeta a tela nos cantos do vidro (perspectiva de um CRT fotografado).
 */
@Component({
  selector: 'app-system-horizon-screen',
  template: `
    <div class="warp" [style.transform]="warp()">
      <div class="view">
        <canvas #canvas></canvas>
        @for (caption of captions(); track caption.key) {
          <span
            class="caption"
            [class.start]="caption.align === 'start'"
            [class.minor]="caption.minor"
            [style.left.%]="caption.x / 1.6"
            [style.top.%]="caption.y / 1.2"
            >{{ text(caption.key) }}</span
          >
        }
      </div>
    </div>
  `,
  styleUrl: './system-horizon-screen.scss',
  host: { 'aria-hidden': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemHorizonScreen {
  readonly playback = input.required<AttractPlayback>();
  /** Cantos do vidro dentro do host (frações); sem quad, a tela ocupa o host reto. */
  readonly quad = input<ScreenQuad>();

  private readonly ui = inject(LocaleService).ui;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly clock = new FixedClock();
  private readonly ready = signal(false);
  private readonly inView = signal(true);
  private readonly pageVisible = signal(true);
  protected readonly captions = signal<readonly Caption[]>([]);
  protected readonly warp = signal<string | null>(null);

  private renderer: Renderer | null = null;
  private art: Art | null = null;
  private palette: Palette | null = null;
  private scene: AttractScene | null = null;
  private frame = 0;
  private last = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => this.setup(destroyRef));

    // Play = recomeça o attract mode; pausa = quadro-chave estático.
    effect(() => {
      if (!this.ready()) return;
      const playback = this.playback();
      const playing = playback.playing();
      playback.run();
      untracked(() => {
        this.scene = playing
          ? new AttractScene({ boot: playback.takeBoot() })
          : AttractScene.keyframe();
        this.draw();
      });
    });

    // O relógio só anda tocando, na viewport e com a aba visível.
    effect(() => {
      const active =
        this.ready() && this.playback().playing() && this.inView() && this.pageVisible();
      untracked(() => (active ? this.resume() : this.suspend()));
    });

    destroyRef.onDestroy(() => this.suspend());
  }

  protected text(key: CaptionKey): string {
    const ui = this.ui();
    const sh = ui.systemHorizon;
    switch (key) {
      case 'console':
        return ui.crt.identification;
      case 'title':
      case 'horizon':
        return sh.title;
      case 'player':
        return sh.player;
      case 'unlocked':
        return sh.unlocked;
      case 'serial':
        return ATTRACT_CARTRIDGE_SERIAL;
      case 'continues':
        return sh.continues;
      default:
        return sh.items[key];
    }
  }

  private setup(destroyRef: DestroyRef): void {
    const doc = this.host.ownerDocument;
    const win = doc.defaultView;
    const canvas = this.canvas().nativeElement;
    this.renderer = win ? Renderer.create(canvas) : null;
    if (!win || !this.renderer) return;
    this.palette = readPalette(win.getComputedStyle(this.host));
    this.art = createPlaceholderArt(doc, this.palette);

    const resize = new win.ResizeObserver(() => {
      this.renderer?.resize(canvas.clientWidth, win.devicePixelRatio || 1);
      const quad = this.quad();
      const { clientWidth: w, clientHeight: h } = this.host;
      this.warp.set(quad && w && h ? quadTransform(w, h, quad) : null);
      this.draw();
    });
    resize.observe(canvas);
    resize.observe(this.host);
    const view = new win.IntersectionObserver(([entry]) => this.inView.set(entry.isIntersecting));
    view.observe(this.host);
    const onVisibility = () => this.pageVisible.set(doc.visibilityState === 'visible');
    doc.addEventListener('visibilitychange', onVisibility);
    destroyRef.onDestroy(() => {
      resize.disconnect();
      view.disconnect();
      doc.removeEventListener('visibilitychange', onVisibility);
    });
    this.ready.set(true);
  }

  private resume(): void {
    if (this.frame) return;
    this.clock.reset();
    this.last = performance.now();
    this.frame = requestAnimationFrame(this.tick);
  }

  private suspend(): void {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  private readonly tick = (now: number): void => {
    const steps = this.clock.advance(now - this.last);
    this.last = now;
    const scene = this.scene;
    if (scene) {
      for (let i = 0; i < steps; i++) {
        scene.step();
        if (scene.tick === 0 && scene.loops >= AUTO_STOP_LOOPS) {
          this.frame = 0;
          this.playback().pause();
          return;
        }
      }
      if (steps) this.draw();
    }
    this.frame = requestAnimationFrame(this.tick);
  };

  private draw(): void {
    const { renderer, art, palette, scene } = this;
    if (!renderer || !art || !palette || !scene) return;
    scene.draw(renderer, art, palette);
    renderer.present();
    this.captions.set(scene.captions());
  }
}
