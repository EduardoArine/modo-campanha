import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { LocaleService } from '../../core/i18n';
import { PLAYER_PROFILE } from '../../data';
import { CampaignWhen } from '../../features/campaign-log/campaign-when';
import { McAction, McIcon } from '../../shared/ui';
import { HorizonStop } from '../../system-horizon/content/horizon-world';

/**
 * O que se lê numa parada do SYSTEM HORIZON (D-103): marco do Diário (história, fotos e
 * referências), fim de capítulo, especialidade, cartucho, forja (MC-001) ou encerramento. Usado no
 * painel de leitura e, compacto (resumo + história recolhível, sem imagens), na versão em texto.
 */
@Component({
  selector: 'app-horizon-entry',
  imports: [CampaignWhen, McAction, McIcon],
  templateUrl: './horizon-entry.html',
  styleUrl: './horizon-entry.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizonEntry {
  readonly stop = input.required<HorizonStop>();
  /** Nível do título: 2 no painel (diálogo), 3 na versão em texto (dentro do ato). */
  readonly level = input<2 | 3>(2);
  readonly titleId = input<string | null>(null);
  readonly compact = input(false);

  protected readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly profile = PLAYER_PROFILE;

  protected readonly title = computed(() => {
    const s = this.stop();
    const ui = this.ui();
    switch (s.kind) {
      case 'milestone':
        return this.locale.pick(s.entry.title);
      case 'checkpoint':
        return s.chapter.name
          ? this.locale.pick(s.chapter.name)
          : `${ui.campaignLog.chapter} ${s.chapter.number}`;
      case 'collectible':
        return this.locale.pick(s.group.title);
      case 'closing':
        return ui.sections.finalCheckpoint;
      default:
        return this.locale.pick(s.project.title);
    }
  });

  /** Linha de sistema acima do título (capítulo, serial, estado). */
  protected readonly kicker = computed(() => {
    const s = this.stop();
    const ui = this.ui();
    const game = ui.systemHorizon.game;
    switch (s.kind) {
      case 'milestone': {
        const code = s.entry.code ? this.locale.pick(s.entry.code) : '';
        const chapter = `${ui.campaignLog.chapter} ${s.chapter.number}`;
        return code && code.toUpperCase() !== this.locale.pick(s.entry.title).toUpperCase()
          ? `${chapter} · ${code}`
          : chapter;
      }
      case 'checkpoint':
        return `${ui.campaignLog.chapter} ${s.chapter.number} · ${game.chapterDone}`;
      case 'collectible':
        return game.text.collect;
      case 'closing':
        return `${ui.systemHorizon.title} · ${game.acts.horizon}`;
      case 'forge':
        return `${s.project.serial} · ${ui.systemHorizon.unlocked}`;
      default:
        return `${s.project.serial} · ${this.locale.pick(s.project.type)}`;
    }
  });
}
