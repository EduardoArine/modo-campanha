import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ACHIEVEMENTS, CAMPAIGN_LOG, shouldRenderAchievements } from '../../data';
import { AchievementsSection } from '../../features/achievements/achievements-section';
import { CampaignLogSection } from '../../features/campaign-log/campaign-log-section';
import { HeroSection } from '../../features/hero/hero-section';
import { PlayerStatusSection } from '../../features/player-status/player-status-section';
import { ProjectInventorySection } from '../../features/project-inventory/project-inventory-section';
import { SkillLoadoutSection } from '../../features/skill-loadout/skill-loadout-section';

// Ordem das seções segue docs/03-information-architecture.md. Só seções construídas são
// renderizadas (D-047). O Campaign Log só aparece quando há entradas: em produção a lista
// publicada está vazia até o histórico real ser aprovado; em desenvolvimento entra o MOCK
// (D-049). Achievements só com >= 2 itens (D-051), pelo mesmo mecanismo. Current Main Quest,
// Side Quests e Final Checkpoint entram com seus slices reais.
@Component({
  selector: 'app-home-page',
  imports: [
    HeroSection,
    PlayerStatusSection,
    SkillLoadoutSection,
    ProjectInventorySection,
    CampaignLogSection,
    AchievementsSection,
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
      @if (hasAchievements) {
        <app-achievements-section />
      }
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly hasCampaignLog = CAMPAIGN_LOG.length > 0;
  protected readonly hasAchievements = shouldRenderAchievements(ACHIEVEMENTS);
}
