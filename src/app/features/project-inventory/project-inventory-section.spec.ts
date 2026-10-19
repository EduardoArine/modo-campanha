import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { PROJECTS } from '../../data';
import { Project } from '../../models';
import { INVENTORY_PROJECTS } from './inventory.projects';
import { ProjectInventorySection } from './project-inventory-section';

// Project Inventory H2 (D-077) + biblioteca MC-CART (D-087). Testes com os dados reais (MC-001 a
// MC-006) e, para o caso de um cartucho só, com uma fixture isolada (nunca nos dados).
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

    expect(el.querySelector('h2')?.textContent).toBe('INVENTÁRIO DE PROJETOS');
    expect(text(el, '.eyebrow')).toBe('MC-001 · MODO CAMPANHA · EXPERIÊNCIA NARRATIVA');
    expect(text(el, '.intro .name')).toBe('SYSTEM HORIZON');
    expect(text(el, '.desc')).toMatch(/^O primeiro cartucho do Modo Campanha\./);
    expect(text(el, '.experiences')).toBe(
      'Teaser disponível · Campanha jogável em desenvolvimento',
    );
    expect(el.querySelector('mc-console')?.getAttribute('aria-hidden')).toBe('true');
    expect(el.querySelector('mc-console')?.getAttribute('data-pose')).toBe('out');
    expect(text(el, '.slot-status')).toBe('SLOT VAZIO');
    expect(text(el, '.glass')).toBe('INSIRA UM CARTUCHO');
    const insert = el.querySelector('#inventory-insert')!;
    expect(insert.getAttribute('aria-label')).toBe('Inserir cartucho: SYSTEM HORIZON');
    expect(insert.getAttribute('aria-controls')).toBe('project-viewer');
    expect(el.querySelector('#project-viewer')?.getAttribute('role')).toBe('region');
    expect(el.querySelector('app-project-case, .tv-status')).toBeNull();
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
    expect(text(el, '.glass-system')).toBe('CARREGANDO CARTUCHO...');

    vi.advanceTimersByTime(450);
    fixture.detectChanges();
    expect(text(el, '.slot-status')).toBe('MC-001 INSERIDO');
    expect(text(el, '.tv-status')).toBe('SYSTEM HORIZON · PRONTO');
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
    expect(labels).toEqual([
      'PROBLEMA',
      'MINHA CONTRIBUIÇÃO',
      'TECNOLOGIAS',
      'APRENDIZADOS',
      'EVIDÊNCIAS',
    ]);
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

  /** Avança os temporizadores uma etapa por vez (cada estado agenda o próximo ao renderizar). */
  const step = (...ms: number[]) => {
    for (const t of ms) {
      vi.advanceTimersByTime(t);
      fixture.detectChanges();
    }
  };
  const library = (el: Element) => Array.from(el.querySelectorAll<HTMLElement>('.strip .cart'));

  it('hides the library with a single cartridge (fixture)', async () => {
    reducedMotion(true);
    const el = await renderAt('/', [PROJECTS[0]]);
    expect(el.querySelector('app-cartridge-library')).toBeNull();
    expect(text(el, '.intro .name')).toBe('SYSTEM HORIZON');
  });

  it('opens with the MC-CART collection: six cartridges, MC-001 selected, slot empty, CRT off', async () => {
    reducedMotion(false);
    const el = await renderAt('/');
    const carts = library(el);

    expect(text(el, '.library .title')).toBe('COLEÇÃO MC-CART');
    expect(text(el, '.library .count')).toBe('06 CARTUCHOS');
    expect(text(el, '.library .hint')).toBe('Escolha um cartucho para explorar.');
    expect(carts.map((c) => c.getAttribute('aria-label'))).toEqual([
      'MC-001 — SYSTEM HORIZON, selecionado',
      'Selecionar MC-002 — Aedes Revenge',
      'Selecionar MC-003 — ScoutEvo',
      'Selecionar MC-004 — EOS',
      'Selecionar MC-005 — Axia',
      'Selecionar MC-006 — Comunidade ON',
    ]);
    expect(carts.map((c) => c.getAttribute('aria-current'))).toEqual([
      'true',
      null,
      null,
      null,
      null,
      null,
    ]);
    expect(text(el, '.cart.is-selected .badge')).toBe('SELECIONADO');
    // O já selecionado com o slot vazio não tem ação: aria-disabled, os outros não.
    expect(carts.map((c) => c.getAttribute('aria-disabled'))).toEqual([
      'true',
      null,
      null,
      null,
      null,
      null,
    ]);
    expect(carts.every((c) => c.querySelector('img')?.getAttribute('loading') === 'lazy')).toBe(
      true,
    );
    expect(text(el, '.slot-status')).toBe('SLOT VAZIO');
    expect(text(el, '.glass')).toBe('INSIRA UM CARTUCHO');
    // Sem rolagem na largura do teste: sem controles de página.
    expect(el.querySelector('.pager')).toBeNull();
  });

  it('selects without inserting while the slot is empty, and announces it', async () => {
    reducedMotion(false);
    const el = await renderAt('/');
    click(library(el)[2]);

    expect(text(el, '.eyebrow')).toBe('MC-003 · MODO CAMPANHA · PLATAFORMA DE TALENTOS NO FUTEBOL');
    expect(text(el, '.intro .name')).toBe('ScoutEvo');
    expect(text(el, '[role="status"]')).toBe('Cartucho selecionado: MC-003 — ScoutEvo.');
    expect(library(el)[2].getAttribute('aria-current')).toBe('true');
    expect(el.querySelector('mc-console')?.getAttribute('data-pose')).toBe('out');
    expect(text(el, '.slot-status')).toBe('SLOT VAZIO');
    expect(el.querySelector('#inventory-insert')?.getAttribute('aria-label')).toBe(
      'Inserir cartucho: ScoutEvo',
    );
    expect(el.querySelector('app-project-case')).toBeNull();
  });

  it('swaps with one explicit choice: eject → insert → load → READY, announced, focus kept', async () => {
    reducedMotion(false);
    const el = await renderAt('/');
    vi.useFakeTimers();
    click(el.querySelector('#inventory-insert'));
    step(620, 450);
    expect(text(el, '.slot-status')).toBe('MC-001 INSERIDO');

    let carts = library(el);
    expect(text(el, '.library .hint')).toBe('Escolher outro cartucho troca o que está no MC-01.');
    expect(carts[0].getAttribute('aria-label')).toBe('MC-001 — SYSTEM HORIZON, inserido');
    expect(carts[0].getAttribute('aria-disabled')).toBe('true');
    expect(carts[3].getAttribute('aria-label')).toBe('Trocar para MC-004 — EOS');
    expect(text(el, '.cart.is-inserted .badge')).toBe('INSERIDO');

    carts[3].focus();
    click(carts[3]);
    carts = library(el);
    expect(text(el, '.slot-status')).toBe('EJETANDO MC-001');
    expect(text(el, '[role="status"]')).toBe('Trocando para MC-004 — EOS.');
    // O editorial já é do cartucho escolhido; o console ainda ejeta o anterior.
    expect(text(el, '.intro .name')).toBe('EOS');
    expect(el.querySelector('.experiences')).toBeNull();
    expect(carts.every((c) => c.getAttribute('aria-disabled') === 'true')).toBe(true);
    expect(text(el, '.library .hint')).toBe('Aguarde: trocando de cartucho.');
    // Durante a transição, outra escolha espera (é ignorada).
    click(carts[4]);
    expect(text(el, '[role="status"]')).toBe('Trocando para MC-004 — EOS.');
    // A inserção é automática: o Inserir fica bloqueado e já nomeia o cartucho que vai entrar.
    const insert = el.querySelector('#inventory-insert')!;
    expect(insert.getAttribute('aria-disabled')).toBe('true');
    expect(insert.getAttribute('aria-label')).toBe('Inserir cartucho: EOS');

    step(600);
    expect(text(el, '.slot-status')).toBe('CARREGANDO MC-004');
    step(620, 450);

    expect(text(el, '.slot-status')).toBe('MC-004 INSERIDO');
    expect(text(el, '.tv-status')).toBe('EOS · PRONTO');
    expect(text(el, '[role="status"]')).toBe('MC-004 — EOS pronto.');
    const art = el.querySelector('.glass-art')!;
    expect(art.getAttribute('src')).toBe('assets/cartridges/mc-004/label-art-952.webp');
    expect(art.classList.contains('is-contain')).toBe(true);
    // Sem teaser: só ejetar. O foco não foi levado ao CRT.
    expect(text(el, '.tv-actions')).toBe('Ejetar cartucho');
    expect(document.activeElement?.id).not.toBe('inventory-status');
    expect(text(el, 'app-project-case dt')).toBe('PROBLEMA');
  });

  it('swaps straight to READY with reduced motion', async () => {
    reducedMotion(true);
    const el = await renderAt('/');
    click(el.querySelector('#inventory-insert'));
    click(library(el)[5]);

    expect(text(el, '.slot-status')).toBe('MC-006 INSERIDO');
    expect(text(el, '[role="status"]')).toBe('MC-006 — Comunidade ON pronto.');
    expect(text(el, '.intro mc-status')).toBe('EM ANDAMENTO');
    // Comunidade ON sem link público: sem a coluna de evidências.
    expect(text(el, 'app-project-case')).not.toContain('EVIDÊNCIAS');
  });

  it('keeps the manual eject: the swapped cartridge goes back above the slot', async () => {
    reducedMotion(true);
    const el = await renderAt('/');
    click(el.querySelector('#inventory-insert'));
    click(library(el)[1]);
    click(el.querySelector('.tv-actions button[aria-label]'));

    expect(text(el, '.slot-status')).toBe('SLOT VAZIO');
    expect(text(el, '.intro .name')).toBe('Aedes Revenge');
    expect(library(el)[1].getAttribute('aria-current')).toBe('true');
    expect(library(el)[1].getAttribute('aria-label')).toBe('MC-002 — Aedes Revenge, selecionado');
    expect(library(el)[2].getAttribute('aria-label')).toBe('Selecionar MC-003 — ScoutEvo');
  });

  it('shows the context of the EOS paper evidence without claiming its authorship', async () => {
    reducedMotion(true);
    const el = await renderAt('/');
    click(library(el)[3]);
    click(el.querySelector('#inventory-insert'));

    expect(text(el, 'app-project-case')).toContain('MARCOS');
    expect(el.querySelectorAll('app-project-case .note').length).toBeGreaterThan(0);
  });

  it('renders the library in en', async () => {
    reducedMotion(true);
    const el = await renderAt('/en');
    expect(text(el, '.library .title')).toBe('MC-CART COLLECTION');
    expect(text(el, '.library .count')).toBe('06 CARTRIDGES');
    click(el.querySelector('#inventory-insert'));
    expect(library(el)[2].getAttribute('aria-label')).toBe('Swap to MC-003 — ScoutEvo');
  });
});
