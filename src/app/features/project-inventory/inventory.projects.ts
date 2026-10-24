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

/**
 * Como o Inventory abre (D-101): com o primeiro cartucho encaixado (padrão) ou com o slot vazio.
 * Os testes dos fluxos a partir do slot vazio fornecem `'empty'` por este token.
 */
export const INVENTORY_START = new InjectionToken<'inserted' | 'empty'>('INVENTORY_START', {
  providedIn: 'root',
  factory: () => 'inserted',
});
