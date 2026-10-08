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
| Idiomas         | pt-BR (padrão) + en, troca em runtime (D-018)      |
| i18n            | solução própria com signals, URL como fonte da verdade (D-020) |
| Fontes          | Pixelify Sans + IBM Plex Sans, WOFF2 self-hosted em `src/styles/fonts/` (D-022, D-023) |
| Design tokens   | SCSS em `src/styles/tokens/`, emitidos como `--mc-*` (docs/11) |

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
    core/                 # infraestrutura transversal: i18n/ (LocaleService, dicionários); futuramente boot, konami
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
  styles/                 # tokens/ (SCSS), fonts/, parciais globais; entrada para componentes: _mc.scss (docs/11)
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

- Primitivos de UI em `src/app/shared/ui/` (`mc-icon`, `mcAction`, `mc-chip`, `mc-status`, `mc-section-header`); importar do barrel `shared/ui`. API em `docs/11`.
- **Rotas de desenvolvimento** (D-028): `src/app/dev/dev.routes.ts` é vazio em produção; a configuração `development` troca por `dev.routes.development.ts` (`fileReplacements` no `angular.json`). Fontes do showcase excluídas do `tsconfig.app.json`; o deploy falha se o showcase aparecer no bundle. Novas páginas internas seguem o mesmo padrão.

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

- `<html lang>` acompanha o idioma ativo; o seletor de idioma mostra cada opção no próprio idioma ("Português", "English") com `lang` no elemento.
- Textos de acessibilidade (`aria-label`, `alt`) também são traduzidos.

## i18n

> Status: **aprovada (D-020) e implementada** em `src/app/core/i18n/`.

Requisitos (D-018): pt-BR padrão + en; troca em runtime; todo conteúdo relevante nos dois idiomas; nenhum texto hardcoded em componentes finais; tipado; SEO e acessibilidade considerados.

### Alternativas avaliadas

| Critério                       | Signals + dicionários próprios | Angular i18n nativo (`$localize`) | Transloco / ngx-translate |
| ------------------------------ | ------------------------------ | --------------------------------- | ------------------------- |
| Troca em runtime sem reload    | ✅                              | ❌ (um build por idioma)           | ✅                         |
| Tipagem / tradução faltando quebra o build | ✅ total            | 🟡 (extração + XLIFF)             | ❌ chaves string (sem tooling extra) |
| Dependências novas             | nenhuma                        | `@angular/localize`               | 1 lib                     |
| Conteúdo estruturado (`data/`) | ✅ natural (`Localized<T>`)     | ❌ desajeitado                     | 🟡 JSON separado do dado  |
| SEO                            | 🟡 SPA (mitigável, ver abaixo)  | ✅ HTML estático por idioma        | 🟡 SPA                    |
| Escala para muitos idiomas / tradutores não-devs | 🟡            | ✅                                 | ✅                         |
| Complexidade para 2 idiomas    | baixa                          | média-alta (2 builds, deploy)      | média                     |

**Escolhida:** signals + dicionários próprios. Reavaliar Transloco apenas se houver mais de 3 idiomas ou tradução feita por terceiros.

### Implementação (aprovada, D-020)

```
src/app/core/i18n/
  locale.ts             # LOCALES, Locale, DEFAULT_LOCALE, Localized<T>, localeFromUrl(), localizedUrl()
  ui.pt-BR.ts           # dicionário de UI pt-BR; define o tipo UiDictionary
  ui.en.ts              # dicionário en: UI_EN: UiDictionary (chave faltando/sobrando quebra o build)
  locale.service.ts     # LocaleService
  index.ts
```

- **A URL é a fonte da verdade.** Rotas: `/` → pt-BR, `/en` → en (`app.routes.ts`). `LocaleService.locale` é um signal derivado dos `NavigationEnd` do Router. Não existe `setLocale()`: trocar idioma = navegar (`switchTo(locale)` / `urlFor(locale)`, que preservam caminho, query e fragmento).
- `localStorage` **não** é usado. No futuro poderá apenas sugerir uma preferência, sem substituir a URL nem impedir deep links.
- `LocaleService.ui`: `computed` com o dicionário do idioma ativo. Componentes fazem `protected readonly ui = inject(LocaleService).ui;` e usam `{{ ui().sections.playerStatus }}`.
- `LocaleService.pick(localized)`: resolve conteúdo `Localized<T>` no idioma ativo.
- Um `effect` sincroniza `<html lang>`, `document.title` e `<meta name="description">`. Instanciado no boot via `provideAppInitializer` (`app.config.ts`).
- `aria-label`, `alt` e metadados futuros (Open Graph) também vêm do dicionário / conteúdo `Localized`.
- **Todos** os textos passam pelo dicionário, inclusive labels de sistema (`PLAYER STATUS` tem o mesmo valor nos dois idiomas por decisão de conteúdo).
- Os textos do Hero no dicionário são provisórios até existir o modelo `PlayerProfile` (docs/07). Traduções en aprovadas por Eduardo até aqui: "XP real, sem personagem." → **"Real XP. No persona."** (nunca "no character", que muda o sentido) e "Desenvolvedor de Produtos Digitais" → **"Digital Product Developer"**; refináveis na FASE 7.
- Testes: `locale.spec.ts` (funções de URL), `locale.service.spec.ts` (lang/título), `home-page.spec.ts` (renderização em `/en` e `/`).

### URL, SEO e GitHub Pages

- pt-BR em `/modo-campanha/`, en em `/modo-campanha/en`.
- O workflow de deploy copia `index.html` para `en/index.html` (resposta 200 em vez do 404 do fallback).
- **FASE 8:** prerender estático das duas versões (avaliar `@angular/ssr` só em build), `hreflang`, Open Graph por idioma. Até lá, o HTML estático inicial é pt-BR.

## Performance

- Rota principal com lazy loading (`loadComponent`).
- Budgets do `angular.json` mantidos (500 kB warning / 1 MB erro inicial).
- Imagens otimizadas (WebP/AVIF), `NgOptimizedImage` quando houver screenshots.
- Fontes self-hosted (`src/styles/fonts/`, WOFF2 variável, subset latin, ~57 kB no total), empacotadas com hash pelo build (D-023), `font-display: swap`. Preload da fonte do Hero na FASE 8. Sem Google Fonts em runtime e sem pacote npm de fontes.
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
