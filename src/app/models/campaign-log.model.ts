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

/**
 * Quando aconteceu um checkpoint de capítulo: ano aproximado (exibido como "c. 1991") ou uma época
 * descrita em texto, sem inventar ano ("Época do SNES"). Nunca um ano exato não confirmado.
 */
export type CampaignLogWhen = { readonly approx: number } | { readonly era: Localized };

/** Checkpoint dentro de um capítulo (CHAPTER 00 — ORIGIN, docs/15 §13). Relato pessoal real. */
export interface CampaignLogChapterEntry {
  id: string;
  /** Rótulo de sistema do MC-01, igual nos dois idiomas (ex.: FIRST CONTACT). */
  code: string;
  when: CampaignLogWhen;
  title: Localized;
  /** 1 frase, extraída literalmente da história (visível sem expandir). */
  summary: Localized;
  /** História completa, em parágrafos (aberta por "Ler a história completa"). */
  story: Localized<readonly string[]>;
}

/**
 * Capítulo do Campaign Log: um arco que agrupa checkpoints antes ou fora da linha profissional.
 * Não substitui as entradas profissionais (`CampaignLogEntry`), só as antecede.
 */
export interface CampaignLogChapter {
  id: string;
  /** Número do capítulo como rótulo (ex.: '00'). */
  number: string;
  /** Nome de sistema, igual nos dois idiomas (ex.: ORIGIN). */
  name: string;
  /** Assinatura editorial do capítulo. */
  signature: Localized;
  entries: readonly CampaignLogChapterEntry[];
}
