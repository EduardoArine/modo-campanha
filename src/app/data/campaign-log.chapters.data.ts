import { CampaignLogChapter, CampaignLogImage, CampaignLogPhoto } from '../models';
import { PLAYER_PROFILE } from './profile.data';

const ASSETS = 'assets/campaign-log/';

/**
 * Arte do Diário de Campanha (D-091): derivados WebP gerados por design/source/diary/build-diary.mjs
 * a partir dos mestres PNG (cenários 16:9 em maps/, imagens editoriais 3:2 em stories/).
 */
function diaryArt(
  dir: 'maps' | 'stories',
  name: string,
  widths: readonly number[],
  height: number,
): CampaignLogImage {
  const max = widths[widths.length - 1];
  const base = 'assets/diary/' + dir + '/' + name + '-';
  return {
    src: base + max + '.webp',
    srcset: widths.map((w) => base + w + '.webp ' + w + 'w').join(', '),
    width: max,
    height,
  };
}
const MAP_WIDTHS = [640, 960, 1280, 1672];
const STORY_WIDTHS = [480, 720, 1080, 1536];

/** Derivados WebP (proporção original, sem filtro) das fotos fornecidas pelo Eduardo. */
function photo(
  name: string,
  widths: readonly number[],
  ratio: number,
  alt: CampaignLogPhoto['alt'],
): CampaignLogPhoto {
  const max = widths[widths.length - 1];
  return {
    src: ASSETS + name + '-' + max + '.webp',
    srcset: widths.map((w) => ASSETS + name + '-' + w + '.webp ' + w + 'w').join(', '),
    width: max,
    height: Math.round(max / ratio),
    alt,
  };
}

