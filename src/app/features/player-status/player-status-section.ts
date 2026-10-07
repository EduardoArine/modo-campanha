import { ChangeDetectionStrategy, Component } from '@angular/core';

// Placeholder estrutural. Layout e conteúdo definitivos vêm após a FASE 1 (docs/09-roadmap.md).
@Component({
  selector: 'app-player-status-section',
  template: `
    <section id="player-status" aria-labelledby="player-status-title">
      <h2 id="player-status-title">Player Status</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerStatusSection {}
