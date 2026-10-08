import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { MC_ICONS, McIconDefinition, McIconName, McIconSize } from './icons';

/**
 * Ícone do MC Design System.
 * - Sem `label`: decorativo (`aria-hidden="true"`), use quando há texto visível ao lado.
 * - Com `label` (texto traduzido): `role="img"` + `aria-label`, para ícone que informa sozinho.
 */
@Component({
  selector: 'mc-icon',
  template: `
    <svg
      [attr.viewBox]="definition().viewBox"
      [attr.width]="size()"
      [attr.height]="size()"
      focusable="false"
      aria-hidden="true"
    >
      @for (d of definition().paths; track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex: none;
      line-height: 0;
    }
    svg {
      display: block;
    }
    :host(.mc-icon--stroke) path {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: square;
      stroke-linejoin: miter;
    }
    :host(.mc-icon--fill) path {
      fill: currentColor;
    }
  `,
  host: {
    '[class]': '"mc-icon mc-icon--" + definition().style',
    '[attr.role]': 'label() ? "img" : null',
    '[attr.aria-label]': 'label() || null',
    '[attr.aria-hidden]': 'label() ? null : "true"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McIcon {
  readonly name = input.required<McIconName>();
  readonly size = input<McIconSize>(16);
  /** Nome acessível (traduzido). Só quando o ícone transmite informação sem texto adjacente. */
  readonly label = input<string>();

  protected readonly definition = computed<McIconDefinition>(() => MC_ICONS[this.name()]);
}
