/** Natureza do projeto. Define em qual área do site ele aparece. */
export type ProjectType = 'professional' | 'personal' | 'game' | 'experiment' | 'study';

export type ProjectStatus = 'in-progress' | 'released' | 'archived' | 'concept';

/** Dados visuais do projeto quando representado como cartucho (docs/05-project-cartridge-system.md). */
export interface Cartridge {
  /** Texto curto impresso no rótulo do cartucho. */
  label: string;
  /** Caminho da arte do rótulo, relativo a `public/` (ex.: `assets/cartridges/paco.png`). */
  art?: string;
  /** Cor predominante do cartucho. Definida no design system (FASE 2). */
  color: string;
  /** Serial fictício impresso no cartucho (ex.: `MC-001`). Elemento puramente estético. */
  serial: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  kind: 'live' | 'repository' | 'case-study' | 'video' | 'other';
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  type: ProjectType;
  status: ProjectStatus;
  year: number;
  role: string;
  stack: string[];
  summary: string;
  mission?: string;
  responsibilities?: string[];
  challenges?: string[];
  solution?: string;
  results?: string[];
  learnings?: string[];
  cartridge: Cartridge;
  screenshots?: ProjectScreenshot[];
  links?: ProjectLink[];
  /** Projetos em destaque ganham posição privilegiada no inventário. */
  featured: boolean;
}
