import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Tom do chip: categorização visual, não importância, alerta ou status. */
export type McChipTone = 'warm' | 'cool';

/** Chip informativo (não clicável). Filtros interativos, se existirem, serão outro componente. */
@Component({
  selector: 'mc-chip',
  template: '<ng-content />',
  styles: `
    @use 'mc' as *;

    :host {
      display: inline-flex;
      align-items: center;
      padding: space(1) space(3);
      border: var(--mc-border-width-default) solid;
      border-radius: var(--mc-radius-sm);
      @include type(caption);
      color: var(--mc-text-secondary);
      cursor: default;
    }
    :host(.mc-chip--warm) {
      border-color: var(--mc-border-accent);
    }
    :host(.mc-chip--cool) {
      border-color: var(--mc-border-cool);
      background: var(--mc-cool-surface);
      color: var(--mc-text-on-cool);
    }
  `,
  host: { '[class]': '"mc-chip mc-chip--" + tone()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McChip {
  readonly tone = input<McChipTone>('warm');
}
