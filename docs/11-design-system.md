# 11 — MC Design System

> Transforma a direção aprovada (**Concept 03 — Approved as Hybrid**, D-011) em regras implementáveis.
> Se este documento crescer demais, separar em `docs/design-system/*.md`.

## Estado da Fase 2

| #   | Fundamento               | Status                                                        |
| --- | ------------------------ | ------------------------------------------------------------- |
| 1   | Colors                   | ✅ Paleta-base aprovada (D-014) · 🟡 **regras e tokens: proposta (Sprint 2)** |
| 2   | Typography               | ✅ Aprovada e implementada (D-022)                             |
| 3   | Grid                     | ✅ Aprovado e implementado (D-022)                             |
| 4   | Spacing                  | ✅ Aprovado e implementado (D-022)                             |
| 5   | Borders                  | 🟡 **Proposta (Sprint 2), aguardando aprovação**              |
| 6   | Surfaces                 | 🟡 **Proposta (Sprint 2), aguardando aprovação**              |
| 7   | Icons                    | ⬜ backlog (setas ↗ → não existem nas fontes: virão como SVG) |
| 8   | Buttons                  | ⬜ backlog                                                     |
| 9   | Labels / Chips           | ⬜ backlog                                                     |
| 10  | Status                   | ⬜ backlog                                                     |
| 11  | Player Card              | ⬜ backlog (regras de conteúdo em D-017)                       |
| 12  | MC-CART                  | ⬜ backlog (direção em D-013)                                  |
| 13  | CRT                      | ⬜ backlog                                                     |
| 14  | XP                       | ⬜ backlog (regras conceituais em D-021)                       |
| 15  | Motion                   | ⬜ backlog                                                     |
| 16  | Easter Egg Language      | ⬜ backlog                                                     |
| 17  | Responsive behavior      | ⬜ backlog (base definida em Grid)                             |
| 18  | Accessibility            | ⬜ backlog (contraste medido em Colors)                        |
| 19  | i18n / content behavior  | ✅ Arquitetura aprovada e implementada (D-020)                 |

- **Sprint 1 (concluído):** Typography + Grid + Spacing + infraestrutura de i18n.
- **Sprint 2 (proposta):** Colors + Borders + Surfaces. Nada visual é implementado antes da aprovação.

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

## Implementação (Sprint 1)

```
src/styles/
  _mc.scss                 # entrada para componentes: @use 'mc' as *;  (só tokens, sem CSS)
  tokens/
    _breakpoints.scss      # $breakpoints, mixin mq(md|lg)
    _spacing.scss          # $space (primitivos), $space-semantic (aliases), função space(n)
    _typography.scss       # famílias, $type-roles, função fluid(), mixin type(role)
    _grid.scss             # $container-max, $columns, mixins page-grid e columns
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

Restrições já aprovadas: `#C96A1B` nunca como texto pequeno; `#C44536` nunca como texto; petrol predominantemente como superfície; botão `#F28C28` com texto escuro. O Sprint 2 abaixo transforma isso em regras de token.

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

## Sprint 2 — Colors + Borders + Surfaces (PROPOSTA, aguardando aprovação)

Nada desta seção está implementado. **Nenhum HEX novo**: tudo deriva da paleta D-014, com transparência via `color-mix()` quando necessário.

### 5. Colors: tokens em duas camadas

**Primitivos** (`--mc-color-*`, nomes neutros de matiz/tom, mapeiam 1:1 a paleta):

`orange-300 #FFB357` · `orange-500 #F28C28` · `orange-700 #C96A1B` · `gold-400 #F2C14E` · `ink-950 #14110F` · `ink-900 #1D1815` · `ink-850 #231F1C` · `ink-800 #2B2521` · `cream-100 #F3E9D2` · `cream-300 #D7CBB5` · `cream-500 #A89A86` · `petrol-800 #1F3A4A` · `teal-500 #3FA7A3` · `green-500 #7FB069` · `red-600 #C44536`

**Semânticos** (o que os componentes usam; primitivos nunca são usados direto em componentes):

| Token                    | Primitivo     | Uso permitido                                         | Proibido                                   |
| ------------------------ | ------------- | ----------------------------------------------------- | ------------------------------------------ |
| `--mc-bg`                | ink-950       | fundo da página                                       | —                                          |
| `--mc-surface`           | ink-900       | header, faixas de seção (se necessário)               | —                                          |
| `--mc-panel`             | ink-850       | Player Card, painéis, rótulo do MC-CART               | —                                          |
| `--mc-elevated`          | ink-800       | hover de superfícies, menus (seletor de idioma), tooltips | —                                      |
| `--mc-text`              | cream-100     | títulos, nome, texto principal                        | —                                          |
| `--mc-text-secondary`    | cream-300     | parágrafos longos, cargo, descrições                  | —                                          |
| `--mc-text-muted`        | cream-500     | micro-labels, metadados, placeholders                 | texto essencial longo                      |
| `--mc-text-on-accent`    | ink-950       | texto sobre `--mc-accent` (7.7) e `--mc-accent-hover` (10.6) | —                                   |
| `--mc-accent`            | orange-500    | MODO CAMPANHA, marcador de seção, CTA primário, links, nav ativa | grandes áreas de fundo          |
| `--mc-accent-hover`      | orange-300    | hover do CTA/links; texto de destaque pequeno         | —                                          |
| `--mc-accent-strong`     | orange-700    | bordas e cantos (Player Card), estado pressionado do CTA (texto ink-950: 5.0) | **texto < 24 px** (ou < 18.66 px bold) |
| `--mc-special`           | gold-400      | achievements, raridade, projeto `featured`            | uso decorativo genérico                    |
| `--mc-cool-surface`      | petrol-800    | fundo de chips/labels frios, rótulos de cartucho      | **texto**                                  |
| `--mc-cool`              | teal-500      | ícones, bordas e texto ≥ 14 px sobre bg/panel         | texto pequeno sobre petrol (4.1)           |
| `--mc-status-online`     | green-500     | bolinha/label ONLINE/ACTIVE, XP                       | —                                          |
| `--mc-status-danger`     | red-600       | ícones, bordas, indicadores (3.8 ≥ 3:1 não-texto)     | **qualquer texto**                         |
| `--mc-focus`             | orange-300    | anel de foco 2 px + offset 2 px (10.6 sobre bg)       | —                                          |

