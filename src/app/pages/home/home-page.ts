import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AchievementsSection } from '../../features/achievements/achievements-section';
import { CampaignLogSection } from '../../features/campaign-log/campaign-log-section';
import { CurrentQuestSection } from '../../features/current-quest/current-quest-section';
import { FinalCheckpointSection } from '../../features/final-checkpoint/final-checkpoint-section';
import { HeroSection } from '../../features/hero/hero-section';
import { PlayerStatusSection } from '../../features/player-status/player-status-section';
import { ProjectInventorySection } from '../../features/project-inventory/project-inventory-section';
import { SideQuestsSection } from '../../features/side-quests/side-quests-section';
import { SkillTreeSection } from '../../features/skill-tree/skill-tree-section';

// Ordem das seções segue docs/03-information-architecture.md.
@Component({
  selector: 'app-home-page',
  imports: [
    HeroSection,
    PlayerStatusSection,
    SkillTreeSection,
    ProjectInventorySection,
    CampaignLogSection,
    AchievementsSection,
    CurrentQuestSection,
    SideQuestsSection,
    FinalCheckpointSection,
  ],
  template: `
    <main>
      <app-hero-section />
      <app-player-status-section />
      <app-skill-tree-section />
      <app-project-inventory-section />
      <app-campaign-log-section />
      <app-achievements-section />
      <app-current-quest-section />
      <app-side-quests-section />
      <app-final-checkpoint-section />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
