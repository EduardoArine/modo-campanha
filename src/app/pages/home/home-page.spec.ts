import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from '../../app.routes';
import { CAMPAIGN_LOG_CHAPTERS } from '../../data';
import { HomePage } from './home-page';

// O Diário usa a mesma fonte real em todos os ambientes (D-074). Conquistas, Missão principal
// atual e Missões secundárias saíram da Home (D-097).
const hasCampaignLog = CAMPAIGN_LOG_CHAPTERS.length > 0;

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
      'final-checkpoint',
    ]);
  });

  it('should end with the Final Checkpoint, with no raw placeholder titles', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    // O Final Checkpoint é sempre a última seção da Home (D-052).
    expect(el.querySelector('main')?.lastElementChild?.tagName).toBe(
      'APP-FINAL-CHECKPOINT-SECTION',
    );
    expect(el.querySelector('#achievements, #current-quest, #side-quests')).toBeNull();
  });

  it('should close the page with the footer right after main, outside it', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const main = el.querySelector('main')!;

    expect(main.nextElementSibling?.tagName).toBe('APP-SITE-FOOTER');
    expect(el.lastElementChild?.tagName).toBe('APP-SITE-FOOTER');
    expect(main.querySelector('footer')).toBeNull();
    expect(el.querySelectorAll('footer').length).toBe(1);
  });

  it('should render texts in the locale of the URL', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/en', HomePage);
    expect(harness.routeNativeElement?.textContent).toContain('PROFESSIONAL PORTFOLIO');

    await harness.navigateByUrl('/');
    expect(harness.routeNativeElement?.textContent).toContain('PORTFÓLIO PROFISSIONAL');
  });
});
