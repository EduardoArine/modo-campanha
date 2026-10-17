import { ORIGIN_CHAPTER } from './campaign-log.chapters.data';
import { CAMPAIGN_LOG_CHAPTERS as DEV_CHAPTERS } from './campaign-log.data.development';

// CHAPTER 00 — ORIGIN (docs/15 §13): relato real do Eduardo. Os testes protegem as regras
// factuais (nada de anos inventados, nada de métrica) e a fidelidade ao texto fornecido.
describe('Campaign Log — CHAPTER 00 ORIGIN', () => {
  const entries = ORIGIN_CHAPTER.entries;

  it('has five checkpoints in the approved order', () => {
    expect(entries.map((e) => e.code)).toEqual([
      'FIRST CONTACT',
      'THE RENTAL STORE YEARS',
      'THE LADYBUG WISH',
      'EARNED, NOT GIVEN',
      'BUILT FROM MEMORIES',
    ]);
    expect(new Set(entries.map((e) => e.id)).size).toBe(5);
  });

  it('is real content, never flagged or guarded as MOCK', () => {
    expect([ORIGIN_CHAPTER.id, ...entries.map((e) => e.id)].some((id) => id.includes('mock'))).toBe(
      false,
    );
  });

  it('uses only the approximate year provided (c. 1991); every other entry is an era', () => {
    expect(entries.filter((e) => 'approx' in e.when).map((e) => e.when)).toEqual([
      { approx: 1991 },
    ]);
    expect(entries.slice(1).every((e) => 'era' in e.when)).toBe(true);
  });

  it('takes each summary literally from its own story, in both languages', () => {
    for (const entry of entries) {
      for (const locale of ['pt-BR', 'en'] as const) {
        expect(entry.story[locale].join(' ')).toContain(entry.summary[locale]);
        expect(entry.story[locale].length).toBe(2);
      }
    }
  });

  it('keeps the ladybug ambiguity and the non-tech nature of the first job', () => {
    const ladybug = entries[2].story['pt-BR'].join(' ');
    expect(ladybug).toContain('não sei se foi coincidência ou sorte');
    const work = entries[3].story.en.join(' ');
    expect(work).toContain("construction laborer's assistant");
    expect(JSON.stringify(ORIGIN_CHAPTER)).not.toMatch(/\bXP\b|\bLV\b|level|score|rank|%|★/i);
  });

  it('shows the two real photos only in BUILT FROM MEMORIES, with bilingual alt and original ratio', () => {
    expect(entries.slice(0, 4).every((e) => !e.photos)).toBe(true);
    const photos = entries[4].photos ?? [];
    expect(photos.map((p) => [p.width, p.height])).toEqual([
      [720, 960],
      [960, 720],
    ]);
    for (const p of photos) {
      expect(p.src).toMatch(/^assets\/campaign-log\/origin\/.+\.webp$/);
      expect(p.alt['pt-BR'].length).toBeGreaterThan(20);
      expect(p.alt.en.length).toBeGreaterThan(20);
    }
  });

  it('appears in development for review (production publishes no chapter yet)', () => {
    expect(DEV_CHAPTERS).toEqual([ORIGIN_CHAPTER]);
  });
});
