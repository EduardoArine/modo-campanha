import { Localized } from '../core/i18n';

/** Grupos do Skill Loadout (D-040, D-042). */
export type SkillGroupId = 'build' | 'product' | 'ai' | 'game-dna';

/**
 * Skill publicada no Skill Loadout. Sem percentual, rating, level, estrelas,
 * rótulo de proficiência ou XP individual (D-040). O runtime só recebe skills aprovadas;
 * a autoria (candidate/approved) vive em docs/14-content-inventory.md (D-042).
 */
export interface Skill {
  id: string;
  name: Localized;
}

export interface SkillGroup {
  id: SkillGroupId;
  title: Localized;
  skills: readonly Skill[];
}
