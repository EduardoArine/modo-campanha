# CLAUDE.md — Modo Campanha

Guia para qualquer sessão de IA que trabalhe neste repositório. Leia inteiro antes de propor ou alterar algo.

## O que é

**Modo Campanha** é o portfólio profissional pessoal de **Eduardo Arine**, que apresenta a carreira dele como **uma campanha de videogame** (jogos retrô, RPGs, card games, cartuchos, interfaces de consoles antigos).

- Frase central: **"XP real, sem personagem."** Tudo é real; a linguagem de jogo é só a forma.
- Princípio de design: **"Retro na linguagem. Moderno na experiência."** (~30% retro/pixel, 70% produto digital moderno.)
- Voz: **"O sistema fala a linguagem dos videogames; Eduardo fala como pessoa."**
- **Bilíngue: pt-BR (padrão) + en**, troca em runtime (D-018). **A versão pt não mistura inglês** (D-084): só nomes próprios e identidade (MODO CAMPANHA, MC-01, MC-CART, SYSTEM HORIZON, XP, ONLINE, GitHub, LinkedIn, tecnologias).

## Direção visual aprovada (FASE 1 concluída)

**Concept 03 — Approved as Hybrid** (D-011). Não reinventar a direção nem propor novos concepts sem pedido explícito.

- **03-A** (limpo): base de estrutura, grid, hierarquia, espaçamento e do **Player Status**.
- **03-B** (atmosférico): ~30% da atmosfera do Hero (CRT, console MC-01, controle, luz quente) e base dos cartuchos **MC-CART** (shells preto, creme, grafite, laranja).
- Hero = 70% 03-A + 30% 03-B; interface implementável, não ilustração.
- Laranja `#F28C28` é a marca; paleta completa em D-014 / `docs/11`. Regra 70% neutros / 20% quentes / 10% complementares-status.
- Marca: **Modo Campanha**; símbolo: **glifo de quatro quadrados na placa do MC-CART** (G3, D-085; fonte `design/source/brand/build-symbol.mjs`; favicon e header). O monograma MC em letras não será desenhado. **MC-01** é linguagem de sistema, não marca. **Sem alien.**
- Player Card com **foto real** (oficial desde D-082: `design/source/player/eduardo-arine.png`, derivados em `public/assets/player/`). Sem levels/XP inventados (o "LV 99" do mockup virou o selo "XP 10+").
- **Pixelify Sans só em uso visualmente validado** (hoje: "MODO CAMPANHA" no Hero e o nome "EDUARDO ARINE" no Player Card, papel `display-player`, D-082): o "C" maiúsculo vira "O" (até 48 px "MC-01" lê "MO-01"), D-029. Uso novo de Pixelify exige validação visual no tamanho real. **IBM Plex Sans** para todo o resto, inclusive títulos de seção (caixa alta + peso + tracking + marcador). Sem terceira família; sem SVG para headings traduzíveis.
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
| `17-home-slice-05.md`               | Plano do Slice 05 (Final Checkpoint + footer da Home), D-052/D-054 |
| `18-home-slice-06.md`               | Plano do Slice 06 (Current Main Quest): Quest Briefing, MOCK dev-only (D-055) |
| `19-home-slice-07.md`               | Plano do Slice 07 (Side Quests): Side Quest Log, MOCK dev-only (D-056) |
| `20-game-feel-01.md`                | FASE 5: seleção de cartucho, inserção e CRT Project Viewer na Home (D-058) |
| `21-hero-refinement.md`             | Hero: refinamento (D-063), renders (D-066, histórico) e fundo aprovado direto (D-067, §7); acabamento e contrato da nova imagem (D-079, §8); harmonização com o MC-001 da coleção (D-089, §8.4)  |
| `22-system-horizon-teaser.md`       | SYSTEM HORIZON: teaser do CRT da Hero (attract mode), arquitetura e especificação dos assets (D-068) |
| `23-system-horizon-mvp.md`          | SYSTEM HORIZON: proposta do MVP interativo (visão dos dados, 5 atos, rota /system-horizon, a11y), D-069, aguardando aprovação |
| `24-project-inventory-experience.md` | Project Inventory: auditoria, direções A / B / H (híbrido recomendado), estados de inserção, viewer, múltiplos cartuchos; protótipo dev-only `/dev/inventory-lab`; D-075; H2 na Home §17 (D-077/D-078); biblioteca MC-CART com seis cartuchos §18 (D-087; APPROVED / FROZEN, D-088) |

