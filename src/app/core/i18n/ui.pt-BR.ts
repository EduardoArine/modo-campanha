// Dicionário de UI em pt-BR. Define a forma (`UiDictionary`) que o inglês precisa seguir.
// Labels de sistema podem ficar em inglês por decisão de conteúdo (D-018), nunca por hardcode.
// Hero: textos provisórios até existir o modelo PlayerProfile (docs/07-content-model.md).
export const UI_PT_BR = {
  meta: {
    title: 'Modo Campanha — Eduardo Arine',
    description:
      'Portfólio profissional de Eduardo Arine: carreira em desenvolvimento, IA, produtos digitais e gamificação apresentada como uma campanha de videogame.',
  },
  language: {
    switcherLabel: 'Idioma',
    names: { 'pt-BR': 'Português', en: 'English' },
  },
  hero: {
    name: 'Eduardo Arine',
    role: 'Desenvolvedor de Produtos Digitais',
    motto: 'XP real, sem personagem.',
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
    subtitle: 'Cartuchos coletados durante a campanha.',
  },
  crt: {
    regionLabel: 'Visualizador de projetos',
    empty: 'INSERT CARTRIDGE',
  },
};

type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };

/** Forma obrigatória de qualquer dicionário de UI. */
export type UiDictionary = Widen<typeof UI_PT_BR>;
