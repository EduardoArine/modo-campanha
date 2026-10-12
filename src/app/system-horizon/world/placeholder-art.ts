import { frameOrigin, LayerSpec, SheetSpec } from '../engine/sprite-sheet';
import { Art, LAYERS, LayerId, SheetName, SHEETS } from './assets';
import { Palette } from './palette';
import { TRAIL, trailY } from './trail';

/**
 * PLACEHOLDERS TÉCNICOS (D-068): formas simples desenhadas em código, com a mesma geometria da
 * especificação (tamanho, quantidade de quadros, pivot), só para validar engine, timing, escala e
 * estados. Não são a arte do SYSTEM HORIZON; serão substituídos pelos PNGs de `ASSET_BASE`.
 */
export function createPlaceholderArt(doc: Document, p: Palette): Art {
  const sheets = {} as Record<SheetName, HTMLCanvasElement>;
  for (const name of Object.keys(SHEETS) as SheetName[]) {
    const spec: SheetSpec = SHEETS[name];
    sheets[name] = paintSheet(doc, spec, (g, frame) => SHEET_PAINTERS[name](g, p, frame, spec));
  }
  const layers = {} as Record<LayerId, HTMLCanvasElement>;
  for (const layer of LAYERS) {
    layers[layer.id] = paint(doc, layer.width, layer.height, (g) =>
      LAYER_PAINTERS[layer.id](g, p, layer),
    );
  }
  return { sheets, layers };
}

type Ctx = CanvasRenderingContext2D;
type SheetPainter = (g: Ctx, p: Palette, frame: number, spec: SheetSpec) => void;

function paint(doc: Document, w: number, h: number, draw: (g: Ctx) => void): HTMLCanvasElement {
  const canvas = doc.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext('2d');
  if (g) draw(g);
  return canvas;
}

function paintSheet(doc: Document, spec: SheetSpec, draw: (g: Ctx, frame: number) => void) {
  const rows = Math.ceil(spec.frames / spec.columns);
  return paint(doc, spec.columns * spec.frameWidth, rows * spec.frameHeight, (g) => {
    for (let f = 0; f < spec.frames; f++) {
      const o = frameOrigin(spec, f);
      g.save();
      g.translate(o.x, o.y);
      draw(g, f);
      g.restore();
    }
  });
}

function px(g: Ctx, color: string, x: number, y: number, w = 1, h = 1): void {
  g.fillStyle = color;
  g.fillRect(x, y, w, h);
}

/** Bitmap 8 × 8 ('#' = pixel). */
function bitmap(g: Ctx, color: string, rows: readonly string[], ox = 0, oy = 0): void {
  rows.forEach((row, y) => [...row].forEach((c, x) => c === '#' && px(g, color, ox + x, oy + y)));
}

const ICONS: readonly (readonly string[])[] = [
  // BUILD: </>
  ['........', '....#...', '.#..#.#.', '#..#...#', '.#.#..#.', '..#.....', '........', '........'],
  // PRODUCT: card de interface
  ['........', '.######.', '.#....#.', '.#.##.#.', '.#....#.', '.######.', '........', '........'],
  // AI: nós conectados
  ['........', '...##...', '...##...', '..#..#..', '.#....#.', '##....##', '##....##', '........'],
  // GAME DNA: d-pad
  ['........', '...##...', '...##...', '.######.', '.######.', '...##...', '...##...', '........'],
];

/** Jogador 10 × 14 no quadro 16 × 16 (pés no pivot 8,15): cabelo escuro, óculos, roupa escura. */
function player(g: Ctx, p: Palette, legs: readonly [number, number], lookUp = false): void {
  px(g, p.night, 5, 1, 6, 3); // cabelo
  px(g, p.creamDim, 6, 3, 4, 4); // rosto
  px(g, p.night, 5, 4, 6, 1); // óculos (armação)
  px(g, p.teal, 6, 4, 1, 1);
  px(g, p.teal, 9, 4, 1, 1);
  if (lookUp) px(g, p.night, 5, 2, 6, 1);
  px(g, p.shell, 4, 7, 8, 5); // tronco
  px(g, p.dust, 4, 7, 1, 5);
  px(g, p.ground, 5 + legs[0], 12, 2, 4); // pernas
  px(g, p.ground, 9 + legs[1], 12, 2, 4);
}

const WALK: readonly (readonly [number, number])[] = [
  [-1, 1],
  [0, 0],
  [1, -1],
  [0, 0],
];

