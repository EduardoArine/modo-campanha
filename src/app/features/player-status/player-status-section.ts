import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { PLAYER_PROFILE } from '../../data';
import { McSectionHeader, McStatus } from '../../shared/ui';

// PROVISÓRIO: só a linha de cabeçalho, como referência de ritmo Hero → Player Status
// (checkpoint 01-C). A seção real é o Home Slice 01-E (docs/12-home-slice-01.md).
@Component({
  selector: 'app-player-status-section',
  imports: [McSectionHeader, McStatus],
  template: `
    <section id="player-status" class="mc-page-grid section" aria-labelledby="player-status-title">
      <mc-section-header [heading]="ui().sections.playerStatus" headingId="player-status-title">
        <mc-status state="active">{{ locale.pick(profile.status.state.value) }}</mc-status>
      </mc-section-header>
    </section>
  `,
  styles: `
    @use 'mc' as *;

    .section {
      padding-block: var(--mc-space-section);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerStatusSection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly profile = PLAYER_PROFILE;
}
