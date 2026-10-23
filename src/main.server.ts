import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { config } from './app/app.config.server';

// Entrada do servidor, usada só no build para pré-renderizar a Home (D-098). Não há servidor em
// produção: o GitHub Pages serve os HTML estáticos gerados.
const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, config, context);

export default bootstrap;
