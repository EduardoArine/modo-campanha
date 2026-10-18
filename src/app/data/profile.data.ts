import { PlayerProfile } from '../models';

// Conteúdo aprovado por Eduardo (Home Slice 01, 2026-10-08). Não inventar nem completar.
export const PLAYER_PROFILE: PlayerProfile = {
  name: 'Eduardo Arine',
  role: {
    'pt-BR': 'Desenvolvedor de Produtos Digitais',
    en: 'Digital Product Developer',
  },
  focusLine: {
    'pt-BR': 'IA • Produto • Desenvolvimento • Gamificação',
    en: 'AI • Product • Development • Gamification',
  },
  summary: {
    'pt-BR':
      'Construo produtos digitais conectando desenvolvimento, produto, IA e experiência — com mais de 10 anos em tecnologia e formação em Jogos Digitais.',
    en: 'I build digital products connecting development, product, AI, and experience — backed by 10+ years in tech and a degree in Digital Games Technology.',
  },
  motto: {
    'pt-BR': 'XP real, sem personagem.',
    en: 'Real XP. No persona.',
  },
  // Final Checkpoint (Home Slice 05, D-052). Aprovado por Eduardo em 2026-10-11.
  closing: {
    'pt-BR':
      'Se quiser construir algo comigo ou trocar ideias sobre produto, IA, desenvolvimento ou games, estes são os melhores lugares para me encontrar.',
    en: "If you'd like to build something together or exchange ideas about product, AI, development, or games, these are the best places to find me.",
  },
  status: {
    origin: {
      label: { 'pt-BR': 'ORIGEM', en: 'ORIGIN' },
      value: { 'pt-BR': 'Tecnologia em Jogos Digitais', en: 'Digital Games Technology' },
    },
    xp: {
      label: { 'pt-BR': 'XP', en: 'XP' },
      value: { 'pt-BR': '10+ anos em tecnologia', en: '10+ years in tech' },
      // Selo do Player Card (D-082): o mesmo XP real, no lugar do "LV 99" do mockup (D-017).
      short: { 'pt-BR': '10+', en: '10+' },
    },
    currentCampaign: {
      label: { 'pt-BR': 'CAMPANHA ATUAL', en: 'CURRENT CAMPAIGN' },
      value: { 'pt-BR': 'Comunidade ON', en: 'Comunidade ON' },
    },
    focus: {
      label: { 'pt-BR': 'FOCO', en: 'FOCUS' },
      value: {
        'pt-BR': 'IA aplicada ao desenvolvimento',
        en: 'AI applied to software development',
      },
    },
  },
  // Player Status definitivo (D-082). Texto aprovado por Eduardo em 2026-10-18.
  journey: {
    'pt-BR': [
      'Sou desenvolvedor de produtos digitais com mais de 10 anos de experiência, atuando na interseção entre tecnologia, produto, desenvolvimento e gamificação.',
      'Acredito em soluções que unem pessoas, tecnologia e propósito, gerando impacto real e experiências que fazem sentido.',
    ],
    en: [
      "I'm a digital product developer with more than 10 years of experience, working at the intersection of technology, product, development, and gamification.",
      'I believe in solutions that bring people, technology, and purpose together, creating real impact and meaningful experiences.',
    ],
  },
  tagline: {
    'pt-BR': 'Tecnologia para pessoas reais.',
    en: 'Technology for real people.',
  },
  currentState: [
    {
      id: 'building',
      label: { 'pt-BR': 'CONSTRUINDO', en: 'BUILDING' },
      value: { 'pt-BR': 'Soluções com impacto', en: 'Impactful solutions' },
    },
    {
      id: 'learning',
      label: { 'pt-BR': 'APRENDENDO', en: 'LEARNING' },
      value: { 'pt-BR': 'Todos os dias', en: 'Every day' },
    },
    {
      id: 'evolving',
      label: { 'pt-BR': 'EVOLUINDO', en: 'EVOLVING' },
      value: { 'pt-BR': 'Como profissional e pessoa', en: 'Professionally and personally' },
    },
  ],
  quote: {
    'pt-BR': 'MESMA ESSÊNCIA, NOVOS NÍVEIS.',
    en: 'SAME ESSENCE, NEW LEVELS.',
  },
  // Foto oficial (D-082): fonte intacta em design/source/player/eduardo-arine.png (1254 × 1254).
  photo: {
    src: 'assets/player/eduardo-arine-640.webp',
    srcset:
      'assets/player/eduardo-arine-400.webp 400w, assets/player/eduardo-arine-640.webp 640w, assets/player/eduardo-arine-960.webp 960w, assets/player/eduardo-arine-1254.webp 1254w',
    width: 1254,
    height: 1254,
    alt: {
      'pt-BR':
        'Eduardo Arine, de boné turquesa e camiseta preta, com uma cidade em luz laranja ao fundo',
      en: 'Eduardo Arine in a turquoise cap and a black T-shirt, with an orange-lit city behind him',
    },
  },
};
