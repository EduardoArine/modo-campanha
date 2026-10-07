# 06 — Arquitetura Técnica

## Stack

| Item            | Versão / escolha                                   |
| --------------- | -------------------------------------------------- |
| Angular         | 21.2 (ver decisão D-009 sobre Angular 22)          |
| TypeScript      | 5.9                                                |
| Estilos         | SCSS                                               |
| Testes          | Vitest (padrão do Angular 21, via `ng test`)       |
| Formatação      | Prettier (`.prettierrc` gerado pelo CLI)           |
| Builder         | `@angular/build:application` (esbuild)             |
| Gerenciador     | npm                                                |
| Node.js local   | 22.14                                              |
| Hospedagem      | GitHub Pages via GitHub Actions                    |

Sem biblioteca de UI, sem biblioteca de animação, sem backend, sem CMS, sem analytics. Adicionar qualquer uma delas exige registro em `docs/10-decisions.md`.

## Princípios

- **Standalone components** (padrão do Angular moderno; sem NgModules).
- **Signals** para estado local (`signal`, `input`, `computed`).
- **`ChangeDetectionStrategy.OnPush`** em todos os componentes.
- Control flow nativo (`@if`, `@for`).
- **Simplicidade**: sem state management externo, sem camadas desnecessárias. O conteúdo é estático e vive em `src/app/data/`.

## Estrutura

```
src/
  app/
    core/                 # infraestrutura transversal (boot, konami listener, serviços globais)
    shared/               # componentes/utilitários reutilizáveis (pixel-title, panel, badge...)
    features/             # uma pasta por seção da onepage
      hero/
      player-status/
      skill-tree/
      project-inventory/
      crt-project-viewer/
      campaign-log/
      achievements/
      current-quest/
      side-quests/
      final-checkpoint/
    pages/
      home/               # compõe as seções na ordem de docs/03
    models/               # interfaces TypeScript do conteúdo
    data/                 # conteúdo estático tipado
    app.ts | app.config.ts | app.routes.ts
  styles/                 # parciais SCSS globais (_base.scss; tokens na FASE 2)
  styles.scss             # entrada global de estilos
public/
  assets/
    images/ icons/ projects/ cartridges/ pixel/
```

### Observação sobre `assets`

O Angular 21 usa a pasta `public/` (copiada para a raiz do build) no lugar do antigo `src/assets/`. Por isso os assets ficam em `public/assets/...` e são referenciados como `assets/...` (caminho relativo, compatível com o `base-href`).

### Convenções

- Arquivos sem sufixo de tipo, conforme o estilo do Angular 21: `hero-section.ts` → classe `HeroSection`.
- Seções: `<nome>-section.ts`, seletor `app-<nome>-section`, `<section id="<nome>">` com `aria-labelledby`.
- Templates e estilos inline enquanto pequenos; extrair para `.html`/`.scss` quando crescerem.
- Barrel files (`index.ts`) apenas em `models/` e `data/`.
- Comentários e documentação em português; código (nomes) em inglês.

## Componentização

- Cada seção é dona do seu layout e lê seus dados de `data/`.
- Elementos visuais repetidos entre seções (títulos pixel, painéis HUD, badges, botões) vão para `shared/` quando aparecerem **pela segunda vez**, não antes.
- `CrtProjectViewer` é um componente "burro": recebe `project` por input; a seleção é responsabilidade do `ProjectInventorySection`.

## Models e data

- Interfaces em `src/app/models/` (ver `docs/07-content-model.md`).
- Conteúdo em `src/app/data/*.data.ts`, tipado.
- Se o conteúdo crescer muito, migrar para JSON em `public/` e carregar via `HttpClient`/`resource()`. Não necessário por enquanto.

## Estratégia futura de animação

Decisão adiada para a FASE 5. Ordem de preferência:

1. **CSS** (transitions, keyframes, `@starting-style`, View Transitions API) para microinterações e boot.
2. **Angular** (`animate.enter` / `animate.leave` nativos do Angular 20+) para entrada/saída de elementos.
3. Biblioteca externa **somente** se a animação do cartucho exigir algo que 1 e 2 não resolvam, com registro de decisão.

Regras: toda animação respeita `prefers-reduced-motion` (já existe regra global em `src/styles/_base.scss`), não bloqueia interação e tem duração curta.

## Responsividade

- Mobile-first.
- A metáfora prateleira → console → TV precisa de uma versão mobile (provavelmente vertical/simplificada), definida na FASE 1/2.
- Sem scroll horizontal.

## Acessibilidade

- HTML semântico: `main`, `section` com `aria-labelledby`, um único `h1` (Hero).
- Foco visível e navegação completa por teclado (inclusive cartuchos).
- Contraste WCAG AA.
- Fontes pixel nunca para texto longo.
- `prefers-reduced-motion` respeitado.
- Easter eggs nunca necessários para acessar conteúdo.
- `lang="pt-BR"` no documento.

## Performance

- Rota principal com lazy loading (`loadComponent`).
- Budgets do `angular.json` mantidos (500 kB warning / 1 MB erro inicial).
- Imagens otimizadas (WebP/AVIF), `NgOptimizedImage` quando houver screenshots.
- Fontes self-hosted com `font-display: swap` e subset.
- Meta Lighthouse ≥ 90 em todas as categorias (FASE 8).

## GitHub Pages

- Workflow: `.github/workflows/deploy-pages.yml` (Actions oficiais `configure-pages`, `upload-pages-artifact`, `deploy-pages`).
- **Disparo manual** (`workflow_dispatch`) para não publicar conteúdo incompleto.
- Build: `npm run build:gh-pages` → `ng build --base-href /modo-campanha/`.
- Saída: `dist/modo-campanha/browser`.
- `404.html` = cópia de `index.html` (fallback de SPA para rotas futuras).

### Ativação

1. GitHub → repositório → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. **Actions → Deploy to GitHub Pages → Run workflow**.
3. URL: `https://eduardoarine.github.io/modo-campanha/`.

Para publicar automaticamente a cada push na `main`, adicionar ao workflow:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
```

### Adaptação para `<username>.github.io` ou domínio próprio

Se o site migrar para o repositório `EduardoArine.github.io` (servido na raiz) ou para um domínio próprio:

1. Alterar o script `build:gh-pages` para `ng build --base-href /` (ou usar apenas `ng build`).
2. Domínio próprio: adicionar `public/CNAME` com o domínio e configurar DNS conforme a documentação do GitHub Pages.
3. Atualizar URLs em `README.md`, `CLAUDE.md` e metadados (SEO/Open Graph).
4. Registrar a mudança em `docs/10-decisions.md`.
