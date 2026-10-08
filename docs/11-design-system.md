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
| 7   | Icons                    | ✅ Implementado (D-027): `mc-icon`, 4 system + 2 brand        |
| 8   | Buttons / Actions        | ✅ Implementado (D-027): `mcAction` primary/secondary/text     |
| 9   | Labels / Chips           | ✅ Implementado (D-027): `mc-chip` warm/cool                   |
| 10  | Status                   | ✅ Implementado (D-027): `mc-status` active/in-progress        |
| 11  | Player Card              | ✅ Aprovado (D-031)                                            |
| 12  | MC-CART                  | ✅ Aprovado + Project Summary + material tokens (D-032)        |
| 13  | CRT                      | 🟡 Arquitetura aprovada; refinamento físico aguardando aprovação (D-033) |
| 14  | XP                       | ⬜ backlog (regras conceituais em D-021)                       |
| 15  | Motion                   | ⬜ backlog                                                     |
| 16  | Easter Egg Language      | ⬜ backlog                                                     |
| 17  | Responsive behavior      | ⬜ backlog (base definida em Grid)                             |
| 18  | Accessibility            | 🟡 parcial: contratos de contraste e foco implementados (D-025) |
| 19  | i18n / content behavior  | ✅ Arquitetura aprovada e implementada (D-020)                 |

- **Sprint 1 (concluído):** Typography + Grid + Spacing + infraestrutura de i18n.
- **Sprint 2 (concluído):** Colors + Borders + Surfaces + contratos de contraste.
- **Sprint 3 (concluído):** Icons + Actions + Chips + Status + Section header + showcase dev-only.
- **Sprint 4 (implementado, aguardando aprovação):** Signature Components: Player Card, MC-CART + Project Summary, CRT.

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

.title { @include type(section-title); }
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

## 2. Typography (APROVADA, D-022; regra de uso refinada em D-029)

### Famílias e arquivos

| Família        | Arquivo                                   | Eixo                | Tamanho  | Uso                                                                 |
| -------------- | ----------------------------------------- | ------------------- | -------- | ------------------------------------------------------------------- |
| Pixelify Sans  | `src/styles/fonts/pixelify-sans-latin.woff2` | `wght` 400–700 (variável) | 11.7 kB | brand/game-system display, **só em tamanhos grandes validados** (D-029) |
| IBM Plex Sans  | `src/styles/fonts/ibm-plex-sans-latin.woff2` | `wght` 100–700 (variável) | 44.6 kB | voz do Eduardo, títulos de seção, códigos pequenos, micro-labels |

- Fonte: Google Fonts (SIL OFL), subset **latin** (U+0000–00FF + pontuação): cobre pt-BR e en sem precisar de latin-ext.
- **Validado** (fontkit): `ã á é í ó ú ç ê ô õ à â` e maiúsculas presentes nas duas famílias. **Ausentes:** `↗ →` (e `↓` na Pixelify) → usar ícones SVG.
- Cada família é **um único arquivo variável** (o Google não serve estáticos separados); pesos usados de fato: Pixelify 500/700 (só `display-hero`), Plex 400/500/600.
- Empacotadas pelo build (`url()` relativo no Sass → `media/<nome>-<hash>.woff2`), o que dá cache longo e funciona com qualquer `base-href`. Sem Google Fonts em runtime e sem pacote npm (D-023).
- `font-display: swap`; `font-synthesis: none` no `body` (sem negrito/itálico falso).

Fallbacks (`--mc-font-display`, `--mc-font-text`):

```
'Pixelify Sans', ui-monospace, 'Cascadia Mono', 'Courier New', monospace
'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif
```

### Regra de uso da Pixelify Sans (D-029, substitui a "regra de nitidez" de D-022)

> O caráter retro não depende exclusivamente de uma pixel font.

**Problema real encontrado (não é característica aceita):** o **"C" maiúsculo da Pixelify Sans tem baixa distinção** em tamanhos pequenos e intermediários. No showcase, "ACTIONS" leu como "AOTIONS", "CURRENT MAIN QUEST" como "OURRENT MAIN QUEST" e "MC-01" como "MO-01". Validação em 1× e 2×, 14–96 px, pesos 400–700:

