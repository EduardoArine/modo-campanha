import { CampaignLogEntry } from '../models';

// ⚠️ CAMPAIGN LOG CONTENT = MOCK FOR VISUAL DEVELOPMENT (D-049).
// Períodos, títulos, contextos e textos abaixo NÃO são o histórico aprovado do Eduardo: servem só
// para validar modelo, composição, ritmo e responsividade. Serão substituídos pelo histórico real
// (03-0) e este arquivo será removido junto com o `fileReplacements` correspondente.
// Só entra em builds de desenvolvimento e testes; a produção usa `campaign-log.data.ts` (vazio).
export const CAMPAIGN_LOG: readonly CampaignLogEntry[] = [
  {
    id: 'mock-campaign-log-origin',
    kind: 'origin',
    period: { start: 2013, end: 2017 },
    title: {
      'pt-BR': 'Jogos Digitais como ponto de partida',
      en: 'Digital Games as a starting point',
    },
    context: { 'pt-BR': 'FATEC Americana', en: 'FATEC Americana' },
    summary: {
      'pt-BR':
        'A formação em Tecnologia em Jogos Digitais trouxe programação, interação e sistemas para o centro da forma como comecei a pensar tecnologia.',
      en: 'A degree in Digital Games Technology brought programming, interaction, and systems into the way I started thinking about technology.',
    },
  },
  {
    id: 'mock-campaign-log-development',
    kind: 'checkpoint',
    period: { start: 2014, end: 2018 },
    title: {
      'pt-BR': 'Da tecnologia para o desenvolvimento',
      en: 'From technology to development',
    },
    summary: {
      'pt-BR':
        'Os primeiros anos profissionais consolidaram desenvolvimento de software como meu principal campo de atuação e transformaram experimentação em prática de produto real.',
      en: 'My early professional years established software development as my main field and turned experimentation into real product work.',
    },
  },
  {
    id: 'mock-campaign-log-product',
    kind: 'checkpoint',
    period: { start: 2019, end: 2022 },
    title: {
      'pt-BR': 'Código passou a ser só uma parte do produto',
      en: 'Code became only one part of the product',
    },
    summary: {
      'pt-BR':
        'O trabalho começou a se aproximar mais de UX, decisões de interface, estrutura de produto e da experiência de quem usa aquilo que eu construo.',
      en: 'My work started moving closer to UX, interface decisions, product structure, and the experience of the people using what I build.',
    },
  },
  {
    id: 'mock-campaign-log-ai',
    kind: 'checkpoint',
    period: { start: 2023, end: 2025 },
    title: { 'pt-BR': 'IA entrou no workflow', en: 'AI entered the workflow' },
    summary: {
      'pt-BR':
        'IA deixou de ser apenas experimentação e passou a participar do desenvolvimento, prototipação, investigação, validação e documentação do trabalho.',
      en: 'AI moved beyond experimentation and became part of development, prototyping, investigation, validation, and documentation.',
    },
  },
  {
    id: 'mock-campaign-log-current',
    kind: 'current',
    period: { start: 2025, end: 'present' },
    title: {
      'pt-BR': 'Construindo produtos de ponta a ponta',
      en: 'Building products end to end',
    },
    context: { 'pt-BR': 'Comunidade On', en: 'Comunidade On' },
    summary: {
      'pt-BR':
        'Na campanha atual, desenvolvimento, produto, UX, gamificação e IA passaram a fazer parte do mesmo processo de construção de produtos digitais.',
      en: 'In the current campaign, development, product, UX, gamification, and AI have become part of the same digital product-building process.',
    },
  },
];
