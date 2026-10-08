import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Base visual da família CRT (D-037): shell → bezel → vidro → viewport → faixa inferior.
 * Presentational e ignorante de contexto: não conhece Project, Hero, estados de tela nem
 * textos. O conteúdo da tela entra por projeção; quem usa decide a semântica
 * (ex.: `mc-crt-project-viewer` adiciona região rotulada; o Hero usa só como cena).
 * Efeitos decorativos ficam atrás do conteúdo e somem em containers estreitos.
 */
@Component({
  selector: 'mc-crt-frame',
  template: `
    <div class="body">
      <div class="bezel">
        <div class="screen">
          <span class="fx" aria-hidden="true"></span>
          <div class="viewport"><ng-content /></div>
        </div>
      </div>
      <div class="base">
        @if (label()) {
          <span class="id">{{ label() }}</span>
        }
        <span class="vents" aria-hidden="true"></span>
        <span class="controls" aria-hidden="true">
          <span class="button"></span>
          <span class="led"></span>
        </span>
      </div>
    </div>
  `,
  styleUrl: './crt-frame.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McCrtFrame {
  /** Identificação impressa na faixa inferior (ex.: `MC-01`), já traduzida por quem usa. */
  readonly label = input<string>();
}
