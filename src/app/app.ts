import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SiteHeader } from './core/layout/site-header/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader],
  template: '<app-site-header /><router-outlet />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
