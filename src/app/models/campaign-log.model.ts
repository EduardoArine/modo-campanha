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
 * Quando aconteceu um checkpoint de capítulo: ano confirmado ("2016"), ano aproximado ("c. 1991") ou
 * uma época descrita em texto, sem inventar ano ("Época do SNES"). Nunca um ano não confirmado.
 */
export type CampaignLogWhen =
  | { readonly year: number }
  | { readonly span: { readonly start: number; readonly end: number } }
  | { readonly approx: number }
  | { readonly era: Localized };

/** Fotografia pessoal real, como evidência documental de um checkpoint (não decoração). */
export interface CampaignLogPhoto {
  /** Maior derivado WebP; `srcset` lista todos. */
  src: string;
  srcset: string;
  width: number;
  height: number;
  /** Descrição objetiva do que a foto mostra. */
  alt: Localized;
}

/**
 * Tipo da referência externa (o rótulo vem do dicionário): lançamento institucional, publicação
 * científica, imprensa, registro bibliográfico ou documento acadêmico.
 */
export type CampaignLogLinkKind = 'launch' | 'paper' | 'press' | 'record' | 'academic';

/** Referência externa verificável de um checkpoint (abre em nova aba). */
export interface CampaignLogLink {
  kind: CampaignLogLinkKind;
  label: Localized;
  url: string;
  /** Contexto factual curto (ex.: autoria de um artigo que não é do Eduardo). */
  note?: Localized;
}

/** Checkpoint dentro de um capítulo (docs/15 §13–§14). Relato pessoal real. */
export interface CampaignLogChapterEntry {
  id: string;
  /** Codinome de sistema do MC-01, igual nos dois idiomas (ex.: FIRST CONTACT); opcional. */
  code?: string;
  when: CampaignLogWhen;
  title: Localized;
  /** 1 frase, extraída literalmente da história (visível sem expandir). */
  summary: Localized;
  /** História completa, em parágrafos (aberta por "Ler a história completa"). */
  story: Localized<readonly string[]>;
  /** Fotos reais citadas na história, exibidas com ela. */
  photos?: readonly CampaignLogPhoto[];
  /** Documentos públicos que comprovam o checkpoint (ex.: o TCC no repositório da FATEC). */
  links?: readonly CampaignLogLink[];
}

/**
 * Capítulo do Campaign Log: um arco que agrupa checkpoints antes ou fora da linha profissional.
 * Não substitui as entradas profissionais (`CampaignLogEntry`), só as antecede.
 */
export interface CampaignLogChapter {
  id: string;
  /** Número do capítulo como rótulo (ex.: '00'). */
  number: string;
  /** Nome do capítulo (ex.: ORIGIN). Opcional: sem nome aprovado, o cabeçalho mostra só o número. */
  name?: Localized;
  /** Período real do capítulo, quando confirmado (ex.: 2013–2017). */
  period?: CampaignLogPeriod;
  /** Contexto do capítulo (curso, instituição), quando aprovado. */
  context?: Localized;
  /** Assinatura editorial do capítulo, quando aprovada. */
  signature?: Localized;
  entries: readonly CampaignLogChapterEntry[];
  /** Frase de fechamento após CHECKPOINT COMPLETE (o ano vem de `period.end`). */
  closing?: Localized;
}
