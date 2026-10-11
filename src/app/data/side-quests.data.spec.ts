import { SideQuestKind } from '../models';
import { SIDE_QUESTS as MOCK } from './side-quests.data.development';

// Valida o MODELO e o MOCK de desenvolvimento visual (docs/19). O conteúdo não é factual.
const ALLOWED_KEYS = ['id', 'kind', 'title', 'summary'];
const KINDS: readonly SideQuestKind[] = ['game', 'art', 'ai', 'interface', 'study'];

describe('Side Quests MOCK (visual development data)', () => {
  it('marks every entry as mock (CI guard keeps it out of production)', () => {
    expect(MOCK.length).toBeGreaterThan(0);
    expect(MOCK.every((q) => q.id.startsWith('mock-side-quest-'))).toBe(true);
    expect(new Set(MOCK.map((q) => q.id)).size).toBe(MOCK.length);
  });

  it('keeps only model fields, known kinds and bilingual, explicitly fictional texts', () => {
    for (const quest of MOCK) {
      expect(Object.keys(quest).every((key) => ALLOWED_KEYS.includes(key))).toBe(true);
      expect(KINDS).toContain(quest.kind);
      expect(quest.title['pt-BR']).toMatch(/exemplo/i);
      expect(quest.title.en).toMatch(/sample/i);
      expect(quest.summary['pt-BR'].length).toBeGreaterThan(0);
      expect(quest.summary.en.length).toBeGreaterThan(0);
    }
  });
});
