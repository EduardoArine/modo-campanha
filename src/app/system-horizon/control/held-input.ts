/**
 * Direção mantida pelo visitante no jogo (D-103): teclas e botões de toque pressionados ao mesmo
 * tempo. Vale o último pressionado ainda seguro (soltar → volta ao anterior; nada → parado). Não
 * conhece o DOM: a página informa `press`/`release` com uma origem ("ArrowLeft", "touch-left"...).
 */
export class HeldInput {
  private held: { source: string; dir: -1 | 1 }[] = [];

  press(source: string, dir: -1 | 1): void {
    this.held = [...this.held.filter((h) => h.source !== source), { source, dir }];
  }

  release(source: string): void {
    this.held = this.held.filter((h) => h.source !== source);
  }

  clear(): void {
    this.held = [];
  }

  get dir(): -1 | 0 | 1 {
    return this.held.length ? this.held[this.held.length - 1].dir : 0;
  }
}
