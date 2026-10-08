import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';

// Placeholder estrutural. Layout e conteúdo definitivos vêm na FASE 3 (docs/09-roadmap.md).
@Component({
  selector: 'app-current-quest-section',
  template: `
    <section id="current-quest" aria-labelledby="current-quest-title">
      <h2 id="current-quest-title">{{ ui().sections.currentQuest }}</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentQuestSection {
  protected readonly ui = inject(LocaleService).ui;
}
