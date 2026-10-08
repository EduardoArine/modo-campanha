import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';

// Placeholder estrutural. Layout e conteúdo definitivos vêm na FASE 3 (docs/09-roadmap.md).
@Component({
  selector: 'app-final-checkpoint-section',
  template: `
    <section id="final-checkpoint" aria-labelledby="final-checkpoint-title">
      <h2 id="final-checkpoint-title">{{ ui().sections.finalCheckpoint }}</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalCheckpointSection {
  protected readonly ui = inject(LocaleService).ui;
}
