import { DeferBlockBehavior, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { HeroScene } from './hero-scene';

// Cena da Hero (D-067 + D-068): fundo decorativo + controle de pausa do attract mode.
describe('HeroScene', () => {
  async function renderAt(url: string) {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
      // A tela do SYSTEM HORIZON (canvas) não roda no ambiente de teste.
      deferBlockBehavior: DeferBlockBehavior.Manual,
    });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(HeroScene);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const detect = () => fixture.detectChanges();
    // O teaser entra depois do load + idle (whenLoadedAndIdle); aqui, direto.
    const showTeaser = () => {
      fixture.componentInstance['teaserReady'].set(true);
      detect();
    };
    return { el, detect, showTeaser };
  }

  async function renderWithTeaser(url: string) {
    const scene = await renderAt(url);
    scene.showTeaser();
    return scene;
  }

  const toggle = (el: HTMLElement) => el.querySelector<HTMLButtonElement>('button.toggle')!;

  afterEach(() => vi.unstubAllGlobals());

  it('shows the pause control only with the teaser (no early "Pausar")', async () => {
    const { el, showTeaser } = await renderAt('/');
    expect(toggle(el)).toBeNull();

    showTeaser();
    expect(toggle(el).getAttribute('aria-label')).toBe('Pausar demonstração');
  });

  it('keeps the background decorative and the pause control as the only interactive element', async () => {
    const { el } = await renderWithTeaser('/');

    expect(el.querySelector('.frame')?.getAttribute('aria-hidden')).toBe('true');
    expect(el.querySelectorAll('img').length).toBe(1);
    expect(el.querySelectorAll('a, button, [tabindex]').length).toBe(1);
    expect(toggle(el).getAttribute('type')).toBe('button');
  });

  it('plays by default with a localized pause control (pt-BR), then plays again', async () => {
    const { el, detect } = await renderWithTeaser('/');
    expect(toggle(el).getAttribute('aria-label')).toBe('Pausar demonstração');

    toggle(el).click();
    detect();
    expect(toggle(el).getAttribute('aria-label')).toBe('Reproduzir');
    toggle(el).click();
    detect();
    expect(toggle(el).getAttribute('aria-label')).toBe('Pausar demonstração');
  });

  it('localizes the control in English', async () => {
    const { el } = await renderWithTeaser('/en');

    expect(toggle(el).getAttribute('aria-label')).toBe('Pause demo');
  });

  it('starts on the static keyframe with prefers-reduced-motion', async () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query.includes('reduce'),
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }));
    const { el } = await renderWithTeaser('/');

    expect(toggle(el).getAttribute('aria-label')).toBe('Reproduzir');
  });
});
