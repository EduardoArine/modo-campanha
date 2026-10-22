import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { Project } from '../../models';
import { McAction, McIcon } from '../../shared/ui';

/**
 * Case do projeto em HTML, fora do CRT (D-077, D-087). Desde o H3 (D-093), o case aparece dentro do
 * CRT (dossiê); este componente fica só para o FALLBACK (MC-01 indisponível), para o conteúdo
 * continuar acessível. Só campos aprovados do `Project`. Não duplica o Campaign Log.
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

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
}
