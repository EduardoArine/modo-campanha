import type { Localized } from '../core/i18n';
import { CampaignLogChapter, Project, ProjectCartridge, ProjectLink } from '../models';
import { CHAPTER_02, FATEC_CHAPTER } from './campaign-log.chapters.data';

// Projetos do Modo Campanha (content inventory: docs/14, D-041/D-042/D-044; coleção MC-CART, D-087).
// Regra: o runtime contém SOMENTE projetos aprovados para publicação. Projetos em revisão ficam
// documentados em docs/14 e entram aqui só depois de aprovados.
// O filtro abaixo continua como defesa conservadora (testado com fixtures).

const CART = 'assets/cartridges/';

/** Carcaça em escala do console (699 × 500; 2× em 1398), gerada por build-collection.mjs. */
function consoleShell(serial: string) {
  const dir = `${CART}${serial}/`;
  return {
    src: `${dir}console-scale-699.webp`,
    srcset: [360, 540, 699, 1398].map((w) => `${dir}console-scale-${w}.webp ${w}w`).join(', '),
    width: 699,
    height: 500,
  };
}

/**
 * MC-CART da coleção (D-087): a carcaça oficial entra no slot e a ilustração do rótulo vai para o
 * CRT, inteira (2:1, `contain`). `artHeight` = altura do derivado de 952 px (o recorte varia por
 * cartucho); `logo` = lado do logo no alto do rótulo (D-098). Shell/accent só valem para o
 * fallback em CSS.
 */
function collectionCartridge(
  serial: string,
  artHeight: number,
  logo: 'left' | 'right',
  alt: Localized,
): ProjectCartridge {
  const dir = `${CART}${serial}/`;
  const shell = consoleShell(serial);
  return {
    shell: 'dark',
    accent: 'warm',
    artwork: {
      src: `${dir}label-art-952.webp`,
      srcset: `${dir}label-art-640.webp 640w, ${dir}label-art-952.webp 952w`,
      width: 952,
      height: artHeight,
      alt,
      fit: 'contain',
      logo,
    },
    renders: { front: shell, console: shell },
  };
}

/** Evidências do case: as mesmas referências verificadas do checkpoint no Campaign Log (fonte única). */
function campaignLinks(chapter: CampaignLogChapter, entryId: string): readonly ProjectLink[] {
  return chapter.entries.find((entry) => entry.id === entryId)?.links ?? [];
}

