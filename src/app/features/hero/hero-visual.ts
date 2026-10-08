import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { McCrtFrame } from '../../shared/signature';

/**
 * Cena do Hero (Home Slice 01-C, D-037): CRT sobre o console MC-01 + luz quente.
 * Puramente decorativa (aria-hidden): não comunica informação necessária ao Hero.
 * O console é CSS local (ainda não é componente: um só uso). Sem motion.
 */
@Component({
  selector: 'app-hero-visual',
  imports: [McCrtFrame],
  template: `
    <div class="scene">
      <mc-crt-frame class="crt">
        <p class="screen-message">{{ ui().crt.empty }}</p>
      </mc-crt-frame>

      <div class="console">
        <span class="console-label">{{ ui().crt.identification }}</span>
        <span class="console-slot"></span>
        <span class="console-vents"></span>
        <span class="console-buttons"><span></span><span></span></span>
        <span class="console-led"></span>
      </div>
    </div>
  `,
  styleUrl: './hero-visual.scss',
  host: { 'aria-hidden': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroVisual {
  protected readonly ui = inject(LocaleService).ui;
}
