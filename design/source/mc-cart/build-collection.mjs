// Coleção MC-CART (D-087): normaliza os seis cartuchos oficiais e gera os derivados do runtime.
// Fontes preservadas em design/source/mc-cart/collection/<serial>-<slug>.png (1483 × 1061, RGBA).
//
// 1. Alfa: o corpo vem do gerador com 240–254; vira 255 (como no CRT, D-080). Borda e fundo intactos.
// 2. Caixa do objeto (alfa ≥ 128) → escala UNIFORME para caber no slot do MC-01 (699 × 500, mesma
//    proporção da carcaça canônica do H2), centrado na horizontal e alinhado pela base (1 px de
//    margem, como a carcaça canônica). Nada é esticado nem deformado.
// 3. Derivados WebP: carcaça em escala do console (360/540/699/1398, também as miniaturas da
//    biblioteca) e a ilustração do rótulo para o CRT (recorte ART, 2:1).
//
// Uso (na raiz do repositório): node design/source/mc-cart/build-collection.mjs
// Chrome: caminho padrão do Windows/macOS/Linux, ou a variável CHROME.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import zlib from 'node:zlib';

const SRC = 'design/source/mc-cart/collection/';
const OUT = 'public/assets/cartridges/';
export const CARTRIDGES = [
  'mc-001-system-horizon',
  'mc-002-aedes-revenge',
  'mc-003-scoutevo',
  'mc-004-eos',
  'mc-005-axia',
  'mc-006-comunidade-on',
];
/** Slot do MC-01 (console.geometry.ts) e mestre 2×. */
const SLOT = { width: 699, height: 500, margin: 1 };
const MASTER_SCALE = 2;
const SHELL_WIDTHS = [360, 540, 699, 1398];
/**
 * Janela da ilustração do rótulo, procurada em CADA cartucho (as alturas variam alguns px e o
 * alinhamento é pela base): faixas (px do slot 699 × 500) onde ficam a moldura laranja (topo e
 * laterais) e o início da faixa escura do MC-CART (base). Recorte com INSET px por dentro.
 */
const ART_SEARCH = { top: [80, 130], bottom: [300, 360], left: [90, 140], right: [560, 610] };
const ART_INSET = 2;
const ART_WIDTHS = [640, 952];
/** Cartuchos cuja tela no CRT vem do rótulo; o MC-001 tem arte própria 4:3 e o teaser (D-077). */
const LABEL_ART = CARTRIDGES.filter((name) => !name.startsWith('mc-001'));
const QUALITY = 0.86;

// --- PNG (decodificação e codificação mínimas, sem dependências) -------------------------------
function decode(buf) {
  let pos = 8;
  let width, height;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      if (data[8] !== 8 || data[9] !== 6) throw new Error('esperado PNG RGBA de 8 bits');
    } else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * 4;
  const out = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const row = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let x = 0; x < stride; x++) {
      const a = x >= 4 ? row[x - 4] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= 4 ? prev[x - 4] : 0;
      let v = src[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      row[x] = v & 255;
    }
  }
  return { width, height, data: out };
}

