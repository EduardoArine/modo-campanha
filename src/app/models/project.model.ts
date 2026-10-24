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

/** Etapa da contribuição no case (D-100): título curto + o que foi feito, sem atribuir tudo ao Eduardo. */
export interface ProjectRoleStep {
  title: Localized;
  text: Localized;
}

/**
 * Contexto tecnológico do case (D-100): tecnologias de uma fase. `featured` destaca a fase atual (ex.:
 * a arquitetura modernizada) sem sugerir que tudo foi introduzido ao mesmo tempo.
 */
export interface ProjectTechnologyGroup {
  label: Localized;
  items: readonly string[];
  /** Contexto factual curto (ex.: o sistema legado já existia). */
  note?: Localized;
  featured?: true;
}

/** Marco da linha do tempo do case (D-100). `when` é um ano real ou uma fase descrita, nunca uma data inventada. */
export interface ProjectTimelineItem {
  when: Localized;
  text: Localized;
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
  /** Parágrafos do "Sobre o projeto", depois da descrição (case, D-100). */
  overview?: Localized<readonly string[]>;
  /** Problema / contexto que o projeto resolve (case, D-087). */
  challenge?: Localized;
  role: Localized;
  /** Contribuição em etapas, depois do `role` (case, D-100). */
  roleSteps?: readonly ProjectRoleStep[];
  /** Tecnologias da capa (as principais). */
  technologies: readonly string[];
  /** Tecnologias do dossiê por fase (case, D-100); ausente = a lista `technologies`. */
  technologyGroups?: readonly ProjectTechnologyGroup[];
  /** Marcos e reconhecimentos documentados (case, D-087). Nunca métricas inventadas. */
  highlights?: Localized<readonly string[]>;
  /** Marcos em linha do tempo (case, D-100); substitui `highlights` na seção Marcos. */
  timeline?: readonly ProjectTimelineItem[];
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
