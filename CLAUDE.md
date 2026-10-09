# CLAUDE.md — Modo Campanha

Guia para qualquer sessão de IA que trabalhe neste repositório. Leia inteiro antes de propor ou alterar algo.

## O que é

**Modo Campanha** é o portfólio profissional pessoal de **Eduardo Arine**, que apresenta a carreira dele como **uma campanha de videogame** (jogos retrô, RPGs, card games, cartuchos, interfaces de consoles antigos).

- Frase central: **"XP real, sem personagem."** Tudo é real; a linguagem de jogo é só a forma.
- Princípio de design: **"Retro na linguagem. Moderno na experiência."** (~30% retro/pixel, 70% produto digital moderno.)
- Voz: **"O sistema fala a linguagem dos videogames; Eduardo fala como pessoa."**
- **Bilíngue: pt-BR (padrão) + en**, troca em runtime (D-018).

## Direção visual aprovada (FASE 1 concluída)

**Concept 03 — Approved as Hybrid** (D-011). Não reinventar a direção nem propor novos concepts sem pedido explícito.

- **03-A** (limpo): base de estrutura, grid, hierarquia, espaçamento e do **Player Status**.
- **03-B** (atmosférico): ~30% da atmosfera do Hero (CRT, console MC-01, controle, luz quente) e base dos cartuchos **MC-CART** (shells preto, creme, grafite, laranja).
- Hero = 70% 03-A + 30% 03-B; interface implementável, não ilustração.
- Laranja `#F28C28` é a marca; paleta completa em D-014 / `docs/11`. Regra 70% neutros / 20% quentes / 10% complementares-status.
- Marca: **Modo Campanha**; símbolo futuro: monograma **MC**. **MC-01** é linguagem de sistema, não marca. **Sem alien.**
- Player Card com **foto real** (placeholder "FOTO DO EDUARDO" até existir). Sem levels/XP inventados.
- **Pixelify Sans só em uso visualmente validado** (hoje, apenas "MODO CAMPANHA" no Hero): o "C" maiúsculo vira "O" (até 48 px "MC-01" lê "MO-01"), D-029. Uso novo de Pixelify exige validação visual no tamanho real. **IBM Plex Sans** para todo o resto, inclusive títulos de seção (caixa alta + peso + tracking + marcador). Sem terceira família; sem SVG para headings traduzíveis.
- Referências de imagem do concept não estão no repositório; as regras derivadas estão em `docs/04` e `docs/11`.

## Quem é Eduardo

