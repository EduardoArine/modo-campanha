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

/**
 * Link de evidência do case. Os tipos de imprensa, artigo, documento acadêmico, lançamento e
 * registro são os mesmos do Campaign Log (D-072), para reaproveitar as mesmas referências.
 */
export interface ProjectLink {
  kind:
    | 'repository'
    | 'live'
    | 'case-study'
    | 'press'
    | 'paper'
    | 'academic'
    | 'launch'
    | 'record'
    | 'other';
  label: Localized;
  url: string;
  /** Contexto factual curto (ex.: autoria de um artigo que não é do Eduardo). */
  note?: Localized;
}

/** Imagem de runtime com dimensões intrínsecas (evita layout shift). */
export interface CartridgeImage {
  src: string;
  width: number;
  height: number;
  /** Derivados por largura (`srcset`), quando existem; `src` é o maior. */
  srcset?: string;
}

/**
 * Renders oficiais do MC-CART do projeto (D-065). `front` é o objeto no Project Inventory
 * (substitui a construção em CSS); `threeQuarter` é o product shot (Hero, destaques, inserção).
 * Fundo transparente; o render já é o objeto físico (sem casca CSS por cima).
 */
export interface CartridgeRenders {
  front: CartridgeImage;
  threeQuarter?: CartridgeImage;
  /**
   * Render para a inserção física no MC-01 (D-077): frontal, na escala do console (699 × 500; a base
   * de 66 px fica atrás da frente). No MC-001 é a carcaça OFICIAL da experiência interativa (D-078);
   * `front`/`threeQuarter` ficam como referência. A interface pública não mostra duas identidades
   * do cartucho. Sem ela: fallback.
   */
  console?: CartridgeImage;
}

/** Tela que o MC-01 sabe rodar para um cartucho (engines existentes; nunca jogo inexistente). */
export type CartridgeScreen = 'system-horizon';

/** Configuração visual do MC-CART (1:1 com o projeto; sem entidade própria, D-042). */
export interface ProjectCartridge {
  /** Material do shell; usado pela construção em CSS quando não há render (fallback). */
  shell: McCartShell;
  accent: McCartAccent;
  /**
   * Arte que o CRT mostra no READY. MC-001: SYSTEM HORIZON (4:3, D-065). Demais (D-087): a
   * ilustração do rótulo do cartucho (≈ 2:1), mostrada inteira (`fit: 'contain'`, faixas escuras
   * como uma TV de tubo) para não cortar o título da arte. Ausente = placeholder dev.
   */
  artwork?: CartridgeImage & {
    alt: Localized;
    fit?: 'cover' | 'contain';
    /**
     * Lado do logo no alto da ilustração do rótulo (D-098). À direita, a capa do CRT corta o alto da
     * arte para o logo não disputar com o título em HTML; à esquerda, ele já fica sob o degradê.
     */
    logo?: 'left' | 'right';
  };
  /** Renders oficiais do objeto físico (D-065). */
  renders?: CartridgeRenders;
  /** Teaser que o CRT reproduz sob demanda (D-077). Ausente = só a arte. */
  teaser?: CartridgeScreen;
}

/** Experiência oferecida pelo cartucho (D-077), com estado real; o rótulo do estado vem da UI. */
export interface ProjectExperience {
  kind: 'teaser' | 'playable' | 'demo' | 'case';
  /** Nome da experiência neste projeto (ex.: "Campanha jogável"). */
  label: Localized;
  status: 'available' | 'in-development';
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
  /** Problema / contexto que o projeto resolve (case, D-087). */
  challenge?: Localized;
  role: Localized;
  technologies: readonly string[];
  /** Marcos e reconhecimentos documentados (case, D-087). Nunca métricas inventadas. */
  highlights?: Localized<readonly string[]>;
  learnings: Localized<readonly string[]>;
  /** Só quando houver dado real; nunca inventado. */
  year?: number;
  /** Campanha atual, em andamento (D-087). */
  ongoing?: true;

  // Tags
  tags: ProjectTags;

  // Cartucho
  cartridge: ProjectCartridge;
  /** O que o cartucho oferece hoje (D-077). Nada "disponível" que não exista. */
  experiences: readonly ProjectExperience[];

  // Links
  links: readonly ProjectLink[];
}