| Faixa         | Resultado                                                        |
| ------------- | ---------------------------------------------------------------- |
| ≤ ~24 px      | C ambíguo em **qualquer** peso (pior em 1×)                       |
| ~28–48 px     | peso 700 fecha o C; 400/500 distinguíveis (limítrofe em 1×)       |
| ≥ ~64 px      | C legível em qualquer peso **em palavras** ("CAMPANHA")            |
| códigos curtos | "MC", "MC-01", "MC-CART" leem "MO" **até 48 px mesmo com peso 500** (sem contexto de palavra) |

**Regra:**

- **Pixelify Sans** = brand/game-system display, apenas em usos **visualmente validados**. Hoje o único validado é **"MODO CAMPANHA"** (Hero, 48–96 px, peso 500 abaixo de md e 700 a partir de md). MC / MC-01 / MC-CART / seriais **não** foram validados em nenhum tamanho testado (até 48 px) e ficam em Plex até nova validação; o monograma MC e o wordmark virão como SVG autoral. Todo uso novo de Pixelify exige validação visual dos caracteres no tamanho real.
- **IBM Plex Sans** = conteúdo humano **e** títulos de seção (PLAYER STATUS, PROJECT INVENTORY, CURRENT MAIN QUEST...), códigos de sistema pequenos (papel `system`), nomes de projeto no MC-CART (`cart-title`), micro-labels, botões, navegação.
- Nos títulos de seção, a linguagem de game vem de **caixa alta, peso, tracking, marcador ■, divider, code e status** (composição do `mc-section-header`), não da pixel font.
- **Sem terceira família** tipográfica. **Sem SVG para headings traduzíveis**; SVG autoral só para o monograma MC e o wordmark MODO CAMPANHA (backlog).

### Escala (papéis em `$type-roles`)

Fluida entre viewport 360 px e 1200 px (`clamp()` em `rem`). Custom property: `--mc-font-size-<papel>`. Mixin: `@include type(<papel>)`.

| Papel             | Família | Mobile → Desktop | Line-height | Tracking  | Peso | Caixa | Aplicação                                         |
| ----------------- | ------- | ---------------- | ----------- | --------- | ---- | ----- | ------------------------------------------------- |
| `display-hero`    | Pixelify | 48 → 96 px      | 0.95        | 0         | **500 → 700 (md)** | UPPER | Só "MODO CAMPANHA" (único uso validado; 700 só a partir de 768 px, ~71 px+) |
| `section-title`   | Plex    | 24 → 32 px       | 1.15        | 0.06em    | 600  | UPPER | PLAYER STATUS, PROJECT INVENTORY, CURRENT MAIN QUEST |
| `cart-title`      | Plex    | 14 → 16 px       | 1.15        | 0.04em    | 600  | UPPER | Nome do projeto no rótulo do MC-CART              |
| `system`          | Plex    | 14 px            | 1.3         | 0.08em    | 500  | UPPER | MC-01, MC-CART, ON-001 em tamanho pequeno         |
| `label`           | Plex    | 12 → 13 px       | 1.3         | 0.08em    | 500  | UPPER | Micro-labels: ORIGIN, XP, CLASS, ACTIVE           |
| `name`            | Plex    | 36 → 56 px       | 1.05        | −0.02em   | 600  | —     | Eduardo Arine                                     |
| `title-l`         | Plex    | 20 → 24 px       | 1.3         | −0.01em   | 400  | —     | Cargo                                             |
| `title-m`         | Plex    | 18 → 20 px       | 1.35        | −0.005em  | 600  | —     | Nome do projeto, "Sobre a jornada", "XP real..."  |
| `body-l`          | Plex    | 17 → 18 px       | 1.6         | 0         | 400  | —     | Parágrafo do Hero                                 |
| `body`            | Plex    | 16 px            | 1.6         | 0         | 400  | —     | Parágrafos (padrão do `body`)                     |
| `body-s`          | Plex    | 14 px            | 1.5         | 0         | 400  | —     | Descrições curtas, valores, navegação             |
| `caption`         | Plex    | 12 px            | 1.4         | 0.01em    | 500  | —     | Chips/tags, metadados                             |

