// Idiomas do Modo Campanha (D-018, D-020). A URL é a fonte da verdade:
// `/` → pt-BR (padrão) e `/en` → en.

export const LOCALES = ['pt-BR', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt-BR';

/** Prefixo de rota de cada idioma. O padrão vive na raiz. */
export const LOCALE_PATH: Record<Locale, string> = { 'pt-BR': '', en: 'en' };

/** Valor de conteúdo nos dois idiomas. O TypeScript exige ambos. */
export type Localized<T = string> = Record<Locale, T>;

/** Separa `/en/x?y#z` em caminho (`/en/x`) e sufixo (`?y#z`). */
function splitUrl(url: string): [path: string, suffix: string] {
  const index = url.search(/[?#]/);
  return index === -1 ? [url, ''] : [url.slice(0, index), url.slice(index)];
}

function segmentsOf(path: string): string[] {
  return path.split('/').filter(Boolean);
}

/** Idioma de uma URL do Router (ex.: `/en#hero` → `en`). */
export function localeFromUrl(url: string): Locale {
  const [first] = segmentsOf(splitUrl(url)[0]);
  return (
    LOCALES.find((locale) => LOCALE_PATH[locale] && LOCALE_PATH[locale] === first) ?? DEFAULT_LOCALE
  );
}

/** Mesma URL em outro idioma, preservando caminho, query e fragmento. */
export function localizedUrl(url: string, target: Locale): string {
  const [path, suffix] = splitUrl(url);
  const segments = segmentsOf(path);
  if (localeFromUrl(path) !== DEFAULT_LOCALE) {
    segments.shift();
  }
  const prefix = LOCALE_PATH[target];
  return '/' + [prefix, ...segments].filter(Boolean).join('/') + suffix;
}
