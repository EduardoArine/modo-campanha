import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Project } from '../../models';

// Visualizador de cases dentro da TV CRT. Usado pelo Project Inventory, não é uma seção própria.
// Moldura CRT, boot e efeitos ficam para as FASES 3 e 5 (docs/05-project-cartridge-system.md).
@Component({
  selector: 'app-crt-project-viewer',
  template: `
    <div role="region" aria-label="CRT Project Viewer">
      @if (project(); as p) {
        <h3>{{ p.title }}</h3>
      } @else {
        <p>INSERT CARTRIDGE</p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrtProjectViewer {
  readonly project = input<Project | null>(null);
}
