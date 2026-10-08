import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { LocaleService } from '../../../core/i18n';

export interface McPlayerField {
  /** Label de sistema traduzido (ex.: `CLASS`). */
  label: string;
  /** Valor real e traduzido (ex.: `Desenvolvedor de Produtos Digitais`). Nunca métrica inventada. */
  value: string;
}

export interface McPhoto {
  src: string;
  /** Texto alternativo traduzido, descrevendo a foto real. */
  alt: string;
}

let nextId = 0;

/**
 * Player Card: perfil profissional lido pela linguagem do MC System (D-031).
 * UI digital (sem sombra de objeto). Único componente com cantos de mira.
 * Sem LV, HP, atributos, estrelas ou rankings: XP real, sem personagem.
 */
@Component({
  selector: 'mc-player-card',
  templateUrl: './player-card.html',
  styleUrl: './player-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McPlayerCard {
  readonly name = input.required<string>();
  /** Linhas de dados reais (CLASS, XP...). */
  readonly fields = input<readonly McPlayerField[]>([]);
  /** Foto real aprovada. Ausente = placeholder explícito "FOTO DO EDUARDO". */
  readonly photo = input<McPhoto>();
  /** Label da linha de status; o valor entra por projeção (`<mc-status>`). */
  readonly statusLabel = input<string>();

  protected readonly ui = inject(LocaleService).ui;
  protected readonly nameId = `mc-player-name-${nextId++}`;
}
