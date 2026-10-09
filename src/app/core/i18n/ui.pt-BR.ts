// Dicionário de UI em pt-BR. Define a forma (`UiDictionary`) que o inglês precisa seguir.
// Labels de sistema podem ficar em inglês por decisão de conteúdo (D-018), nunca por hardcode.
// Textos humanos (cargo, resumo, motto, dados do Player Status) vivem em data/profile.data.ts.
export const UI_PT_BR = {
  meta: {
    title: 'Modo Campanha — Eduardo Arine',
    description:
      'Portfólio profissional de Eduardo Arine: carreira em desenvolvimento, IA, produtos digitais e gamificação apresentada como uma campanha de videogame.',
  },
  language: {
    switcherLabel: 'Idioma',
    names: { 'pt-BR': 'Português', en: 'English' },
    short: { 'pt-BR': 'PT', en: 'EN' },
  },
  // Marca provisória até o monograma MC / wordmark final (D-015).
  brand: {
    name: 'MODO CAMPANHA',
    monogram: 'MC',
    homeLabel: 'Modo Campanha, voltar ao topo',
  },
  nav: {
    label: 'Navegação principal',
    about: 'Sobre',
    projects: 'Projetos',
    journey: 'Jornada',
    contact: 'Contato',
  },
  hero: {
    eyebrow: 'MC-01 / PORTFÓLIO PROFISSIONAL',
  },
  a11y: {
    newTab: '(abre em nova aba)',
  },
  cta: {
    explore: 'Explorar campanha',
    resume: 'Currículo',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  status: {
    active: 'ACTIVE',
    inProgress: 'IN PROGRESS',
  },
  playerCard: {
    player: 'PLAYER 01',
    photoPlaceholder: 'FOTO DO EDUARDO',
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
    skillLoadout: 'SKILL LOADOUT',
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
    identification: 'MC-01',
  },
};

type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };

/** Forma obrigatória de qualquer dicionário de UI. */
export type UiDictionary = Widen<typeof UI_PT_BR>;
