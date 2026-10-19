import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { CampaignLogSection } from './campaign-log-section';

// O Campaign Log usa a mesma fonte canônica em todos os ambientes (D-074): CAPÍTULO 00 — ORIGEM,
// CAPÍTULO 01 — DO CONTROLE AO CÓDIGO e CAPÍTULO 02 — DO CÓDIGO AO PRODUTO (docs/15 §13–§17).
// A antiga linha profissional MOCK (D-049) foi aposentada.
describe('CampaignLogSection', () => {
  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(CampaignLogSection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  const texts = (root: Element, selector: string) =>
    Array.from(root.querySelectorAll(selector)).map((el) =>
      el.textContent?.replace(/\s+/g, ' ').trim(),
    );

  const STORY = '.entry--story';

  it('uses one ordered list: chapter header (h3), checkpoints (h4) and closing per chapter', async () => {
    const section = (await renderAt('/')).querySelector('section#campaign-log')!;

    expect(section.querySelector('h2')?.textContent).toBe('DIÁRIO DE CAMPANHA');
    expect(section.querySelectorAll('ol[role="list"]').length).toBe(1);
    // 00: cabeçalho + 5 · 01: cabeçalho + 5 + fechamento · 02: cabeçalho + 4 + fechamento.
    expect(section.querySelectorAll('ol > li').length).toBe(6 + 7 + 6);
    expect(texts(section, 'h3')).toEqual([
      'CAPÍTULO 00 — ORIGEM',
      'CAPÍTULO 01 — DO CONTROLE AO CÓDIGO',
      'CAPÍTULO 02 — DO CÓDIGO AO PRODUTO',
    ]);
    expect(texts(section, `${STORY} h4`)).toEqual([
      'Primeiro contato',
      'A escola das locadoras',
      'O pedido à joaninha',
      'Uma conquista construída com trabalho',
      'Uma coleção de histórias',
      'Quando a paixão virou escolha',
      'Aedes Revenge — Meu primeiro grande projeto',
      'Meu primeiro Melhor Jogo',
      'Um jogo de verdade, com jogadores de verdade',
      'Dois prêmios e um TCC nota 10',
      'Quando uma ideia entrou em campo',
      'Tecnologia em que cada minuto importa',
      'Da ideia à inteligência operacional',
      'Quando os games viraram uma linguagem de produto',
    ]);
  });

  it('renders only the real chapters: no professional line, no item after the open closing', async () => {
    const el = await renderAt('/');
    const items = Array.from(el.querySelectorAll('ol > li'));

    // Todo item pertence a um capítulo (cabeçalho, checkpoint ou fechamento).
    expect(items.every((li) => li.matches('.entry--chapter, .entry--story'))).toBe(true);
    expect(el.querySelectorAll('.entry--origin, .entry--checkpoint, .entry--current').length).toBe(
      0,
    );
    // O eixo termina no último item: o fechamento CURRENT QUEST do CHAPTER 02, sem rastro vazio.
    expect(items.at(-1)?.classList).toContain('entry--ongoing');
    expect(el.textContent).not.toMatch(
      /Da tecnologia para o desenvolvimento|IA entrou no workflow|Construindo produtos de ponta a ponta/,
    );
  });

  it('opens each chapter with its signature and closes it (COMPLETE or IN PROGRESS)', async () => {
    const el = await renderAt('/');

    expect(texts(el, '.signature')).toEqual([
      'A campanha começou muito antes do código.',
      'O que começou como paixão na infância se transformou em uma escolha de vida.',
      'A campanha estava apenas começando.',
      'Cada projeto trouxe um novo desafio. Cada desafio ampliou minha maneira de criar produtos digitais.',
      'XP real, sem personagem.',
    ]);
    const chapterItems = Array.from(el.querySelectorAll('.entry--chapter'));
    expect(chapterItems.length).toBe(5);
    expect(chapterItems[4].classList).toContain('entry--ongoing');
    expect(chapterItems[4].querySelector('time')).toBeNull();
    expect(chapterItems[4].querySelector('.chapter-name')?.textContent?.trim()).toBe(
      'MISSÃO ATUAL — EM ANDAMENTO',
    );
    expect(
      chapterItems[2].querySelector('.chapter-name')?.textContent?.replace(/\s+/g, ' ').trim(),
    ).toBe('MARCO CONCLUÍDO — 2017');
    expect(texts(el, '.entry--chapter .period')).toEqual(['2013 — 2017', '2018 — ATUAL']);
  });

  it('keeps Comunidade ON as the open current campaign, last in the log', async () => {
    const el = await renderAt('/');
    const stories = el.querySelectorAll(STORY);
    const on = stories[stories.length - 1];

    expect(on.querySelector('.kind')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'MARCO 04 · COMUNIDADE ON',
    );
    expect(on.querySelector('.period')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'DESDE 2025',
    );
    expect(on.nextElementSibling?.classList).toContain('entry--ongoing');
  });

  it('numbers chapter checkpoints from their order; codenames only where they exist', async () => {
    const el = await renderAt('/');

    expect(texts(el, `${STORY} > .kind`)).toEqual([
      'MARCO 01 · PRIMEIRO CONTATO',
      'MARCO 02 · OS ANOS DE LOCADORA',
      'MARCO 03 · O PEDIDO À JOANINHA',
      'MARCO 04 · CONQUISTADO, NÃO GANHO',
      'MARCO 05 · FEITO DE MEMÓRIAS',
      'MARCO 01',
      'MARCO 02',
      'MARCO 03',
      'MARCO 04',
      'MARCO 05',
      'MARCO 01 · SCOUTEVO',
      'MARCO 02 · EOS',
      'MARCO 03 · AXIA',
      'MARCO 04 · COMUNIDADE ON',
    ]);
  });

  it('only shows years that were provided; everything else is an era', async () => {
    const el = await renderAt('/');

    expect(texts(el, `${STORY} .period`)).toEqual([
      'c. 1991',
      'Época do SNES',
      'Infância',
      'Época do PlayStation',
      'Vida adulta',
      '2013',
      'Durante a graduação',
      '2016',
      '2017',
      '2017',
      '2018',
      '2019',
      'c. 2020/2021',
      'DESDE 2025',
    ]);
    expect(
      Array.from(el.querySelectorAll(`${STORY} time`)).map((t) => t.getAttribute('datetime')),
    ).toEqual(['1991', '2013', '2016', '2017', '2017', '2018', '2019', '2025']);
  });

  it('shows the full story only on demand, with a native, localized details toggle', async () => {
    const el = await renderAt('/');
    const stories = el.querySelectorAll<HTMLDetailsElement>(`${STORY} details`);

    expect(stories.length).toBe(14);
    expect(Array.from(stories).every((d) => !d.open)).toBe(true);
    expect(stories[0].querySelector('summary .open')?.textContent).toBe('Ler a história completa');
    expect(stories[9].querySelectorAll('details > p').length).toBe(4);
  });

  it('links the capstone project (TCC) inside the last FATEC story, in a new tab', async () => {
    const el = await renderAt('/');
    const link = el
      .querySelectorAll('.entry--story')[9]
      .querySelector<HTMLAnchorElement>('details .refs a')!;

    expect(link.getAttribute('href')).toBe(
      'https://ric.cps.sp.gov.br/bitstream/123456789/720/1/20171S_ARINEJUNIOREduardoLuiz_OD0153.pdf',
    );
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    expect(link.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'Ler o TCC (PDF) (abre em nova aba)',
    );
  });

  it('lists the EOS references by type, with the paper authorship as context', async () => {
    const el = await renderAt('/');
    const eos = el.querySelectorAll('.entry--story')[11];
    const hrefs = Array.from(eos.querySelectorAll('.refs a')).map((a) => a.getAttribute('href'));

    // O DOI fica sob o mesmo tipo do artigo: o rótulo não se repete.
    expect(texts(eos, '.refs .kind')).toEqual([
      'LANÇAMENTO INSTITUCIONAL',
      'PUBLICAÇÃO CIENTÍFICA',
      'IMPRENSA',
      'REGISTRO BIBLIOGRÁFICO',
    ]);
    expect(hrefs).toEqual([
      'https://www.fecfau.unicamp.br/pos/ppgec/noticias/1693',
      'https://www.sciencedirect.com/science/article/abs/pii/S2213624X21000067',
      'https://doi.org/10.1016/j.cstp.2021.01.005',
      'https://portal.afya.com.br/saude/software-pode-reduzir-tempo-no-transporte-de-orgaos-para-transplante',
      'https://openalex.org/W3128566934',
    ]);
    expect(texts(eos, '.refs .context')[1]).toBe(
      'Artigo sobre o EOS, de Henrique Barros Bellotti e Maria Teresa Françoso.',
    );
    expect(
      Array.from(eos.querySelectorAll('.refs a')).every(
        (a) => a.getAttribute('target') === '_blank',
      ),
    ).toBe(true);
  });

  it('links Axia only to the working InfraFM report (no homepage stand-in)', async () => {
    const el = await renderAt('/');
    const axia = el.querySelectorAll('.entry--story')[12];

    expect(Array.from(axia.querySelectorAll('.refs a')).map((a) => a.getAttribute('href'))).toEqual(
      [
        'https://infrafm.com.br/Textos/3/23644/Como-um-pequeno-dispositivo-pode-acabar-com-ruidos-operacionais-e-prever-afastamentos',
      ],
    );
    expect(el.innerHTML).not.toContain('arppen.com');
  });

  it('shows chapter context only when present', async () => {
    const el = await renderAt('/');

    expect(texts(el, '.entry > .context')).toEqual([
      'Tecnologia em Jogos Digitais · FATEC Americana',
    ]);
  });

  it('keeps decoration hidden; interactions are the story toggles and evidence links', async () => {
    const el = await renderAt('/');

    expect(
      Array.from(el.querySelectorAll('.marker')).every(
        (m) => m.getAttribute('aria-hidden') === 'true',
      ),
    ).toBe(true);
    expect(el.querySelectorAll('button, [tabindex], [role="button"]').length).toBe(0);
    expect(el.querySelectorAll('a').length).toBe(8);
    expect(el.querySelectorAll('summary').length).toBe(14);
    // O lema aprovado ("XP real, sem personagem.") é a única ocorrência permitida de XP.
    expect(el.textContent?.replace('XP real, sem personagem.', '')).not.toMatch(
      /\bXP\b|\bLV\b|unlocked|%|★/,
    );
  });

  it('renders the en labels and content', async () => {
    const el = await renderAt('/en');

    expect(texts(el, 'h3')).toEqual([
      'CHAPTER 00 — ORIGIN',
      'CHAPTER 01 — FROM CONTROLLER TO CODE',
      'CHAPTER 02 — FROM CODE TO PRODUCT',
    ]);
    expect(texts(el, '.entry--chapter .period')).toEqual(['2013 — 2017', '2018 — PRESENT']);
    expect(texts(el, '.entry--ongoing .chapter-name')).toEqual(['CURRENT QUEST — IN PROGRESS']);
    expect(texts(el, '.entry--ongoing .signature')).toEqual(['Real XP. No persona.']);
    expect(texts(el, `${STORY} .summary`).at(-1)).toBe(
      'Where I bring together engineering, product design, artificial intelligence, and gamification to build digital experiences that go beyond traditional interfaces.',
    );
    expect(texts(el, `${STORY} h4`).slice(-4)).toEqual([
      'When an Idea Took the Field',
      'Technology Where Every Minute Matters',
      'From Concept to Operational Intelligence',
      'When Games Became a Product Language',
    ]);
    expect(texts(el, '.signature')[0]).toBe('The campaign started long before the code.');
    expect(texts(el, `${STORY} .period`)[1]).toBe('SNES era');
    expect(texts(el, `${STORY} .period`)[6]).toBe('During college');
    expect(texts(el, `${STORY} .period`).slice(-2)).toEqual(['c. 2020/2021', 'SINCE 2025']);
    expect(texts(el, `${STORY} h4`)[3]).toBe('Earned Through Work');
    expect(el.querySelector(`${STORY} summary .open`)?.textContent).toBe('Read the full story');
    expect(texts(el, '.context')[0]).toBe('Digital Games Technology · FATEC Americana');
    expect(texts(el, '.refs .kind')[0]).toBe('ACADEMIC DOCUMENT');
  });

  it('keeps pt-BR and en in parity: same structure and order, every text translated', async () => {
    const pt = await renderAt('/');
    TestBed.resetTestingModule();
    const en = await renderAt('/en');

    // Mesma estrutura e ordem: itens, codinomes, datas (time) e links.
    expect(en.querySelectorAll('ol > li').length).toBe(pt.querySelectorAll('ol > li').length);
    // Rótulos dos marcos: mesma numeração e mesmos nomes próprios; o resto, em cada idioma.
    const kinds = (root: Element) => texts(root, `${STORY} > .kind`);
    expect(kinds(en).map((k) => k?.replace(/^CHECKPOINT/, 'MARCO'))).toEqual(
      kinds(pt).map((k) =>
        k
          ?.replace('PRIMEIRO CONTATO', 'FIRST CONTACT')
          .replace('OS ANOS DE LOCADORA', 'THE RENTAL STORE YEARS')
          .replace('O PEDIDO À JOANINHA', 'THE LADYBUG WISH')
          .replace('CONQUISTADO, NÃO GANHO', 'EARNED, NOT GIVEN')
          .replace('FEITO DE MEMÓRIAS', 'BUILT FROM MEMORIES'),
      ),
    );
    const attrs = (root: Element, selector: string, name: string) =>
      Array.from(root.querySelectorAll(selector)).map((n) => n.getAttribute(name));
    expect(attrs(en, 'time', 'datetime')).toEqual(attrs(pt, 'time', 'datetime'));
    expect(attrs(en, '.refs a', 'href')).toEqual(attrs(pt, '.refs a', 'href'));
    // Nada sem tradução: títulos, resumos e parágrafos diferem entre os idiomas, nenhum vazio.
    for (const selector of [`${STORY} h4`, `${STORY} .summary`, '.story > p', '.signature']) {
      const a = texts(pt, selector);
      const b = texts(en, selector);
      expect(b.length).toBe(a.length);
      expect(b.every((t, i) => !!t && t !== a[i])).toBe(true);
    }
    // Nenhuma chave técnica ou valor indefinido visível.
    for (const root of [pt, en]) {
      expect(root.textContent).not.toMatch(/campaignLog\.|undefined|null|\[object/);
    }
  });
});
