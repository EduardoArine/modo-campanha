import { TagDefinition, TagId } from '../models';

// Catálogo de tags (D-042). Tom estável por tag; cor = só categorização visual
// (nunca importância, status ou proficiência).
export const TAGS: Readonly<Record<TagId, TagDefinition>> = {
  product: { id: 'product', label: { 'pt-BR': 'Produto', en: 'Product' }, tone: 'warm' },
  gamification: {
    id: 'gamification',
    label: { 'pt-BR': 'Gamificação', en: 'Gamification' },
    tone: 'cool',
  },
  'game-design': {
    id: 'game-design',
    label: { 'pt-BR': 'Game Design', en: 'Game Design' },
    tone: 'warm',
  },
  prototyping: {
    id: 'prototyping',
    label: { 'pt-BR': 'Prototipagem', en: 'Prototyping' },
    tone: 'cool',
  },
};
