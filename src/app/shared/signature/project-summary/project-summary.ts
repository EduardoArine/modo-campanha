import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { McChip, McChipTone } from '../../ui';

export interface McSummaryChip {
  label: string;
  tone: McChipTone;
}

/**
 * Project Summary: informação do projeto ao lado/abaixo do MC-CART (D-032).
 * Coleção primeiro, documentação depois: nome, descrição curta, até 2 chips e uma
 * ação futura (projeção `[mcAction]`). Os detalhes completos ficam no CRT.
 */
@Component({
  selector: 'mc-project-summary',
  imports: [McChip],
  template: `
    @if (level() === 4) {
      <h4 class="title">{{ title() }}</h4>
    } @else {
      <h3 class="title">{{ title() }}</h3>
    }
    <p class="description">{{ description() }}</p>
    @if (visibleChips().length) {
      <ul class="chips">
        @for (chip of visibleChips(); track chip.label) {
          <li>
            <mc-chip [tone]="chip.tone">{{ chip.label }}</mc-chip>
          </li>
        }
      </ul>
    }
    <div class="actions"><ng-content select="[mcAction]" /></div>
  `,
  styles: `
    @use 'mc' as *;

    :host {
      display: grid;
      gap: space(1);
      align-content: start;
    }
    .title {
      margin: 0;
      @include type(title-m);
      color: var(--mc-text);
    }
    .description {
      margin: 0;
      @include type(body-s);
      color: var(--mc-text-secondary);
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: space(2);
      margin: space(2) 0 0;
      padding: 0;
      list-style: none;
    }
    .actions:empty {
      display: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McProjectSummary {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  /** No máximo 2 chips são exibidos (regra da listagem). */
  readonly chips = input<readonly McSummaryChip[]>([]);
  readonly level = input<3 | 4>(3);

  protected readonly visibleChips = computed(() => this.chips().slice(0, 2));
}
