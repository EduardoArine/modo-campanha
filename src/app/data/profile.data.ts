import { PlayerProfile } from '../models';

// Conteúdo aprovado por Eduardo (Home Slice 01, 2026-10-08). Não inventar nem completar.
export const PLAYER_PROFILE: PlayerProfile = {
  name: 'Eduardo Arine',
  role: {
    'pt-BR': 'Desenvolvedor de Produtos Digitais',
    en: 'Digital Product Developer',
  },
  focusLine: {
    'pt-BR': 'IA • Produto • Desenvolvimento • Gamificação',
    en: 'AI • Product • Development • Gamification',
  },
  summary: {
    'pt-BR':
      'Construo produtos digitais conectando desenvolvimento, produto, IA e experiência — com mais de 10 anos em tecnologia e formação em Jogos Digitais.',
    en: 'I build digital products connecting development, product, AI, and experience — backed by 10+ years in tech and a degree in Digital Games Technology.',
  },
  motto: {
    'pt-BR': 'XP real, sem personagem.',
    en: 'Real XP. No persona.',
  },
  // Final Checkpoint (Home Slice 05, D-052). Aprovado por Eduardo em 2026-10-11.
  closing: {
    'pt-BR':
      'Se quiser construir algo comigo ou trocar ideias sobre produto, IA, desenvolvimento ou games, estes são os melhores lugares para me encontrar.',
    en: "If you'd like to build something together or exchange ideas about product, AI, development, or games, these are the best places to find me.",
  },
  status: {
    origin: {
      label: { 'pt-BR': 'ORIGEM', en: 'ORIGIN' },
      value: { 'pt-BR': 'Tecnologia em Jogos Digitais', en: 'Digital Games Technology' },
    },
    xp: {
      label: { 'pt-BR': 'XP', en: 'XP' },
      value: { 'pt-BR': '10+ anos em tecnologia', en: '10+ years in tech' },
    },
    currentCampaign: {
      label: { 'pt-BR': 'CAMPANHA ATUAL', en: 'CURRENT CAMPAIGN' },
      value: { 'pt-BR': 'Comunidade On', en: 'Comunidade On' },
    },
    focus: {
      label: { 'pt-BR': 'FOCO', en: 'FOCUS' },
      value: {
        'pt-BR': 'IA aplicada ao desenvolvimento',
        en: 'AI applied to software development',
      },
    },
    state: {
      label: { 'pt-BR': 'STATUS', en: 'STATUS' },
      value: { 'pt-BR': 'ATIVO', en: 'ACTIVE' },
    },
  },
};
