import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { Project } from '../../models';
import { McIcon } from '../../shared/ui';

/**
 * Biblioteca MC-CART (D-087): a coleção física de cartuchos, acima da estação MC-01 + CRT.
 * Escolher um cartucho é uma ação explícita (botão nativo; clique, toque, Enter ou Espaço). Com o
 * slot vazio, só seleciona; com um cartucho inserido, a mesma escolha faz a troca (a seção decide).
 * Sem autoplay e sem troca ao passar o mouse ou ao navegar com Tab. Quando a faixa não cabe na
 * largura, a rolagem é horizontal dentro da biblioteca (snap leve) e aparecem controles visíveis.
 */
@Component({
  selector: 'app-cartridge-library',
  imports: [McIcon],
  templateUrl: './cartridge-library.html',
  styleUrl: './cartridge-library.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartridgeLibrary {
  readonly projects = input.required<readonly Project[]>();
  /** Cartucho escolhido (o que está sobre o slot ou entrando). */
  readonly selected = input.required<string>();
  /** Cartucho fisicamente no MC-01 (null com o slot vazio). */
  readonly inserted = input<string | null>(null);
  /** Cartucho entrando ou carregando no MC-01: CARREGANDO até o READY. */
  readonly loading = input<string | null>(null);
  /** Em transição (inserindo, carregando, ejetando): a escolha espera, sem prender o foco. */
  readonly busy = input(false);
  /** O CRT (#project-viewer) está na página (fora do fallback): só então há aria-controls. */
  readonly viewer = input(true);
  readonly choose = output<string>();

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;

  private readonly strip = viewChild.required<ElementRef<HTMLElement>>('strip');
  protected readonly overflow = signal(false);
  protected readonly atStart = signal(true);
  protected readonly atEnd = signal(false);

  /** "06 CARTUCHOS": quantidade com dois dígitos, como numeração de coleção. */
  protected readonly count = computed(
    () =>
      `${String(this.projects().length).padStart(2, '0')} ${this.ui().inventory.collection.count}`,
  );
  protected readonly hint = computed(() => {
    const c = this.ui().inventory.collection;
    return this.busy() ? c.busy : this.inserted() ? c.hintSwap : c.hint;
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const el = this.strip().nativeElement;
      const measure = () => {
        const max = el.scrollWidth - el.clientWidth;
        this.overflow.set(max > 1);
        this.atStart.set(el.scrollLeft <= 1);
        this.atEnd.set(el.scrollLeft >= max - 1);
      };
      measure();
      el.addEventListener('scroll', measure, { passive: true });
      const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
      observer?.observe(el);
      destroyRef.onDestroy(() => {
        el.removeEventListener('scroll', measure);
        observer?.disconnect();
      });
    });
  }

  /** Escolher este cartucho muda algo? (o inserido e o já selecionado com o slot vazio, não). */
  protected actionable(project: Project): boolean {
    if (project.id === this.inserted() || project.id === this.loading()) return false;
    return !(project.id === this.selected() && !this.inserted());
  }

  /**
   * Nome acessível: a ação + código e título uma vez só ("Selecionar MC-003 — ScoutEvo"). Sem
   * ação, o estado no lugar do verbo ("MC-005 — Axia, inserido").
   */
  protected label(project: Project): string {
    const c = this.ui().inventory.collection;
    const name = `${project.serial} — ${this.locale.pick(project.title)}`;
    if (project.id === this.inserted()) return `${name}, ${c.isInserted}`;
    if (project.id === this.loading()) return `${name}, ${c.isLoading}`;
    if (!this.actionable(project)) return `${name}, ${c.isSelected}`;
    return `${this.inserted() ? c.swap : c.select} ${name}`;
  }

  protected pick(project: Project): void {
    if (this.busy() || !this.actionable(project)) return;
    this.choose.emit(project.id);
  }

  /** Avança ou volta quase uma página da faixa (respeita reduced motion). */
  protected page(direction: 1 | -1): void {
    if (direction < 0 ? this.atStart() : this.atEnd()) return;
    const el = this.strip().nativeElement;
    const reduce = el.ownerDocument.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)');
    el.scrollBy({
      left: direction * el.clientWidth * 0.85,
      behavior: reduce?.matches ? 'auto' : 'smooth',
    });
  }
}
