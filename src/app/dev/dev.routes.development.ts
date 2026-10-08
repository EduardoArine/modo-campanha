import { Routes } from '@angular/router';

// Rotas exclusivas de desenvolvimento. Só entram no build via `fileReplacements`
// (configuração `development`). Ver docs/06-technical-architecture.md.
const loadDesignSystem = () =>
  import('./design-system/design-system-page').then((m) => m.DesignSystemPage);

export const DEV_ROUTES: Routes = [
  { path: 'dev/design-system', loadComponent: loadDesignSystem },
  { path: 'en/dev/design-system', loadComponent: loadDesignSystem },
];
