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
      ...(withArtwork && { artwork: { src: 'assets/fixture.png', alt: text } }),
    },
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

  it('contains MC-001 Modo Campanha and no project under review', () => {
    expect(PROJECTS.map((p) => [p.serial, p.slug])).toEqual([['MC-001', 'modo-campanha']]);
    expect(JSON.stringify(PROJECTS)).not.toMatch(/MC-002|Paco/);
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
    expect(PROJECTS[0].cartridge.shell).toBe('orange');
    expect(PROJECTS[0].cartridge.accent).toBe('special');
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

  it('gives MC-001 its approved artwork with a bilingual alt', () => {
    const artwork = PROJECTS[0].cartridge.artwork!;

    expect(artwork.src).toBe('assets/cartridges/mc-001-modo-campanha.png');
    expect(artwork.alt['pt-BR']).toMatch(/^Paisagem em pixel art de um sistema em construção/);
    expect(artwork.alt.en).toMatch(/^Pixel-art landscape of a system under construction/);
  });

  it('publishes MC-001 in production (approved + approved artwork)', () => {
    expect(inventoryProjects(false).map((p) => p.serial)).toEqual(['MC-001']);
  });

  it('links MC-001 only to its repository', () => {
    expect(PROJECTS[0].links.map((l) => [l.kind, l.url])).toEqual([
      ['repository', 'https://github.com/EduardoArine/modo-campanha'],
    ]);
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
