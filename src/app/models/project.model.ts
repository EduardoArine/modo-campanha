import type { Localized } from '../core/i18n';
import type { McCartAccent, McCartShell } from '../shared/signature/cart/cart';
import type { McChipTone } from '../shared/ui/chip/chip';

/** Origem/contexto do projeto (D-040). Não aparece necessariamente como texto público. */
export type ProjectOrigin = 'personal' | 'on-tech' | 'other';

/**
 * Estado de publicação (D-040, D-042). Conservador por padrão: só `approved` é público;
 * ausente, `draft`, `review` e `blocked` nunca aparecem.
 */
export type ProjectPublication = 'approved' | 'draft' | 'review' | 'blocked';

/** Catálogo fechado de tags (D-042). O tom pertence à tag, não à posição no projeto. */
export type TagId = 'product' | 'gamification' | 'game-design' | 'prototyping';

export interface TagDefinition {
  id: TagId;
  label: Localized;
  tone: McChipTone;
}

/** Até 2 tags por projeto, garantido pelo tipo. */
export type ProjectTags = readonly [] | readonly [TagId] | readonly [TagId, TagId];

export interface ProjectLink {
  kind: 'repository' | 'live' | 'case-study' | 'other';
  label: Localized;
  url: string;
}

/** Imagem de runtime com dimensões intrínsecas (evita layout shift). */
export interface CartridgeImage {
  src: string;
  width: number;
  height: number;
}

/**
 * Renders oficiais do MC-CART do projeto (D-065). `front` é o objeto no Project Inventory
 * (substitui a construção em CSS); `threeQuarter` é o product shot (Hero, destaques, inserção).
 * Fundo transparente; o render já é o objeto físico (sem casca CSS por cima).
 */
export interface CartridgeRenders {
  front: CartridgeImage;
  threeQuarter?: CartridgeImage;
}

/** Configuração visual do MC-CART (1:1 com o projeto; sem entidade própria, D-042). */
export interface ProjectCartridge {
  /** Material do shell; usado pela construção em CSS quando não há render (fallback). */
  shell: McCartShell;
  accent: McCartAccent;
  /** Artwork aprovado do rótulo (MC-001: SYSTEM HORIZON, 4:3, D-065). Ausente = placeholder dev. */
  artwork?: CartridgeImage & { alt: Localized };
  /** Renders oficiais do objeto físico (D-065). */
  renders?: CartridgeRenders;
}

/**
 * Conteúdo público de um projeto (D-042). Nada editorial ou privado (aprovadores,
 * revisão, confidencialidade) entra aqui: o repositório é público.
 */
export interface Project {
  // Identidade
  id: string;
  /** `MC-NNN`: ordem de entrada na coleção; não indica origem, empresa nem importância. */
  serial: string;
  slug: string;
  origin: ProjectOrigin;

  // Publicação
  publication?: ProjectPublication;

  // Conteúdo
  title: Localized;
  description: Localized;
  /** Texto impresso no cartucho (ex.: PORTFÓLIO INTERATIVO). */
  type: Localized;
  role: Localized;
  technologies: readonly string[];
  learnings: Localized<readonly string[]>;
  /** Só quando houver dado real; nunca inventado. */
  year?: number;

  // Tags
  tags: ProjectTags;

  // Cartucho
  cartridge: ProjectCartridge;

  // Links
  links: readonly ProjectLink[];
}
