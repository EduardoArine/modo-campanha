import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { CrtProjectViewer } from '../crt-project-viewer/crt-project-viewer';

// Placeholder estrutural. Cartuchos, console e interação vêm nas FASES 3 e 5 (docs/09-roadmap.md).
@Component({
  selector: 'app-project-inventory-section',
  imports: [CrtProjectViewer],
  template: `
    <section id="project-inventory" aria-labelledby="project-inventory-title">
      <h2 id="project-inventory-title">{{ ui().sections.projectInventory }}</h2>
      <p>{{ ui().inventory.subtitle }}</p>
      <app-crt-project-viewer />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInventorySection {
  protected readonly ui = inject(LocaleService).ui;
}
