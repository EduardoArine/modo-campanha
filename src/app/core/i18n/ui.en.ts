import { UiDictionary } from './ui.pt-BR';

// Dicionário de UI em inglês. Chave faltando ou sobrando quebra o build.
// Textos humanos: "Real XP. No persona." e "Digital Product Developer" aprovados (refináveis na FASE 7).
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
  },
};
