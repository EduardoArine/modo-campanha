import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { LocaleService } from '../../../core/i18n';

export type McCrtState = 'empty' | 'content';

/**
 * CRT Project Viewer: estrutura física (shell → bezel → screen → viewport → identificação
 * MC-01). "CRT na moldura; clareza no conteúdo" (D-033): efeitos ficam ATRÁS do conteúdo,
 * são decorativos (aria-hidden) e somem em larguras pequenas. Sem animações neste sprint.
 */
@Component({
  selector: 'mc-crt',
  template: `
    <div class="body">
      <div class="bezel">
        <div class="screen">
          <span class="fx" aria-hidden="true"></span>
          <div class="viewport">
            @if (state() === 'empty') {
              <p class="empty">{{ ui().crt.empty }}</p>
            } @else {
              <ng-content />
            }
          </div>
        </div>
      </div>
      <div class="base">
        <span class="id">{{ ui().crt.identification }}</span>
        <span class="led" aria-hidden="true"></span>
      </div>
    </div>
  `,
  styleUrl: './crt.scss',
  host: {
    role: 'region',
    '[attr.aria-label]': 'ui().crt.regionLabel',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McCrt {
  readonly state = input<McCrtState>('empty');

  protected readonly ui = inject(LocaleService).ui;
}
