import type { Locale } from '../../core/i18n';

// ⚠️ PROTÓTIPO (dev-only, docs/24). Textos de protótipo para avaliar a direção visual do Project
// Inventory. Na implementação definitiva vão para o dicionário de UI (pt-BR + en) ou para o
// conteúdo `Localized` do projeto. "SYSTEM HORIZON" como nome do MC-001 vem do brief do Eduardo
// e do rótulo do render; o `Project` ainda chama o MC-001 de "Modo Campanha" (decisão pendente).
export interface LabCopy {
  collection: string;
  title: string;
  publisher: string;
  available: string;
  availableItems: readonly string[];
  hint: string;
  library: string;
  libraryCount: string;
  slot: { empty: string; selected: string; loading: string; loaded: string };
  select: string;
  selected: string;
  inserted: string;
  detected: string;
  ready: string;
  proposal: string;
  contribution: string;
  evidence: string;
  experience: string;
  experienceNow: string;
  fallbackTitle: string;
  fallbackText: string;
  status: { selected: string; loading: string; ready: string; ejected: string };
}

export const LAB_COPY: Record<Locale, LabCopy> = {
  'pt-BR': {
    collection: 'CARTUCHO 01 · COLEÇÃO MC-CART',
    title: 'SYSTEM HORIZON',
    publisher: 'MC-001 · MODO CAMPANHA',
    available: 'NESTE CARTUCHO',
    availableItems: ['Teaser do SYSTEM HORIZON', 'Case do projeto'],
    hint: 'Insira no MC-01 para explorar o projeto.',
    library: 'BIBLIOTECA MC-01',
    libraryCount: '1 cartucho',
    slot: {
      empty: 'SLOT VAZIO',
      selected: 'MC-001 SELECIONADO',
      loading: 'CARREGANDO MC-001',
      loaded: 'MC-001 NO SLOT',
    },
    select: 'Selecionar',
    selected: 'Selecionado',
    inserted: 'INSERIDO',
    detected: 'CARTRIDGE DETECTED',
    ready: 'READY',
    proposal: 'PROPOSTA',
    contribution: 'MINHA CONTRIBUIÇÃO',
    evidence: 'EVIDÊNCIAS',
    experience: 'EXPERIÊNCIA',
    experienceNow:
      'Teaser em execução no MC-01 e case do projeto. A experiência jogável ainda não está disponível.',
    fallbackTitle: 'TEASER INDISPONÍVEL',
    fallbackText: 'O case do projeto continua disponível fora da tela do MC-01.',
    status: {
      selected: 'SYSTEM HORIZON selecionado.',
      loading: 'Carregando cartucho.',
      ready: 'SYSTEM HORIZON carregado no MC-01.',
      ejected: 'Cartucho ejetado.',
    },
  },
  en: {
    collection: 'CARTRIDGE 01 · MC-CART COLLECTION',
    title: 'SYSTEM HORIZON',
    publisher: 'MC-001 · MODO CAMPANHA',
    available: 'ON THIS CARTRIDGE',
    availableItems: ['SYSTEM HORIZON teaser', 'Project case'],
    hint: 'Insert it into the MC-01 to explore the project.',
    library: 'MC-01 LIBRARY',
    libraryCount: '1 cartridge',
    slot: {
      empty: 'SLOT EMPTY',
      selected: 'MC-001 SELECTED',
      loading: 'LOADING MC-001',
      loaded: 'MC-001 IN SLOT',
    },
    select: 'Select',
    selected: 'Selected',
    inserted: 'INSERTED',
    detected: 'CARTRIDGE DETECTED',
    ready: 'READY',
    proposal: 'CONCEPT',
    contribution: 'MY CONTRIBUTION',
    evidence: 'EVIDENCE',
    experience: 'EXPERIENCE',
    experienceNow:
      'Teaser running on the MC-01 and the project case. The playable experience is not available yet.',
    fallbackTitle: 'TEASER UNAVAILABLE',
    fallbackText: 'The project case is still available outside the MC-01 screen.',
    status: {
      selected: 'SYSTEM HORIZON selected.',
      loading: 'Loading cartridge.',
      ready: 'SYSTEM HORIZON loaded on the MC-01.',
      ejected: 'Cartridge ejected.',
    },
  },
};
