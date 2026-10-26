import { CAMPAIGN_LOG_CHAPTERS, inventoryProjects, SKILL_LOADOUT } from '../../data';
import { Project } from '../../models';
import { campaignTrailY } from '../world/campaign-terrain';
import { trailY } from '../world/trail';
import { HORIZON_MAP } from './horizon-map';
import { buildHorizonWorld, HorizonData, LAYOUT } from './horizon-world';

// Mundo do SYSTEM HORIZON interativo (D-103): referências no mapa, fatos nos dados publicados.
describe('HORIZON_MAP / buildHorizonWorld', () => {
  const data: HorizonData = {
    chapters: CAMPAIGN_LOG_CHAPTERS,
    skills: SKILL_LOADOUT,
    projects: inventoryProjects(false),
  };
  const world = buildHorizonWorld(data);
  const kinds = (act: number) => world.stops.filter((s) => s.act === act).map((s) => s.kind);

  it('keeps no human text in the map: only references', () => {
    const json = JSON.stringify(HORIZON_MAP);
    expect(json).not.toMatch(/pt-BR|"en"|title|summary|story/);
  });

  it('walks the five acts in order: three Diary chapters, the cartridges and the horizon', () => {
    expect(world.acts.map((a) => a.id)).toEqual([
      'origin',
      'code',
      'product',
      'campaigns',
      'horizon',
    ]);
    expect(world.acts.map((a) => a.number)).toEqual(['01', '02', '03', '04', '05']);
    expect(world.acts.slice(0, 3).map((a) => a.chapter)).toEqual([...CAMPAIGN_LOG_CHAPTERS]);
  });

  it('turns every Diary milestone into a stop, with the chapter checkpoint at the end', () => {
    CAMPAIGN_LOG_CHAPTERS.forEach((chapter, i) => {
      const stops = world.stops.filter((s) => s.act === i);
      const milestones = stops.flatMap((s) => (s.kind === 'milestone' ? [s.entry] : []));
      expect(milestones).toEqual([...chapter.entries]);
      expect(stops[stops.length - 1]).toMatchObject({ kind: 'checkpoint', chapter });
    });
  });

  it('places the four specialties on the way (GAME DNA, BUILD, PRODUCT, AI) with the published groups', () => {
    const groups = world.stops.flatMap((s) => (s.kind === 'collectible' ? [s.group] : []));
    expect(groups.map((g) => g.id)).toEqual(['game-dna', 'build', 'product', 'ai']);
    groups.forEach((g) => expect(SKILL_LOADOUT).toContain(g));
    expect(kinds(0)).toContain('collectible');
  });

  it('shows the published cartridges in act 04 and forms MC-001 at the forge', () => {
    const act04 = world.stops.filter((s) => s.act === 3);
    const serials = act04.flatMap((s) => (s.kind === 'cartridge' ? [s.project.serial] : []));
    expect(serials).toEqual(data.projects.map((p) => p.serial).filter((s) => s !== 'MC-001'));
    expect(act04[act04.length - 1]).toMatchObject({ kind: 'forge', project: { serial: 'MC-001' } });
  });

  it('ends at the lookout of the original ground, next to its signpost', () => {
    const closing = world.stops[world.stops.length - 1];
    expect(closing).toMatchObject({
      kind: 'closing',
      act: 4,
      x: world.finalStart + LAYOUT.closingX,
    });
    expect(world.width).toBe(world.finalStart + 240);
    expect(world.acts[4].x).toBe(world.finalStart);
  });

  it('keeps the stops in order, evenly spaced and inside the world', () => {
    const xs = world.stops.map((s) => s.x);
    expect(xs).toEqual([...xs].sort((a, b) => a - b));
    expect(new Set(world.stops.map((s) => s.id)).size).toBe(world.stops.length);
    expect(xs[0]).toBeGreaterThan(world.startX);
    expect(xs[xs.length - 1]).toBeLessThan(world.width);
  });

  it('drops references to data that is not published (chapter, specialty, cartridge)', () => {
    const partial = buildHorizonWorld({
      chapters: CAMPAIGN_LOG_CHAPTERS.slice(1),
      skills: SKILL_LOADOUT.filter((g) => g.id !== 'ai'),
      projects: data.projects.filter((p) => p.serial !== 'MC-001'),
    });
    expect(partial.acts.map((a) => a.id)).toEqual(['code', 'product', 'campaigns', 'horizon']);
    expect(partial.acts[0].number).toBe('01');
    expect(partial.stops.some((s) => s.kind === 'collectible' && s.group.id === 'ai')).toBe(false);
    expect(partial.stops.some((s) => s.kind === 'forge')).toBe(false);
    expect(
      partial.stops.some((s) => s.kind === 'milestone' && s.chapter.id === 'chapter-00-origin'),
    ).toBe(false);
  });

  it('never includes an unpublished project', () => {
    const draft = { ...data.projects[1], serial: 'MC-999', publication: 'draft' } as Project;
    const only = buildHorizonWorld({
      ...data,
      projects: inventoryProjects(false, [...data.projects, draft]),
    });
    expect(only.stops.some((s) => s.kind === 'cartridge' && s.project.serial === 'MC-999')).toBe(
      false,
    );
  });

  it('joins the repeated valley and the final ground without a step in the trail', () => {
    const f = world.finalStart;
    expect(Math.abs(campaignTrailY(f - 1, f) - campaignTrailY(f, f))).toBeLessThanOrEqual(1);
    expect(campaignTrailY(f + 150, f)).toBe(trailY(150));
    for (let x = 0; x < f; x += 7) {
      expect(Math.abs(campaignTrailY(x, f) - campaignTrailY(x + 1, f))).toBeLessThanOrEqual(1);
    }
  });
});