// CHAPTER 00 — ORIGIN (docs/15 §13). Relato pessoal real do Eduardo, com os textos fornecidos por
// ele (2026-10-17), sem alteração de fatos, cronologia ou intenção. Não é MOCK.
// Datas: só "c. 1991" é aproximada e informada; os demais checkpoints usam a época descrita por ele,
// sem inventar anos. O `summary` é a primeira frase do próprio texto (extração literal).
// Publicação: ainda NÃO entra em produção (CAMPAIGN_LOG_CHAPTERS vazio em campaign-log.data.ts)
// até o Eduardo congelar o capítulo; em desenvolvimento aparece antes da linha profissional.
export const ORIGIN_CHAPTER: CampaignLogChapter = {
  id: 'chapter-00-origin',
  number: '00',
  name: { 'pt-BR': 'ORIGEM', en: 'ORIGIN' },
  map: diaryArt('maps', 'ch00-origem', MAP_WIDTHS, 941),
  signature: {
    'pt-BR': 'A campanha começou muito antes do código.',
    en: 'The campaign started long before the code.',
  },
  entries: [
    {
      id: 'origin-first-contact',
      map: { x: 14, y: 72, label: 'below' },
      image: {
        ...diaryArt('stories', 'ch00-01-primeiro-contato', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: uma sala ao pôr do sol, com uma TV de tubo mostrando uma paisagem, um console e um controle sobre o tapete.',
          en: 'Pixel-art illustration: a living room at sunset, with a CRT TV showing a landscape, a console, and a controller on the rug.',
        },
      },
      code: { 'pt-BR': 'PRIMEIRO CONTATO', en: 'FIRST CONTACT' },
      when: { approx: 1991 },
      title: { 'pt-BR': 'Primeiro contato', en: 'First Contact' },
      summary: {
        'pt-BR':
          'Minha história com os videogames começou por volta de 1991, na casa dos meus primos, diante de um Atari 2600.',
        en: "My story with video games began around 1991, at my cousins' house, in front of an Atari 2600.",
      },
      story: {
        'pt-BR': [
          'Minha história com os videogames começou por volta de 1991, na casa dos meus primos, diante de um Atari 2600. Eu tinha uns seis anos e lembro da sensação de ver todo mundo reunido, jogando e se divertindo. Aquilo parecia mágico.',
          'Por volta dos sete anos, finalmente ganhei meu próprio Atari. Pitfall, Enduro e River Raid fizeram parte de muitas horas da minha infância. Foi ali que começou uma paixão que nunca mais me deixou.',
        ],
        en: [
          "My story with video games began around 1991, at my cousins' house, in front of an Atari 2600. I was about six, and I still remember everyone gathered around, playing and having fun. It felt like magic.",
          "Around age seven, I finally got an Atari of my own. Pitfall, Enduro, and River Raid became a big part of my childhood. That's where a lifelong passion began.",
        ],
      },
    },
    {
      id: 'origin-rental-store-years',
      map: { x: 32, y: 56, label: 'above' },
      image: {
        ...diaryArt('stories', 'ch00-02-escola-locadoras', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: uma locadora de jogos ao entardecer, com estantes de caixas de jogos, um balcão e uma TV ligada.',
          en: 'Pixel-art illustration: a video game rental store at dusk, with shelves of game boxes, a counter, and a TV turned on.',
        },
      },
      code: { 'pt-BR': 'OS ANOS DE LOCADORA', en: 'THE RENTAL STORE YEARS' },
      when: { era: { 'pt-BR': 'Época do SNES', en: 'SNES era' } },
      title: { 'pt-BR': 'A escola das locadoras', en: 'The Rental Store Years' },
      summary: {
        'pt-BR': 'Quando conheci o Super Nintendo, aquela paixão ganhou ainda mais força.',
        en: 'When I discovered the Super Nintendo, that passion grew even stronger.',
      },
      story: {
        'pt-BR': [
          'Quando conheci o Super Nintendo, aquela paixão ganhou ainda mais força. Como eu não tinha um, passava horas na casa de um amigo jogando Super Mario World, Mega Man X e tantos outros jogos.',
          'As locadoras também faziam parte dessa história. Muitas vezes eu ficava por perto esperando uma oportunidade de jogar ou ajudando alguém a passar de uma fase difícil. Lembro até hoje de esconder o controle debaixo da camiseta para ninguém descobrir como eu fazia o fatality do Scorpion no primeiro Mortal Kombat.',
        ],
        en: [
          "When I discovered the Super Nintendo, that passion grew even stronger. I didn't own one yet, so I spent hours at a friend's house playing Super Mario World, Mega Man X, and many other games.",
          "Rental stores were a big part of those years, too. I'd often hang around waiting for a chance to play or helping someone get past a difficult section. I still remember hiding the controller under my shirt so nobody could see how I performed Scorpion's fatality in the first Mortal Kombat.",
        ],
      },
    },
    {
      id: 'origin-ladybug-wish',
      map: { x: 49, y: 65, label: 'below' },
      image: {
        ...diaryArt('stories', 'ch00-03-pedido-joaninha', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: um cartão dobrado com uma joaninha, sobre uma escrivaninha ao pôr do sol, ao lado de um controle.',
          en: 'Pixel-art illustration: a folded card with a ladybug on a desk at sunset, next to a controller.',
        },
      },
      code: { 'pt-BR': 'O PEDIDO À JOANINHA', en: 'THE LADYBUG WISH' },
      when: { era: { 'pt-BR': 'Infância', en: 'Childhood' } },
      title: { 'pt-BR': 'O pedido à joaninha', en: 'The Ladybug Wish' },
      summary: {
        'pt-BR': 'Meu primeiro Super Nintendo chegou de um jeito que nunca esqueci.',
        en: "I got my first Super Nintendo in a way I'll never forget.",
      },
      story: {
        'pt-BR': [
          'Meu primeiro Super Nintendo chegou de um jeito que nunca esqueci. Um dia, na casa da minha avó, uma joaninha pousou no meu dedo. Lembrei daquela história de fazer um pedido e soltá-la para voar. Claro que pedi um Super Nintendo.',
          'Naquele mesmo dia, minha mãe apareceu dizendo que tinha uma surpresa. Quando cheguei em casa, lá estava ele, novinho, com Prehistorik Man. Até hoje não sei se foi coincidência ou sorte. Só sei que foi um dos momentos mais felizes daquela época.',
        ],
        en: [
          "I got my first Super Nintendo in a way I'll never forget. One day at my grandmother's house, a ladybug landed on my finger. I remembered the story about making a wish and letting it fly away. Of course, I wished for a Super Nintendo.",
          "That same day, my mother told me she had a surprise. When I got home, there it was, brand new, with Prehistorik Man. I still don't know whether it was coincidence or luck. I just know it was one of the happiest moments of those years.",
        ],
      },
    },
    {
      id: 'origin-earned-not-given',
      map: { x: 68, y: 42, label: 'above' },
      image: {
        ...diaryArt('stories', 'ch00-04-conquista-trabalho', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: uma escrivaninha com um caderno aberto, um lápis, uma xícara e um monitor antigo, diante de uma janela ao pôr do sol.',
          en: 'Pixel-art illustration: a desk with an open notebook, a pencil, a mug, and an old monitor, by a window at sunset.',
        },
      },
      code: { 'pt-BR': 'CONQUISTADO, NÃO DADO', en: 'EARNED, NOT GIVEN' },
      when: { era: { 'pt-BR': 'Época do PlayStation', en: 'PlayStation era' } },
      title: {
        'pt-BR': 'Uma conquista construída com trabalho',
        en: 'Earned Through Work',
      },
      summary: {
        'pt-BR':
          'Quando quis meu próprio PlayStation, minha mãe deixou claro que eu precisaria trabalhar para comprá-lo.',
        en: "When I wanted a PlayStation of my own, my mother made it clear that I'd have to work for it.",
      },
      story: {
        'pt-BR': [
          'Depois vieram o Nintendo 64 e o primeiro PlayStation. Eu conhecia esses consoles principalmente nas locadoras e na casa de amigos, porque ter um em casa não era simples.',
          'Quando quis meu próprio PlayStation, minha mãe deixou claro que eu precisaria trabalhar para comprá-lo. E foi assim que aconteceu: trabalhando como servente de pedreiro, consegui juntar o dinheiro e conquistar meu console. Foi uma daquelas experiências que fazem a gente dar ainda mais valor ao que consegue.',
        ],
        en: [
          "Then came the Nintendo 64 and the original PlayStation. I mostly experienced those consoles at rental stores and friends' houses, because owning one wasn't easy.",
          "When I wanted a PlayStation of my own, my mother made it clear that I'd have to work for it. So I did. Working as a construction laborer's assistant, I saved enough money to buy my console. It was one of those experiences that makes you appreciate something even more because of what it took to get there.",
        ],
      },
    },
    {
      id: 'origin-built-from-memories',
      map: { x: 84, y: 60, label: 'below' },
      image: {
        ...diaryArt('stories', 'ch00-05-colecao-historias', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: estantes com caixas de jogos, cartuchos e controles, ao lado de uma janela ao pôr do sol.',
          en: 'Pixel-art illustration: shelves with game boxes, cartridges, and controllers, next to a window at sunset.',
        },
      },
      code: { 'pt-BR': 'FEITO DE MEMÓRIAS', en: 'BUILT FROM MEMORIES' },
      when: { era: { 'pt-BR': 'Vida adulta', en: 'Adulthood' } },
      title: { 'pt-BR': 'Uma coleção de histórias', en: 'A Collection of Stories' },
      summary: {
        'pt-BR':
          'Com o passar dos anos, comecei a colecionar os consoles que marcaram minha infância e juventude.',
        en: 'As the years went by, I started collecting the consoles that had been part of my childhood and teenage years.',
      },
      story: {
        'pt-BR': [
          'Com o passar dos anos, comecei a colecionar os consoles que marcaram minha infância e juventude. Nem sempre consegui manter todos: em alguns momentos precisei vender alguns deles e, depois, fui tentando recuperá-los aos poucos. Amigos também fizeram parte dessa história, inclusive me ajudando a reencontrar peças da coleção.',
          'Eu sempre sonhei em ter um espaço para expor meus videogames e poder jogar neles. Depois de imaginar vários projetos, resolvi construir o móvel com minhas próprias mãos. As fotos mostram um pouco desse sonho ganhando forma. Para mim, cada console guarda muito mais do que jogos: guarda histórias.',
        ],
        en: [
          "As the years went by, I started collecting the consoles that had been part of my childhood and teenage years. I couldn't always keep them all. At different points, I had to sell some and gradually worked on finding them again. Friends became part of that story too, sometimes helping me rebuild the collection.",
          "I'd always dreamed of having a space to display my consoles and play them. After sketching out several ideas, I decided to build the furniture myself. The photos capture part of that dream taking shape. To me, every console holds much more than games. It holds memories.",
        ],
      },
      // Fotos da coleção e do móvel construído pelo Eduardo (fornecidas por ele, 2026-10-17).
      photos: [
        photo('origin/collection-front', [480, 720], 3 / 4, {
          'pt-BR':
            'Móvel de madeira com duas prateleiras iluminadas por luz colorida, cheias de consoles retrô; acima dele, uma TV na parede e bonecos colecionáveis.',
          en: 'Wooden cabinet with two shelves lit by colored light and filled with retro consoles; above it, a wall-mounted TV and collectible figures.',
        }),
        photo('origin/collection-wide', [640, 960], 4 / 3, {
          'pt-BR':
            'Vista frontal do mesmo móvel: consoles retrô alinhados nas duas prateleiras iluminadas e uma TV ligada acima.',
          en: 'Front view of the same cabinet: retro consoles lined up on both lit shelves and a TV switched on above.',
        }),
      ],
    },
  ],
};

