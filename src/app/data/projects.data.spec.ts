import { Project, ProjectPublication } from '../models';
import { PROJECTS, inventoryProjects, isPublished, publishedProjects } from './projects.data';
import { TAGS } from './tags.data';

const SHELLS = ['dark', 'light', 'orange', 'cool'];
const ACCENTS = ['warm', 'cool', 'special'];
const LEGACY_FIELDS = ['status', 'featured', 'label', 'color', 'art', 'subtitle', 'mission'];

/** Fixture neutro (não é conteúdo editorial real): só para exercitar o filtro. */
function fixture(serial: string, publication?: ProjectPublication, withArtwork = false): Project {
  const text = { 'pt-BR': serial, en: serial };
  return {
    id: serial.toLowerCase(),
    serial,
    slug: serial.toLowerCase(),
    origin: 'other',
    publication,
    title: text,
    description: text,
    type: text,
    role: text,
    technologies: [],
    learnings: { 'pt-BR': [], en: [] },
    tags: [],
    cartridge: {
      shell: 'dark',
      accent: 'warm',
      ...(withArtwork && {
        artwork: { src: 'assets/fixture.png', width: 640, height: 480, alt: text },
      }),
    },
    experiences: [],
    links: [],
  };
}

const FIXTURES = [
  fixture('FX-001', 'approved'),
  fixture('FX-002', 'review'),
  fixture('FX-003', 'draft'),
  fixture('FX-004', 'blocked'),
  fixture('FX-005'),
];

