import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { PLAYER_PROFILE } from '../../data';

// Placeholder estrutural. Hero real no Home Slice 01-B (docs/12-home-slice-01.md).
@Component({
  selector: 'app-hero-section',
  template: `
    <section id="hero" aria-labelledby="hero-title">
      <h1 id="hero-title">{{ profile.name }}</h1>
      <p>{{ locale.pick(profile.role) }}</p>
      <p>{{ locale.pick(profile.motto) }}</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  protected readonly locale = inject(LocaleService);
  protected readonly profile = PLAYER_PROFILE;
}