// CHAPTER 01 — DO CONTROLE AO CÓDIGO (docs/15 §14). Texto pt fornecido pelo Eduardo (2026-10-17),
// sem alteração de fatos; ênfases (negrito/itálico) viram texto simples. Inglês: tradução fiel,
// PENDENTE de aprovação. Datas: só as informadas (2013, 2016, 2017; período 2013–2017).
export const FATEC_CHAPTER: CampaignLogChapter = {
  id: 'chapter-01-fatec',
  number: '01',
  name: { 'pt-BR': 'DO CONTROLE AO CÓDIGO', en: 'FROM CONTROLLER TO CODE' },
  map: diaryArt('maps', 'ch01-controle-codigo', MAP_WIDTHS, 941),
  period: { start: 2013, end: 2017 },
  context: {
    'pt-BR': 'Tecnologia em Jogos Digitais · FATEC Americana',
    en: 'Digital Games Technology · FATEC Americana',
  },
  signature: {
    'pt-BR': 'O que começou como paixão na infância se transformou em uma escolha de vida.',
    en: 'What started as a childhood passion became the path I chose.',
  },
  entries: [
    {
      id: 'fatec-passion-became-choice',
      map: { x: 13, y: 70, label: 'below' },
      image: {
        ...diaryArt('stories', 'ch01-01-paixao-escolha', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: a mesa de um laboratório de faculdade ao pôr do sol, com um notebook aberto num editor de jogo 2D, um caderno de esboços e um controle; pela janela, o campus.',
          en: 'Pixel-art illustration: a desk in a college lab at sunset, with a laptop open in a 2D game editor, a sketchbook, and a controller; the campus seen through the window.',
        },
      },
      when: { year: 2013 },
      title: { 'pt-BR': 'Quando a paixão virou escolha', en: 'When Passion Became a Choice' },
      summary: {
        'pt-BR': 'Em 2013, comecei a graduação em Jogos Digitais na FATEC Americana.',
        en: 'In 2013, I started my degree in Digital Games at FATEC Americana.',
      },
      story: {
        'pt-BR': [
          'Depois de tantos anos entre consoles, locadoras e jogos que marcaram minha infância, chegou a hora de conhecer o outro lado da tela.',
          'Em 2013, comecei a graduação em Jogos Digitais na FATEC Americana. Eu já sabia o quanto gostava de videogames. Agora queria aprender como eles eram feitos e transformar aquela paixão em algo que eu também pudesse construir.',
        ],
        en: [
          'After so many years of consoles, rental stores, and the games that shaped my childhood, it was time to see the other side of the screen.',
          'In 2013, I started my degree in Digital Games at FATEC Americana. I already knew how much I loved video games. Now I wanted to learn how they were made and turn that passion into something I could build myself.',
        ],
      },
    },
    {
      id: 'fatec-aedes-revenge',
      map: { x: 31, y: 64, label: 'above' },
      image: {
        ...diaryArt('stories', 'ch01-02-aedes-revenge', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: uma mesa à noite, com um monitor mostrando um jogo 2D em desenvolvimento estrelado por um mosquito, um caderno com esboços do personagem e post-its.',
          en: 'Pixel-art illustration: a desk at night, with a monitor showing a 2D game in development starring a mosquito, a sketchbook with character drawings, and sticky notes.',
        },
      },
      when: { era: { 'pt-BR': 'Durante a graduação', en: 'During college' } },
      title: {
        'pt-BR': 'Aedes Revenge — Meu primeiro grande projeto',
        en: 'Aedes Revenge — My First Big Project',
      },
      summary: {
        'pt-BR':
          'Foi durante a faculdade que nasceu o Aedes Revenge, um jogo 2D para dispositivos móveis que abordava a conscientização sobre a dengue de uma perspectiva diferente: a do próprio mosquito.',
        en: "Aedes Revenge was born during college: a 2D mobile game that approached dengue awareness from a different perspective — the mosquito's own.",
      },
      story: {
        'pt-BR': [
          'Foi durante a faculdade que nasceu o Aedes Revenge, um jogo 2D para dispositivos móveis que abordava a conscientização sobre a dengue de uma perspectiva diferente: a do próprio mosquito.',
          'O projeto começou em grupo, mas, com a saída dos outros integrantes, continuei desenvolvendo o jogo sozinho. Trabalhei com Unity, C#, mecânicas, interfaces, personagens e diferentes desafios de desenvolvimento.',
          'Foi uma oportunidade de colocar em prática o que eu aprendia e descobrir, na experiência, quanto trabalho existe por trás de um jogo.',
        ],
        en: [
          "Aedes Revenge was born during college: a 2D mobile game that approached dengue awareness from a different perspective — the mosquito's own.",
          'The project started as a group effort, but after the other members left, I kept developing the game on my own. I worked with Unity, C#, mechanics, interfaces, characters, and a wide range of development challenges.',
          'It was a chance to put what I was learning into practice and discover, firsthand, how much work goes into making a game.',
        ],
      },
    },
    {
      id: 'fatec-first-best-game',
      map: { x: 49, y: 74, label: 'below' },
      image: {
        ...diaryArt('stories', 'ch01-03-melhor-jogo', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: um salão de mostra de jogos ao entardecer, com um notebook rodando o jogo do mosquito e um troféu ao lado; ao fundo, pessoas visitam outros estandes.',
          en: 'Pixel-art illustration: a game showcase hall at dusk, with a laptop running the mosquito game and a trophy beside it; in the background, people visit other booths.',
        },
      },
      when: { year: 2016 },
      title: { 'pt-BR': 'Meu primeiro Melhor Jogo', en: 'My First Best Game Award' },
      summary: {
        'pt-BR':
          'Em 2016, o Aedes Revenge recebeu o prêmio de Melhor Jogo — Categoria Acadêmica, no FAEL 2016 da FATEC Americana.',
        en: "In 2016, Aedes Revenge won Best Game — Academic Category at FATEC Americana's FAEL 2016.",
      },
      story: {
        'pt-BR': [
          'Em 2016, o Aedes Revenge recebeu o prêmio de Melhor Jogo — Categoria Acadêmica, no FAEL 2016 da FATEC Americana.',
          'Ver um projeto que eu estava desenvolvendo ser reconhecido foi uma conquista marcante. Era a primeira vez que aquele sonho de infância ganhava também a forma de um trabalho premiado.',
        ],
        en: [
          "In 2016, Aedes Revenge won Best Game — Academic Category at FATEC Americana's FAEL 2016.",
          'Seeing a project I was developing receive recognition was a memorable achievement. It was the first time that childhood dream also took the shape of award-winning work.',
        ],
      },
    },
    {
      id: 'fatec-real-players',
      map: { x: 67, y: 52, label: 'above' },
      image: {
        ...diaryArt('stories', 'ch01-04-jogadores-reais', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: mãos segurando dois celulares com o jogo do mosquito sobre uma mesa, ao lado de um caderno com gráficos e post-its com estrela e polegar para cima.',
          en: 'Pixel-art illustration: hands holding two phones running the mosquito game over a table, next to a notebook with charts and sticky notes with a star and a thumbs-up.',
        },
      },
      when: { year: 2017 },
      title: {
        'pt-BR': 'Um jogo de verdade, com jogadores de verdade',
        en: 'A Real Game with Real Players',
      },
      summary: {
        'pt-BR': 'O Aedes Revenge chegou ao Google Play em maio de 2017.',
        en: 'Aedes Revenge launched on Google Play in May 2017.',
      },
      story: {
        'pt-BR': [
          'O Aedes Revenge chegou ao Google Play em maio de 2017.',
          'A versão beta tinha três fases jogáveis e um chefe. Mais importante que colocar o jogo no ar foi começar a observar como pessoas reais interagiam com ele.',
          'As avaliações e pesquisas mostraram o que funcionava e também o que precisava melhorar. Foi uma experiência que me ajudou a entender que desenvolver não é apenas fazer algo funcionar: é pensar em quem vai usar.',
        ],
        en: [
          'Aedes Revenge launched on Google Play in May 2017.',
          'The beta version had three playable levels and a boss. More important than getting the game online was starting to see how real people interacted with it.',
          "Reviews and surveys showed what worked and what needed improvement. That experience helped me understand that development isn't just about making something work: it's about thinking about the people who will use it.",
        ],
      },
    },
    {
      id: 'fatec-two-awards-capstone',
      map: { x: 86, y: 68, label: 'below' },
      image: {
        ...diaryArt('stories', 'ch01-05-premios-tcc', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: uma mesa ao pôr do sol com dois troféus, um trabalho encadernado, um capelo de formatura, um notebook com o jogo do mosquito e um console antigo de madeira com joystick.',
          en: 'Pixel-art illustration: a desk at sunset with two trophies, a bound thesis, a graduation cap, a laptop running the mosquito game, and an old woodgrain console with a joystick.',
        },
      },
      when: { year: 2017 },
      title: {
        'pt-BR': 'Dois prêmios e um TCC nota 10',
        en: 'Two Awards and a Perfect Capstone Score',
      },
      summary: {
        'pt-BR':
          'Em 2017, o Aedes Revenge foi novamente reconhecido como Melhor Jogo — Categoria Acadêmica, desta vez na Mostra de Jogos da FATEC Americana.',
        en: "In 2017, Aedes Revenge was once again named Best Game — Academic Category, this time at FATEC Americana's Game Showcase (Mostra de Jogos).",
      },
      story: {
        'pt-BR': [
          'Em 2017, o Aedes Revenge foi novamente reconhecido como Melhor Jogo — Categoria Acadêmica, desta vez na Mostra de Jogos da FATEC Americana.',
          'Para fechar essa etapa, apresentei o projeto como meu Trabalho de Conclusão de Curso e recebi nota 10.',
          'Depois de tantos desafios, terminar a graduação com dois prêmios e essa avaliação foi uma das minhas maiores conquistas acadêmicas.',
          'A paixão que começou diante de um Atari agora tinha se transformado em conhecimento, código e um jogo criado por mim.',
        ],
        en: [
          "In 2017, Aedes Revenge was once again named Best Game — Academic Category, this time at FATEC Americana's Game Showcase (Mostra de Jogos).",
          'To close that chapter, I presented it as my capstone project (TCC) and received a perfect 10.',
          'After so many challenges, finishing my degree with two awards and that grade was one of my greatest academic achievements.',
          'The passion that began in front of an Atari had now become knowledge, code, and a game I created myself.',
        ],
      },
      // TCC no Repositório Institucional do Conhecimento (CPS), fornecido pelo Eduardo (2026-10-17).
      links: [
        {
          kind: 'academic',
          label: {
            'pt-BR': 'Ler o TCC (PDF)',
            en: 'Read the capstone project (PDF, in Portuguese)',
          },
          url: 'https://ric.cps.sp.gov.br/bitstream/123456789/720/1/20171S_ARINEJUNIOREduardoLuiz_OD0153.pdf',
        },
      ],
    },
  ],
  closing: {
    'pt-BR': 'A campanha estava apenas começando.',
    en: 'The campaign was only just beginning.',
  },
};

