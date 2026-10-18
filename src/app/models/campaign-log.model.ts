import type { Localized } from '../core/i18n';

/** Período em anos reais de um capítulo. `end` ausente = ano único; `'present'` = até hoje. */
export interface CampaignLogPeriod {
  start: number;
  end?: number | 'present';
}

/**
 * Quando aconteceu um checkpoint de capítulo: ano confirmado ("2016"), intervalo confirmado, "desde"
 * (em aberto), ano aproximado ("c. 1991") ou aproximado entre dois anos informados ("c. 2020/2021"),
 * ou uma época descrita em texto, sem inventar ano ("Época do SNES"). Nunca um ano não confirmado.
 */
export type CampaignLogWhen =
  | { readonly year: number }
  | { readonly span: { readonly start: number; readonly end: number } }
  | { readonly since: number }
  | { readonly approx: number | readonly [number, number] }
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
  /**
   * Frase visível sem expandir. Regra: a primeira frase da história, literal. Exceção só com resumo
   * próprio aprovado pelo Eduardo (Comunidade ON, D-073), sem repetir a história.
   */
  summary: Localized;
  /** História completa, em parágrafos (aberta por "Ler a história completa"). */
  story: Localized<readonly string[]>;
  /** Fotos reais citadas na história, exibidas com ela. */
  photos?: readonly CampaignLogPhoto[];
  /** Documentos públicos que comprovam o checkpoint (ex.: o TCC no repositório da FATEC). */
  links?: readonly CampaignLogLink[];
}

/**
 * Capítulo do Campaign Log (D-070–D-074): um arco da trajetória real que agrupa checkpoints. Os
 * capítulos são todo o conteúdo do Campaign Log; não há linha profissional à parte.
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
  /** Capítulo ainda em andamento: o fechamento vira CURRENT QUEST — EM ANDAMENTO. */
  ongoing?: boolean;
}
