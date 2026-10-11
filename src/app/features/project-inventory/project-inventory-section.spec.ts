import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { ProjectInventorySection } from './project-inventory-section';

describe('ProjectInventorySection', () => {
  let fixture: ComponentFixture<ProjectInventorySection>;

  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    fixture = TestBed.createComponent(ProjectInventorySection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  /** Clica e espera o boot do CRT (BOOT_MS) terminar. */
  async function clickAndBoot(target: HTMLElement): Promise<void> {
    target.click();
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 500));
    fixture.detectChanges();
    await fixture.whenStable();
  }

  const texts = (root: Element, selector: string) =>
    Array.from(root.querySelectorAll(selector)).map((el) => el.textContent?.trim());

  it('renders only the header, without subtitle, and no CRT until a cartridge is inserted', async () => {
    const section = (await renderAt('/')).querySelector('section#project-inventory')!;

    expect(section.querySelector('h2')?.textContent).toBe('PROJECT INVENTORY');
    expect(section.querySelector('.subtitle')).toBeNull();
    expect(section.textContent).not.toContain('Cartuchos coletados durante a campanha.');
    expect(section.textContent).not.toContain('INSERT CARTRIDGE');
    expect(section.querySelector('mc-crt-project-viewer, mc-crt-frame')).toBeNull();
  });

  it('lists MC-001 in the first slot and nothing under review', async () => {
    const el = await renderAt('/');
    const items = el.querySelectorAll('ul[role="list"] > li');

    expect(items.length).toBe(1);
    expect(items[0].querySelector('mc-cart')?.getAttribute('aria-label')).toBe(
      'MC-CART MC-001: Modo Campanha, PORTFÓLIO INTERATIVO',
    );
    expect(texts(el, 'h3')).toEqual(['Modo Campanha']);
    expect(texts(el, 'mc-chip')).toEqual(['Produto', 'Gamificação']);
    expect(el.textContent).not.toMatch(/MC-002|Paco/);
  });

  it('shows the approved artwork as decoration inside the single cartridge image', async () => {
    const cart = (await renderAt('/')).querySelector('mc-cart')!;
    const img = cart.querySelector('img')!;

    expect(cart.getAttribute('role')).toBe('img');
    expect(img.getAttribute('src')).toBe('assets/cartridges/mc-001-modo-campanha.png');
    expect(img.getAttribute('alt')).toBe('');
    expect(cart.textContent).not.toContain('PROJECT ARTWORK');
  });

  it('keeps the cartridge an image; the only control is one insert button per item', async () => {
    const el = await renderAt('/');
    const cart = el.querySelector('mc-cart')!;
    const buttons = Array.from(el.querySelectorAll('button'));

    expect(cart.getAttribute('role')).toBe('img');
    expect(cart.hasAttribute('tabindex')).toBe(false);
    expect(el.querySelectorAll('a, [role="button"]').length).toBe(0);
    expect(buttons.length).toBe(1);
    expect(buttons[0].textContent?.trim()).toBe('Inserir cartucho');
    expect(buttons[0].getAttribute('aria-label')).toBe('Inserir cartucho: Modo Campanha');
    expect(buttons[0].getAttribute('aria-controls')).toBe('project-viewer');
    expect(buttons[0].classList).toContain('mc-action--text');
  });

  it('inserts the cartridge: short boot, then the approved case inside the CRT', async () => {
    const el = await renderAt('/');
    const button = el.querySelector<HTMLButtonElement>('.insert')!;

    button.click();
    fixture.detectChanges();
    const viewer = el.querySelector('#project-viewer mc-crt-project-viewer')!;
    expect(viewer.getAttribute('role')).toBe('region');
    expect(viewer.querySelector('.loading')?.textContent?.trim()).toBe('LOADING CARTRIDGE...');
    expect(el.querySelector('section > [role="status"]')?.textContent?.trim()).toBe(
      'LOADING CARTRIDGE...',
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
    fixture.detectChanges();
    await fixture.whenStable();

    const article = el.querySelector('#project-viewer article')!;
    expect(article.querySelector('h3')?.textContent?.trim()).toBe('Modo Campanha');
    expect(texts(article, 'dt')).toEqual(['PAPEL', 'STACK', 'APRENDIZADOS']);
    expect(texts(article, '.stack li')).toEqual([
      'Angular',
      'TypeScript',
      'SCSS',
      'Vitest',
      'GitHub Actions / Pages',
    ]);
    expect(texts(article, '.learnings li')).toEqual([
      'Validar tipografia no tamanho real de uso.',
      'Separar linguagem de interface digital da linguagem de objetos físicos.',
    ]);
    expect(article.querySelector('img')?.getAttribute('alt')).toContain('Paisagem em pixel art');
    const links = Array.from(article.querySelectorAll('a'));
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      'https://github.com/EduardoArine/modo-campanha',
    ]);
    expect(links[0].getAttribute('target')).toBe('_blank');
    expect(links[0].getAttribute('rel')).toBe('noopener noreferrer');
    expect(document.activeElement).toBe(article.querySelector('h3'));
    expect(button.textContent?.trim()).toBe('Ejetar cartucho');
    expect(el.querySelector('.item')?.classList).toContain('is-inserted');
  });

  it('ejects from the case and returns focus to the insert button', async () => {
    const el = await renderAt('/');
    await clickAndBoot(el.querySelector<HTMLButtonElement>('.insert')!);

    el.querySelector<HTMLButtonElement>('#project-viewer .eject')!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(el.querySelector('#project-viewer mc-crt-project-viewer')).toBeNull();
    expect(document.activeElement).toBe(el.querySelector('.insert'));
    expect(el.querySelector('.insert')?.textContent?.trim()).toBe('Inserir cartucho');
  });

  it('lets the pointer insert by clicking the cartridge itself, in en', async () => {
    const el = await renderAt('/en');
    await clickAndBoot(el.querySelector<HTMLElement>('mc-cart')!);

    expect(texts(el, '#project-viewer dt')).toEqual(['ROLE', 'STACK', 'LEARNINGS']);
    expect(el.querySelector('#project-viewer a')?.textContent).toContain('GitHub repository');
    expect(el.querySelector('.insert')?.getAttribute('aria-label')).toBe(
      'Eject cartridge: Modo Campanha',
    );
  });

  it('renders the en content', async () => {
    const el = await renderAt('/en');

    expect(el.querySelector('mc-cart')?.getAttribute('aria-label')).toBe(
      'MC-CART MC-001: Modo Campanha, INTERACTIVE PORTFOLIO',
    );
    expect(texts(el, 'mc-chip')).toEqual(['Product', 'Gamification']);
    expect(el.textContent).toContain(
      'A gamified professional portfolio that turns real projects, skills, and learnings into an interactive campaign.',
    );
  });
});
