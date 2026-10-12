import { ATTRACT_COLLECTIBLES } from '../content/attract-content';
import { LOOKOUT_X } from '../world/trail';
import { ATTRACT_TICKS, AttractScene, BEATS, KEYFRAME_TICK } from './attract';

// Attract mode do SYSTEM HORIZON (D-068): roteiro determinístico de ~7 s a 12 fps.
describe('AttractScene', () => {
  const keys = (scene: AttractScene) => scene.captions().map((c) => c.key);
  const run = (scene: AttractScene, ticks: number) => {
    for (let i = 0; i < ticks; i++) scene.step();
  };

  it('lasts about 7 seconds at 12 fps', () => {
    expect(ATTRACT_TICKS).toBe(84);
  });

  it('collects BUILD, PRODUCT, AI and GAME DNA in order, between 2 s and 4 s', () => {
    const scene = new AttractScene({ boot: false });
    run(scene, BEATS.merge);

    const ticks = scene.collected;
    expect(ticks.every((t) => t >= 2 * 12 - 1 && t < 4 * 12)).toBe(true);
    expect([...ticks]).toEqual([...ticks].sort((a, b) => a - b));
    expect(ATTRACT_COLLECTIBLES.map((c) => c.id)).toEqual(['build', 'product', 'ai', 'gameDna']);
  });

  it('shows each item label briefly when it is collected', () => {
    const scene = new AttractScene({ boot: false });
    run(scene, BEATS.merge);
    const productAt = scene.collected[1];

    const fresh = new AttractScene({ boot: false });
    run(fresh, productAt);
    expect(keys(fresh)).toContain('product');
    run(fresh, 4);
    expect(keys(fresh)).not.toContain('product');
  });

  it('has an official keyframe: the four items formed MC-001 with CAMPAIGN UNLOCKED', () => {
    const scene = AttractScene.keyframe();

    expect(scene.tick).toBe(KEYFRAME_TICK);
    expect(scene.collected.every((t) => t >= 0)).toBe(true);
    expect(scene.cartFrame).toBe(5);
    expect(keys(scene)).toEqual(['player', 'unlocked', 'serial']);
  });

  it('reaches the lookout and looks at the horizon with SYSTEM HORIZON, then CAMPAIGN CONTINUES', () => {
    const scene = new AttractScene({ boot: false });
    run(scene, 72);
    expect(scene.playerState.pose).toBe('look');
    expect(scene.playerState.x).toBeGreaterThanOrEqual(LOOKOUT_X);
    expect(keys(scene)).toContain('horizon');

    run(scene, BEATS.continues - 72);
    expect(keys(scene)).toContain('continues');
  });

  it('boots the CRT only on the first loop; later loops restart the attract mode directly', () => {
    const scene = new AttractScene({ boot: true });
    run(scene, 5);
    expect(keys(scene)).toEqual(['console', 'title']);

    run(scene, ATTRACT_TICKS - 5);
    expect(scene.tick).toBe(0);
    expect(scene.loops).toBe(1);
    run(scene, 5);
    expect(keys(scene)).not.toContain('console');
    expect(scene.playerState.pose).toBe('idle');
  });
});
