# 11 — MC Design System

> Transforma a direção aprovada (**Concept 03 — Approved as Hybrid**, D-011) em regras implementáveis.
> Se este documento crescer demais, separar em `docs/design-system/*.md`.

## Estado da Fase 2

| #   | Fundamento               | Status                                                        |
| --- | ------------------------ | ------------------------------------------------------------- |
| 1   | Colors                   | ✅ Aprovado e implementado (D-014, D-024, D-025)              |
| 2   | Typography               | ✅ Aprovada e implementada (D-022)                             |
| 3   | Grid                     | ✅ Aprovado e implementado (D-022)                             |
| 4   | Spacing                  | ✅ Aprovado e implementado (D-022)                             |
| 5   | Borders                  | ✅ Aprovado e implementado (D-024)                             |
| 6   | Surfaces                 | ✅ Aprovado e implementado (D-024)                             |
| 7   | Icons                    | 🟡 Proposta Sprint 3 (setas ↗ → não existem nas fontes: SVG)  |
| 8   | Buttons                  | 🟡 Proposta Sprint 3                                           |
| 9   | Labels / Chips           | 🟡 Proposta Sprint 3                                           |
| 10  | Status                   | 🟡 Proposta Sprint 3                                           |
| 11  | Player Card              | ⬜ backlog (regras de conteúdo em D-017)                       |
| 12  | MC-CART                  | ⬜ backlog (direção em D-013)                                  |
| 13  | CRT                      | ⬜ backlog                                                     |
| 14  | XP                       | ⬜ backlog (regras conceituais em D-021)                       |
| 15  | Motion                   | ⬜ backlog                                                     |
| 16  | Easter Egg Language      | ⬜ backlog                                                     |
| 17  | Responsive behavior      | ⬜ backlog (base definida em Grid)                             |
| 18  | Accessibility            | 🟡 parcial: contratos de contraste e foco implementados (D-025) |
| 19  | i18n / content behavior  | ✅ Arquitetura aprovada e implementada (D-020)                 |

- **Sprint 1 (concluído):** Typography + Grid + Spacing + infraestrutura de i18n.
- **Sprint 2 (concluído):** Colors + Borders + Surfaces + contratos de contraste.
- **Sprint 3 (proposta):** Icons + Buttons + Labels/Chips + Status. Não iniciado.

---

## Princípios

1. **Retro na linguagem. Moderno na experiência.** ~30% retro/pixel, ~70% produto moderno.
2. **O sistema fala a linguagem dos videogames; Eduardo fala como pessoa.** Labels de sistema usam a voz do sistema; conteúdo humano usa a voz de leitura. **Todos** os textos, inclusive labels de sistema, passam pelo modelo de tradução (D-018, D-020).
3. **Estrutura do 03-A, atmosfera do 03-B.**
4. **Espaço e linhas antes de caixas.** Caixas só para objetos "físicos" (Player Card, MC-CART, CRT) e camadas interativas.
5. **70 / 20 / 10.** 70% neutros escuros, 20% laranja/quentes, 10% complementares/status.
6. **Poucos tokens, bem usados.** Escalas fechadas; valor novo exige decisão.
7. **O grid organiza; ele não obriga simetria.**
8. **Acessível por padrão.** WCAG AA, foco visível, teclado, `prefers-reduced-motion`, tamanho de fonte do usuário respeitado (tipografia em `rem`).

---

## Implementação

```
src/styles/
  _mc.scss                 # entrada para componentes: @use 'mc' as *;  (só tokens, sem CSS)
  tokens/
    _breakpoints.scss      # $breakpoints, mixin mq(md|lg)
    _spacing.scss          # $space (primitivos), $space-semantic (aliases), função space(n)
    _typography.scss       # famílias, $type-roles, função fluid(), mixin type(role)
    _grid.scss             # $container-max, $columns, mixins page-grid e columns
    _color.scss            # primitivos + semânticos (Sprint 2; não encaminhado aos componentes)
    _surface.scss          # border widths, radii, foco, mixin focus-ring (Sprint 2)
    _contrast.scss         # supported color pairs + verificação na compilação (Sprint 2)
  _custom-properties.scss  # emite todos os tokens como --mc-* em :root (uma vez)
  _fonts.scss              # @font-face (WOFF2 self-hosted)
  _layout.scss             # classes .mc-page-grid e .mc-columns
  _base.scss               # reset mínimo + body com type(body)
  fonts/                   # pixelify-sans-latin.woff2, ibm-plex-sans-latin.woff2
src/styles.scss            # fonts → custom-properties → base → layout
```

