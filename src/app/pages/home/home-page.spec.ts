import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { HomePage } from './home-page';

describe('HomePage', () => {
  it('should render every onepage section in order', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const ids = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('main > * > section'),
    ).map((section) => section.id);

    expect(ids).toEqual([
      'hero',
      'player-status',
      'skill-loadout',
      'project-inventory',
      'campaign-log',
      'achievements',
      'current-quest',
      'side-quests',
      'final-checkpoint',
    ]);
  });

  it('should render texts in the locale of the URL', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/en', HomePage);
    expect(harness.routeNativeElement?.textContent).toContain('MC-01 / PROFESSIONAL PORTFOLIO');

    await harness.navigateByUrl('/');
    expect(harness.routeNativeElement?.textContent).toContain('MC-01 / PORTFÓLIO PROFISSIONAL');
  });
});
