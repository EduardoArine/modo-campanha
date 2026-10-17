import { CampaignLogChapter } from '../models';

// CHAPTER 00 — ORIGIN (docs/15 §13). Relato pessoal real do Eduardo, com os textos fornecidos por
// ele (2026-10-17), sem alteração de fatos, cronologia ou intenção. Não é MOCK.
// Datas: só "c. 1991" é aproximada e informada; os demais checkpoints usam a época descrita por ele,
// sem inventar anos. O `summary` é a primeira frase do próprio texto (extração literal).
// Publicação: ainda NÃO entra em produção (CAMPAIGN_LOG_CHAPTERS vazio em campaign-log.data.ts)
// até o Eduardo congelar o capítulo; em desenvolvimento aparece antes da linha profissional.
export const ORIGIN_CHAPTER: CampaignLogChapter = {
  id: 'chapter-00-origin',
  number: '00',
  name: 'ORIGIN',
  signature: {
    'pt-BR': 'A campanha começou muito antes do código.',
    en: 'The campaign started long before the code.',
  },
  entries: [
    {
      id: 'origin-first-contact',
      code: 'FIRST CONTACT',
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
      code: 'THE RENTAL STORE YEARS',
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
      code: 'THE LADYBUG WISH',
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
      code: 'EARNED, NOT GIVEN',
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
      code: 'BUILT FROM MEMORIES',
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
    },
  ],
};