// CHAPTER 02 — DO CÓDIGO AO PRODUTO (docs/15 §15–§16): do ScoutEvo (2018) até hoje, em aberto.
// Textos pt/en dos checkpoints fornecidos pelo Eduardo (2026-10-17). Nome, período e assinatura
// definidos por ele (D-073); aprovado editorialmente para produção (D-074).
export const CHAPTER_02: CampaignLogChapter = {
  id: 'chapter-02',
  number: '02',
  name: { 'pt-BR': 'DO CÓDIGO AO PRODUTO', en: 'FROM CODE TO PRODUCT' },
  map: diaryArt('maps', 'ch02-codigo-produto', MAP_WIDTHS, 941),
  period: { start: 2018, end: 'present' },
  signature: {
    'pt-BR':
      'Cada projeto trouxe um novo desafio. Cada desafio ampliou minha maneira de criar produtos digitais.',
    en: 'Every project brought a new challenge. Every challenge broadened the way I build digital products.',
  },
  entries: [
    {
      id: 'scoutevo',
      map: { x: 13, y: 58, label: 'below' },
      image: {
        ...diaryArt('stories', 'ch02-01-scoutevo', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: um campo de futebol ao entardecer, com um jovem jogador conduzindo a bola ao longe e, em primeiro plano, um tablet num banco mostrando dados de jogadores.',
          en: 'Pixel-art illustration: a football field at dusk, with a young player dribbling in the distance and, in the foreground, a tablet on a bench showing player data.',
        },
      },
      code: { 'pt-BR': 'SCOUTEVO', en: 'SCOUTEVO' },
      when: { year: 2018 },
      title: { 'pt-BR': 'Quando uma ideia entrou em campo', en: 'When an Idea Took the Field' },
      summary: {
        'pt-BR':
          'Depois da faculdade, um dos projetos mais marcantes de que participei foi o ScoutEvo, uma plataforma criada para ajudar a descobrir novos talentos no futebol.',
        en: 'After college, one of the most memorable projects I worked on was ScoutEvo, a platform designed to help discover young football talent.',
      },
      story: {
        'pt-BR': [
          'Depois da faculdade, um dos projetos mais marcantes de que participei foi o ScoutEvo, uma plataforma criada para ajudar a descobrir novos talentos no futebol.',
          'A ideia era permitir a coleta de informações de jovens jogadores por meio de um aplicativo e reunir esses dados em uma plataforma que pudesse apoiar a análise de atletas por clubes brasileiros e internacionais.',
          'Fiquei responsável pela arquitetura da solução, pelo desenvolvimento do aplicativo de coleta com Unity e C#, pelo frontend web em ASP.NET com C# e também por todo o design das interfaces. A parte de banco de dados ficou sob responsabilidade de outro integrante.',
          'Em 2018, nossa solução venceu uma maratona de inovação ligada ao Flamengo. Foi uma conquista importante e uma oportunidade de trabalhar em um produto que conectava tecnologia, esporte e um problema real.',
          'O ScoutEvo marcou uma evolução na minha trajetória: eu já não estava apenas desenvolvendo jogos. Estava usando o conhecimento que havia construído para criar soluções digitais com outras finalidades.',
        ],
        en: [
          'After college, one of the most memorable projects I worked on was ScoutEvo, a platform designed to help discover young football talent.',
          'The idea was to collect scouting information about young players through an app and bring that data together in a platform that could support talent evaluation by clubs in Brazil and abroad.',
          'I was responsible for the solution architecture, developing the scouting app with Unity and C#, building the web frontend with ASP.NET and C#, and designing the interfaces. Database development was handled by another team member.',
          'In 2018, our solution won an innovation competition connected to Flamengo. It was an important achievement and an opportunity to work on a product that brought technology, sport, and a real-world challenge together.',
          "ScoutEvo marked a new stage in my journey. I was no longer just developing games. I was applying what I'd learned to build digital solutions for different purposes.",
        ],
      },
      // Montagem fornecida pelo Eduardo (2026-10-17), usada como ele enviou: reportagem do O Globo e
      // anúncio do vencedor do FUTEBOOM. Evidência documental da vitória.
      photos: [
        photo('scoutevo/scoutevo-win', [480, 894], 894 / 1112, {
          'pt-BR':
            'Montagem com a reportagem do O Globo "Flamengo faz \'maratona\' de inovação em São Paulo para aprimorar gestão" e o anúncio do FUTEBOOM "And the winner is: ScoutEvo / Ecossistema Escalável de Talentos", com o escudo do Flamengo e o logo do ScoutEvo.',
          en: 'Collage with the O Globo report on Flamengo\'s innovation "marathon" in São Paulo and the FUTEBOOM announcement "And the winner is: ScoutEvo / Ecossistema Escalável de Talentos", with the Flamengo crest and the ScoutEvo logo.',
        }),
      ],
      // Reportagem do O Globo sobre a maratona (10/04/2018), fornecida pelo Eduardo (2026-10-17).
      // Trata do evento, não do resultado; conteúdo para assinantes.
      links: [
        {
          kind: 'press',
          label: {
            'pt-BR': 'Reportagem do O Globo sobre a maratona (2018)',
            en: 'O Globo report on the competition (2018, in Portuguese)',
          },
          url: 'https://oglobo.globo.com/esportes/flamengo-faz-maratona-de-inovacao-em-sao-paulo-para-aprimorar-gestao-22577762',
        },
      ],
    },
    {
      // Textos pt/en fornecidos pelo Eduardo (2026-10-17), sem alteração; ênfases viram texto simples.
      id: 'eos',
      map: { x: 36, y: 62, label: 'above' },
      image: {
        ...diaryArt('stories', 'ch02-02-eos', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: uma mesa diante de uma janela com vista para a cidade e dois hospitais, com um monitor mostrando uma rota num mapa e uma maleta de transporte médico; lá fora, um helicóptero e uma van.',
          en: 'Pixel-art illustration: a desk by a window overlooking the city and two hospitals, with a monitor showing a route on a map and a medical transport case; outside, a helicopter and a van.',
        },
      },
      code: { 'pt-BR': 'EOS', en: 'EOS' },
      when: { year: 2019 },
      title: {
        'pt-BR': 'Tecnologia em que cada minuto importa',
        en: 'Technology Where Every Minute Matters',
      },
      summary: {
        'pt-BR':
          'Depois de trabalhar com jogos e soluções para o esporte, participei de um projeto que me mostrou outra dimensão do desenvolvimento de produtos digitais: a possibilidade de apoiar processos diretamente ligados à saúde.',
        en: 'After working on games and sports technology, I took part in a project that showed me another dimension of digital product development: supporting processes directly connected to healthcare.',
      },
      story: {
        'pt-BR': [
          'Depois de trabalhar com jogos e soluções para o esporte, participei de um projeto que me mostrou outra dimensão do desenvolvimento de produtos digitais: a possibilidade de apoiar processos diretamente ligados à saúde.',
          'O EOS — Plataforma Inteligente para Logística de Doação e Transplante de Órgãos foi criado para auxiliar o planejamento do transporte de órgãos e equipes médicas, considerando rotas, modalidades de transporte, tempo de deslocamento e os limites de preservação dos órgãos.',
          'Participei da engenharia da solução e fui responsável por todo o frontend da aplicação web, desenvolvido com ASP.NET e C#.',
          'O desafio ia além de construir telas. Era necessário organizar informações complexas e apresentá-las de maneira clara para apoiar profissionais que precisavam tomar decisões sob restrições de tempo.',
          'Em setembro de 2019, o sistema foi disponibilizado à Central Estadual de Transplantes de São Paulo e divulgado pela Unicamp. A pesquisa que fundamentou a solução também ganhou projeção internacional, com um artigo publicado na revista científica Case Studies on Transport Policy, em 2021.',
          'Foi um projeto que reforçou algo importante para mim: desenvolver produtos digitais não é apenas trabalhar com tecnologia. É entender problemas reais e construir soluções que possam fazer diferença.',
        ],
        en: [
          'After working on games and sports technology, I took part in a project that showed me another dimension of digital product development: supporting processes directly connected to healthcare.',
          'EOS — Intelligent Platform for Organ Donation and Transplant Logistics was designed to assist in planning the transportation of organs and medical teams, considering routes, transportation modes, travel times, and organ preservation constraints.',
          "I contributed to the solution's engineering and was responsible for the entire web application frontend, built with ASP.NET and C#.",
          'The challenge went beyond building screens. It meant organizing complex information and presenting it clearly to support professionals making time-sensitive decisions.',
          "In September 2019, the system was made available to São Paulo's State Transplant Center and featured by Unicamp. The underlying research also gained international academic visibility through a paper published in Case Studies on Transport Policy in 2021.",
          "This project reinforced something important for me: building digital products isn't just about technology. It's about understanding real problems and creating solutions that can make a difference.",
        ],
      },
      // Referências fornecidas pelo Eduardo (2026-10-17), verificadas (título, data, autoria via
      // OpenAlex/DOI). O artigo é de Henrique Barros Bellotti e Maria Teresa Françoso, não do
      // Eduardo. A notícia da Unicamp (27/09/2019) não cita o Eduardo: credita o sistema a Henrique
      // Bellotti, com apoio da Ativvus e do InCor. Datas distintas: disponibilização (set/2019),
      // imprensa (dez/2019) e artigo (2021).
      links: [
        {
          kind: 'launch',
          label: {
            'pt-BR':
              'Unicamp (FECFAU): "EOS - o primeiro sistema de planejamento de transporte de órgãos para transplante" (2019)',
            en: 'Unicamp (FECFAU): "EOS - o primeiro sistema de planejamento de transporte de órgãos para transplante" (2019, in Portuguese)',
          },
          url: 'https://www.fecfau.unicamp.br/pos/ppgec/noticias/1693',
          note: {
            'pt-BR':
              'Notícia de 27/09/2019 sobre a disponibilização do EOS à Central Estadual de Transplantes de SP.',
            en: "News from September 27, 2019, on EOS being made available to São Paulo's State Transplant Center.",
          },
        },
        {
          kind: 'paper',
          label: {
            'pt-BR':
              'System for transporting human organs: Case Studies on Transport Policy, Elsevier (2021)',
            en: 'System for transporting human organs: Case Studies on Transport Policy, Elsevier (2021)',
          },
          url: 'https://www.sciencedirect.com/science/article/abs/pii/S2213624X21000067',
          note: {
            'pt-BR': 'Artigo sobre o EOS, de Henrique Barros Bellotti e Maria Teresa Françoso.',
            en: 'Paper about EOS by Henrique Barros Bellotti and Maria Teresa Françoso.',
          },
        },
        {
          kind: 'paper',
          label: {
            'pt-BR': 'DOI permanente do artigo: 10.1016/j.cstp.2021.01.005',
            en: 'Permanent DOI of the paper: 10.1016/j.cstp.2021.01.005',
          },
          url: 'https://doi.org/10.1016/j.cstp.2021.01.005',
        },
        {
          kind: 'press',
          label: {
            'pt-BR':
              'Portal Afya: "Software pode reduzir tempo no transporte de órgãos para transplante" (2019)',
            en: 'Portal Afya: "Software pode reduzir tempo no transporte de órgãos para transplante" (2019, in Portuguese)',
          },
          url: 'https://portal.afya.com.br/saude/software-pode-reduzir-tempo-no-transporte-de-orgaos-para-transplante',
          note: {
            'pt-BR': 'Reportagem sobre a solução.',
            en: 'Press report about the solution.',
          },
        },
        {
          kind: 'record',
          label: {
            'pt-BR': 'Registro bibliográfico do artigo no OpenAlex',
            en: 'Bibliographic record of the paper on OpenAlex',
          },
          url: 'https://openalex.org/W3128566934',
        },
      ],
    },
    {
      // Textos pt/en fornecidos pelo Eduardo (2026-10-17); no en, "Axia Intelligence" nomeia a
      // evolução do produto (D-074). Data (D-073): início aproximado da participação dele em
      // 2020/2021, segundo o próprio relato (estimativa, não data documental), e evolução posterior,
      // sem ano final. A InfraFM cita o desenvolvimento em 2022.
      id: 'axia',
      map: { x: 62, y: 55, label: 'below' },
      image: {
        ...diaryArt('stories', 'ch02-03-axia', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: o saguão de um prédio de escritórios ao pôr do sol, com sensores conectados nas paredes, um painel de indicadores e um carrinho de limpeza.',
          en: 'Pixel-art illustration: an office building lobby at sunset, with connected sensors on the walls, a dashboard screen, and a cleaning cart.',
        },
      },
      code: { 'pt-BR': 'AXIA', en: 'AXIA' },
      when: { approx: [2020, 2021] },
      title: {
        'pt-BR': 'Da ideia à inteligência operacional',
        en: 'From Concept to Operational Intelligence',
      },
      summary: {
        'pt-BR':
          'Um dos projetos mais completos da minha trajetória foi a Axia, uma plataforma de inteligência operacional desenvolvida pela Ativvus/Arppen para transformar a gestão de limpeza e facilities por meio de tecnologia, dados e dispositivos conectados.',
        en: 'One of the most comprehensive projects in my career was Axia, an operational intelligence platform developed by Ativvus/Arppen to improve cleaning and facilities management through technology, data, and connected devices.',
      },
      story: {
        'pt-BR': [
          'Um dos projetos mais completos da minha trajetória foi a Axia, uma plataforma de inteligência operacional desenvolvida pela Ativvus/Arppen para transformar a gestão de limpeza e facilities por meio de tecnologia, dados e dispositivos conectados.',
          'Participei de toda a evolução do produto, desde sua idealização e engenharia inicial até as melhorias e expansões realizadas nos anos seguintes, incluindo a evolução para a Inteligência Axia.',
          'Minha atuação passou por diferentes camadas da solução: arquitetura, desenvolvimento do webapp em Angular, WebAPI em .NET com C#, SQL Server, design das interfaces e contribuições ao código embarcado dos dispositivos em C.',
          'Embora tenha trabalhado em praticamente todas as frentes, meu foco principal sempre esteve no desenvolvimento da plataforma web, das APIs e na experiência de uso.',
          'Acompanhar a Axia durante tantos ciclos de evolução foi uma experiência importante. O desafio não era apenas fazer tecnologias diferentes funcionarem juntas, mas transformar necessidades operacionais reais em um produto consistente, capaz de evoluir conforme novos problemas e oportunidades surgiam.',
          'Esse projeto consolidou minha visão de desenvolvimento de produtos digitais: participar das decisões, construir soluções, entender como são utilizadas e continuar evoluindo o produto.',
        ],
        en: [
          'One of the most comprehensive projects in my career was Axia, an operational intelligence platform developed by Ativvus/Arppen to improve cleaning and facilities management through technology, data, and connected devices.',
          "I contributed throughout the product's evolution, from its initial concept and engineering to subsequent improvements and expansions, including its evolution into Axia Intelligence.",
          "My work covered several parts of the solution: architecture, the Angular web application, .NET WebAPI with C#, SQL Server, interface design, and contributions to the devices' embedded C code.",
          'Although I worked across nearly every area, my primary focus remained on the web platform, APIs, and user experience.',
          "Being involved in Axia across multiple development cycles was an important experience. The challenge wasn't simply connecting different technologies, but turning real operational needs into a consistent product that could evolve as new challenges and opportunities emerged.",
          "This project strengthened my approach to digital product development: contributing to decisions, building solutions, understanding how they're used, and continuously improving the product.",
        ],
      },
      // Fonte pública funcional, verificada em 2026-10-17 (não cita o Eduardo). A página do produto
      // na Arppen (`arppen.com/axia.html`) está em 404 e não é substituída pela página inicial da
      // empresa (D-074): volta quando houver uma página específica funcional.
      links: [
        {
          kind: 'press',
          label: {
            'pt-BR':
              'InfraFM: "Como um pequeno dispositivo pode acabar com ruídos operacionais e prever afastamentos"',
            en: 'InfraFM: "Como um pequeno dispositivo pode acabar com ruídos operacionais e prever afastamentos" (in Portuguese)',
          },
          url: 'https://infrafm.com.br/Textos/3/23644/Como-um-pequeno-dispositivo-pode-acabar-com-ruidos-operacionais-e-prever-afastamentos',
          note: {
            'pt-BR':
              'Reportagem sobre a Axia, produto da Ativvus; cita o desenvolvimento em 2022. Data de publicação não informada.',
            en: 'Press report about Axia, a product by Ativvus; mentions its development in 2022. Publication date not stated.',
          },
        },
      ],
    },
    {
      // Textos pt/en fornecidos pelo Eduardo (2026-10-17), sem alteração; ênfases viram texto simples.
      // Descrição pública escrita por ele; nada interno da Comunidade ON. O resumo do card é próprio
      // (D-073), não a primeira frase da história. "Digital Games" no en (D-074).
      id: 'comunidade-on',
      map: { x: 86, y: 60, label: 'above' },
      image: {
        ...diaryArt('stories', 'ch02-04-comunidade-on', STORY_WIDTHS, 1024),
        alt: {
          'pt-BR':
            'Ilustração em pixel art: um espaço de trabalho colaborativo com terraços, plantas e uma grande árvore iluminada, com pessoas trabalhando em notebooks ao pôr do sol.',
          en: 'Pixel-art illustration: a collaborative workspace with terraces, plants, and a large lit tree, with people working on laptops at sunset.',
        },
      },
      code: { 'pt-BR': 'COMUNIDADE ON', en: 'COMUNIDADE ON' },
      when: { since: 2025 },
      title: {
        'pt-BR': 'Quando os games viraram uma linguagem de produto',
        en: 'When Games Became a Product Language',
      },
      summary: {
        'pt-BR':
          'Onde conecto engenharia, design de produto, inteligência artificial e gamificação para construir experiências digitais que vão além das interfaces tradicionais.',
        en: 'Where I bring together engineering, product design, artificial intelligence, and gamification to build digital experiences that go beyond traditional interfaces.',
      },
      story: {
        'pt-BR': [
          'Depois de experiências com jogos, plataformas esportivas, logística e sistemas conectados, cheguei à Comunidade ON, um projeto que reúne muito do que construí ao longo da minha trajetória.',
          'A proposta da ON é repensar o relacionamento entre marcas e consumidores, combinando tecnologia, inteligência artificial e pessoas em uma plataforma de atendimento.',
          'Minha atuação envolve o desenvolvimento das aplicações web, a integração com serviços e APIs e, principalmente, a construção e evolução das experiências de interface. Trabalho com Angular, TypeScript, .NET e C#, sempre buscando conectar o lado técnico às necessidades do produto e de quem utiliza a plataforma.',
          'Mas aqui surgiu uma conexão especialmente importante com minha história: a gamificação.',
          'A paixão por videogames, que me levou a estudar Jogos Digitais, passou a encontrar uma aplicação direta no meu trabalho. Conceitos como progressão, desafios, conquistas, feedback e reconhecimento começaram a fazer parte da maneira como penso e desenvolvo experiências digitais.',
          'O desafio não é simplesmente colocar elementos de jogos em uma interface. É utilizar essa linguagem para tornar experiências de trabalho e aprendizado mais claras, envolventes e significativas, sem comprometer a usabilidade e a eficiência operacional.',
          'Na Comunidade ON, tenho a oportunidade de trabalhar nessa interseção entre engenharia, produto, design, inteligência artificial e gamificação.',
          'É uma campanha que continua em desenvolvimento — e talvez uma das que melhor representam o profissional que me tornei.',
        ],
        en: [
          "After working on games, sports platforms, logistics solutions, and connected systems, I joined Comunidade ON, a project that brings together many of the things I've learned throughout my career.",
          'ON aims to rethink the relationship between brands and consumers by bringing technology, artificial intelligence, and people together in a customer service platform.',
          'My work involves developing web applications, integrating services and APIs, and, especially, designing and improving user experiences. I work with Angular, TypeScript, .NET, and C#, connecting technical decisions with product needs and the people using the platform.',
          'But this project brought something particularly meaningful back into my career: gamification.',
          'The passion for video games that led me to study Digital Games found a practical application in my everyday work. Concepts such as progression, challenges, achievements, feedback, and recognition became part of how I think about and build digital experiences.',
          "The challenge isn't simply adding game elements to an interface. It's using that language to make work and learning experiences clearer, more engaging, and more meaningful without sacrificing usability or operational efficiency.",
          'At Comunidade ON, I get to work at the intersection of engineering, product design, artificial intelligence, and gamification.',
          "This is an ongoing campaign — and perhaps one of the projects that best reflects the professional I've become.",
        ],
      },
    },
  ],
  // CURRENT QUEST — EM ANDAMENTO + o lema aprovado do Player Status (fonte única).
  ongoing: true,
  closing: PLAYER_PROFILE.motto,
};
