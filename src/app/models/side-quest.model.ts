import type { Localized } from '../core/i18n';

/** Tipo de side quest: categoria do trabalho, nunca dificuldade, raridade ou status. */
export type SideQuestKind = 'game' | 'art' | 'ai' | 'interface' | 'study';

/**
 * Side Quest (Home Slice 07): projeto pessoal, experimento ou estudo fora da campanha principal.
 * Projetos completos ficam no Project Inventory (MC-CART); side quests são mais leves.
 * Fora de propósito: progresso, XP, level, raridade, recompensas, métricas e links não aprovados.
 */
export interface SideQuest {
  id: string;
  kind: SideQuestKind;
  title: Localized;
  /** 1 frase, ~80–120 caracteres (regra editorial). */
  summary: Localized;
}
