/** Folha de sprites: quadros do mesmo tamanho em grade, lidos da esquerda para a direita. */
export interface SheetSpec {
  /** Arquivo final em `public/assets/system-horizon/` (docs/22 §4). */
  readonly file: string;
  readonly frameWidth: number;
  readonly frameHeight: number;
  readonly frames: number;
  readonly columns: number;
  /** Ponto de ancoragem dentro do quadro (o que `x, y` do mundo representa). */
  readonly pivot: { readonly x: number; readonly y: number };
}

/** Camada de cenário com parallax (0 = fixa na tela, 1 = anda com o mundo). */
export interface LayerSpec {
  readonly id: string;
  readonly file: string;
  readonly width: number;
  readonly height: number;
  readonly parallax: number;
}

export function frameOrigin(spec: SheetSpec, frame: number): { x: number; y: number } {
  const index = ((frame % spec.frames) + spec.frames) % spec.frames;
  return {
    x: (index % spec.columns) * spec.frameWidth,
    y: Math.floor(index / spec.columns) * spec.frameHeight,
  };
}
