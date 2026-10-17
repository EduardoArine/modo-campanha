import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { CampaignLogSection } from './campaign-log-section';

// Testes rodam na configuração `development`: CHAPTER 00 — ORIGIN e CHAPTER 01 — DO CONTROLE AO
// CÓDIGO (conteúdo real, docs/15 §13–§14), seguidos da linha profissional MOCK (D-049).
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

  /** Entradas da linha profissional (fora dos capítulos). */
  const PRO = '.entry:not(.entry--chapter):not(.entry--story)';
  const STORY = '.entry--story';

  it('uses one ordered list: chapters (h3 + h4s + closing), then professional checkpoints (h3)', async () => {
    const section = (await renderAt('/')).querySelector('section#campaign-log')!;

    expect(section.querySelector('h2')?.textContent).toBe('CAMPAIGN LOG');
    expect(section.querySelectorAll('ol[role="list"]').length).toBe(1);
    // 00: cabeçalho + 5 · 01: cabeçalho + 5 + fechamento · 02: cabeçalho + 3 · MOCK: 4.
    expect(section.querySelectorAll('ol > li').length).toBe(6 + 7 + 4 + 4);
    expect(texts(section, 'h3').slice(0, 3)).toEqual([
      'CHAPTER 00 — ORIGIN',
      'CHAPTER 01 — DO CONTROLE AO CÓDIGO',
      'CHAPTER 02',
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
    ]);
    expect(texts(section, `${PRO} h3`)[0]).toBe('Da tecnologia para o desenvolvimento');
  });

  it('opens each chapter with its signature and closes CHAPTER 01 with CHECKPOINT COMPLETE', async () => {
    const el = await renderAt('/');

    expect(texts(el, '.signature')).toEqual([
      'A campanha começou muito antes do código.',
      'O que começou como paixão na infância se transformou em uma escolha de vida.',
      'A campanha estava apenas começando.',
    ]);
    const chapterItems = Array.from(el.querySelectorAll('.entry--chapter'));
    expect(chapterItems.length).toBe(4);
    expect(
      chapterItems[2].querySelector('.chapter-name')?.textContent?.replace(/\s+/g, ' ').trim(),
    ).toBe('CHECKPOINT COMPLETE — 2017');
    expect(texts(el, '.entry--chapter .period')).toEqual(['2013 — 2017']);
  });

  it('numbers chapter checkpoints from their order; codenames only where they exist', async () => {
    const el = await renderAt('/');

    expect(texts(el, `${STORY} > .kind`)).toEqual([
      'CHECKPOINT 01 · FIRST CONTACT',
      'CHECKPOINT 02 · THE RENTAL STORE YEARS',
      'CHECKPOINT 03 · THE LADYBUG WISH',
      'CHECKPOINT 04 · EARNED, NOT GIVEN',
      'CHECKPOINT 05 · BUILT FROM MEMORIES',
      'CHECKPOINT 01',
      'CHECKPOINT 02',
      'CHECKPOINT 03',
      'CHECKPOINT 04',
      'CHECKPOINT 05',
      'CHECKPOINT 01 · SCOUTEVO',
      'CHECKPOINT 02 · EOS',
      'CHECKPOINT 03 · AXIA',
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
      '2021 — 2024',
    ]);
    expect(
      Array.from(el.querySelectorAll(`${STORY} time`)).map((t) => t.getAttribute('datetime')),
    ).toEqual(['1991', '2013', '2016', '2017', '2017', '2018', '2019', '2021', '2024']);
  });

  it('shows the full story only on demand, with a native, localized details toggle', async () => {
    const el = await renderAt('/');
    const stories = el.querySelectorAll<HTMLDetailsElement>(`${STORY} details`);

    expect(stories.length).toBe(13);
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
    expect(link.textContent?.replace(/s+/g, ' ').trim()).toBe('Ler o TCC (PDF) (abre em nova aba)');
  });

  it('lists the EOS references by type, with the paper authorship as context', async () => {
    const el = await renderAt('/');
    const eos = el.querySelectorAll('.entry--story')[11];
    const hrefs = Array.from(eos.querySelectorAll('.refs a')).map((a) => a.getAttribute('href'));

    // O DOI fica sob o mesmo tipo do artigo: o rótulo não se repete.
    expect(texts(eos, '.refs .kind')).toEqual([
      'PUBLICAÇÃO CIENTÍFICA',
      'IMPRENSA',
      'REGISTRO BIBLIOGRÁFICO',
    ]);
    expect(hrefs).toEqual([
      'https://www.sciencedirect.com/science/article/abs/pii/S2213624X21000067',
      'https://doi.org/10.1016/j.cstp.2021.01.005',
      'https://portal.afya.com.br/saude/software-pode-reduzir-tempo-no-transporte-de-orgaos-para-transplante',
      'https://openalex.org/W3128566934',
    ]);
    expect(texts(eos, '.refs .context')[0]).toBe(
      'Artigo sobre o EOS, de Henrique Barros Bellotti e Maria Teresa Françoso.',
    );
    expect(
      Array.from(eos.querySelectorAll('.refs a')).every(
        (a) => a.getAttribute('target') === '_blank',
      ),
    ).toBe(true);
  });

  it('resolves professional system labels from the UI dictionary', async () => {
    const el = await renderAt('/');

    expect(texts(el, `${PRO} .kind`)).toEqual([
      'CHECKPOINT',
      'CHECKPOINT',
      'CHECKPOINT',
      'CAMPANHA ATUAL',
    ]);
  });

  it('renders real time elements; the open current entry reads "since"', async () => {
    const el = await renderAt('/');

    expect(texts(el, `${PRO} .period`)).toEqual([
      '2014 — 2018',
      '2019 — 2022',
      '2023 — 2025',
      'DESDE 2025',
    ]);
    expect(el.querySelector(`${PRO} .period time`)?.getAttribute('datetime')).toBe('2014');
    expect(el.querySelectorAll('li:last-child .period time').length).toBe(1);
  });

  it('shows context only when present', async () => {
    const el = await renderAt('/');

    expect(texts(el, '.entry > .context')).toEqual([
      'Tecnologia em Jogos Digitais · FATEC Americana',
      'Comunidade On',
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
    expect(el.querySelectorAll('a').length).toBe(7);
    expect(el.querySelectorAll('summary').length).toBe(13);
    expect(el.textContent).not.toMatch(/\bXP\b|\bLV\b|unlocked|%|★/);
  });

  it('renders the en labels and content', async () => {
    const el = await renderAt('/en');

    expect(texts(el, 'h3').slice(0, 3)).toEqual([
      'CHAPTER 00 — ORIGIN',
      'CHAPTER 01 — FROM CONTROLLER TO CODE',
      'CHAPTER 02',
    ]);
    expect(texts(el, `${STORY} h4`).slice(-3)).toEqual([
      'When an Idea Took the Field',
      'Technology Where Every Minute Matters',
      'From Concept to Operational Intelligence',
    ]);
    expect(texts(el, '.signature')[0]).toBe('The campaign started long before the code.');
    expect(texts(el, `${STORY} .period`)[1]).toBe('SNES era');
    expect(texts(el, `${STORY} .period`)[6]).toBe('During college');
    expect(texts(el, `${STORY} h4`)[3]).toBe('Earned Through Work');
    expect(el.querySelector(`${STORY} summary .open`)?.textContent).toBe('Read the full story');
    expect(texts(el, '.context')[0]).toBe('Digital Games Technology · FATEC Americana');
    expect(texts(el, '.refs .kind')[0]).toBe('ACADEMIC DOCUMENT');
    expect(texts(el, `${PRO} .kind`).at(-1)).toBe('CURRENT CAMPAIGN');
    expect(texts(el, `${PRO} .period`).at(-1)).toBe('SINCE 2025');
    expect(texts(el, `${PRO} h3`).at(-1)).toBe('Building products end to end');
  });
});
