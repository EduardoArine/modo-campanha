import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { PlayerStatusSection } from './player-status-section';

// Player Status definitivo (D-082): painel do mockup aprovado, conteúdo real nos dois idiomas.
describe('PlayerStatusSection', () => {
  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(PlayerStatusSection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  const texts = (root: Element, selector: string) =>
    Array.from(root.querySelectorAll(selector)).map((el) => el.textContent?.trim());

  it('renders the header with the section title and the system bar (no invented version)', async () => {
    const el = await renderAt('/');

    expect(el.querySelector('h2#player-status-title')?.textContent?.trim()).toBe(
      'STATUS DO JOGADOR',
    );
    expect(el.querySelector('.subtitle')?.textContent?.trim()).toBe(
      'PERFIL DO JOGADOR // DADOS DA CAMPANHA ATUAL',
    );
    expect(texts(el, '.system > li')).toEqual(['MC-01', 'MODO CAMPANHA', 'ONLINE']);
    expect(el.querySelector('.system')?.textContent).not.toMatch(/v\d/);
  });

  it('renders the Player Card with the real photo, PLAYER 01 and the real XP badge (no LV)', async () => {
    const el = await renderAt('/');
    const card = el.querySelector('mc-player-card')!;
    const img = card.querySelector('img')!;

    expect(card.querySelector('.name')?.textContent).toBe('Eduardo Arine');
    expect(card.querySelector('.player')?.textContent).toBe('JOGADOR 01');
    expect(img.getAttribute('src')).toBe('assets/player/eduardo-arine-640.webp');
    expect(img.getAttribute('srcset')).toContain('eduardo-arine-960.webp 960w');
    expect(img.getAttribute('alt')).toMatch(/^Eduardo Arine, de boné turquesa/);
    expect(card.querySelector('.placeholder')).toBeNull();
    expect(texts(card, '.badge > span')).toEqual(['XP', '10+']);
    expect(card.querySelector('.badge')?.getAttribute('aria-hidden')).toBe('true');
    expect(card.querySelector('.bar')?.getAttribute('aria-hidden')).toBe('true');
    expect(el.textContent).not.toMatch(/\bLV\b|\b99\b/);
  });

  it('renders the player facts with the public spelling "Comunidade ON" (pt-BR)', async () => {
    const el = await renderAt('/');
    const facts = el.querySelector('.facts')!;

    expect(facts.tagName).toBe('DL');
    expect(texts(facts, 'dt')).toEqual(['ORIGEM', 'XP', 'CAMPANHA ATUAL', 'FOCO']);
    expect(texts(facts, 'dd')).toEqual([
      'Tecnologia em Jogos Digitais',
      '10+ anos em tecnologia',
      'Comunidade ON',
      'IA aplicada ao desenvolvimento',
    ]);
  });

  it('renders the journey, the current state and the closing quote as real text', async () => {
    const el = await renderAt('/');

    expect(texts(el, '.box-title')).toEqual(['SOBRE A JORNADA', 'ESTADO ATUAL']);
    expect(texts(el, '.journey .text')).toHaveLength(2);
    expect(el.querySelector('.journey .text')?.textContent).toMatch(
      /^Sou desenvolvedor de produtos digitais e atuo na interseção/,
    );
    expect(el.querySelector('.tagline')?.textContent?.trim()).toBe(
      'Tecnologia para pessoas reais.',
    );
    expect(texts(el, '.states dt')).toEqual(['CONSTRUINDO', 'APRENDENDO', 'EVOLUINDO']);
    expect(texts(el, '.states dd')).toEqual([
      'Soluções com impacto',
      'Todos os dias',
      'Como profissional e pessoa',
    ]);
    expect(el.querySelector('.quote q')?.textContent).toBe('MESMA ESSÊNCIA, NOVOS NÍVEIS.');
    expect(el.querySelector('.journey .mountains')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders the English version', async () => {
    const el = await renderAt('/en');

    expect(el.querySelector('.subtitle')?.textContent?.trim()).toBe(
      'PLAYER PROFILE // CURRENT CAMPAIGN DATA',
    );
    expect(texts(el.querySelector('.facts')!, 'dt')).toEqual([
      'ORIGIN',
      'XP',
      'CURRENT CAMPAIGN',
      'FOCUS',
    ]);
    expect(texts(el, '.box-title')).toEqual(['ABOUT THE JOURNEY', 'CURRENT STATE']);
    expect(el.querySelector('.tagline')?.textContent?.trim()).toBe('Technology for real people.');
    expect(texts(el, '.states dt')).toEqual(['BUILDING', 'LEARNING', 'EVOLVING']);
    expect(el.querySelector('.quote q')?.textContent).toBe('SAME ESSENCE, NEW LEVELS.');
    expect(el.querySelector('mc-player-card img')?.getAttribute('alt')).toMatch(
      /^Eduardo Arine in a turquoise cap/,
    );
  });
});
