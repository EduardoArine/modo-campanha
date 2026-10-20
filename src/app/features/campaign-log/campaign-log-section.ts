import { DOCUMENT, ViewportScroller } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  signal,
} from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { CAMPAIGN_LOG_CHAPTERS, CAMPAIGN_LOG_INTRO } from '../../data';
import { McAction, McIcon, McSectionHeader } from '../../shared/ui';
import { DiaryChapters } from './diary-chapters';
import { DiaryMap } from './diary-map';
import { DiaryMilestone } from './diary-milestone';
import { DiaryMilestones } from './diary-milestones';

/**
 * Diário de Campanha (D-091; capítulos D-070–D-074). Híbrido A + C: World Map Editorial do capítulo
 * ativo (cenário + rota + marcos) com painel de leitura ao lado, seletor de capítulos acima e
 * prévias dos outros capítulos abaixo. Uma única fonte de verdade: capítulo e marco escolhidos;
 * mapa, painel e seletor só refletem esse estado. Sem métricas, XP, medalhas ou cadeados.
 */
@Component({
  selector: 'app-campaign-log-section',
  imports: [
    McAction,
    McIcon,
    McSectionHeader,
    DiaryChapters,
    DiaryMap,
    DiaryMilestones,
    DiaryMilestone,
  ],
  templateUrl: './campaign-log-section.html',
  styleUrl: './campaign-log-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignLogSection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  private readonly injector = inject(Injector);
  private readonly scroller = inject(ViewportScroller);
  private readonly window = inject(DOCUMENT).defaultView;

  protected readonly chapters = CAMPAIGN_LOG_CHAPTERS;
  protected readonly intro = CAMPAIGN_LOG_INTRO;

  private readonly chapterId = signal(this.chapters[0]?.id ?? '');
  private readonly milestoneId = signal(this.chapters[0]?.entries[0]?.id ?? null);

  protected readonly chapter = computed(
    () => this.chapters.find((c) => c.id === this.chapterId()) ?? this.chapters[0],
  );
  /** Posição do marco escolhido no capítulo (o primeiro, se o id não pertencer a ele). */
  protected readonly index = computed(() =>
    Math.max(
      0,
      this.chapter().entries.findIndex((e) => e.id === this.milestoneId()),
    ),
  );
  protected readonly selectedId = computed(() => this.chapter().entries[this.index()]?.id ?? null);
  protected readonly next = computed(
    () => this.chapters[this.chapters.indexOf(this.chapter()) + 1] ?? null,
  );
  protected readonly others = computed(() => this.chapters.filter((c) => c !== this.chapter()));

  /**
   * Abre um capítulo no primeiro marco. Do seletor (acima do mapa), nada se move; das prévias de
   * baixo ou do "Próximo capítulo", leva a vista e o foco ao título do capítulo aberto.
   */
  protected selectChapter(id: string, reveal = false): void {
    const chapter = this.chapters.find((c) => c.id === id);
    if (!chapter) return;
    // O capítulo já aberto, pelo seletor: nada muda (marco e história ficam como estão).
    if (id === this.chapterId() && !reveal) return;
    this.chapterId.set(id);
    this.milestoneId.set(chapter.entries[0]?.id ?? null);
    if (!reveal) return;
    afterNextRender(
      () => {
        // Mesmo deslocamento do header que as âncoras do site (app.config.ts).
        this.scroller.scrollToAnchor('diary-chapter', {
          behavior: this.reducedMotion() ? 'auto' : 'smooth',
        });
        this.window?.document.getElementById('diary-chapter-title')?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }

  protected selectMilestone(id: string): void {
    this.milestoneId.set(id);
  }

  protected step(delta: 1 | -1): void {
    const entries = this.chapter().entries;
    const target = entries[this.index() + delta];
    if (target) this.milestoneId.set(target.id);
  }

  private reducedMotion(): boolean {
    return this.window?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }
}
