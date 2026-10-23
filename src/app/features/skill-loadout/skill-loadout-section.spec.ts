import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { SkillLoadoutSection } from './skill-loadout-section';

describe('SkillLoadoutSection (Concept C, D-092)', () => {
  async function renderAt(url: string) {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(SkillLoadoutSection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const click = (selector: string) => {
      el.querySelector<HTMLButtonElement>(selector)!.click();
      fixture.detectChanges();
    };
    return { el, click };
  }

  const texts = (root: Element, selector: string) =>
    Array.from(root.querySelectorAll(selector)).map((node) =>
      node.textContent?.replace(/\s+/g, ' ').trim(),
    );
  const pressed = (el: HTMLElement) =>
    Array.from(el.querySelectorAll('.selector')).map((b) => b.getAttribute('aria-pressed'));

  it('renders the section header and four native specialty buttons', async () => {
    const { el } = await renderAt('/');
    const section = el.querySelector('section#skill-loadout')!;

    expect(section.getAttribute('aria-labelledby')).toBe('skill-loadout-title');
    expect(section.querySelector('h2')?.textContent).toBe('ARSENAL DE HABILIDADES');
    expect(section.querySelector('.eyebrow')?.textContent).toBe('ESPECIALIDADES');
    const group = section.querySelector('.selectors')!;
    expect(group.getAttribute('role')).toBe('group');
    expect(group.getAttribute('aria-label')).toBe('Especialidades');
    const buttons = Array.from(group.querySelectorAll('button'));
    expect(buttons.length).toBe(4);
    expect(buttons.every((b) => b.type === 'button')).toBe(true);
    expect(buttons.every((b) => b.getAttribute('aria-controls') === 'skill-loadout-board')).toBe(
      true,
    );
    expect(texts(group, '.name')).toEqual([
      'CONSTRUÇÃO',
      'PRODUTO',
      'INTELIGÊNCIA ARTIFICIAL',
      'DNA DE GAMES',
    ]);
    // Sem siglas (D-098): o seletor mostra só ícone e nome.
    expect(group.querySelector('.code')).toBeNull();
  });

  it('starts on CON with its six skills', async () => {
    const { el } = await renderAt('/');

    expect(pressed(el)).toEqual(['true', 'false', 'false', 'false']);
    expect(texts(el, '.board h3')).toEqual(['CONSTRUÇÃO']);
    expect(el.querySelector('.group-text')?.textContent).toBe(
      'Tecnologias e ferramentas para transformar ideias em produtos digitais.',
    );
    expect(texts(el, '.count')).toEqual(['6 HABILIDADES']);
    expect(texts(el, '.skill')).toEqual([
      'Angular',
      'TypeScript',
      'C# / .NET',
      'REST APIs',
      'PostgreSQL / SQL Server',
      'Docker',
    ]);
  });

  it('switches the panel when another specialty is chosen, and back', async () => {
    const { el, click } = await renderAt('/');

    click('.selector[data-group="product"]');
    expect(pressed(el)).toEqual(['false', 'true', 'false', 'false']);
    expect(texts(el, '.board h3')).toEqual(['PRODUTO']);
    expect(texts(el, '.skill')).toContain('Colaboração UX/UI');

    click('.selector[data-group="ai"]');
    expect(texts(el, '.board h3')).toEqual(['INTELIGÊNCIA ARTIFICIAL']);
    expect(texts(el, '.skill')).toContain('Agentes de desenvolvimento');

    click('.selector[data-group="game-dna"]');
    expect(texts(el, '.board h3')).toEqual(['DNA DE GAMES']);
    expect(texts(el, '.skill')).toEqual([
      'Sistemas de jogo',
      'Gamificação',
      'Design de interação',
      'Prototipação de jogos',
    ]);

    click('.selector[data-group="build"]');
    expect(pressed(el)).toEqual(['true', 'false', 'false', 'false']);
    expect(el.querySelectorAll('.skill').length).toBe(6);
  });

  it('shows every group in "view all", with no specialty pressed, and restores the last one', async () => {
    const { el, click } = await renderAt('/');

    click('.selector[data-group="ai"]');
    expect(el.querySelector('.all')?.textContent?.trim()).toBe('Ver todas as habilidades');

    click('.all');
    expect(el.querySelector('.all')?.textContent?.trim()).toBe('Voltar ao arsenal');
    expect(pressed(el)).toEqual(['false', 'false', 'false', 'false']);
    expect(el.querySelector('.board')?.classList).toContain('is-all');
    expect(texts(el, '.board h3')).toEqual(['TODAS AS HABILIDADES']);
    expect(texts(el, '.board h4')).toEqual([
      'CONSTRUÇÃO',
      'PRODUTO',
      'INTELIGÊNCIA ARTIFICIAL',
      'DNA DE GAMES',
    ]);
    // Os 18 itens, cada um uma vez.
    expect(el.querySelectorAll('.skill').length).toBe(18);
    expect(new Set(texts(el, '.skill')).size).toBe(18);

    click('.all');
    expect(pressed(el)).toEqual(['false', 'false', 'true', 'false']);
    expect(texts(el, '.board h3')).toEqual(['INTELIGÊNCIA ARTIFICIAL']);
  });

  it('offers a second "back" at the end of "view all", returning focus to the header toggle', async () => {
    const { el, click } = await renderAt('/');
    document.body.appendChild(el);
    expect(el.querySelector('.back-end')).toBeNull();

    click('.all');
    expect(el.querySelector('.back-end')?.textContent?.trim()).toBe('Voltar ao arsenal');

    click('.back-end');
    expect(el.querySelector('.board')?.classList).not.toContain('is-all');
    expect(el.querySelector('.back-end')).toBeNull();
    expect(document.activeElement).toBe(el.querySelector('.all'));
    el.remove();
  });

  it('choosing a specialty from "view all" returns to the loadout', async () => {
    const { el, click } = await renderAt('/');

    click('.all');
    click('.selector[data-group="product"]');
    expect(el.querySelector('.board')?.classList).not.toContain('is-all');
    expect(pressed(el)).toEqual(['false', 'true', 'false', 'false']);
    expect(el.querySelector('.all')?.textContent?.trim()).toBe('Ver todas as habilidades');
  });

  it('shows no proficiency: only names, icons and the real item count', async () => {
    const { el, click } = await renderAt('/');
    click('.all');

    expect(el.textContent).not.toMatch(/%|★|level|nível|expert|beginner|unlocked/i);
    expect(el.querySelectorAll('progress, meter, [role="progressbar"], mc-chip').length).toBe(0);
    expect(el.querySelectorAll('a').length).toBe(0);
  });

  it('renders the en interface and content', async () => {
    const { el, click } = await renderAt('/en');

    expect(el.querySelector('h2')?.textContent).toBe('SKILL ARSENAL');
    expect(el.querySelector('.eyebrow')?.textContent).toBe('SPECIALTY LOADOUT');
    expect(el.querySelector('.selectors')?.getAttribute('aria-label')).toBe('Specialties');
    expect(texts(el, '.selector .name')).toEqual([
      'DEVELOPMENT',
      'PRODUCT',
      'ARTIFICIAL INTELLIGENCE',
      'GAME DNA',
    ]);
    expect(texts(el, '.board h3')).toEqual(['DEVELOPMENT']);
    expect(texts(el, '.count')).toEqual(['6 SKILLS']);
    expect(el.querySelector('.all')?.textContent?.trim()).toBe('View all skills');

    click('.all');
    expect(el.querySelector('.all')?.textContent?.trim()).toBe('Back to loadout');
    expect(texts(el, '.skill')).toContain('Prompt & workflow design');
  });
});