Regras operacionais do 70/20/10:

- **Laranja só onde há intenção:** título do Hero, marcador ■ de seção, **um** CTA primário por viewport, nav ativa, foco, cantos do Player Card, shell laranja do MC-CART. Nunca fundo de seção.
- **Frios (petrol/teal) ≤ 10%:** chips de categoria, detalhes de cartucho, pontos de informação. Nunca competem com o CTA.
- **Status** só comunica estado real (online, em andamento, erro); não é decoração.
- Mensagem de erro: texto `--mc-text` + ícone/borda `--mc-status-danger` (nunca texto vermelho).

### 6. Borders

| Token                      | Valor                                                       | Uso                                                       |
| -------------------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| `--mc-border-width`        | 1px                                                         | divisores, chips, contornos                               |
| `--mc-border-width-strong` | 2px                                                         | objetos "hardware" (MC-CART, moldura CRT), anel de foco   |
| `--mc-border-subtle`       | `color-mix(in srgb, cream-100 12%, transparent)` (1.3:1)    | divisores decorativos (Player Status, header de seção)    |
| `--mc-border-default`      | `color-mix(in srgb, cream-100 40%, transparent)` (3.4:1)    | contornos de elementos **interativos** (botão secundário, input) |
| `--mc-border-accent`       | `--mc-accent-strong` (5.0 sobre bg)                         | Player Card, chips quentes                                |
| `--mc-border-cool`         | `--mc-cool` (4.1 sobre petrol)                              | chips frios                                               |
| `--mc-radius-none`         | 0                                                           | padrão: painéis, Player Card, seções, CRT                 |
| `--mc-radius-sm`           | 4px                                                         | botões, chips, inputs                                     |
| `--mc-radius-round`        | 50%                                                         | só indicadores de status (bolinha)                        |

Padrões de linha (do 03-A):

- **Section header:** marcador ■ 12–14 px `--mc-accent` + título + linha 1 px `--mc-border-subtle` ocupando o resto + status opcional à direita.
- **Player Status:** itens separados por linha 1 px subtle; coluna da jornada com divisor vertical 1 px subtle.
- **Cantos de bracket (HUD):** traço 2 px `--mc-accent-strong`, ~12 px de perna, só nos 4 cantos. Exclusivo do Player Card (e, se aprovado, da moldura do CRT). Não espalhar.
- WCAG 1.4.11: bordas que identificam um controle interativo usam `--mc-border-default` ou mais forte (≥ 3:1); `--mc-border-subtle` só para separação decorativa.

### 7. Surfaces

Modelo de elevação **por luminosidade, não por sombra** (dark UI quente):

| Nível | Token           | Exemplos                                                   |
| ----- | --------------- | ---------------------------------------------------------- |
| 0     | `--mc-bg`       | página                                                     |
| 1     | `--mc-surface`  | header fixo                                                |
| 2     | `--mc-panel`    | Player Card, painéis, CRT (corpo)                          |
| 3     | `--mc-elevated` | hover, menu de idioma, tooltip                             |

Regras:

- No máximo **dois níveis aninhados** (ex.: bg → panel). Panel dentro de panel = repensar.
- **Linhas antes de caixas:** Player Status, Skill Tree e Campaign Log usam espaço + divisores; caixa só para objetos físicos (Player Card, MC-CART, CRT) e camadas interativas.
- **Sombras só em objetos físicos** (MC-CART, console/CRT): `--mc-shadow-object: 0 12px 24px -8px color-mix(in srgb, black 60%, transparent)`. Interface plana não tem sombra.
- **Luz quente (atmosfera 03-B):** `--mc-glow-warm: radial-gradient(… color-mix(in srgb, orange-500 24%, transparent) …)` aplicada **só** atrás do visual do Hero e, no futuro, ao redor da tela do CRT ligada. Nunca atrás de texto corrido; contraste do texto é medido sem o glow.
- Header: `--mc-surface` com borda inferior subtle; sem blur/vidro (evita estética SaaS).
- Sem textura de ruído global; scanlines só dentro da tela do CRT (FASE 5), respeitando `prefers-reduced-motion`.
- Shells do MC-CART (preto, creme, grafite, laranja) **não** são tokens de surface da interface: serão especificados no fundamento MC-CART.

### Entregáveis do Sprint 2 após aprovação

1. `src/styles/tokens/_color.scss` (primitivos + semânticos) e `_surface.scss` (borders, radius, shadow, glow), emitidos em `_custom-properties.scss`.
2. `body` com `--mc-bg` / `--mc-text`; foco global com `--mc-focus`.
3. Página interna de referência (não pública) ou especímen atualizado para revisão visual.
4. Teste automatizado de contraste dos pares semânticos (falha se algum par cair abaixo do mínimo).
