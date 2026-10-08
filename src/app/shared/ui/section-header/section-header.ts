import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Header de seção: `■ TÍTULO ──────── ● STATUS`, com código e subtítulo opcionais.
 * Só `heading` é obrigatório. Status entra por projeção: `<mc-status>` dentro do componente.
 * `headingId` liga a `<section aria-labelledby>` ao título.
 */
@Component({
  selector: 'mc-section-header',
  template: `
    @if (code()) {
      <p class="code">{{ code() }}</p>
    }
    <div class="row">
      @if (level() === 3) {
        <h3 class="heading" [attr.id]="headingId() || null">{{ heading() }}</h3>
      } @else {
        <h2 class="heading" [attr.id]="headingId() || null">{{ heading() }}</h2>
      }
      @if (divider()) {
        <span class="rule" aria-hidden="true"></span>
      }
      <span class="status"><ng-content select="mc-status" /></span>
    </div>
    @if (subtitle()) {
      <p class="subtitle">{{ subtitle() }}</p>
    }
  `,
  styleUrl: './section-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McSectionHeader {
  readonly heading = input.required<string>();
  readonly headingId = input<string>();
  readonly level = input<2 | 3>(2);
  /** Código de sistema acima do título (ex.: `MC-01`). */
  readonly code = input<string>();
  readonly subtitle = input<string>();
  readonly divider = input(true, { transform: booleanAttribute });
}
