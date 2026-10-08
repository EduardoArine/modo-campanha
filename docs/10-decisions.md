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

---

# Fechamento da FASE 1 — Visual Concept (2026-10-08)

## D-011 — Concept 03 aprovado como híbrido

- **Data:** 2026-10-08
- **Decisão:** **Concept 03 — Approved as Hybrid.** As duas imagens do Concept 03 (03-A e 03-B) são referências **complementares**, não alternativas. A direção visual está fechada; não haverá Concept 04/05 neste momento.
- **Contexto:** a FASE 1 produziu explorações visuais; o Concept 03 foi aprovado em duas leituras complementares. Os textos de projetos e descrições que aparecem nas imagens são **cópia de concept**, não conteúdo aprovado.
- **Motivo:** a versão A resolve estrutura e profissionalismo; a B resolve atmosfera e personalidade dos cartuchos. Juntas cobrem o princípio "Retro na linguagem. Moderno na experiência."
- **Alternativas:** escolher só uma das versões; nova rodada de concepts.
- **Status:** Aceita. Encerra a FASE 1.

## D-012 — Concept 03-A como base estrutural

- **Data:** 2026-10-08
- **Decisão:** o 03-A (versão limpa) é a referência principal de layout, grid, hierarquia, espaçamento, densidade, leitura e implementabilidade, e da seção **Player Status** (organização aberta, poucas caixas, separação por espaço e linhas: Origin, XP, Current Campaign, Focus, Sobre a jornada, Estado atual).
- **Contexto:** o 03-B é mais encaixotado e denso.
- **Motivo:** o 03-A é mais próximo de um produto real e mais fácil de implementar com grid, sem posicionamento absoluto.
- **Alternativas:** 03-B como base estrutural.
- **Status:** Aceita

## D-013 — Concept 03-B como base de atmosfera e dos cartuchos (MC-CART)

- **Data:** 2026-10-08
- **Decisão:** o 03-B (versão atmosférica) é referência para: (a) **atmosfera do Hero**, com aproximadamente 30% da riqueza visual (CRT, console MC-01, controle, luz quente, poucos objetos, leve sensação de ambiente físico); (b) **cartuchos**, base do futuro **MC-CART System**, com shells diferentes (preto, creme, grafite, laranja) e linguagem comum. Hero final = **70% 03-A (composição, hierarquia, respiro, organização) + 30% 03-B (atmosfera, luz, fisicalidade)**.
- **Contexto:** o 03-B cria universo, mas tem objetos demais para uma interface.
- **Motivo:** dar sensação de mundo sem que o cenário compita com o conteúdo; o Hero continua sendo interface implementável, não uma ilustração grande.
- **Alternativas:** Hero 100% 03-A (frio demais); Hero 100% 03-B (ilustrativo demais).
- **Status:** Aceita. MC-CART autoral: proibido copiar formatos de cartuchos reais (Nintendo, Sega etc.).

## D-014 — Laranja como identidade principal + paleta-base

- **Data:** 2026-10-08
- **Decisão:** laranja é a cor de marca. Paleta-base aprovada:
  - Brand `#F28C28`, Brand dark `#C96A1B`, Brand light `#FFB357`
  - Special/gold `#F2C14E`
  - Backgrounds: Main `#14110F`, Surface `#1D1815`, Panel `#231F1C`, Elevated `#2B2521`
  - Text: Primary `#F3E9D2`, Secondary `#D7CBB5`, Muted `#A89A86`
  - Complementary: Petrol `#1F3A4A`, Teal `#3FA7A3`
  - Status: Success/XP/online `#7FB069`, Danger `#C44536`
  - Proporção: 70% neutros escuros · 20% laranja/quentes · 10% complementares/status. Não transformar tudo em laranja.
- **Contexto:** a paleta conceitual da FASE 0 (`docs/04`, dark navy + cyan como destaque) foi explorada nos concepts e substituída pela direção quente.
- **Motivo:** o laranja quente sobre neutros marrom-escuros dá identidade própria, evita o clichê neon/cyberpunk e combina com a luz de CRT/ambiente do 03-B.
- **Alternativas:** paleta conceitual original (navy/cyan).
- **Status:** Aceita. **Substitui** a paleta conceitual de `docs/04` (mantida lá como histórico). Contraste medido em `docs/11-design-system.md`.

## D-015 — MC-01 é linguagem de sistema, não marca paralela; monograma MC

