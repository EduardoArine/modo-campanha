import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { consoleVars, MC01_CONSOLE, McConsolePose } from './console.geometry';

/** Render do cartucho em escala do console (699 × 500), com derivados por largura. */
export interface McConsoleCartridge {
  src: string;
  srcset?: string;
  width: number;
  height: number;
}

/**
 * MC-01 físico (D-076/D-077): o console montado em três camadas oficiais num único sistema de
 * coordenadas (traseira < cartucho < frente), escalando juntas. O cartucho se move só por
 * `transform` entre as poses `out` (fora, acima do slot) e `seated` (encaixado; a frente esconde
 * a base). Presentational: não conhece projeto, estado nem textos; decorativo (`aria-hidden`).
 * `failed` avisa quando alguma camada não carrega (quem usa decide o fallback).
 */
@Component({
  selector: 'mc-console',
  template: `
    <img
      class="layer back"
      [src]="back.src"
      [srcset]="back.srcset"
      [sizes]="sizes()"
      [width]="back.width"
      [height]="back.height"
      alt=""
      loading="lazy"
      decoding="async"
      (error)="failed.emit()"
    />
    <span class="layer shadow"></span>
    @if (cartridge(); as cart) {
      <img
        class="layer cart"
        [src]="cart.src"
        [attr.srcset]="cart.srcset ?? null"
        [sizes]="cartSizes()"
        [width]="cart.width"
        [height]="cart.height"
        alt=""
        loading="lazy"
        decoding="async"
        (error)="failed.emit()"
      />
    }
    <img
      class="layer front"
      [src]="front.src"
      [srcset]="front.srcset"
      [sizes]="sizes()"
      [width]="front.width"
      [height]="front.height"
      alt=""
      loading="lazy"
      decoding="async"
      (error)="failed.emit()"
    />
  `,
  styleUrl: './console.scss',
  host: {
    'aria-hidden': 'true',
    '[style]': 'vars',
    '[attr.data-pose]': 'pose()',
    '[attr.data-motion]': 'motion()',
    '[class.is-lifted]': 'lifted()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McConsole {
  readonly cartridge = input<McConsoleCartridge | null>(null);
  readonly pose = input<McConsolePose>('out');
  /** Movimento em curso: define a duração (inserir 620 ms, ejetar 600 ms). */
  readonly motion = input<'none' | 'insert' | 'eject'>('none');
  /** Intenção de inserir (hover/foco na ação): o cartucho se aproxima do slot. */
  readonly lifted = input(false);
  /** Largura de exibição do console, para escolher o derivado certo. */
  readonly sizes = input('100vw');
  /** Largura de exibição do cartucho (699/1254 da do console). */
  readonly cartSizes = input('56vw');
  readonly failed = output<void>();

  protected readonly back = MC01_CONSOLE.back;
  protected readonly front = MC01_CONSOLE.front;
  protected readonly vars = consoleVars();
}