Histórico: até D-029, `display-section` (28→40 px), `display-cart` e `system` usavam Pixelify (700/700/500). Foram trocados após o teste de legibilidade acima.

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

## Sprint 3 — Icons, Actions, Chips, Status e Section Header (APROVADO e implementado, D-027)

Componentes em `src/app/shared/ui/` (barrel `index.ts`). Consomem só tokens semânticos; textos sempre vêm de fora (dicionário / conteúdo `Localized`). Testes em `ui.spec.ts`.

### 8. Icons (`mc-icon`)

Duas famílias, sem biblioteca:

| Família           | Ícones                                     | Estilo                                                                                   |
| ----------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------- |
| MC system icons   | `arrow-down`, `external`, `document`, `language` | desenhados para o Modo Campanha: grade 16 px, traço 1.5, pontas retas, só 0/45/90° (curvas viram chanfros). Técnico, levemente pixel, sem cara de sprite. |
| Brand icons       | `github`, `linkedin`                       | marcas oficiais monocromáticas (GitHub Octicons "mark-github", MIT; LinkedIn via Simple Icons, CC0). **Sem pixelização.** |

Só existem ícones usados por componentes reais. Novo ícone = necessidade concreta.

API:

```html
<mc-icon name="external" />                                  <!-- decorativo: aria-hidden="true" -->
<mc-icon name="github" [size]="24" [label]="ui().cta.github" /> <!-- informativo: role="img" + aria-label -->
```

| Input   | Tipo                  | Padrão | Regra                                                                                |
| ------- | --------------------- | ------ | ------------------------------------------------------------------------------------ |
| `name`  | `McIconName`          | —      | obrigatório; união fechada dos ícones registrados em `icons.ts`                       |
| `size`  | `16 \| 20 \| 24`      | 16     | só tamanhos do sistema (valores arbitrários não compilam com `strictTemplates`)      |
| `label` | `string` (traduzido)  | —      | só quando o ícone informa **sem** texto adjacente; com texto visível, omitir (evita leitura duplicada) |

Cor: `currentColor` (herda do texto). SVG inline, sem requisições.

### 9. Actions (`a[mcAction]`, `button[mcAction]`)

Estilo aplicado ao **elemento nativo**: navegação = `<a>`, ação = `<button>`. Não existe abstração semântica única. `<button>` sem `type` vira `type="button"` automaticamente.

| Variante    | Uso                                                           | Visual                                                                      |
| ----------- | ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `primary`   | CTA principal. **No máximo um por região visual** (ex.: "Explorar campanha" no Hero) | `--mc-accent` + `--mc-text-on-accent`, padding 12 × 24, radius 4 |
| `secondary` | ações secundárias importantes (ex.: Currículo)                | contorno `--mc-border-default`, texto `--mc-text`                           |
| `text`      | baixa ênfase (ex.: GitHub, LinkedIn)                          | texto `body-s`, sublinhado 1 px `--mc-accent` com offset 6 px (03-A)        |

```html
<a mcAction href="#project-inventory">{{ ui().cta.explore }} <mc-icon name="arrow-down" /></a>
<a mcAction="secondary" [href]="resumeUrl"><mc-icon name="document" /> {{ ui().cta.resume }}</a>
<a mcAction="text" href="https://github.com/EduardoArine">{{ ui().cta.github }} <mc-icon name="external" /></a>
```

Estados (tokens do Sprint 2):

| Estado          | primary                    | secondary                    | text                                   |
| --------------- | -------------------------- | ---------------------------- | -------------------------------------- |
| hover           | `--mc-accent-hover`        | `--mc-interactive-hover`     | texto e sublinhado `--mc-link-hover`   |
| active          | `--mc-accent-active`       | `--mc-interactive-active`    | texto `--mc-link`                      |
| focus-visible   | anel global `--mc-focus-ring` + offset | idem             | idem                                   |
| disabled        | `--mc-disabled-*`, `cursor: not-allowed`, sem hover/active (só `<button>`; links não têm estado desabilitado) | idem | sublinhado `--mc-disabled-border` |

