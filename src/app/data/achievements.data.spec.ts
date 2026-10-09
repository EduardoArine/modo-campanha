import { Achievement } from '../models';
import { ACHIEVEMENTS as MOCK } from './achievements.data.development';
import { MIN_ACHIEVEMENTS, shouldRenderAchievements } from './achievements.rules';

// Valida o MODELO, a regra pública e o MOCK de desenvolvimento visual (D-051). O conteúdo não é
// factual: os testes cobrem só estrutura e regras.
const ALLOWED_KEYS = ['id', 'title', 'description', 'evidence', 'year'];

/** Fixture neutro: só para exercitar a regra de quantidade. */
const fixture = (n: number): Achievement[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `fx-${i}`,
    title: { 'pt-BR': 'FX', en: 'FX' },
    description: { 'pt-BR': 'fx', en: 'fx' },
    evidence: { 'pt-BR': 'fx', en: 'fx' },
  }));

describe('Achievements public rule', () => {
  it('renders only with 2 or more achievements', () => {
    expect(MIN_ACHIEVEMENTS).toBe(2);
    expect([0, 1, 2, 3, 5].map((n) => shouldRenderAchievements(fixture(n)))).toEqual([
      false,
      false,
      true,
      true,
      true,
    ]);
  });
});

describe('Achievements MOCK (visual development data)', () => {
  it('has 4 entries, all marked as mock (CI guard keeps them out of production)', () => {
    expect(MOCK.length).toBe(4);
    expect(MOCK.every((a) => a.id.startsWith('mock-achievement-'))).toBe(true);
    expect(new Set(MOCK.map((a) => a.id)).size).toBe(MOCK.length);
  });

  it('always carries bilingual title, description and evidence', () => {
    for (const a of MOCK) {
      for (const text of [a.title, a.description, a.evidence]) {
        expect(text['pt-BR'].length).toBeGreaterThan(0);
        expect(text.en.length).toBeGreaterThan(0);
      }
    }
  });

  it('carries no badge or game-metric fields and no real campaign content', () => {
    for (const a of MOCK) {
      expect(Object.keys(a).filter((key) => !ALLOWED_KEYS.includes(key))).toEqual([]);
    }
    const json = JSON.stringify(MOCK);
    expect(json).not.toMatch(/\bXP\b|\bLV\b|level|unlocked|rarity|score|%|★/i);
    expect(json).not.toMatch(/Comunidade On|FATEC|Jogos Digitais/);
  });
});
