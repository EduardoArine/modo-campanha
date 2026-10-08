import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';

// Placeholder estrutural. Layout e conteúdo definitivos vêm na FASE 3 (docs/09-roadmap.md).
@Component({
  selector: 'app-skill-tree-section',
  template: `
    <section id="skill-tree" aria-labelledby="skill-tree-title">
      <h2 id="skill-tree-title">{{ ui().sections.skillTree }}</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillTreeSection {
  protected readonly ui = inject(LocaleService).ui;
}
