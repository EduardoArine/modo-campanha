import { LocaleService } from '../../core/i18n';
import { HorizonAct, HorizonStop } from '../../system-horizon/content/horizon-world';

/**
 * Rótulos curtos do jogo (D-103), sempre a partir dos dados: o codinome do marco (ou o título), o
 * capítulo do checkpoint, o serial do cartucho, o nome da especialidade. Usados na legenda sobre a
 * tela, no botão de leitura e na região viva.
 */
export function stopLabel(stop: HorizonStop, locale: LocaleService): string {
  const ui = locale.ui();
  switch (stop.kind) {
    case 'milestone':
      return locale.pick(stop.entry.code ?? stop.entry.title);
    case 'checkpoint':
      return `${ui.campaignLog.chapter} ${stop.chapter.number}`;
    case 'cartridge':
    case 'forge':
      return stop.project.serial;
    case 'collectible':
      return locale.pick(stop.group.title);
    case 'closing':
      return ui.systemHorizon.title;
  }
}

/** "ATO 01 — ORIGEM": o nome do capítulo nos atos 01–03; nos outros, o nome de sistema do ato. */
export function actLabel(act: HorizonAct, locale: LocaleService): string {
  const game = locale.ui().systemHorizon.game;
  const name = act.chapter?.name
    ? locale.pick(act.chapter.name)
    : act.id === 'campaigns' || act.id === 'horizon'
      ? game.acts[act.id]
      : '';
  return name ? `${game.act} ${act.number} — ${name}` : `${game.act} ${act.number}`;
}
