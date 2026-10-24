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

  it('renders the brand symbol, translated nav and no technical metadata', async () => {
    const el = await renderAt('/');
    const navLinks = Array.from(el.querySelectorAll('nav a')).map((a) => a.textContent?.trim());

    const brand = el.querySelector('.brand')!;
    // Símbolo decorativo (D-085); o nome acessível contém o texto visível "MODO CAMPANHA" (WCAG 2.5.3).
    expect(brand.getAttribute('aria-label')).toBe('Modo Campanha, voltar ao topo');
    expect(brand.querySelector('svg.symbol')?.getAttribute('aria-hidden')).toBe('true');
    expect(brand.querySelectorAll('svg.symbol .glyph rect').length).toBe(4);
    expect(brand.textContent?.trim()).toBe('MODO CAMPANHA');
    expect(navLinks).toEqual(['Sobre', 'Projetos', 'Jornada', 'Contato']);
    expect(Array.from(el.querySelectorAll('nav a')).map((a) => a.getAttribute('href'))).toEqual([
      '/#player-status',
      '/#project-inventory',
      '/#campaign-log',
      '/#final-checkpoint',
    ]);
    expect(el.textContent).not.toMatch(/ONLINE|BUILD|VERSION|MC-01/);
  });

  it('switches nav language and marks the active language from the URL', async () => {
    const el = await renderAt('/en');
    const navLinks = Array.from(el.querySelectorAll('nav a')).map((a) => a.textContent?.trim());
    const current = el.querySelector('.languages [aria-current="true"]')!;

    expect(navLinks).toEqual(['About', 'Projects', 'Journey', 'Contact']);
    expect(el.querySelector('nav a')?.getAttribute('href')).toBe('/en#player-status');
    expect(current.getAttribute('lang')).toBe('en');
    expect(current.textContent).toContain('EN');
    expect(el.querySelector('.languages a[lang="pt-BR"]')?.getAttribute('href')).toBe('/');
  });

  it('links the résumé PDF of the page language, in a new tab (D-099)', async () => {
    const pt = await renderAt('/');
    const link = pt.querySelector<HTMLAnchorElement>('a.resume')!;

    expect(link.getAttribute('href')).toBe('assets/cv/eduardo-arine-curriculo.pdf');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener');
    expect(link.getAttribute('type')).toBe('application/pdf');
    expect(link.textContent?.replace(/\s+/g, ' ').trim()).toBe('Currículo (PDF, abre em nova aba)');
  });

  it('links the English résumé on /en', async () => {
    const en = await renderAt('/en');

    expect(en.querySelector('a.resume')?.getAttribute('href')).toBe(
      'assets/cv/eduardo-arine-resume.pdf',
    );
  });
});