- **Data:** 2026-10-08
- **Decisão:** a marca é **Modo Campanha**. **MC-01** é a nomenclatura interna do sistema (como MC-CART, SAVE 01, PLAYER 01, CAMPAIGN BUILD, SYSTEM ONLINE), nunca uma segunda marca. Direção de símbolo: monograma autoral **MC**, que poderá virar símbolo, favicon, loading, selo, ícone do sistema e assinatura visual. **A marca final ainda não será desenhada.**
- **Contexto:** os concepts exploraram MC/MC-01 e um alien.
- **Motivo:** MC é autoral e liga direto ao nome.
- **Alternativas:** alien (ver D-016); wordmark sem símbolo.
- **Status:** Aceita (direção). Desenho do monograma: backlog.

## D-016 — Alien descartado como símbolo principal

- **Data:** 2026-10-08
- **Decisão:** não usar alien/"space invader" como símbolo principal da marca.
- **Contexto:** o 03-B usa um alien como logo.
- **Motivo:** associação excessiva com arcade / Space Invaders (referência negativa "arcade genérico" e possível confusão com propriedade de terceiros).
- **Alternativas:** manter o alien como logo.
- **Status:** Aceita. (Uso pontual como easter egg ainda não está decidido; exige aprovação.)

## D-017 — Foto real no Player Card

- **Data:** 2026-10-08
- **Decisão:** o Player Card usa **foto real** do Eduardo. Proibido: personagem gerado, Eduardo em pixel art como representação principal, levels inventados (ex.: "LV 99"). Até existir o asset definitivo, usar placeholder claramente identificado: **FOTO DO EDUARDO** (como no 03-A).
- **Contexto:** o 03-B usa um retrato gerado.
- **Motivo:** reforça "XP real, sem personagem."
- **Alternativas:** avatar ilustrado/pixel art.
- **Status:** Aceita

## D-018 — Aplicação bilíngue pt-BR / en com troca em runtime

- **Data:** 2026-10-08
- **Decisão:** o site terá **Português (pt-BR, padrão)** e **Inglês (en)**. Todo conteúdo relevante terá as duas versões (Hero, Sobre, Skills, projetos, jornada, achievements, current quest, side quests, CTAs, navegação, mensagens, textos de acessibilidade, metadata/SEO). A troca acontece **em runtime**, no mesmo site. Nenhum texto hardcoded em componentes finais. Regra de voz: **"O sistema fala a linguagem dos videogames; Eduardo fala como pessoa."** Em pt-BR, labels de sistema podem permanecer em inglês (PLAYER STATUS, PROJECT INVENTORY, CURRENT QUEST, SKILL TREE, ACHIEVEMENT, CHECKPOINT, SAVE, SYSTEM, ONLINE), mas também vivem no dicionário, para serem traduzíveis se necessário.
- **Contexto:** portfólio voltado também a oportunidades internacionais.
- **Motivo:** alcance; o sistema bilíngue precisa existir desde a fundação dos componentes para não exigir refatoração.
- **Alternativas:** apenas pt-BR; dois sites separados.
- **Status:** Aceita. Estratégia técnica em D-020.

## D-019 — Separação de função: pixel font vs. fonte moderna

- **Data:** 2026-10-08
- **Decisão:** **Display/pixel**: "Modo Campanha", grandes headings, PLAYER STATUS, PROJECT INVENTORY, labels especiais, códigos, cartuchos, pequenos elementos de sistema. **Moderna/legível**: "Eduardo Arine", cargo, parágrafos, descrições, botões, navegação, textos profissionais, conteúdo dos projetos. A pixel font não domina a página.
- **Contexto:** os concepts misturam pixel e texto moderno; a fronteira precisava ser explícita.
- **Motivo:** legibilidade e coerência com D-004 e com a regra de voz de D-018.
- **Alternativas:** pixel font também no nome/cargo.
- **Status:** Aceita. Famílias específicas: proposta em `docs/11-design-system.md` (aguardando aprovação).

## D-020 — Estratégia de i18n: signals + dicionários tipados (proposta)

- **Data:** 2026-10-08
- **Decisão proposta:** solução própria e leve: `LocaleService` com `signal<Locale>`; dicionário de UI tipado (`pt-BR` como fonte da forma, `en` validado pelo TypeScript com o mesmo shape); conteúdo com campos `Localized<T>` (`{ 'pt-BR': T; en: T }`); sem dependência nova. Detalhes em `docs/06-technical-architecture.md` (seção i18n).
- **Contexto:** dois idiomas, troca em runtime, app pequena e conteúdo majoritariamente estático (D-018).
- **Motivo:** (1) troca instantânea em runtime sem reload; (2) tipagem completa: esquecer uma tradução quebra o build; (3) zero dependências; (4) conteúdo estruturado (projetos, skills) fica junto, em um só lugar, nos dois idiomas.
- **Alternativas avaliadas:**
  - **Angular i18n nativo (`$localize`)**: excelente para SEO (um build estático por idioma), mas é compile-time: troca de idioma = outro bundle/URL com reload; ruim para conteúdo estruturado em `data/`; dobra o deploy. Rejeitado como base.
  - **Transloco / ngx-translate**: runtime e maduros, mas chaves em string (tipagem fraca sem tooling extra), JSON separado do conteúdo e dependência extra para 2 idiomas. Reavaliar se houver > 3 idiomas ou tradutores não-devs.
