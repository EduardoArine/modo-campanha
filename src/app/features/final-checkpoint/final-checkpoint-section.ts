import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { PLAYER_PROFILE, SOCIAL_LINKS } from '../../data';
import { McAction, McIcon, McSectionHeader } from '../../shared/ui';

/**
 * Final Checkpoint (Home Slice 05, D-052). Direção A — Save Point Editorial: encerramento
 * aberto, sem painel, objeto físico ou motion. SAVE COMPLETE é o único detalhe MC-01.
 * GitHub e LinkedIn são ações equivalentes (secondary), sem primary e sem ícones de marca.
 * Só links reais: currículo, email e formulário não existem até haver destino aprovado.
 */
@Component({
  selector: 'app-final-checkpoint-section',
  imports: [McAction, McIcon, McSectionHeader],
  templateUrl: './final-checkpoint-section.html',
  styleUrl: './final-checkpoint-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalCheckpointSection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly profile = PLAYER_PROFILE;

  protected readonly links = SOCIAL_LINKS.filter(
    (link) => link.kind === 'github' || link.kind === 'linkedin',
  );
}
