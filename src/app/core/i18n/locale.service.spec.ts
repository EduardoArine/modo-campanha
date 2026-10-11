import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  it('follows the URL and updates html lang and title', async () => {
    const harness = await RouterTestingHarness.create();
    const service = TestBed.inject(LocaleService);
    const html = TestBed.inject(DOCUMENT).documentElement;

    await harness.navigateByUrl('/en');
    TestBed.tick();
    expect(service.locale()).toBe('en');
    expect(html.lang).toBe('en');
    expect(service.ui().inventory.subtitle).toBe('Cartridges collected along the campaign.');

    await service.switchTo('pt-BR');
    TestBed.tick();
    expect(service.locale()).toBe('pt-BR');
    expect(html.lang).toBe('pt-BR');
    expect(TestBed.inject(Title).getTitle()).toBe('Modo Campanha — Eduardo Arine');
  });

  it('keeps hreflang alternates, canonical and Open Graph in sync with the locale', async () => {
    const harness = await RouterTestingHarness.create();
    const service = TestBed.inject(LocaleService);
    const head = TestBed.inject(DOCUMENT).head;
    const base = TestBed.inject(DOCUMENT).baseURI;
    const href = (selector: string) => head.querySelector<HTMLLinkElement>(selector)?.href;
    const og = (property: string) =>
      head.querySelector(`meta[property="${property}"]`)?.getAttribute('content');

    await harness.navigateByUrl('/en#player-status');
    TestBed.tick();
    expect(service.locale()).toBe('en');
    expect(href('link[rel="alternate"][hreflang="pt-BR"]')).toBe(new URL('', base).href);
    expect(href('link[rel="alternate"][hreflang="en"]')).toBe(new URL('en', base).href);
    expect(href('link[rel="alternate"][hreflang="x-default"]')).toBe(new URL('', base).href);
    expect(href('link[rel="canonical"]')).toBe(new URL('en', base).href);
    expect(og('og:locale')).toBe('en_US');
    expect(og('og:locale:alternate')).toBe('pt_BR');
    expect(og('og:url')).toBe(new URL('en', base).href);
    expect(og('og:description')).toContain("Eduardo Arine's professional portfolio");

    await harness.navigateByUrl('/');
    TestBed.tick();
    expect(href('link[rel="canonical"]')).toBe(new URL('', base).href);
    expect(og('og:locale')).toBe('pt_BR');
    expect(og('og:locale:alternate')).toBe('en_US');
    expect(head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
  });

  it('picks localized content in the active locale', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/en');
    const service = TestBed.inject(LocaleService);

    expect(service.pick({ 'pt-BR': 'Projetos', en: 'Projects' })).toBe('Projects');
  });

  it('exposes the current URL and the localized home path', async () => {
    const harness = await RouterTestingHarness.create();
    const service = TestBed.inject(LocaleService);

    await harness.navigateByUrl('/en#player-status');
    expect(service.url()).toBe('/en#player-status');
    expect(service.homePath()).toBe('/en');
    expect(service.urlFor('pt-BR')).toBe('/#player-status');

    await harness.navigateByUrl('/');
    expect(service.homePath()).toBe('/');
  });
});
