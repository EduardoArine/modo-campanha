import { Achievement } from '../models';

/** Mínimo para a seção existir: com 0 ou 1 achievement ela não é renderizada (D-051). */
export const MIN_ACHIEVEMENTS = 2;

export function shouldRenderAchievements(achievements: readonly Achievement[]): boolean {
  return achievements.length >= MIN_ACHIEVEMENTS;
}
