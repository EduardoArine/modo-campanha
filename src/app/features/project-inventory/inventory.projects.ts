import { InjectionToken, isDevMode } from '@angular/core';

import { inventoryProjects } from '../../data';
import { Project } from '../../models';

/**
 * Projetos do Project Inventory (D-077). Em produção: só os aprovados com artwork (regra de
 * `inventoryProjects`). Testes e o laboratório dev-only fornecem fixtures isoladas por este token,
 * sem nunca colocar projetos fictícios nos dados.
 */
export const INVENTORY_PROJECTS = new InjectionToken<readonly Project[]>('INVENTORY_PROJECTS', {
  providedIn: 'root',
  factory: () => inventoryProjects(isDevMode()),
});
