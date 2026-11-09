import { PadInput } from './minigame';
import {
  CROC_CYCLE,
  crocOpen,
  GROUND,
  JUNGLE_SCREENS,
  JungleRun,
  scorpionX,
  spiderY,
  vineTip,
} from './jungle-run';

// CORRIDA NA SELVA (D-104): determinística, sem game over, e vencível.
describe('JungleRun', () => {
  const idle: PadInput = { dir: 0, jump: false };
  const run = (game: JungleRun, input: PadInput, ticks: number) => {
    for (let i = 0; i < ticks; i++) game.step(input);
  };
  /** Cópia profunda do estado (para a busca abaixo). */
  const clone = (game: JungleRun): JungleRun => {
    const copy = Object.create(Object.getPrototypeOf(game)) as JungleRun;
    for (const [key, value] of Object.entries(game)) {
      (copy as unknown as Record<string, unknown>)[key] = structuredClone(value);
    }
    return copy;
  };

  it('starts on the first screen, on the ground, facing right', () => {
    const game = new JungleRun();
    expect(game.screen).toBe(0);
    expect(game.runner).toMatchObject({ y: GROUND, onGround: true, facing: 1 });
    expect(game.done).toBe(false);
  });

  it('jumps only from the ground and lands back on it', () => {
    const game = new JungleRun();
    game.step({ dir: 0, jump: true });
    expect(game.runner.onGround).toBe(false);
    const peak = Math.min(...Array.from({ length: 6 }, () => (game.step(idle), game.runner.y)));
    expect(peak).toBeLessThan(GROUND - 12);
    run(game, idle, 20);
    expect(game.runner).toMatchObject({ y: GROUND, onGround: true });
  });

  it('has no game over: touching the snake sends the runner back to the start of the screen', () => {
    const game = new JungleRun();
    run(game, { dir: 1, jump: false }, 40);
    expect(game.retries).toBeGreaterThan(0);
    expect(game.screen).toBe(0);
    expect(game.flash).toBeGreaterThanOrEqual(0);
    expect(game.done).toBe(false);
  });

  it('moves its creatures on fixed cycles (scorpion patrol, spider, crocodiles)', () => {
    const path = JUNGLE_SCREENS[0].scorpions![0];
    const xs = Array.from({ length: 200 }, (_, t) => scorpionX(path, t));
    expect(Math.min(...xs)).toBe(path[0]);
    expect(Math.max(...xs)).toBe(path[1]);
    const ys = Array.from({ length: 60 }, (_, t) => spiderY(t));
    expect(Math.max(...ys) - Math.min(...ys)).toBeGreaterThan(40);
    const cycle = CROC_CYCLE.closed + CROC_CYCLE.open;
    const open = Array.from({ length: cycle }, (_, t) => crocOpen(0, t)).filter(Boolean);
    expect(open).toHaveLength(CROC_CYCLE.open);
    const vine = JUNGLE_SCREENS[1].vine!;
    const tips = Array.from({ length: vine.period }, (_, t) => vineTip(vine, t).x);
    expect(Math.min(...tips)).toBeLessThan(JUNGLE_SCREENS[1].lake![0]);
    expect(Math.max(...tips)).toBeGreaterThan(JUNGLE_SCREENS[1].lake![1]);
  });

  it('can be finished: a search finds a run from the start to the joystick without a retry', () => {
    // Busca em feixe: a cada 2 ticks, quatro escolhas (andar, andar e pular, esperar, esperar e
    // pular); mantém os 80 estados mais adiantados que nunca voltaram ao começo da tela.
    const actions: PadInput[][] = [
      [
        { dir: 1, jump: false },
        { dir: 1, jump: false },
      ],
      [
        { dir: 1, jump: true },
        { dir: 1, jump: false },
      ],
      [idle, idle],
      [{ dir: 0, jump: true }, idle],
    ];
    let beam = [new JungleRun()];
    let winner: JungleRun | undefined;
    let hung = false;
    for (let step = 0; step < 600 && !winner; step++) {
      const next = new Map<string, JungleRun>();
      for (const state of beam) {
        for (const pair of actions) {
          const g = clone(state);
          pair.forEach((input) => g.step(input));
          if (g.retries) continue;
          hung ||= g.runner.hanging;
          if (g.done) winner = g;
          const r = g.runner;
          const key = `${g.screen}:${Math.round(r.x)}:${Math.round(r.y)}:${r.hanging}:${Math.round(r.vy)}`;
          if (!next.has(key)) next.set(key, g);
        }
      }
      beam = [...next.values()]
        .sort((a, b) => b.screen * 1000 + b.runner.x - (a.screen * 1000 + a.runner.x))
        .slice(0, 80);
    }
    expect(hung).toBe(true);
    expect(winner?.done).toBe(true);
    expect(winner?.screen).toBe(JUNGLE_SCREENS.length - 1);
    // Curto: menos de 45 s a 12 fps.
    expect(winner!.tick).toBeLessThan(45 * 12);
  });

  describe('vine', () => {
    const vine = JUNGLE_SCREENS[1].vine!;
    const lake = JUNGLE_SCREENS[1].lake!;
    /** Jogador pendurado no cipó na tela 2, no tick `phase` do balanço. */
    const hanging = (phase: number) => {
      const g = new JungleRun();
      Object.assign(g, { screen: 1, tick: phase });
      const tip = vineTip(vine, phase);
      Object.assign(g.runner, { x: tip.x, y: tip.y + 21, hanging: true, onGround: false });
      return g;
    };

    it('is grabbed from the bank on most timings (the hand meets the rope between ticks)', () => {
      for (const x0 of [36, 40, 43]) {
        let grabbed = 0;
        for (let phase = 0; phase < vine.period; phase++) {
          const g = new JungleRun();
          Object.assign(g, { screen: 1, tick: phase });
          Object.assign(g.runner, { x: x0 });
          g.step({ dir: 1, jump: true });
          for (let i = 0; i < 40 && !g.retries && !g.runner.hanging; i++) {
            g.step({ dir: 1, jump: false });
            if (g.runner.onGround) break;
          }
          if (g.runner.hanging) grabbed++;
        }
        expect(grabbed / vine.period, `x0=${x0}`).toBeGreaterThanOrEqual(0.6);
      }
    });

    it('slides down to the tip after grabbing higher up the rope', () => {
      const g = hanging(0);
      Object.assign(g, { grip: 0.6 });
      for (let i = 0; i < 6; i++) g.step(idle);
      const tip = vineTip(vine, g.tick);
      expect(g.runner.x).toBeCloseTo(tip.x);
      expect(g.runner.y).toBeCloseTo(tip.y + 21);
    });

    it('never grabs the vine again right after letting go', () => {
      for (let phase = 0; phase < vine.period; phase++) {
        const g = hanging(phase);
        g.step({ dir: 1, jump: true });
        expect(g.runner.hanging).toBe(false);
        for (let i = 0; i < 30 && !g.runner.onGround && !g.retries; i++) {
          g.step({ dir: 1, jump: false });
          expect(g.runner.hanging, `fase ${phase}, tick ${i}`).toBe(false);
        }
      }
    });

    it('lands on the far bank when released on the right half of the swing, holding →', () => {
      let tried = 0;
      for (let phase = 0; phase < vine.period; phase++) {
        const tip = vineTip(vine, phase);
        const next = vineTip(vine, phase + 1);
        if (!(next.x > tip.x && tip.x >= 86)) continue;
        tried++;
        const g = hanging(phase - 1);
        g.step({ dir: 1, jump: false });
        g.step({ dir: 1, jump: true });
        for (let i = 0; i < 40 && !g.runner.onGround && !g.retries; i++)
          g.step({ dir: 1, jump: false });
        expect(g.retries, `fase ${phase}`).toBe(0);
        expect(g.runner.onGround && (g.screen === 2 || g.runner.x > lake[1]), `fase ${phase}`).toBe(
          true,
        );
      }
      expect(tried).toBeGreaterThanOrEqual(4);
    });
  });

  // Dificuldade (ajuste de 2026-11-09): os obstáculos pedem tempo certo, mas com folga real.
  describe('difficulty', () => {
    const right: PadInput = { dir: 1, jump: false };

    it('clears the two snakes only with a well-timed long jump (4 to 6 take-off points)', () => {
      const cleared: number[] = [];
      for (let walk = 0; walk < 16; walk++) {
        const g = new JungleRun();
        run(g, right, walk);
        const from = g.runner.x;
        if (g.retries) continue;
        g.step({ dir: 1, jump: true });
        for (let i = 0; i < 17 && !g.retries; i++) g.step(right);
        if (!g.retries) cleared.push(from);
      }
      expect(cleared.length).toBeGreaterThanOrEqual(4);
      expect(cleared.length).toBeLessThanOrEqual(6);
    });

    it('moves neighbouring spiders half a cycle apart: when one is down, the other is up', () => {
      const ys = Array.from({ length: 80 }, (_, t) => [spiderY(t, 0), spiderY(t, 1)]);
      const low = Math.max(...ys.map(([a]) => a));
      const high = Math.min(...ys.map(([a]) => a));
      for (const [a, b] of ys) expect(Math.abs(a + b - (low + high))).toBeLessThanOrEqual(1);
    });

    it('cannot be finished by just holding → and jumping on a fixed beat', () => {
      for (let beat = 6; beat <= 24; beat++) {
        const g = new JungleRun();
        for (let t = 0; t < 400 && !g.done; t++) g.step({ dir: 1, jump: t % beat === 0 });
        expect(g.done && !g.retries, `batida ${beat}`).toBe(false);
      }
    });
  });

  it('stops stepping once done', () => {
    const game = new JungleRun();
    game.done = true;
    game.step({ dir: 1, jump: true });
    expect(game.tick).toBe(0);
  });
});
