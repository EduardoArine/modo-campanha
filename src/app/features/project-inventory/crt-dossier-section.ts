import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { Project } from '../../models';
import { McAction, McIcon, McStatus } from '../../shared/ui';
import type { DossierSectionId } from './crt-dossier';

/**
 * Conteúdo de uma seção do dossiê (H3, D-093), só com dados aprovados do projeto: descrição e arte
 * (rotulada como arte do cartucho, não como captura do produto), problema, contribuição,
 * tecnologias, marcos e aprendizados com as evidências públicas.
 */
@Component({
  selector: 'app-crt-dossier-section',
  imports: [McAction, McIcon, McStatus],
  templateUrl: './crt-dossier-section.html',
  styleUrl: './crt-dossier-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrtDossierSection {
  readonly project = input.required<Project>();
  readonly section = input.required<DossierSectionId>();

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
}
