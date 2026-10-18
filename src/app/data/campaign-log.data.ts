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
