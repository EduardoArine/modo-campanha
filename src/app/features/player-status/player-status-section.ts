import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';

// Placeholder estrutural. Layout e conteúdo definitivos vêm na FASE 3 (docs/09-roadmap.md).
@Component({
  selector: 'app-player-status-section',
  template: `
    <section id="player-status" aria-labelledby="player-status-title">
      <h2 id="player-status-title">{{ ui().sections.playerStatus }}</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerStatusSection {
  protected readonly ui = inject(LocaleService).ui;
}
