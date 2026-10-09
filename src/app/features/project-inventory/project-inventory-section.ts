import { ChangeDetectionStrategy, Component, computed, inject, isDevMode } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { TAGS, inventoryProjects } from '../../data';
import { Project } from '../../models';
import { McCart, McCartArtwork, McProjectSummary, McSummaryChip } from '../../shared/signature';
import { McSectionHeader } from '../../shared/ui';

interface InventoryItem {
  id: string;
  serial: string;
  title: string;
  type: string;
  description: string;
  shell: Project['cartridge']['shell'];
  accent: Project['cartridge']['accent'];
  artwork?: McCartArtwork;
  chips: McSummaryChip[];
}

/**
 * Project Inventory (Home Slice 02-C, D-044). Fundação: grade de MC-CARTs + Project Summary,
 * só com projetos `publication: 'approved'`. Sem subtítulo, sem CRT e sem interação nesta
 * etapa (o cartucho não é link). Em produção, projeto sem artwork aprovado não aparece.
 */
@Component({
  selector: 'app-project-inventory-section',
  imports: [McSectionHeader, McCart, McProjectSummary],
  templateUrl: './project-inventory-section.html',
  styleUrl: './project-inventory-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInventorySection {
  private readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;

  private readonly projects = inventoryProjects(isDevMode());

  protected readonly items = computed<InventoryItem[]>(() => {
    // pick() lê o idioma ativo: o computed recalcula na troca de rota.
    const pick = this.locale.pick.bind(this.locale);
    return this.projects.map((p) => ({
      id: p.id,
      serial: p.serial,
      title: pick(p.title),
      type: pick(p.type),
      description: pick(p.description),
      shell: p.cartridge.shell,
      accent: p.cartridge.accent,
      artwork: p.cartridge.artwork && {
        src: p.cartridge.artwork.src,
        alt: pick(p.cartridge.artwork.alt),
      },
      chips: p.tags.map((id) => ({ label: pick(TAGS[id].label), tone: TAGS[id].tone })),
    }));
  });
}
