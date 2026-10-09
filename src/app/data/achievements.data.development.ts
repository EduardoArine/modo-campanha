import { Achievement } from '../models';

// ⚠️ ACHIEVEMENTS CONTENT = MOCK FOR VISUAL DEVELOPMENT (D-051).
// Textos genéricos e deliberadamente fictícios, com tamanhos próximos ao orçamento editorial,
// só para validar o Achievement Record Panel. Não são fatos sobre o Eduardo, não derivam do MOCK
// do Campaign Log e serão substituídos pelos achievements aprovados (04-C), quando este arquivo
// e o `fileReplacements` correspondente forem removidos. A produção usa `achievements.data.ts`.
export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    id: 'mock-achievement-a',
    title: { 'pt-BR': 'MARCO DE EXEMPLO A', en: 'SAMPLE MILESTONE A' },
    description: {
      'pt-BR':
        'Descrição fictícia de um marco concreto, escrita no tamanho do orçamento editorial.',
      en: 'Fictional description of a concrete milestone, written to the editorial length budget.',
    },
    evidence: { 'pt-BR': 'Fonte pública de exemplo', en: 'Sample public source' },
  },
  {
    id: 'mock-achievement-b',
    title: { 'pt-BR': 'MARCO DE EXEMPLO B', en: 'SAMPLE MILESTONE B' },
    description: {
      'pt-BR': 'Texto de exemplo mais curto, para testar alturas diferentes.',
      en: 'Shorter sample text, to test different heights.',
    },
    evidence: {
      'pt-BR': 'Registro de exemplo com nome público e ano',
      en: 'Sample record with a public name and year',
    },
  },
  {
    id: 'mock-achievement-c',
    title: { 'pt-BR': 'MARCO DE EXEMPLO C, MAIS LONGO', en: 'SAMPLE MILESTONE C, LONGER' },
    description: {
      'pt-BR':
        'Descrição fictícia no limite superior do orçamento, para validar a quebra de linhas no painel.',
      en: 'Fictional description at the upper end of the budget, to check line breaks in the panel.',
    },
    evidence: { 'pt-BR': 'Fonte de exemplo', en: 'Sample source' },
  },
  {
    id: 'mock-achievement-d',
    title: { 'pt-BR': 'MARCO DE EXEMPLO D', en: 'SAMPLE MILESTONE D' },
    description: {
      'pt-BR': 'Outro marco fictício, só para compor a primeira linha com quatro células.',
      en: 'Another fictional milestone, only to fill the first row with four cells.',
    },
    evidence: {
      'pt-BR': 'Evidência de exemplo com cerca de sessenta caracteres',
      en: 'Sample evidence with roughly sixty characters in it',
    },
  },
];
