import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { ACHIEVEMENTS } from '../../data';
import { McSectionHeader } from '../../shared/ui';

/**
 * Achievements (Home Slice 04-B, D-051). Achievement Record Panel (A + B): um único painel
 * digital dividido por réguas finas, uma célula por evidência. Sem badges, medalhas, raridade,
 * sombra, objeto físico ou interação. O código ACH-0N vem da ordem e é decorativo.
 */
@Component({
  selector: 'app-achievements-section',
  imports: [McSectionHeader],
  templateUrl: './achievements-section.html',
  styleUrl: './achievements-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementsSection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly achievements = ACHIEVEMENTS;

  protected code(index: number): string {
    return `${this.ui().achievements.code}-${String(index + 1).padStart(2, '0')}`;
  }
}
