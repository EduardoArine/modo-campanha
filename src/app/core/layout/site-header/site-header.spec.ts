import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../../app.routes';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(SiteHeader);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the provisional brand, translated nav and no technical metadata', async () => {
    const el = await renderAt('/');
    const navLinks = Array.from(el.querySelectorAll('nav a')).map((a) => a.textContent?.trim());

    expect(el.querySelector('.brand')?.getAttribute('aria-label')).toBe(
      'Modo Campanha, voltar ao topo',
    );
    expect(navLinks).toEqual(['Sobre', 'Projetos']);
    expect(Array.from(el.querySelectorAll('nav a')).map((a) => a.getAttribute('href'))).toEqual([
      '/#player-status',
      '/#project-inventory',
    ]);
    expect(el.textContent).not.toMatch(/ONLINE|BUILD|VERSION|MC-01/);
  });

  it('switches nav language and marks the active language from the URL', async () => {
    const el = await renderAt('/en');
    const navLinks = Array.from(el.querySelectorAll('nav a')).map((a) => a.textContent?.trim());
    const current = el.querySelector('.languages [aria-current="true"]')!;

    expect(navLinks).toEqual(['About', 'Projects']);
    expect(el.querySelector('nav a')?.getAttribute('href')).toBe('/en#player-status');
    expect(current.getAttribute('lang')).toBe('en');
    expect(current.textContent).toContain('EN');
    expect(el.querySelector('.languages a[lang="pt-BR"]')?.getAttribute('href')).toBe('/');
  });

  it('does not render the résumé link without a real URL', async () => {
    const el = await renderAt('/');

    expect(el.querySelector('.resume')).toBeNull();
  });
});
