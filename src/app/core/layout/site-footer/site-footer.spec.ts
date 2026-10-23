import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../../app.routes';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(SiteFooter);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  const text = (el: Element | null) => el?.textContent?.replace(/\s+/g, ' ').trim();

  it('renders only the copyright with the current year (the motto stays in the Hero)', async () => {
    const el = await renderAt('/');

    expect(el.querySelector('footer')).not.toBeNull();
    expect(el.querySelector('.motto')).toBeNull();
    expect(text(el.querySelector('.copyright small'))).toBe(
      `© ${new Date().getFullYear()} Eduardo Arine · Modo Campanha`,
    );
  });

  it('renders the en copyright', async () => {
    const el = await renderAt('/en');

    expect(text(el.querySelector('.copyright'))).toBe(
      `© ${new Date().getFullYear()} Eduardo Arine · Modo Campanha`,
    );
  });

  it('carries only the signature: no links, icons, brand mark or game language', async () => {
    const el = await renderAt('/');

    expect(el.querySelectorAll('a, button, mc-icon, svg, img').length).toBe(0);
    expect(el.textContent).not.toMatch(/SAVE|CONTINUE|MC-01|STATUS|GitHub|LinkedIn|Currículo/);
    expect(el.querySelector('h2, h3')).toBeNull();
  });
});
