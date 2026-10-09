import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { ACHIEVEMENTS, CAMPAIGN_LOG, shouldRenderAchievements } from '../../data';
import { HomePage } from './home-page';

// Os testes rodam na configuração `development`: Campaign Log (D-049) e Achievements (D-051)
// usam MOCK. Em produção as listas publicadas são vazias e as seções não são renderizadas.
const hasCampaignLog = CAMPAIGN_LOG.length > 0;
const hasAchievements = shouldRenderAchievements(ACHIEVEMENTS);

describe('HomePage', () => {
  it('should render only the built sections, in order', async () => {
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
      ...(hasCampaignLog ? ['campaign-log'] : []),
      ...(hasAchievements ? ['achievements'] : []),
    ]);
  });

  it('should end after the last built section, with no raw placeholder titles', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const last = hasAchievements
      ? 'APP-ACHIEVEMENTS-SECTION'
      : hasCampaignLog
        ? 'APP-CAMPAIGN-LOG-SECTION'
        : 'APP-PROJECT-INVENTORY-SECTION';
    expect(el.querySelector('main')?.lastElementChild?.tagName).toBe(last);
    expect(el.textContent).not.toMatch(/CURRENT MAIN QUEST|SIDE QUESTS|CAMPAIGN CONTINUES/);
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
