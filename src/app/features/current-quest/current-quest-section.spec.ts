import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { CurrentQuestSection } from './current-quest-section';

// Testes rodam na configuração `development`, com o MOCK da Current Main Quest (docs/18).
describe('CurrentQuestSection', () => {
  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(CurrentQuestSection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  const texts = (root: Element, selector: string) =>
    Array.from(root.querySelectorAll(selector)).map((el) => el.textContent?.trim());

  it('is a labelled section whose status is visible text, not color alone', async () => {
    const section = (await renderAt('/')).querySelector('section#current-quest')!;
    const h2 = section.querySelector('h2')!;

    expect(section.getAttribute('aria-labelledby')).toBe(h2.id);
    expect(h2.textContent).toBe('CURRENT MAIN QUEST');
    expect(section.querySelector('mc-status.mc-status--in-progress')?.textContent).toContain(
      'IN PROGRESS',
    );
    expect(texts(section, 'h3')).toEqual(['Campanha de exemplo']);
  });

  it('renders the focus areas as a list labelled by its visible label', async () => {
    const el = await renderAt('/en');
    const list = el.querySelector('ul[role="list"]')!;

    expect(el.querySelector(`#${list.getAttribute('aria-labelledby')}`)?.textContent).toBe(
      'FOCUS AREAS',
    );
    expect(texts(list, 'li')).toEqual([
      'Sample area A',
      'Sample area B',
      'Sample area C, a longer one',
    ]);
    expect(el.querySelector('.role')?.textContent).toBe('Sample role');
  });

  it('has no interaction, metrics or progress', async () => {
    const el = await renderAt('/');

    expect(el.querySelectorAll('a, button, [tabindex], progress, meter').length).toBe(0);
    expect(el.textContent).not.toMatch(/%|\bXP\b|\bLV\b|\blevel\b/i);
  });
});
