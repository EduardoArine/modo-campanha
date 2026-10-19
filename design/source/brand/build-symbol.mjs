// Símbolo do Modo Campanha (D-085): glifo de quatro quadrados dentro de uma placa com o topo
// escalonado do MC-CART (variação G3). Fonte editável única: a geometria abaixo gera o SVG mestre,
// o favicon (SVG + ICO 16/32/48), o apple-touch-icon (180) e o PNG mestre (512), sem dependências
// (rasterização com supersampling 8 × 8 e encoder PNG mínimo com zlib do Node).
//
// Uso (na raiz do repositório): node design/source/brand/build-symbol.mjs
import fs from 'node:fs';
import zlib from 'node:zlib';

// Paleta do Modo Campanha (primitivos de src/styles/tokens/_color.scss).
const INK = '#14110f'; // ink-950: placa
const SURFACE = '#1d1815'; // ink-900: fundo opaco do apple-touch-icon
const ORANGE = '#f28c28'; // orange-500: glifo

// Geometria na grade 16 × 16 (tamanho real do favicon).
const SHELL_RADIUS = 3;
// Recorte do topo (escalonado do MC-CART): trapézio de (5,0)–(11,0) até (6.2,1.6)–(9.8,1.6).
const NOTCH = {
  top: 0,
  bottom: 1.6,
  outerLeft: 5,
  innerLeft: 6.2,
  innerRight: 9.8,
  outerRight: 11,
};
const SQUARES = [
  [3, 4],
  [9, 4],
  [3, 10],
  [9, 10],
];
const SQUARE = { size: 4, radius: 0.9 };

export const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <path fill="${INK}" d="M3 0H5L6.2 1.6H9.8L11 0H13A3 3 0 0 1 16 3V13A3 3 0 0 1 13 16H3A3 3 0 0 1 0 13V3A3 3 0 0 1 3 0Z"/>
  <g fill="${ORANGE}">
${SQUARES.map(([x, y]) => `    <rect x="${x}" y="${y}" width="${SQUARE.size}" height="${SQUARE.size}" rx="${SQUARE.radius}"/>`).join('\n')}
  </g>
</svg>
`;

function inRoundedRect(px, py, x, y, w, h, r) {
  if (px < x || px > x + w || py < y || py > y + h) return false;
  const cx = Math.min(Math.max(px, x + r), x + w - r);
  const cy = Math.min(Math.max(py, y + r), y + h - r);
  return (px - cx) ** 2 + (py - cy) ** 2 <= r * r;
}

function inNotch(px, py) {
  if (py < NOTCH.top || py > NOTCH.bottom) return false;
  const t = (py - NOTCH.top) / (NOTCH.bottom - NOTCH.top);
  const left = NOTCH.outerLeft + (NOTCH.innerLeft - NOTCH.outerLeft) * t;
  const right = NOTCH.outerRight + (NOTCH.innerRight - NOTCH.outerRight) * t;
  return px > left && px < right;
}

const inShell = (px, py) => inRoundedRect(px, py, 0, 0, 16, 16, SHELL_RADIUS) && !inNotch(px, py);
const inSquare = (px, py) =>
  SQUARES.some(([x, y]) => inRoundedRect(px, py, x, y, SQUARE.size, SQUARE.size, SQUARE.radius));

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

/** RGBA do símbolo em `size` px; `background` (hex) torna o fundo opaco e insere o símbolo com margem. */
function rasterize(size, { background, inset = 0 } = {}) {
  const SS = 8;
  const data = Buffer.alloc(size * size * 4);
  const [ir, ig, ib] = rgb(INK);
  const [or, og, ob] = rgb(ORANGE);
  const bg = background && rgb(background);
  const inner = size - 2 * inset;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let shell = 0;
      let square = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const u = ((x - inset + (sx + 0.5) / SS) / inner) * 16;
          const v = ((y - inset + (sy + 0.5) / SS) / inner) * 16;
          if (inShell(u, v)) {
            shell++;
            if (inSquare(u, v)) square++;
          }
        }
      }
      const a = shell / (SS * SS);
      const s = square / (SS * SS);
      // Cor do símbolo (laranja onde há quadrado, ink no resto da placa), cobertura = placa.
      const sym =
        a > 0
          ? [0, 1, 2].map((i) => ([or, og, ob][i] * s + [ir, ig, ib][i] * (a - s)) / a)
          : [0, 0, 0];
      const o = (y * size + x) * 4;
      if (bg) {
        for (let i = 0; i < 3; i++) data[o + i] = Math.round(sym[i] * a + bg[i] * (1 - a));
        data[o + 3] = 255;
      } else {
        for (let i = 0; i < 3; i++) data[o + i] = Math.round(sym[i]);
        data[o + 3] = Math.round(a * 255);
      }
    }
  }
  return data;
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function png(size, rgba) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++)
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // 8 bits
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/** ICO com imagens PNG embutidas (suportado por todos os navegadores atuais). */
function ico(sizes) {
  const images = sizes.map((s) => png(s, rasterize(s)));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map((img, i) => {
    const e = Buffer.alloc(16);
    e[0] = sizes[i] >= 256 ? 0 : sizes[i];
    e[1] = sizes[i] >= 256 ? 0 : sizes[i];
    e.writeUInt16LE(1, 4); // planos
    e.writeUInt16LE(32, 6); // bits por pixel
    e.writeUInt32LE(img.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images]);
}

const SRC = 'design/source/brand/';
fs.writeFileSync(`${SRC}mc-symbol.svg`, SVG);
fs.writeFileSync(`${SRC}mc-symbol-512.png`, png(512, rasterize(512)));
fs.writeFileSync('public/favicon.svg', SVG);
fs.writeFileSync('public/favicon.ico', ico([16, 32, 48]));
// iOS não respeita transparência: fundo opaco (ink-900) e o símbolo com margem de 10%.
fs.writeFileSync(
  'public/apple-touch-icon.png',
  png(180, rasterize(180, { background: SURFACE, inset: 18 })),
);
console.log('ok: mc-symbol.svg, mc-symbol-512.png, favicon.svg, favicon.ico, apple-touch-icon.png');
