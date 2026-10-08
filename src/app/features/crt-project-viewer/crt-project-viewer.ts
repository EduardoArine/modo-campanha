import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { Project } from '../../models';

// Visualizador de cases dentro da TV CRT. Usado pelo Project Inventory, não é uma seção própria.
// Moldura CRT, boot e efeitos ficam para as FASES 3 e 5 (docs/05-project-cartridge-system.md).
@Component({
  selector: 'app-crt-project-viewer',
  template: `
    <div role="region" [attr.aria-label]="ui().crt.regionLabel">
      @if (project(); as p) {
        <h3>{{ p.title }}</h3>
      } @else {
        <p>{{ ui().crt.empty }}</p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrtProjectViewer {
  readonly project = input<Project | null>(null);
  protected readonly ui = inject(LocaleService).ui;
}
