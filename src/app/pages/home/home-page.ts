import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HeroSection } from '../../features/hero/hero-section';
import { PlayerStatusSection } from '../../features/player-status/player-status-section';
import { ProjectInventorySection } from '../../features/project-inventory/project-inventory-section';
import { SkillLoadoutSection } from '../../features/skill-loadout/skill-loadout-section';

// Ordem das seções segue docs/03-information-architecture.md. Só seções construídas são
// renderizadas: Campaign Log, Achievements, Current Main Quest, Side Quests e Final
// Checkpoint entram aqui quando seus slices reais existirem (sem placeholders públicos).
@Component({
  selector: 'app-home-page',
  imports: [HeroSection, PlayerStatusSection, SkillLoadoutSection, ProjectInventorySection],
  template: `
    <main>
      <app-hero-section />
      <app-player-status-section />
      <app-skill-loadout-section />
      <app-project-inventory-section />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
