import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  output,
} from '@angular/core';

import { Localized, LocaleService } from '../../core/i18n';
import { CampaignLogChapter } from '../../models';
import { McAction, McIcon } from '../../shared/ui';
import { CampaignWhen } from './campaign-when';

/**
 * Painel editorial do marco escolhido (D-091): o lugar confortável para LER. Número, título,
 * imagem editorial (3:2; placeholder até a arte), resumo, época real, codinome e a
 * história completa sob demanda, com as fotos reais e as fontes públicas. Navegação anterior /
 * próximo; no último marco, o fechamento do capítulo e o próximo capítulo. Sem status inventado.
 */
@Component({
  selector: 'app-diary-milestone',
  imports: [McAction, McIcon, CampaignWhen],
  templateUrl: './diary-milestone.html',
  styleUrl: './diary-milestone.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaryMilestone {
  readonly chapter = input.required<CampaignLogChapter>();
  readonly index = input.required<number>();
  readonly next = input<CampaignLogChapter | null>(null);
  readonly step = output<1 | -1>();
  readonly openChapter = output<string>();

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;

  protected readonly entry = computed(() => this.chapter().entries[this.index()] ?? null);
  protected readonly total = computed(() => this.chapter().entries.length);
  protected readonly isLast = computed(() => this.index() === this.total() - 1);
  /** O resumo é a primeira frase da história (regra do Campaign Log), ou um texto próprio? */
  protected readonly summaryInStory = computed(() => {
    const e = this.entry();
    return !!e && (this.locale.pick(e.story)[0] ?? '').startsWith(this.locale.pick(e.summary));
  });
  /** História aberta; volta a fechar quando o marco muda. */
  protected readonly expanded = linkedSignal(() => {
    this.entry();
    return false;
  });

  /** Codinome igual ao título (ignorando caixa): não repete no rótulo. */
  protected sameAsTitle(code: Localized, title: Localized): boolean {
    return (
      this.locale.pick(code).toLocaleLowerCase() === this.locale.pick(title).toLocaleLowerCase()
    );
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  /** Próximo marco ou, no último, o próximo capítulo (sem próximo: botão desabilitado). */
  protected goNext(): void {
    if (!this.isLast()) this.step.emit(1);
    else if (this.next()) this.openChapter.emit(this.next()!.id);
  }

  /** "Próximo capítulo: CAPÍTULO 01 — DO CONTROLE AO CÓDIGO". */
  protected nextLabel(chapter: CampaignLogChapter): string {
    const c = this.ui().campaignLog;
    const name = chapter.name ? ` — ${this.locale.pick(chapter.name)}` : '';
    return `${c.diary.nextChapter}: ${c.chapter} ${chapter.number}${name}`;
  }
}
