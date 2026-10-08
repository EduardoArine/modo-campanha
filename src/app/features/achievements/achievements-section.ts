import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';

// Placeholder estrutural. Layout e conteúdo definitivos vêm na FASE 3 (docs/09-roadmap.md).
@Component({
  selector: 'app-achievements-section',
  template: `
    <section id="achievements" aria-labelledby="achievements-title">
      <h2 id="achievements-title">{{ ui().sections.achievements }}</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementsSection {
  protected readonly ui = inject(LocaleService).ui;
}
