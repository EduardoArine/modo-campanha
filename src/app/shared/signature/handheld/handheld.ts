import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import type { McConsoleCartridge } from '../console/console';
import { handheldVars, MC_HANDHELD, McHandheldPose } from './handheld.geometry';

/**
 * Portátil (D-095): no celular, substitui o MC-01 + CRT. O cartucho entra por cima, ATRÁS do corpo
 * (cartucho < corpo < tela), movendo-se só por `transform` entre `out` e `seated`, com as mesmas
 * durações do MC-01. O conteúdo é projetado na tela, sobre o visor do render; em `standby`, a tela
 * fica transparente e o visor apagado da arte aparece. Presentational: quem usa decide semântica,
 * textos e estados; `failed` avisa se alguma imagem não carregar.
 */
@Component({
  selector: 'mc-handheld',
  template: `
    @if (cartridge(); as cart) {
      <img
        class="cart"
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
      class="body"
      [src]="body.src"
      [srcset]="body.srcset"
      [sizes]="sizes()"
      [width]="body.width"
      [height]="body.height"
      alt=""
      loading="lazy"
      decoding="async"
      (error)="failed.emit()"
    />
    <div class="screen"><ng-content /></div>
  `,
  styleUrl: './handheld.scss',
  host: {
    '[style]': 'vars',
    '[attr.data-pose]': 'pose()',
    '[attr.data-motion]': 'motion()',
    '[class.is-lifted]': 'lifted()',
    '[class.is-standby]': 'standby()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McHandheld {
  readonly cartridge = input<McConsoleCartridge | null>(null);
  readonly pose = input<McHandheldPose>('out');
  /** Movimento em curso: define a duração (inserir 620 ms, ejetar 600 ms). */
  readonly motion = input<'none' | 'insert' | 'eject'>('none');
  /** Intenção de inserir (hover/foco na ação): o cartucho se aproxima do encaixe. */
  readonly lifted = input(false);
  /** Tela apagada: mostra o visor da arte (sem camada digital). */
  readonly standby = input(false);
  readonly sizes = input('100vw');
  readonly cartSizes = input('72vw');
  readonly failed = output<void>();

  protected readonly body = MC_HANDHELD.body;
  protected readonly vars = handheldVars();
}
