import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { CAMPAIGN_LOG_CHAPTERS } from '../../data';
import { CampaignLogSection } from './campaign-log-section';

// Diário de Campanha (D-091): mapa por capítulos (A + C) sobre a mesma fonte canônica (D-074):
// CAPÍTULO 00 — ORIGEM, CAPÍTULO 01 — DO CONTROLE AO CÓDIGO e CAPÍTULO 02 — DO CÓDIGO AO PRODUTO.
describe('CampaignLogSection (Diário de Campanha)', () => {
  let fixture: ComponentFixture<CampaignLogSection>;

  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    fixture = TestBed.createComponent(CampaignLogSection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  const text = (root: Element, selector: string) =>
    root.querySelector(selector)?.textContent?.replace(/\s+/g, ' ').trim();
  const texts = (root: Element, selector: string) =>
    Array.from(root.querySelectorAll(selector)).map((el) =>
      el.textContent?.replace(/\s+/g, ' ').trim(),
    );
  const click = (el: Element | null | undefined) => {
    (el as HTMLElement).click();
    fixture.detectChanges();
  };
  const nodes = (el: Element) => Array.from(el.querySelectorAll('app-diary-map .hit'));
  const steps = (el: Element) =>
    Array.from(el.querySelectorAll('app-diary-milestone .steps button'));

  it('opens with the editorial header, the chapter selector and CHAPTER 00 on its first milestone', async () => {
    const el = await renderAt('/');

    expect(text(el, 'h2')).toBe('DIÁRIO DE CAMPANHA');
    expect(text(el, '.intro')).toMatch(/^Uma jornada real, dividida em capítulos/);
    const cards = Array.from(el.querySelectorAll('app-diary-chapters .card'));
    expect(cards.map((c) => c.getAttribute('aria-label'))).toEqual([
      'CAP. 00 — ORIGEM, 5 marcos',
      'CAP. 01 — DO CONTROLE AO CÓDIGO, 5 marcos',
      'CAP. 02 — DO CÓDIGO AO PRODUTO, 4 marcos',
    ]);
    expect(cards.map((c) => c.getAttribute('aria-current'))).toEqual(['true', null, null]);
    expect(text(el, 'app-diary-chapters .is-selected .state')).toBe('SELECIONADO');

    expect(text(el, '#diary-chapter-title')).toBe('ORIGEM');
    expect(text(el, '.head .signature')).toBe('A campanha começou muito antes do código.');
    expect(nodes(el).map((n) => n.getAttribute('aria-label'))).toEqual([
      'MARCO 01 de 05: Primeiro contato',
      'MARCO 02 de 05: A escola das locadoras',
      'MARCO 03 de 05: O pedido à joaninha',
      'MARCO 04 de 05: Uma conquista construída com trabalho',
      'MARCO 05 de 05: Uma coleção de histórias',
    ]);
    expect(nodes(el)[0].getAttribute('aria-current')).toBe('step');
    expect(text(el, 'app-diary-milestone .when')).toBe('c. 1991');
    expect(text(el, 'app-diary-milestone .eyebrow')).toBe('MARCO 01 de 05 · PRIMEIRO CONTATO');
    expect(text(el, '#diary-milestone-title')).toBe('Primeiro contato');
    expect(text(el, 'app-diary-milestone .summary')).toMatch(/^Minha história com os videogames/);
  });

  it('places every milestone on the map with the same coordinates as the route', async () => {
    const el = await renderAt('/');
    const lis = Array.from(el.querySelectorAll<HTMLElement>('app-diary-map .node'));
    expect(lis.map((li) => [li.style.left, li.style.top])).toEqual([
      ['14%', '72%'],
      ['32%', '56%'],
      ['49%', '65%'],
      ['68%', '42%'],
      ['84%', '60%'],
    ]);
    expect(el.querySelector('app-diary-map .route-line')?.getAttribute('d')).toMatch(/^M14 72 C/);
    // Cenário decorativo (a navegação está nos botões), com derivados por largura.
    const art = el.querySelector('app-diary-map img.art')!;
    expect(art.getAttribute('alt')).toBe('');
    expect(art.getAttribute('src')).toBe('assets/diary/maps/ch00-origem-1672.webp');
    expect(art.getAttribute('srcset')).toContain('ch00-origem-640.webp 640w');
    expect(art.getAttribute('loading')).toBe('lazy');
    // Imagem editorial do marco, com alt descritivo.
    const story = el.querySelector('app-diary-milestone img.image')!;
    expect(story.getAttribute('src')).toBe(
      'assets/diary/stories/ch00-01-primeiro-contato-1536.webp',
    );
    expect(story.getAttribute('alt')).toMatch(/^Ilustração em pixel art: uma sala ao pôr do sol/);
  });

  it('keeps a ratio placeholder where the art has not arrived yet (CHAPTER 02)', async () => {
    const el = await renderAt('/');
    click(el.querySelectorAll('app-diary-chapters .card')[2]);
    expect(el.querySelector('app-diary-map .art--placeholder')).not.toBeNull();
    expect(el.querySelector('app-diary-map img')).toBeNull();
    expect(el.querySelector('app-diary-milestone .image--placeholder')).not.toBeNull();
  });

  it('switches milestone on the map: panel, highlight, route and mobile list change together', async () => {
    const el = await renderAt('/');
    click(nodes(el)[2]);

    expect(text(el, '#diary-milestone-title')).toBe('O pedido à joaninha');
    expect(text(el, 'app-diary-milestone .when')).toBe('Infância');
    expect(text(el, 'app-diary-milestone .eyebrow')).toBe('MARCO 03 de 05 · O PEDIDO À JOANINHA');
    expect(nodes(el).map((n) => n.getAttribute('aria-current'))).toEqual([
      null,
      null,
      'step',
      null,
      null,
    ]);
    expect(el.querySelector('app-diary-map .route-travelled')).not.toBeNull();
    const items = Array.from(el.querySelectorAll('app-diary-milestones .item'));
    expect(items[2].getAttribute('aria-current')).toBe('step');

    click(items[4]);
    expect(text(el, '#diary-milestone-title')).toBe('Uma coleção de histórias');
  });

  it('steps through the milestones and, at the last one, offers the next chapter', async () => {
    const el = await renderAt('/');
    expect(steps(el)[0].getAttribute('aria-disabled')).toBe('true');
    click(steps(el)[0]);
    expect(text(el, '#diary-milestone-title')).toBe('Primeiro contato');

    const next = steps(el)[1];
    for (let i = 0; i < 4; i++) click(next);
    expect(text(el, '#diary-milestone-title')).toBe('Uma coleção de histórias');
    // O mesmo botão vira "Próximo capítulo" (o foco não se perde).
    expect(steps(el)[1]).toBe(next);
    expect(next.getAttribute('aria-label')).toBe(
      'Próximo capítulo: CAPÍTULO 01 — DO CONTROLE AO CÓDIGO',
    );

    click(next);
    expect(text(el, '#diary-chapter-title')).toBe('DO CONTROLE AO CÓDIGO');
    expect(text(el, '.head .eyebrow')).toBe('CAPÍTULO 01 · 2013 — 2017');
    expect(text(el, '.head .context')).toBe('Tecnologia em Jogos Digitais · FATEC Americana');
    expect(text(el, '#diary-milestone-title')).toBe('Quando a paixão virou escolha');
    expect(
      Array.from(el.querySelectorAll('app-diary-chapters .card')).map((c) =>
        c.getAttribute('aria-current'),
      ),
    ).toEqual([null, 'true', null]);
  });

  it('reads the full story on demand, with the real photos and sources, and closes it on change', async () => {
    const el = await renderAt('/');
    click(nodes(el)[4]);
    const toggle = el.querySelector('app-diary-milestone .toggle')!;
    const story = el.querySelector<HTMLElement>('#diary-story')!;

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-controls')).toBe('diary-story');
    expect(story.getAttribute('hidden')).toBe('until-found');
    click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('#diary-story')!.hasAttribute('hidden')).toBe(false);
    // A 1ª frase da história é o resumo: ele sai enquanto a história está aberta.
    expect(el.querySelector('app-diary-milestone .summary')).toBeNull();
    expect(texts(el, '#diary-story > p').length).toBe(2);
    expect(el.querySelectorAll('#diary-story .photos img').length).toBe(2);
    expect(toggle.textContent?.trim()).toBe('Recolher a história');

    click(steps(el)[0]);
    expect(el.querySelector('#diary-story')!.getAttribute('hidden')).toBe('until-found');
  });

  it('closes each chapter as the timeline did: CHECKPOINT COMPLETE or the ongoing quest', async () => {
    const el = await renderAt('/');
    click(el.querySelectorAll('app-diary-chapters .card')[1]);
    click(nodes(el)[4]);
    expect(text(el, '.closing .kind')).toBe('MARCO CONCLUÍDO — 2017');
    expect(text(el, '.closing-text')).toBe('A campanha estava apenas começando.');
    click(el.querySelector('app-diary-milestone .toggle'));
    const tcc = el.querySelector<HTMLAnchorElement>('#diary-story .refs a')!;
    expect(tcc.getAttribute('target')).toBe('_blank');
    expect(text(el, '#diary-story .refs .kind')).toBe('DOCUMENTO ACADÊMICO');

    click(el.querySelectorAll('app-diary-chapters .card')[2]);
    click(nodes(el)[3]);
    expect(text(el, '.closing .kind')).toBe('MISSÃO ATUAL — EM ANDAMENTO');
    // Último capítulo: o mesmo botão fica desabilitado (sem próximo capítulo).
    expect(steps(el)[1].getAttribute('aria-disabled')).toBe('true');
    // Resumo próprio (D-073): continua visível com a história aberta.
    click(el.querySelector('app-diary-milestone .toggle'));
    expect(el.querySelector('app-diary-milestone .summary')).not.toBeNull();
  });

  it('keeps every real milestone, paragraph and source reachable (nothing lost in the migration)', async () => {
    const el = await renderAt('/');
    CAMPAIGN_LOG_CHAPTERS.forEach((chapter, c) => {
      click(el.querySelectorAll('app-diary-chapters .card')[c]);
      chapter.entries.forEach((entry, i) => {
        click(nodes(el)[i]);
        expect(text(el, '#diary-milestone-title')).toBe(entry.title['pt-BR']);
        if (entry.code)
          expect(text(el, 'app-diary-milestone .eyebrow')).toContain(entry.code['pt-BR']);
        expect(el.querySelectorAll('#diary-story > p').length).toBe(entry.story['pt-BR'].length);
        expect(el.querySelectorAll('#diary-story .refs a').length).toBe(entry.links?.length ?? 0);
        expect(el.querySelectorAll('#diary-story .photos img').length).toBe(
          entry.photos?.length ?? 0,
        );
      });
    });
  });

  it('previews the other chapters below, and opening one moves focus to its title', async () => {
    const el = await renderAt('/');
    expect(texts(el, '.other-name')).toEqual(['DO CONTROLE AO CÓDIGO', 'DO CÓDIGO AO PRODUTO']);
    const open = el.querySelectorAll('.other button')[1];
    expect(open.getAttribute('aria-label')).toBe(
      'Abrir capítulo: CAPÍTULO 02 — DO CÓDIGO AO PRODUTO',
    );
    click(open);
    await fixture.whenStable();

    expect(text(el, '#diary-chapter-title')).toBe('DO CÓDIGO AO PRODUTO');
    expect(document.activeElement?.id).toBe('diary-chapter-title');
    expect(texts(el, '.other-name')).toEqual(['ORIGEM', 'DO CONTROLE AO CÓDIGO']);
  });

  it('shows no game metrics or invented status', async () => {
    const el = await renderAt('/');
    const all = el.textContent ?? '';
    expect(all).not.toMatch(/\bXP\b|\bLV\b|%|CONCLUÍDO\b(?! —)|bloquead/i);
  });

  it('renders the en labels', async () => {
    const el = await renderAt('/en');
    expect(text(el, 'h2')).toBe('CAMPAIGN LOG');
    expect(text(el, '#diary-chapter-title')).toBe('ORIGIN');
    expect(nodes(el)[1].getAttribute('aria-label')).toBe(
      'CHECKPOINT 02 of 05: The Rental Store Years',
    );
    expect(steps(el)[1].textContent?.trim()).toBe('Next checkpoint');
    expect(text(el, 'app-diary-milestone .toggle')).toBe('Read the full story');
    expect(text(el, '.others-title')).toBe('OTHER CHAPTERS');
  });
});
