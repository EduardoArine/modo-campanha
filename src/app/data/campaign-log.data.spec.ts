import { CampaignLogEntry } from '../models';
import { CAMPAIGN_LOG as MOCK } from './campaign-log.data.development';

// Valida o MODELO e o MOCK de desenvolvimento visual (D-049). O conteúdo não é factual: os
// testes cobrem só estrutura, ordem e regras de conteúdo do Campaign Log.
const ALLOWED_KEYS = ['id', 'kind', 'period', 'title', 'context', 'summary'];

describe('Campaign Log MOCK (visual development data)', () => {
  it('has 5 entries: origin first, current last, checkpoints between', () => {
    expect(MOCK.map((e) => e.kind)).toEqual([
      'origin',
      'checkpoint',
      'checkpoint',
      'checkpoint',
      'current',
    ]);
  });

  it('marks every entry as mock (CI guard keeps it out of production)', () => {
    expect(MOCK.every((e) => e.id.startsWith('mock-campaign-log-'))).toBe(true);
    expect(new Set(MOCK.map((e) => e.id)).size).toBe(MOCK.length);
  });

  it('keeps chronological order and valid periods', () => {
    const starts = MOCK.map((e) => e.period.start);
    expect(starts).toEqual([...starts].sort((a, b) => a - b));
    for (const { period } of MOCK) {
      if (typeof period.end === 'number') expect(period.end).toBeGreaterThanOrEqual(period.start);
    }
    expect(MOCK.filter((e) => e.period.end === 'present').map((e) => e.kind)).toEqual(['current']);
  });

  it('has bilingual title, summary and context', () => {
    for (const entry of MOCK) {
      for (const text of [entry.title, entry.summary, entry.context].filter(Boolean)) {
        expect(text!['pt-BR'].length).toBeGreaterThan(0);
        expect(text!.en.length).toBeGreaterThan(0);
      }
    }
  });

  it('carries no curriculum or game-metric fields', () => {
    for (const entry of MOCK as readonly CampaignLogEntry[]) {
      expect(Object.keys(entry).filter((key) => !ALLOWED_KEYS.includes(key))).toEqual([]);
    }
    expect(JSON.stringify(MOCK)).not.toMatch(/\bXP\b|\bLV\b|level|unlocked|%|★|score|rank/i);
  });
});
