import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { ProjectInventorySection } from './project-inventory-section';

describe('ProjectInventorySection', () => {
  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(ProjectInventorySection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  const texts = (root: Element, selector: string) =>
    Array.from(root.querySelectorAll(selector)).map((el) => el.textContent?.trim());

  it('renders only the header, without subtitle or CRT', async () => {
    const section = (await renderAt('/')).querySelector('section#project-inventory')!;

    expect(section.querySelector('h2')?.textContent).toBe('PROJECT INVENTORY');
    expect(section.querySelector('.subtitle')).toBeNull();
    expect(section.textContent).not.toContain('Cartuchos coletados durante a campanha.');
    expect(section.textContent).not.toContain('INSERT CARTRIDGE');
    expect(section.querySelector('mc-crt-project-viewer, mc-crt-frame')).toBeNull();
  });

  it('lists MC-001 in the first slot and nothing under review', async () => {
    const el = await renderAt('/');
    const items = el.querySelectorAll('ul[role="list"] > li');

    expect(items.length).toBe(1);
    expect(items[0].querySelector('mc-cart')?.getAttribute('aria-label')).toBe(
      'MC-CART MC-001: Modo Campanha, PORTFÓLIO INTERATIVO',
    );
    expect(texts(el, 'h3')).toEqual(['Modo Campanha']);
    expect(texts(el, 'mc-chip')).toEqual(['Produto', 'Gamificação']);
    expect(el.textContent).not.toMatch(/MC-002|Paco/);
  });

  it('shows the artwork placeholder (tests run in dev mode)', async () => {
    const el = await renderAt('/');

    expect(el.querySelector('.art-placeholder')?.textContent).toBe('PROJECT ARTWORK');
  });

  it('keeps the cartridge non-interactive', async () => {
    const el = await renderAt('/');

    expect(el.querySelectorAll('a, button, [tabindex], [role="button"]').length).toBe(0);
  });

  it('renders the en content', async () => {
    const el = await renderAt('/en');

    expect(el.querySelector('mc-cart')?.getAttribute('aria-label')).toBe(
      'MC-CART MC-001: Modo Campanha, INTERACTIVE PORTFOLIO',
    );
    expect(texts(el, 'mc-chip')).toEqual(['Product', 'Gamification']);
    expect(el.textContent).toContain(
      'A gamified professional portfolio that turns real projects, skills, and learnings into an interactive campaign.',
    );
  });
});
