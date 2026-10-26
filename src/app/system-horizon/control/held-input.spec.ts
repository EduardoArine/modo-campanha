import { HeldInput } from './held-input';

describe('HeldInput', () => {
  it('follows the last direction still held', () => {
    const input = new HeldInput();
    expect(input.dir).toBe(0);
    input.press('arrowright', 1);
    input.press('pointer--1', -1);
    expect(input.dir).toBe(-1);
    input.release('pointer--1');
    expect(input.dir).toBe(1);
    input.press('arrowright', 1);
    input.release('arrowright');
    expect(input.dir).toBe(0);
  });

  it('clears everything (blur, pause, reading)', () => {
    const input = new HeldInput();
    input.press('a', -1);
    input.press('d', 1);
    input.clear();
    expect(input.dir).toBe(0);
  });
});
