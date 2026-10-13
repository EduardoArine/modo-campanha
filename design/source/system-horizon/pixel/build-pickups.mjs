// SYSTEM HORIZON — fonte editável dos pickups, HUD e MC-CART (D-068, docs/22 §4.3–§4.7, §14).
// Pixel art desenhada à mão em grade, só com a paleta oficial (sh-palette.gpl). Gera os PNGs do
// runtime sem dependências (encoder PNG mínimo com zlib do Node).
//
// Uso (na raiz do repositório): node design/source/system-horizon/pixel/build-pickups.mjs
import fs from 'node:fs';
import zlib from 'node:zlib';

const OUT = 'public/assets/system-horizon/';

// Paleta oficial (sh-palette.gpl). Letra → cor.
const C = {
  K: '#040403', // contorno
  b: '#21191b', // quase preto
  G: '#312726', // grafite escuro
  g: '#3c372e', // grafite
  O: '#f8761a', // laranja
  R: '#f04e1c', // vermelho-laranja
  Y: '#fdba3f', // ouro
  c: '#f1ba8c', // claro
  t: '#c6805c', // bronze
  P: '#393455', // roxo do céu
  N: '#162637', // azul-noite
  T: '#51909a', // teal
};

// ---------------------------------------------------------------------------------------------
// Ícones 8 × 8 (sh-items.png): forma em '#', contorno automático K, cor por item.
const ICONS = [
  // BUILD: </>
  {
    color: 'O',
    edge: 'none',
    rows: [
      '........',
      '....#...',
      '.#..#.#.',
      '#..#...#',
      '.#.#..#.',
      '..#.....',
      '........',
      '........',
    ],
  },
  // PRODUCT: card de interface
  {
    color: 'c',
    rows: [
      '........',
      '.######.',
      '.#....#.',
      '.#.##.#.',
      '.#....#.',
      '.######.',
      '........',
      '........',
    ],
  },
  // AI: nós conectados
  {
    color: 'T',
    edge: 'shadow',
    rows: [
      '........',
      '...##...',
      '...##...',
      '..#..#..',
      '.#....#.',
      '##....##',
      '##....##',
      '........',
    ],
  },
  // GAME DNA: d-pad
  {
    color: 'Y',
    rows: [
      '........',
      '...##...',
      '...##...',
      '.######.',
      '.######.',
      '...##...',
      '...##...',
      '........',
    ],
  },
];

function icon({ color, rows, edge }, glint) {
  const g = grid(8, 8);
  rows.forEach((r, y) => [...r].forEach((ch, x) => ch === '#' && (g[y][x] = color)));
  // Traço fino em 8 px: sem borda (BUILD) ou sombra de 1 px (AI); formas cheias: contorno.
  if (edge === 'shadow') shadow(g, 'K');
  else if (edge !== 'none') outline(g, 'K');
  if (glint) {
    // brilho: o primeiro pixel da forma (de cima para baixo, da direita para a esquerda) fica claro
    outer: for (let y = 0; y < 8; y++)
      for (let x = 7; x >= 0; x--)
        if (g[y][x] === color) {
          g[y][x] = color === 'c' ? 'Y' : 'c';
          break outer;
        }
  }
  return g;
}

// ---------------------------------------------------------------------------------------------
// Efeito de coleta 12 × 12 × 3 (sh-collect-fx.png), pivot 6,6.
function fx(frame) {
  const g = grid(12, 12);
  const set = (x, y, k) => (g[y][x] = k);
  if (frame === 0) {
    for (let d = 1; d <= 2; d++)
      [
        [6 + d, 6],
        [6 - d, 6],
        [6, 6 + d],
        [6, 6 - d],
      ].forEach(([x, y]) => set(x, y, 'Y'));
    set(6, 6, 'c');
  } else if (frame === 1) {
    for (let d = 1; d <= 4; d++)
      [
        [6 + d, 6],
        [6 - d, 6],
        [6, 6 + d],
        [6, 6 - d],
      ].forEach(([x, y]) => set(x, y, d > 2 ? 'O' : 'Y'));
    [
      [3, 3],
      [9, 3],
      [3, 9],
      [9, 9],
    ].forEach(([x, y]) => set(x, y, 'c'));
    set(6, 6, 'c');
  } else {
    [
      [6, 1],
      [6, 11],
      [1, 6],
      [11, 6],
    ].forEach(([x, y]) => set(x, y, 'O'));
    [
      [2, 2],
      [10, 2],
      [2, 10],
      [10, 10],
    ].forEach(([x, y]) => set(x, y, 'Y'));
  }
  return g;
}

