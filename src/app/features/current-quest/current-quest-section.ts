import { ChangeDetectionStrategy, Component } from '@angular/core';

// Placeholder estrutural. Layout e conteúdo definitivos vêm após a FASE 1 (docs/09-roadmap.md).
@Component({
  selector: 'app-current-quest-section',
  template: `
    <section id="current-quest" aria-labelledby="current-quest-title">
      <h2 id="current-quest-title">Current Main Quest</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentQuestSection {}
