import { CURRENT_QUEST as MOCK } from './current-quest.data.development';

// Valida o MODELO e o MOCK de desenvolvimento visual (docs/18). O conteúdo não é factual.
const ALLOWED_KEYS = ['id', 'title', 'role', 'summary', 'focus'];

describe('Current Main Quest MOCK (visual development data)', () => {
  it('is marked as mock (CI guard keeps it out of production) and fictional', () => {
    expect(MOCK?.id).toBe('mock-current-quest');
    expect(MOCK?.title['pt-BR']).toMatch(/exemplo/i);
    expect(MOCK?.title.en).toMatch(/sample/i);
  });

  it('keeps only model fields and 2–4 bilingual focus areas', () => {
    expect(Object.keys(MOCK!).every((key) => ALLOWED_KEYS.includes(key))).toBe(true);
    for (const locale of ['pt-BR', 'en'] as const) {
      expect(MOCK!.focus[locale].length).toBeGreaterThanOrEqual(2);
      expect(MOCK!.focus[locale].length).toBeLessThanOrEqual(4);
    }
    expect(MOCK!.focus['pt-BR'].length).toBe(MOCK!.focus.en.length);
  });
});
