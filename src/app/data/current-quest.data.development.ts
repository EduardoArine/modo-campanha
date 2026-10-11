import { CurrentQuest } from '../models';

// ⚠️ CURRENT MAIN QUEST CONTENT = MOCK FOR VISUAL DEVELOPMENT (docs/18-home-slice-06.md).
// Texto genérico e deliberadamente fictício, com tamanhos próximos ao orçamento editorial, só para
// validar a seção. Não descreve a Comunidade On nem qualquer fato sobre o Eduardo; será substituído
// pelo texto público aprovado, quando este arquivo e o `fileReplacements` forem removidos.
export const CURRENT_QUEST: CurrentQuest | null = {
  id: 'mock-current-quest',
  title: { 'pt-BR': 'Campanha de exemplo', en: 'Sample campaign' },
  role: { 'pt-BR': 'Papel de exemplo', en: 'Sample role' },
  summary: {
    'pt-BR':
      'Resumo fictício de uma campanha atual, escrito no tamanho do orçamento editorial para validar a composição, a quebra de linhas e o ritmo da seção.',
    en: 'Fictional summary of a current campaign, written to the editorial length budget to check the composition, line breaks, and rhythm of the section.',
  },
  focus: {
    'pt-BR': ['Frente de exemplo A', 'Frente de exemplo B', 'Frente de exemplo C, mais longa'],
    en: ['Sample area A', 'Sample area B', 'Sample area C, a longer one'],
  },
};
