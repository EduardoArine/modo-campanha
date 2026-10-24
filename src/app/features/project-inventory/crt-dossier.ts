import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { Project } from '../../models';
import { McAction, McIcon } from '../../shared/ui';
import { CrtDossierSection } from './crt-dossier-section';

export type DossierSectionId =
  'about' | 'challenge' | 'role' | 'stack' | 'highlights' | 'learnings';

/**
 * Seções do dossiê de um projeto, na ordem aprovada. Só entram as que têm conteúdo real: um projeto
 * sem marcos documentados não ganha uma seção vazia (nada de placeholder).
 */
export function dossierSections(project: Project): readonly DossierSectionId[] {
  const sections: DossierSectionId[] = ['about'];
  if (project.challenge) sections.push('challenge');
  sections.push('role', 'stack');
  if (project.timeline?.length || project.highlights?.['pt-BR'].length) sections.push('highlights');
  if (project.learnings['pt-BR'].length || project.links.length) sections.push('learnings');
  return sections;
}

/**
 * Dossiê do projeto dentro do CRT (H3, D-093). Cabeçalho (código, nome, Voltar à capa), navegação
 * das seções (lista ao lado no vidro largo; seletor nativo no vidro estreito), uma seção por vez e
 * rodapé com o indicador (01 / 06), Anterior e Próxima. Textos longos rolam dentro da área da seção
 * (região focável); trocar de seção volta ao início dela sem mexer na página nem no foco.
 */
@Component({
  selector: 'app-crt-dossier',
  imports: [McAction, McIcon, CrtDossierSection],
  templateUrl: './crt-dossier.html',
  styleUrl: './crt-dossier.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrtDossier {
  readonly project = input.required<Project>();
  /** Seção ativa (índice em `sections`). */
  readonly section = input(0);
  readonly go = output<number>();
  readonly cover = output<void>();

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;

  private readonly content = viewChild<ElementRef<HTMLElement>>('content');
  protected readonly sections = computed(() => dossierSections(this.project()));
  protected readonly index = computed(() =>
    Math.min(Math.max(0, this.section()), this.sections().length - 1),
  );
  protected readonly current = computed(() => this.sections()[this.index()]);
  protected readonly total = computed(() => this.sections().length);
  protected readonly isFirst = computed(() => this.index() === 0);
  protected readonly isLast = computed(() => this.index() === this.total() - 1);
  /** Anúncio curto da seção (role="status"); vazio ao abrir o dossiê. */
  protected readonly announcement = signal('');
  /** A seção passa da área: a região entra no Tab para rolar pelo teclado (só então). */
  protected readonly scrollable = signal(false);

  constructor() {
    // Nova seção: o conteúdo volta ao topo (a página e o foco ficam onde estão).
    effect(() => {
      this.index();
      untracked(() => this.content()?.nativeElement.scrollTo?.({ top: 0 }));
    });
    afterRenderEffect(() => {
      this.index();
      const el = this.content()?.nativeElement;
      if (el) this.scrollable.set(el.scrollHeight > el.clientHeight + 1);
    });
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  protected label(id: DossierSectionId): string {
    const s = this.ui().inventory.dossier.sections;
    // Sem links públicos, a última seção é só de aprendizados (Comunidade ON).
    if (id === 'learnings') return this.project().links.length ? s.learningsEvidence : s.learnings;
    return s[id];
  }

  protected select(index: number): void {
    if (index < 0 || index >= this.total() || index === this.index()) return;
    const d = this.ui().inventory.dossier;
    this.announcement.set(
      `${d.section} ${this.pad(index + 1)} ${d.of} ${this.pad(this.total())}: ${this.label(this.sections()[index])}`,
    );
    this.go.emit(index);
  }

  protected onPick(event: Event): void {
    this.select(Number((event.target as HTMLSelectElement).value));
  }
}
