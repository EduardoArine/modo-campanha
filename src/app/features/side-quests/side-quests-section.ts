import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';

// Placeholder estrutural. Layout e conteúdo definitivos vêm na FASE 3 (docs/09-roadmap.md).
@Component({
  selector: 'app-side-quests-section',
  template: `
    <section id="side-quests" aria-labelledby="side-quests-title">
      <h2 id="side-quests-title">{{ ui().sections.sideQuests }}</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideQuestsSection {
  protected readonly ui = inject(LocaleService).ui;
}
