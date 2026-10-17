import { CHAPTER_02, FATEC_CHAPTER, ORIGIN_CHAPTER } from './campaign-log.chapters.data';
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
    expect(entries.filter((e) => !('era' in e.when)).map((e) => e.when)).toEqual([
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

  it('appears in development next to CHAPTER 01 (production publishes CHAPTER 00 only)', () => {
    expect(DEV_CHAPTERS).toEqual([ORIGIN_CHAPTER, FATEC_CHAPTER, CHAPTER_02]);
  });
});

// CHAPTER 01 — DO CONTROLE AO CÓDIGO (docs/15 §14): texto pt do Eduardo; en pendente de aprovação.
describe('Campaign Log — CHAPTER 01 FATEC', () => {
  const entries = FATEC_CHAPTER.entries;

  it('spans 2013–2017 at FATEC Americana and closes the chapter', () => {
    expect(FATEC_CHAPTER.period).toEqual({ start: 2013, end: 2017 });
    expect(FATEC_CHAPTER.context?.['pt-BR']).toBe('Tecnologia em Jogos Digitais · FATEC Americana');
    expect(FATEC_CHAPTER.closing?.['pt-BR']).toBe('A campanha estava apenas começando.');
    expect(entries.length).toBe(5);
    expect(entries.every((e) => !e.code)).toBe(true);
  });

  it('uses only the years Eduardo gave; the project checkpoint is an era', () => {
    expect(entries.map((e) => e.when)).toEqual([
      { year: 2013 },
      { era: { 'pt-BR': 'Durante a graduação', en: 'During college' } },
      { year: 2016 },
      { year: 2017 },
      { year: 2017 },
    ]);
  });

  it('keeps the facts: two Best Game awards, the 2017 launch and the grade', () => {
    const pt = JSON.stringify(FATEC_CHAPTER);
    expect(pt.match(/Melhor Jogo — Categoria Acadêmica/g)?.length).toBeGreaterThanOrEqual(2);
    expect(pt).toContain('FAEL 2016');
    expect(pt).toContain('Google Play em maio de 2017');
    expect(pt).toContain('recebi nota 10');
    // "score" (nota do TCC) e "levels" (fases do jogo) são legítimos; métricas de jogo, não.
    expect(pt).not.toMatch(/\bXP\b|\bLV\b|\brank\b|%|★/i);
  });

  it('takes each summary literally from its own story, in both languages', () => {
    for (const entry of entries) {
      for (const locale of ['pt-BR', 'en'] as const) {
        expect(entry.story[locale].join(' ')).toContain(entry.summary[locale]);
        expect(entry.story[locale].length).toBe(entry.story['pt-BR'].length);
      }
    }
  });
});

// CHAPTER 02 (docs/15 §15): ScoutEvo, textos pt/en do Eduardo; nome do capítulo ainda não definido.
describe('Campaign Log — CHAPTER 02 (ScoutEvo)', () => {
  const [scoutevo] = CHAPTER_02.entries;

  it('has no invented chapter name or signature yet', () => {
    expect(CHAPTER_02.name).toBeUndefined();
    expect(CHAPTER_02.signature).toBeUndefined();
    expect(CHAPTER_02.period).toBeUndefined();
  });

  it('keeps the facts: 2018, the Flamengo competition and the shared database work', () => {
    expect(scoutevo.when).toEqual({ year: 2018 });
    const pt = scoutevo.story['pt-BR'].join(' ');
    expect(pt).toContain('venceu uma maratona de inovação ligada ao Flamengo');
    expect(pt).toContain(
      'A parte de banco de dados ficou sob responsabilidade de outro integrante.',
    );
    expect(scoutevo.story.en.join(' ')).toContain(
      'Database development was handled by another team member.',
    );
  });

  it('shows the collage Eduardo sent, at its original ratio, with bilingual alt', () => {
    expect(scoutevo.photos?.map((p) => [p.src, p.width, p.height])).toEqual([
      ['assets/campaign-log/scoutevo/scoutevo-win-894.webp', 894, 1112],
    ]);
    expect(scoutevo.photos?.[0].alt.en).toContain('And the winner is: ScoutEvo');
  });

  it('links the O Globo report about the competition', () => {
    expect(scoutevo.links?.map((l) => l.url)).toEqual([
      'https://oglobo.globo.com/esportes/flamengo-faz-maratona-de-inovacao-em-sao-paulo-para-aprimorar-gestao-22577762',
    ]);
  });

  it('takes the summary literally from the story, in both languages', () => {
    for (const locale of ['pt-BR', 'en'] as const) {
      expect(scoutevo.story[locale][0]).toBe(scoutevo.summary[locale]);
      expect(scoutevo.story[locale].length).toBe(5);
    }
  });
});

// CHAPTER 02 · EOS (2019): textos pt/en do Eduardo.
describe('Campaign Log — CHAPTER 02 (EOS)', () => {
  const eos = CHAPTER_02.entries[1];

  it('is the second checkpoint of CHAPTER 02, in 2019', () => {
    expect(CHAPTER_02.entries.map((e) => e.code)).toEqual(['SCOUTEVO', 'EOS']);
    expect(eos.when).toEqual({ year: 2019 });
  });

  it('keeps the facts: frontend in ASP.NET/C#, Sept 2019 handover, Unicamp and the 2021 paper', () => {
    const pt = eos.story['pt-BR'].join(' ');
    expect(pt).toContain(
      'fui responsável por todo o frontend da aplicação web, desenvolvido com ASP.NET e C#',
    );
    expect(pt).toContain(
      'Em setembro de 2019, o sistema foi disponibilizado à Central Estadual de Transplantes de São Paulo e divulgado pela Unicamp.',
    );
    expect(pt).toContain('Case Studies on Transport Policy, em 2021');
    expect(eos.story.en.join(' ')).toContain("São Paulo's State Transplant Center");
  });

  it('takes the summary literally from the story, in both languages', () => {
    for (const locale of ['pt-BR', 'en'] as const) {
      expect(eos.story[locale][0]).toBe(eos.summary[locale]);
      expect(eos.story[locale].length).toBe(6);
    }
  });
});