- **Status:** ~~Proposta~~ → **Aceita em 2026-10-08**, com refinamentos:
  - rotas: `/` → pt-BR, `/en` → en;
  - **a URL é a principal fonte de verdade do idioma**; `localStorage` poderá no futuro lembrar uma preferência, mas nunca substitui a URL nem impede deep links;
  - ao trocar o idioma, a arquitetura atualiza conteúdo, `<html lang>`, title, description, aria-labels, alt texts, metadata e URL;
  - **todos** os textos passam pelo modelo de tradução, inclusive labels de sistema (um termo como `PLAYER STATUS` pode ter o mesmo valor nos dois idiomas por decisão de conteúdo, nunca por hardcode);
  - SEO estático / prerender das duas versões e `hreflang` ficam para a FASE 8.
  - Implementação: `src/app/core/i18n/` (ver `docs/06-technical-architecture.md`).

## D-021 — XP profissional ≠ Campaign XP

- **Data:** 2026-10-08
- **Decisão:** **XP profissional** representa experiência real ("10+ anos em tecnologia") e **nunca** é convertido arbitrariamente em pontos. **Campaign XP** é um possível sistema futuro do próprio Modo Campanha (ex.: "CAMPAIGN XP 2.450 · ÚLTIMO GANHO +150"), que só poderá existir com **regras reais e verificáveis** (eventos candidatos: projeto publicado, estudo concluído, nova skill registrada, projeto entregue, checkpoint profissional). Nenhuma pontuação definida agora.
- **Contexto:** concepts sugerem contadores de XP/levels.
- **Motivo:** coerência com "XP real, sem personagem" e com a proibição de métricas inventadas.
- **Alternativas:** pontuação simbólica livre.
- **Status:** Aceita (regra). Campaign XP: item de product exploration no backlog.

---

# FASE 2 — MC Design System

## D-022 — Sprint 1 aprovado: Typography, Grid e Spacing

- **Data:** 2026-10-08
- **Decisão:**
  - **Typography:** Pixelify Sans (display/sistema) + IBM Plex Sans (texto). Só essas duas famílias. **Pixelify não é obrigatória em labels muito pequenos**: ela fica com títulos, headings, MC-CART, códigos e elementos de sistema a partir de ~14 px; micro-labels de 12–13 px usam IBM Plex Sans em caixa alta. Poucos pesos, WOFF2 otimizado e self-hosted. Escala aprovada como base, refinável na implementação.
  - **Grid:** container de 1200 px; 12/8/4 colunas; gutters 24/24/16; Hero 6/6; Inventory em grid, sem carrossel: 4 por linha (desktop), 2 (tablet), **1 (mobile, baseline)**. Player Status 4/4/4 como composição inicial, **não como restrição**: "o grid organiza; ele não obriga simetria" (3/4/5 é válido se o conteúdo pedir).
  - **Spacing:** escala fechada 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128, sem novos valores. Arquitetura preparada para aliases semânticos (section, block, component) que só referenciam primitivos.
- **Contexto:** proposta do Sprint 1 da FASE 2, comparada em página de especímenes com três pares tipográficos (A: Pixelify + Plex; B: Silkscreen + Inter; C: Jersey 10 + Atkinson Hyperlegible Next).
- **Motivo:** par A cobre todos os usos de sistema com uma pixel font só e mantém o texto técnico e profissional; grid e spacing reproduzem o Concept 03-A sem posicionamento absoluto.
- **Alternativas:** pares B e C; Player Status rígido em 4/4/4; Inventory em carrossel; 2 cartuchos por linha no mobile (a testar depois).
- **Status:** Aceita e implementada (`src/styles/tokens/`, `docs/11-design-system.md`).

## D-023 — Fontes self-hosted empacotadas pelo build