- `angular.json` → `stylePreprocessorOptions.includePaths: ["src/styles"]`, então qualquer componente usa `@use 'mc' as *;`.
- Arquivos em `tokens/` **não geram CSS**; só `styles.scss` emite CSS global, o que evita duplicação nos componentes.
- Uso em componente:

```scss
@use 'mc' as *;

.title { @include type(display-section); }
.layout {
  @include columns;
  gap: space(5);
  @include mq(lg) { /* ... */ }
}
```

---

## 1. Colors

### Paleta-base (aprovada, D-014)

| Papel              | HEX       |
| ------------------ | --------- |
| Brand              | `#F28C28` |
| Brand dark         | `#C96A1B` |
| Brand light        | `#FFB357` |
| Special / gold     | `#F2C14E` |
| Background main    | `#14110F` |
| Surface            | `#1D1815` |
| Panel              | `#231F1C` |
| Elevated           | `#2B2521` |
| Text primary       | `#F3E9D2` |
| Text secondary     | `#D7CBB5` |
| Text muted         | `#A89A86` |
| Petrol blue        | `#1F3A4A` |
| Teal               | `#3FA7A3` |
| Success / XP       | `#7FB069` |
| Danger             | `#C44536` |

### Contraste medido (WCAG 2.x)

| Cor sobre →          | bg `#14110F` | surface | panel   | elevated |
| -------------------- | ------------ | ------- | ------- | -------- |
| text `#F3E9D2`       | 15.6         | 14.6    | 13.6    | 12.5     |
| text-2 `#D7CBB5`     | 11.7         | 11.0    | 10.2    | 9.4      |
| muted `#A89A86`      | 6.8          | 6.4     | 5.9     | 5.5      |
| brand `#F28C28`      | 7.7          | 7.2     | 6.7     | 6.2      |
| brand-dark `#C96A1B` | 5.0          | 4.7     | **4.3** | **4.0**  |
| brand-light `#FFB357`| 10.6         | 9.9     | 9.2     | 8.5      |
| gold `#F2C14E`       | 11.2         | 10.5    | 9.7     | 9.0      |
| teal `#3FA7A3`       | 6.5          | 6.1     | 5.7     | 5.2      |
| success `#7FB069`    | 7.5          | 7.0     | 6.5     | 6.0      |
| danger `#C44536`     | **3.8**      | **3.6** | **3.3** | **3.1**  |

Sobre petrol `#1F3A4A`: text 9.9 · text-2 7.4 · brand-light 6.7 · **teal 4.1** (não usar teal como texto pequeno sobre petrol).

Restrições aprovadas (`#C96A1B` nunca como texto pequeno; `#C44536` nunca como texto; petrol como superfície; botão `#F28C28` com texto escuro; chips frios com texto creme) viraram regras de token e contratos automatizados no Sprint 2 abaixo.

---

## 2. Typography (APROVADA, D-022)

### Famílias e arquivos

| Família        | Arquivo                                   | Eixo                | Tamanho  | Uso                                                                 |
| -------------- | ----------------------------------------- | ------------------- | -------- | ------------------------------------------------------------------- |
| Pixelify Sans  | `src/styles/fonts/pixelify-sans-latin.woff2` | `wght` 400–700 (variável) | 11.7 kB | voz do sistema, **a partir de ~14 px**                     |
| IBM Plex Sans  | `src/styles/fonts/ibm-plex-sans-latin.woff2` | `wght` 100–700 (variável) | 44.6 kB | voz do Eduardo + micro-labels de 12–13 px                  |

- Fonte: Google Fonts (SIL OFL), subset **latin** (U+0000–00FF + pontuação): cobre pt-BR e en sem precisar de latin-ext.
- **Validado** (fontkit): `ã á é í ó ú ç ê ô õ à â` e maiúsculas presentes nas duas famílias. **Ausentes:** `↗ →` (e `↓` na Pixelify) → usar ícones SVG.
- Cada família é **um único arquivo variável** (o Google não serve estáticos separados); pesos usados de fato: Pixelify 500/700, Plex 400/500/600.
- Empacotadas pelo build (`url()` relativo no Sass → `media/<nome>-<hash>.woff2`), o que dá cache longo e funciona com qualquer `base-href`. Sem Google Fonts em runtime e sem pacote npm (D-023).
- `font-display: swap`; `font-synthesis: none` no `body` (sem negrito/itálico falso).