- Alvo mínimo **44 × 44 px** (`min-height`/`min-width`), inclusive no `text`.
- `data-mc-preview="hover|active|focus"` força o estado visual **apenas para o showcase**.

### 10. Chips (`mc-chip`)

Somente `warm` (borda `--mc-border-accent`) e `cool` (`--mc-cool-surface` + `--mc-border-cool`); texto `--mc-text-secondary` / `--mc-text-on-cool` em `caption`.

- **Informativos:** sem `cursor: pointer`, sem `role="button"`, sem `tabindex`, sem hover. Se um dia virarem filtros, serão especificados como outro componente.
- **Cor = categorização visual**, não importância, alerta ou status.
- Máximo de 2 por cartucho na listagem.
- O texto do chip quente é creme (não laranja), para o laranja não aparecer em todos os elementos ao mesmo tempo; a borda carrega o tom.

### 11. Status (`mc-status`)

Indicador de 8 px (`aria-hidden`) + **texto sempre visível** (traduzível, papel `label`). Só os estados usados pelo produto:

| Estado        | Onde                 | Indicador                       | Cor                  |
| ------------- | -------------------- | ------------------------------- | -------------------- |
| `active`      | Player Status        | círculo cheio                   | `--mc-status-online` |
| `in-progress` | Current Main Quest   | círculo vazado (borda 2 px)     | `--mc-accent`        |

Forma diferente + texto: status nunca é comunicado só por cor. Sem conjunto genérico success/warning/info/error.

```html
<mc-status state="active">{{ ui().status.active }}</mc-status>
```

### 12. Section header (`mc-section-header`)

`■ TÍTULO ───────── ● STATUS`, com partes opcionais. Só `heading` é obrigatório.

| Input       | Tipo       | Padrão | Uso                                               |
| ----------- | ---------- | ------ | ------------------------------------------------- |
| `heading`   | `string`   | —      | título (`section-title`, IBM Plex Sans)           |
| `headingId` | `string`   | —      | id do heading, para `<section aria-labelledby>`   |
| `level`     | `2 \| 3`   | 2      | nível semântico do heading                        |
| `code`      | `string`   | —      | código de sistema acima do título (`system`)      |
| `subtitle`  | `string`   | —      | linha de apoio (`body`, `--mc-text-secondary`)    |
| `divider`   | `boolean`  | `true` | linha 1 px `--mc-border-subtle`                   |
| conteúdo    | `<mc-status>` | —   | status alinhado à direita (projeção)              |

```html
<mc-section-header [heading]="ui().sections.playerStatus" headingId="player-status-title">
  <mc-status state="active">{{ ui().status.active }}</mc-status>
</mc-section-header>
```

Marcador ■ 12 px `--mc-accent` decorativo. Sem ornamentação extra.

### Contratos de contraste adicionados

Só os pares realmente usados pelos novos componentes: action `secondary` no header (`--mc-surface`):

- `text` sobre `interactive-hover` / `interactive-active` compostos sobre `surface`;
- `disabled-text` sobre `disabled-bg` composto sobre `surface`.

Chips, status, actions primary/text e section header já estavam cobertos pelos pares do Sprint 2 (`text-secondary`, `text-on-cool`, `status-online`, `accent`, `link`, `link-hover`, `text-on-accent`, `border-default`, `focus-ring`).

### Design System Showcase (dev only)

- Rotas: `/dev/design-system` (pt-BR) e `/en/dev/design-system` (en), com `npm start`.
- Mostra: section headers, typography, semantic colors, surfaces (+ sombra de objeto e glow), borders, icons (16/20/24), actions × estados (default/hover/active/focus/disabled), composição dos CTAs do Hero, chips e status sobre bg e panel, focus-visible, dicionário pt-BR × en.
- **Não existe em produção** (D-028): `src/app/dev/dev.routes.ts` exporta `DEV_ROUTES = []`; só a configuração `development` troca o arquivo por `dev.routes.development.ts` (`fileReplacements`). O `tsconfig.app.json` exclui as fontes do showcase das raízes de compilação e o workflow de deploy falha se `design-system-page` aparecer no bundle publicado.
- Textos da própria página do showcase são da ferramenta (não passam pelo dicionário); textos dos componentes de exemplo passam.

