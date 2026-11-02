import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  untracked,
  viewChild,
} from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { McAction, McIcon } from '../../shared/ui';
import type { MinigameRun } from './campaign-game';

/**
 * Cartões do minijogo sobre a tela (D-104): abertura (o que fazer, controles, Jogar ou Voltar à
 * campanha), a barra durante o jogo (sempre com a saída) e a conclusão, com a frase do marco. Em
 * DOM, fora do canvas decorativo; o foco vai para a ação principal de cada cartão.
 */
@Component({
  selector: 'app-horizon-minigame-card',
  imports: [McAction, McIcon],
  template: `
    @let r = run();
    @let mg = ui().systemHorizon.game.minigame;
    @let info = mg.games[r.game.id];
    @switch (r.phase) {
      @case ('intro') {
        <div
          class="card"
          role="group"
          aria-labelledby="horizon-minigame-title"
          aria-describedby="horizon-minigame-goal horizon-minigame-keys"
        >
          <p class="kicker">{{ mg.kicker }}</p>
          <h2 class="title" id="horizon-minigame-title">{{ info.title }}</h2>
          <p class="text" id="horizon-minigame-goal">{{ info.goal }}</p>
          <p class="keys" id="horizon-minigame-keys">{{ info.keys }}</p>
          <div class="actions">
            <button #main mcAction="primary" type="button" (click)="play.emit()">
              {{ mg.play }} <mc-icon name="play" />
            </button>
            <button mcAction="text" type="button" (click)="leave.emit()">{{ mg.leave }}</button>
          </div>
        </div>
      }
      @case ('play') {
        <div class="bar">
          <p class="kicker">{{ info.title }}</p>
          <button mcAction="text" type="button" (click)="leave.emit()">{{ mg.leave }}</button>
        </div>
      }
      @case ('done') {
        <div class="card" role="group" aria-labelledby="horizon-minigame-title">
          <p class="kicker">{{ mg.done }}</p>
          <h2 class="title" id="horizon-minigame-title">{{ info.title }}</h2>
          <p class="text">{{ balloon() }}</p>
          <div class="actions">
            <button #main mcAction="primary" type="button" (click)="leave.emit()">
              {{ mg.continue }} <mc-icon name="chevron-right" />
            </button>
          </div>
        </div>
      }
    }
  `,
  styleUrl: './horizon-minigame-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizonMinigameCard {
  readonly run = input.required<MinigameRun>();
  /** A frase do marco (o mesmo balão da campanha), mostrada na conclusão. */
  readonly balloon = input('');
  readonly play = output<void>();
  readonly leave = output<void>();

  protected readonly ui = inject(LocaleService).ui;
  // `#main` está num botão com `mcAction` (um componente): ler o elemento, não a instância.
  private readonly main = viewChild<string, ElementRef<HTMLButtonElement>>('main', {
    read: ElementRef,
  });
  private readonly injector = inject(Injector);
  private readonly phase = computed(() => this.run().phase);

  constructor() {
    // Abertura e conclusão: o foco vai para a ação principal.
    effect(() => {
      if (this.phase() === 'play') return;
      untracked(() =>
        afterNextRender(() => this.main()?.nativeElement.focus({ preventScroll: true }), {
          injector: this.injector,
        }),
      );
    });
  }
}
