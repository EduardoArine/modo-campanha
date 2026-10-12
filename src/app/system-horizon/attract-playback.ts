import { computed, signal } from '@angular/core';

/** Parada automática depois de 3 voltas (~21 s), no quadro-chave (D-068). */
export const AUTO_STOP_LOOPS = 3;

/**
 * Estado de reprodução do attract mode, compartilhado entre a tela e o controle de pausa.
 * Pausado (ou reduced motion) = quadro-chave estático oficial. Cada `play()` recomeça o attract
 * mode; só o primeiro da página liga o CRT (boot), os seguintes entram com interferência curta.
 */
export class AttractPlayback {
  private readonly state = signal<'playing' | 'paused'>('paused');
  private booted = false;

  readonly playing = computed(() => this.state() === 'playing');
  /** Muda a cada `play()`: a tela reinicia o attract mode. */
  readonly run = signal(0);

  play(): void {
    this.run.update((n) => n + 1);
    this.state.set('playing');
  }

  pause(): void {
    this.state.set('paused');
  }

  toggle(): void {
    if (this.playing()) this.pause();
    else this.play();
  }

  /** `true` só na primeira vez: o CRT liga uma única vez por página. */
  takeBoot(): boolean {
    if (this.booted) return false;
    this.booted = true;
    return true;
  }
}
