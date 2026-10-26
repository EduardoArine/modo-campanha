import { inject, InjectionToken } from '@angular/core';

import { CAMPAIGN_LOG_CHAPTERS, SKILL_LOADOUT } from '../../data';
import { INVENTORY_PROJECTS } from '../../features/project-inventory/inventory.projects';
import { buildHorizonWorld, HorizonWorld } from '../../system-horizon/content/horizon-world';

/**
 * Mundo do SYSTEM HORIZON montado com os dados publicados (D-103): o Diário, o Arsenal e os mesmos
 * cartuchos do Inventário (`INVENTORY_PROJECTS`). Testes fornecem um mundo próprio por este token.
 */
export const HORIZON_WORLD = new InjectionToken<HorizonWorld>('HORIZON_WORLD', {
  providedIn: 'root',
  factory: () =>
    buildHorizonWorld({
      chapters: CAMPAIGN_LOG_CHAPTERS,
      skills: SKILL_LOADOUT,
      projects: inject(INVENTORY_PROJECTS),
    }),
});
