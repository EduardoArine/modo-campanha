import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SiteFooter } from '../../core/layout/site-footer/site-footer';
import { CAMPAIGN_LOG_CHAPTERS } from '../../data';
import { CampaignLogSection } from '../../features/campaign-log/campaign-log-section';
import { FinalCheckpointSection } from '../../features/final-checkpoint/final-checkpoint-section';
import { HeroSection } from '../../features/hero/hero-section';
import { PlayerStatusSection } from '../../features/player-status/player-status-section';
import { ProjectInventorySection } from '../../features/project-inventory/project-inventory-section';
import { SkillLoadoutSection } from '../../features/skill-loadout/skill-loadout-section';

// Ordem das seções segue docs/03-information-architecture.md. Só seções construídas são
// renderizadas (D-047). O Diário de Campanha só aparece com capítulos. O Final Checkpoint é
// sempre a última seção (D-052). Conquistas, Missão principal atual e Missões secundárias foram
// removidas por repetirem as outras seções (D-097). O footer vem logo depois do </main> (só na
// Home, D-052).
@Component({
  selector: 'app-home-page',
  imports: [
    HeroSection,
    PlayerStatusSection,
    SkillLoadoutSection,
    ProjectInventorySection,
    CampaignLogSection,
    FinalCheckpointSection,
    SiteFooter,
  ],
  template: `
    <main id="main-content" tabindex="-1">
      <app-hero-section />
      <app-player-status-section />
      <app-skill-loadout-section />
      <!-- Layout decidido no navegador (portátil × CRT, D-095): renderiza do zero, sem hidratar. -->
      <app-project-inventory-section ngSkipHydration />
      @if (hasCampaignLog) {
        <app-campaign-log-section />
      }
      <app-final-checkpoint-section />
    </main>
    <app-site-footer />
  `,
  // Alvo do link "pular para o conteúdo" (D-060): recebe foco, sem anel em volta da página toda.
  styles: 'main:focus { outline: none; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly hasCampaignLog = CAMPAIGN_LOG_CHAPTERS.length > 0;
}
