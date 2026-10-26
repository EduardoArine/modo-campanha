// Pós-build do GitHub Pages (D-084). Uso: node scripts/pages-postbuild.mjs <dir do build> <URL do site>
// - Home pré-renderizada (D-098): index.html (pt) e en/index.html (en) já saem do build com o
//   conteúdo, o idioma, o título, a descrição e o Open Graph certos. Sem pré-renderização (build
//   antigo), o en/index.html é derivado do pt, como antes.
// - 404.html: fallback de SPA (o Pages serve 404.html para rotas desconhecidas), a partir do
//   index.csr.html (sem conteúdo pré-renderizado, que não casaria com outra rota).
// - en.html: deixa /en responder sem o redirecionamento para /en/ (diretório).
// - canonical, hreflang, og:url e og:image (og-image-<idioma>.png, D-085) estáticos nos dois idiomas;
//   o LocaleService atualiza as mesmas tags.
// - SYSTEM HORIZON interativo (D-103): as duas páginas pré-renderizadas do jogo recebem as mesmas
//   tags (com as URLs do jogo) e uma cópia sem barra final (system-horizon.html), como o en.html.
// - sitemap.xml com as duas versões da Home e do jogo.
// Falha (exit 1) se alguma marcação esperada não existir ou se o build já tiver sido processado:
// o deploy não sai pela metade nem com tags duplicadas.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [dir, siteUrlArg] = process.argv.slice(2);
if (!dir || !siteUrlArg) {
  console.error('uso: node scripts/pages-postbuild.mjs <dir do build> <URL do site>');
  process.exit(1);
}
const site = siteUrlArg.replace(/\/+$/, '') + '/';
const urls = { 'pt-BR': site, en: site + 'en' };
const gameUrls = { 'pt-BR': site + 'system-horizon', en: site + 'en/system-horizon' };

/** Título, descrição e alt da imagem do dicionário en (fonte única dos textos). Só literais simples. */
function enMeta() {
  const file = fileURLToPath(new URL('../src/app/core/i18n/ui.en.ts', import.meta.url));
  const block = fs.readFileSync(file, 'utf8').match(/meta:\s*\{([\s\S]*?)\n\s*\},/)?.[1];
  const field = (name) => {
    const m = block?.match(
      new RegExp(`${name}:\\s*(['"])((?:\\\\.|(?!\\1)[^\\\\])*)\\1(\\s*\\+)?`),
    );
    if (!m) throw new Error(`meta.${name} não encontrado no ui.en.ts`);
    if (m[3]) throw new Error(`meta.${name} concatenado no ui.en.ts: use um literal simples`);
    return m[2].replace(/\\(.)/g, '$1');
  };
  return { title: field('title'), description: field('description'), imageAlt: field('imageAlt') };
}

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Substitui uma única marcação. Com dois grupos (antes/depois), troca só o miolo. O valor entra por
 * função, então `$&` ou `$1` no texto não são interpretados.
 */
function replaceOnce(html, pattern, value, label) {
  const match = html.match(pattern);
  if (!match) throw new Error(`marcação não encontrada: ${label}`);
  const replacement = match.length === 3 ? `${match[1]}${value}${match[2]}` : value;
  return html.replace(pattern, () => replacement);
}

/** canonical + hreflang + og:url + og:image antes do </head> (URLs da Home ou do jogo). */
function withLinks(html, locale, set = urls) {
  const tags = [
    `<link rel="canonical" href="${set[locale]}">`,
    `<link rel="alternate" hreflang="pt-BR" href="${set['pt-BR']}">`,
    `<link rel="alternate" hreflang="en" href="${set.en}">`,
    `<link rel="alternate" hreflang="x-default" href="${set['pt-BR']}">`,
    `<meta property="og:url" content="${set[locale]}">`,
    `<meta property="og:image" content="${site}og-image-${locale}.png">`,
  ].join('');
  return replaceOnce(html, /<\/head>/, `${tags}</head>`, '</head>');
}

const indexPath = path.join(dir, 'index.html');
const pt = fs.readFileSync(indexPath, 'utf8');
if (/rel="canonical"/.test(pt)) throw new Error('index.html já processado (canonical presente)');
const meta = enMeta();

const enPath = path.join(dir, 'en', 'index.html');
const prerendered = fs.existsSync(enPath);
const csrPath = path.join(dir, 'index.csr.html');
const shell = fs.existsSync(csrPath) ? fs.readFileSync(csrPath, 'utf8') : pt;

let en = prerendered ? fs.readFileSync(enPath, 'utf8') : pt;
if (!prerendered) en = deriveEn(en);

function deriveEn(html) {
  let en = html;
  en = replaceOnce(en, /<html lang="pt-BR"/, '<html lang="en"', 'html lang');
  en = replaceOnce(en, /(<title>)[^<]*(<\/title>)/, escapeHtml(meta.title), 'title');
  en = replaceOnce(
    en,
    /(<meta name="description" content=")[^"]*(")/,
    escapeHtml(meta.description),
    'description',
  );
  en = replaceOnce(
    en,
    /(<meta property="og:title" content=")[^"]*(")/,
    escapeHtml(meta.title),
    'og:title',
  );
  en = replaceOnce(
    en,
    /(<meta property="og:description" content=")[^"]*(")/,
    escapeHtml(meta.description),
    'og:description',
  );
  en = replaceOnce(en, /(<meta property="og:locale" content=")pt_BR(")/, 'en_US', 'og:locale');
  en = replaceOnce(
    en,
    /(<meta property="og:image:alt" content=")[^"]*(")/,
    escapeHtml(meta.imageAlt),
    'og:image:alt',
  );
  en = replaceOnce(
    en,
    /(<meta property="og:locale:alternate" content=")en_US(")/,
    'pt_BR',
    'og:locale:alternate',
  );
  return en;
}

const ptOut = withLinks(pt, 'pt-BR');
const enOut = withLinks(en, 'en');
fs.writeFileSync(indexPath, ptOut);
fs.writeFileSync(path.join(dir, '404.html'), withLinks(shell, 'pt-BR'));
fs.mkdirSync(path.join(dir, 'en'), { recursive: true });
fs.writeFileSync(path.join(dir, 'en', 'index.html'), enOut);
fs.writeFileSync(path.join(dir, 'en.html'), enOut);

const gamePages = {
  'pt-BR': path.join(dir, 'system-horizon', 'index.html'),
  en: path.join(dir, 'en', 'system-horizon', 'index.html'),
};
const hasGame = Object.values(gamePages).every((file) => fs.existsSync(file));
if (hasGame) {
  for (const [locale, file] of Object.entries(gamePages)) {
    const html = withLinks(fs.readFileSync(file, 'utf8'), locale, gameUrls);
    fs.writeFileSync(file, html);
    fs.writeFileSync(path.join(path.dirname(file), '..', 'system-horizon.html'), html);
  }
}

const entries = (set) => {
  const alternates = Object.entries(set)
    .map(([lang, href]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`)
    .join('');
  return Object.values(set).map((loc) => `  <url><loc>${loc}</loc>${alternates}</url>`);
};
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...entries(urls), ...(hasGame ? entries(gameUrls) : [])].join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap);
console.log(
  `pages-postbuild: 404.html, en/index.html${prerendered ? ' (pré-renderizado)' : ''}, en.html${hasGame ? ', SYSTEM HORIZON (pt/en)' : ''} e sitemap.xml para ${site}`,
);
