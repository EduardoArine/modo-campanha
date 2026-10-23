import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { CampaignLogWhen } from '../../models';

/**
 * Quando aconteceu um marco, como foi informado (D-070–D-074): ano, intervalo, "desde", aproximado
 * ou época em texto. Nunca um ano não confirmado.
 */
@Component({
  selector: 'app-campaign-when',
  template: `
    @let w = when();
    @if ('year' in w) {
      <time [attr.datetime]="w.year">{{ w.year }}</time>
    } @else if ('since' in w) {
      {{ ui().campaignLog.since }} <time [attr.datetime]="w.since">{{ w.since }}</time>
    } @else if ('span' in w) {
      <time [attr.datetime]="w.span.start">{{ w.span.start }}</time> —
      <time [attr.datetime]="w.span.end">{{ w.span.end }}</time>
    } @else if ('approx' in w) {
      @let approx = w.approx;
      <!-- "c." sempre minúsculo, mesmo em rótulo em caixa alta (D-098). -->
      <span class="approx">{{ ui().campaignLog.approx }}</span
      >{{ ' ' }}
      @if (typeof approx === 'number') {
        <time [attr.datetime]="approx">{{ approx }}</time>
      } @else {
        <!-- Dois anos possíveis, sem escolher um: "c. 2020/2021". -->
        {{ approx[0] }}/{{ approx[1] }}
      }
    } @else {
      {{ locale.pick(w.era) }}
    }
  `,
  styles: '.approx { text-transform: none; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignWhen {
  readonly when = input.required<CampaignLogWhen>();

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
}
