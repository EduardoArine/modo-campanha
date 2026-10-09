import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { CampaignLogSection } from './campaign-log-section';

// Testes rodam na configuração `development`, com o MOCK do Campaign Log (D-049).
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

  it('uses an h2 section and an ordered list with one h3 per checkpoint', async () => {
    const section = (await renderAt('/')).querySelector('section#campaign-log')!;

    expect(section.querySelector('h2')?.textContent).toBe('CAMPAIGN LOG');
    expect(section.querySelectorAll('ol[role="list"] > li').length).toBe(5);
    expect(texts(section, 'h3')[0]).toBe('Jogos Digitais como ponto de partida');
  });

  it('resolves system labels from the UI dictionary', async () => {
    const el = await renderAt('/');

    expect(texts(el, '.kind')).toEqual([
      'NEW GAME',
      'CHECKPOINT',
      'CHECKPOINT',
      'CHECKPOINT',
      'CAMPANHA ATUAL',
    ]);
  });

  it('renders real time elements; the open current entry reads "since"', async () => {
    const el = await renderAt('/');
    const periods = texts(el, '.period');

    expect(periods.slice(0, 4)).toEqual([
      '2013 — 2017',
      '2014 — 2018',
      '2019 — 2022',
      '2023 — 2025',
    ]);
    expect(periods[4]).toBe('DESDE 2025');
    expect(el.querySelector('.period time')?.getAttribute('datetime')).toBe('2013');
    expect(el.querySelectorAll('li:last-child .period time').length).toBe(1);
  });

  it('shows context only when present', async () => {
    const el = await renderAt('/');

    expect(texts(el, '.context')).toEqual(['FATEC Americana', 'Comunidade On']);
  });

  it('keeps decoration hidden and nothing interactive', async () => {
    const el = await renderAt('/');

    expect(
      Array.from(el.querySelectorAll('.marker')).every(
        (m) => m.getAttribute('aria-hidden') === 'true',
      ),
    ).toBe(true);
    expect(el.querySelectorAll('a, button, [tabindex], [role="button"]').length).toBe(0);
    expect(el.textContent).not.toMatch(/\bXP\b|\bLV\b|unlocked|%|★/);
  });

  it('renders the en labels and content', async () => {
    const el = await renderAt('/en');

    expect(texts(el, '.kind').at(-1)).toBe('CURRENT CAMPAIGN');
    expect(texts(el, '.period').at(-1)).toBe('SINCE 2025');
    expect(texts(el, '.period')[0]).toBe('2013 — 2017');
    expect(texts(el, 'h3').at(-1)).toBe('Building products end to end');
  });
});