### Pontos abertos encontrados no Sprint 3

- ~~"C" da Pixelify Sans nos títulos de seção~~ → **resolvido em D-029** (títulos e códigos pequenos em Plex). Correção de registro: a primeira análise dizia "igual em todos os pesos"; a validação detalhada mostrou que o peso influi entre ~28–48 px, mas que ≤ ~24 px o C é ambíguo em qualquer peso.
- Traduções en aprovadas: "Explore the campaign", "Résumé" (ação mais descritiva futura: "View résumé").

---

## Sprint 4 — Signature Components (implementado, aguardando aprovação visual)

Componentes autorais em `src/app/shared/signature/` (barrel `index.ts`), avaliados isoladamente no showcase (`/dev/design-system`, área **SIGNATURE COMPONENTS**) antes de qualquer Home. Testes em `signature.spec.ts`.

### Objeto físico × UI digital

| Tipo            | Componentes                           | Pode usar                                                              | Não usa                       |
| --------------- | ------------------------------------- | ---------------------------------------------------------------------- | ----------------------------- |
| **UI digital**  | Player Card, Project Summary, primitivos | superfícies (`panel`...), bordas, tokens de texto                    | sombra de objeto, glow, material |
| **Objeto físico** | MC-CART, CRT (e futuro console MC-01) | **tokens de material**, `--mc-shadow-object`, relevo (`material-groove` / `material-highlight`); glow só no CRT | glow permanente no MC-CART    |

### 13. Material tokens (D-032, aprovado)

Três níveis de token de cor:

```
primitive colors        --mc-color-*      paleta D-014 (só dentro de src/styles/tokens/)
  → semantic UI tokens  --mc-*            UI digital (texto, superfícies, estados, bordas)
  → physical material   --mc-material-*   objetos físicos (MC-CART, CRT, console)
```

> **Material tokens não criam uma segunda paleta.** Eles mapeiam para cores existentes da paleta e não abrem famílias de novos tons de plástico/material sem necessidade real. São preferíveis a reutilizar um token semântico de UI de forma incorreta só porque ele tem a mesma cor.

Aliases semânticos de cores **já existentes** na paleta D-014 (nenhum HEX novo), para objetos físicos. Variação física; **não** significam status nem raridade.

| Token                         | Primitivo         | Tinta (texto impresso)        | Contraste |
| ----------------------------- | ----------------- | ----------------------------- | --------- |
| `--mc-material-dark`          | ink-800           | `--mc-material-dark-ink` (cream-100)   | 12.5 |
| `--mc-material-light`         | cream-300         | `--mc-material-light-ink` (ink-950)    | 11.7 |
| `--mc-material-orange`        | orange-500        | `--mc-material-orange-ink` (ink-950)   | 7.7  |
| `--mc-material-cool`          | petrol-800        | `--mc-material-cool-ink` (cream-100)   | 9.9  |
| `--mc-material-groove`        | ink-950 a 35%     | sulcos, contatos, encaixes, bezel | decorativo |
| `--mc-material-highlight`     | cream-100 a 14%   | brilho de aresta superior     | decorativo |

Os quatro pares tinta/material entraram nos contratos de contraste.

### 14. Player Card (`mc-player-card`, D-031)

Perfil profissional lido pela linguagem de um sistema de videogame. **Não é carta de RPG.** Base: Concept 03-A.

Anatomia:

```
┌╴                         ╶┐  ← cantos de mira (2 px, border-accent) — exclusivos do Player Card
  PLAYER 01                     ← label (dicionário)
  ┌───────────────────────┐
  │   FOTO DO EDUARDO     │     ← foto real 4:3 (object-position topo) ou placeholder explícito
  └───────────────────────┘
  EDUARDO ARINE                 ← title-m, caixa alta (id → aria-labelledby do <article>)
  CLASS                         ← <dl>: dt label / dd body-s
  Desenvolvedor de Produtos Digitais
  XP
  10+ anos em tecnologia
  STATUS
  ● ACTIVE                      ← <mc-status> projetado
└╴                         ╶┘
```

API:

