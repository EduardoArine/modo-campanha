import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  // Link "pular para o conteúdo" (D-060): primeiro foco da página, leva ao <main> sem mudar a URL.
  it('skips to the main content without changing the URL', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/en');
    await fixture.whenStable();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const skip = el.querySelector<HTMLAnchorElement>('a.skip-link')!;

    expect(el.firstElementChild).toBe(skip);
    expect(skip.textContent?.trim()).toBe('Skip to content');
    skip.click();
    expect(document.activeElement?.id).toBe('main-content');
    expect(router.url).toBe('/en');
  });

  // A navegação só expõe destinos que existem (D-047).
  it('points every header nav item to a section rendered on the Home', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const fragments = Array.from(el.querySelectorAll('app-site-header nav a')).map(
      (a) => a.getAttribute('href')?.split('#')[1],
    );

    expect(fragments).toEqual([
      'player-status',
      'project-inventory',
      'campaign-log',
      'final-checkpoint',
    ]);
    for (const id of fragments) {
      expect(el.querySelector(`main section#${id}`)).not.toBeNull();
    }
  });

  // O footer pertence à Home (D-052), não ao shell. Os testes rodam na configuração
  // `development`, onde a rota do showcase existe.
  it('renders the footer on the Home only, never on the design system showcase', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const el = fixture.nativeElement as HTMLElement;
    const visit = async (url: string) => {
      await router.navigateByUrl(url);
      await fixture.whenStable();
      fixture.detectChanges();
    };

    await visit('/');
    expect(el.querySelectorAll('app-site-footer').length).toBe(1);

    await visit('/dev/design-system');
    expect(el.querySelector('app-design-system-page')).not.toBeNull();
    expect(el.querySelector('app-site-footer')).toBeNull();
  });
});
