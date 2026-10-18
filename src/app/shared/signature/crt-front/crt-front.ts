import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { crtVars, MC01_CRT } from '../console/console.geometry';

/**
 * CRT frontal do MC-01 (D-077): o render oficial é a estrutura física; o conteúdo entra por
 * projeção numa camada digital independente, ajustada ao vidro (raio elíptico que acompanha a
 * curvatura). Em `standby` o vidro fica mais escuro (tela em espera, sem competir com o cartucho).
 * Presentational: quem usa decide semântica, textos e estados; `failed` avisa se o render falhar.
 */
@Component({
  selector: 'mc-crt-front',
  template: `
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
    <div class="glass"><ng-content /></div>
  `,
  styleUrl: './crt-front.scss',
  host: { '[style]': 'vars', '[class.is-standby]': 'standby()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McCrtFront {
  readonly standby = input(false);
  readonly sizes = input('100vw');
  readonly failed = output<void>();

  protected readonly crt = MC01_CRT;
  protected readonly vars = crtVars();
}
