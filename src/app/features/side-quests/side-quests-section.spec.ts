import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { SideQuestsSection } from './side-quests-section';

// Testes rodam na configuração `development`, com o MOCK das Side Quests (docs/19).
describe('SideQuestsSection', () => {
  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(SideQuestsSection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  const texts = (root: Element, selector: string) =>
    Array.from(root.querySelectorAll(selector)).map((el) => el.textContent?.trim());

  it('is a labelled section with one h3 per side quest in a list', async () => {
    const section = (await renderAt('/')).querySelector('section#side-quests')!;

    expect(section.getAttribute('aria-labelledby')).toBe(section.querySelector('h2')?.id);
    expect(section.querySelector('h2')?.textContent).toBe('MISSÕES SECUNDÁRIAS');
    expect(section.querySelectorAll('ul[role="list"] > li').length).toBe(4);
    expect(texts(section, 'h3')[0]).toBe('Experimento de exemplo A');
  });

  it('resolves kind labels from the UI dictionary in each language', async () => {
    expect(texts(await renderAt('/'), '.kind')).toEqual([
      'DESENVOLVIMENTO DE JOGOS',
      'IA',
      'ESTUDO',
      'ARTE',
    ]);

    TestBed.resetTestingModule();
    expect(texts(await renderAt('/en'), '.kind')).toEqual(['GAME DEV', 'AI', 'STUDY', 'ART']);
  });

  it('has no interaction, links or progress', async () => {
    const el = await renderAt('/');

    expect(el.querySelectorAll('a, button, [tabindex], progress, meter, mc-cart').length).toBe(0);
    expect(el.querySelector('.marker')?.getAttribute('aria-hidden')).toBe('true');
  });
});
