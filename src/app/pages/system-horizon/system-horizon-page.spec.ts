import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { CAMPAIGN_LOG_CHAPTERS, PLAYER_PROFILE } from '../../data';
import { CampaignScene } from '../../system-horizon/scenes/campaign';
import { HORIZON_WORLD } from './horizon-world.provider';

/** Instância do jogo (a cena é estado protegido; o teste só lê). */
const ng = (el: HTMLElement) =>
  (window as unknown as { ng: { getComponent: (e: HTMLElement) => unknown } }).ng.getComponent(
    el,
  ) as { scene: () => CampaignScene | null };

// SYSTEM HORIZON interativo (D-103): rota própria, título → como jogar → jogo, versão em texto.
describe('SystemHorizonPage', () => {
  async function renderAt(url: string) {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    await harness.fixture.whenStable();
    const el = harness.routeNativeElement as HTMLElement;
    const settle = async () => {
      harness.fixture.detectChanges();
      await harness.fixture.whenStable();
    };
    const click = async (label: RegExp) => {
      const button = Array.from(el.querySelectorAll<HTMLElement>('button, a')).find((b) =>
        label.test(b.textContent?.trim() ?? ''),
      );
      if (!button) throw new Error(`sem botão ${label}`);
      button.click();
      await settle();
    };
    return { el, click, settle };
  }
  const text = (el: Element, selector: string) =>
    el.querySelector(selector)?.textContent?.replace(/\s+/g, ' ').trim();

  it('opens on the title screen, in its own route and lazy chunk, with the page title', async () => {
    const { el } = await renderAt('/system-horizon');
    expect(text(el, 'h1')).toBe('SYSTEM HORIZON');
    expect(text(el, '.lead')).toMatch(/^A minha trajetória como uma campanha jogável/);
    expect(el.querySelector('main#main-content')).not.toBeNull();
    expect(document.title).toBe('SYSTEM HORIZON — Modo Campanha');
    // Voltar leva ao Inventário (na Home do mesmo idioma).
    expect(el.querySelector('a.back')?.getAttribute('href')).toBe('/#project-inventory');
  });

  it('goes from the title to how to play and then to the game, with an accessible stage', async () => {
    const { el, click } = await renderAt('/system-horizon');
    await click(/^Começar/);
    expect(text(el, 'h1')).toBe('COMO JOGAR');
    expect(text(el, '.keys')).toContain('← → ou A D');
    await click(/^Jogar/);

    const game = el.querySelector('app-campaign-game')!;
    expect(game.hasAttribute('hidden')).toBe(false);
    expect(text(game, '.act')).toBe('ATO 01 — ORIGEM');
    const stage = game.querySelector('.stage')!;
    expect(stage.getAttribute('tabindex')).toBe('0');
    expect(stage.getAttribute('aria-label')).toBe('Área do jogo SYSTEM HORIZON');
    expect(document.getElementById(stage.getAttribute('aria-describedby')!)?.textContent).toMatch(
      /Enter para ler o marco próximo/,
    );
    expect(game.querySelector('.view')?.getAttribute('aria-hidden')).toBe('true');
    // Quatro especialidades (ainda não coletadas) + o MC-CART, sempre com texto, não só cor.
    const slots = game.querySelectorAll('.slot');
    expect(slots).toHaveLength(5);
    expect(slots[0].getAttribute('aria-label')).toBe('CONSTRUÇÃO: ainda não coletada');
    expect(slots[4].getAttribute('aria-label')).toBe('MC-CART ainda não formado');
    expect(game.querySelector('[role=status][aria-live=polite]')).not.toBeNull();
    expect(text(game, '.hint')).toBe('Ande até um marco.');
  });

  it('renders the whole journey as text, from the same world as the game', async () => {
    const { el, click } = await renderAt('/system-horizon');
    await click(/^Versão em texto/);
    const world = TestBed.inject(HORIZON_WORLD);

    expect(text(el, 'h2')).toBe('VERSÃO EM TEXTO');
    expect(Array.from(el.querySelectorAll('.act-title')).map((h) => h.textContent?.trim())).toEqual(
      [
        'ATO 01 — ORIGEM',
        'ATO 02 — DO CONTROLE AO CÓDIGO',
        'ATO 03 — DO CÓDIGO AO PRODUTO',
        'ATO 04 — CAMPANHAS',
        'ATO 05 — HORIZONTE',
      ],
    );
    expect(el.querySelectorAll('app-horizon-text li app-horizon-entry')).toHaveLength(
      world.stops.length,
    );
    // Os fatos são os do Diário e do Contato (nenhum texto próprio do jogo).
    const first = CAMPAIGN_LOG_CHAPTERS[0].entries[0];
    expect(text(el, 'app-horizon-entry h4')).toBe(first.title['pt-BR']);
    expect(el.textContent).toContain(first.summary['pt-BR']);
    expect(el.textContent).toContain(PLAYER_PROFILE.closing['pt-BR']);
    expect(el.querySelector('app-horizon-entry img')).toBeNull();
  });

  it('switches every label to English on /en/system-horizon', async () => {
    const { el, click } = await renderAt('/en/system-horizon');
    expect(text(el, '#horizon-start')).toBe('Start');
    await click(/^Start/);
    await click(/^Play/);
    expect(text(el, 'app-campaign-game .act')).toBe('ACT 01 — ORIGIN');
    expect(el.querySelector('a.back')?.getAttribute('href')).toBe('/en#project-inventory');
  });

  it('walks while an arrow key is held and stops when it is released anywhere', async () => {
    const { el, click, settle } = await renderAt('/system-horizon');
    await click(/^Começar/);
    await click(/^Jogar/);
    await settle();
    const host = el.querySelector<HTMLElement>('app-campaign-game')!;
    const game = ng(host);
    const scene = game.scene()!;
    const x0 = scene.playerState.x;

    // A tecla vale com o foco em qualquer controle do jogo (aqui, o botão de pausa).
    const pause = host.querySelector<HTMLElement>('.pause')!;
    pause.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    scene.step();
    scene.step();
    expect(scene.playerState.x).toBeGreaterThan(x0);

    // Soltar a tecla com o foco fora do jogo também para.
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight' }));
    const x1 = scene.playerState.x;
    scene.step();
    expect(scene.playerState.x).toBe(x1);
    expect(scene.playerState.pose).toBe('idle');
  });

  it('keeps the game mounted and hidden while the text version is open', async () => {
    const { el, click, settle } = await renderAt('/system-horizon');
    await click(/^Começar/);
    await click(/^Jogar/);
    const game = el.querySelector<HTMLElement>('app-campaign-game')!;
    game.querySelector<HTMLButtonElement>('.pause')!.click();
    await settle();
    await click(/^Versão em texto/);
    expect(el.querySelector('app-campaign-game')).toBe(game);
    expect(game.hasAttribute('hidden')).toBe(true);
    await click(/^Continuar/);
    expect(game.hasAttribute('hidden')).toBe(false);
  });
});