// ---------------------------------------------------------------------------------------------
// Slot do HUD 10 × 10 × 2 (sh-hud-slot.png): vazio (borda bronze) e preenchido (borda laranja).
function slot(filled) {
  const g = grid(10, 10);
  for (let y = 0; y < 10; y++)
    for (let x = 0; x < 10; x++)
      g[y][x] = x === 0 || y === 0 || x === 9 || y === 9 ? (filled ? 'O' : 't') : 'b';
  return g;
}

// ---------------------------------------------------------------------------------------------
// MC-CART (silhueta oficial dos renders, D-065): horizontal, carcaça grafite, trilhos laranja,
// rótulo com o pôr do sol (SYSTEM HORIZON) e faixa MC-CART com o glifo de quatro quadrados (OO/OO).
// Rebaixo no centro do topo e ▼ embutido na base, como no render. Desenho em 24 × 15, centrado no
// quadro 24 × 30 (pivot 12,15).
const CART = [
  '..KKKKKKKK....KKKKKKKK..',
  '.KOggggggOKKKKOggggggOK.',
  'KOgKKKKKKKKKKKKKKKKKKgOK',
  'KOgKPPPPPPPPPPPPPPPPKgOK',
  'KOgKRRRRRRRRRRRRRRRRKgOK',
  'KOgKOOOOOOOYYOOOOOOOKgOK',
  'KOgKPPPPPPYYYYPPPPPPKgOK',
  'KOgKNNNNNNNYYNNNNNNNKgOK',
  'KOgKNNNNNNNOONNNNNNNKgOK',
  'KOgKKKKKKKKKKKKKKKKKKgOK',
  'KOgbccbcccbbbbbbbOObbgOK',
  'KOgbbbbbbbbbbbbbbOObbgOK',
  'KOggggggggGGGGggggggggOK',
  'KOgggggggggGGgggggggggOK',
  '.KKKKKKKKKKKKKKKKKKKKKK.',
];
const CART_TOP = 7; // linha do desenho dentro do quadro 24 × 30
const LABEL = { x0: 4, x1: 19, y0: 3, y1: 8 }; // arte do rótulo (coordenadas do desenho)
const STRIP = { x0: 3, x1: 20, y0: 10, y1: 11 }; // faixa MC-CART
const GLYPH = [
  [17, 10],
  [18, 10],
  [17, 11],
  [18, 11],
]; // quatro quadrados

function cartForm(step) {
  const base = CART.map((r) => [...r]);
  if (step <= 3) for (const [x, y] of GLYPH.slice(step === 3 ? 2 : 0)) base[y][x] = 'b'; // 3: só os 2 de cima acesos
  if (step <= 1) {
    for (let y = LABEL.y0; y <= LABEL.y1; y++)
      for (let x = LABEL.x0; x <= LABEL.x1; x++) base[y][x] = 'b';
    for (let y = STRIP.y0; y <= STRIP.y1; y++)
      for (let x = STRIP.x0; x <= STRIP.x1; x++) base[y][x] = 'b';
  }
  if (step === 5) base[1][3] = 'c'; // brilho
  const g = grid(24, 30);
  base.forEach((r, y) => r.forEach((ch, x) => ch !== '.' && (g[y + CART_TOP][x] = ch)));
  if (step === 0) {
    // só o contorno da silhueta, em tom claro
    const edge = grid(24, 30);
    for (let y = 0; y < 30; y++)
      for (let x = 0; x < 24; x++)
        if (
          g[y][x] &&
          [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ].some(([dx, dy]) => !g[y + dy]?.[x + dx])
        )
          edge[y][x] = 'c';
    return edge;
  }
  return g;
}

