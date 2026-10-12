import { AttractPlayback } from './attract-playback';

describe('AttractPlayback', () => {
  it('starts paused (keyframe) and toggles between playing and paused', () => {
    const playback = new AttractPlayback();
    expect(playback.playing()).toBe(false);

    playback.toggle();
    expect(playback.playing()).toBe(true);
    playback.toggle();
    expect(playback.playing()).toBe(false);
  });

  it('restarts the attract mode on every play', () => {
    const playback = new AttractPlayback();
    playback.play();
    const first = playback.run();
    playback.pause();
    playback.play();

    expect(playback.run()).toBe(first + 1);
  });

  it('boots the CRT only once per page', () => {
    const playback = new AttractPlayback();

    expect(playback.takeBoot()).toBe(true);
    expect(playback.takeBoot()).toBe(false);
  });
});