Mantenha os docs em sincronia com o código. Ao concluir itens do roadmap, atualize os checkboxes.

## Arquitetura (resumo)

- Angular 22.2 + TypeScript 6.0, standalone, signals, `OnPush`, control flow nativo, SCSS, Vitest. Sem SSR. Node 24 (local e CI; upgrade em D-061).
- `src/app/features/<seção>/`: uma pasta por seção da onepage (`<nome>-section.ts`, `<section id="<nome>">`).
- `src/app/pages/home/home-page.ts`: compõe as seções **construídas** na ordem de `docs/03` (D-047). O teste `home-page.spec.ts` valida a ordem e que não há placeholders.
- `src/app/models/`: interfaces (`Achievement` [D-051: evidence obrigatório, sem badge/secret], `CampaignLogChapter` [D-070–D-074; capítulos reais, linha profissional aposentada], `Project` [D-044: serial MC-NNN, publication, tags `TagId`, cartridge embutido], `Skill`, `SkillGroup` [Skill Loadout, sem proficiência], `PlayerProfile`, `SocialLink`).
- `src/app/data/`: conteúdo estático tipado (skills, tags, projetos, perfil, links sociais), com textos humanos em `Localized<T>` (ver `docs/07`).
- i18n (D-020): `src/app/core/i18n/`. **A URL é a fonte da verdade** (`/` pt-BR, `/en` en); trocar idioma = navegar. Componentes usam `inject(LocaleService).ui` (dicionário tipado) e `pick()` para conteúdo `Localized`. Todo texto novo entra em `ui.pt-BR.ts` **e** `ui.en.ts`. Sem bibliotecas de i18n; sem localStorage sobrepondo a URL.
- `src/app/shared/ui/`: primitivos do design system: `mc-icon` (16/20/24; sem `label` = decorativo), `a[mcAction]`/`button[mcAction]` (`primary` no máximo 1 por região, `secondary`, `text`; navegação = `<a>`, ação = `<button>`), `mc-chip` (warm/cool, informativo), `mc-status` (active/in-progress, sempre com texto), `mc-section-header`. Reusar antes de criar.
- `src/app/shared/signature/`: componentes autorais: `mc-player-card` (UI digital, foto real dominante, selo com dado real e barra segmentada decorativa, sem métricas inventadas; cantos de mira removidos em D-082), `mc-cart` (objeto físico, shells dark/light/orange/cool, `role="img"`, não clicável no componente; o Inventory usa clique como atalho de ponteiro do botão "Inserir cartucho", D-058), `mc-project-summary` (nome, descrição, até 2 chips), `mc-crt-frame` (base visual do CRT, presentational, sem contexto nem textos) e `mc-crt-project-viewer` (frame + região rotulada + "INSERT CARTRIDGE"; efeitos atrás do conteúdo, nunca corta; fora do Inventory desde D-077), `mc-console` (MC-01 em três camadas oficiais, geometria do console em `console.geometry.ts`, só transform) e `mc-crt-front` (CRT frontal com tubo transparente e camada digital atrás do render, D-080; no Inventory, teaser recuado 2,5% e reflexo estático no standby, D-081). Objetos físicos usam tokens `--mc-material-*` e `--mc-shadow-object`; UI digital não. Três níveis de token: primitive → semantic UI → physical material; **material tokens não criam uma segunda paleta**. `--mc-radius-glass` só no vidro do CRT.
- CSS: orçamento de estilo por componente → enxugar antes de aumentar (D-035). Abreviações utilizadas para otimização de CSS/SCSS devem permanecer locais ao componente e documentadas. Elas não devem reduzir a clareza de APIs públicas, tokens do Design System ou contratos compartilhados.
- Showcase dev-only: `npm start` → `/dev/design-system` (D-028). Nunca registrar rotas de dev em produção.
- `src/app/core/`: infraestrutura transversal (boot, konami listener). `src/app/shared/`: componentes reutilizáveis (só criar quando um elemento se repetir).
- `src/styles/`: tokens em `tokens/` (typography, grid, spacing, breakpoints), emitidos como `--mc-*`. Em componentes: `@use 'mc' as *;` → `@include type(section-title)`, `space(5)`, `@include columns`, `@include mq(lg)`. Fontes em `src/styles/fonts/` (Pixelify Sans só em `display-hero` e `display-player`; IBM Plex Sans no resto, D-029, D-082). Escala de spacing fechada. **Cores: só tokens semânticos** via `var(--mc-<token>)` (`--mc-text`, `--mc-accent`, `--mc-focus-ring`...); primitivos `--mc-color-*` nunca em componentes. Combinação nova de cor = adicionar em `$supported-pairs` (`tokens/_contrast.scss`); o build falha se não passar. Sombra só em objetos físicos; glow só no Hero visual/CRT/boot; header sólido; cantos de mira sem uso atual (saíram do Player Card em D-082).
- `public/assets/`: imagens, ícones, cartuchos, pixel art (referenciar como `assets/...`).
- Convenção de nomes do Angular 20+: `hero-section.ts` → `HeroSection` (sem sufixo `.component`).
- Código em inglês; comentários e docs em português.

