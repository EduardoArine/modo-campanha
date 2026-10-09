import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { SKILL_LOADOUT } from '../../data';
import { McSectionHeader } from '../../shared/ui';

/**
 * Skill Loadout (Home Slice 02-B, D-040/D-042). Quatro módulos de capacidades, não quatro
 * cards: código · título · divisor · lista, em composição aberta. Informativo, sem nenhuma
 * graduação de proficiência e sem semântica de interação. "Loadout informa. Inventory impressiona."
 */
@Component({
  selector: 'app-skill-loadout-section',
  imports: [McSectionHeader],
  templateUrl: './skill-loadout-section.html',
  styleUrl: './skill-loadout-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillLoadoutSection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly groups = SKILL_LOADOUT;
}