// MC-CART do HUD 12 × 15 (pivot 0,0), mesmo desenho reduzido à mão (12 × 9, centrado na vertical).
const MINI = [
  '.KKKK..KKKK.',
  'KOggOKKOggOK',
  'KOKKKKKKKKOK',
  'KOKRRYYRRKOK',
  'KOKNNYYNNKOK',
  'KOKKKKKKKKOK',
  'KObccbbOObOK',
  'KOggggggggOK',
  '.KKKKKKKKKK.',
];
function cartMini() {
  const g = grid(12, 15);
  MINI.forEach((r, y) => [...r].forEach((ch, x) => ch !== '.' && (g[y + 3][x] = ch)));
  return g;
}

// ---------------------------------------------------------------------------------------------
// Folhas no layout do contrato (quadros da esquerda para a direita, de cima para baixo).
const SHEETS = {
  'sh-items.png': { cols: 2, frames: ICONS.flatMap((i) => [icon(i, false), icon(i, true)]) },
  'sh-collect-fx.png': { cols: 3, frames: [0, 1, 2].map(fx) },
  'sh-hud-slot.png': { cols: 2, frames: [slot(false), slot(true)] },
  'sh-cart-mini.png': { cols: 1, frames: [cartMini()] },
  'sh-cart-form.png': { cols: 6, frames: [0, 1, 2, 3, 4, 5].map(cartForm) },
};

for (const [file, { cols, frames }] of Object.entries(SHEETS)) {
  const fh = frames[0].length;
  const fw = frames[0][0].length;
  const rows = Math.ceil(frames.length / cols);
  const sheet = grid(cols * fw, rows * fh);
  frames.forEach((f, i) =>
    f.forEach((r, y) =>
      r.forEach((ch, x) => ch && (sheet[Math.floor(i / cols) * fh + y][(i % cols) * fw + x] = ch)),
    ),
  );
  fs.writeFileSync(OUT + file, png(sheet));
  console.log(file, `${cols * fw}×${rows * fh}`);
}

// ---------------------------------------------------------------------------------------------
function grid(w, h) {
  return Array.from({ length: h }, () => Array(w).fill(null));
}

/** Sombra de 1 px para baixo/direita: separa do fundo sem fechar os vãos de traços finos. */
function shadow(g, k) {
  const marks = [];
  g.forEach((r, y) =>
    r.forEach(
      (ch, x) =>
        ch &&
        ch !== k &&
        y + 1 < g.length &&
        x + 1 < r.length &&
        !g[y + 1][x + 1] &&
        marks.push([x + 1, y + 1]),
    ),
  );
  for (const [x, y] of marks) g[y][x] = k;
}

function outline(g, k) {
  const h = g.length;
  const w = g[0].length;
  const marks = [];
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (
        !g[y][x] &&
        [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ].some(([dx, dy]) => g[y + dy]?.[x + dx] && g[y + dy][x + dx] !== k)
      )
        marks.push([x, y]);
  for (const [x, y] of marks) g[y][x] = k;
}

/** PNG RGBA mínimo (alfa binário). */
function png(g) {
  const h = g.length;
  const w = g[0].length;
  const raw = Buffer.alloc(h * (w * 4 + 1));
  g.forEach((r, y) =>
    r.forEach((ch, x) => {
      const o = y * (w * 4 + 1) + 1 + x * 4;
      if (!ch) return;
      const hex = C[ch];
      raw[o] = parseInt(hex.slice(1, 3), 16);
      raw[o + 1] = parseInt(hex.slice(3, 5), 16);
      raw[o + 2] = parseInt(hex.slice(5, 7), 16);
      raw[o + 3] = 255;
    }),
  );
  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(td));
    return Buffer.concat([len, td, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function crc32(buf) {
  let c = ~0;
  for (const b of buf) {
    c ^= b;
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}
