import type { Localized } from '../core/i18n';

/**
 * Achievement (Home Slice 04, D-051): uma evidência concreta da trajetória, não um badge.
 * `evidence` é obrigatório: é o contrato que impede um achievement sem base factual.
 * O código ACH-0N é derivado da ordem de apresentação (decorativo), nunca do dado.
 * Fora de propósito: kind, icon, secret (volta na FASE 6), score, XP, rarity, level,
 * unlocked, progress.
 */
export interface Achievement {
  id: string;
  /** Manchete curta. */
  title: Localized;
  /** 1 frase, ~80–110 caracteres (regra editorial). */
  description: Localized;
  /** Fonte factual curta, até ~60 caracteres. */
  evidence: Localized;
  /** Só se o marco tiver data real. */
  year?: number;
}
