import type { Localized } from '../core/i18n';
import { CampaignLogChapter } from '../models';
import { CHAPTER_02, FATEC_CHAPTER, ORIGIN_CHAPTER } from './campaign-log.chapters.data';

// Campaign Log publicado (D-074): os três capítulos reais, aprovados pelo Eduardo, são o conteúdo
// canônico em todos os ambientes (desenvolvimento, testes, produção e GitHub Pages). Não há
// arquivo de desenvolvimento nem `fileReplacements` para esta seção: a mesma lista é renderizada
// sempre. A antiga linha profissional MOCK (D-049) foi aposentada; nada fictício entra aqui.
export const CAMPAIGN_LOG_CHAPTERS: readonly CampaignLogChapter[] = [
  ORIGIN_CHAPTER,
  FATEC_CHAPTER,
  CHAPTER_02,
];

/**
 * Abertura do Diário de Campanha (D-091): texto da prancha aprovada (pt); tradução en pendente de
 * revisão do Eduardo.
 */
export const CAMPAIGN_LOG_INTRO: Localized = {
  'pt-BR':
    'Uma jornada real, dividida em capítulos, com seus próprios mapas, marcos e histórias. Cada capítulo revela um mini mundo com contexto, conquistas e aprendizados que fazem parte da minha trajetória.',
  en: 'A real journey, divided into chapters, each with its own map, checkpoints, and stories. Every chapter reveals a small world of context, achievements, and lessons that are part of my path.',
};
