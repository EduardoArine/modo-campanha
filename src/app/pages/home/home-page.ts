import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CAMPAIGN_LOG } from '../../data';
import { CampaignLogSection } from '../../features/campaign-log/campaign-log-section';
import { HeroSection } from '../../features/hero/hero-section';
import { PlayerStatusSection } from '../../features/player-status/player-status-section';
import { ProjectInventorySection } from '../../features/project-inventory/project-inventory-section';
import { SkillLoadoutSection } from '../../features/skill-loadout/skill-loadout-section';

// Ordem das seções segue docs/03-information-architecture.md. Só seções construídas são
// renderizadas (D-047). O Campaign Log só aparece quando há entradas: em produção a lista
// publicada está vazia até o histórico real ser aprovado; em desenvolvimento entra o MOCK
// (D-049). Achievements, Current Main Quest, Side Quests e Final Checkpoint entram com
// seus slices reais.
@Component({
  selector: 'app-home-page',
  imports: [
    HeroSection,
    PlayerStatusSection,
    SkillLoadoutSection,
    ProjectInventorySection,
    CampaignLogSection,
  ],
  template: `
    <main>
      <app-hero-section />
      <app-player-status-section />
      <app-skill-loadout-section />
      <app-project-inventory-section />
      @if (hasCampaignLog) {
        <app-campaign-log-section />
      }
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly hasCampaignLog = CAMPAIGN_LOG.length > 0;
}