Fallbacks (`--mc-font-display`, `--mc-font-text`):

```
'Pixelify Sans', ui-monospace, 'Cascadia Mono', 'Courier New', monospace
'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif
```

### Regra de nitidez

Pixelify Sans **não** é obrigatória em labels muito pequenos. Abaixo de ~14 px, micro-labels de sistema (ORIGIN, XP, ACTIVE, CLASS) usam **IBM Plex Sans** em caixa alta com tracking. Pixelify fica com títulos, headings de seção, MC-CART, códigos e elementos de sistema ≥ 14 px.

### Escala (papéis em `$type-roles`)

Fluida entre viewport 360 px e 1200 px (`clamp()` em `rem`). Custom property: `--mc-font-size-<papel>`. Mixin: `@include type(<papel>)`.

| Papel             | Família | Mobile → Desktop | Line-height | Tracking  | Peso | Caixa | Aplicação                                         |
| ----------------- | ------- | ---------------- | ----------- | --------- | ---- | ----- | ------------------------------------------------- |
| `display-hero`    | Pixelify | 48 → 96 px      | 0.95        | 0         | 700  | UPPER | MODO CAMPANHA                                     |
| `display-section` | Pixelify | 28 → 40 px      | 1.1         | 0.02em    | 700  | UPPER | PLAYER STATUS, PROJECT INVENTORY                  |
| `display-cart`    | Pixelify | 14 → 16 px      | 1.15        | 0.02em    | 700  | UPPER | Nome no rótulo do MC-CART                         |
| `system`          | Pixelify | 14 px           | 1.3         | 0.06em    | 500  | UPPER | MC-01, MC-CART, ON-001, códigos ≥ 14 px           |
| `label`           | Plex    | 12 → 13 px       | 1.3         | 0.08em    | 500  | UPPER | Micro-labels: ORIGIN, XP, CLASS, ACTIVE           |
| `name`            | Plex    | 36 → 56 px       | 1.05        | −0.02em   | 600  | —     | Eduardo Arine                                     |
| `title-l`         | Plex    | 20 → 24 px       | 1.3         | −0.01em   | 400  | —     | Cargo                                             |
| `title-m`         | Plex    | 18 → 20 px       | 1.35        | −0.005em  | 600  | —     | Nome do projeto, "Sobre a jornada", "XP real..."  |
| `body-l`          | Plex    | 17 → 18 px       | 1.6         | 0         | 400  | —     | Parágrafo do Hero                                 |
| `body`            | Plex    | 16 px            | 1.6         | 0         | 400  | —     | Parágrafos (padrão do `body`)                     |
| `body-s`          | Plex    | 14 px            | 1.5         | 0         | 400  | —     | Descrições curtas, valores, navegação             |
| `caption`         | Plex    | 12 px            | 1.4         | 0.01em    | 500  | —     | Chips/tags, metadados                             |

Regras: mínimo absoluto 12 px; corpo ≤ 65ch; tracking positivo só em caixa alta; escala é base e pode ser refinada visualmente na FASE 3 (registrar ajustes aqui).

---

## 3. Grid (APROVADO, D-022)

| Token                 | Valor                                       |
| --------------------- | ------------------------------------------- |
| `--mc-container-max`  | 1200 px                                     |
| `--mc-page-margin`    | `clamp(16px, 4vw, 48px)` (via `--mc-space-4`/`--mc-space-7`) |
| `--mc-gutter`         | 16 px (base) · 24 px (≥ 768 px)             |
| `--mc-columns`        | 4 (base) · 8 (≥ 768 px) · 12 (≥ 1024 px)    |

