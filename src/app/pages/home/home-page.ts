import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SiteFooter } from '../../core/layout/site-footer/site-footer';
import {
  ACHIEVEMENTS,
  CAMPAIGN_LOG,
  CURRENT_QUEST,
  SIDE_QUESTS,
  shouldRenderAchievements,
} from '../../data';
import { AchievementsSection } from '../../features/achievements/achievements-section';
import { CampaignLogSection } from '../../features/campaign-log/campaign-log-section';
import { CurrentQuestSection } from '../../features/current-quest/current-quest-section';
import { FinalCheckpointSection } from '../../features/final-checkpoint/final-checkpoint-section';
import { HeroSection } from '../../features/hero/hero-section';
import { PlayerStatusSection } from '../../features/player-status/player-status-section';
import { ProjectInventorySection } from '../../features/project-inventory/project-inventory-section';
import { SideQuestsSection } from '../../features/side-quests/side-quests-section';
import { SkillLoadoutSection } from '../../features/skill-loadout/skill-loadout-section';

// Ordem das seções segue docs/03-information-architecture.md. Só seções construídas são
// renderizadas (D-047). O Campaign Log só aparece quando há entradas: em produção a lista
// publicada está vazia até o histórico real ser aprovado; em desenvolvimento entra o MOCK
// (D-049). Achievements só com >= 2 itens (D-051), pelo mesmo mecanismo. O Final Checkpoint
// é sempre a última seção (D-052). Current Main Quest (docs/18) e Side Quests (docs/19) só com
// conteúdo publicado. O footer vem logo depois do </main> (só na Home, D-052).
@Component({
  selector: 'app-home-page',
  imports: [
    HeroSection,
    PlayerStatusSection,
    SkillLoadoutSection,
    ProjectInventorySection,
    CampaignLogSection,
    AchievementsSection,
    CurrentQuestSection,
    SideQuestsSection,
    FinalCheckpointSection,
    SiteFooter,
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
      @if (hasCurrentQuest) {
        <app-current-quest-section />
      }
      @if (hasSideQuests) {
        <app-side-quests-section />
      }
      <app-final-checkpoint-section />
    </main>
    <app-site-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly hasCampaignLog = CAMPAIGN_LOG.length > 0;
  protected readonly hasAchievements = shouldRenderAchievements(ACHIEVEMENTS);
  protected readonly hasCurrentQuest = CURRENT_QUEST !== null;
  protected readonly hasSideQuests = SIDE_QUESTS.length > 0;
}
