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

/** Configuração visual do MC-CART (1:1 com o projeto; sem entidade própria, D-042). */
export interface ProjectCartridge {
  shell: McCartShell;
  accent: McCartAccent;
  /** Artwork aprovado (16:10, mín. 640 × 400). Ausente = só placeholder de desenvolvimento. */
  artwork?: { src: string; alt: Localized };
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
