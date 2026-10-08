import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';

// Placeholder estrutural. Layout e conteúdo definitivos vêm na FASE 3 (docs/09-roadmap.md).
@Component({
  selector: 'app-campaign-log-section',
  template: `
    <section id="campaign-log" aria-labelledby="campaign-log-title">
      <h2 id="campaign-log-title">{{ ui().sections.campaignLog }}</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignLogSection {
  protected readonly ui = inject(LocaleService).ui;
}
