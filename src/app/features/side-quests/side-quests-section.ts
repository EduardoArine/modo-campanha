import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { SIDE_QUESTS } from '../../data';
import { McSectionHeader } from '../../shared/ui';

/**
 * Side Quests (Home Slice 07, docs/19). C — Side Quest Log: linhas compactas (tipo · título ·
 * resumo) separadas por réguas finas. Mais silenciosa que a Current Main Quest e distinta do
 * Inventory (sem MC-CART), do Loadout (grade) e dos Achievements (painel). Nada interativo.
 */
@Component({
  selector: 'app-side-quests-section',
  imports: [McSectionHeader],
  templateUrl: './side-quests-section.html',
  styleUrl: './side-quests-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideQuestsSection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly quests = SIDE_QUESTS;
}
