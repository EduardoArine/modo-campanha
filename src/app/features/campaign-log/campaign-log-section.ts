import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { CAMPAIGN_LOG_CHAPTERS } from '../../data';
import { McAction, McIcon, McSectionHeader } from '../../shared/ui';

/**
 * Campaign Log (Home Slice 03-B, D-048/D-050; capítulos D-070–D-074). Checkpoint Log Editorial
 * (A + C): a trajetória real em capítulos, numa única linha cronológica. Linha e markers só
 * organizam a cronologia. Sem métricas, XP ou badges. Interações: abrir a história completa
 * (<details> nativo) e, dentro dela, links para fontes públicas que comprovam o checkpoint.
 */
@Component({
  selector: 'app-campaign-log-section',
  imports: [McAction, McIcon, McSectionHeader],
  templateUrl: './campaign-log-section.html',
  styleUrl: './campaign-log-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignLogSection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly chapters = CAMPAIGN_LOG_CHAPTERS;

  /** Número do checkpoint dentro do capítulo, derivado da ordem (01, 02...), nunca do dado. */
  protected code(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}
