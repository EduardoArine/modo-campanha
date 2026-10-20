import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { CampaignLogChapter } from '../../models';

/**
 * Seletor de capítulos do Diário (D-091): faixa horizontal de cards (código, nome, prévia do mapa e
 * estado). Escolher é uma ação explícita (botão nativo); o selecionado tem contorno, texto e
 * `aria-current`, não só cor. Em telas estreitas, a faixa rola na horizontal (snap leve).
 */
@Component({
  selector: 'app-diary-chapters',
  templateUrl: './diary-chapters.html',
  styleUrl: './diary-chapters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaryChapters {
  readonly chapters = input.required<readonly CampaignLogChapter[]>();
  readonly selected = input.required<string>();
  readonly choose = output<string>();

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;

  /** "CAP. 00 — ORIGEM, 5 marcos": começa pelo texto visível (WCAG 2.5.3) e diz o que contém. */
  protected label(chapter: CampaignLogChapter): string {
    const c = this.ui().campaignLog;
    const name = chapter.name ? ` — ${this.locale.pick(chapter.name)}` : '';
    const state = chapter.entries.length
      ? `${chapter.entries.length} ${c.diary.milestones.toLowerCase()}`
      : c.diary.inConstruction.toLowerCase();
    return `${c.diary.chapterShort} ${chapter.number}${name}, ${state}`;
  }
}
