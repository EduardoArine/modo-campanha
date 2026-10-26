// SYSTEM HORIZON interativo — fonte editável dos marcadores do jogo (D-103, docs/23 §18.6).
// Pixel art desenhada à mão em grade, só com a paleta oficial (sh-palette.gpl), no mesmo processo dos
// pickups (build-pickups.mjs). Substituível por arte final com o mesmo contrato: folha
// sh-markers.png, quadros 12 × 24, pivot 6,23 (pés da placa no chão), na ordem abaixo.
//
// Quadros: 0 placa (marco) · 1 placa lida (✓) · 2 checkpoint (bandeira baixa) · 3 checkpoint ativo
// (bandeira alta) · 4 forja · 5 forja acesa · 6 selo "não lido" (◆, desenhado acima da parada) ·
// 7 MC-001 no pedestal · 8 MC-CART no pedestal (rótulo neutro: a arte real aparece no painel).
//
// Uso (na raiz do repositório): node design/source/system-horizon/pixel/build-campaign.mjs
import fs from 'node:fs';
import zlib from 'node:zlib';

const OUT = 'public/assets/system-horizon/';

// Paleta oficial (sh-palette.gpl). Letra → cor (as mesmas letras de build-pickups.mjs).
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

const W = 12;
const H = 24;

// Placa do marco: tabuleta clara com linhas de texto, poste e base de pedra.
const PLATE = [
  '..KKKKKKKK..',
  '.KccccccccK.',
  '.KcttttttcK.',
  '.KccccccccK.',
  '.KcttttcccK.',
  '.KccccccccK.',
  '.KggggggggK.',
  '..KKKKKKKK..',
  '....KgGK....',
  '....KgGK....',
  '....KgGK....',
  '....KgGK....',
  '...KKgGKK...',
  '..KGGGGGGK..',
];

// Placa lida: tabuleta bronze com um ✓ claro (forma diferente, não só cor).
const PLATE_READ = [
  '..KKKKKKKK..',
  '.KttttttttK.',
  '.KtttttttcK.',
  '.KttttttctK.',
  '.KtcttttctK.',
  '.KttcttcttK.',
  '.KtttcctttK.',
  '..KKKKKKKK..',
  ...PLATE.slice(8),
];

const POLE = Array(10).fill('....KcK.....');
const FLAG_BASE = ['...KGGGK....', '..KGGGGGK...'];

// Checkpoint: bandeira enrolada no mastro.
const FLAG_DOWN = [
  '....KYK.....',
  '....KcKKK...',
  '....KcKtK...',
  '....KcKtK...',
  '....KcKtK...',
  '....KcKtK...',
  '....KcKKK...',
  ...POLE,
  ...FLAG_BASE,
];

// Checkpoint ativo: bandeira laranja aberta no alto do mastro.
const FLAG_UP = [
  '....KYK.....',
  '....KcKKKKK.',
  '....KcKOOOOK',
  '....KcKOYYOK',
  '....KcKOOOOK',
  '....KcKRRRK.',
  '....KcKKKK..',
  ...POLE,
  ...FLAG_BASE,
];

// Forja: altar com os quatro encaixes do glifo (quatro quadrados), apagados.
const FORGE = [
  '.KKKKKKKKKK.',
  'KccccccccccK',
  'KttttttttttK',
  '.KggggggggK.',
  '.KgbbggbbgK.',
  '.KgbbggbbgK.',
  '.KggggggggK.',
  '.KgbbggbbgK.',
  '.KgbbggbbgK.',
  'KKGGGGGGGGKK',
];
const FORGE_LIT = FORGE.map((row, y) =>
  y === 1 ? row.replace(/c/g, 'Y') : row.replace(/b/g, 'O'),
);

// Selo "não lido": losango dourado, desenhado acima da parada.
const BADGE = ['.....KK.....', '....KYYK....', '...KYOOYK...', '....KYYK....', '.....KK.....'];

// Pedestal dos cartuchos.
const PLINTH = [
  '..KKKKKKKK..',
  '.KccccccccK.',
  '.KttttttttK.',
  '..KggggggK..',
  '..KggggggK..',
  '.KKGGGGGGKK.',
];

// MC-CART mini (o mesmo desenho de sh-cart-mini.png, 12 × 9).
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
// Rótulo neutro para os demais cartuchos (a ilustração real de cada um está no painel de leitura).
const MINI_NEUTRAL = MINI.map((row, y) =>
  y === 3 ? 'KOKccccccKOK' : y === 4 ? 'KOKttttttKOK' : row,
);

/** Quadro 12 × 24 com as linhas encostadas embaixo (pés no pivot 6,23). */
function bottom(rows) {
  const g = grid(W, H);
  rows.forEach((r, i) => {
    if (r.length !== W) throw new Error(`linha com ${r.length} px: ${r}`);
    [...r].forEach((ch, x) => ch !== '.' && (g[H - rows.length + i][x] = ch));
  });
  return g;
}

function top(rows) {
  const g = grid(W, H);
  rows.forEach((r, y) => [...r].forEach((ch, x) => ch !== '.' && (g[y][x] = ch)));
  return g;
}

const FRAMES = [
  bottom(PLATE),
  bottom(PLATE_READ),
  bottom(FLAG_DOWN),
  bottom(FLAG_UP),
  bottom(FORGE),
  bottom(FORGE_LIT),
  top(BADGE),
  bottom([...MINI, ...PLINTH]),
  bottom([...MINI_NEUTRAL, ...PLINTH]),
];

const sheet = grid(FRAMES.length * W, H);
FRAMES.forEach((f, i) => f.forEach((r, y) => r.forEach((ch, x) => ch && (sheet[y][i * W + x] = ch))));
fs.writeFileSync(OUT + 'sh-markers.png', png(sheet));
console.log('sh-markers.png', `${FRAMES.length * W}×${H}`);

// ---------------------------------------------------------------------------------------------
function grid(w, h) {
  return Array.from({ length: h }, () => Array(w).fill(null));
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