- `@include page-grid` / `.mc-page-grid`: linhas nomeadas `full` e `content`; filhos em `content`; sangria com `grid-column: full` ou `content-start / full-end`.
- `@include columns` / `.mc-columns`: `repeat(var(--mc-columns), minmax(0, 1fr))` com `gap: var(--mc-gutter)`.
- **O grid organiza; ele não obriga simetria.** As seções escolhem seus spans. Composições iniciais aprovadas:
  - Hero: 6 / 6 (texto | visual, visual pode sangrar à direita).
  - Player Status: 4 / 4 / 4 como ponto de partida; 3 / 4 / 5 ou outra divisão é válida se o conteúdo real pedir.
  - Project Inventory: **grid, sem carrossel**: 4 por linha (desktop) · 2 (tablet) · **1 (mobile, baseline)**. Testar 2 por linha no mobile depois.
- Hero não ocupa 100vh; sem scroll horizontal em nenhum breakpoint.

---

## 4. Spacing (APROVADO, D-022)

### Primitivos (`--mc-space-1` … `--mc-space-10`, função `space(n)`)

| Token | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| ----- | - | - | - | - | - | - | - | - | - | -- |
| px    | 4 | 8 | 12 | 16 | 24 | 32 | 48 | 64 | 96 | 128 |

Escala **fechada**: não adicionar valores sem nova decisão.

### Aliases semânticos (`$space-semantic` → `--mc-space-<nome>`)

Sempre referenciam primitivos, sem duplicar valores.

| Grupo         | Alias                    | Valor                                            | Status          |
| ------------- | ------------------------ | ------------------------------------------------ | --------------- |
| section       | `--mc-space-section`     | `clamp(var(--mc-space-8), 8vw, var(--mc-space-9))` (64–96) | definido |
| section       | `--mc-space-section-head`| `clamp(var(--mc-space-6), 4vw, var(--mc-space-7))` (32–48) | definido |
| block         | `--mc-space-block-*`     | (ex.: parágrafo → CTAs)                          | a definir na FASE 3 |
| component     | `--mc-space-component-*` | (ex.: padding de card, botão, chip)              | a definir na FASE 3 |

### Exemplos de aplicação (referência para os aliases futuros)

| Situação                                                   | Primitivo                 |
| ---------------------------------------------------------- | ------------------------- |
| Ícone ↔ texto; bolinha de status ↔ ACTIVE                  | 2 (8)                     |
| Label ↔ valor no Player Status                             | 1–2 (4–8)                 |
| Chip: padding                                              | 1 × 3 (4 × 12)            |
| Botão: padding                                             | 3 × 5 (12 × 24)           |
| Padding do Player Card                                     | 5 (24)                    |
| Itens de dados do Player Status (com divisor)              | 5 (24)                    |
| Cartucho → nome do projeto                                 | 4 (16)                    |
| "MODO CAMPANHA" → "Eduardo Arine"                          | 4 (16)                    |
| Parágrafo → CTAs                                           | 6 (32)                    |
| Topo do Hero                                               | 8 → 10                    |

---

## Sprint 2 — Colors + Borders + Surfaces (APROVADO e implementado, D-024)

Arquivos: `src/styles/tokens/_color.scss` (primitivos + semânticos), `_surface.scss` (borders, radius, foco), `_contrast.scss` (contratos), emitidos em `_custom-properties.scss`; regras globais em `_base.scss`. **Nenhum HEX novo**: tudo deriva da paleta D-014; camadas translúcidas usam `color-mix()`.

### 5. Colors: duas camadas

**Primitivos** (`--mc-color-*`): `orange-300` `orange-500` `orange-700` `gold-400` `ink-950` `ink-900` `ink-850` `ink-800` `cream-100` `cream-300` `cream-500` `petrol-800` `teal-500` `green-500` `red-600`.
Uso exclusivo dentro de `src/styles/tokens/`. O `_mc.scss` **não** encaminha cores para componentes.

**Semânticos** (`--mc-*`): os únicos permitidos em componentes, sempre via `var(--mc-<token>)`.