const CRC = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  let c = 0xffffffff;
  for (const v of body) c = CRC[(c ^ v) & 0xff] ^ (c >>> 8);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE((c ^ 0xffffffff) >>> 0);
  return Buffer.concat([len, body, crc]);
}
function encode({ width, height, data }) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) data.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 6 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/** Alfa do corpo 240–254 → 255 e caixa do objeto (alfa ≥ 128). */
function normalize(img) {
  let minX = img.width, maxX = -1, minY = img.height, maxY = -1;
  for (let y = 0; y < img.height; y++)
    for (let x = 0; x < img.width; x++) {
      const i = (y * img.width + x) * 4 + 3;
      if (img.data[i] >= 240) img.data[i] = 255;
      if (img.data[i] >= 128) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  return { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

// --- Chrome (redimensionamento e WebP com alfa) --------------------------------------------------
const chromePath = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]
  .filter(Boolean)
  .find((p) => fs.existsSync(p));
if (!chromePath) {
  console.error('Chrome não encontrado: defina a variável CHROME com o caminho do executável.');
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mc-cart-'));
const boxes = {};
for (const name of CARTRIDGES) {
  const img = decode(fs.readFileSync(path.join(SRC, `${name}.png`)));
  boxes[name] = normalize(img);
  fs.writeFileSync(path.join(tmp, `${name}.png`), encode(img));
}

const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--allow-file-access-from-files',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${path.join(tmp, 'profile')}`,
  'about:blank',
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = [];
try {
  let target;
  for (let i = 0; i < 60 && !target; i++) {
    await sleep(250);
    try {
      target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(
        (t) => t.type === 'page',
      );
    } catch {
      // Chrome ainda subindo.
    }
  }
  if (!target) throw new Error('Chrome não respondeu ao DevTools Protocol');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) pending.get(msg.id)(msg);
  });
  const send = (method, params = {}) =>
    new Promise((r) => {
      pending.set(++id, r);
      ws.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async (expression) => {
    const msg = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (msg.result?.exceptionDetails) throw new Error(JSON.stringify(msg.result.exceptionDetails));
    return msg.result.result.value;
  };
  await send('Page.navigate', { url: pathToFileURL(tmp).href + '/' });
  await sleep(500);

  for (const name of CARTRIDGES) {
    const box = boxes[name];
    const serial = name.slice(0, 6);
    const dir = path.join(OUT, serial);
    fs.mkdirSync(dir, { recursive: true });
    const files = await evaluate(`(async () => {
      const img = new Image();
      img.src = ${JSON.stringify(pathToFileURL(path.join(tmp, `${name}.png`)).href)};
      await img.decode();
      const W = ${SLOT.width * MASTER_SCALE}, H = ${SLOT.height * MASTER_SCALE}, M = ${SLOT.margin * MASTER_SCALE};
      const box = ${JSON.stringify(box)};
      // Escala uniforme: cabe no slot (largura inteira ou altura inteira, a que limitar).
      const s = Math.min(W / box.width, (H - 2 * M) / box.height);
      const w = box.width * s, h = box.height * s;
      const master = document.createElement('canvas');
      master.width = W;
      master.height = H;
      const m = master.getContext('2d');
      m.imageSmoothingQuality = 'high';
      m.drawImage(img, box.x, box.y, box.width, box.height, (W - w) / 2, H - M - h, w, h);
      const out = {};
      const webp = (canvas) => canvas.toDataURL('image/webp', ${QUALITY}).split(',')[1];
      for (const width of ${JSON.stringify(SHELL_WIDTHS)}) {
        const c = document.createElement('canvas');
        c.width = width;
        c.height = Math.round((width * H) / W);
        const ctx = c.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(master, 0, 0, c.width, c.height);
        out['console-scale-' + width + '.webp'] = webp(c);
      }
      const k = ${MASTER_SCALE};
      const search = ${JSON.stringify(ART_SEARCH)};
      const px = m.getImageData(0, 0, W, H).data;
      const at = (x, y) => { const i = (y * W + x) * 4; return [px[i], px[i + 1], px[i + 2]]; };
      const orange = ([r, g, b]) => r > 180 && g > 70 && g < 170 && b < 90 && r - b > 120;
      const dark = ([r, g, b]) => r + g + b < 75;
      // Fração das amostras de uma linha/coluna que passam no teste (miolo, longe dos cantos).
      const rowShare = (y, test) => { let n = 0, t = 0; for (let x = Math.round(W * 0.3); x < W * 0.7; x += 4) { t++; if (test(at(x, y))) n++; } return n / t; };
      const colShare = (x, test) => { let n = 0, t = 0; for (let y = Math.round(H * 0.3); y < H * 0.6; y += 4) { t++; if (test(at(x, y))) n++; } return n / t; };
      let top = search.top[0] * k, bottom = search.bottom[1] * k, left = search.left[0] * k, right = search.right[1] * k;
      for (let y = search.top[0] * k; y < search.top[1] * k; y++) if (rowShare(y, orange) > 0.6) top = y + 1;
      for (let y = search.bottom[0] * k; y < search.bottom[1] * k; y++) if (rowShare(y, dark) > 0.8) { bottom = y; break; }
      // A moldura laranja entre a arte e a faixa escura também fica de fora.
      // (procura a linha laranja mais alta numa janela de até 7 px acima da faixa).
      let cut = bottom;
      for (let y = bottom - 1; y > bottom - 7 * k; y--) if (rowShare(y, orange) > 0.3) cut = y;
      bottom = cut;
      for (let x = search.left[0] * k; x < search.left[1] * k; x++) if (colShare(x, orange) > 0.6) left = x + 1;
      for (let x = search.right[1] * k; x > search.right[0] * k; x--) if (colShare(x, orange) > 0.6) right = x;
      const inset = ${ART_INSET} * k;
      const art = { x: (left + inset) / k, y: (top + inset) / k, width: (right - left - 2 * inset) / k, height: (bottom - top - 2 * inset) / k };
      for (const width of ${JSON.stringify(ART_WIDTHS)}) {
        if (!${JSON.stringify(LABEL_ART)}.includes(${JSON.stringify(name)})) break;
        const c = document.createElement('canvas');
        c.width = width;
        c.height = Math.round((width * art.height) / art.width);
        const ctx = c.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(master, art.x * k, art.y * k, art.width * k, art.height * k, 0, 0, c.width, c.height);
        out['label-art-' + width + '.webp'] = webp(c);
      }
      return { files: out, scale: s, drawn: [Math.round(w), Math.round(h)], art, artSize: [952, Math.round((952 * art.height) / art.width)] };
    })()`);
    for (const [file, b64] of Object.entries(files.files)) {
      fs.writeFileSync(path.join(dir, file), Buffer.from(b64, 'base64'));
    }
    const kb = (f) => Math.round(fs.statSync(path.join(dir, f)).size / 1024);
    report.push(
      `${serial}: objeto ${box.width}×${box.height} → ${files.drawn.join('×')} no mestre 2× (escala ${files.scale.toFixed(4)}); rótulo ${JSON.stringify(files.art)} → arte ${files.artSize.join("×")}; ` +
        Object.keys(files.files)
          .map((f) => `${f} ${kb(f)} KB`)
          .join(', '),
    );
  }
  ws.close();
} finally {
  chrome.kill();
  await sleep(300);
  fs.rmSync(tmp, { recursive: true, force: true });
}
console.log(report.join('\n'));
