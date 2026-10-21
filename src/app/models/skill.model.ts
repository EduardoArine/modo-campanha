import { Localized } from '../core/i18n';
import type { McIconName } from '../shared/ui/icon/icons';

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
  /** Pictograma autoral (pixel, D-092). Nunca logo de terceiros. */
  icon: McIconName;
}

export interface SkillGroup {
  id: SkillGroupId;
  /** Código de sistema decorativo (ex.: `CON` / `DEV`). Sem numeração: não sugere ordem nem nível. */
  code: Localized;
  title: Localized;
  /** Frase curta da especialidade no painel do Loadout (D-092). */
  description: Localized;
  icon: McIconName;
  skills: readonly Skill[];
}
