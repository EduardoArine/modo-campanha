/**
 * Montanhas em pixel do painel "Sobre a jornada" (D-082, como no mockup): decorativas
 * (`aria-hidden`). Três picos numa grade de 40 × 16 células; a crista acende inteira e o interior,
 * em pontos esparsos que rareiam para baixo e para a esquerda. Determinístico (sem aleatório).
 * Os pontos saem agrupados por nível de opacidade em poucos `<path>` (DOM leve).
 */
interface PixelDot {
  x: number;
  y: number;
  /** Opacidade da célula (0–1). */
  o: number;
}

/** Um nível de opacidade: todos os pontos dele num só path. */
export interface PixelLayer {
  opacity: number;
  d: string;
}

const COLS = 40;
const ROWS = 16;
const PEAKS = [
  { x: 17, h: 8 },
  { x: 27, h: 15 },
  { x: 35, h: 11 },
] as const;

/** Hash inteiro estável por célula (0–1). */
const noise = (x: number, y: number) => ((((x * 73856093) ^ (y * 19349663)) >>> 0) % 1000) / 1000;

function ridgeHeight(x: number): number {
  return Math.max(0, ...PEAKS.map((p) => p.h - Math.abs(x - p.x) * 1.15));
}

function build(): readonly PixelDot[] {
  const dots: PixelDot[] = [];
  for (let x = 0; x < COLS; x++) {
    const top = ROWS - Math.round(ridgeHeight(x));
    if (top >= ROWS) continue;
    const fade = Math.min(1, x / 14);
    for (let y = top; y < ROWS; y++) {
      const depth = (y - top) / ROWS;
      if (y - top < 2) dots.push({ x, y, o: (y === top ? 1 : 0.8) * fade });
      else if (noise(x, y) > 0.2 + depth * 0.7) dots.push({ x, y, o: (0.7 - depth * 0.4) * fade });
    }
  }
  return dots.filter((d) => d.o > 0.08);
}

/** Opacidades arredondadas a 0,2; cada ponto é um quadrado de 0,7 célula. */
function layers(dots: readonly PixelDot[]): readonly PixelLayer[] {
  const byLevel = new Map<number, string[]>();
  for (const { x, y, o } of dots) {
    const level = Math.max(0.2, Math.round(o * 5) / 5);
    const d = `M${x + 0.15} ${y + 0.15}h0.7v0.7h-0.7z`;
    byLevel.set(level, [...(byLevel.get(level) ?? []), d]);
  }
  return [...byLevel].map(([opacity, ds]) => ({ opacity, d: ds.join('') }));
}

export const MOUNTAINS = { cols: COLS, rows: ROWS, layers: layers(build()) } as const;
