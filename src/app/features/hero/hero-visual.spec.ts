import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { routes } from '../../app.routes';
import { HeroVisual } from './hero-visual';

// Boot / Intro (FASE 5, D-059): na tela do CRT, uma vez por sessão, ≤ 1 s.
describe('HeroVisual boot', () => {
  async function render(): Promise<{ el: HTMLElement; detect: () => void }> {
    // Sem renderizar a Home: o Hero dela consumiria o boot da sessão antes deste componente.
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(HeroVisual);
    fixture.detectChanges();
    await fixture.whenStable();
    return { el: fixture.nativeElement as HTMLElement, detect: () => fixture.detectChanges() };
  }

  const message = (el: HTMLElement) => el.querySelector('.screen-message')?.textContent?.trim();
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  beforeEach(() => sessionStorage.clear());
  afterEach(() => vi.unstubAllGlobals());

  it('boots on the first visit of the session and ends on INSERT CARTRIDGE within 1 s', async () => {
    const { el, detect } = await render();
    expect(message(el)).toBe('INITIALIZING CAMPAIGN...');

    await wait(500);
    detect();
    expect(message(el)).toBe('PLAYER FOUND');

    await wait(500);
    detect();
    expect(message(el)).toBe('INSERT CARTRIDGE');
  });

  it('does not repeat in the same session', async () => {
    sessionStorage.setItem('mc-boot-seen', '1');
    const { el } = await render();

    expect(message(el)).toBe('INSERT CARTRIDGE');
  });

  it('is skipped with prefers-reduced-motion', async () => {
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('reduce') }));
    const { el } = await render();

    expect(message(el)).toBe('INSERT CARTRIDGE');
    expect(sessionStorage.getItem('mc-boot-seen')).toBeNull();
  });

  it('stays decorative (hidden from assistive technologies)', async () => {
    const { el } = await render();

    expect(el.getAttribute('aria-hidden')).toBe('true');
  });
});
