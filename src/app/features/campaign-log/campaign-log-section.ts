import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { CAMPAIGN_LOG, CAMPAIGN_LOG_CHAPTERS } from '../../data';
import { McSectionHeader } from '../../shared/ui';

/**
 * Campaign Log (Home Slice 03-B, D-048/D-049). Checkpoint Log Editorial (A + C): uma seleção
 * cronológica de mudanças da trajetória, não um currículo. Linha e markers só organizam a
 * cronologia. Sem tecnologias, métricas, XP ou badges. Capítulos (docs/15 §13) antecedem a linha
 * profissional no mesmo eixo; a única interação é abrir a história completa (<details> nativo).
 */
@Component({
  selector: 'app-campaign-log-section',
  imports: [McSectionHeader],
  templateUrl: './campaign-log-section.html',
  styleUrl: './campaign-log-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignLogSection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly entries = CAMPAIGN_LOG;
  protected readonly chapters = CAMPAIGN_LOG_CHAPTERS;

  /** Número do checkpoint dentro do capítulo, derivado da ordem (01, 02...), nunca do dado. */
  protected code(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}
