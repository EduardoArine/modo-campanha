import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Estados realmente usados pelo produto:
 * - `active`: Player Status (ACTIVE). Indicador cheio.
 * - `in-progress`: Current Main Quest (IN PROGRESS). Indicador vazado.
 * Forma + texto sempre presentes: status nunca é comunicado só por cor.
 */
export type McStatusState = 'active' | 'in-progress';

@Component({
  selector: 'mc-status',
  template: `
    <span class="indicator" aria-hidden="true"></span>
    <span class="label"><ng-content /></span>
  `,
  styles: `
    @use 'mc' as *;

    :host {
      display: inline-flex;
      align-items: center;
      gap: space(2);
      @include type(label);
    }
    .indicator {
      width: 8px;
      height: 8px;
      flex: none;
      border-radius: var(--mc-radius-round);
    }
    :host(.mc-status--active) {
      color: var(--mc-status-online);
    }
    :host(.mc-status--active) .indicator {
      background: var(--mc-status-online);
    }
    :host(.mc-status--in-progress) {
      color: var(--mc-accent);
    }
    :host(.mc-status--in-progress) .indicator {
      border: var(--mc-border-width-strong) solid var(--mc-accent);
    }
  `,
  host: { '[class]': '"mc-status mc-status--" + state()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McStatus {
  readonly state = input.required<McStatusState>();
}
