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
    // SYSTEM HORIZON (D-077): a primeira experiência narrativa do Modo Campanha. Modo Campanha é o
    // portfólio e o ecossistema; MC-01, o sistema que apresenta os projetos; MC-CART, a mídia física.
    // Título e descrição do Eduardo; o tipo segue a definição dele ("experiência narrativa").
    title: { 'pt-BR': 'SYSTEM HORIZON', en: 'SYSTEM HORIZON' },
    description: {
      'pt-BR':
        'O primeiro cartucho do Modo Campanha. Uma jornada narrativa inspirada nos games que transforma experiências e conquistas reais da minha carreira em uma campanha interativa.',
      en: 'The first Modo Campanha cartridge. A game-inspired narrative journey that transforms real experiences and achievements from my career into an interactive campaign.',
    },
    type: { 'pt-BR': 'EXPERIÊNCIA NARRATIVA', en: 'NARRATIVE EXPERIENCE' },
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
    // MC-CART oficial (D-065): shell grafite com acentos laranja queimado; artwork SYSTEM HORIZON
    // (substitui a v1 de D-046). Renders em assets/cartridges/mc-001/ (fontes em design/source/).
    // O alt fica guardado para usos independentes; dentro do MC-CART a arte é decorativa.
    cartridge: {
      shell: 'dark',
      accent: 'warm',
      teaser: 'system-horizon',
      artwork: {
        src: 'assets/cartridges/mc-001/system-horizon.webp',
        srcset:
          'assets/cartridges/mc-001/system-horizon-640.webp 640w, assets/cartridges/mc-001/system-horizon.webp 960w',
        width: 960,
        height: 720,
        alt: {
          'pt-BR':
            'Paisagem em pixel art ao pôr do sol: um caminho entre pedras e pinheiros desce até um lago cercado de montanhas, com o sol no horizonte.',
          en: 'Pixel-art landscape at sunset: a path between rocks and pine trees leads down to a lake surrounded by mountains, with the sun on the horizon.',
        },
      },
      renders: {
        front: { src: 'assets/cartridges/mc-001/front.webp', width: 960, height: 690 },
        // Variante técnica do console (D-077): mesmo modelo, câmera um pouco mais alta (ver docs/24 §17).
        console: {
          src: 'assets/cartridges/mc-001/console-scale-699.webp',
          srcset:
            'assets/cartridges/mc-001/console-scale-360.webp 360w, assets/cartridges/mc-001/console-scale-540.webp 540w, assets/cartridges/mc-001/console-scale-699.webp 699w',
          width: 699,
          height: 500,
        },
        threeQuarter: {
          src: 'assets/cartridges/mc-001/three-quarter.webp',
          width: 1244,
          height: 1017,
        },
      },
    },
    experiences: [
      { kind: 'teaser', label: { 'pt-BR': 'Teaser', en: 'Teaser' }, status: 'available' },
      {
        kind: 'playable',
        label: { 'pt-BR': 'Campanha jogável', en: 'Playable campaign' },
        status: 'in-development',
      },
    ],
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
