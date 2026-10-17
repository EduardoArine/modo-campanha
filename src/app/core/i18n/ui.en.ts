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
    short: { 'pt-BR': 'PT', en: 'EN' },
  },
  brand: {
    name: 'MODO CAMPANHA',
    monogram: 'MC',
    homeLabel: 'Modo Campanha, back to top',
  },
  nav: {
    label: 'Main navigation',
    about: 'About',
    projects: 'Projects',
    journey: 'Journey',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'PROFESSIONAL PORTFOLIO',
  },
  a11y: {
    newTab: '(opens in a new tab)',
    skipToContent: 'Skip to content',
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
    skillLoadout: 'SKILL LOADOUT',
    projectInventory: 'PROJECT INVENTORY',
    campaignLog: 'CAMPAIGN LOG',
    achievements: 'ACHIEVEMENTS',
    currentQuest: 'CURRENT MAIN QUEST',
    sideQuests: 'SIDE QUESTS',
    finalCheckpoint: 'CAMPAIGN CONTINUES...',
  },
  inventory: {
    subtitle: 'Cartridges collected along the campaign.',
    insert: 'Insert cartridge',
    eject: 'Eject cartridge',
  },
  projectCase: {
    role: 'ROLE',
    stack: 'STACK',
    learnings: 'LEARNINGS',
  },
  campaignLog: {
    kind: {
      origin: 'NEW GAME',
      checkpoint: 'CHECKPOINT',
      current: 'CURRENT CAMPAIGN',
    },
    present: 'PRESENT',
    since: 'SINCE',
    chapter: 'CHAPTER',
    checkpoint: 'CHECKPOINT',
    complete: 'CHECKPOINT COMPLETE',
    approx: 'c.',
    links: {
      launch: 'INSTITUTIONAL LAUNCH',
      paper: 'SCIENTIFIC PUBLICATION',
      press: 'PRESS',
      record: 'BIBLIOGRAPHIC RECORD',
      academic: 'ACADEMIC DOCUMENT',
    },
    story: { open: 'Read the full story', close: 'Collapse the story' },
  },
  achievements: {
    code: 'ACH',
    evidence: 'EVIDENCE',
  },
  currentQuest: {
    focus: 'FOCUS AREAS',
  },
  sideQuests: {
    kind: {
      game: 'GAME DEV',
      art: 'ART',
      ai: 'AI',
      interface: 'INTERFACE',
      study: 'STUDY',
    },
  },
  finalCheckpoint: {
    save: 'SAVE COMPLETE',
  },
  footer: {
    siteName: 'Modo Campanha',
  },
  crt: {
    regionLabel: 'Project viewer',
    empty: 'INSERT CARTRIDGE',
    loading: 'LOADING CARTRIDGE...',
    identification: 'MC-01',
  },
  // SYSTEM HORIZON (D-068): linguagem de sistema do MC-01, em inglês nos dois idiomas;
  // só os controles (pausar/reproduzir) são localizados.
  systemHorizon: {
    player: 'PLAYER 01',
    items: { build: 'BUILD', product: 'PRODUCT', ai: 'AI', gameDna: 'GAME DNA' },
    title: 'SYSTEM HORIZON',
    unlocked: 'CAMPAIGN UNLOCKED',
    continues: 'CAMPAIGN CONTINUES...',
    pause: 'Pause demo',
    play: 'Play',
  },
};
