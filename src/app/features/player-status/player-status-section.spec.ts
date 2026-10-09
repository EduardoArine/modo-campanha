import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { PlayerStatusSection } from './player-status-section';

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

  it('renders the Player Card with approved fields and status only inside the card', async () => {
    const el = await renderAt('/');
    const card = el.querySelector('mc-player-card')!;

    expect(card.querySelector('.name')?.textContent).toBe('Eduardo Arine');
    expect(texts(card, 'dt')).toEqual(['CLASS', 'XP', 'STATUS']);
    expect(texts(card, 'dd')).toEqual([
      'Desenvolvedor de Produtos Digitais',
      '10+ anos em tecnologia',
      'ATIVO',
    ]);
    expect(card.querySelector('.placeholder')?.textContent).toBe('FOTO DO EDUARDO');
    expect(el.querySelector('mc-section-header mc-status')).toBeNull();
  });

  it('renders the complementary facts as an open list (pt-BR)', async () => {
    const el = await renderAt('/');
    const facts = el.querySelector('.facts')!;

    expect(facts.tagName).toBe('DL');
    expect(texts(facts, 'dt')).toEqual(['ORIGEM', 'CAMPANHA ATUAL', 'FOCO']);
    expect(texts(facts, 'dd')).toEqual([
      'Tecnologia em Jogos Digitais',
      'Comunidade On',
      'IA aplicada ao desenvolvimento',
    ]);
  });

  it('renders the en version and no unapproved journey block', async () => {
    const el = await renderAt('/en');

    expect(texts(el.querySelector('.facts')!, 'dt')).toEqual([
      'ORIGIN',
      'CURRENT CAMPAIGN',
      'FOCUS',
    ]);
    expect(texts(el.querySelector('.facts')!, 'dd')).toContain(
      'AI applied to software development',
    );
    expect(el.querySelector('mc-player-card mc-status')?.textContent?.trim()).toBe('ACTIVE');
    expect(el.textContent).not.toMatch(/Sobre a jornada|About the journey/);
  });
});
