# 10 — Decision Log

Registro simples de decisões de arquitetura e produto. Novas decisões entram no final, com ID sequencial. Decisões não são apagadas: quando mudarem, marcar como `Substituída por D-XXX`.

Status possíveis: `Aceita` · `Proposta` · `Substituída` · `Rejeitada`

---

## D-001 — Angular como framework

- **Data:** 2026-10-07
- **Decisão:** construir o portfólio em Angular, com standalone components, TypeScript, SCSS e Angular Router.
- **Contexto:** portfólio onepage com evolução futura (cases dedicados, área secreta).
- **Motivo:** domínio de Eduardo na tecnologia; o portfólio também demonstra a stack principal de trabalho. Router incluído desde já para permitir crescimento sem refatoração.
- **Alternativas:** Astro, Next.js, HTML/CSS puro.
- **Status:** Aceita

## D-002 — Onepage

- **Data:** 2026-10-07
- **Decisão:** o site começa como uma única página com seções ancoradas.
- **Contexto:** a narrativa de "campanha" é sequencial; o visitante percorre a trajetória rolando.
- **Motivo:** simplicidade, fluxo narrativo contínuo, fácil de consumir em pouco tempo.
- **Alternativas:** site multipágina desde o início.
- **Status:** Aceita

## D-003 — GitHub Pages como hospedagem

- **Data:** 2026-10-07
- **Decisão:** publicar via GitHub Pages com GitHub Actions, em `/modo-campanha/`. Workflow com disparo manual até o conteúdo estar pronto.
- **Contexto:** site estático, sem backend.
- **Motivo:** gratuito, integrado ao repositório, sem infraestrutura extra.
- **Alternativas:** Vercel, Netlify, Cloudflare Pages.
- **Status:** Aceita

## D-004 — Retro na linguagem, moderno na experiência

- **Data:** 2026-10-07
- **Decisão:** a estética de videogame retrô é linguagem/identidade; a usabilidade segue padrões modernos. Proporção ~30% retro / 70% moderno.
- **Contexto:** o portfólio precisa ser autoral e profissional ao mesmo tempo.
- **Motivo:** evitar tanto o template genérico quanto o fangame; recrutadores precisam navegar sem atrito.
- **Alternativas:** imersão total em jogo (navegação "jogável"); portfólio convencional sem tema.
- **Status:** Aceita

## D-005 — Projetos representados como cartuchos

- **Data:** 2026-10-07
- **Decisão:** cada projeto é um cartucho de videogame em um inventário (Project Inventory).
- **Contexto:** precisamos de uma metáfora forte e reutilizável para os projetos.
- **Motivo:** cartuchos são reconhecíveis, colecionáveis, comunicam "cada projeto é um mundo" e podem virar peças de social media.
- **Alternativas:** cards tradicionais, cartas colecionáveis (card game), fases de um mapa.
- **Status:** Aceita

## D-006 — CRT como visualizador de projetos

- **Data:** 2026-10-07
- **Decisão:** os cases aparecem dentro de uma TV de tubo retrô; o efeito CRT fica na moldura.
- **Contexto:** complementa a metáfora do cartucho (cartucho → console → TV).
- **Motivo:** identidade forte sem comprometer a legibilidade dos screenshots e textos.
- **Alternativas:** modal convencional, página dedicada, tela de console portátil.
- **Status:** Aceita

## D-007 — Sem barras percentuais de skills

- **Data:** 2026-10-07
- **Decisão:** competências nunca são exibidas com percentuais ou níveis numéricos. Estados qualitativos (`unlocked`, `evolving`, `core`, `exploring`) poderão ser usados.
- **Contexto:** barras como "Angular 95%" são comuns em portfólios.
- **Motivo:** percentuais são arbitrários, não comunicam nada verificável e contrariam o princípio "XP real, sem personagem".
- **Alternativas:** barras de progresso, estrelas, níveis numéricos.
- **Status:** Aceita

## D-008 — Easter eggs fazem parte do produto

- **Data:** 2026-10-07
- **Decisão:** easter eggs (Secret Area, Konami Code) são parte oficial da experiência, documentados em `docs/08-easter-eggs.md`. Efeitos dependem de aprovação.
- **Contexto:** a linguagem de games pede descoberta e recompensa.
- **Motivo:** reforça a identidade e recompensa a exploração sem custo para quem não os encontra.
- **Alternativas:** nenhum easter egg; easter eggs anunciados abertamente.
- **Status:** Aceita

## D-009 — Angular 21 na fundação (em vez de 22)

- **Data:** 2026-10-07
- **Decisão:** gerar o projeto com Angular **21.2** (CLI 21.2.26).
- **Contexto:** a versão estável mais recente é o Angular 22.2, que exige Node `^22.22.3 || ^24.15.0 || >=26`. A máquina de desenvolvimento usa Node 22.14.0, e atualizar o Node é uma mudança no ambiente do Eduardo, fora do escopo da fundação.
- **Motivo:** Angular 21 ainda tem suporte, é compatível com o Node atual e já traz standalone por padrão, signals, zoneless, Vitest e builder esbuild. A migração para o 22 é feita com `ng update`.
- **Alternativas:** atualizar o Node e usar Angular 22 (preferível no médio prazo); forçar Angular 22 em Node incompatível (rejeitado).
- **Próximo passo:** instalar Node 24 LTS (ou ≥ 22.22.3), rodar `npx ng update @angular/core@22 @angular/cli@22` e atualizar `node-version` no workflow, se necessário. Ideal antes da FASE 3.
- **Status:** Aceita (temporária)

## D-010 — Assets em `public/assets/`

- **Data:** 2026-10-07
- **Decisão:** assets ficam em `public/assets/{images,icons,projects,cartridges,pixel}` em vez de `src/assets/`.
- **Contexto:** o Angular 21 substituiu `src/assets` pela pasta `public/`.
- **Motivo:** seguir o padrão atual do CLI, sem configuração extra.
- **Alternativas:** reconfigurar `angular.json` para `src/assets`.
- **Status:** Aceita
