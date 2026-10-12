import { FixedClock, TICK_MS } from './clock';

describe('FixedClock', () => {
  it('turns real time into whole 12 fps ticks, keeping the remainder', () => {
    const clock = new FixedClock();

    expect(clock.advance(TICK_MS * 0.6)).toBe(0);
    expect(clock.advance(TICK_MS * 0.6)).toBe(1);
    expect(clock.advance(TICK_MS * 2)).toBe(2);
  });

  it('does not race to catch up after a long pause', () => {
    const clock = new FixedClock();

    expect(clock.advance(10_000)).toBe(3);
    expect(clock.advance(TICK_MS * 0.5)).toBe(0);
  });
});
