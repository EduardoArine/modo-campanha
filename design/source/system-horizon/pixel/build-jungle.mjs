// SYSTEM HORIZON — CORRIDA NA SELVA (D-104): folha dos bichos e fundo do minijogo do marco
// "Primeiro contato". Fontes geradas no PixelLab (paleta oficial forçada), em
// design/source/system-horizon/jungle/ (32 × 32 e 160 × 120). Este script reduz os sprites 2:1 (a
// mesma densidade do personagem, docs/22 §13), encaixa cada pixel na paleta (sh-palette.gpl) e monta:
// - public/assets/system-horizon/sh-jungle.png: 7 quadros 16 × 16 numa linha, pés no pivot 8,15
//   (escorpião A, escorpião B, jacaré fechado, jacaré aberto, cobra, joystick, aranha);
// - public/assets/system-horizon/sh-jungle-bg.png: o fundo 160 × 120 na paleta, com o chão (y ≥ 98).
//
// Uso (na raiz do repositório): node design/source/system-horizon/pixel/build-jungle.mjs
import fs from 'node:fs';
import zlib from 'node:zlib';

const SRC = 'design/source/system-horizon/jungle/';
const OUT = 'public/assets/system-horizon/';
const FRAMES = ['scorpion-a', 'scorpion-b', 'croc-closed', 'croc-open', 'snake', 'joystick', 'spider'];
const CELL = 16;

const PALETTE = [
  '393455', 'c6805c', 'f04e1c', 'b43831', 'f1ba8c', '3c372e', '693548', '51909a',
  '264f5e', '040403', '312726', '162637', '21191b', 'fdba3f', 'f8761a', '715313',
].map((h) => [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)));

const nearest = ([r, g, b]) =>
  PALETTE.reduce((best, c) =>
    (c[0] - r) ** 2 + (c[1] - g) ** 2 + (c[2] - b) ** 2 <
    (best[0] - r) ** 2 + (best[1] - g) ** 2 + (best[2] - b) ** 2
      ? c
      : best,
  );

// Sprites: 2:1 pela cor mais frequente de cada bloco 2 × 2 (transparente se o bloco for quase vazio).
const sheet = blank(CELL * FRAMES.length, CELL);
FRAMES.forEach((name, f) => {
  const src = readPng(SRC + name + '.png');
  const half = blank(src.w / 2, src.h / 2);
  for (let y = 0; y < half.h; y++)
    for (let x = 0; x < half.w; x++) {
      const counts = new Map();
      for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
        const p = get(src, x * 2 + dx, y * 2 + dy);
        if (p[3] < 128) continue;
        const key = nearest(p).join(',');
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
      const total = [...counts.values()].reduce((a, b) => a + b, 0);
      if (total < 2) continue;
      const [key] = [...counts].sort((a, b) => b[1] - a[1])[0];
      set(half, x, y, [...key.split(',').map(Number), 255]);
    }
  // Encosta embaixo e centraliza no quadro (pés no pivot 8,15).
  const box = bbox(half);
  const ox = f * CELL + Math.floor((CELL - (box.x1 - box.x0 + 1)) / 2) - box.x0;
  const oy = CELL - 1 - box.y1;
  for (let y = box.y0; y <= box.y1; y++)
    for (let x = box.x0; x <= box.x1; x++) {
      const p = get(half, x, y);
      if (p[3]) set(sheet, x + ox, y + oy, p);
    }
  console.log(name, `${box.x1 - box.x0 + 1}×${box.y1 - box.y0 + 1}`);
});
fs.writeFileSync(OUT + 'sh-jungle.png', writePng(sheet));

// Fundo: só a paleta (a fonte já foi gerada com ela forçada).
const bg = readPng(SRC + 'jungle-bg.png');
for (let y = 0; y < bg.h; y++)
  for (let x = 0; x < bg.w; x++) set(bg, x, y, [...nearest(get(bg, x, y)), 255]);
