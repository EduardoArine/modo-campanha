import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { PROJECTS } from '../../data';
import { Project } from '../../models';
import { dossierSections } from './crt-dossier';
import { INVENTORY_PROJECTS } from './inventory.projects';
import { ProjectInventorySection } from './project-inventory-section';

// Project Inventory H3 (D-093): biblioteca MC-CART (D-087) + estação MC-01 / CRT, com a CAPA e o
// DOSSIÊ do projeto dentro do tubo. Testes com os dados reais (MC-001 a MC-006) e, para o caso de
// um cartucho só, com uma fixture isolada (nunca nos dados).
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
  const click = (el: Element | null | undefined) => {
    (el as HTMLElement).click();
    fixture.detectChanges();
  };
  /** Avança os temporizadores uma etapa por vez (cada estado agenda o próximo ao renderizar). */
  const step = (...ms: number[]) => {
    for (const t of ms) {
      vi.advanceTimersByTime(t);
      fixture.detectChanges();
    }
  };
  const library = (el: Element) => Array.from(el.querySelectorAll<HTMLElement>('.strip .cart'));
  const sections = (el: Element) => Array.from(el.querySelectorAll('app-crt-dossier .item'));
  const glass = (el: Element) => el.querySelector('mc-crt-front .glass')!;

  afterEach(() => {
    window.matchMedia = realMatchMedia;
    vi.useRealTimers();
  });

  it('opens with the collection, MC-001 above the empty slot and the CRT in standby', async () => {
    reducedMotion(false);
    const el = await renderAt('/');

    expect(el.querySelector('h2')?.textContent).toBe('INVENTÁRIO DE PROJETOS');
    expect(text(el, '.library .title')).toBe('COLEÇÃO MC-CART');
    expect(library(el).length).toBe(6);
    expect(library(el)[0].getAttribute('aria-current')).toBe('true');
    expect(el.querySelector('mc-console')?.getAttribute('data-pose')).toBe('out');
    expect(text(el, '.bar-text')).toBe('MC-001 · SYSTEM HORIZON SLOT VAZIO');
    expect(text(el, '.glass')).toBe('INSIRA UM CARTUCHO');
    const insert = el.querySelector('#inventory-insert')!;
    expect(insert.getAttribute('aria-label')).toBe('Inserir cartucho: SYSTEM HORIZON');
    expect(insert.getAttribute('aria-controls')).toBe('project-viewer');
    expect(el.querySelector('#project-viewer')?.getAttribute('role')).toBe('region');
    // Nada do case fora do vidro (H3): só no fallback.
    expect(el.querySelector('app-project-case, app-crt-cover, app-crt-dossier')).toBeNull();
  });

  it('inserts with one coherent state per step and lands on the COVER inside the CRT', async () => {
    reducedMotion(false);
    const el = await renderAt('/');
    vi.useFakeTimers();
    click(el.querySelector('#inventory-insert'));

    expect(el.querySelector('mc-console')?.getAttribute('data-pose')).toBe('seated');
    expect(el.querySelector('#inventory-insert')?.getAttribute('aria-disabled')).toBe('true');
    expect(text(el, '.slot-status')).toBe('CARREGANDO');
    expect(text(el, '[role="status"]')).toBe('Carregando cartucho.');
    step(620);
    expect(text(el, '.glass-system')).toBe('CARREGANDO CARTUCHO...');
    step(450);

    expect(text(el, '.slot-status')).toBe('INSERIDO');
    expect(glass(el).querySelector('app-crt-cover')).not.toBeNull();
    // READY anunciado; o foco vai ao título da capa, antes do EXPLORAR PROJETO.
    expect(text(el, '[role="status"]')).toBe('MC-001 — SYSTEM HORIZON pronto.');
    await fixture.whenStable();
    expect(document.activeElement?.id).toBe('crt-cover-title');
    expect(text(el, '.copy .kicker')).toBe('MC-001 / PROJETO');
    expect(text(el, '#crt-cover-title')).toBe('SYSTEM HORIZON');
    expect(text(el, '.copy .type')).toBe('EXPERIÊNCIA NARRATIVA');
    expect(text(el, '.copy .desc')).toMatch(/^O primeiro cartucho do Modo Campanha\./);
    expect(el.querySelector('.copy img, app-crt-cover img.art')?.getAttribute('alt')).toBe('');
    // MC-001: explorar o case e o teaser (que não começa sozinho), sem prometer a campanha jogável.
    expect(text(el, '#inventory-explore')).toBe('Explorar projeto');
    expect(text(el, '.copy .exp')).toBe('Teaser disponível · Campanha jogável em desenvolvimento');
    expect(el.querySelector('app-system-horizon-screen')).toBeNull();
    // Uma só ação no console: Ejetar.
    expect(el.querySelector('#inventory-insert')).toBeNull();
    expect(el.querySelector('#inventory-eject')?.getAttribute('aria-label')).toBe(
      'Ejetar cartucho: SYSTEM HORIZON',
    );
  });

  it('explores the dossier inside the CRT: header, sections, one section at a time, navigation', async () => {
    reducedMotion(true);
    const el = await renderAt('/');
    click(library(el)[1]);
    click(el.querySelector('#inventory-insert'));
    click(el.querySelector('#inventory-explore'));

    const dossier = glass(el).querySelector('app-crt-dossier')!;
    expect(dossier).not.toBeNull();
    expect(text(el, '#dossier-title')).toBe('MC-002 / Aedes Revenge');
    // A biblioteca recolhe; "Biblioteca" volta a ela sem ejetar.
    expect(el.querySelector('app-cartridge-library')).toBeNull();
    expect(text(el, '.to-library')).toBe('Biblioteca · MC-002 Aedes Revenge');
    expect(sections(el).map((s) => s.textContent?.replace(/\s+/g, ' ').trim())).toEqual([
      '01 Sobre o projeto',
      '02 Problema',
      '03 Minha contribuição',
      '04 Tecnologias',
      '05 Marcos',
      '06 Aprendizados e evidências',
    ]);
    expect(sections(el)[0].getAttribute('aria-current')).toBe('step');
    expect(text(el, '#dossier-section-title')).toBe('Sobre o projeto');
    expect(text(el, '.foot .page')).toBe('01 / 06');
    const [prev, next] = Array.from(el.querySelectorAll('app-crt-dossier .foot button'));
    expect(prev.getAttribute('aria-disabled')).toBe('true');
    // Nome acessível = texto visível (WCAG 2.5.3).
    expect(next.getAttribute('aria-label')).toBeNull();
    expect(next.textContent?.replace(/s+/g, ' ').trim()).toBe('Próxima: Problema');

    click(next);
    expect(text(el, '#dossier-section-title')).toBe('Problema');
    expect(text(el, 'app-crt-dossier [role="status"]')).toBe('Seção 02 de 06: Problema');
    click(sections(el)[4]);
    expect(text(el, '#dossier-section-title')).toBe('Marcos');
    expect(el.querySelectorAll('app-crt-dossier-section .list li').length).toBe(4);
    click(sections(el)[5]);
    expect(text(el, '.foot .page')).toBe('06 / 06');
    expect(el.querySelector('app-crt-dossier .foot .next')?.getAttribute('aria-disabled')).toBe(
      'true',
    );
    const tcc = el.querySelector<HTMLAnchorElement>('app-crt-dossier-section .links a')!;
    expect(tcc.getAttribute('target')).toBe('_blank');
    // O seletor compacto (vidro estreito) faz a mesma escolha.
    const select = el.querySelector<HTMLSelectElement>('app-crt-dossier select')!;
    select.value = '2';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(text(el, '#dossier-section-title')).toBe('Minha contribuição');
  });

  it('goes back to the cover and to the library without ejecting the cartridge', async () => {
    reducedMotion(true);
    const el = await renderAt('/');
    click(el.querySelector('#inventory-insert'));
    click(el.querySelector('#inventory-explore'));
    click(el.querySelector('#dossier-back'));

    expect(glass(el).querySelector('app-crt-cover')).not.toBeNull();
    expect(text(el, '.slot-status')).toBe('INSERIDO');

    click(el.querySelector('#inventory-explore'));
    click(el.querySelector('.to-library'));
    expect(el.querySelector('app-cartridge-library')).not.toBeNull();
    expect(glass(el).querySelector('app-crt-cover')).not.toBeNull();
    expect(text(el, '.slot-status')).toBe('INSERIDO');
  });

  it('swaps from the dossier with one choice and opens the new cover (never two projects at once)', async () => {
    reducedMotion(false);
    const el = await renderAt('/');
    vi.useFakeTimers();
    click(el.querySelector('#inventory-insert'));
    step(620, 450);
    click(el.querySelector('#inventory-explore'));
    click(el.querySelector('.to-library'));

    click(library(el)[3]);
    expect(text(el, '.slot-status')).toBe('EJETANDO');
    expect(text(el, '[role="status"]')).toBe('Trocando para MC-004 — EOS.');
    // Durante a troca, o vidro fica em espera: nem capa nem dossiê.
    expect(glass(el).querySelector('app-crt-cover, app-crt-dossier')).toBeNull();
    expect(library(el).every((c) => c.getAttribute('aria-disabled') === 'true')).toBe(true);

    step(600, 620, 450);
    expect(text(el, '.bar-text')).toBe('MC-004 · EOS INSERIDO');
    expect(text(el, '[role="status"]')).toBe('MC-004 — EOS pronto.');
    expect(text(el, '#crt-cover-title')).toBe('EOS');
    // Sem teaser fora do MC-001.
    expect(text(el, '.copy .actions')).toBe('Explorar projeto');
  });

  it('plays the SYSTEM HORIZON teaser on demand inside the CRT and returns to the cover', async () => {
    reducedMotion(true);
    const el = await renderAt('/');
    click(el.querySelector('#inventory-insert'));
    const play = Array.from(el.querySelectorAll('app-crt-cover button')).find((b) =>
      b.textContent?.includes('Reproduzir teaser'),
    );
    click(play);
    // A tela do teaser chega por import() (chunk sob demanda): espera o READY(teaser).
    for (let i = 0; i < 50 && !el.querySelector('.glass-fill'); i++) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      fixture.detectChanges();
    }

    expect(el.querySelector('.glass-fill')).not.toBeNull();
    // A capa saiu: o foco vai ao Pausar, dentro do vidro.
    await fixture.whenStable();
    expect(document.activeElement?.id).toBe('teaser-toggle');
    expect(text(el, '.teaser-bar')).toContain('Voltar à capa');
    click(el.querySelector('#teaser-back'));
    expect(glass(el).querySelector('app-crt-cover')).not.toBeNull();
  });

  it('ejects for real from the dossier and goes back to a coherent empty slot', async () => {
    reducedMotion(true);
    const el = await renderAt('/');
    click(el.querySelector('#inventory-insert'));
    click(el.querySelector('#inventory-explore'));
    click(el.querySelector('#inventory-eject'));

    expect(text(el, '.slot-status')).toBe('SLOT VAZIO');
    expect(text(el, '[role="status"]')).toBe('Cartucho ejetado.');
    expect(el.querySelector('app-cartridge-library')).not.toBeNull();
    expect(el.querySelector('app-crt-dossier, app-crt-cover')).toBeNull();
    expect(el.querySelector('#inventory-insert')).not.toBeNull();
  });

  it('builds each dossier only from real content (no empty section, no invented link)', async () => {
    expect(PROJECTS.map((p) => [p.serial, dossierSections(p).length])).toEqual([
      ['MC-001', 5],
      ['MC-002', 6],
      ['MC-003', 6],
      ['MC-004', 6],
      ['MC-005', 5],
      ['MC-006', 5],
    ]);
    reducedMotion(true);
    const el = await renderAt('/');
    click(library(el)[5]);
    click(el.querySelector('#inventory-insert'));
    expect(text(el, '.copy mc-status')).toBe('EM ANDAMENTO');
    click(el.querySelector('#inventory-explore'));
    // Comunidade ON: sem link público, a última seção é só "Aprendizados".
    expect(sections(el).at(-1)?.textContent?.replace(/\s+/g, ' ').trim()).toBe('05 Aprendizados');
    click(sections(el)[4]);
    expect(el.querySelector('app-crt-dossier-section .links')).toBeNull();
  });

  it('falls back to the canonical MC-CART and the HTML case when a console layer fails', async () => {
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
    // Sem o CRT, o "Sobre o projeto" segue em texto: descrição e experiências.
    expect(text(el, '.fallback-desc')).toMatch(/^O primeiro cartucho do Modo Campanha./);
    expect(text(el, '.fallback')).toContain('Teaser disponível');
    // A biblioteca segue: escolher outro cartucho recupera a estação.
    click(library(el)[2]);
    expect(el.querySelector('mc-console')).not.toBeNull();
  });

  it('shows the cover text when the art fails, keeping the dossier available', async () => {
    reducedMotion(true);
    const el = await renderAt('/');
    click(library(el)[1]);
    click(el.querySelector('#inventory-insert'));
    el.querySelector('app-crt-cover img.art')!.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(el.querySelector('app-crt-cover img.art')).toBeNull();
    expect(text(el, '#crt-cover-title')).toBe('Aedes Revenge');
    click(el.querySelector('#inventory-explore'));
    expect(el.querySelector('app-crt-dossier')).not.toBeNull();
  });

  it('hides the library with a single cartridge (fixture)', async () => {
    reducedMotion(true);
    const el = await renderAt('/', [PROJECTS[0]]);
    expect(el.querySelector('app-cartridge-library')).toBeNull();
    click(el.querySelector('#inventory-insert'));
    expect(text(el, '#crt-cover-title')).toBe('SYSTEM HORIZON');
  });

  it('renders the en labels and states', async () => {
    reducedMotion(true);
    const el = await renderAt('/en');
    expect(text(el, '.slot-status')).toBe('EMPTY SLOT');
    click(el.querySelector('#inventory-insert'));
    expect(text(el, '.copy .kicker')).toBe('MC-001 / PROJECT');
    expect(text(el, '.copy .type')).toBe('NARRATIVE EXPERIENCE');
    expect(text(el, '#inventory-explore')).toBe('Explore project');
    click(el.querySelector('#inventory-explore'));
    expect(text(el, '#dossier-section-title')).toBe('About the project');
    expect(text(el, '#dossier-back')).toBe('Back to cover');
    expect(text(el, '.to-library')).toBe('Library · MC-001 SYSTEM HORIZON');
    expect(el.querySelector('#project-viewer')?.getAttribute('aria-label')).toBe('Project viewer');
  });
});
