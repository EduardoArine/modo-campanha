import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { Project } from '../../models';
import { McAction, McIcon } from '../../shared/ui';

/**
 * Project Case (FASE 5, docs/20): conteúdo do projeto exibido dentro do CRT Project Viewer.
 * Só campos aprovados do `Project` (tipo, papel, tecnologias, descrição, aprendizados, links reais).
 * "CRT na moldura; clareza no conteúdo": nenhum efeito sobre o texto ou o artwork.
 */
@Component({
  selector: 'app-project-case',
  imports: [McAction, McIcon],
  templateUrl: './project-case.html',
  styleUrl: './project-case.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCase {
  readonly project = input.required<Project>();
  /** Ejetar o cartucho: fecha o case. */
  readonly eject = output<void>();

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  private readonly heading = viewChild.required<ElementRef<HTMLElement>>('heading');

  /** Leva o foco ao título do case (depois do boot), sem rolar a página. */
  focus(): void {
    this.heading().nativeElement.focus({ preventScroll: true });
  }
}