// Chão chapado, como no 2600, assado no fundo (claro, para os bichos escuros aparecerem):
// faixa dourada no topo, terra bronze com listras oliva. O lago é desenhado pelo jogo por cima.
const GROUND = 98;
const hex = (h) => [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
for (let y = GROUND; y < bg.h; y++)
  for (let x = 0; x < bg.w; x++)
    set(bg, x, y, [...hex(y < GROUND + 2 ? 'fdba3f' : (y - GROUND) % 5 === 4 ? '715313' : 'c6805c'), 255]);
fs.writeFileSync(OUT + 'sh-jungle-bg.png', writePng(bg));
console.log('sh-jungle.png', `${sheet.w}×${sheet.h}`, '· sh-jungle-bg.png', `${bg.w}×${bg.h}`);

// ---------------------------------------------------------------------------------------------
function blank(w, h) {
  return { w, h, px: new Uint8Array(w * h * 4) };
}
function get(img, x, y) {
  const o = (y * img.w + x) * 4;
  return [img.px[o], img.px[o + 1], img.px[o + 2], img.px[o + 3]];
}
function set(img, x, y, p) {
  img.px.set(p, (y * img.w + x) * 4);
}
function bbox(img) {
  let x0 = img.w, y0 = img.h, x1 = -1, y1 = -1;
  for (let y = 0; y < img.h; y++)
    for (let x = 0; x < img.w; x++)
      if (get(img, x, y)[3]) {
        x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
      }
  return { x0, y0, x1, y1 };
}

/** Decodificador PNG mínimo (8 bits, RGB/RGBA, sem entrelaçamento). */
function readPng(file) {
  const buf = fs.readFileSync(file);
  let o = 8, w = 0, h = 0, type = 0;
  const idat = [];
  while (o < buf.length) {
    const len = buf.readUInt32BE(o);
    const name = buf.toString('ascii', o + 4, o + 8);
    const data = buf.subarray(o + 8, o + 8 + len);
    if (name === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4); type = data[9];
      if (data[8] !== 8 || (type !== 2 && type !== 6) || data[12]) throw new Error(`${file}: PNG não suportado`);
    } else if (name === 'IDAT') idat.push(data);
    o += 12 + len;
  }
  const bpp = type === 6 ? 4 : 3;
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = w * bpp;
  const out = blank(w, h);
  let prev = new Uint8Array(stride);
  for (let y = 0; y < h; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = new Uint8Array(stride);
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0, b = prev[i], c = i >= bpp ? prev[i - bpp] : 0;
      const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c);
      const pred = [0, a, b, (a + b) >> 1, pa <= pb && pa <= pc ? a : pb <= pc ? b : c][filter];
      cur[i] = (line[i] + pred) & 255;
    }
    for (let x = 0; x < w; x++)
      out.px.set([cur[x * bpp], cur[x * bpp + 1], cur[x * bpp + 2], bpp === 4 ? cur[x * bpp + 3] : 255], (y * w + x) * 4);
    prev = cur;
  }
  return out;
}

/** PNG RGBA (alfa binário). */
function writePng(img) {
  const raw = Buffer.alloc(img.h * (img.w * 4 + 1));
  for (let y = 0; y < img.h; y++) Buffer.from(img.px.subarray(y * img.w * 4, (y + 1) * img.w * 4)).copy(raw, y * (img.w * 4 + 1) + 1);
  const crc = (b) => {
    let c = ~0;
    for (const x of b) { c ^= x; for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1)); }
    return ~c >>> 0;
  };
  const chunk = (t, d) => {
    const l = Buffer.alloc(4); l.writeUInt32BE(d.length);
    const td = Buffer.concat([Buffer.from(t), d]);
    const c = Buffer.alloc(4); c.writeUInt32BE(crc(td));
    return Buffer.concat([l, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(img.w, 0); ihdr.writeUInt32BE(img.h, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}
