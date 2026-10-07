import { ChangeDetectionStrategy, Component } from '@angular/core';

// Placeholder estrutural. Layout e conteúdo definitivos vêm após a FASE 1 (docs/09-roadmap.md).
@Component({
  selector: 'app-final-checkpoint-section',
  template: `
    <section id="final-checkpoint" aria-labelledby="final-checkpoint-title">
      <h2 id="final-checkpoint-title">Final Checkpoint</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalCheckpointSection {}
