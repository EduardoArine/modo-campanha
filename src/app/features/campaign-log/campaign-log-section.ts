import { ChangeDetectionStrategy, Component } from '@angular/core';

// Placeholder estrutural. Layout e conteúdo definitivos vêm após a FASE 1 (docs/09-roadmap.md).
@Component({
  selector: 'app-campaign-log-section',
  template: `
    <section id="campaign-log" aria-labelledby="campaign-log-title">
      <h2 id="campaign-log-title">Campaign Log</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignLogSection {}
