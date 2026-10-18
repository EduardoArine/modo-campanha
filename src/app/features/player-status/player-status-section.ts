import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { PLAYER_PROFILE } from '../../data';
import { ProfileState } from '../../models';
import { McPlayerBadge, McPhoto, McPlayerCard } from '../../shared/signature';
import { McIcon, McIconName, McStatus } from '../../shared/ui';
import { MOUNTAINS } from './player-status.art';

/** Ícone de cada estado; o tom de cor fica no SCSS (`data-state`). */
const STATE_ICON: Record<ProfileState['id'], McIconName> = {
  building: 'gear',
  learning: 'book',
  evolving: 'bars',
};

/**
 * Player Status definitivo (D-082): painel único baseado no mockup aprovado. Cabeçalho com o
 * emblema, título e barra de sistema; quatro áreas: Player Card (foto real), dados do jogador,
 * "Sobre a jornada" e "Estado atual" + frase final. Todo o conteúdo vem de PLAYER_PROFILE e do
 * dicionário de UI; ícones, montanhas, cápsula, selo e barra são decorativos.
 */
@Component({
  selector: 'app-player-status-section',
  imports: [McIcon, McPlayerCard, McStatus],
  templateUrl: './player-status-section.html',
  styleUrls: ['./player-status-section.scss', './player-status-panels.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerStatusSection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly profile = PLAYER_PROFILE;
  protected readonly mountains = MOUNTAINS;

  protected readonly photo = computed<McPhoto | undefined>(() => {
    const photo = PLAYER_PROFILE.photo;
    return photo && { ...photo, alt: this.locale.pick(photo.alt) };
  });

  /** Selo do card: o XP real em forma curta (no lugar do "LV 99" do mockup, D-017). */
  protected readonly badge = computed<McPlayerBadge | undefined>(() => {
    const short = PLAYER_PROFILE.status.xp.short;
    return short && { label: this.ui().playerCard.xpLabel, value: this.locale.pick(short) };
  });

  protected readonly facts = computed(() => {
    const { origin, xp, currentCampaign, focus } = PLAYER_PROFILE.status;
    const rows: [McIconName, typeof origin][] = [
      ['gamepad', origin],
      ['xp', xp],
      ['flag', currentCampaign],
      ['target', focus],
    ];
    return rows.map(([icon, field]) => ({
      icon,
      label: this.locale.pick(field.label),
      value: this.locale.pick(field.value),
    }));
  });

  protected readonly journey = computed(() => this.locale.pick(PLAYER_PROFILE.journey));

  protected readonly states = computed(() =>
    PLAYER_PROFILE.currentState.map((state) => ({
      id: state.id,
      icon: STATE_ICON[state.id],
      label: this.locale.pick(state.label),
      value: this.locale.pick(state.value),
    })),
  );
}