const SHEET_PAINTERS: Record<SheetName, SheetPainter> = {
  playerIdle: (g, p, f) => {
    player(g, p, [0, 0]);
    if (f) px(g, p.dust, 4, 8, 8, 1); // respiração: 1 px
  },
  playerWalk: (g, p, f) => player(g, p, WALK[f]),
  playerLook: (g, p, f) => {
    player(g, p, [0, 0], true);
    if (f) px(g, p.dust, 4, 8, 8, 1);
  },
  items: (g, p, f) => {
    const colors = [p.orange, p.cream, p.teal, p.gold];
    const row = Math.floor(f / 2);
    bitmap(g, colors[row], ICONS[row]);
    if (f % 2) px(g, p.cream, 7, 0);
  },
  collectFx: (g, p, f) => {
    const arm = [2, 4, 5][f];
    const color = f < 2 ? p.cream : p.orangeLight;
    if (f < 2) {
      px(g, color, 6 - arm, 6, arm * 2, 1);
      px(g, color, 6, 6 - arm, 1, arm * 2);
    } else {
      for (const [x, y] of [
        [1, 6],
        [11, 6],
        [6, 1],
        [6, 11],
        [2, 2],
        [10, 2],
        [2, 10],
        [10, 10],
      ])
        px(g, color, x, y);
    }
  },
  hudSlot: (g, p, f) => {
    g.strokeStyle = f ? p.orange : p.dust;
    g.lineWidth = 1;
    g.strokeRect(0.5, 0.5, 9, 9);
  },
  cartMini: (g, p) => cart(g, p, 12, 15, 5),
  cartForm: (g, p, f) => cart(g, p, 24, 30, f),
};

/** MC-CART em formação: 0 contorno · 1 carcaça · 2 rótulo · 3 dois quadrados · 4 quatro · 5 brilho. */
function cart(g: Ctx, p: Palette, w: number, h: number, step: number): void {
  const u = w / 12;
  if (step === 0) {
    g.strokeStyle = p.dust;
    g.strokeRect(0.5, 0.5 + u, w - 1, h - 1 - u);
    return;
  }
  px(g, p.shell, 0, u, w, h - u);
  px(g, p.orangeDeep, 2 * u, 0, w - 4 * u, u);
  if (step < 2) return;
  px(g, p.petrol, 2 * u, 3 * u, w - 4 * u, h - 7 * u);
  const s = Math.max(1, Math.round(1.5 * u));
  const cx = w / 2;
  const cy = 3 * u + (h - 7 * u) / 2;
  const squares = [
    [cx - s - 0.5 * u, cy - s - 0.5 * u],
    [cx + 0.5 * u, cy - s - 0.5 * u],
    [cx - s - 0.5 * u, cy + 0.5 * u],
    [cx + 0.5 * u, cy + 0.5 * u],
  ];
  const lit = step >= 4 ? 4 : step === 3 ? 2 : 0;
  squares.forEach(([x, y], i) =>
    px(g, i < lit ? p.orange : p.shade, Math.round(x), Math.round(y), s, s),
  );
  if (step >= 5) px(g, p.cream, w - 3 * u, 4 * u, u, u);
}

type LayerPainter = (g: Ctx, p: Palette, layer: LayerSpec) => void;

const LAYER_PAINTERS: Record<LayerId, LayerPainter> = {
  // Céu ao pôr do sol + sol + lago (opaco, fixo).
  sky: (g, p) => {
    const bands: readonly [string, number][] = [
      [p.petrol, 0],
      [p.shell, 22],
      [p.orangeDeep, 40],
      [p.orange, 56],
      [p.orangeLight, 66],
      [p.petrol, 72],
    ];
    bands.forEach(([color, y], i) => px(g, color, 0, y, 160, (bands[i + 1]?.[1] ?? 120) - y));
    for (let dy = -8; dy <= 8; dy++) {
      const half = Math.round(Math.sqrt(64 - dy * dy));
      if (52 + dy < 72) px(g, p.gold, 112 - half, 52 + dy, half * 2, 1);
    }
    for (let y = 74; y < 120; y += 3)
      px(g, p.orangeDeep, 106 + ((y >> 1) % 3), y, 10 - ((y - 74) >> 3), 1);
  },
  // Montanhas distantes (parallax 0,25).
  mountains: (g, p, l) => {
    for (let x = 0; x < l.width; x++) {
      const peak =
        54 + Math.round(6 * Math.abs(Math.sin(x / 23)) + 6 * Math.abs(Math.sin(x / 9 + 1)));
      px(g, p.shade, x, peak, 1, 72 - peak);
    }
  },
  // Bosque de pinheiros (parallax 0,5).
  trees: (g, p, l) => {
    for (let base = 4; base < l.width; base += 13) {
      const h = 14 + ((base * 7) % 9);
      for (let y = 0; y < h; y++)
        px(g, p.ground, base - Math.floor(y / 3), 92 - h + y, Math.floor(y / 3) * 2 + 1, 1);
    }
  },
  // Chão com a trilha (parallax 1): segue exatamente o perfil TRAIL.
  ground: (g, p, l) => {
    for (let x = 0; x < l.width; x++) {
      const y = trailY(x);
      px(g, p.night, x, y, 1, 120 - y);
      px(g, p.orangeDeep, x, y, 1, 2);
    }
    const lookout = TRAIL[TRAIL.length - 2][0];
    px(g, p.dust, lookout + 4, trailY(lookout) - 1, 1, 1);
  },
};
