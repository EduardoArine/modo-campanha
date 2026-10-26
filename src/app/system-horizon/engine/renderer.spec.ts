import { Renderer } from './renderer';
import { SheetSpec } from './sprite-sheet';

// O teaser nunca espelha: `sprite` sem `flip` desenha exatamente como antes (D-068); o jogo espelha
// em torno do pivot (D-103).
describe('Renderer', () => {
  const spec: SheetSpec = {
    file: 'x.png',
    frameWidth: 16,
    frameHeight: 24,
    frames: 4,
    columns: 4,
    pivot: { x: 6, y: 23 },
  };

  function fake() {
    const calls: unknown[][] = [];
    const ctx = {
      drawImage: (...args: unknown[]) => calls.push(['drawImage', ...args]),
      save: () => calls.push(['save']),
      restore: () => calls.push(['restore']),
      scale: (...args: unknown[]) => calls.push(['scale', ...args]),
    };
    const canvas = { getContext: () => ctx, width: 0, height: 0 };
    const display = {
      ownerDocument: { createElement: () => canvas },
      getContext: () => ({}),
      width: 0,
      height: 0,
    } as unknown as HTMLCanvasElement;
    return { r: Renderer.create(display)!, calls };
  }

  it('draws a frame anchored on its pivot (unchanged for the teaser)', () => {
    const { r, calls } = fake();
    const img = {} as CanvasImageSource;
    r.sprite(img, spec, 1, 50.4, 100);
    expect(calls).toEqual([['drawImage', img, 16, 0, 16, 24, 44, 77, 16, 24]]);
  });

  it('mirrors a frame around the same pivot', () => {
    const { r, calls } = fake();
    const img = {} as CanvasImageSource;
    r.sprite(img, spec, 1, 50, 100, true);
    // Espelhado, o pivot fica a 16 - 6 = 10 px da borda esquerda: x 40..56.
    expect(calls).toEqual([
      ['save'],
      ['scale', -1, 1],
      ['drawImage', img, 16, 0, 16, 24, -56, 77, 16, 24],
      ['restore'],
    ]);
  });

  it('draws a vertical strip of an image, optionally mirrored', () => {
    const { r, calls } = fake();
    const img = {} as CanvasImageSource;
    r.strip(img, 0, 100, 120, -20, 0);
    r.strip(img, 0, 100, 120, 80, 0, true);
    expect(calls[0]).toEqual(['drawImage', img, 0, 0, 100, 120, -20, 0, 100, 120]);
    expect(calls[3]).toEqual(['drawImage', img, 0, 0, 100, 120, -180, 0, 100, 120]);
  });
});