describe('PROJECTS (runtime data)', () => {
  it('contains only content approved for publication', () => {
    expect(PROJECTS.length).toBeGreaterThan(0);
    expect(PROJECTS.every((p) => p.publication === 'approved')).toBe(true);
  });

  it('contains the six official MC-CART cartridges, in serial order (D-087)', () => {
    expect(PROJECTS.map((p) => [p.serial, p.slug])).toEqual([
      ['MC-001', 'modo-campanha'],
      ['MC-002', 'aedes-revenge'],
      ['MC-003', 'scoutevo'],
      ['MC-004', 'eos'],
      ['MC-005', 'axia'],
      ['MC-006', 'comunidade-on'],
    ]);
    // D-077: SYSTEM HORIZON é o primeiro cartucho; Modo Campanha é o portfólio (não o projeto).
    expect(PROJECTS[0].title).toEqual({ 'pt-BR': 'SYSTEM HORIZON', en: 'SYSTEM HORIZON' });
    expect(PROJECTS[0].description['pt-BR']).toMatch(/^O primeiro cartucho do Modo Campanha\./);
    expect(PROJECTS[0].description.en).toMatch(/^The first Modo Campanha cartridge\./);
    // Paco segue fora do runtime (docs/14); o MC-002 passou a ser AEDES REVENGE (D-087).
    expect(JSON.stringify(PROJECTS)).not.toMatch(/Paco/);
  });

  it('keeps serials, slugs and ids unique, with serials in MC-NNN format', () => {
    for (const key of ['id', 'serial', 'slug'] as const) {
      expect(new Set(PROJECTS.map((p) => p[key])).size).toBe(PROJECTS.length);
    }
    expect(PROJECTS.every((p) => /^MC-\d{3}$/.test(p.serial))).toBe(true);
  });

  it('uses only cataloged tags, at most 2 per project', () => {
    for (const project of PROJECTS) {
      expect(project.tags.length).toBeLessThanOrEqual(2);
      expect(project.tags.every((id) => TAGS[id]?.id === id)).toBe(true);
    }
  });

  it('configures each cartridge with an allowed shell and accent', () => {
    expect(PROJECTS.every((p) => SHELLS.includes(p.cartridge.shell))).toBe(true);
    expect(PROJECTS.every((p) => ACCENTS.includes(p.cartridge.accent))).toBe(true);
    // MC-001 oficial (D-065): shell grafite com acentos laranja queimado.
    expect(PROJECTS[0].cartridge.shell).toBe('dark');
    expect(PROJECTS[0].cartridge.accent).toBe('warm');
  });

  it('has bilingual content for every human text', () => {
    for (const p of PROJECTS) {
      for (const text of [p.title, p.description, p.type, p.role]) {
        expect(text['pt-BR'].length).toBeGreaterThan(0);
        expect(text.en.length).toBeGreaterThan(0);
      }
      expect(p.learnings['pt-BR'].length).toBe(p.learnings.en.length);
    }
  });

  it('carries no legacy or editorial fields', () => {
    for (const project of PROJECTS) {
      const keys = [...Object.keys(project), ...Object.keys(project.cartridge)];
      expect(keys.filter((key) => LEGACY_FIELDS.includes(key))).toEqual([]);
    }
    expect(JSON.stringify(PROJECTS)).not.toMatch(/approver|aprovador|confidencial|internal/i);
  });

  it('gives MC-001 the SYSTEM HORIZON artwork (4:3) with a bilingual alt', () => {
    const artwork = PROJECTS[0].cartridge.artwork!;

    expect(artwork.src).toBe('assets/cartridges/mc-001/system-horizon.webp');
    expect(artwork.width / artwork.height).toBeCloseTo(4 / 3, 2);
    expect(artwork.alt['pt-BR']).toMatch(/^Paisagem em pixel art ao pôr do sol/);
    expect(artwork.alt.en).toMatch(/^Pixel-art landscape at sunset/);
  });

  it('gives MC-001 its official front and 3/4 renders (D-065)', () => {
    const renders = PROJECTS[0].cartridge.renders!;

    expect(renders.front).toEqual({
      src: 'assets/cartridges/mc-001/front.webp',
      width: 960,
      height: 690,
    });
    expect(renders.threeQuarter?.src).toBe('assets/cartridges/mc-001/three-quarter.webp');
  });

  it('keeps the canonical front render and adds the console-scale variant for insertion (D-077)', () => {
    const renders = PROJECTS[0].cartridge.renders!;
    expect(renders.console).toMatchObject({
      src: 'assets/cartridges/mc-001/console-scale-699.webp',
      width: 699,
      height: 500,
    });
    expect(renders.console?.srcset).toContain('console-scale-360.webp 360w');
    expect(renders.front.src).toBe('assets/cartridges/mc-001/front.webp');
  });

  it('states what MC-001 offers today: teaser available, playable campaign in development', () => {
    expect(PROJECTS[0].cartridge.teaser).toBe('system-horizon');
    expect(PROJECTS[0].experiences.map((e) => [e.kind, e.status])).toEqual([
      ['teaser', 'available'],
      ['playable', 'in-development'],
    ]);
    // Nada jogável é apresentado como disponível.
    expect(
      PROJECTS.flatMap((p) => p.experiences).some(
        (e) => e.kind === 'playable' && e.status === 'available',
      ),
    ).toBe(false);
  });

  it('publishes the six cartridges in production (approved + approved artwork)', () => {
    expect(inventoryProjects(false).map((p) => p.serial)).toEqual([
      'MC-001',
      'MC-002',
      'MC-003',
      'MC-004',
      'MC-005',
      'MC-006',
    ]);
  });

  it('links MC-001 only to its repository', () => {
    expect(PROJECTS[0].links.map((l) => [l.kind, l.url])).toEqual([
      ['repository', 'https://github.com/EduardoArine/modo-campanha'],
    ]);
  });
});