Desenvolvedor de Produtos Digitais com mais de 10 anos em tecnologia. Formado em Tecnologia em Jogos Digitais pela FATEC Americana. Atua com frontend e backend (Angular, TypeScript, C#, .NET), IA aplicada ao desenvolvimento, UX, produto e gamificação. Campanha atual: construção da **Comunidade On**. Tem projetos pessoais ligados a games (ex.: *Paco: 23 Horas para a Última Vela*).

Fatos além destes **não devem ser presumidos**: pergunte.

## Objetivo do projeto

Registro da evolução profissional, portfólio, vitrine de projetos, ferramenta de aprendizado e extensão da identidade profissional. **Não** é uma persona de influencer.

## Regras fundamentais

1. **Não avançar uma fase significativa de design ou desenvolvimento sem aprovação do Eduardo.**
2. **Não transformar o Modo Campanha em um template genérico de portfólio de desenvolvedor.**
3. **Quando houver dúvida entre estética de jogo e usabilidade, priorizar usabilidade sem remover a identidade de jogo.**
4. **Antes de implementar uma nova ideia importante, consultar `/docs` e registrar a decisão em `docs/10-decisions.md` quando necessário.**
5. **Não inventar experiências, métricas, projetos, cargos ou resultados profissionais.**
6. **Manter o projeto divertido sem sacrificar profissionalismo.**

## Proibido

- Barras/percentuais de skill (`Angular 95%`).
- Conteúdo fictício em `src/app/data/` (exemplos só se marcados explicitamente como placeholder).
- Informações confidenciais ou internas da Comunidade On.
- Estéticas a evitar: infantil, fangame, arcade genérico, cyberpunk, terminal hacker, neon, RPG medieval, SaaS genérico, interface carregada.
- Fonte pixel em textos longos.
- Fontes proprietárias.
- Instalar biblioteca de UI (Material, PrimeNG etc.), de animação, backend, CMS ou analytics **sem decisão registrada e aprovada**.
- Animações que bloqueiam conteúdo ou ignoram `prefers-reduced-motion`.
- Easter eggs que atrapalham navegação, ou implementar efeitos de easter egg sem aprovação.
- Publicar no GitHub Pages ou ativar deploy automático sem avisar Eduardo.
- Usar marcas registradas de consoles (Nintendo, Sega etc.) nos assets ou copiar formatos de cartuchos reais.
- Texto hardcoded em componentes finais: todo texto vem do dicionário de UI ou de conteúdo `Localized` (pt-BR + en).
- Alien/space invader como símbolo; avatar gerado ou pixel art no lugar da foto do Eduardo; "LV 99" e pontuações de XP sem regra real.
- Implementar tokens/componentes definitivos do design system antes da aprovação da proposta correspondente em `docs/11`.

## Documentação (`docs/`)

| Arquivo                             | Conteúdo                                          |
| ----------------------------------- | ------------------------------------------------- |
| `01-product-vision.md`              | objetivo, público, o que é / não é                |
| `02-experience-concept.md`          | cada seção e momento da experiência               |
| `03-information-architecture.md`    | ordem da onepage, âncoras, componentes            |
| `04-visual-direction.md`            | 30/70, tipografia, paleta conceitual, a evitar    |
| `05-project-cartridge-system.md`    | cartuchos, console, CRT, estados, interação       |
| `06-technical-architecture.md`      | stack, estrutura, a11y, performance, GitHub Pages |
| `07-content-model.md`               | interfaces e dados                                |
| `08-easter-eggs.md`                 | Secret Area, Konami Code, regras                  |
| `09-roadmap.md`                     | fases 0–9 e decisões em aberto                    |
| `10-decisions.md`                   | decision log (D-001...)                           |
| `11-design-system.md`               | MC Design System: princípios, cores, tipografia, grid, spacing, backlog |
| `12-home-slice-01.md`               | Plano do primeiro vertical slice da Home (Header, Hero, Player Status) |
| `13-home-slice-02.md`               | Plano do Slice 02 (Skill Loadout + Project Inventory), publicação e confidencialidade |
| `14-content-inventory.md`           | Fichas de conteúdo (MC-001, MC-002) e validação do Skill Loadout (02-0), rascunho |
| `15-home-slice-03.md`               | Plano do Slice 03 (Campaign Log): modelo, conteúdo a receber, direção A + C |
| `16-home-slice-04.md`               | Plano do Slice 04 (Achievements): critérios, regra ≥ 2, Record Panel, MOCK |

Mantenha os docs em sincronia com o código. Ao concluir itens do roadmap, atualize os checkboxes.

## Arquitetura (resumo)

- Angular 21.2, standalone, signals, `OnPush`, control flow nativo, SCSS, Vitest. Sem SSR. Node local 22.14 (upgrade para Angular 22 pendente, ver D-009).
- `src/app/features/<seção>/`: uma pasta por seção da onepage (`<nome>-section.ts`, `<section id="<nome>">`).
- `src/app/pages/home/home-page.ts`: compõe as seções **construídas** na ordem de `docs/03` (D-047). O teste `home-page.spec.ts` valida a ordem e que não há placeholders.
- `src/app/models/`: interfaces (`Achievement` [D-051: evidence obrigatório, sem badge/secret], `CampaignLogEntry` [D-049], `Project` [D-044: serial MC-NNN, publication, tags `TagId`, cartridge embutido], `Skill`, `SkillGroup` [Skill Loadout, sem proficiência], `PlayerProfile`, `SocialLink`).
- `src/app/data/`: conteúdo estático tipado (skills, tags, projetos, perfil, links sociais), com textos humanos em `Localized<T>` (ver `docs/07`).
- i18n (D-020): `src/app/core/i18n/`. **A URL é a fonte da verdade** (`/` pt-BR, `/en` en); trocar idioma = navegar. Componentes usam `inject(LocaleService).ui` (dicionário tipado) e `pick()` para conteúdo `Localized`. Todo texto novo entra em `ui.pt-BR.ts` **e** `ui.en.ts`. Sem bibliotecas de i18n; sem localStorage sobrepondo a URL.
- `src/app/shared/ui/`: primitivos do design system: `mc-icon` (16/20/24; sem `label` = decorativo), `a[mcAction]`/`button[mcAction]` (`primary` no máximo 1 por região, `secondary`, `text`; navegação = `<a>`, ação = `<button>`), `mc-chip` (warm/cool, informativo), `mc-status` (active/in-progress, sempre com texto), `mc-section-header`. Reusar antes de criar.
- `src/app/shared/signature/`: componentes autorais: `mc-player-card` (UI digital, único com cantos de mira, sem métricas inventadas), `mc-cart` (objeto físico, shells dark/light/orange/cool, `role="img"`, não clicável), `mc-project-summary` (nome, descrição, até 2 chips), `mc-crt-frame` (base visual do CRT, presentational, sem contexto nem textos) e `mc-crt-project-viewer` (frame + região rotulada + "INSERT CARTRIDGE"; efeitos atrás do conteúdo, nunca corta). Objetos físicos usam tokens `--mc-material-*` e `--mc-shadow-object`; UI digital não. Três níveis de token: primitive → semantic UI → physical material; **material tokens não criam uma segunda paleta**. `--mc-radius-glass` só no vidro do CRT.
- CSS: orçamento de estilo por componente → enxugar antes de aumentar (D-035). Abreviações utilizadas para otimização de CSS/SCSS devem permanecer locais ao componente e documentadas. Elas não devem reduzir a clareza de APIs públicas, tokens do Design System ou contratos compartilhados.
- Showcase dev-only: `npm start` → `/dev/design-system` (D-028). Nunca registrar rotas de dev em produção.
- `src/app/core/`: infraestrutura transversal (boot, konami listener). `src/app/shared/`: componentes reutilizáveis (só criar quando um elemento se repetir).
- `src/styles/`: tokens em `tokens/` (typography, grid, spacing, breakpoints), emitidos como `--mc-*`. Em componentes: `@use 'mc' as *;` → `@include type(section-title)`, `space(5)`, `@include columns`, `@include mq(lg)`. Fontes em `src/styles/fonts/` (Pixelify Sans só em `display-hero`; IBM Plex Sans no resto, D-029). Escala de spacing fechada. **Cores: só tokens semânticos** via `var(--mc-<token>)` (`--mc-text`, `--mc-accent`, `--mc-focus-ring`...); primitivos `--mc-color-*` nunca em componentes. Combinação nova de cor = adicionar em `$supported-pairs` (`tokens/_contrast.scss`); o build falha se não passar. Sombra só em objetos físicos; glow só no Hero visual/CRT/boot; header sólido; cantos de mira só no Player Card.
- `public/assets/`: imagens, ícones, cartuchos, pixel art (referenciar como `assets/...`).
- Convenção de nomes do Angular 21: `hero-section.ts` → `HeroSection` (sem sufixo `.component`).
- Código em inglês; comentários e docs em português.

## Comandos

```bash
npm start                 # dev server em http://localhost:4200
npm run build             # build de produção (base-href /)
npm run build:gh-pages    # build para GitHub Pages (base-href /modo-campanha/)
npm test -- --watch=false # testes (Vitest)
npx prettier --check "src/**/*.{ts,html,scss}"
```

Deploy: `.github/workflows/deploy-pages.yml`, **disparo manual** (`workflow_dispatch`). Requer Settings → Pages → Source: GitHub Actions.

## Roadmap e fase atual

- FASE 0 ✅ · FASE 1 ✅ (Concept 03 híbrido).
- FASE 2 ✅: MC Design System Core (D-030) e **Sprint 4 — Signature Components: APPROVED** (D-036).
- **FASE 3 — Core Experience: encerrada (D-048).** Itens de interação (CRT Viewer na Home, seleção/inserção de cartucho, transição para o CRT, motion) foram para a FASE 5. **Fase atual: FASE 4 — Career Content: Home Slice 03 — Campaign Log** (`docs/15-home-slice-03.md`, D-048): plano e direção **A + C (Checkpoint Log Editorial)** aprovados; `CampaignLogKind = origin | checkpoint | current` (rótulos NEW GAME / CHECKPOINT / CAMPANHA ATUAL vêm da UI); **03-B — Campaign Log visual APPROVED e congelado (D-050)**; estado: STRUCTURE / VISUAL approved · **EDITORIAL CONTENT pending factual review** (03-C, não bloqueia o resto da Home). Summary ideal ~120–140 caracteres (regra editorial, sem line-clamp); entrada current em aberto exibe DESDE / SINCE. Conteúdo atual é MOCK (D-049): `campaign-log.data.ts` (produção) é vazio e não renderiza a seção; `campaign-log.data.development.ts` (MOCK, ids `mock-campaign-log-*`) entra só em dev/testes via `fileReplacements`; o deploy falha se o MOCK aparecer no build. **O MOCK não é fato sobre o Eduardo**: nunca copiar seus períodos/textos para perfil, docs de conteúdo, README ou SEO. 03-0 (histórico real) pendente; nenhuma data inferida; Jornada fora do header até a liberação. **Home Slice 04 — Achievements** (`docs/16-home-slice-04.md`, D-051): plano e direção **A + B (Achievement Record Panel)** aprovados; 04-A com **MOCK** (`achievements.data.development.ts`, ids `mock-achievement-*`); **04-B visual APPROVED e FROZEN** (inclui 2 itens em 8/12 no xl); 04-C editorial pendente; produção vazia; seção só com **≥ 2** achievements (`achievements.rules.ts`); `evidence` obrigatório; nunca repetir outras seções para completar itens; Comunidade On não é achievement. **O MOCK não é fato sobre o Eduardo.** Commits locais até a revisão. Histórico: Home Slice 01 (`docs/12-home-slice-01.md`, D-037): **HOME SLICE 01 — APPROVED** (D-039). **Não modificar Header, Hero ou Player Status aprovados sem regressão justificada e relatada.** Slice 02 (**Skill Loadout** + Project Inventory, D-040): plano aprovado (`docs/13-home-slice-02.md`), 02-0 aprovado (D-041, D-042, `docs/14`); 02-A concluído (`SKILL_LOADOUT`, só skills aprovadas); **02-B Skill Loadout APPROVED e congelado** (`features/skill-loadout/`, D-043; não alterar salvo regressão); **02-C APPROVED** (`Project`, `TAGS`, `publishedProjects`/`inventoryProjects`, `features/project-inventory/`, D-044; runtime só com projetos aprovados); **02-C.5 APPROVED** (artwork System Horizon Refined do MC-001 em `public/assets/cartridges/mc-001-modo-campanha.png`, D-045/D-046; arte decorativa dentro do MC-CART, alt guardado no modelo; artworks seguem a gramática de família, não um template); MC-001, MC-CART e Project Inventory **congelados**; MC-CART não clicável (futuro: seleção → CRT → case). 02-D e 02-E absorvidos; **02-F APPROVED: HOME SLICE 02 — APPROVED** (D-047). Skill Loadout, Project Inventory, MC-001 e artwork congelados. **A Home só renderiza seções construídas** (Hero, Player Status, Skill Loadout, Project Inventory); as demais entram com seus slices, sem placeholder público. **Nav só com destinos existentes** (Sobre / Projetos; Jornada e Contato voltam com as seções). GitHub Pages: sem deploy até decisão separada; próximo Slice só com autorização. Não implementar antes da aprovação do conteúdo. Projeto só renderiza com `publication: 'approved'` explícito; skill só com `status: 'approved'`; serial global `MC-NNN` (origem é campo separado); nenhum aprovador interno presumido; nada interno da Comunidade On publicado. **Repositório público:** nunca colocar no runtime ou em docs nomes de aprovadores, fluxos internos ou dados de revisão (D-042). Tags: catálogo com tone fixo por tag. "PROJECT ARTWORK" nunca no Inventory público (checkpoint 02-C.5). Player Status: STATUS só no Player Card, nunca no Section Header (D-039); sem "Sobre a jornada" até haver texto aprovado. Âncoras: offset do header no `ViewportScroller` (`app.config.ts`).
- Conteúdo humano em `src/app/data/profile.data.ts` (`PlayerProfile`, `Localized`); o dicionário de UI guarda só rótulos. Header em `src/app/core/layout/site-header/`; Hero em `src/app/features/hero/` (cena em `hero-visual`, console MC-01 é CSS local).
- Fases: 0 Foundation · 1 Visual Concept · 2 Design System · 3 Core Experience · 4 Career Content · 5 Game Feel · 6 Secrets · 7 Content · 8 Quality · 9 Release. Detalhes em `docs/09-roadmap.md`.

## Fluxo de trabalho

1. Ler os docs relevantes antes de começar.
2. Propor um plano curto e **pedir aprovação** para mudanças de fase, de direção visual ou de arquitetura.
3. Implementar em passos pequenos, sem overengineering e sem dependências desnecessárias.
4. Rodar build e testes antes de concluir.
5. Atualizar docs (roadmap, decisões, modelo de conteúdo) quando algo mudar.
6. Commits no padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`...). Branch principal: `main`.
7. Em caso de dúvida sobre conteúdo real (datas, projetos, resultados): **perguntar ao Eduardo**, nunca preencher.
