import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { FinalCheckpointSection } from './final-checkpoint-section';

describe('FinalCheckpointSection', () => {
  async function renderAt(url: string): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create(url);
    const fixture = TestBed.createComponent(FinalCheckpointSection);
    await harness.fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('is a labelled section with SAVE COMPLETE as its only system detail', async () => {
    const section = (await renderAt('/')).querySelector('section#final-checkpoint')!;
    const h2 = section.querySelector('h2')!;

    expect(section.getAttribute('aria-labelledby')).toBe(h2.id);
    expect(h2.id).toBe('final-checkpoint-title');
    expect(h2.textContent).toBe('CAMPAIGN CONTINUES...');
    expect(section.querySelector('.code')?.textContent).toBe('SAVE COMPLETE');
    expect(section.textContent).not.toMatch(/CONTINUE\?|SAVE 01/);
    expect(section.querySelector('mc-status')).toBeNull();
  });

  it('renders the approved closing in pt-BR and en', async () => {
    expect((await renderAt('/')).querySelector('.closing')?.textContent).toBe(
      'Se quiser construir algo comigo ou trocar ideias sobre produto, IA, desenvolvimento ou games, estes são os melhores lugares para me encontrar.',
    );

    TestBed.resetTestingModule();
    expect((await renderAt('/en')).querySelector('.closing')?.textContent).toBe(
      "If you'd like to build something together or exchange ideas about product, AI, development, or games, these are the best places to find me.",
    );
  });

  it('offers GitHub and LinkedIn as equivalent secondary actions opening in a new tab', async () => {
    const el = await renderAt('/');
    const links = Array.from(el.querySelectorAll<HTMLAnchorElement>('.actions a'));

    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      'https://github.com/EduardoArine',
      'https://www.linkedin.com/in/eduardoarine',
    ]);
    for (const a of links) {
      expect(a.classList).toContain('mc-action--secondary');
      expect(a.getAttribute('target')).toBe('_blank');
      expect(a.getAttribute('rel')).toBe('noopener noreferrer');
      expect(a.textContent).toContain('(abre em nova aba)');
      // Só o ícone `external` (traço); ícones de marca são `fill`.
      expect(a.querySelectorAll('mc-icon').length).toBe(1);
      expect(a.querySelector('mc-icon')?.classList).toContain('mc-icon--stroke');
    }
    expect(el.querySelector('.mc-action--primary')).toBeNull();
  });

  it('shows no destination without an approved public link', async () => {
    const el = await renderAt('/');
    const hrefs = Array.from(el.querySelectorAll('a')).map((a) => a.getAttribute('href') ?? '');

    expect(hrefs.some((href) => /^(mailto|tel):|wa\.me|whatsapp/i.test(href))).toBe(false);
    expect(el.querySelector('form, input, textarea')).toBeNull();
    expect(el.textContent).not.toMatch(/Currículo|Résumé|e-?mail|WhatsApp/i);
  });
});
