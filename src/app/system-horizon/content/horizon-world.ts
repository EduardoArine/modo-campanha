import { CampaignLogChapter, CampaignLogChapterEntry, Project, SkillGroup } from '../../models';
import { HORIZON_MAP, HorizonActId, HorizonActMap } from './horizon-map';

/**
 * Mundo do SYSTEM HORIZON montado a partir do mapa (referências) e dos dados publicados (D-103).
 * Cada parada guarda o próprio dado (marco do Diário, especialidade, projeto), nunca uma cópia do
 * texto: o que o visitante lê no jogo é o mesmo objeto que a Home renderiza. Referência a dado
 * ausente some do mundo (capítulo, especialidade ou cartucho não publicado).
 *
 * Geometria (px nativos, altura 120): as paradas ficam em sequência, com espaço fixo entre elas, e o
 * último trecho é o chão original do teaser (vale → mirante com a placa), onde fica o encerramento.
 */
export interface HorizonData {
  readonly chapters: readonly CampaignLogChapter[];
  readonly skills: readonly SkillGroup[];
  /** Cartuchos publicados, na ordem da coleção. */
  readonly projects: readonly Project[];
}

interface StopBase {
  readonly id: string;
  /** Índice do ato em `HorizonWorld.acts`. */
  readonly act: number;
  /** Posição no mundo: onde o jogador para para ler. */
  readonly x: number;
}

export type HorizonStop =
  | (StopBase & {
      readonly kind: 'milestone';
      readonly chapter: CampaignLogChapter;
      readonly entry: CampaignLogChapterEntry;
    })
  | (StopBase & { readonly kind: 'collectible'; readonly group: SkillGroup })
  | (StopBase & { readonly kind: 'checkpoint'; readonly chapter: CampaignLogChapter })
  | (StopBase & { readonly kind: 'cartridge'; readonly project: Project })
  | (StopBase & { readonly kind: 'forge'; readonly project: Project })
  | (StopBase & { readonly kind: 'closing' });

export type HorizonStopKind = HorizonStop['kind'];

/** Parada antes de receber ato e posição (distribui sobre a união, sem perder o `kind`). */
type PlannedStop = HorizonStop extends infer S
  ? S extends HorizonStop
    ? Omit<S, 'act' | 'x'>
    : never
  : never;

export interface HorizonAct {
  readonly id: HorizonActId;
  /** Rótulo do ato ("01"…), pela ordem no mundo. */
  readonly number: string;
  /** Início do ato no mundo. */
  readonly x: number;
  /** Capítulo do Diário que o ato percorre (atos 01–03). */
  readonly chapter?: CampaignLogChapter;
}

export interface HorizonWorld {
  readonly acts: readonly HorizonAct[];
  readonly stops: readonly HorizonStop[];
  readonly width: number;
  /** Início do trecho final (chão original do teaser, 240 px). */
  readonly finalStart: number;
  readonly startX: number;
}

export const LAYOUT = {
  startX: 16,
  /** Do início do ato até a primeira parada (espaço do card do ato). */
  lead: 56,
  gap: 44,
  /** Da última parada até o início do ato seguinte. */
  tail: 40,
  /** Trecho final = largura do chão original do teaser (o ato 05 começa nele). */
  final: 240,
  /** Encerramento: no mirante, à esquerda da placa da arte (x 206–219 do chão). */
  closingX: 198,
} as const;

export function buildHorizonWorld(
  data: HorizonData,
  map: readonly HorizonActMap[] = HORIZON_MAP,
): HorizonWorld {
  const acts: HorizonAct[] = [];
  const stops: HorizonStop[] = [];
  let x = 0;
  let finalStart = 0;

  for (const act of map) {
    const index = acts.length;
    const number = String(index + 1).padStart(2, '0');
    const source = act.source;

    if (source.kind === 'closing') {
      finalStart = x;
      acts.push({ id: act.id, number, x: finalStart });
      stops.push({ kind: 'closing', id: 'closing', act: index, x: finalStart + LAYOUT.closingX });
      continue;
    }

    const planned: PlannedStop[] = [];
    const collect = (after: number) =>
      (act.collect ?? [])
        .filter((c) => c.after === after)
        .forEach((c) => {
          const group = data.skills.find((g) => g.id === c.group);
          if (group) planned.push({ kind: 'collectible', id: `collect-${group.id}`, group });
        });
    let chapter: CampaignLogChapter | undefined;
    if (source.kind === 'chapter') {
      chapter = data.chapters.find((c) => c.id === source.chapter);
      if (!chapter) continue;
      const found = chapter;
      found.entries.forEach((entry, i) => {
        collect(i);
        planned.push({ kind: 'milestone', id: entry.id, chapter: found, entry });
      });
      collect(found.entries.length);
      planned.push({ kind: 'checkpoint', id: `checkpoint-${found.id}`, chapter: found });
    } else {
      for (const project of data.projects) {
        if (project.serial !== source.forge) {
          planned.push({ kind: 'cartridge', id: project.serial, project });
        }
      }
      const forge = data.projects.find((p) => p.serial === source.forge);
      if (forge) planned.push({ kind: 'forge', id: 'forge', project: forge });
    }

    if (!planned.length) continue;
    const start = index === 0 ? 0 : x;
    acts.push({ id: act.id, number, x: start, ...(chapter ? { chapter } : {}) });
    let at = start + LAYOUT.lead + (index === 0 ? LAYOUT.startX : 0);
    for (const stop of planned) {
      stops.push({ ...stop, act: index, x: at });
      at += LAYOUT.gap;
    }
    x = at - LAYOUT.gap + LAYOUT.tail;
  }

  if (!finalStart) finalStart = x;
  return { acts, stops, width: finalStart + LAYOUT.final, finalStart, startX: LAYOUT.startX };
}

/** Paradas em que o visitante pode ler (as especialidades são coletadas ao passar). */
export function isReadable(stop: HorizonStop): boolean {
  return stop.kind !== 'collectible';
}
