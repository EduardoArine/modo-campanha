import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { Project } from '../../models';
import { McAction, McIcon } from '../../shared/ui';

/**
 * Case do projeto (D-077, D-087): fora do CRT, em HTML acessível, para leitura rápida. Só campos
 * aprovados do `Project` (problema, contribuição, stack, marcos, aprendizados, links). Nome, proposta e experiências disponíveis ficam
 * no editorial da seção (sem repetir). Não duplica o Campaign Log.
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
