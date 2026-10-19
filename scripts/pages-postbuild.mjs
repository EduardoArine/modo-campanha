// Pós-build do GitHub Pages (D-084). Uso: node scripts/pages-postbuild.mjs <dir do build> <URL do site>
// - 404.html: fallback de SPA (o Pages serve 404.html para rotas desconhecidas).
// - en/index.html: a rota /en com idioma, título, descrição e Open Graph em inglês já no HTML (quem
//   não executa JavaScript, como as prévias de redes sociais, lê o idioma certo).
// - canonical, hreflang e og:url estáticos nos dois idiomas; o LocaleService atualiza as mesmas tags.
// - sitemap.xml com as duas versões.
// Falha (exit 1) se alguma marcação esperada não for encontrada: o deploy não sai pela metade.
import fs from 'node:fs';
import path from 'node:path';

const [dir, siteUrlArg] = process.argv.slice(2);
if (!dir || !siteUrlArg) {
  console.error('uso: node scripts/pages-postbuild.mjs <dir do build> <URL do site>');
  process.exit(1);
}
const site = siteUrlArg.replace(/\/+$/, '') + '/';
const urls = { 'pt-BR': site, en: site + 'en' };

/** Título e descrição do dicionário en (fonte única dos textos, D-018/D-020). */
function enMeta() {
  const source = fs.readFileSync(path.resolve('src/app/core/i18n/ui.en.ts'), 'utf8');
  const block = source.match(/meta:\s*\{([\s\S]*?)\n\s*\},/);
  const field = (name) =>
    block?.[1].match(new RegExp(`${name}:\\s*(['"])((?:\\\\.|(?!\\1).)*)\\1`))?.[2];
  const title = field('title');
  const description = field('description');
  if (!title || !description) throw new Error('meta do ui.en.ts não encontrado');
  return { title, description };
}

const escapeAttr = (text) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`marcação não encontrada: ${label}`);
  return html.replace(pattern, replacement);
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
const meta = enMeta();

let en = pt;
en = replaceOnce(en, /<html lang="pt-BR"/, '<html lang="en"', 'html lang');
en = replaceOnce(en, /<title>[^<]*<\/title>/, `<title>${meta.title}</title>`, 'title');
en = replaceOnce(
  en,
  /(<meta name="description" content=")[^"]*(")/,
  `$1${escapeAttr(meta.description)}$2`,
  'description',
);
en = replaceOnce(
  en,
  /(<meta property="og:title" content=")[^"]*(")/,
  `$1${escapeAttr(meta.title)}$2`,
  'og:title',
);
en = replaceOnce(
  en,
  /(<meta property="og:description" content=")[^"]*(")/,
  `$1${escapeAttr(meta.description)}$2`,
  'og:description',
);
en = replaceOnce(en, /(<meta property="og:locale" content=")pt_BR(")/, '$1en_US$2', 'og:locale');
en = replaceOnce(
  en,
  /(<meta property="og:locale:alternate" content=")en_US(")/,
  '$1pt_BR$2',
  'og:locale:alternate',
);

const ptOut = withLinks(pt, 'pt-BR');
fs.writeFileSync(indexPath, ptOut);
fs.writeFileSync(path.join(dir, '404.html'), ptOut);
fs.mkdirSync(path.join(dir, 'en'), { recursive: true });
fs.writeFileSync(path.join(dir, 'en', 'index.html'), withLinks(en, 'en'));

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
console.log(`pages-postbuild: 404.html, en/index.html e sitemap.xml para ${site}`);