| Input         | Tipo                         | Uso                                                              |
| ------------- | ---------------------------- | ---------------------------------------------------------------- |
| `name`        | `string` (obrigatório)       | nome                                                             |
| `fields`      | `{ label; value }[]`         | linhas reais (CLASS, XP...), já traduzidas                        |
| `photo`       | `{ src; alt }`               | foto real aprovada; ausente = placeholder "FOTO DO EDUARDO"       |
| `statusLabel` | `string`                     | label da linha de status; valor = `<mc-status>` projetado        |

- UI digital: `--mc-panel`, moldura `--mc-border-subtle`, cantos de mira `--mc-border-accent` (decorativos). **Sem sombra.** (Ajuste de execução: a cor de acento ficou só nos cantos; a moldura sutil reproduz melhor o 03-A.)
- Semântica: `<article aria-labelledby>` + `<dl>`; foto real com `alt` traduzido; placeholder e cantos `aria-hidden`.
- **Proibido:** LV, HP, MP, STR, INT, barras de atributos, estrelas, rankings, qualquer métrica não real.
- Largura definida pelo layout (4/12 no desktop, 4/8 no tablet, total no mobile). Sem versão compacta: não houve necessidade real.

### 15. MC-CART (`mc-cart`, D-032)

Cartucho físico de um console que nunca existiu. Base visual: Concept 03-B. Sem formatos de NES, SNES, Mega Drive, Game Boy, N64, Atari ou outro cartucho comercial.

Anatomia (fixa):

```
  ┌──────▀▀▀▀▀▀──────┐        ← encaixe (notch) no topo
  │ MC-CART   ON-001 │        ← identificação + serial (Plex, tinta do material)
  │ ┌══════════════┐ │        ← faixa de acento (warm/cool/special)
 ║│ │PROJECT ARTWORK│ │║       ← sulcos laterais de pega
 ║│ │   16:10       │ │║
  │ ├──────────────┤ │
  │ │ COMUNIDADE ON │ │        ← cart-title, até 2 linhas reservadas (proporção fixa)
  │ │ DIGITAL PLATF.│ │        ← tipo (label)
  │ └──────────────┘ │
  │     ▪▪▪▪▪▪▪▪      │        ← contatos
  └──────────────────┘
```

| Input      | Tipo                                      | Regra                                                         |
| ---------- | ----------------------------------------- | ------------------------------------------------------------- |
| `serial`   | `string` (obrigatório)                    | `<COLEÇÃO>-<NNN>` (ex.: `ON-001`). Não inventar seriais finais |
| `title`    | `string` (obrigatório)                    | nome do projeto                                               |
| `type`     | `string` (obrigatório)                    | tipo traduzido (ex.: `DIGITAL PLATFORM`)                      |
| `shell`    | `'dark' \| 'light' \| 'orange' \| 'cool'` | material do shell (variação física)                           |
| `accent`   | `'warm' \| 'cool' \| 'special'`          | faixa de acento do rótulo                                     |
| `artwork`  | `{ src; alt }`                            | arte aprovada; ausente = placeholder "PROJECT ARTWORK"        |

- **Varia:** shell, accent, label (artwork + nome), artwork. **Preserva:** proporção (largura máx. 22 rem; altura idêntica entre variantes, nome limitado a 2 linhas), arquitetura, posição dos metadados, linguagem MC, comportamento.
- Objeto físico: material + `--mc-shadow-object` + relevo. Sem glow permanente.
- Rótulo sempre `--mc-panel` (o "adesivo" é constante entre shells).
- Acessibilidade: host `role="img"` com nome acessível "MC-CART ON-001: Projeto, TIPO"; conteúdo interno é apresentação. **Não clicável nesta fase.** Se virar interativo, o objeto inteiro recebe a semântica de interação (link/botão), não só um hover.
- Responsivo: 4 por linha (desktop), 2 (tablet), 1 (mobile), sempre reconhecível.

### 16. Project Summary (`mc-project-summary`, D-032)

Separado do objeto: **o cartucho não carrega a descrição.** Abaixo/ao lado do MC-CART:

