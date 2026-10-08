import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { LocaleService } from '../../../core/i18n';
import { McCrtFrame } from '../crt-frame/crt-frame';

export type McCrtState = 'empty' | 'content';

/**
 * CRT Project Viewer (D-033, D-037): função especializada sobre a base `mc-crt-frame`.
 * Adiciona a semântica (região rotulada), a identificação MC-01 e o estado vazio
 * "INSERT CARTRIDGE". "CRT na moldura; clareza no conteúdo." Sem animações.
 */
@Component({
  selector: 'mc-crt-project-viewer',
  imports: [McCrtFrame],
  template: `
    <mc-crt-frame [label]="ui().crt.identification">
      @if (state() === 'empty') {
        <p class="empty">{{ ui().crt.empty }}</p>
      } @else {
        <ng-content />
      }
    </mc-crt-frame>
  `,
  styles: `
    @use 'mc' as *;

    :host {
      display: block;
    }
    .empty {
      place-self: center;
      margin: 0;
      @include type(system);
      color: var(--mc-text-muted);
    }
  `,
  host: {
    role: 'region',
    '[attr.aria-label]': 'ui().crt.regionLabel',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McCrtProjectViewer {
  readonly state = input<McCrtState>('empty');

  protected readonly ui = inject(LocaleService).ui;
}
