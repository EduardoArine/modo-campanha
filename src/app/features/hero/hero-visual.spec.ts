import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { routes } from '../../app.routes';
import { HeroVisual } from './hero-visual';

// Cena do Hero (D-066): renders oficiais do ecossistema MC-01 + Boot / Intro (D-059): uma vez por
// sessão, ≤ 1 s, depois o cartucho MC-001 em execução na tela do CRT.
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
    // Derivado leve do SYSTEM HORIZON para a tela, não a arte de 215 KB.
    expect(el.querySelector('.screen-art')?.getAttribute('href')).toBe(
      'assets/hero/screen-440.webp',
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

  it('composes the official renders (no redrawn hardware), all decorative', async () => {
    sessionStorage.setItem('mc-boot-seen', '1');
    const { el } = await render();
    const images = Array.from(el.querySelectorAll<HTMLImageElement>('img.obj, .crt img'));

    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(images.map((img) => img.getAttribute('src'))).toEqual([
      'assets/hero/crt-900.webp',
      'assets/hero/console-1040.webp',
      'assets/hero/cart-300.webp',
      'assets/hero/controller-680.webp',
    ]);
    for (const img of images) {
      expect(img.getAttribute('alt')).toBe('');
      expect(img.getAttribute('srcset')).toMatch(/ \d+w, .* \d+w$/);
      expect(img.getAttribute('sizes')).toBeTruthy();
      expect(Number(img.getAttribute('width'))).toBeGreaterThan(0);
    }
    // A tela é recortada no vidro do render; nada de hardware desenhado em SVG/CSS.
    expect(el.querySelector('.screen clipPath path')).not.toBeNull();
    expect(el.querySelector('mc-crt-frame, svg.hardware')).toBeNull();
    expect(el.querySelectorAll('a, button, [tabindex]').length).toBe(0);
  });
});
