import type { Localized } from '../core/i18n';

// Balões do SYSTEM HORIZON (D-104): uma frase curta (até ~70 caracteres) por parada, mostrada no
// próprio jogo. PROPOSTA, aguardando aprovação do Eduardo: cada frase só encurta o que já está
// aprovado no Diário (título, resumo ou assinatura do capítulo); nenhum fato novo. A história
// completa continua no Diário e na versão em texto do jogo. Chave = id do marco ou do checkpoint.
export const HORIZON_BALLOONS: Readonly<Record<string, Localized>> = {
  // Capítulo 00 — Origem
  'origin-first-contact': {
    'pt-BR': 'Tudo começou num Atari 2600, na casa dos meus primos.',
    en: "It all began with an Atari 2600 at my cousins' house.",
  },
  'origin-rental-store-years': {
    'pt-BR': 'Nas locadoras, o Super Nintendo fez a paixão crescer.',
    en: 'At the rental stores, the Super Nintendo made the passion grow.',
  },
  'origin-ladybug-wish': {
    'pt-BR': 'Meu primeiro Super Nintendo chegou de um jeito inesquecível.',
    en: 'My first Super Nintendo arrived in an unforgettable way.',
  },
  'origin-earned-not-given': {
    'pt-BR': 'O PlayStation, eu tive que conquistar trabalhando.',
    en: 'The PlayStation was something I had to earn by working.',
  },
  'origin-built-from-memories': {
    'pt-BR': 'Com os anos, colecionei os consoles da minha infância.',
    en: 'Over the years, I collected the consoles of my childhood.',
  },
  'checkpoint-chapter-00-origin': {
    'pt-BR': 'A campanha começou muito antes do código.',
    en: 'The campaign started long before the code.',
  },
  // Capítulo 01 — Do controle ao código
  'fatec-passion-became-choice': {
    'pt-BR': '2013: a paixão virou escolha. Jogos Digitais na FATEC.',
    en: '2013: passion became a choice. Digital Games at FATEC.',
  },
  'fatec-aedes-revenge': {
    'pt-BR': 'Aedes Revenge: a dengue vista pelo próprio mosquito.',
    en: "Aedes Revenge: dengue through the mosquito's own eyes.",
  },
  'fatec-first-best-game': {
    'pt-BR': '2016: Melhor Jogo na FAEL, categoria acadêmica.',
    en: '2016: Best Game at FAEL, academic category.',
  },
  'fatec-ativvus-4change': {
    'pt-BR': '2016: meu primeiro produto real, o 4Change.',
    en: '2016: my first real product, 4Change.',
  },
  'fatec-real-players': {
    'pt-BR': 'Maio de 2017: o Aedes Revenge chegou ao Google Play.',
    en: 'May 2017: Aedes Revenge reached Google Play.',
  },
  'fatec-two-awards-capstone': {
    'pt-BR': 'Dois prêmios e um TCC nota 10.',
    en: 'Two awards and a perfect capstone score.',
  },
  'checkpoint-chapter-01-fatec': {
    'pt-BR': 'A paixão da infância virou uma escolha de vida.',
    en: 'A childhood passion became a life choice.',
  },
  // Capítulo 02 — Do código ao produto
  scoutevo: {
    'pt-BR': 'ScoutEvo: tecnologia para descobrir talentos do futebol.',
    en: 'ScoutEvo: technology to discover football talent.',
  },
  eos: {
    'pt-BR': 'EOS: tecnologia em que cada minuto importa.',
    en: 'EOS: technology where every minute matters.',
  },
  axia: {
    'pt-BR': 'Axia: da ideia à inteligência operacional.',
    en: 'Axia: from concept to operational intelligence.',
  },
  'comunidade-on': {
    'pt-BR': 'Na Comunidade ON, os games viraram linguagem de produto.',
    en: 'At Comunidade ON, games became a product language.',
  },
  'checkpoint-chapter-02': {
    'pt-BR': 'Cada projeto, um novo desafio.',
    en: 'Every project, a new challenge.',
  },
};
