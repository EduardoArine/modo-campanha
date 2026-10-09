import { Project } from '../models';

// Projetos do Modo Campanha (content inventory: docs/14, D-041/D-042/D-044).
// Regra: o runtime contém SOMENTE projetos aprovados para publicação. Projetos em revisão
// (ex.: MC-002) ficam documentados em docs/14 e entram aqui só depois de aprovados.
// O filtro abaixo continua como defesa conservadora (testado com fixtures).

export const PROJECTS: readonly Project[] = [
  {
    id: 'mc-001',
    serial: 'MC-001',
    slug: 'modo-campanha',
    origin: 'personal',
    publication: 'approved',
    title: { 'pt-BR': 'Modo Campanha', en: 'Modo Campanha' },
    description: {
      'pt-BR':
        'Portfólio profissional gamificado que transforma projetos, habilidades e aprendizados reais em uma campanha interativa.',
      en: 'A gamified professional portfolio that turns real projects, skills, and learnings into an interactive campaign.',
    },
    type: { 'pt-BR': 'PORTFÓLIO INTERATIVO', en: 'INTERACTIVE PORTFOLIO' },
    role: {
      'pt-BR':
        'Conceito, direção de produto, direção visual e desenvolvimento, com IA integrada ao workflow de implementação, validação e documentação.',
      en: 'Concept, product direction, visual direction, and development, with AI integrated into the implementation, validation, and documentation workflow.',
    },
    technologies: ['Angular', 'TypeScript', 'SCSS', 'Vitest', 'GitHub Actions / Pages'],
    learnings: {
      'pt-BR': [
        'Validar tipografia no tamanho real de uso.',
        'Separar linguagem de interface digital da linguagem de objetos físicos.',
      ],
      en: [
        'Validate typography at actual usage sizes.',
        'Separate the visual language of digital interfaces from that of physical objects.',
      ],
    },
    tags: ['product', 'gamification'],
    // Artwork aprovado (02-C.5, D-046): System Horizon, pixel art 160 × 100 exportada em 640 × 400.
    // O alt fica guardado para usos independentes; dentro do MC-CART a arte é decorativa.
    cartridge: {
      shell: 'orange',
      accent: 'special',
      artwork: {
        src: 'assets/cartridges/mc-001-modo-campanha.png',
        alt: {
          'pt-BR':
            'Paisagem em pixel art de um sistema em construção, com módulos crescentes e um caminho segmentado levando a uma passagem iluminada.',
          en: 'Pixel-art landscape of a system under construction, with growing modules and a segmented path leading to an illuminated gateway.',
        },
      },
    },
    links: [
      {
        kind: 'repository',
        label: { 'pt-BR': 'Repositório no GitHub', en: 'GitHub repository' },
        url: 'https://github.com/EduardoArine/modo-campanha',
      },
    ],
  },
];

/** Regra conservadora: somente `publication: 'approved'` é público (ausente = não publica). */
export function isPublished(project: Pick<Project, 'publication'>): boolean {
  return project.publication === 'approved';
}

/** Projetos autorizados para o Inventory público. */
export function publishedProjects(projects: readonly Project[] = PROJECTS): readonly Project[] {
  return projects.filter(isPublished);
}

/**
 * Projetos exibidos no Inventory. Além de publicado, o projeto precisa de artwork aprovado:
 * o placeholder "PROJECT ARTWORK" só pode aparecer em desenvolvimento/checkpoint
 * (`allowArtworkPlaceholder` = `isDevMode()` no componente).
 */
export function inventoryProjects(
  allowArtworkPlaceholder: boolean,
  projects: readonly Project[] = PROJECTS,
): readonly Project[] {
  return publishedProjects(projects).filter(
    (project) => allowArtworkPlaceholder || project.cartridge.artwork !== undefined,
  );
}
