export type SkillGroupId = 'engineering' | 'product' | 'ai' | 'game-design';

/**
 * Estado da skill na árvore. Nunca usar percentuais de proficiência (docs/10-decisions.md).
 * Uso dos estados ainda a definir na FASE 3.
 */
export type SkillState = 'unlocked' | 'evolving' | 'core' | 'exploring';

export interface Skill {
  id: string;
  name: string;
  state?: SkillState;
}

export interface SkillGroup {
  id: SkillGroupId;
  title: string;
  skills: Skill[];
}
