// Dicionário de UI em pt-BR. Define a forma (`UiDictionary`) que o inglês precisa seguir.
// Tudo em português (D-084): inglês só em nomes próprios e identidade (MODO CAMPANHA, MC-01,
// MC-CART, SYSTEM HORIZON, XP, ONLINE, GitHub, LinkedIn). Nunca por hardcode.
// Textos humanos (cargo, resumo, motto, dados do Player Status) vivem em data/profile.data.ts.
export const UI_PT_BR = {
  meta: {
    title: 'Modo Campanha — Eduardo Arine',
    description:
      'Portfólio profissional de Eduardo Arine: carreira em desenvolvimento, IA, produtos digitais e gamificação apresentada como uma campanha de videogame.',
    // Texto alternativo da imagem de compartilhamento (og-image-pt-BR.png, D-085).
    imageAlt:
      'Modo Campanha — Eduardo Arine, Desenvolvedor de Produtos Digitais, com o cartucho MC-001.',
  },
  language: {
    switcherLabel: 'Idioma',
    names: { 'pt-BR': 'Português', en: 'English' },
    short: { 'pt-BR': 'PT', en: 'EN' },
  },
  // Marca: símbolo (SVG decorativo, D-085) + wordmark.
  brand: {
    name: 'MODO CAMPANHA',
    // Contém o texto visível "MODO CAMPANHA" (WCAG 2.5.3); o símbolo é decorativo.
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
    pdf: '(PDF, abre em nova aba)',
    skipToContent: 'Pular para o conteúdo',
  },
  cta: {
    explore: 'Explorar campanha',
    resume: 'Currículo',
    email: 'E-mail',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  status: {
    active: 'ATIVO',
    inProgress: 'EM ANDAMENTO',
  },
  playerCard: {
    player: 'JOGADOR 01',
    photoPlaceholder: 'FOTO DO EDUARDO',
    xpLabel: 'XP',
  },
  // Player Status (D-082): rótulos do painel; o conteúdo humano está em profile.data.ts.
  playerStatus: {
    subtitle: 'PERFIL DO JOGADOR // DADOS DA CAMPANHA ATUAL',
    systemLabel: 'Sistema',
    console: 'MC-01',
    brand: 'MODO CAMPANHA',
    online: 'ONLINE',
    journey: 'SOBRE A JORNADA',
    state: 'ESTADO ATUAL',
  },
  // Arsenal de Habilidades (Concept C, D-092): rótulos do Loadout; o conteúdo está em skills.data.ts.
  skillLoadout: {
    eyebrow: 'ESPECIALIDADES',
    lead: 'Selecione uma especialidade para explorar minhas principais habilidades.',
    specialties: 'Especialidades',
    viewAll: 'Ver todas as habilidades',
    back: 'Voltar ao arsenal',
    allTitle: 'TODAS AS HABILIDADES',
    skills: 'HABILIDADES',
  },
  cart: {
    system: 'MC-CART',
    artworkPlaceholder: 'ARTE DO PROJETO',
  },
  sections: {
    playerStatus: 'STATUS DO JOGADOR',
    skillLoadout: 'ARSENAL DE HABILIDADES',
    projectInventory: 'INVENTÁRIO DE PROJETOS',
    campaignLog: 'DIÁRIO DE CAMPANHA',
    finalCheckpoint: 'A CAMPANHA CONTINUA...',
  },
  inventory: {
    subtitle: 'Cartuchos coletados durante a campanha.',
    // Inserção física no MC-01 (H2, D-077). Estados do slot em linguagem de sistema; ações localizadas.
    insert: 'Inserir cartucho',
    eject: 'Ejetar cartucho',
    // Biblioteca MC-CART (D-087). "MC-CART" é nome próprio; o resto em português (D-084).
    collection: {
      title: 'BIBLIOTECA DE CARTUCHOS',
      count: 'CARTUCHOS',
      hint: 'Escolha um cartucho para explorar.',
      hintSwap: 'Escolher outro cartucho troca o que está inserido.',
      busy: 'Aguarde: trocando de cartucho.',
      select: 'Selecionar',
      insert: 'Inserir',
      swap: 'Trocar para',
      selected: 'SELECIONADO',
      inserted: 'INSERIDO',
      loading: 'CARREGANDO',
      isSelected: 'selecionado',
      isInserted: 'inserido',
      isLoading: 'carregando',
      previous: 'Cartuchos anteriores',
      next: 'Próximos cartuchos',
    },
    // H3 (D-093): capa e dossiê do projeto dentro do CRT.
    cover: {
      kind: 'PROJETO',
      explore: 'Explorar projeto',
    },
    dossier: {
      back: 'Voltar à capa',
      library: 'Biblioteca',
      toLibrary: 'Voltar à biblioteca',
      nav: 'Seções do dossiê',
      pick: 'Seção do dossiê',
      previous: 'Anterior',
      next: 'Próxima',
      nextSection: 'Próxima seção',
      previousSection: 'Seção anterior',
      section: 'Seção',
      of: 'de',
      artCaption: 'ARTE DO CARTUCHO',
      evidence: 'EVIDÊNCIAS',
      sections: {
        about: 'Sobre o projeto',
        challenge: 'Problema',
        role: 'Minha contribuição',
        stack: 'Tecnologias',
        highlights: 'Marcos',
        learnings: 'Aprendizados',
        learningsEvidence: 'Aprendizados e evidências',
      },
    },
    slot: {
      empty: 'ENCAIXE VAZIO',
      loading: 'CARREGANDO',
      inserted: 'INSERIDO',
      ejecting: 'EJETANDO',
      unavailable: 'MC-01 INDISPONÍVEL',
    },
    teaser: {
      play: 'Reproduzir demonstração',
      pause: 'Pausar demonstração',
      unavailable: 'DEMONSTRAÇÃO INDISPONÍVEL',
    },
    experience: { available: 'disponível', inDevelopment: 'em desenvolvimento' },
    // Anúncios (role="status") nas transições; o READY é anunciado pelo foco.
    status: {
      loading: 'Carregando cartucho.',
      ejected: 'Cartucho ejetado.',
      teaserUnavailable: 'A demonstração não carregou. O dossiê do projeto continua disponível.',
      selected: 'Cartucho selecionado:',
      swapping: 'Trocando para',
      ready: 'pronto.',
    },
    fallback: 'A visualização do MC-01 não carregou. O case do projeto continua disponível abaixo.',
  },
  // Case do projeto, fora do CRT (D-077).
  projectCase: {
    challenge: 'PROBLEMA',
    role: 'MINHA CONTRIBUIÇÃO',
    stack: 'TECNOLOGIAS',
    highlights: 'MARCOS',
    learnings: 'APRENDIZADOS',
    evidence: 'EVIDÊNCIAS',
  },
  campaignLog: {
    present: 'ATUAL',
    since: 'DESDE',
    // Capítulos (docs/15 §13): rótulos de sistema em português (D-084).
    chapter: 'CAPÍTULO',
    checkpoint: 'MARCO',
    complete: 'MARCO CONCLUÍDO',
    ongoing: 'MISSÃO ATUAL — EM ANDAMENTO',
    approx: 'c.',
    links: {
      launch: 'LANÇAMENTO INSTITUCIONAL',
      paper: 'PUBLICAÇÃO CIENTÍFICA',
      press: 'IMPRENSA',
      record: 'REGISTRO BIBLIOGRÁFICO',
      academic: 'DOCUMENTO ACADÊMICO',
    },
    story: { open: 'Ler a história completa', close: 'Recolher a história' },
    // Diário de Campanha: mapa por capítulos (D-091).
    diary: {
      chapterShort: 'CAP.',
      of: 'de',
      milestones: 'MARCOS',
      inConstruction: 'EM CONSTRUÇÃO',
      selected: 'SELECIONADO',
      chapters: 'Capítulos do diário',
      map: 'Mapa do capítulo',
      list: 'Marcos do capítulo',
      previous: 'Marco anterior',
      next: 'Próximo marco',
      nextChapter: 'Próximo capítulo',
    },
  },
  // Único detalhe MC-01 do encerramento (D-052).
  finalCheckpoint: {
    save: 'PROGRESSO SALVO',
  },
  // Footer da Home (05-C): nome do site no copyright, em caixa normal (a marca do header é caixa alta).
  footer: {
    siteName: 'Modo Campanha',
  },
  crt: {
    regionLabel: 'Visualizador de projetos',
    empty: 'INSIRA UM CARTUCHO',
    loading: 'CARREGANDO CARTUCHO...',
    identification: 'MC-01',
  },
  // SYSTEM HORIZON (D-068, localizado em D-084): textos da tela em português; o título é nome
  // próprio. Os itens repetem os grupos do Arsenal de Habilidades.
  systemHorizon: {
    player: 'JOGADOR 01',
    items: { build: 'CONSTRUÇÃO', product: 'PRODUTO', ai: 'IA', gameDna: 'DNA DE GAMES' },
    title: 'SYSTEM HORIZON',
    unlocked: 'CAMPANHA LIBERADA',
    continues: 'A CAMPANHA CONTINUA...',
    pause: 'Pausar demonstração',
    play: 'Reproduzir demonstração',
    // SYSTEM HORIZON interativo (D-103): rótulos do jogo; os fatos vêm do Diário, do Arsenal, do
    // Inventário e do Contato.
    game: {
      pageTitle: 'SYSTEM HORIZON — Modo Campanha',
      entry: 'Jogar SYSTEM HORIZON',
      lead: 'A minha trajetória como uma campanha jogável: caminhe pelos capítulos do Diário, leia os marcos, colete as quatro especialidades e forme o MC-CART MC-001.',
      start: 'Começar',
      textVersion: 'Versão em texto',
      back: 'Voltar ao portfólio',
      backShort: 'Portfólio',
      howTo: 'COMO JOGAR',
      howToLead: 'Leva de 3 a 5 minutos. Nada aqui é inventado: cada marco é um fato do portfólio.',
      keysLabel: 'Teclado',
      touchLabel: 'Toque ou mouse',
      keys: {
        move: 'Andar',
        moveKeys: '← → ou A D',
        read: 'Ler o marco próximo',
        readKeys: 'Enter ou Espaço',
        next: 'Ir ao próximo marco / ao anterior',
        nextKeys: 'N / B',
        pause: 'Pausar',
        pauseKeys: 'Esc ou P',
      },
      touch:
        'Segure ◀ ou ▶ para andar, toque em Ler perto de um marco ou em Próximo marco para ir direto. Tocar na tela também leva o jogador até lá.',
      play: 'Jogar',
      act: 'ATO',
      acts: { campaigns: 'CAMPANHAS', horizon: 'HORIZONTE' },
      stage: 'Área do jogo SYSTEM HORIZON',
      stageHelp:
        'Setas ou A e D para andar, Enter para ler o marco próximo, N para ir ao próximo marco, Esc para pausar. Todo o conteúdo aparece em texto.',
      controls: 'Controles do jogo',
      left: 'Andar para a esquerda',
      right: 'Andar para a direita',
      next: 'Próximo marco',
      walkHint: 'Ande até um marco.',
      read: {
        milestone: 'Ler marco',
        checkpoint: 'Ver capítulo',
        cartridge: 'Ver cartucho',
        forge: 'Ver cartucho',
        closing: 'Ler encerramento',
      },
      readTag: 'LIDO',
      hud: 'Estado da campanha',
      slots: 'Especialidades coletadas',
      notCollected: 'ainda não coletada',
      cartLocked: 'MC-CART ainda não formado',
      cartFormed: 'MC-CART MC-001 formado',
      pause: 'Pausar',
      paused: 'PAUSA',
      resume: 'Continuar',
      restart: 'Recomeçar',
      close: 'Fechar',
      replay: 'Jogar de novo',
      chapterDone: 'CONCLUÍDO',
      unlockedLead:
        'As quatro especialidades coletadas formam o MC-CART MC-001: o próprio Modo Campanha.',
      skills: 'HABILIDADES',
      announce: {
        near: 'Perto de',
        enter: 'Enter para ler.',
        collected: 'coletada.',
        checkpoint: 'concluído.',
        unlocked: 'MC-CART MC-001 formado: campanha liberada.',
        arrived: 'Você chegou ao mirante. A campanha continua.',
      },
      text: {
        title: 'VERSÃO EM TEXTO',
        lead: 'A mesma jornada do jogo, em ordem, ato por ato.',
        collect: 'Especialidade coletada',
      },
    },
  },
};

type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };

/** Forma obrigatória de qualquer dicionário de UI. */
export type UiDictionary = Widen<typeof UI_PT_BR>;
