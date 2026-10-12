import { quadTransform, ScreenQuad } from './screen-quad';

describe('quadTransform', () => {
  /** Aplica o matrix3d (coluna-maior) a um ponto 2D, com divisão de perspectiva. */
  function project(css: string, x: number, y: number): [number, number] {
    const m = css.slice('matrix3d('.length, -1).split(',').map(Number);
    const w = m[3] * x + m[7] * y + m[15];
    return [(m[0] * x + m[4] * y + m[12]) / w, (m[1] * x + m[5] * y + m[13]) / w];
  }

  it('keeps a full rectangle as identity', () => {
    const quad: ScreenQuad = [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ];
    const css = quadTransform(400, 300, quad);

    expect(project(css, 400, 300)).toEqual([400, 300]);
    expect(project(css, 200, 150)).toEqual([200, 150]);
  });

  it('maps the screen corners onto a perspective quad (the CRT glass angle)', () => {
    const quad: ScreenQuad = [
      [0, 0.04],
      [1, 0],
      [0.994, 1],
      [0, 0.98],
    ];
    const css = quadTransform(316, 254, quad);
    const corners: [number, number][] = [
      [0, 0],
      [316, 0],
      [316, 254],
      [0, 254],
    ];

    corners.forEach(([x, y], i) => {
      const [px, py] = project(css, x, y);
      expect(px).toBeCloseTo(quad[i][0] * 316, 2);
      expect(py).toBeCloseTo(quad[i][1] * 254, 2);
    });
  });
});
