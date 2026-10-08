import { UiDictionary } from './ui.pt-BR';

// Dicionário de UI em inglês. Chave faltando ou sobrando quebra o build.
// Traduções aprovadas: "Real XP. No persona.", "Digital Product Developer", "Explore the campaign",
// "Résumé" (ação mais descritiva futura: "View résumé"). Refináveis na FASE 7.
export const UI_EN: UiDictionary = {
  meta: {
    title: 'Modo Campanha — Eduardo Arine',
    description:
      "Eduardo Arine's professional portfolio: a career in development, AI, digital products and gamification, presented as a video game campaign.",
  },
  language: {
    switcherLabel: 'Language',
    names: { 'pt-BR': 'Português', en: 'English' },
  },
  hero: {
    name: 'Eduardo Arine',
    role: 'Digital Product Developer',
    motto: 'Real XP. No persona.',
  },
  cta: {
    explore: 'Explore the campaign',
    resume: 'Résumé',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  status: {
    active: 'ACTIVE',
    inProgress: 'IN PROGRESS',
  },
  profile: {
    xp: '10+ years in technology',
  },
  playerCard: {
    player: 'PLAYER 01',
    photoPlaceholder: 'PHOTO OF EDUARDO',
    classLabel: 'CLASS',
    xpLabel: 'XP',
    statusLabel: 'STATUS',
  },
  cart: {
    system: 'MC-CART',
    artworkPlaceholder: 'PROJECT ARTWORK',
  },
  sections: {
    playerStatus: 'PLAYER STATUS',
    skillTree: 'SKILL TREE',
    projectInventory: 'PROJECT INVENTORY',
    campaignLog: 'CAMPAIGN LOG',
    achievements: 'ACHIEVEMENTS',
    currentQuest: 'CURRENT MAIN QUEST',
    sideQuests: 'SIDE QUESTS',
    finalCheckpoint: 'CAMPAIGN CONTINUES...',
  },
  inventory: {
    subtitle: 'Cartridges collected along the campaign.',
  },
  crt: {
    regionLabel: 'Project viewer',
    empty: 'INSERT CARTRIDGE',
    identification: 'MC-01',
  },
};
