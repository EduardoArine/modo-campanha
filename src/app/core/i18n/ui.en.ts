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
    homeLabel: 'MC Modo Campanha, back to top',
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
    xpLabel: 'XP',
  },
  playerStatus: {
    subtitle: 'PLAYER PROFILE // CURRENT CAMPAIGN DATA',
    systemLabel: 'System',
    console: 'MC-01',
    brand: 'MODO CAMPANHA',
    online: 'ONLINE',
    journey: 'ABOUT THE JOURNEY',
    state: 'CURRENT STATE',
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
    choose: 'Choose a cartridge',
    slot: {
      empty: 'EMPTY SLOT',
      loading: 'LOADING',
      inserted: 'INSERTED',
      ejecting: 'EJECTING',
      unavailable: 'MC-01 UNAVAILABLE',
    },
    ready: 'READY',
    teaser: {
      play: 'Play teaser',
      pause: 'Pause teaser',
      unavailable: 'TEASER UNAVAILABLE',
    },
    experience: { available: 'available', inDevelopment: 'in development' },
    status: {
      loading: 'Loading cartridge.',
      ejected: 'Cartridge ejected.',
      teaserUnavailable: 'The teaser did not load. The project case is still available.',
    },
    fallback: "The MC-01 view didn't load. The project case is still available below.",
  },
  projectCase: {
    role: 'MY CONTRIBUTION',
    stack: 'STACK',
    learnings: 'LEARNINGS',
    evidence: 'EVIDENCE',
  },
  campaignLog: {
    present: 'PRESENT',
    since: 'SINCE',
    chapter: 'CHAPTER',
    checkpoint: 'CHECKPOINT',
    complete: 'CHECKPOINT COMPLETE',
    ongoing: 'CURRENT QUEST — IN PROGRESS',
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
