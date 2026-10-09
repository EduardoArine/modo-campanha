import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { CAMPAIGN_LOG } from '../../data';
import { McSectionHeader } from '../../shared/ui';

/**
 * Campaign Log (Home Slice 03-B, D-048/D-049). Checkpoint Log Editorial (A + C): uma seleção
 * cronológica de mudanças da trajetória, não um currículo. Linha e markers só organizam a
 * cronologia; nada é interativo. Sem tecnologias, métricas, XP ou badges.
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
}