| Grupo        | Token                    | Valor                    | Uso                                                        | Proibido                                         |
| ------------ | ------------------------ | ------------------------ | ---------------------------------------------------------- | ------------------------------------------------ |
| Superfícies  | `--mc-bg`                | ink-950                  | página (nível 0)                                           | —                                                |
|              | `--mc-surface`           | ink-900                  | header (nível 1)                                           | —                                                |
|              | `--mc-panel`             | ink-850                  | Player Card, painéis (nível 2)                             | —                                                |
|              | `--mc-elevated`          | ink-800                  | menus, tooltips (nível 3)                                  | —                                                |
| Texto        | `--mc-text`              | cream-100                | títulos, nome, texto principal                             | —                                                |
|              | `--mc-text-secondary`    | cream-300                | parágrafos, cargo, descrições                              | —                                                |
|              | `--mc-text-muted`        | cream-500                | micro-labels, metadados                                    | texto essencial longo                            |
|              | `--mc-text-on-accent`    | ink-950                  | texto sobre accent / accent-hover / accent-active          | —                                                |
|              | `--mc-text-on-cool`      | cream-300                | texto de chips frios sobre `--mc-cool-surface`             | —                                                |
| Acento       | `--mc-accent`            | orange-500               | MODO CAMPANHA, marcador de seção, CTA primário, nav ativa  | fundo de seção, glow genérico                    |
|              | `--mc-accent-hover`      | orange-300               | hover do CTA primário                                      | —                                                |
|              | `--mc-accent-active`     | orange-700               | CTA pressionado (com `--mc-text-on-accent`)                | **texto < 24 px** (ou < 18.66 px bold)           |
| Links        | `--mc-link`              | orange-500               | links em texto                                             | —                                                |
|              | `--mc-link-hover`        | orange-300               | hover de links                                             | —                                                |
| Foco         | `--mc-focus-ring`        | orange-300               | anel de foco por teclado (contrato próprio)                | ser o único indicador visual além do outline     |
| Interação    | `--mc-interactive-hover` | cream-100 a 6%           | hover de elementos neutros (nav, cartucho, botão secundário) | —                                              |
|              | `--mc-interactive-active`| cream-100 a 10%          | pressionado de elementos neutros                           | —                                                |
| Desabilitado | `--mc-disabled-bg`       | cream-100 a 4%           | fundo de controle desabilitado                             | —                                                |
|              | `--mc-disabled-text`     | cream-500                | texto de controle desabilitado                             | —                                                |
|              | `--mc-disabled-border`   | cream-100 a 12%          | borda de controle desabilitado                             | —                                                |
| Especial     | `--mc-special`           | gold-400                 | achievements, raridade, `featured`                         | decoração genérica                               |
| Frios        | `--mc-cool-surface`      | petrol-800               | fundo de chips/labels frios                                | **texto**                                        |
|              | `--mc-cool`              | teal-500                 | ícones, bordas, texto sobre bg/panel                       | texto pequeno sobre `cool-surface` (4.1)         |
| Status       | `--mc-status-online`     | green-500                | ONLINE / ACTIVE / XP                                       | —                                                |
|              | `--mc-status-danger`     | red-600                  | ícone, borda, indicador de erro                            | **qualquer texto**                               |
| Bordas       | `--mc-border-subtle`     | cream-100 a 12%          | divisores decorativos                                      | limite de controle interativo                    |
|              | `--mc-border-default`    | cream-100 a 40%          | limite de controles interativos                            | —                                                |
|              | `--mc-border-accent`     | orange-700               | Player Card (decorativa), chips quentes                    | único indicador de estado                        |
|              | `--mc-border-cool`       | teal-500                 | chips frios                                                | —                                                |

### Supported color pairs (contratos de contraste)

O sistema mantém uma **lista explícita** dos pares que permite usar (`$supported-pairs` em `_contrast.scss`). Ela é verificada **na compilação do CSS global**: se algum par cair abaixo do mínimo do seu tipo, `npm run build` e `npm test` falham com a mensagem `Contrato de contraste violado: <token> sobre <fundo> = N:1`. Única fonte de verdade: os próprios tokens Sass. Pares fora da lista **não são suportados** e não precisam passar. Para usar uma combinação nova, adicioná-la à lista (e ela precisa passar).

Mínimos: `text` 4.5:1 · `large-text` 3:1 (≥ 24 px ou ≥ 18.66 px bold) · `non-text` 3:1 (WCAG 1.4.11). Camadas translúcidas são compostas sobre a superfície indicada.

