import { ChangeDetectionStrategy, Component } from '@angular/core';

// Placeholder estrutural. Layout e conteúdo definitivos vêm após a FASE 1 (docs/09-roadmap.md).
@Component({
  selector: 'app-achievements-section',
  template: `
    <section id="achievements" aria-labelledby="achievements-title">
      <h2 id="achievements-title">Achievements</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementsSection {}