export const PROJECTS: readonly Project[] = [
  {
    id: 'mc-001',
    serial: 'MC-001',
    slug: 'modo-campanha',
    origin: 'personal',
    publication: 'approved',
    // SYSTEM HORIZON (D-077): a primeira experiência narrativa do Modo Campanha. Modo Campanha é o
    // portfólio e o ecossistema; MC-01, o sistema que apresenta os projetos; MC-CART, a mídia física.
    // Título e descrição do Eduardo; o tipo segue a definição dele ("experiência narrativa").
    title: { 'pt-BR': 'SYSTEM HORIZON', en: 'SYSTEM HORIZON' },
    challenge: {
      'pt-BR':
        'Apresentar uma trajetória profissional real como uma campanha de videogame, sem inventar nada.',
      en: 'Present a real professional journey as a video game campaign, without making anything up.',
    },
    description: {
      'pt-BR':
        'O primeiro cartucho do Modo Campanha. Uma jornada narrativa inspirada nos games que transforma experiências e conquistas reais da minha carreira em uma campanha interativa.',
      en: 'The first Modo Campanha cartridge. A game-inspired narrative journey that transforms real experiences and achievements from my career into an interactive campaign.',
    },
    type: { 'pt-BR': 'EXPERIÊNCIA NARRATIVA', en: 'NARRATIVE EXPERIENCE' },
    role: {
      'pt-BR':
        'Conceito, direção de produto, direção visual e desenvolvimento, com IA integrada ao fluxo de implementação, validação e documentação.',
      en: 'Concept, product direction, visual direction, and development, with AI integrated into the implementation, validation, and documentation workflow.',
    },
    technologies: ['Angular', 'TypeScript', 'SCSS', 'Vitest', 'GitHub Actions / Pages'],
    learnings: {
      'pt-BR': [
        'Validar tipografia no tamanho real de uso.',
        'Separar linguagem de interface digital da linguagem de objetos físicos.',
      ],
      en: [
        'Validate typography at actual usage sizes.',
        'Separate the visual language of digital interfaces from that of physical objects.',
      ],
    },
    tags: ['product', 'gamification'],
    // MC-CART oficial (D-065): shell grafite com acentos laranja queimado; artwork SYSTEM HORIZON
    // (substitui a v1 de D-046). Renders em assets/cartridges/mc-001/ (fontes em design/source/).
    // O alt fica guardado para usos independentes; dentro do MC-CART a arte é decorativa.
    cartridge: {
      shell: 'dark',
      accent: 'warm',
      teaser: 'system-horizon',
      artwork: {
        src: 'assets/cartridges/mc-001/system-horizon.webp',
        srcset:
          'assets/cartridges/mc-001/system-horizon-640.webp 640w, assets/cartridges/mc-001/system-horizon.webp 960w',
        width: 960,
        height: 720,
        alt: {
          'pt-BR':
            'Paisagem em pixel art ao pôr do sol: um caminho entre pedras e pinheiros desce até um lago cercado de montanhas, com o sol no horizonte.',
          en: 'Pixel-art landscape at sunset: a path between rocks and pine trees leads down to a lake surrounded by mountains, with the sun on the horizon.',
        },
      },
      renders: {
        front: { src: 'assets/cartridges/mc-001/front.webp', width: 960, height: 690 },
        // Carcaça oficial do MC-001 na experiência interativa (D-078); `front` fica como referência.
        // Coleção (D-087): mesma carcaça da coleção, gerada do cartucho oficial do Eduardo.
        console: consoleShell('mc-001'),
        threeQuarter: {
          src: 'assets/cartridges/mc-001/three-quarter.webp',
          width: 1244,
          height: 1017,
        },
      },
    },
    experiences: [
      { kind: 'teaser', label: { 'pt-BR': 'Demonstração', en: 'Teaser' }, status: 'available' },
      {
        kind: 'playable',
        label: { 'pt-BR': 'Campanha jogável', en: 'Playable campaign' },
        status: 'in-development',
      },
    ],
    links: [
      {
        kind: 'repository',
        label: { 'pt-BR': 'Repositório no GitHub', en: 'GitHub repository' },
        url: 'https://github.com/EduardoArine/modo-campanha',
      },
    ],
  },
  // ---------------------------------------------------------------------------------------------
  // Coleção MC-CART (D-087): MC-002 a MC-006. Fatos e fontes do Campaign Log aprovado (D-070–D-074,
  // `campaign-log.chapters.data.ts`), condensados no formato do case; as evidências são as mesmas
  // referências do Campaign Log (importadas, não copiadas). Carcaças e ilustrações do rótulo geradas
  // por design/source/mc-cart/build-collection.mjs a partir dos cartuchos oficiais do Eduardo.
  {
    id: 'mc-002',
    serial: 'MC-002',
    slug: 'aedes-revenge',
    origin: 'other',
    publication: 'approved',
    title: { 'pt-BR': 'Aedes Revenge', en: 'Aedes Revenge' },
    description: {
      'pt-BR':
        'Jogo 2D para dispositivos móveis que aborda a conscientização sobre a dengue de uma perspectiva diferente: a do próprio mosquito.',
      en: "A 2D mobile game that approaches dengue awareness from a different perspective — the mosquito's own.",
    },
    type: { 'pt-BR': 'JOGO 2D PARA CELULAR', en: '2D MOBILE GAME' },
    challenge: {
      'pt-BR':
        'Tratar a conscientização sobre a dengue com a linguagem de um jogo, desenvolvido durante a graduação em Jogos Digitais na FATEC Americana.',
      en: 'Address dengue awareness through the language of a game, developed during my Digital Games degree at FATEC Americana.',
    },
    role: {
      'pt-BR':
        'O projeto começou em grupo; com a saída dos outros integrantes, continuei desenvolvendo o jogo sozinho: mecânicas, interfaces, personagens e os desafios de desenvolvimento.',
      en: 'The project started as a group effort; after the other members left, I kept developing the game on my own: mechanics, interfaces, characters, and the development challenges.',
    },
    technologies: ['Unity', 'C#'],
    highlights: {
      'pt-BR': [
        'Melhor Jogo — Categoria Acadêmica, no FAEL 2016 da FATEC Americana.',
        'Publicado no Google Play em maio de 2017, em versão beta com três fases jogáveis e um chefe.',
        'Melhor Jogo — Categoria Acadêmica, na Mostra de Jogos 2017 da FATEC Americana.',
        'Apresentado como Trabalho de Conclusão de Curso, com nota 10.',
      ],
      en: [
        "Best Game — Academic Category at FATEC Americana's FAEL 2016.",
        'Launched on Google Play in May 2017, as a beta with three playable levels and a boss.',
        "Best Game — Academic Category at FATEC Americana's 2017 Game Showcase.",
        'Presented as my capstone project (TCC), with a perfect 10.',
      ],
    },
    learnings: {
      'pt-BR': [
        'Desenvolver não é apenas fazer algo funcionar: é pensar em quem vai usar.',
        'Avaliações e pesquisas com jogadores reais mostram o que funciona e o que precisa melhorar.',
      ],
      en: [
        "Development isn't just about making something work: it's about thinking of the people who will use it.",
        'Reviews and surveys with real players show what works and what needs improvement.',
      ],
    },
    tags: ['game-design'],
    cartridge: collectionCartridge('mc-002', 462, 'left', {
      'pt-BR':
        'Ilustração em pixel art: um personagem com mochila e arma de jato enfrenta um mosquito gigante ao pôr do sol sobre a cidade, com o título AEDES REVENGE.',
      en: 'Pixel-art illustration: a character with a backpack and a spray gun faces a giant mosquito at sunset over the city, with the title AEDES REVENGE.',
    }),
    experiences: [],
    links: campaignLinks(FATEC_CHAPTER, 'fatec-two-awards-capstone'),
  },
  {
    id: 'mc-003',
    serial: 'MC-003',
    slug: 'scoutevo',
    origin: 'other',
    publication: 'approved',
    title: { 'pt-BR': 'ScoutEvo', en: 'ScoutEvo' },
    description: {
      'pt-BR':
        'Plataforma criada para ajudar a descobrir novos talentos no futebol, reunindo informações de jovens jogadores coletadas por aplicativo.',
      en: 'A platform designed to help discover new football talent, bringing together information about young players collected through an app.',
    },
    type: { 'pt-BR': 'PLATAFORMA DE TALENTOS NO FUTEBOL', en: 'FOOTBALL TALENT PLATFORM' },
    challenge: {
      'pt-BR':
        'Coletar informações de jovens jogadores por meio de um aplicativo e reunir esses dados em uma plataforma que pudesse apoiar a análise de atletas por clubes brasileiros e internacionais.',
      en: 'Collect scouting information about young players through an app and bring that data together in a platform that could support talent evaluation by clubs in Brazil and abroad.',
    },
    role: {
      'pt-BR':
        'Arquitetura da solução, desenvolvimento do aplicativo de coleta com Unity e C#, frontend web em ASP.NET com C# e todo o design das interfaces. O banco de dados ficou com outro integrante.',
      en: 'Solution architecture, the scouting app with Unity and C#, the web frontend with ASP.NET and C#, and the interface design. Database development was handled by another team member.',
    },
    technologies: ['Unity', 'C#', 'ASP.NET'],
    highlights: {
      'pt-BR': ['Em 2018, a solução venceu uma maratona de inovação ligada ao Flamengo.'],
      en: ['In 2018, the solution won an innovation competition connected to Flamengo.'],
    },
    learnings: {
      'pt-BR': [
        'Usar o conhecimento que eu havia construído para criar soluções digitais com outras finalidades, além dos jogos.',
      ],
      en: [
        "Apply what I'd learned to build digital solutions for different purposes, beyond games.",
      ],
    },
    tags: ['product'],
    cartridge: collectionCartridge('mc-003', 473, 'right', {
      'pt-BR':
        'Ilustração: um jogador conduz a bola em um estádio iluminado, com um esquema tático sobreposto ao gramado e o título SCOUTEVO.',
      en: 'Illustration: a player dribbles the ball in a floodlit stadium, with a tactical diagram over the pitch and the title SCOUTEVO.',
    }),
    experiences: [],
    links: campaignLinks(CHAPTER_02, 'scoutevo'),
  },
  {
    id: 'mc-004',
    serial: 'MC-004',
    slug: 'eos',
    origin: 'other',
    publication: 'approved',
    title: { 'pt-BR': 'EOS', en: 'EOS' },
    description: {
      'pt-BR':
        'Plataforma Inteligente para Logística de Doação e Transplante de Órgãos, criada para apoiar o planejamento do transporte de órgãos e equipes médicas.',
      en: 'Intelligent Platform for Organ Donation and Transplant Logistics, designed to support planning the transportation of organs and medical teams.',
    },
    type: { 'pt-BR': 'LOGÍSTICA DE TRANSPLANTES', en: 'TRANSPLANT LOGISTICS' },
    challenge: {
      'pt-BR':
        'Planejar o transporte de órgãos e equipes médicas considerando rotas, modalidades de transporte, tempo de deslocamento e os limites de preservação dos órgãos.',
      en: 'Plan the transportation of organs and medical teams, considering routes, transportation modes, travel times, and organ preservation constraints.',
    },
    role: {
      'pt-BR':
        'Participei da engenharia da solução e fui responsável por todo o frontend da aplicação web, desenvolvido com ASP.NET e C#.',
      en: "I contributed to the solution's engineering and was responsible for the entire web application frontend, built with ASP.NET and C#.",
    },
    technologies: ['ASP.NET', 'C#'],
    highlights: {
      'pt-BR': [
        'Em setembro de 2019, o sistema foi disponibilizado à Central Estadual de Transplantes de São Paulo e divulgado pela Unicamp.',
        'A pesquisa que fundamentou a solução foi publicada na revista científica Case Studies on Transport Policy, em 2021.',
      ],
      en: [
        "In September 2019, the system was made available to São Paulo's State Transplant Center and announced by Unicamp.",
        'The underlying research was published in the journal Case Studies on Transport Policy in 2021.',
      ],
    },
    learnings: {
      'pt-BR': [
        'Organizar informações complexas e apresentá-las com clareza para apoiar decisões sob restrição de tempo.',
        'Desenvolver produtos digitais é entender problemas reais e construir soluções que possam fazer diferença.',
      ],
      en: [
        'Organize complex information and present it clearly to support time-sensitive decisions.',
        'Building digital products means understanding real problems and creating solutions that can make a difference.',
      ],
    },
    tags: ['product'],
    cartridge: collectionCartridge('mc-004', 469, 'right', {
      'pt-BR':
        'Ilustração: à noite, uma rota luminosa atravessa a cidade ligando dois hospitais, com uma van no caminho e o título EOS.',
      en: 'Illustration: at night, a glowing route crosses the city connecting two hospitals, with a van on the way and the title EOS.',
    }),
    experiences: [],
    // Sem o DOI e o registro do OpenAlex (redundantes com o artigo); a autoria fica na nota do artigo.
    links: campaignLinks(CHAPTER_02, 'eos').filter(
      (link) => link.kind !== 'record' && !link.url.includes('doi.org'),
    ),
  },
  {
    id: 'mc-005',
    serial: 'MC-005',
    slug: 'axia',
    origin: 'other',
    publication: 'approved',
    title: { 'pt-BR': 'Axia', en: 'Axia' },
    description: {
      'pt-BR':
        'Plataforma de inteligência operacional desenvolvida pela Ativvus/Arppen para a gestão de limpeza e facilities, com tecnologia, dados e dispositivos conectados.',
      en: 'An operational intelligence platform developed by Ativvus/Arppen for cleaning and facilities management, with technology, data, and connected devices.',
    },
    type: { 'pt-BR': 'INTELIGÊNCIA OPERACIONAL', en: 'OPERATIONAL INTELLIGENCE' },
    challenge: {
      'pt-BR':
        'Transformar necessidades operacionais reais da gestão de limpeza e facilities em um produto consistente, capaz de evoluir conforme novos problemas e oportunidades surgiam.',
      en: 'Turn real operational needs in cleaning and facilities management into a consistent product that could evolve as new challenges and opportunities emerged.',
    },
    role: {
      'pt-BR':
        'Participei de toda a evolução do produto, da idealização e engenharia inicial às expansões seguintes, incluindo a evolução para a Inteligência Axia. Minha atuação passou por arquitetura, aplicação web em Angular, API em .NET com C#, SQL Server, design das interfaces e contribuições ao código embarcado dos dispositivos em C. Meu foco principal foi a plataforma web, as APIs e a experiência de uso.',
      en: "I contributed throughout the product's evolution, from its initial concept and engineering to later expansions, including its evolution into Axia Intelligence. My work spanned architecture, the Angular web application, .NET WebAPI with C#, SQL Server, interface design, and contributions to the devices' embedded C code. My primary focus was the web platform, APIs, and user experience.",
    },
    technologies: ['Angular', '.NET', 'C#', 'SQL Server', 'C'],
    learnings: {
      'pt-BR': [
        'O desafio não é só fazer tecnologias diferentes funcionarem juntas, mas transformar necessidades reais em um produto consistente.',
        'Participar das decisões, construir, entender como a solução é usada e continuar evoluindo o produto.',
      ],
      en: [
        "The challenge isn't just making different technologies work together, but turning real needs into a consistent product.",
        'Contribute to decisions, build, understand how the solution is used, and keep improving the product.',
      ],
    },
    tags: ['product'],
    cartridge: collectionCartridge('mc-005', 470, 'right', {
      'pt-BR':
        'Ilustração isométrica: escritórios e um depósito à noite com sensores conectados a uma base de dados, com o título AXIA.',
      en: 'Isometric illustration: offices and a warehouse at night with sensors connected to a database, with the title AXIA.',
    }),
    experiences: [],
    links: campaignLinks(CHAPTER_02, 'axia'),
  },
  {
    id: 'mc-006',
    serial: 'MC-006',
    slug: 'comunidade-on',
    origin: 'on-tech',
    publication: 'approved',
    title: { 'pt-BR': 'Comunidade ON', en: 'Comunidade ON' },
    description: {
      'pt-BR':
        'Onde conecto engenharia, design de produto, inteligência artificial e gamificação para construir experiências digitais que vão além das interfaces tradicionais.',
      en: 'Where I bring together engineering, product design, artificial intelligence, and gamification to build digital experiences that go beyond traditional interfaces.',
    },
    type: { 'pt-BR': 'PLATAFORMA DE ATENDIMENTO', en: 'CUSTOMER SERVICE PLATFORM' },
    challenge: {
      'pt-BR':
        'Repensar o relacionamento entre marcas e consumidores, combinando tecnologia, inteligência artificial e pessoas em uma plataforma de atendimento.',
      en: 'Rethink the relationship between brands and consumers by bringing technology, artificial intelligence, and people together in a customer service platform.',
    },
    role: {
      'pt-BR':
        'Desenvolvimento das aplicações web, integração com serviços e APIs e, principalmente, construção e evolução das experiências de interface, incluindo a gamificação.',
      en: 'Developing web applications, integrating services and APIs, and, especially, designing and improving user experiences, including gamification.',
    },
    technologies: ['Angular', 'TypeScript', '.NET', 'C#'],
    learnings: {
      'pt-BR': [
        'Usar a linguagem dos games para tornar experiências de trabalho e aprendizado mais claras, envolventes e significativas, sem comprometer a usabilidade e a eficiência operacional.',
      ],
      en: [
        'Use the language of games to make work and learning experiences clearer, more engaging, and more meaningful, without sacrificing usability or operational efficiency.',
      ],
    },
    ongoing: true,
    tags: ['product', 'gamification'],
    cartridge: collectionCartridge('mc-006', 471, 'right', {
      'pt-BR':
        'Ilustração: terraços com pessoas trabalhando e conversando ao redor de uma árvore iluminada ao entardecer, com o título COMUNIDADE ON.',
      en: 'Illustration: terraces with people working and talking around an illuminated tree at dusk, with the title COMUNIDADE ON.',
    }),
    experiences: [],
    // Sem link público aprovado para a Comunidade ON (pendente com o Eduardo).
    links: [],
  },
  {
    // MC-007 — 4Change (D-100): "Do legado à evolução contínua". Conteúdo do Eduardo (2026-10-24) e
    // do currículo atualizado. Sistema que já existia em VB.NET (não foi criado por ele); sem
    // informações comerciais, de clientes ou internas (D-042). Arte do Eduardo (2026-10-24), na
    // coleção por build-collection.mjs.
    id: 'mc-007',
    serial: 'MC-007',
    slug: '4change',
    origin: 'other',
    publication: 'approved',
    title: { 'pt-BR': '4Change', en: '4Change' },
    description: {
      'pt-BR':
        'Plataforma corporativa de gestão de ativos, modernizada e continuamente evoluída para acompanhar as necessidades operacionais de seus usuários.',
      en: "A corporate asset management platform, modernized and continuously evolved to keep up with its users' operational needs.",
    },
    overview: {
      'pt-BR': [
        'O 4Change é um sistema corporativo de gestão e controle de ativos de TI, usado em operações reais. Seu foco histórico é a telefonia corporativa: smartphones e dispositivos móveis, linhas e os vínculos entre equipamentos, linhas e usuários, com o inventário e o acompanhamento dos ativos.',
        'A plataforma segue em evolução, agora com a ampliação para equipamentos desktop. Participo do produto desde 2016, na Ativvus, depois Arppen, e continuo atuando na sua evolução.',
      ],
      en: [
        '4Change is a corporate IT asset management and control system used in real operations. Historically, it has focused on corporate telephony: smartphones and mobile devices, phone lines, and the links between devices, lines, and users, along with asset inventory and tracking.',
        "The platform keeps evolving, now expanding to desktop equipment. I've worked on the product since 2016, at Ativvus (later Arppen), and I'm still part of its evolution.",
      ],
    },
    type: { 'pt-BR': 'GESTÃO DE ATIVOS DE TI', en: 'IT ASSET MANAGEMENT' },
    challenge: {
      'pt-BR':
        'Manter um sistema corporativo relevante por muitos anos: centralizar e organizar as informações dos ativos, controlar os vínculos entre equipamentos e linhas, evoluir uma base legada e adaptar a plataforma a novas demandas operacionais.',
      en: 'Keep a corporate system relevant for many years: centralize and organize asset information, manage the links between devices and lines, evolve a legacy codebase, and adapt the platform to new operational needs.',
    },
    role: {
      'pt-BR':
        'Não criei o sistema original: quando cheguei, em 2016, ele já existia em VB.NET. Minha trajetória no 4Change é a de evoluir, em equipe, um produto em uso, passando por várias camadas da aplicação.',
      en: "I didn't create the original system: when I joined in 2016, it already existed in VB.NET. My path with 4Change has been about evolving a product in use, as part of a team, across several layers of the application.",
    },
    roleSteps: [
      {
        title: { 'pt-BR': 'Aplicação mobile — 2016', en: 'Mobile app — 2016' },
        text: {
          'pt-BR':
            'Desenvolvimento de um aplicativo em Xamarin e C#, para Android e iOS, integrado ao sistema VB.NET existente, levando funcionalidades da plataforma aos dispositivos móveis.',
          en: "Built a Xamarin/C# app for Android and iOS, integrated with the existing VB.NET system, bringing the platform's features to mobile devices.",
        },
      },
      {
        title: { 'pt-BR': 'Sustentação e evolução', en: 'Maintenance and evolution' },
        text: {
          'pt-BR':
            'Participação contínua na manutenção, na melhoria e no desenvolvimento de funcionalidades de uma plataforma em produção.',
          en: 'Ongoing work on maintenance, improvements, and new features for a platform in production.',
        },
      },
      {
        title: { 'pt-BR': 'Modernização tecnológica', en: 'Technology modernization' },
        text: {
          'pt-BR':
            'Participação na evolução para uma arquitetura moderna, com Angular, APIs em .NET/C# e SQL Server, atuando em frontend, backend, banco de dados, arquitetura e UX/UI.',
          en: 'Took part in its move to a modern architecture with Angular, .NET/C# APIs, and SQL Server, working on the frontend, backend, database, architecture, and UX/UI.',
        },
      },
      {
        title: { 'pt-BR': 'Evolução atual', en: 'Current evolution' },
        text: {
          'pt-BR':
            'Ampliação da gestão para novos tipos de ativos corporativos, incluindo desktops.',
          en: 'Expanding management to new types of corporate assets, including desktops.',
        },
      },
    ],
    technologies: ['Angular', '.NET', 'C#', 'SQL Server'],
    technologyGroups: [
      {
        label: { 'pt-BR': 'Origem e integração mobile', en: 'Origin and mobile integration' },
        items: ['VB.NET', 'Xamarin', 'C#', 'Android', 'iOS'],
        note: {
          'pt-BR':
            'O VB.NET é o sistema legado, que já existia; o aplicativo Xamarin se integrou a ele.',
          en: 'VB.NET is the legacy system, which already existed; the Xamarin app was integrated with it.',
        },
      },
      {
        label: { 'pt-BR': 'Arquitetura modernizada', en: 'Modernized architecture' },
        items: ['Angular', '.NET / ASP.NET Core Web API', 'C#', 'SQL Server', 'REST APIs'],
        featured: true,
      },
    ],
    timeline: [
      {
        when: { 'pt-BR': '2016', en: '2016' },
        text: {
          'pt-BR': 'Início da atuação e desenvolvimento do aplicativo em Xamarin.',
          en: 'Joined the product and built the Xamarin app.',
        },
      },
      {
        when: { 'pt-BR': 'Evolução contínua', en: 'Ongoing' },
        text: {
          'pt-BR': 'Manutenção e desenvolvimento de funcionalidades.',
          en: 'Maintenance and new features.',
        },
      },
      {
        when: { 'pt-BR': 'Modernização', en: 'Modernization' },
        text: {
          'pt-BR': 'Evolução tecnológica para Angular, .NET e SQL Server.',
          en: 'Technology upgrade to Angular, .NET, and SQL Server.',
        },
      },
      {
        when: { 'pt-BR': '2026', en: '2026' },
        text: {
          'pt-BR': 'Participação na ampliação para a gestão de desktops.',
          en: 'Working on the expansion to desktop management.',
        },
      },
    ],
    learnings: {
      'pt-BR': [
        'Evoluir um sistema existente, respeitando o que já funciona para quem o usa.',
        'Entender as restrições de um software em produção, em que cada mudança precisa conviver com a operação.',
        'Equilibrar modernização tecnológica e continuidade operacional.',
        'Trabalhar nas diferentes camadas de uma aplicação: banco de dados, APIs, frontend e interface.',
        'Desenhar interfaces a partir das necessidades reais de quem usa o sistema no dia a dia.',
        'Manter um produto relevante por um longo período.',
      ],
      en: [
        'Evolve an existing system while respecting what already works for the people who use it.',
        'Understand the constraints of software in production, where every change has to coexist with day-to-day operations.',
        'Balance technology modernization with operational continuity.',
        'Work across the different layers of an application: database, APIs, frontend, and interface.',
        'Design interfaces around the real needs of the people who use the system every day.',
        'Keep a product relevant over a long period.',
      ],
    },
    ongoing: true,
    tags: ['product'],
    cartridge: collectionCartridge('mc-007', 473, 'right', {
      'pt-BR':
        'Ilustração em pixel art: um centro de gestão de ativos de TI com smartphones, notebooks, desktops e um servidor ligados por linhas de dados, e prateleiras com equipamentos etiquetados, com o título 4CHANGE.',
      en: 'Pixel-art illustration: an IT asset management hub with smartphones, laptops, desktops, and a server linked by data lines, and shelves of labeled equipment, with the title 4CHANGE.',
    }),
    experiences: [],
    links: [],
  },
];

/** Regra conservadora: somente `publication: 'approved'` é público (ausente = não publica). */
export function isPublished(project: Pick<Project, 'publication'>): boolean {
  return project.publication === 'approved';
}

/** Projetos autorizados para o Inventory público. */
export function publishedProjects(projects: readonly Project[] = PROJECTS): readonly Project[] {
  return projects.filter(isPublished);
}

/**
 * Projetos exibidos no Inventory. Além de publicado, o projeto precisa de artwork aprovado:
 * o placeholder "PROJECT ARTWORK" só pode aparecer em desenvolvimento/checkpoint
 * (`allowArtworkPlaceholder` = `isDevMode()` no componente).
 */
export function inventoryProjects(
  allowArtworkPlaceholder: boolean,
  projects: readonly Project[] = PROJECTS,
): readonly Project[] {
  return publishedProjects(projects).filter(
    (project) => allowArtworkPlaceholder || project.cartridge.artwork !== undefined,
  );
}