describe('MC-CART collection (D-087)', () => {
  it('gives every cartridge the same console-scale shell (699 × 500, same slot of the MC-01)', () => {
    for (const p of PROJECTS) {
      const shell = p.cartridge.renders?.console;
      const dir = `assets/cartridges/${p.id}/`;
      expect(shell).toMatchObject({ src: `${dir}console-scale-699.webp`, width: 699, height: 500 });
      for (const w of [360, 540, 699, 1398]) {
        expect(shell?.srcset).toContain(`${dir}console-scale-${w}.webp ${w}w`);
      }
    }
  });

  it('shows the label art of MC-002…MC-006 whole on the CRT (contain), with a bilingual alt', () => {
    for (const p of PROJECTS.slice(1)) {
      const art = p.cartridge.artwork!;
      expect(art.src).toBe(`assets/cartridges/${p.id}/label-art-952.webp`);
      expect(art.fit).toBe('contain');
      expect(art.srcset).toContain('label-art-640.webp 640w');
      expect(art.alt['pt-BR'].length).toBeGreaterThan(0);
      expect(art.alt.en.length).toBeGreaterThan(0);
      // Sem teaser nem experiência jogável: só a arte estática (D-087).
      expect(p.cartridge.teaser).toBeUndefined();
      expect(p.experiences).toEqual([]);
    }
  });

  it('tells each case as a problem, with bilingual milestones of equal length', () => {
    for (const p of PROJECTS) {
      expect(p.challenge?.['pt-BR'].length).toBeGreaterThan(0);
      expect(p.challenge?.en.length).toBeGreaterThan(0);
      if (p.highlights) expect(p.highlights['pt-BR'].length).toBe(p.highlights.en.length);
    }
  });

  it('reuses the Campaign Log evidence with https links, never claiming third-party papers', () => {
    const links = PROJECTS.flatMap((p) => p.links);
    expect(links.every((l) => l.url.startsWith('https://'))).toBe(true);
    for (const paper of links.filter((l) => l.kind === 'paper')) {
      expect(paper.note?.['pt-BR'].length).toBeGreaterThan(0);
      expect(paper.note?.en.length).toBeGreaterThan(0);
    }
    expect(new Set(links.map((l) => l.url)).size).toBe(links.length);
  });

  it('finds the Campaign Log evidence of each case (no silent empty lookup)', () => {
    expect(PROJECTS.map((p) => [p.serial, p.links.map((l) => l.kind)])).toEqual([
      ['MC-001', ['repository']],
      ['MC-002', ['academic']],
      ['MC-003', ['press']],
      ['MC-004', ['launch', 'paper', 'press']],
      ['MC-005', ['press']],
      ['MC-006', []],
    ]);
  });

  it('marks only Comunidade ON as ongoing, with no public link yet', () => {
    expect(PROJECTS.filter((p) => p.ongoing).map((p) => p.serial)).toEqual(['MC-006']);
    expect(PROJECTS[5].links).toEqual([]);
  });
});

describe('publication filtering (fixtures)', () => {
  it('publishes only explicit approved projects', () => {
    expect(FIXTURES.map((p) => [p.publication, isPublished(p)])).toEqual([
      ['approved', true],
      ['review', false],
      ['draft', false],
      ['blocked', false],
      [undefined, false],
    ]);
    expect(publishedProjects(FIXTURES).map((p) => p.serial)).toEqual(['FX-001']);
  });

  it('allows the artwork placeholder only in dev mode', () => {
    const withArtwork = fixture('FX-006', 'approved', true);
    const reviewWithArtwork = fixture('FX-007', 'review', true);
    const all = [...FIXTURES, withArtwork, reviewWithArtwork];

    expect(inventoryProjects(true, all).map((p) => p.serial)).toEqual(['FX-001', 'FX-006']);
    expect(inventoryProjects(false, all).map((p) => p.serial)).toEqual(['FX-006']);
  });
});

describe('TAGS (catalog)', () => {
  it('resolves label and tone per tag', () => {
    expect(Object.values(TAGS).map((t) => [t.id, t.label['pt-BR'], t.label.en, t.tone])).toEqual([
      ['product', 'Produto', 'Product', 'warm'],
      ['gamification', 'Gamificação', 'Gamification', 'cool'],
      ['game-design', 'Game Design', 'Game Design', 'warm'],
      ['prototyping', 'Prototipagem', 'Prototyping', 'cool'],
    ]);
  });
});
