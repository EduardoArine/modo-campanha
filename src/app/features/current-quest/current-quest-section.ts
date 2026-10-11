import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { CURRENT_QUEST } from '../../data';
import { CurrentQuest } from '../../models';
import { McSectionHeader, McStatus } from '../../shared/ui';

/**
 * Current Main Quest (Home Slice 06, docs/18). A — Quest Briefing: composição aberta em duas
 * colunas (briefing + frentes), sem painel, objeto físico, métricas ou progresso. IN PROGRESS é
 * o uso documentado de `mc-status`. A Home só renderiza a seção quando há conteúdo publicado.
 */
@Component({
  selector: 'app-current-quest-section',
  imports: [McSectionHeader, McStatus],
  templateUrl: './current-quest-section.html',
  styleUrl: './current-quest-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentQuestSection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  // A HomePage só cria a seção quando CURRENT_QUEST existe.
  protected readonly quest = CURRENT_QUEST as CurrentQuest;
}
