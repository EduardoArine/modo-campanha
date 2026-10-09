import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { SkillLoadoutSection } from './skill-loadout-section';

describe('SkillLoadoutSection', () => {
  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(SkillLoadoutSection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  const texts = (root: Element, selector: string) =>
    Array.from(root.querySelectorAll(selector)).map((el) => el.textContent?.trim());

  it('uses an h2 section, one h3 per group and a list of skills', async () => {
    const el = await renderAt('/');
    const section = el.querySelector('section#skill-loadout')!;

    expect(section.querySelector('h2')?.textContent).toBe('SKILL LOADOUT');
    expect(texts(section, 'h3')).toEqual(['BUILD', 'PRODUCT', 'AI', 'GAME DNA']);
    expect(section.querySelectorAll('ul[role="list"]').length).toBe(4);
    expect(section.querySelectorAll('li').length).toBe(18);
    expect(texts(section.querySelector('ul')!, 'li')).toContain('PostgreSQL / SQL Server');
  });

  it('keeps group codes decorative', async () => {
    const codes = Array.from((await renderAt('/')).querySelectorAll('.code'));

    expect(codes.map((code) => code.textContent?.trim())).toEqual(['BLD', 'PRD', 'AI', 'GDN']);
    expect(codes.every((code) => code.getAttribute('aria-hidden') === 'true')).toBe(true);
  });

  it('renders skills as plain informative content (no interaction, no proficiency)', async () => {
    const el = await renderAt('/');

    expect(el.querySelectorAll('button, a, [tabindex], [role="button"], mc-chip').length).toBe(0);
    expect(el.textContent).not.toMatch(/%|★|level|nível|expert|beginner|unlocked/i);
  });

  it('renders the en content with the same system titles', async () => {
    const el = await renderAt('/en');

    expect(el.querySelector('h2')?.textContent).toBe('SKILL LOADOUT');
    expect(texts(el, 'h3')).toEqual(['BUILD', 'PRODUCT', 'AI', 'GAME DNA']);
    expect(texts(el, 'li')).toContain('Prompt & workflow design');
    expect(texts(el, 'li')).toContain('AI-assisted development');
  });
});
