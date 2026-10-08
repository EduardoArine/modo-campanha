import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LocaleService } from '../../core/i18n';
import { PLAYER_PROFILE, SOCIAL_LINKS } from '../../data';
import { McAction, McIcon } from '../../shared/ui';
import { HeroVisual } from './hero-visual';

/**
 * Hero (Home Slice 01-B/C, D-037). 70% Concept 03-A + 30% 03-B.
 * H1 semântico = Eduardo Arine (D-026); "MODO CAMPANHA" é visualmente maior, sem ser o H1.
 * Conteúdo vem do PlayerProfile e do dicionário; nenhum texto hardcoded.
 */
@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, McAction, McIcon, HeroVisual],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly profile = PLAYER_PROFILE;

  /** Ações de baixa ênfase: só links reais (GitHub, LinkedIn). Currículo fica no header. */
  protected readonly socialLinks = SOCIAL_LINKS.filter(
    (link) => link.kind === 'github' || link.kind === 'linkedin',
  );
}
