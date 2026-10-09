import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { PLAYER_PROFILE } from '../../data';
import { McPlayerCard } from '../../shared/signature';
import { McSectionHeader, McStatus } from '../../shared/ui';

/**
 * Player Status (Home Slice 01-E, D-038). Base Concept 03-A: Player Card + dados
 * profissionais em lista aberta (espaço, linhas, tipografia; nada vira card).
 * Só conteúdo aprovado: sem bloco "Sobre a jornada" até existir texto aprovado.
 */
@Component({
  selector: 'app-player-status-section',
  imports: [McPlayerCard, McSectionHeader, McStatus],
  templateUrl: './player-status-section.html',
  styleUrl: './player-status-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerStatusSection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly profile = PLAYER_PROFILE;

  /** Linhas do Player Card: CLASS e XP (STATUS entra como mc-status). */
  protected readonly cardFields = computed(() => [
    { label: this.ui().playerCard.classLabel, value: this.locale.pick(PLAYER_PROFILE.role) },
    {
      label: this.locale.pick(PLAYER_PROFILE.status.xp.label),
      value: this.locale.pick(PLAYER_PROFILE.status.xp.value),
    },
  ]);

  /** Dados complementares (fora do card). */
  protected readonly facts = computed(() => {
    const { origin, currentCampaign, focus } = PLAYER_PROFILE.status;
    return [origin, currentCampaign, focus].map((field) => ({
      label: this.locale.pick(field.label),
      value: this.locale.pick(field.value),
    }));
  });
}
