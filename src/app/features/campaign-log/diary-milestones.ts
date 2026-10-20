import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { CampaignLogChapterEntry } from '../../models';
import { milestoneLabel, milestoneNumber } from './diary-labels';

/**
 * Lista de marcos do capítulo (D-091), só no mobile (< 768): a mesma escolha do mapa, legível e
 * sem hover, enquanto o mapa vira um mini mapa com pontos.
 */
@Component({
  selector: 'app-diary-milestones',
  template: `
    <ol class="list" role="list" [attr.aria-label]="ui().campaignLog.diary.list">
      @for (entry of entries(); track entry.id; let i = $index) {
        @let isSelected = entry.id === selected();
        <li>
          <button
            type="button"
            class="item"
            aria-controls="diary-milestone"
            [attr.aria-label]="label(i)"
            [attr.aria-current]="isSelected ? 'step' : null"
            [class.is-selected]="isSelected"
            (click)="choose.emit(entry.id)"
          >
            <span class="num" aria-hidden="true">{{ number(i) }}</span>
            <span aria-hidden="true">{{ locale.pick(entry.title) }}</span>
          </button>
        </li>
      }
    </ol>
  `,
  styleUrl: './diary-milestones.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaryMilestones {
  readonly entries = input.required<readonly CampaignLogChapterEntry[]>();
  readonly selected = input<string | null>(null);
  readonly choose = output<string>();

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly number = milestoneNumber;

  protected label(index: number): string {
    return milestoneLabel(this.locale, this.entries(), index);
  }
}
