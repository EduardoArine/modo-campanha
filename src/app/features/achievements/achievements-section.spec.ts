import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { AchievementsSection } from './achievements-section';

// Testes rodam na configuração `development`, com o MOCK de Achievements (D-051).
describe('AchievementsSection', () => {
  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(AchievementsSection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  const texts = (root: Element, selector: string) =>
    Array.from(root.querySelectorAll(selector)).map((el) =>
      el.textContent?.replace(/\s+/g, ' ').trim(),
    );

  it('uses an h2 section, one list and one h3 per achievement', async () => {
    const section = (await renderAt('/')).querySelector('section#achievements')!;

    expect(section.querySelector('h2')?.textContent).toBe('ACHIEVEMENTS');
    expect(section.querySelectorAll('ul[role="list"]').length).toBe(1);
    expect(section.querySelectorAll('ul > li').length).toBe(4);
    expect(texts(section, 'h3')[0]).toBe('MARCO DE EXEMPLO A');
  });

  it('derives decorative ACH codes from the presentation order', async () => {
    const codes = Array.from((await renderAt('/')).querySelectorAll('.code'));

    expect(codes.map((c) => c.textContent?.trim())).toEqual([
      'ACH-01',
      'ACH-02',
      'ACH-03',
      'ACH-04',
    ]);
    expect(codes.every((c) => c.getAttribute('aria-hidden') === 'true')).toBe(true);
  });

  it('labels the evidence with visible text', async () => {
    const el = await renderAt('/');

    expect(texts(el, '.evidence')[0]).toBe('EVIDÊNCIA: Fonte pública de exemplo');
  });

  it('is purely informative (no interaction, no badge language)', async () => {
    const el = await renderAt('/');

    expect(el.querySelectorAll('a, button, [tabindex], [role="button"], img').length).toBe(0);
    expect(el.textContent).not.toMatch(/\bXP\b|unlocked|rarity|★|%/i);
  });

  it('renders the en content and label', async () => {
    const el = await renderAt('/en');

    expect(texts(el, 'h3')[0]).toBe('SAMPLE MILESTONE A');
    expect(texts(el, '.evidence')[0]).toBe('EVIDENCE: Sample public source');
  });
});
