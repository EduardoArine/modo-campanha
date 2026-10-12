/** 12 fps: pixel art lê melhor em passo fixo (D-068). */
export const TICKS_PER_SECOND = 12;
export const TICK_MS = 1000 / TICKS_PER_SECOND;

/**
 * Relógio de passo fixo: converte tempo real em ticks inteiros, então a lógica do mundo nunca
 * depende da taxa de quadros da tela. Depois de uma pausa longa (aba oculta, por exemplo) não
 * tenta "alcançar" o tempo perdido: avança no máximo `maxTicks` de uma vez.
 */
export class FixedClock {
  private pending = 0;

  advance(ms: number, maxTicks = 3): number {
    this.pending += Math.max(0, ms);
    const ticks = Math.floor(this.pending / TICK_MS);
    this.pending -= ticks * TICK_MS;
    if (ticks <= maxTicks) return ticks;
    this.pending = 0;
    return maxTicks;
  }

  reset(): void {
    this.pending = 0;
  }
}
