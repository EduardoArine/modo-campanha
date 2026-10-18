import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { PROJECTS } from '../../data';
import { Project } from '../../models';
import { INVENTORY_PROJECTS } from './inventory.projects';
import { ProjectInventorySection } from './project-inventory-section';

// Project Inventory H2 (D-077). Testes com os dados reais (MC-001) e, para a escolha de cartuchos,
// com uma fixture isolada (nunca nos dados).
describe('ProjectInventorySection', () => {
  let fixture: ComponentFixture<ProjectInventorySection>;
  const realMatchMedia = window.matchMedia;

  function reducedMotion(on: boolean): void {
    window.matchMedia = ((query: string) => ({
      matches: on && query.includes('reduce'),
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    })) as unknown as typeof window.matchMedia;
  }

  async function renderAt(url: string, projects?: readonly Project[]): Promise<HTMLElement> {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        ...(projects ? [{ provide: INVENTORY_PROJECTS, useValue: projects }] : []),
      ],
    });
    const harness = await RouterTestingHarness.create(url);
    fixture = TestBed.createComponent(ProjectInventorySection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  const text = (root: Element, selector: string) =>
    root.querySelector(selector)?.textContent?.replace(/\s+/g, ' ').trim();
  const click = (el: Element | null) => {
    (el as HTMLElement).click();
    fixture.detectChanges();
  };

  afterEach(() => {
    window.matchMedia = realMatchMedia;
    vi.useRealTimers();
  });

  it('introduces SYSTEM HORIZON with the cartridge waiting above the MC-01 (INITIAL)', async () => {
    reducedMotion(false);
    const el = await renderAt('/');

    expect(el.querySelector('h2')?.textContent).toBe('PROJECT INVENTORY');
    expect(text(el, '.eyebrow')).toBe('MC-001 · MODO CAMPANHA · EXPERIÊNCIA NARRATIVA');
    expect(text(el, 'h3')).toBe('SYSTEM HORIZON');
    expect(text(el, '.desc')).toMatch(/^O primeiro cartucho do Modo Campanha\./);
    expect(text(el, '.experiences')).toBe(
      'Teaser disponível · Campanha jogável em desenvolvimento',
    );
    expect(el.querySelector('mc-console')?.getAttribute('aria-hidden')).toBe('true');
    expect(el.querySelector('mc-console')?.getAttribute('data-pose')).toBe('out');
    expect(text(el, '.slot-status')).toBe('SLOT VAZIO');
    expect(text(el, '.glass')).toBe('INSERT CARTRIDGE');
    const insert = el.querySelector('#inventory-insert')!;
    expect(insert.getAttribute('aria-label')).toBe('Inserir cartucho: SYSTEM HORIZON');
    expect(insert.getAttribute('aria-controls')).toBe('project-viewer');
    expect(el.querySelector('#project-viewer')?.getAttribute('role')).toBe('region');
    expect(el.querySelector('app-project-case, .library, .tv-status')).toBeNull();
  });

  it('inserts with one coherent state per step: loading → MC-01 boot → READY with the official art', async () => {
    reducedMotion(false);
    const el = await renderAt('/');
    // Temporizadores falsos só depois de renderizar (whenStable espera timers reais).
    vi.useFakeTimers();
    click(el.querySelector('#inventory-insert'));

    expect(el.querySelector('mc-console')?.getAttribute('data-pose')).toBe('seated');
    expect(el.querySelector('mc-console')?.getAttribute('data-motion')).toBe('insert');
    expect(el.querySelector('#inventory-insert')?.getAttribute('aria-disabled')).toBe('true');
    expect(text(el, '.slot-status')).toBe('CARREGANDO MC-001');
    expect(text(el, '[role="status"]')).toBe('Carregando cartucho.');

    vi.advanceTimersByTime(620);
    fixture.detectChanges();
    expect(text(el, '.glass-system')).toBe('LOADING CARTRIDGE...');

    vi.advanceTimersByTime(450);
    fixture.detectChanges();
    expect(text(el, '.slot-status')).toBe('MC-001 INSERIDO');
    expect(text(el, '.tv-status')).toBe('SYSTEM HORIZON · READY');
    expect(el.querySelector('.glass-art')?.getAttribute('src')).toBe(
      'assets/cartridges/mc-001/system-horizon.webp',
    );
    // O teaser não começa sozinho: só a arte; "Reproduzir teaser" é uma ação explícita.
    expect(el.querySelector('app-system-horizon-screen')).toBeNull();
    expect(text(el, '.tv-actions button')).toBe('Reproduzir teaser');
    expect(el.querySelector('#inventory-insert')).toBeNull();
    // Sem anúncio duplicado: o foco no estado já anuncia o READY.
    expect(text(el, '[role="status"]')).toBe('');
  });

  it('shows the professional case outside the CRT once the cartridge is seated', async () => {
    reducedMotion(true);
    const el = await renderAt('/');
    click(el.querySelector('#inventory-insert'));

    const labels = Array.from(el.querySelectorAll('app-project-case dt')).map((d) =>
      d.textContent?.trim(),
    );
    expect(labels).toEqual(['MINHA CONTRIBUIÇÃO', 'STACK', 'APRENDIZADOS', 'EVIDÊNCIAS']);
    expect(el.querySelector('.glass app-project-case, .glass dl')).toBeNull();
    const link = el.querySelector<HTMLAnchorElement>('app-project-case a')!;
    expect(link.getAttribute('href')).toBe('https://github.com/EduardoArine/modo-campanha');
    expect(link.getAttribute('target')).toBe('_blank');
  });

  it('goes straight to READY with reduced motion, and ejects back to INITIAL', async () => {
    reducedMotion(true);
    const el = await renderAt('/');
    click(el.querySelector('#inventory-insert'));
    expect(text(el, '.slot-status')).toBe('MC-001 INSERIDO');

    const eject = el.querySelector('.tv-actions button[aria-label]')!;
    expect(eject.getAttribute('aria-label')).toBe('Ejetar cartucho: SYSTEM HORIZON');
    click(eject);
    expect(text(el, '.slot-status')).toBe('SLOT VAZIO');
    expect(text(el, '[role="status"]')).toBe('Cartucho ejetado.');
    expect(el.querySelector('#inventory-insert')).not.toBeNull();
    expect(el.querySelector('app-project-case')).toBeNull();
  });

  it('renders the en labels and states', async () => {
    reducedMotion(true);
    const el = await renderAt('/en');
    expect(text(el, '.eyebrow')).toBe('MC-001 · MODO CAMPANHA · NARRATIVE EXPERIENCE');
    expect(text(el, '.experiences')).toBe('Teaser available · Playable campaign in development');
    expect(text(el, '.slot-status')).toBe('EMPTY SLOT');
    click(el.querySelector('#inventory-insert'));
    expect(text(el, '.slot-status')).toBe('MC-001 INSERTED');
    expect(text(el, '.tv-actions button')).toBe('Play teaser');
    expect(el.querySelector('#project-viewer')?.getAttribute('aria-label')).toBe('Project viewer');
  });

  it('falls back to the canonical MC-CART and the case when a console layer fails', async () => {
    reducedMotion(false);
    const el = await renderAt('/');
    el.querySelector('mc-console img')!.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(el.querySelector('mc-console, mc-crt-front')).toBeNull();
    expect(el.querySelector('mc-cart')?.getAttribute('aria-label')).toBe(
      'MC-CART MC-001: SYSTEM HORIZON, EXPERIÊNCIA NARRATIVA',
    );
    expect(text(el, '.slot-status')).toBe('MC-01 INDISPONÍVEL');
    expect(el.querySelector('app-project-case')).not.toBeNull();
  });

  it('lets the visitor choose a cartridge only when 2 or more are available (fixture)', async () => {
    reducedMotion(true);
    const other: Project = {
      ...PROJECTS[0],
      id: 'fixture-002',
      serial: 'FX-002',
      title: { 'pt-BR': 'FIXTURE 02', en: 'FIXTURE 02' },
    };
    const el = await renderAt('/', [PROJECTS[0], other]);
    const items = el.querySelectorAll('.library-item');

    expect(items.length).toBe(2);
    expect(items[0].getAttribute('aria-current')).toBe('true');
    click(items[1]);
    expect(text(el, 'h3')).toBe('FIXTURE 02');
    expect(items[1].getAttribute('aria-current')).toBe('true');
  });
});
