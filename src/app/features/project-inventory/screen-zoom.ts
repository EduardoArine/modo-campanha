import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';

/** Duração da expansão (e da volta) da tela; sem movimento com reduced motion. */
const ZOOM_MS = 320;

/**
 * Tela do portátil em tela cheia (D-096): no celular, o dossiê "entra na tela". Um `<dialog>` nativo
 * modal (foco preso, fundo inerte) que cresce a partir do visor (`origin`) até o celular inteiro e
 * encolhe de volta em `collapse()`. Esc e o voltar do sistema (uma entrada no histórico, consumida
 * ao fechar) pedem para sair por `dismiss`; quem usa decide o que fazer (voltar à capa).
 */
@Component({
  selector: 'app-screen-zoom',
  template: `<dialog #dialog (cancel)="onCancel($event)"><ng-content /></dialog>`,
  styleUrl: './screen-zoom.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenZoom {
  /** Seletor do visor de onde a tela cresce (e para onde volta). */
  readonly origin = input.required<string>();
  /** Seletor do que recebe o foco ao abrir. */
  readonly focus = input('h3');
  readonly dismiss = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;
  /** A entrada do histórico ainda é nossa (não foi consumida por um voltar do sistema). */
  private pushed = false;
  private collapsing: Promise<void> | null = null;

  constructor() {
    const onPop = () => {
      this.pushed = false;
      this.dismiss.emit();
    };
    afterNextRender(() => {
      const dialog = this.dialog().nativeElement;
      dialog.showModal?.();
      // O título do dossiê anuncia o projeto (o showModal focaria o primeiro controle).
      dialog.querySelector<HTMLElement>(this.focus())?.focus({ preventScroll: true });
      // A página atrás não rola enquanto a tela está cheia (só o conteúdo do dossiê).
      this.document.documentElement.style.overflow = 'hidden';
      this.window?.history.pushState({ ...this.window.history.state, mcScreenZoom: true }, '');
      this.pushed = true;
      this.window?.addEventListener('popstate', onPop);
      this.animate(false);
    });
    inject(DestroyRef).onDestroy(() => {
      this.window?.removeEventListener('popstate', onPop);
      this.document.documentElement.style.overflow = '';
      // Fechou pelo botão ou pelo Esc: consome a entrada que criamos (o voltar não muda nada).
      if (this.pushed && this.window?.history.state?.mcScreenZoom) this.window.history.back();
    });
  }

  /** Encolhe a tela de volta ao visor; resolve quando a animação termina. */
  collapse(): Promise<void> {
    this.collapsing ??= this.animate(true);
    return this.collapsing;
  }

  protected onCancel(event: Event): void {
    event.preventDefault();
    this.dismiss.emit();
  }

  private animate(reverse: boolean): Promise<void> {
    const dialog = this.dialog().nativeElement;
    const visor = this.document.querySelector(this.origin())?.getBoundingClientRect();
    const reduced = this.window?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!visor || reduced || !dialog.animate || !this.window) return Promise.resolve();
    const { innerWidth: w, innerHeight: h } = this.window;
    const from = `inset(${visor.top}px ${w - visor.right}px ${h - visor.bottom}px ${visor.left}px round 6px)`;
    const frames = [{ clipPath: from }, { clipPath: 'inset(0px 0px 0px 0px round 0px)' }];
    const run = dialog.animate(reverse ? frames.reverse() : frames, {
      duration: ZOOM_MS,
      easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
      fill: reverse ? 'forwards' : 'none',
    });
    return run.finished.then(
      () => undefined,
      () => undefined,
    );
  }
}
