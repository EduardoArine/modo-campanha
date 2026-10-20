import type { Localized } from '../core/i18n';
import { CampaignLogChapterEntry, CampaignLogWhen } from '../models';
import { CAMPAIGN_LOG_CHAPTERS } from './campaign-log.data';

// Fonte canônica do Campaign Log (D-074): os três capítulos reais, iguais em todos os ambientes.
// Substitui os testes do MOCK aposentado (D-049) com as mesmas regras, agora sobre o conteúdo real:
// ids únicos, ordem cronológica, textos nos dois idiomas e nenhuma métrica de jogo.
const ALL = CAMPAIGN_LOG_CHAPTERS.flatMap((chapter) => chapter.entries);

/** Ano usado para ordenar um checkpoint; épocas em texto não têm ano e ficam de fora. */
function sortYear(when: CampaignLogWhen): number | null {
  if ('year' in when) return when.year;
  if ('span' in when) return when.span.start;
  if ('since' in when) return when.since;
  if ('approx' in when) return typeof when.approx === 'number' ? when.approx : when.approx[0];
  return null;
}

/** Todos os textos localizados de um checkpoint. */
function localizedOf(entry: CampaignLogChapterEntry): Localized<string | readonly string[]>[] {
  return [
    entry.title,
    entry.summary,
    entry.story,
    ...('era' in entry.when ? [entry.when.era] : []),
    ...(entry.photos ?? []).map((p) => p.alt),
    ...(entry.links ?? []).flatMap((l) => [l.label, ...(l.note ? [l.note] : [])]),
  ];
}

describe('Campaign Log — canonical chapters', () => {
  it('publishes CHAPTERS 00, 01 and 02, with 5 + 5 + 4 checkpoints', () => {
    expect(CAMPAIGN_LOG_CHAPTERS.map((c) => [c.number, c.entries.length])).toEqual([
      ['00', 5],
      ['01', 5],
      ['02', 4],
    ]);
  });

  it('holds only real content: unique ids, none of them mock', () => {
    const ids = [...CAMPAIGN_LOG_CHAPTERS.map((c) => c.id), ...ALL.map((e) => e.id)];
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.some((id) => id.includes('mock'))).toBe(false);
  });

  it('keeps chronological order across chapters', () => {
    const years = ALL.map((e) => sortYear(e.when)).filter((y): y is number => y !== null);
    expect(years).toEqual([...years].sort((a, b) => a - b));
    const [, fatec, chapter02] = CAMPAIGN_LOG_CHAPTERS;
    expect(chapter02.period?.start).toBeGreaterThan(fatec.period?.end as number);
  });

  it('keeps only the last chapter open, ending on the current campaign', () => {
    expect(CAMPAIGN_LOG_CHAPTERS.map((c) => !!c.ongoing)).toEqual([false, false, true]);
    expect(CAMPAIGN_LOG_CHAPTERS.at(-1)?.entries.at(-1)?.when).toEqual({ since: 2025 });
  });

  it('has every text in both languages, with the same number of paragraphs', () => {
    for (const entry of ALL) {
      for (const text of localizedOf(entry)) {
        const pt = [text['pt-BR']].flat();
        const en = [text.en].flat();
        expect(en.length).toBe(pt.length);
        expect([...pt, ...en].every((s) => s.trim().length > 0)).toBe(true);
      }
      // Título, resumo e história são traduzidos, nunca copiados de um idioma para o outro.
      expect(entry.title.en).not.toBe(entry.title['pt-BR']);
      expect(entry.summary.en).not.toBe(entry.summary['pt-BR']);
    }
    for (const chapter of CAMPAIGN_LOG_CHAPTERS) {
      for (const text of [chapter.name, chapter.signature, chapter.context, chapter.closing]) {
        if (text) expect(text['pt-BR'].length * text.en.length).toBeGreaterThan(0);
      }
    }
  });

  it('carries no game metrics (the approved motto is the only "XP")', () => {
    const json = JSON.stringify(CAMPAIGN_LOG_CHAPTERS)
      .replace('XP real, sem personagem.', '')
      .replace('Real XP. No persona.', '');
    expect(json).not.toMatch(/\bXP\b|\bLV\b|\brank\b|%|★/i);
  });

  it('places every checkpoint on its chapter map (D-091): 0–100, left to right, no shared point', () => {
    for (const chapter of CAMPAIGN_LOG_CHAPTERS) {
      const points = chapter.entries.map((e) => e.map);
      for (const { x, y } of points) {
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(100);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(100);
      }
      // A rota segue a ordem dos marcos, da esquerda para a direita.
      expect(points.map((p) => p.x)).toEqual([...points.map((p) => p.x)].sort((a, b) => a - b));
      expect(new Set(points.map((p) => p.x + ',' + p.y)).size).toBe(points.length);
    }
  });
});