## Comandos

```bash
npm start                 # dev server em http://localhost:4200
npm run build             # build de produção (base-href /)
npm run build:gh-pages    # build para GitHub Pages (base-href /modo-campanha/)
npm test -- --watch=false # testes (Vitest)
npx prettier --check "src/**/*.{ts,html,scss}"
```

Deploy: `.github/workflows/deploy-pages.yml`, **disparo manual** (`workflow_dispatch`); pós-build em `scripts/pages-postbuild.mjs` (404, `/en` em inglês, canonical/hreflang, sitemap, D-084). Requer Settings → Pages → Source: GitHub Actions.

## Roadmap e fase atual

- FASE 0 ✅ · FASE 1 ✅ (Concept 03 híbrido).
- FASE 2 ✅: MC Design System Core (D-030) e **Sprint 4 — Signature Components: APPROVED** (D-036).
- **FASE 3 — Core Experience: encerrada (D-048).** Itens de interação (CRT Viewer na Home, seleção/inserção de cartucho, transição para o CRT, motion) foram para a FASE 5. **Modo autônomo (D-053):** BUILDER + REVIEWER independente por etapa, branch `feat/autonomous-site-completion`, sem merge em `main` e sem deploy até a revisão final do Eduardo. **Home Slice 05 — Final Checkpoint: APPROVED** (D-052, D-054, `docs/17-home-slice-05.md`): Save Point Editorial (SAVE COMPLETE, frase em `PlayerProfile.closing`, GitHub/LinkedIn secondary) + footer da Home (`core/layout/site-footer/`, renderizado pela `HomePage` fora do `<main>`, não no shell); ambos FROZEN. **Home Slice 06 — Current Main Quest** (D-055, `docs/18-home-slice-06.md`): Quest Briefing com `mc-status` IN PROGRESS; conteúdo **MOCK** (`current-quest.data.development.ts`, id `mock-current-quest`, "Campanha de exemplo"), produção `null` e seção não renderizada; **o MOCK não é fato sobre o Eduardo nem descreve a Comunidade On**; 06-C editorial pendente. **Home Slice 07 — Side Quests** (D-056, `docs/19-home-slice-07.md`): Side Quest Log; conteúdo **MOCK** (`side-quests.data.development.ts`, ids `mock-side-quest-*`), produção vazia; **o MOCK não é fato sobre o Eduardo**; Paco segue fora do runtime (novo serial quando aprovado; MC-002 = AEDES REVENGE, D-087); 07-C editorial pendente. **Estado em 2026-10-11 (D-062):** rodada autônoma concluída na branch `feat/autonomous-site-completion` (sem merge/deploy); FASES 4 (estrutura), 5 e 8 concluídas; pendências = conteúdo real, FASE 6, Progress, prerender, monograma e publicação, todas do Eduardo. **Fase de referência: FASE 4 — Career Content. Histórico do Slice 03 — Campaign Log** (`docs/15-home-slice-03.md`, D-048): plano e direção **A + C (Checkpoint Log Editorial)** aprovados; `CampaignLogKind = origin | checkpoint | current` (rótulos NEW GAME / CHECKPOINT / CAMPANHA ATUAL vêm da UI); **03-B — Campaign Log visual APPROVED e congelado (D-050)**; estado: STRUCTURE / VISUAL approved · **EDITORIAL CONTENT pending factual review** (03-C, não bloqueia o resto da Home). Summary ideal ~120–140 caracteres (regra editorial, sem line-clamp); entrada current em aberto exibe DESDE / SINCE. **Conteúdo real canônico (D-074):** CHAPTER 00 — ORIGIN (c. 1991, D-070), CHAPTER 01 — DO CONTROLE AO CÓDIGO (FATEC Americana, 2013–2017, D-071) e CHAPTER 02 — DO CÓDIGO AO PRODUTO (2018–atual: ScoutEvo 2018, EOS 2019, Axia c. 2020/2021, Comunidade ON desde 2025; em aberto com CURRENT QUEST — EM ANDAMENTO + lema; D-072/D-073), aprovados pelo Eduardo; `CAMPAIGN_LOG_CHAPTERS` (`campaign-log.data.ts`) é a mesma fonte em todos os ambientes, sem `fileReplacements` nem `isDevMode()`; a linha profissional MOCK (D-049) e o modelo `CampaignLogEntry` foram **aposentados**; `docs/15` §13–§17; nenhuma data inferida; grafia pública "Comunidade ON"; Jornada no header (D-084). **Home Slice 04 — Achievements** (`docs/16-home-slice-04.md`, D-051): plano e direção **A + B (Achievement Record Panel)** aprovados; 04-A com **MOCK** (`achievements.data.development.ts`, ids `mock-achievement-*`); **04-B visual APPROVED e FROZEN** (inclui 2 itens em 8/12 no xl); 04-C editorial pendente; produção vazia; seção só com **≥ 2** achievements (`achievements.rules.ts`); `evidence` obrigatório; nunca repetir outras seções para completar itens; Comunidade On não é achievement. **O MOCK não é fato sobre o Eduardo.** Commits locais até a revisão. Histórico: Home Slice 01 (`docs/12-home-slice-01.md`, D-037): **HOME SLICE 01 — APPROVED** (D-039). **Não modificar Header, Hero ou Player Status aprovados sem regressão justificada e relatada.** Slice 02 (**Skill Loadout** + Project Inventory, D-040): plano aprovado (`docs/13-home-slice-02.md`), 02-0 aprovado (D-041, D-042, `docs/14`); 02-A concluído (`SKILL_LOADOUT`, só skills aprovadas); **02-B Skill Loadout APPROVED e congelado** (`features/skill-loadout/`, D-043; não alterar salvo regressão); **02-C APPROVED** (`Project`, `TAGS`, `publishedProjects`/`inventoryProjects`, `features/project-inventory/`, D-044; runtime só com projetos aprovados); **02-C.5 APPROVED** (artwork System Horizon Refined do MC-001, D-045/D-046; **evoluído em D-065**: MC-001 oficial = renders `front` (Inventory) e `threeQuarter` (product shot) + artwork SYSTEM HORIZON em `public/assets/cartridges/mc-001/`, shell grafite com acentos laranja, fontes PNG em `design/source/mc-cart/`; o glifo de quatro quadrados é *system/hardware glyph*, não logo; arte decorativa dentro do MC-CART, alt guardado no modelo; artworks seguem a gramática de família, não um template); **Project Inventory = H2, Physical Cartridge Experience** (D-075–D-078, `docs/24` §17; **APPROVED / consolidado**, sem deploy): o MC-CART é inserido no MC-01 em camadas (`mc-console`, só transform) e o CRT frontal (`mc-crt-front`) mostra a arte oficial e o teaser sob demanda; case fora do vidro; estado de domínio único em `inventory.machine.ts`; MC-001 = SYSTEM HORIZON (Modo Campanha é o portfólio); a carcaça do encaixe físico (`renders.console`) é a referência oficial do MC-001 na experiência interativa e a interface pública nunca mostra duas identidades do cartucho (D-078; `front`/`threeQuarter` ficam como referência); tipo EXPERIÊNCIA NARRATIVA; MC-01 canônico do Inventory = console frontal do H2 (Hero harmonizada em D-086/D-089); a grade + case no CRT da FASE 5 (D-058, `docs/20-game-feel-01.md`) foi substituída. **Biblioteca MC-CART (D-087, `docs/24` §18; APPROVED / FROZEN em D-088, não alterar salvo regressão objetiva):** seis cartuchos oficiais (MC-001 SYSTEM HORIZON, MC-002 AEDES REVENGE, MC-003 SCOUTEVO, MC-004 EOS, MC-005 AXIA, MC-006 COMUNIDADE ON) em `cartridge-library` acima da estação; selecionado ≠ inserido; com cartucho inserido, uma escolha faz ejetar → inserir → carregar → PRONTO; cases condensados do Campaign Log (evidências importadas da mesma fonte); MC-002…006 mostram a ilustração do rótulo no CRT (contain), sem teaser; carcaça do MC-001 = arte da coleção, identidade oficial (revê a D-078, aprovado em D-088; og:image e Hero harmonizadas, D-089); na troca, o case anterior reserva o espaço (invisível, inerte) e o selo fica CARREGANDO até o PRONTO; assets por `design/source/mc-cart/build-collection.mjs`; o Paco ainda não recebe código MC-CART. Boot / Intro na tela do CRT do Hero (D-059) removido em D-067 e **retomado no teaser SYSTEM HORIZON (D-068)**; strings `ui.boot` removidas. **FASE 5 concluída** (Progress sem definição, decisão do Eduardo). **FASE 8 (D-060):** skip link no shell, `scroll-padding-top` com a altura real do header (`--mc-header-block`), SEO bilíngue no `LocaleService` (hreflang, canonical, Open Graph), `robots.txt`; prerender pendente de decisão. **FASE 6 (Secrets) bloqueada por decisão do Eduardo** (efeitos exigem aprovação, `docs/08`). 02-D e 02-E absorvidos; **02-F APPROVED: HOME SLICE 02 — APPROVED** (D-047). Skill Loadout, Project Inventory, MC-001 e artwork congelados. **A Home só renderiza seções construídas** (produção: Hero, Player Status, Skill Loadout, Project Inventory, Campaign Log, Final Checkpoint + footer); as demais entram com seus slices, sem placeholder público; seções com MOCK só em dev. **Nav só com destinos existentes** (Sobre / Projetos / Jornada → `#campaign-log` / Contato → `#final-checkpoint`, na ordem da página, D-084); no mobile (< 768 px) a nav é a segunda linha do header (D-057). **FASE 4: estrutura concluída (D-057)**; conteúdo editorial pendente (04-C, 06-C, 07-C; 03-C aprovado, D-074). GitHub Pages: sem deploy até decisão separada; próximo Slice só com autorização. Não implementar antes da aprovação do conteúdo. Projeto só renderiza com `publication: 'approved'` explícito; skill só com `status: 'approved'`; serial global `MC-NNN` (origem é campo separado); nenhum aprovador interno presumido; nada interno da Comunidade On publicado. **Repositório público:** nunca colocar no runtime ou em docs nomes de aprovadores, fluxos internos ou dados de revisão (D-042). Tags: catálogo com tone fixo por tag. "PROJECT ARTWORK" nunca no Inventory público (checkpoint 02-C.5). Player Status definitivo (D-082) **APPROVED / FROZEN** (D-083; não alterar salvo regressão objetiva): painel único do mockup (cabeçalho com barra de sistema MC-01 | MODO CAMPANHA | ● ONLINE, sem versão; Player Card; dados; Sobre a jornada; Estado atual + frase), ícones `pixel` no `mc-icon`; ONLINE aparece uma vez, como estado do sistema (o card não tem mais STATUS). Âncoras: offset do header no `ViewportScroller` (`app.config.ts`).
- Conteúdo humano em `src/app/data/profile.data.ts` (`PlayerProfile`, `Localized`); o dicionário de UI guarda só rótulos. Header em `src/app/core/layout/site-header/`; Hero em `src/app/features/hero/` (fundo: a imagem aprovada do setup MC-01 usada direto num `<picture>` decorativo, com recorte próprio no mobile; config em `hero-scene.assets.ts`; sem cena montada; D-067, `docs/21` §7; **arte final com as peças oficiais** (D-086; harmonizada com o MC-001 da coleção em D-089, **Hero APPROVED / FROZEN**: não alterar salvo regressão objetiva; mestre 3344 × 1882 em `design/source/hero/hero-background.png`, derivados por `build-background.mjs`); tubo do CRT transparente com o teaser atrás da imagem, folga só lateral, sem clip-path, D-080; D-079: contrato em `docs/21` §8.2 para trocas futuras; nunca gerar imagens no repositório nem recompor os PNGs oficiais sobre a foto; Pixelify Sans com preload no `index.html`, fontes sem hash via `outputHashing: "bundles"`). Cena em `hero-scene`: sobre o vidro do CRT da imagem roda o **attract mode do SYSTEM HORIZON** (D-068, `docs/22`), **base técnica APPROVED / FROZEN** (engine, roteiro, timings, pause/play, 3 voltas, reduced motion, responsivo, arquitetura: não alterar sem regressão objetiva); **cenário final integrado** (4 camadas, paleta única de 16 cores, `sh-palette.gpl`); personagem **provisório** (quadros aprovados reduzidos 2:1, quadro 16 × 24, `docs/22` §13; versão definitiva pendente); pickups, HUD e MC-CART em pixel art gerada no repositório (`design/source/system-horizon/pixel/build-pickups.mjs`, `docs/22` §14); **teaser aprovado pelo Eduardo para a publicação** (2026-10-19, D-084); arte nova sempre se adapta ao contrato de `docs/22` §4 (mesmas dimensões, pivots e layout; validar cenário + personagem antes de pickups e MC-CART, §11); System Horizon jogável fora de escopo; engine em `src/app/system-horizon/` (TypeScript puro: engine/world/scenes/control/content); textos da tela via `ui.systemHorizon`, em português na versão pt (D-084); pausa discreta + parada após 3 voltas; reduced motion/pausado = quadro-chave.
- Fases: 0 Foundation · 1 Visual Concept · 2 Design System · 3 Core Experience · 4 Career Content · 5 Game Feel · 6 Secrets · 7 Content · 8 Quality · 9 Release. Detalhes em `docs/09-roadmap.md`.

## Fluxo de trabalho

1. Ler os docs relevantes antes de começar.
2. Propor um plano curto e **pedir aprovação** para mudanças de fase, de direção visual ou de arquitetura.
3. Implementar em passos pequenos, sem overengineering e sem dependências desnecessárias.
4. Rodar build e testes antes de concluir.
5. Atualizar docs (roadmap, decisões, modelo de conteúdo) quando algo mudar.
6. Commits no padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`...). Branch principal: `main`.
7. Em caso de dúvida sobre conteúdo real (datas, projetos, resultados): **perguntar ao Eduardo**, nunca preencher.
