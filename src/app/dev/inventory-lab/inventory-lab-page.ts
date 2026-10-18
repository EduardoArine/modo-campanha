import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProjectInventorySection } from '../../features/project-inventory/project-inventory-section';
import { INVENTORY_PROJECTS } from '../../features/project-inventory/inventory.projects';
import { labProjects } from './lab-fixtures';

/**
 * ⚠️ LABORATÓRIO DEV-ONLY do Project Inventory (D-077). Renderiza o componente REAL da Home com
 * fixtures isoladas (`?set=single|multi|broken`), para testar a escolha e a troca de cartuchos e o
 * fallback sem colocar projetos fictícios nos dados. Só no build de desenvolvimento.
 */
@Component({
  selector: 'app-inventory-lab-page',
  imports: [ProjectInventorySection, RouterLink],
  template: `
    <nav class="lab-bar" aria-label="Inventory lab">
      <span>LAB · fixtures</span>
      <a routerLink="." [queryParams]="{ set: 'single' }">single</a>
      <a routerLink="." [queryParams]="{ set: 'multi' }">multi</a>
      <a routerLink="." [queryParams]="{ set: 'broken' }">broken</a>
    </nav>
    <app-project-inventory-section />
  `,
  styles: `
    @use 'mc' as *;

    .lab-bar {
      display: flex;
      gap: space(3);
      padding: space(2) space(4);
      @include type(caption);
      color: var(--mc-text-muted);
      background: var(--mc-elevated);
    }
  `,
  providers: [
    {
      provide: INVENTORY_PROJECTS,
      useFactory: () => labProjects(inject(ActivatedRoute).snapshot.queryParamMap.get('set')),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryLabPage {}