- **Data:** 2026-10-08
- **Decisão:** os WOFF2 (subset latin, variáveis) ficam em `src/styles/fonts/` e são referenciados por `url()` relativo no Sass; o build do Angular os copia para `media/` com hash no nome. Substitui a ideia anterior de `public/fonts/` (`docs/06`).
- **Contexto:** o site roda sob `base-href` variável (`/` local, `/modo-campanha/` no Pages, possivelmente `/` com domínio próprio).
- **Motivo:** caminhos corretos em qualquer `base-href`, cache longo seguro (hash), nenhuma dependência npm e nenhuma requisição ao Google Fonts em runtime (privacidade e performance). O subset latin (Latin-1) cobre todos os caracteres de pt-BR e en; validado com fontkit.
- **Alternativas:** `public/fonts/` (sem hash, caminho depende do base-href); Google Fonts CDN; pacotes `@fontsource/*`.
- **Status:** Aceita. Preload da fonte do Hero fica para a FASE 8 (o nome com hash exige ajuste no `index.html` gerado).

## D-024 — Sprint 2 aprovado: Colors, Borders e Surfaces

- **Data:** 2026-10-08
- **Decisão:**
  - **Colors** em duas camadas: primitivos (`--mc-color-*`, só dentro dos tokens) e semânticos (`--mc-*`, únicos permitidos em componentes). Tokens funcionais explícitos para foco (`--mc-focus-ring`), links (`--mc-link`, `--mc-link-hover`), interação (`--mc-interactive-hover`, `--mc-interactive-active`) e desabilitado (`--mc-disabled-bg`, `--mc-disabled-text`, `--mc-disabled-border`). **Foco por teclado é contrato próprio do sistema**, não reutilização casual do accent. Nenhuma cor-base nova.
  - **Borders:** 1 px estrutura; 2 px objetos físicos e foco; subtle, default (interativa) e accent (especial); radius 0, 4 px e circular só para elementos circulares. Cantos de mira **exclusivos do Player Card**. A borda do Player Card é decorativa e **nunca** é o único indicador de estado funcional.
  - **Surfaces:** bg, surface, panel, elevated; profundidade por luminosidade, não por sombra; máximo dois níveis aninhados.
  - **Sombras** só para objetos físicos do universo (MC-CART, console MC-01, CRT). **Glow** só na área visual do Hero, no CRT e no boot de cartucho.
  - **Header sólido**: sem glassmorphism, blur ou translucidez estilo SaaS.
- **Contexto:** proposta do Sprint 2 da FASE 2, com contraste medido sobre a paleta D-014.
- **Motivo:** cores com função explícita impedem usos que quebram contraste ou diluem o laranja; separar UI digital de objetos físicos mantém a interface limpa e o universo crível.
- **Alternativas:** componentes usando primitivos direto; elevação por sombras; glow como estilo geral do acento.
- **Status:** Aceita e implementada (`src/styles/tokens/_color.scss`, `_surface.scss`, `docs/11`).

## D-025 — Contratos de contraste verificados na compilação

- **Data:** 2026-10-08
- **Decisão:** o design system mantém uma **lista explícita de supported color pairs** (`$supported-pairs` em `src/styles/tokens/_contrast.scss`), cada um com tipo (`text` 4.5, `large-text` 3, `non-text` 3). A verificação roda na compilação do CSS global: par abaixo do mínimo faz `npm run build` e `npm test` falharem. Pares fora da lista não são suportados e não são testados.
- **Contexto:** pedido de teste automatizado de contraste sem testar todas as combinações possíveis da paleta.
- **Motivo:** fonte única de verdade (os próprios tokens Sass, sem duplicar valores em TypeScript); roda em todo build local e no CI do deploy; camadas translúcidas são compostas sobre a superfície correta.
- **Alternativas:** teste Vitest com valores duplicados em TS (risco de divergência); ler o SCSS no teste (frágil no runner do Angular); testar a paleta inteira (ruído com pares que nunca devem existir).
- **Status:** Aceita e implementada. Verificado que um par inválido (`accent-active` como texto sobre `panel`, 4.33:1) quebra build e testes.

## D-026 — H1 semântico identifica Eduardo Arine (direção para a FASE 3)

- **Data:** 2026-10-08
- **Decisão:** o H1 principal da página identifica **Eduardo Arine**. "MODO CAMPANHA" pode ser visualmente maior sem ser o H1; a hierarquia visual não precisa reproduzir literalmente a hierarquia de headings HTML.
- **Contexto:** no Concept 03, "MODO CAMPANHA" é o maior texto do Hero.
- **Motivo:** SEO e leitores de tela devem identificar a pessoa do portfólio; a marca é contexto.
- **Alternativas:** H1 = "Modo Campanha"; H1 combinado.
- **Status:** Direção aprovada; validar na implementação do Hero (FASE 3).
