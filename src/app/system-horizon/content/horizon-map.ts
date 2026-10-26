import { SkillGroupId } from '../../models';

/**
 * Mapa do SYSTEM HORIZON interativo (D-103, docs/23 §4 e §18): os cinco atos da campanha, só com
 * REFERÊNCIAS aos dados publicados. Nenhum título, resumo ou período mora aqui; os textos vêm do
 * Diário, do Arsenal, do Inventário e do Contato (`horizon-world.ts`). Um teste garante que o mapa
 * não tem texto. Trocar a ordem ou a associação entre especialidades e atos = editar só este mapa.
 *
 * - Atos 01–03: os capítulos do Diário, na ordem; cada marco do capítulo vira um marco no mundo e o
 *   fim do capítulo é o checkpoint do ato.
 * - Ato 04: os cartuchos publicados (menos o MC-001) e, no fim, a forja: as quatro especialidades
 *   coletadas formam o MC-CART MC-001, o próprio Modo Campanha (a cena do teaser, conquistada).
 * - Ato 05: o mirante, com o encerramento e os contatos reais.
 */
export type HorizonActId = 'origin' | 'code' | 'product' | 'campaigns' | 'horizon';

/** Especialidade coletada no caminho: `after` = depois de quantos marcos do capítulo. */
export interface HorizonCollectible {
  readonly group: SkillGroupId;
  readonly after: number;
}

export type HorizonActSource =
  | { readonly kind: 'chapter'; readonly chapter: string }
  | { readonly kind: 'cartridges'; readonly forge: string }
  | { readonly kind: 'closing' };

export interface HorizonActMap {
  readonly id: HorizonActId;
  readonly source: HorizonActSource;
  readonly collect?: readonly HorizonCollectible[];
}

export const HORIZON_MAP: readonly HorizonActMap[] = [
  {
    id: 'origin',
    source: { kind: 'chapter', chapter: 'chapter-00-origin' },
    collect: [{ group: 'game-dna', after: 2 }],
  },
  {
    id: 'code',
    source: { kind: 'chapter', chapter: 'chapter-01-fatec' },
    collect: [{ group: 'build', after: 1 }],
  },
  {
    id: 'product',
    source: { kind: 'chapter', chapter: 'chapter-02' },
    collect: [
      { group: 'product', after: 1 },
      { group: 'ai', after: 3 },
    ],
  },
  { id: 'campaigns', source: { kind: 'cartridges', forge: 'MC-001' } },
  { id: 'horizon', source: { kind: 'closing' } },
];

/** Linha de cada especialidade em `sh-items.png` (mesma ordem do teaser). */
export const ITEM_ROW: Record<SkillGroupId, number> = {
  build: 0,
  product: 1,
  ai: 2,
  'game-dna': 3,
};