| Primeiro plano            | Fundo(s)                                   | Tipo        | Menor razão |
| ------------------------- | ------------------------------------------ | ----------- | ----------- |
| `text`                    | bg, surface, panel, elevated               | text        | 12.5        |
| `text-secondary`          | bg, surface, panel, elevated               | text        | 9.4         |
| `text-muted`              | bg, surface, panel, elevated               | text        | 5.5         |
| `accent`                  | bg, surface, panel, elevated               | text        | 6.2         |
| `accent-active`           | bg, panel                                  | large-text  | 4.3         |
| `text-on-accent`          | accent, accent-hover, accent-active        | text        | 5.0         |
| `link`                    | bg, surface, panel                         | text        | 6.7         |
| `link-hover`              | bg, surface, panel                         | text        | 9.2         |
| `text`                    | interactive-hover / -active sobre bg e panel | text      | 10.3        |
| `disabled-text`           | disabled-bg sobre bg e panel               | text        | 5.4         |
| `special`                 | bg, panel                                  | text        | 9.7         |
| `text-on-cool`, `text`    | cool-surface                               | text        | 7.4         |
| `cool`                    | bg, panel                                  | text        | 5.7         |
| `status-online`           | bg, panel                                  | text        | 6.5         |
| `status-danger`           | bg, surface, panel                         | non-text    | 3.3         |
| `focus-ring`              | bg, surface, panel, elevated, cool-surface | non-text    | 6.7         |
| `border-default`          | bg, surface, panel                         | non-text    | 3.3         |
| `accent` (limite do CTA)  | bg, panel                                  | non-text    | 6.7         |

Pares explicitamente **não suportados** (não usar): `accent-active` como texto pequeno; `status-danger` como texto; `cool` como texto sobre `cool-surface`; qualquer texto sobre `border-*`; `text` claro sobre `accent`/`accent-active`.

### Regras de estado: focus, hover, active, disabled

- **Focus (contrato):** só por teclado (`:focus-visible`), anel `--mc-focus-ring-width` (2 px) sólido `--mc-focus-ring`, com `--mc-focus-ring-offset` (2 px) **obrigatório**, para que o anel fique sobre a superfície de trás e não sobre o preenchimento do elemento. Aplicado globalmente em `_base.scss`; componentes que precisarem reaplicar usam `@include focus-ring`. Nunca remover o foco sem substituto equivalente.
- **Hover:** CTA primário → `--mc-accent-hover`; links → `--mc-link-hover`; elementos neutros → sobreposição `--mc-interactive-hover`. Hover nunca é o único caminho para uma informação (touch não tem hover).
- **Active (pressionado):** CTA primário → `--mc-accent-active` (texto continua `--mc-text-on-accent`, 5.0); neutros → `--mc-interactive-active`.
- **Disabled:** `--mc-disabled-bg` + `--mc-disabled-text` + `--mc-disabled-border`, cursor `not-allowed`, `disabled`/`aria-disabled`. Nunca indicado só por cor: o atributo e o comportamento também mudam. Sem hover/active quando desabilitado.
- **Selecionado / ativo / erro:** nunca indicados só por cor ou só por borda decorativa. Combinar com texto, ícone, peso, `aria-current`/`aria-selected`/`aria-invalid`.
- Seleção de texto: `--mc-accent` com `--mc-text-on-accent`.

### 6. Borders

| Token                        | Valor   | Uso                                                       |
| ---------------------------- | ------- | --------------------------------------------------------- |
| `--mc-border-width-default`  | 1px     | estrutura: divisores, chips, contornos                    |
| `--mc-border-width-strong`   | 2px     | objetos físicos (MC-CART, moldura CRT) e foco             |
| `--mc-radius-none`           | 0       | padrão: painéis, Player Card, seções, CRT                 |
| `--mc-radius-sm`             | 4px     | botões, chips, inputs                                     |
| `--mc-radius-round`          | 50%     | só elementos realmente circulares (indicador de status)   |

Cores de borda: `--mc-border-subtle` (decorativa), `--mc-border-default` (interativa, ≥ 3:1), `--mc-border-accent` (especial/decorativa), `--mc-border-cool`.

- **Section header:** marcador ■ 12–14 px `--mc-accent` + título + linha 1 px `--mc-border-subtle` + status opcional.
- **Cantos de mira (bracket):** traço 2 px `--mc-border-accent`, ~12 px de perna, **exclusivos do Player Card**. Não reutilizar em cards ou painéis.
- **Borda do Player Card:** `--mc-border-accent` sobre `--mc-panel` dá 4.3:1, mas ela é **decorativa**. Ela (e os cantos de mira) **nunca** pode ser o único indicador de foco, seleção, ativo, erro ou qualquer estado funcional; estados usam os tokens de estado acima.
- WCAG 1.4.11: bordas que identificam controles interativos usam `--mc-border-default` ou mais forte.

