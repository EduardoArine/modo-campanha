import { ChangeDetectionStrategy, Component } from '@angular/core';

// Placeholder estrutural. Layout e conteúdo definitivos vêm após a FASE 1 (docs/09-roadmap.md).
@Component({
  selector: 'app-hero-section',
  template: `
    <section id="hero" aria-labelledby="hero-title">
      <h1 id="hero-title">Eduardo Arine</h1>
      <p>Desenvolvedor de Produtos Digitais</p>
      <p>XP real, sem personagem.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {}
