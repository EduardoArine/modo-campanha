import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { LocaleService } from '../../../core/i18n';

/** Material do shell. Variação física/visual: não significa status nem raridade. */
export type McCartShell = 'dark' | 'light' | 'orange' | 'cool';

/** Faixa de acento no topo do rótulo (personalidade do projeto). */
export type McCartAccent = 'warm' | 'cool' | 'special';

export interface McCartArtwork {
  src: string;
  alt: string;
}

/**
 * MC-CART: cartucho físico de um console que nunca existiu (D-032).
 * Objeto físico (sombra de objeto permitida). Arquitetura fixa: identificação MC-CART +
 * serial no topo, rótulo com artwork, nome e tipo; sulcos laterais e contatos na base.
 * Não interativo nesta fase. Exposto como uma imagem com nome acessível (o resumo do
 * projeto fica no Project Summary, ao lado).
 */
@Component({
  selector: 'mc-cart',
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  host: {
    role: 'img',
    '[attr.aria-label]': 'accessibleName()',
    '[class]': '"mc-cart mc-cart--" + shell()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McCart {
  /** Serial no formato `<COLEÇÃO>-<NNN>` (ex.: `ON-001`). Não inventar seriais finais. */
  readonly serial = input.required<string>();
  readonly title = input.required<string>();
  /** Tipo do projeto, traduzido (ex.: `DIGITAL PLATFORM`). */
  readonly type = input.required<string>();
  readonly shell = input<McCartShell>('dark');
  readonly accent = input<McCartAccent>('warm');
  /** Artwork aprovado. Ausente = placeholder explícito "PROJECT ARTWORK". */
  readonly artwork = input<McCartArtwork>();

  protected readonly ui = inject(LocaleService).ui;
  protected readonly accessibleName = computed(
    () => `${this.ui().cart.system} ${this.serial()}: ${this.title()}, ${this.type()}`,
  );
}