### 7. Surfaces

| Nível | Token           | Exemplos                                 |
| ----- | --------------- | ---------------------------------------- |
| 0     | `--mc-bg`       | página                                   |
| 1     | `--mc-surface`  | header fixo                              |
| 2     | `--mc-panel`    | Player Card, painéis, corpo do CRT       |
| 3     | `--mc-elevated` | menu de idioma, tooltip                  |

- Profundidade da UI por **luminosidade**, não por `box-shadow`.
- Máximo de **dois níveis aninhados** (bg → panel). Evitar card dentro de card dentro de card.
- **Linhas antes de caixas:** caixa só para objetos físicos e camadas interativas.
- **Header sólido** (`--mc-surface` + borda inferior `--mc-border-subtle`). Proibido: glassmorphism, `backdrop-filter` decorativo, superfície translúcida estilo SaaS.

### Sombras: objetos físicos vs. UI digital

> UI digital e objetos físicos têm comportamentos visuais diferentes.

- `--mc-shadow-object` (`0 12px 24px -8px` ink-950 a 85%) é **exclusiva de objetos físicos** do universo: MC-CART, console MC-01, CRT quando necessário, futuros objetos físicos.
- Painéis, cards de interface, header, menus e botões **não** usam sombra.

### Glow

- `--mc-glow-warm` (orange-500 a 24%, usado em gradiente radial) é permitido **apenas** em: área visual do Hero, CRT e, no futuro, ativação/boot de cartucho.
- Proibido atrás de texto, em headings comuns, em botões, em todos os elementos laranja e em bordas comuns. O laranja mantém hierarquia e intenção.

---

## Backlog registrado para a FASE 3

- **Papel tipográfico `stat-value`** para valores e números reais (ex.: `10+` no XP profissional; futuras métricas reais). Definir família, tamanho e regras na implementação do Player Status.
- **Wordmark MODO CAMPANHA e monograma MC** como assets próprios (SVG). Pixelify Sans não será forçada a reproduzir o logo do concept.
- **H1 semântico = "Eduardo Arine"** (D-026); "MODO CAMPANHA" pode ser visualmente maior sem ser o H1. Validar no Hero.

---

## Sprint 3 (PROPOSTA, aguardando aprovação): Icons + Buttons + Labels/Chips + Status

Primitivos de interface que Hero, Player Status e Project Inventory vão consumir.

1. **Icons:** SVG inline, grade de 16 px (renderizados a 16 e 24 px), estilo pixel coerente com a Pixelify (`shape-rendering: crispEdges`), `currentColor`. Conjunto inicial só do que o concept usa: seta direita, seta para baixo, link externo (↗), documento (currículo), idioma. Logos de GitHub e LinkedIn como marcas oficiais monocromáticas (sem pixelizar, por respeito às diretrizes de marca). Componente `mc-icon` próprio, sem biblioteca. Decorativo = `aria-hidden`; ícone sozinho exige rótulo traduzido.
2. **Buttons:** primário (accent + text-on-accent, radius-sm, padding 12 × 24, Plex 500), link-botão secundário (sublinhado accent, como "GitHub ↗" no 03-A) e contornado (`border-default`, como "Currículo" no header do 03-A). Estados conforme as regras acima. Alvo mínimo 44 × 44 px. Navegação usa `<a>` com o estilo, ação usa `<button>` (diretiva aplicada ao elemento nativo, preservando semântica).
3. **Labels / Chips:** micro-label (`label` em `--mc-text-muted`); chip quente (borda `--mc-border-accent`, texto `--mc-accent-hover`, a adicionar aos contratos) e chip frio (`--mc-cool-surface` + `--mc-text-on-cool` + `--mc-border-cool`). Chips não interativos por padrão; máximo 2 por cartucho.
4. **Status:** indicador circular 8 px + texto sempre presente (ONLINE, ACTIVE, IN PROGRESS). Cor nunca sozinha. Danger com ícone + borda.
5. **Section header:** composição marcador + título `display-section` + linha subtle + status opcional.
6. **Revisão visual:** página de showcase do design system **apenas em modo de desenvolvimento** (`isDevMode()`), fora do build publicado.
