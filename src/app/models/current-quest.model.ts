import type { Localized } from '../core/i18n';

/**
 * Current Main Quest (Home Slice 06): a campanha atual, sem informação confidencial ou interna.
 * Fora de propósito: métricas, resultados, clientes, parceiros, arquitetura, integrações,
 * datas não aprovadas, XP, level, progresso e percentuais.
 */
export interface CurrentQuest {
  id: string;
  /** Nome público da campanha. */
  title: Localized;
  /** Papel público aprovado. */
  role?: Localized;
  /** 1–2 frases públicas (~140–220 caracteres, regra editorial). */
  summary: Localized;
  /** 2–4 frentes de atuação, sem métricas. */
  focus: Localized<readonly string[]>;
}
