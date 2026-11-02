import { buildHorizonWorld } from '../system-horizon/content/horizon-world';
import { CAMPAIGN_LOG_CHAPTERS } from './campaign-log.data';
import { HORIZON_BALLOONS } from './horizon-balloons.data';
import { inventoryProjects } from './projects.data';
import { SKILL_LOADOUT } from './skills.data';

// Balões do SYSTEM HORIZON (D-104): uma frase curta por marco e por fim de capítulo.
describe('HORIZON_BALLOONS', () => {
  const world = buildHorizonWorld({
    chapters: CAMPAIGN_LOG_CHAPTERS,
    skills: SKILL_LOADOUT,
    projects: inventoryProjects(false),
  });
  const ids = world.stops
    .filter((s) => s.kind === 'milestone' || s.kind === 'checkpoint')
    .map((s) => s.id);

  it('has a balloon for every Diary milestone and chapter checkpoint, and nothing else', () => {
    expect(Object.keys(HORIZON_BALLOONS).sort()).toEqual([...ids].sort());
  });

  it('keeps every balloon short, in both languages', () => {
    for (const [id, text] of Object.entries(HORIZON_BALLOONS)) {
      for (const value of [text['pt-BR'], text.en]) {
        expect(value.trim(), id).not.toBe('');
        expect(value.length, `${id}: ${value}`).toBeLessThanOrEqual(80);
      }
    }
  });

  it('only shortens approved facts: the years it cites are in the milestone story', () => {
    for (const stop of world.stops) {
      if (stop.kind !== 'milestone') continue;
      const story = stop.entry.story['pt-BR'].join(' ');
      for (const year of HORIZON_BALLOONS[stop.id]['pt-BR'].match(/\b(19|20)\d{2}\b/g) ?? []) {
        expect(story, `${stop.id} cita ${year}`).toContain(year);
      }
    }
  });
});
