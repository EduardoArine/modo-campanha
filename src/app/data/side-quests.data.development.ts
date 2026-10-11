import { SideQuest } from '../models';

// ⚠️ SIDE QUESTS CONTENT = MOCK FOR VISUAL DEVELOPMENT (docs/19-home-slice-07.md).
// Textos genéricos e deliberadamente fictícios, com tamanhos próximos ao orçamento editorial, só
// para validar a seção. Não são projetos do Eduardo e serão substituídos pelo conteúdo aprovado,
// quando este arquivo e o `fileReplacements` correspondente forem removidos.
export const SIDE_QUESTS: readonly SideQuest[] = [
  {
    id: 'mock-side-quest-a',
    kind: 'game',
    title: { 'pt-BR': 'Experimento de exemplo A', en: 'Sample experiment A' },
    summary: {
      'pt-BR': 'Descrição fictícia de um protótipo pessoal, no tamanho do orçamento editorial.',
      en: 'Fictional description of a personal prototype, written to the editorial budget.',
    },
  },
  {
    id: 'mock-side-quest-b',
    kind: 'ai',
    title: { 'pt-BR': 'Experimento de exemplo B', en: 'Sample experiment B' },
    summary: {
      'pt-BR': 'Texto de exemplo mais curto, para testar alturas diferentes.',
      en: 'Shorter sample text, to test different heights.',
    },
  },
  {
    id: 'mock-side-quest-c',
    kind: 'study',
    title: {
      'pt-BR': 'Estudo de exemplo C, com título mais longo',
      en: 'Sample study C, with a longer title',
    },
    summary: {
      'pt-BR':
        'Descrição fictícia no limite superior do orçamento, para validar a quebra de linhas da seção.',
      en: 'Fictional description at the upper end of the budget, to check line breaks in the section.',
    },
  },
  {
    id: 'mock-side-quest-d',
    kind: 'art',
    title: { 'pt-BR': 'Exploração de exemplo D', en: 'Sample exploration D' },
    summary: {
      'pt-BR': 'Outra descrição fictícia, só para compor uma segunda linha na grade.',
      en: 'Another fictional description, only to fill a second row in the grid.',
    },
  },
];
