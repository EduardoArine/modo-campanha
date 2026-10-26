import { CAMPAIGN_LOG_CHAPTERS, inventoryProjects, SKILL_LOADOUT } from '../../data';
import { buildHorizonWorld, HorizonStop } from '../content/horizon-world';
import { CAMPAIGN_SPEED, CampaignEvent, CampaignScene, FORGE_TICKS } from './campaign';

// Cena jogável do SYSTEM HORIZON (D-103): determinística, testável sem canvas.
describe('CampaignScene', () => {
  const world = buildHorizonWorld({
    chapters: CAMPAIGN_LOG_CHAPTERS,
    skills: SKILL_LOADOUT,
    projects: inventoryProjects(false),
  });
  const run = (scene: CampaignScene, ticks: number) => {
    for (let i = 0; i < ticks; i++) scene.step();
  };
  /** Caminha até `x` e devolve os eventos do caminho. */
  const walk = (scene: CampaignScene, x: number): CampaignEvent[] => {
    scene.walkTo(x);
    const events: CampaignEvent[] = [];
    for (let i = 0; i < 2000 && scene.playerState.x !== x; i++) {
      // A forja interrompe a caminhada: o visitante segue depois dela.
      scene.walkTo(x);
      scene.step();
      events.push(...scene.drain());
      if (scene.forging) run(scene, FORGE_TICKS);
    }
    events.push(...scene.drain());
    return events;
  };
  const stop = (kind: HorizonStop['kind']) => world.stops.find((s) => s.kind === kind)!;

  it('starts idle in act 01 and announces it on the first tick', () => {
    const scene = new CampaignScene(world);
    expect(scene.playerState).toMatchObject({ x: world.startX, pose: 'idle', facing: 1 });
    scene.step();
    expect(scene.drain()).toContainEqual({ type: 'act', act: 0 });
    expect(scene.act).toBe(0);
  });

  it('walks while a direction is held, at a fixed speed, and stops when released', () => {
    const scene = new CampaignScene(world);
    scene.setMove(1);
    run(scene, 4);
    expect(scene.playerState.x).toBe(world.startX + 4 * CAMPAIGN_SPEED);
    expect(scene.playerState.pose).toBe('walk');
    scene.setMove(0);
    scene.step();
    expect(scene.playerState.pose).toBe('idle');
  });

  it('faces left when walking back and never leaves the world', () => {
    const scene = new CampaignScene(world);
    scene.setMove(-1);
    run(scene, 20);
    expect(scene.playerState.facing).toBe(-1);
    expect(scene.playerState.x).toBeGreaterThanOrEqual(8);
    scene.walkTo(world.width + 500);
    run(scene, 2000);
    expect(scene.playerState.x).toBeLessThanOrEqual(world.width - 16);
  });

  it('is deterministic: the same commands give the same state', () => {
    const a = new CampaignScene(world);
    const b = new CampaignScene(world);
    for (const scene of [a, b]) {
      scene.setMove(1);
      run(scene, 30);
      scene.setMove(-1);
      run(scene, 7);
      scene.goToNext(1);
      run(scene, 40);
    }
    expect(a.playerState).toEqual(b.playerState);
    expect(a.near?.id).toBe(b.near?.id);
  });

  it('offers the nearest milestone for reading and remembers it as read', () => {
    const scene = new CampaignScene(world);
    const first = world.stops[0];
    const events = walk(scene, first.x);
    expect(events).toContainEqual({ type: 'near', stop: first });
    expect(scene.near).toBe(first);
    expect(scene.isRead(first.id)).toBe(false);
    scene.markRead(first.id);
    expect(scene.isRead(first.id)).toBe(true);
  });

  it('goes to the next and the previous stop', () => {
    const scene = new CampaignScene(world);
    expect(scene.goToNext(1)).toBe(world.stops[0]);
    run(scene, 200);
    expect(scene.playerState.x).toBe(world.stops[0].x);
    expect(scene.goToNext(1)).toBe(world.stops[1]);
    run(scene, 200);
    expect(scene.goToNext(-1)).toBe(world.stops[0]);
  });

  it('collects a specialty on contact (no reading needed) and activates checkpoints on the way', () => {
    const scene = new CampaignScene(world);
    const collectible = stop('collectible');
    const checkpoint = stop('checkpoint');
    const events = walk(scene, checkpoint.x);
    expect(events).toContainEqual({ type: 'collected', stop: collectible });
    expect(events).toContainEqual({ type: 'checkpoint', stop: checkpoint });
    expect(scene.isCollected(collectible.id)).toBe(true);
    expect(scene.isCheckpoint(checkpoint.id)).toBe(true);
    expect(events.filter((e) => e.type === 'collected')).toHaveLength(1);
  });

  it('forms the MC-CART at the forge: the player waits, then the campaign is unlocked', () => {
    const scene = new CampaignScene(world);
    const forge = stop('forge');
    scene.walkTo(forge.x);
    for (let i = 0; i < 2000 && !scene.forging; i++) scene.step();
    expect(scene.forging).toBe(true);
    const x = scene.playerState.x;
    expect(x).toBeLessThan(forge.x);
    scene.setMove(1);
    run(scene, FORGE_TICKS - 1);
    expect(scene.playerState.x).toBe(x);
    expect(scene.captions().map((c) => c.kind)).toContain('unlocked');
    scene.step();
    expect(scene.forging).toBe(false);
    expect(scene.unlocked).toBe(true);
    expect(scene.drain()).toContainEqual({ type: 'unlocked', stop: forge });
    // Depois de formado, o MC-001 da forja pode ser lido.
    scene.setMove(0);
    scene.walkTo(forge.x);
    run(scene, 10);
    expect(scene.near).toBe(forge);
  });

  it('with reduced motion, forms the MC-CART at once', () => {
    const scene = new CampaignScene(world, { reducedMotion: true });
    walk(scene, stop('forge').x);
    expect(scene.unlocked).toBe(true);
    expect(scene.forging).toBe(false);
  });

  it('arrives at the lookout, looks at the horizon and shows the closing captions', () => {
    const scene = new CampaignScene(world, { reducedMotion: true });
    const closing = stop('closing');
    const events = walk(scene, closing.x);
    expect(events).toContainEqual({ type: 'arrived' });
    expect(scene.act).toBe(4);
    expect(scene.near).toBe(closing);
    scene.step();
    expect(scene.playerState.pose).toBe('look');
    expect(scene.captions().map((c) => c.kind)).toEqual(['horizon']);
    run(scene, 30);
    expect(scene.captions().map((c) => c.kind)).toEqual(['continues']);
  });

  it('labels the nearby stop over the screen, never the closing', () => {
    const scene = new CampaignScene(world);
    walk(scene, world.stops[0].x);
    expect(scene.captions()).toEqual([
      expect.objectContaining({ kind: 'stop', stop: world.stops[0] }),
    ]);
  });

  it('keeps the camera inside the world', () => {
    const scene = new CampaignScene(world, { reducedMotion: true });
    expect(scene.camera()).toBe(0);
    walk(scene, stop('closing').x);
    expect(scene.camera()).toBe(world.width - 160);
    expect(scene.worldX(80)).toBe(world.width - 80);
  });
});
