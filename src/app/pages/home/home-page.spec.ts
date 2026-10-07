import { TestBed } from '@angular/core/testing';

import { HomePage } from './home-page';

describe('HomePage', () => {
  it('should render every onepage section in order', async () => {
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const ids = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('main > * > section'),
    ).map((section) => section.id);

    expect(ids).toEqual([
      'hero',
      'player-status',
      'skill-tree',
      'project-inventory',
      'campaign-log',
      'achievements',
      'current-quest',
      'side-quests',
      'final-checkpoint',
    ]);
  });
});
