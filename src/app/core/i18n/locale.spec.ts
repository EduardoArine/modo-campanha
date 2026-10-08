import { localeFromUrl, localizedUrl } from './locale';

describe('locale', () => {
  it('reads the locale from the URL', () => {
    expect(localeFromUrl('/')).toBe('pt-BR');
    expect(localeFromUrl('/#hero')).toBe('pt-BR');
    expect(localeFromUrl('/en')).toBe('en');
    expect(localeFromUrl('/en#project-inventory')).toBe('en');
    expect(localeFromUrl('/en/projects/x?y=1')).toBe('en');
    expect(localeFromUrl('/english')).toBe('pt-BR');
  });

  it('builds the same URL in another locale, keeping path, query and fragment', () => {
    expect(localizedUrl('/', 'en')).toBe('/en');
    expect(localizedUrl('/en', 'pt-BR')).toBe('/');
    expect(localizedUrl('/#hero', 'en')).toBe('/en#hero');
    expect(localizedUrl('/en/projects/x?y=1#top', 'pt-BR')).toBe('/projects/x?y=1#top');
    expect(localizedUrl('/en', 'en')).toBe('/en');
  });
});
