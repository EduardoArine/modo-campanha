import { ChangeDetectionStrategy, Component } from '@angular/core';

// Placeholder estrutural. Layout e conteúdo definitivos vêm após a FASE 1 (docs/09-roadmap.md).
@Component({
  selector: 'app-skill-tree-section',
  template: `
    <section id="skill-tree" aria-labelledby="skill-tree-title">
      <h2 id="skill-tree-title">Skill Tree</h2>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillTreeSection {}
