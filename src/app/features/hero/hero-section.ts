import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/i18n';

// Placeholder estrutural. Layout e conteúdo definitivos vêm na FASE 3 (docs/09-roadmap.md).
@Component({
  selector: 'app-hero-section',
  template: `
    <section id="hero" aria-labelledby="hero-title">
      <h1 id="hero-title">{{ ui().hero.name }}</h1>
      <p>{{ ui().hero.role }}</p>
      <p>{{ ui().hero.motto }}</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  protected readonly ui = inject(LocaleService).ui;
}
