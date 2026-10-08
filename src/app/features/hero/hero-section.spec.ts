import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { HeroSection } from './hero-section';

describe('HeroSection', () => {
  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(HeroSection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('uses Eduardo Arine as the only h1, with the brand display as plain text', async () => {
    const el = await renderAt('/');
    const h1s = el.querySelectorAll('h1');

    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent).toBe('Eduardo Arine');
    expect(el.querySelector('.brand-display')?.tagName).toBe('P');
    expect(el.querySelector('.eyebrow')?.textContent).toBe('MC-01 / PORTFÓLIO PROFISSIONAL');
  });

  it('renders the approved pt-BR copy and real links only', async () => {
    const el = await renderAt('/');
    const links = Array.from(el.querySelectorAll<HTMLAnchorElement>('.actions a'));

    expect(el.querySelector('.role')?.textContent).toBe('Desenvolvedor de Produtos Digitais');
    expect(el.querySelector('.motto')?.textContent).toBe('XP real, sem personagem.');
    expect(links[0].getAttribute('href')).toBe('/#player-status');
    expect(links[0].classList).toContain('mc-action--primary');
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      '/#player-status',
      'https://github.com/EduardoArine',
      'https://www.linkedin.com/in/eduardoarine',
    ]);
    expect(el.textContent).not.toContain('Currículo');
  });

  it('renders the approved en copy', async () => {
    const el = await renderAt('/en');

    expect(el.querySelector('.eyebrow')?.textContent).toBe('MC-01 / PROFESSIONAL PORTFOLIO');
    expect(el.querySelector('.focus')?.textContent).toBe(
      'AI • Product • Development • Gamification',
    );
    expect(el.querySelector('.motto')?.textContent).toBe('Real XP. No persona.');
    expect(el.querySelector('.actions a')?.textContent).toContain('Explore the campaign');
    expect(el.querySelector('.actions a')?.getAttribute('href')).toBe('/en#player-status');
  });

  it('hides the decorative scene from assistive technologies', async () => {
    const el = await renderAt('/');
    const scene = el.querySelector('app-hero-visual')!;

    expect(scene.getAttribute('aria-hidden')).toBe('true');
    expect(scene.querySelector('mc-crt-frame')).not.toBeNull();
    expect(scene.querySelector('[role="region"]')).toBeNull();
  });
});
