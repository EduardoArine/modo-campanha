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
