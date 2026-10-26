import { frameOrigin, SheetSpec } from './sprite-sheet';

/** Resolução nativa do SYSTEM HORIZON (4:3, D-068). */
export const VIEW = { width: 160, height: 120 } as const;

/**
 * Desenha em resolução nativa num buffer e apresenta no canvas visível em múltiplo inteiro
 * (pixels sempre do mesmo tamanho); o navegador só reduz suavemente o resultado para o tamanho
 * final. Sem contexto 2D (ambiente sem canvas), `create` devolve `null` e nada é desenhado.
 */
export class Renderer {
  private scale = 0;

  private constructor(
    private readonly display: HTMLCanvasElement,
    private readonly out: CanvasRenderingContext2D,
    readonly ctx: CanvasRenderingContext2D,
  ) {}

  static create(display: HTMLCanvasElement): Renderer | null {
    const buffer = display.ownerDocument.createElement('canvas');
    buffer.width = VIEW.width;
    buffer.height = VIEW.height;
    const ctx = buffer.getContext('2d');
    const out = display.getContext('2d');
    return ctx && out ? new Renderer(display, out, ctx) : null;
  }

  /** Ajusta o canvas visível ao menor múltiplo inteiro que cobre `cssWidth` × `dpr`. */
  resize(cssWidth: number, dpr: number): void {
    const scale = Math.max(1, Math.ceil((cssWidth * dpr) / VIEW.width));
    if (scale === this.scale) return;
    this.scale = scale;
    this.display.width = VIEW.width * scale;
    this.display.height = VIEW.height * scale;
  }

  rect(x: number, y: number, w: number, h: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(Math.round(x), Math.round(y), w, h);
  }

  image(source: CanvasImageSource, x: number, y: number): void {
    this.ctx.drawImage(source, Math.round(x), Math.round(y));
  }

  /**
   * Quadro de uma folha, ancorado no pivot do quadro. `flip` espelha na horizontal em torno do
   * pivot (andar para a esquerda sem arte nova, docs/23 §8); o teaser nunca espelha.
   */
  sprite(
    source: CanvasImageSource,
    spec: SheetSpec,
    frame: number,
    x: number,
    y: number,
    flip = false,
  ): void {
    const o = frameOrigin(spec, frame);
    const w = spec.frameWidth;
    const h = spec.frameHeight;
    const dy = Math.round(y - spec.pivot.y);
    if (!flip) {
      this.ctx.drawImage(source, o.x, o.y, w, h, Math.round(x - spec.pivot.x), dy, w, h);
      return;
    }
    this.mirrored(source, o.x, o.y, w, h, Math.round(x - (w - spec.pivot.x)), dy);
  }

  /**
   * Faixa vertical `[sx, sx + w)` de uma imagem, com a altura `h`, em `x, y`; `flip` espelha. Base
   * do cenário repetido do jogo (camadas espelhadas em sequência, sem emenda).
   */
  strip(
    source: CanvasImageSource,
    sx: number,
    w: number,
    h: number,
    x: number,
    y: number,
    flip = false,
  ): void {
    const dx = Math.round(x);
    const dy = Math.round(y);
    if (flip) this.mirrored(source, sx, 0, w, h, dx, dy);
    else this.ctx.drawImage(source, sx, 0, w, h, dx, dy, w, h);
  }

  private mirrored(
    source: CanvasImageSource,
    sx: number,
    sy: number,
    w: number,
    h: number,
    dx: number,
    dy: number,
  ): void {
    this.ctx.save();
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(source, sx, sy, w, h, -(dx + w), dy, w, h);
    this.ctx.restore();
  }

  present(): void {
    if (!this.scale) this.resize(VIEW.width, 1);
    this.out.imageSmoothingEnabled = false;
    this.out.drawImage(this.ctx.canvas, 0, 0, this.display.width, this.display.height);
  }
}
