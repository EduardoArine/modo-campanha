import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { CampaignLogChapter, CampaignLogMapPosition } from '../../models';
import { milestoneLabel, milestoneNumber } from './diary-labels';

/** Caminho suave (Catmull-Rom → Bézier cúbica) pelos pontos, nas coordenadas 0–100 do mapa. */
function routePath(points: readonly CampaignLogMapPosition[]): string {
  if (!points.length) return '';
  const p = points;
  let d = `M${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i];
    const b = p[i];
    const c = p[i + 1];
    const e = p[i + 2] ?? c;
    const c1 = [b.x + (c.x - a.x) / 6, b.y + (c.y - a.y) / 6];
    const c2 = [c.x - (e.x - b.x) / 6, c.y - (e.y - b.y) / 6];
    d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${c.x} ${c.y}`;
  }
  return d;
}

/**
 * Mapa do capítulo ativo (D-091). Três camadas no mesmo sistema de coordenadas (% de uma moldura
 * 16:9): o cenário (imagem decorativa, sem rota nem nós desenhados), a rota (SVG) e os marcos
 * (botões). Até o marco escolhido, a rota fica em laranja. No mobile (< 768), o mapa vira um mini
 * mapa só com pontos e a escolha passa para a lista de marcos (diary-milestones), sem hover.
 */
@Component({
  selector: 'app-diary-map',
  templateUrl: './diary-map.html',
  styleUrl: './diary-map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaryMap {
  readonly chapter = input.required<CampaignLogChapter>();
  readonly selected = input<string | null>(null);
  readonly choose = output<string>();

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;

  protected readonly entries = computed(() => this.chapter().entries);
  protected readonly route = computed(() => routePath(this.entries().map((e) => e.map)));
  /** Trecho já percorrido: do primeiro marco até o escolhido. */
  protected readonly travelled = computed(() => {
    const index = this.entries().findIndex((e) => e.id === this.selected());
    return index > 0
      ? routePath(
          this.entries()
            .slice(0, index + 1)
            .map((e) => e.map),
        )
      : '';
  });

  protected readonly number = milestoneNumber;

  protected label(index: number): string {
    return milestoneLabel(this.locale, this.entries(), index);
  }
}
