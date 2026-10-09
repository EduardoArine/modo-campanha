import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { HomePage } from './home-page';

describe('HomePage', () => {
  it('should render only the built sections, in order', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const ids = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('main > * > section'),
    ).map((section) => section.id);

    expect(ids).toEqual(['hero', 'player-status', 'skill-loadout', 'project-inventory']);
  });

  it('should end after the Project Inventory, with no raw placeholder titles', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('main')?.lastElementChild?.tagName).toBe(
      'APP-PROJECT-INVENTORY-SECTION',
    );
    expect(el.textContent).not.toMatch(
      /CAMPAIGN LOG|ACHIEVEMENTS|CURRENT MAIN QUEST|SIDE QUESTS|CAMPAIGN CONTINUES/,
    );
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
