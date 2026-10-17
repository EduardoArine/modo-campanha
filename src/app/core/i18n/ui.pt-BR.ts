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
    // O código MC-01 vem de crt.identification, numa etiqueta própria (D-063).
    eyebrow: 'PORTFÓLIO PROFISSIONAL',
  },
  a11y: {
    newTab: '(abre em nova aba)',
    skipToContent: 'Pular para o conteúdo',
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
    // Inserir / ejetar o cartucho no CRT Project Viewer (FASE 5, D-058).
    insert: 'Inserir cartucho',
    eject: 'Ejetar cartucho',
  },
  // Rótulos do case dentro do CRT (FASE 5, D-058).
  projectCase: {
    role: 'PAPEL',
    stack: 'STACK',
    learnings: 'APRENDIZADOS',
  },
  campaignLog: {
    kind: {
      origin: 'NEW GAME',
      checkpoint: 'CHECKPOINT',
      current: 'CAMPANHA ATUAL',
    },
    present: 'ATUAL',
    since: 'DESDE',
    // Capítulos (docs/15 §13): rótulos de sistema em inglês; ações localizadas.
    chapter: 'CHAPTER',
    checkpoint: 'CHECKPOINT',
    complete: 'CHECKPOINT COMPLETE',
    ongoing: 'CURRENT QUEST — EM ANDAMENTO',
    approx: 'c.',
    links: {
      launch: 'LANÇAMENTO INSTITUCIONAL',
      paper: 'PUBLICAÇÃO CIENTÍFICA',
      press: 'IMPRENSA',
      record: 'REGISTRO BIBLIOGRÁFICO',
      academic: 'DOCUMENTO ACADÊMICO',
    },
    story: { open: 'Ler a história completa', close: 'Recolher a história' },
  },
  achievements: {
    code: 'ACH',
    evidence: 'EVIDÊNCIA',
  },
  currentQuest: {
    focus: 'FRENTES',
  },
  // Tipo de side quest: categoria do trabalho, nunca dificuldade ou raridade.
  sideQuests: {
    kind: {
      game: 'GAME DEV',
      art: 'ARTE',
      ai: 'IA',
      interface: 'INTERFACE',
      study: 'ESTUDO',
    },
  },
  // Único detalhe MC-01 do encerramento (D-052).
  finalCheckpoint: {
    save: 'SAVE COMPLETE',
  },
  // Footer da Home (05-C): nome do site no copyright, em caixa normal (a marca do header é caixa alta).
  footer: {
    siteName: 'Modo Campanha',
  },
  crt: {
    regionLabel: 'Visualizador de projetos',
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
    pause: 'Pausar demonstração',
    play: 'Reproduzir',
  },
};

type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };

/** Forma obrigatória de qualquer dicionário de UI. */
export type UiDictionary = Widen<typeof UI_PT_BR>;
