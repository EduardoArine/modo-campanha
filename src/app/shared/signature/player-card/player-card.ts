import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { LocaleService } from '../../../core/i18n';

export interface McPhoto {
  src: string;
  /** Derivados por largura (`srcset`); com eles, `sizes` do card vale. */
  srcset?: string;
  width?: number;
  height?: number;
  /** Texto alternativo traduzido, descrevendo a foto real. */
  alt: string;
}

/** Selo do canto da foto: sempre um dado real em forma curta (ex.: XP 10+), nunca LV inventado. */
export interface McPlayerBadge {
  label: string;
  value: string;
}

let nextId = 0;

/**
 * Player Card (D-031, redesenhado em D-082): a foto real como elemento principal, o nome do
 * jogador e PLAYER 01. UI digital (sem sombra de objeto). A cápsula, o selo e a barra segmentada
 * são identidade visual: decorativos (`aria-hidden`), sem valor de progresso. O selo repete um dado
 * real que precisa estar em texto em outro lugar da página. Sem LV, HP, atributos ou rankings.
 */
@Component({
  selector: 'mc-player-card',
  templateUrl: './player-card.html',
  styleUrl: './player-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McPlayerCard {
  readonly name = input.required<string>();
  /** Foto real aprovada. Ausente = placeholder explícito "FOTO DO EDUARDO". */
  readonly photo = input<McPhoto>();
  /** `sizes` da foto (largura exibida por faixa); só vale com `srcset`. */
  readonly sizes = input('100vw');
  readonly badge = input<McPlayerBadge>();

  protected readonly ui = inject(LocaleService).ui;
  protected readonly nameId = `mc-player-name-${nextId++}`;
}
