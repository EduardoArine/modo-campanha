import { ChangeDetectionStrategy, Component } from '@angular/core';

// Placeholder estrutural. Layout e conteúdo definitivos vêm após a FASE 1 (docs/09-roadmap.md).
@Component({
  selector: 'app-side-quests-section',
  template: `
    <section id="side-quests" aria-labelledby="side-quests-title">
      <h2 id="side-quests-title">Side Quests</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideQuestsSection {}
