import type { Localized } from '../core/i18n';

/**
 * Semântica do checkpoint (D-048). O rótulo temático (NEW GAME, CHECKPOINT, CAMPANHA ATUAL)
 * é apresentação e vem do dicionário de UI, nunca do dado.
 */
export type CampaignLogKind = 'origin' | 'checkpoint' | 'current';

/** Período em anos reais. `end` ausente = ano único; `'present'` = até hoje. */
export interface CampaignLogPeriod {
  start: number;
  end?: number | 'present';
}

/**
 * Checkpoint do Campaign Log: uma mudança da trajetória, não um item de currículo.
 * Sem tecnologias, tags, highlights, resultados, XP, níveis ou métricas (D-048).
 */
export interface CampaignLogEntry {
  id: string;
  kind: CampaignLogKind;
  period: CampaignLogPeriod;
  title: Localized;
  /** Organização/ambiente, só quando útil e aprovado. */
  context?: Localized;
  /** 1–2 frases: o que mudou. */
  summary: Localized;
}
