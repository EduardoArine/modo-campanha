import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { crtVars, MC01_CRT } from '../console/console.geometry';

/**
 * CRT frontal do MC-01 (D-077): o render oficial é a estrutura física; o conteúdo entra numa camada
 * digital independente ATRÁS do render, visto pelo tubo transparente (D-080): o aro recorta a
 * curvatura. Em `standby`, TV desligada com um reflexo estático e discreto no vidro (D-081). O
 * filtro de tubo (D-095) fica por cima do conteúdo e não captura o ponteiro.
 * Presentational: quem usa decide semântica, textos e estados; `failed` avisa se o render falhar.
 */
@Component({
  selector: 'mc-crt-front',
  template: `
    <div class="glass">
      <ng-content />
      @if (filter()) {
        <span class="filter"></span>
      }
    </div>
    <img
      class="body"
      [src]="crt.src"
      [srcset]="crt.srcset"
      [sizes]="sizes()"
      [width]="crt.width"
      [height]="crt.height"
      alt=""
      loading="lazy"
      decoding="async"
      (error)="failed.emit()"
    />
  `,
  styleUrl: './crt-front.scss',
  host: { '[style]': 'vars', '[class.is-standby]': 'standby()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McCrtFront {
  readonly standby = input(false);
  /** Filtro de tubo (D-095): scanlines, vinheta e reflexo leves por cima do conteúdo. */
  readonly filter = input(true);
  readonly sizes = input('100vw');
  readonly failed = output<void>();

  protected readonly crt = MC01_CRT;
  protected readonly vars = crtVars();
}
