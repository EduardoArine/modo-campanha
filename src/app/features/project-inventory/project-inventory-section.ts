import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CrtProjectViewer } from '../crt-project-viewer/crt-project-viewer';

// Placeholder estrutural. Cartuchos, console e interação vêm nas FASES 1, 3 e 5 (docs/09-roadmap.md).
@Component({
  selector: 'app-project-inventory-section',
  imports: [CrtProjectViewer],
  template: `
    <section id="project-inventory" aria-labelledby="project-inventory-title">
      <h2 id="project-inventory-title">Project Inventory</h2>
      <p>Cartuchos coletados durante a campanha.</p>
      <app-crt-project-viewer />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInventorySection {}
