import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { McAction, McIcon } from '../../shared/ui';
import { HorizonWorld } from '../../system-horizon/content/horizon-world';
import { actLabel } from './horizon-labels';
import { HorizonEntry } from './horizon-entry';

/**
 * Versão em texto do SYSTEM HORIZON (D-103, docs/23 §10): a jornada inteira, ato por ato, montada
 * do mesmo mundo do jogo (nunca diverge). É o caminho principal para leitor de tela.
 */
@Component({
  selector: 'app-horizon-text',
  imports: [HorizonEntry, McAction, McIcon],
  template: `
    @let game = ui().systemHorizon.game;
    <h2 class="title" id="horizon-text-title" tabindex="-1">{{ game.text.title }}</h2>
    <p class="lead">{{ game.text.lead }}</p>
    @for (act of acts(); track act.label) {
      <section class="act" [attr.aria-labelledby]="'horizon-act-' + $index">
        <h3 class="act-title" [id]="'horizon-act-' + $index">{{ act.label }}</h3>
        <ol class="stops">
          @for (stop of act.stops; track stop.id) {
            <li>
              <app-horizon-entry [stop]="stop" [level]="3" [compact]="true" />
            </li>
          }
        </ol>
      </section>
    }
    <button mcAction="primary" type="button" (click)="back.emit()">
      <mc-icon name="chevron-left" /> {{ backLabel() }}
    </button>
  `,
  styleUrl: './horizon-text.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizonText {
  readonly world = input.required<HorizonWorld>();
  readonly backLabel = input.required<string>();
  readonly back = output<void>();

  private readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;

  protected readonly acts = computed(() => {
    this.ui();
    const world = this.world();
    return world.acts.map((act, i) => ({
      label: actLabel(act, this.locale),
      stops: world.stops.filter((s) => s.act === i),
    }));
  });
}
