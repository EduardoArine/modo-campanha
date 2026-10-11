import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { routes } from '../../app.routes';
import { HeroVisual } from './hero-visual';

// Cena do Hero (D-063) + Boot / Intro (D-059): uma vez por sessão, ≤ 1 s, depois o cartucho
// MC-001 em execução na tela do CRT.
describe('HeroVisual', () => {
  async function render(): Promise<{ el: HTMLElement; detect: () => void }> {
    // Sem renderizar a Home: o Hero dela consumiria o boot da sessão antes deste componente.
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(HeroVisual);
    fixture.detectChanges();
    await fixture.whenStable();
    return { el: fixture.nativeElement as HTMLElement, detect: () => fixture.detectChanges() };
  }

  const message = (el: HTMLElement) => el.querySelector('.screen-message')?.textContent?.trim();
  const tag = (el: HTMLElement) => el.querySelector('.screen-tag')?.textContent?.trim();
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  beforeEach(() => sessionStorage.clear());
  afterEach(() => vi.unstubAllGlobals());

  it('boots on the first visit, then runs the MC-001 cartridge within 1 s', async () => {
    const { el, detect } = await render();
    expect(message(el)).toBe('INITIALIZING CAMPAIGN...');

    await wait(500);
    detect();
    expect(message(el)).toBe('PLAYER FOUND');

    await wait(500);
    detect();
    expect(message(el)).toBeUndefined();
    expect(tag(el)).toBe('MC-001 · Modo Campanha');
    expect(el.querySelector('.screen-art img')?.getAttribute('src')).toBe(
      'assets/cartridges/mc-001-modo-campanha.png',
    );
  });

  it('does not repeat the boot in the same session', async () => {
    sessionStorage.setItem('mc-boot-seen', '1');
    const { el } = await render();

    expect(tag(el)).toBe('MC-001 · Modo Campanha');
  });

  it('skips the boot with prefers-reduced-motion', async () => {
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('reduce') }));
    const { el } = await render();

    expect(tag(el)).toBe('MC-001 · Modo Campanha');
    expect(sessionStorage.getItem('mc-boot-seen')).toBeNull();
  });

  it('draws the MC-01 hardware with the inserted cartridge, all decorative', async () => {
    sessionStorage.setItem('mc-boot-seen', '1');
    const { el } = await render();
    const svg = el.querySelector('svg.hardware')!;

    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(svg.querySelector('.cart image')?.getAttribute('href')).toBe(
      'assets/cartridges/mc-001-modo-campanha.png',
    );
    expect(svg.querySelector('.controller')).not.toBeNull();
    expect(svg.textContent).toContain('MC-001');
    expect(el.querySelectorAll('a, button, [tabindex]').length).toBe(0);
  });
});
