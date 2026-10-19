// Pós-build do GitHub Pages (D-084). Uso: node scripts/pages-postbuild.mjs <dir do build> <URL do site>
// - 404.html: fallback de SPA (o Pages serve 404.html para rotas desconhecidas).
// - en/index.html e en.html: a rota /en com idioma, título, descrição e Open Graph em inglês já no
//   HTML (quem não executa JavaScript, como as prévias de redes sociais, lê o idioma certo). O
//   en.html deixa /en responder sem o redirecionamento para /en/ (diretório).
// - canonical, hreflang e og:url estáticos nos dois idiomas; o LocaleService atualiza as mesmas tags.
// - sitemap.xml com as duas versões.
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

/** Título e descrição do dicionário en (fonte única dos textos). Só literais simples. */
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
  return { title: field('title'), description: field('description') };
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

/** canonical + hreflang + og:url antes do </head>. */
function withLinks(html, locale) {
  const tags = [
    `<link rel="canonical" href="${urls[locale]}">`,
    `<link rel="alternate" hreflang="pt-BR" href="${urls['pt-BR']}">`,
    `<link rel="alternate" hreflang="en" href="${urls.en}">`,
    `<link rel="alternate" hreflang="x-default" href="${urls['pt-BR']}">`,
    `<meta property="og:url" content="${urls[locale]}">`,
  ].join('');
  return replaceOnce(html, /<\/head>/, `${tags}</head>`, '</head>');
}

const indexPath = path.join(dir, 'index.html');
const pt = fs.readFileSync(indexPath, 'utf8');
if (/rel="canonical"/.test(pt)) throw new Error('index.html já processado (canonical presente)');
const meta = enMeta();

let en = pt;
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
  /(<meta property="og:locale:alternate" content=")en_US(")/,
  'pt_BR',
  'og:locale:alternate',
);

const ptOut = withLinks(pt, 'pt-BR');
const enOut = withLinks(en, 'en');
fs.writeFileSync(indexPath, ptOut);
fs.writeFileSync(path.join(dir, '404.html'), ptOut);
fs.mkdirSync(path.join(dir, 'en'), { recursive: true });
fs.writeFileSync(path.join(dir, 'en', 'index.html'), enOut);
fs.writeFileSync(path.join(dir, 'en.html'), enOut);

const alternates = Object.entries(urls)
  .map(([lang, href]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`)
  .join('');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Object.values(urls)
  .map((loc) => `  <url><loc>${loc}</loc>${alternates}</url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap);
console.log(`pages-postbuild: 404.html, en/index.html, en.html e sitemap.xml para ${site}`);
