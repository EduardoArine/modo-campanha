import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { CAMPAIGN_LOG } from '../../data';
import { HomePage } from './home-page';

// Os testes rodam na configuração `development`: o Campaign Log usa o MOCK (D-049). Em
// produção a lista publicada é vazia e a seção não é renderizada.
const hasCampaignLog = CAMPAIGN_LOG.length > 0;

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
    ]);
  });

  it('should end after the last built section, with no raw placeholder titles', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('main')?.lastElementChild?.tagName).toBe(
      hasCampaignLog ? 'APP-CAMPAIGN-LOG-SECTION' : 'APP-PROJECT-INVENTORY-SECTION',
    );
    expect(el.textContent).not.toMatch(
      /ACHIEVEMENTS|CURRENT MAIN QUEST|SIDE QUESTS|CAMPAIGN CONTINUES/,
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
