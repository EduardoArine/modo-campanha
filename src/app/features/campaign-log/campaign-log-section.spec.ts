import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { CampaignLogSection } from './campaign-log-section';

// Testes rodam na configuração `development`: CHAPTER 00 — ORIGIN (conteúdo real, docs/15 §13)
// seguido da linha profissional MOCK (D-049).
describe('CampaignLogSection', () => {
  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(CampaignLogSection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  const texts = (root: Element, selector: string) =>
    Array.from(root.querySelectorAll(selector)).map((el) =>
      el.textContent?.replace(/\s+/g, ' ').trim(),
    );

  /** Entradas da linha profissional (fora dos capítulos). */
  const PRO = '.entry:not(.entry--chapter):not(.entry--story)';
  const STORY = '.entry--story';

  it('uses an h2 section and one ordered list: chapter (h3 + h4s), then checkpoints (h3)', async () => {
    const section = (await renderAt('/')).querySelector('section#campaign-log')!;

    expect(section.querySelector('h2')?.textContent).toBe('CAMPAIGN LOG');
    expect(section.querySelectorAll('ol[role="list"]').length).toBe(1);
    expect(section.querySelectorAll('ol > li').length).toBe(1 + 5 + 5);
    expect(texts(section, 'h3')[0]).toBe('CHAPTER 00 — ORIGIN');
    expect(texts(section, `${STORY} h4`)).toEqual([
      'Primeiro contato',
      'A escola das locadoras',
      'O pedido à joaninha',
      'Uma conquista construída com trabalho',
      'Uma coleção de histórias',
    ]);
    expect(texts(section, `${PRO} h3`)[0]).toBe('Jogos Digitais como ponto de partida');
  });

  it('opens the chapter with its signature, before the professional timeline', async () => {
    const el = await renderAt('/');
    const items = Array.from(el.querySelectorAll('ol > li'));

    expect(items[0].classList).toContain('entry--chapter');
    expect(texts(el, '.signature')).toEqual(['A campanha começou muito antes do código.']);
    expect(items.slice(1, 6).every((li) => li.classList.contains('entry--story'))).toBe(true);
  });

  it('numbers chapter checkpoints from their order and keeps system codes in English', async () => {
    const el = await renderAt('/');

    expect(texts(el, `${STORY} .kind`)).toEqual([
      'CHECKPOINT 01 · FIRST CONTACT',
      'CHECKPOINT 02 · THE RENTAL STORE YEARS',
      'CHECKPOINT 03 · THE LADYBUG WISH',
      'CHECKPOINT 04 · EARNED, NOT GIVEN',
      'CHECKPOINT 05 · BUILT FROM MEMORIES',
    ]);
  });

  it('never invents years: only "c. 1991" is a date, the rest are eras', async () => {
    const el = await renderAt('/');

    expect(texts(el, `${STORY} .period`)).toEqual([
      'c. 1991',
      'Época do SNES',
      'Infância',
      'Época do PlayStation',
      'Vida adulta',
    ]);
    expect(el.querySelectorAll(`${STORY} time`).length).toBe(1);
    expect(el.querySelector(`${STORY} time`)?.getAttribute('datetime')).toBe('1991');
  });

  it('shows the full story only on demand, with a native, localized details toggle', async () => {
    const el = await renderAt('/');
    const stories = el.querySelectorAll<HTMLDetailsElement>(`${STORY} details`);

    expect(stories.length).toBe(5);
    expect(Array.from(stories).every((d) => !d.open)).toBe(true);
    expect(stories[0].querySelector('summary .open')?.textContent).toBe('Ler a história completa');
    expect(stories[0].querySelectorAll('p').length).toBe(2);
  });

  it('resolves professional system labels from the UI dictionary', async () => {
    const el = await renderAt('/');

    expect(texts(el, `${PRO} .kind`)).toEqual([
      'NEW GAME',
      'CHECKPOINT',
      'CHECKPOINT',
      'CHECKPOINT',
      'CAMPANHA ATUAL',
    ]);
  });

  it('renders real time elements; the open current entry reads "since"', async () => {
    const el = await renderAt('/');
    const periods = texts(el, `${PRO} .period`);

    expect(periods.slice(0, 4)).toEqual([
      '2013 — 2017',
      '2014 — 2018',
      '2019 — 2022',
      '2023 — 2025',
    ]);
    expect(periods[4]).toBe('DESDE 2025');
    expect(el.querySelector(`${PRO} .period time`)?.getAttribute('datetime')).toBe('2013');
    expect(el.querySelectorAll('li:last-child .period time').length).toBe(1);
  });

  it('shows context only when present', async () => {
    const el = await renderAt('/');

    expect(texts(el, '.context')).toEqual(['FATEC Americana', 'Comunidade On']);
  });

  it('keeps decoration hidden; the only interaction is the story toggle', async () => {
    const el = await renderAt('/');

    expect(
      Array.from(el.querySelectorAll('.marker')).every(
        (m) => m.getAttribute('aria-hidden') === 'true',
      ),
    ).toBe(true);
    expect(el.querySelectorAll('a, button, [tabindex], [role="button"]').length).toBe(0);
    expect(el.querySelectorAll('summary').length).toBe(5);
    expect(el.textContent).not.toMatch(/\bXP\b|\bLV\b|unlocked|%|★/);
  });

  it('renders the en labels and content', async () => {
    const el = await renderAt('/en');

    expect(texts(el, '.signature')).toEqual(['The campaign started long before the code.']);
    expect(texts(el, `${STORY} .period`)[1]).toBe('SNES era');
    expect(texts(el, `${STORY} h4`)[3]).toBe('Earned Through Work');
    expect(el.querySelector(`${STORY} summary .open`)?.textContent).toBe('Read the full story');
    expect(texts(el, `${PRO} .kind`).at(-1)).toBe('CURRENT CAMPAIGN');
    expect(texts(el, `${PRO} .period`).at(-1)).toBe('SINCE 2025');
    expect(texts(el, `${PRO} .period`)[0]).toBe('2013 — 2017');
    expect(texts(el, `${PRO} h3`).at(-1)).toBe('Building products end to end');
  });
});
