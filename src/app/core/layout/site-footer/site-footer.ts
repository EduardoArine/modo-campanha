import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../i18n';
import { PLAYER_PROFILE } from '../../../data';

/**
 * Footer da Home (Home Slice 05-C, D-052). Renderizado pela HomePage logo depois do `</main>`,
 * não pelo shell: fecha a Home e fica fora do /dev/design-system sem lógica de rota.
 * Só assinatura e copyright: sem links, ícones, monograma ou linguagem de game.
 */
@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly profile = PLAYER_PROFILE;
  /** Ano atual, calculado em runtime. */
  protected readonly year = new Date().getFullYear();
}