| Input         | Tipo                       | Regra                                       |
| ------------- | -------------------------- | ------------------------------------------- |
| `title`       | `string`                   | heading h3 (padrão) ou h4 (`level`)         |
| `description` | `string`                   | descrição curta                             |
| `chips`       | `{ label; tone }[]`        | **no máximo 2 exibidos**                    |
| projeção      | `[mcAction]`               | ação futura "ver projeto"                   |

Coleção primeiro, documentação depois: detalhes completos ficam no CRT.

### 17. CRT Project Viewer (`mc-crt`, D-033)

> CRT na moldura; clareza no conteúdo.

Anatomia: **shell** (material dark + sombra de objeto + aresta) → **bezel** (`--mc-bg`, sulco interno) → **screen** (`--mc-surface`, mínimo 4:3, cresce com o conteúdo, glow quente controlado) → **content viewport** (conteúdo projetado, padding 32 px) → **identificação** (`MC-01` + LED decorativo).

| Input   | Tipo                     | Uso                                                             |
| ------- | ------------------------ | --------------------------------------------------------------- |
| `state` | `'empty' \| 'content'`  | `empty` mostra "INSERT CARTRIDGE"; `content` exibe a projeção  |

- Efeitos (vinheta + scanlines muito leves) ficam **atrás** do conteúdo (camada `.fx`, `aria-hidden`, `pointer-events: none`), mais fortes nas bordas: nunca sobre texto ou screenshots.
- A tela **nunca corta conteúdo** (4:3 é mínimo).
- Responsivo por **container query** (≤ 34 rem): moldura mínima, sem proporção fixa, sem glow nem efeitos. No mobile o conteúdo vem primeiro.
- Acessibilidade: host `role="region"` com rótulo traduzido; conteúdo semântico projetado (headings, `dl`, imagens com alt); decoração ignorada por tecnologias assistivas.
- Sem animação: inserção, boot, power-on, no signal e glitch ficam para Motion/Game Feel. "INSERT CARTRIDGE" é o único estado de tela nesta fase.

**Refinamento físico (desktop), sem mudar a arquitetura:**

- **Vidro:** raio próprio `--mc-radius-glass` (20 px / 24 px, levemente elíptico) e aro interno (sulco `material-groove` + aresta `material-highlight`) que sugerem convexidade **pela moldura**; reflexo suave no topo e vinheta mais perceptível nas extremidades, ambos na camada de efeitos **atrás** do conteúdo; scanlines continuam discretas (camada própria, opacidade 0.45). Sem `transform`, sem blur, sem deformar conteúdo.
- **Profundidade shell → bezel → vidro:** shell com bisel (aresta clara em cima, sulco embaixo); bezel mais escuro e espesso (24 px) com luz rasante no topo; vidro com aro. Sem novas sombras pesadas (a única sombra continua sendo `--mc-shadow-object` no shell).
- **Faixa inferior de hardware:** MC-01 à esquerda; à direita, ranhuras de ventilação discretas, **um** botão físico simples e o LED. Tudo decorativo (`aria-hidden`), não interativo. Sem knobs, controles analógicos, grade de alto-falante ou painéis de botões.
- **Mobile (container ≤ 34 rem):** inalterado em espírito: moldura mínima, raio de UI no vidro, sem efeitos, ranhuras nem botão; conteúdo primeiro.
- `--mc-radius-glass` é um raio de **objeto físico** e só pode ser usado no vidro do CRT; a escala de raios da UI (0, 4 px, circular) não muda.

### Validação responsiva e acessibilidade (Sprint 4)

- Larguras 1280, 820 e 390 px (pt-BR e en): **sem scroll horizontal**; cartuchos com altura idêntica por breakpoint; CRT legível.
- Defeito encontrado e corrigido no `mc-section-header` (Sprint 3): título longo no mobile deixava o marcador ■ sozinho numa linha. O marcador agora é parte do heading (pseudo-elemento alinhado à 1ª linha, com recuo nas seguintes).
- Pares de contraste novos: tintas sobre os 4 materiais.

---

## Próximo (não iniciado)

Aguardando aprovação visual do Sprint 4. Depois: fundamentos restantes (XP, Motion, Easter Egg Language, responsive/a11y/i18n consolidados) e, então, a Home (FASE 3).
