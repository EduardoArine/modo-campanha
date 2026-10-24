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
- **Status:** Aceita (temporária). **Substituída por D-061** (upgrade para Angular 22 feito com Node 24).

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
- **Status:** Aceita. Famílias específicas em D-022. **Refinada por D-029**: títulos de seção e códigos pequenos saíram da pixel font.

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
- **Status:** Aceita e implementada (`src/styles/tokens/`, `docs/11-design-system.md`). **Regra de uso da Pixelify refinada por D-029** (a lista "títulos, headings de seção, MC-CART, códigos ≥ 14 px" foi substituída).

## D-023 — Fontes self-hosted empacotadas pelo build

> **Parcialmente substituída (D-079):** as fontes saem do build sem hash (`outputHashing: "bundles"`) para o preload da Pixelify Sans no `index.html`. O cache longo por hash deixa de valer para elas, um custo desprezível no GitHub Pages (~10 min de cache para todos os arquivos).

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

## D-027 — Sprint 3 aprovado: Icons, Actions, Chips, Status e Section Header

- **Data:** 2026-10-08
- **Decisão:**
  - **Icons:** duas famílias, sem biblioteca. *MC system icons* próprios (grade 16 px, simples, técnicos, levemente pixel, sem estética de sprite), criados só quando usados; *brand icons* GitHub e LinkedIn como marcas oficiais monocromáticas, sem pixelização. Componente `mc-icon` com tamanhos fechados 16/20/24; decorativo = `aria-hidden`, informativo sem texto adjacente = nome acessível.
  - **Actions:** `primary` (no máximo um por região visual), `secondary` (contorno) e `text` (baixa ênfase, sublinhado discreto). Semântica nativa preservada: navegação = `<a>`, ação = `<button>`; estilos compartilhados, elemento correto. Alvo mínimo 44 × 44 px; estados do Sprint 2.
  - **Chips:** só `warm` e `cool`, informativos (sem pointer, role button ou aparência de filtro). Cor = categorização, não importância/status.
  - **Status:** indicador ~8 px + texto, só estados usados pelo produto (`active`, `in-progress`); nunca só cor; sem conjunto corporativo genérico.
  - **Section header:** código, subtítulo, divider e status opcionais; nenhuma parte obrigatória por simetria.
- **Contexto:** primitivos de interface que Hero, Player Status e Project Inventory vão consumir.
- **Motivo:** consistência sem dependências e sem virar design system corporativo genérico.
- **Alternativas:** biblioteca de ícones; componente `<mc-button>` único com `href` opcional (rejeitado: mistura semânticas); conjunto completo de variantes/estados.
- **Status:** Aceita e implementada (`src/app/shared/ui/`).

## D-028 — Showcase do design system só em desenvolvimento

- **Data:** 2026-10-08
- **Decisão:** a página `/dev/design-system` (e `/en/dev/design-system`) existe **apenas no build de desenvolvimento**. `src/app/dev/dev.routes.ts` exporta `DEV_ROUTES = []`; a configuração `development` do `angular.json` substitui esse arquivo por `dev.routes.development.ts` via `fileReplacements`. O `tsconfig.app.json` exclui as fontes do showcase das raízes de compilação, então a produção nem compila a página. O workflow de deploy falha se `design-system-page` aparecer no bundle.
- **Contexto:** a rota não pode existir em produção; esconder o link não basta.
- **Motivo:** a rota não é registrada nem empacotada em produção, com mecanismo nativo do Angular CLI e poucos arquivos.
- **Alternativas:** `isDevMode()` em runtime (código ainda iria para o bundle); projeto/aplicação separada no workspace (complexo demais para uma página interna).
- **Status:** Aceita e implementada. Verificado: build de produção sem o chunk; build de desenvolvimento com o chunk; guarda do CI testada nos dois casos.

## D-029 — Pixelify Sans restrita a display grande validado; títulos de seção em IBM Plex Sans

- **Data:** 2026-10-08
- **Decisão:** a Pixelify Sans passa a ser fonte de **brand/game-system display**, usada **somente onde os caracteres foram visualmente validados**. Validado hoje: "MODO CAMPANHA" (Hero). MC / MC-01 / MC-CART / seriais **não** passaram na validação em nenhum tamanho testado (até 48 px, "MC" lê "MO") e ficam em Plex até nova validação ou até o SVG autoral do monograma. Títulos de seção, códigos de sistema pequenos e nomes de projeto no MC-CART usam **IBM Plex Sans** em caixa alta, com peso e tracking. A linguagem de game nos títulos vem da composição do section header (marcador, divider, code, status). Sem terceira família; sem SVG para headings traduzíveis (SVG autoral só para monograma MC e wordmark).
- **Contexto (problema real, registrado sem atenuar):** no showcase do Sprint 3, o **"C" maiúsculo da Pixelify Sans mostrou baixa distinção** em tamanhos pequenos e intermediários ("AOTIONS", "OURRENT MAIN QUEST", "MO-01"). Validação em 1× e 2×, 14–96 px, pesos 400–700: ≤ ~24 px ambíguo em qualquer peso; ~28–48 px o peso 700 fecha o C; ≥ ~64 px legível em palavras; em códigos curtos sem contexto ("MC-01"), ambíguo até 48 px mesmo com peso 500. Correções de registro: a primeira análise (Sprint 3) dizia "igual em todos os pesos"; uma segunda versão desta decisão chegou a validar códigos "≥ 48 px", o que o print do showcase desmentiu.
- **Motivo:** a perda de legibilidade não é aceita como característica; o caráter retro não depende exclusivamente da pixel font.
- **Alternativas:** aceitar o C como característica (rejeitado por Eduardo); SVG para títulos (rejeitado: títulos são traduzíveis); terceira família pixel (rejeitado); manter Pixelify nos códigos de 14 px (rejeitado após validação: "MC-01" lia "MO-01").
- **Implementação:** `display-section` → `section-title` (Plex 600, 24→32 px, tracking 0.06em); `display-cart` → `cart-title` (Plex 600); `system` → Plex 500, 14 px, tracking 0.08em; `display-hero` mantém Pixelify com peso 500 abaixo de 768 px e 700 a partir de md.
- **Status:** Aceita, implementada e **aprovada por Eduardo em 2026-10-08**. Pixelify fica restrita aos usos visualmente validados (principalmente o display grande "MODO CAMPANHA"). **Não reintroduzir em códigos pequenos.** O monograma MC e o wordmark MODO CAMPANHA poderão recuperar essa linguagem via SVG autoral.

## D-030 — MC Design System Core aprovado

- **Data:** 2026-10-08
- **Decisão:** **MC Design System Core — APPROVED.** Os Sprints 1–3 (tipografia, grid, spacing, i18n, cores, bordas, superfícies, contratos de contraste, ícones, actions, chips, status, section header) formam o núcleo aprovado do sistema.
- **Contexto:** revisão visual dos screenshots do Design System Showcase.
- **Motivo:** os screenshots confirmaram que o núcleo funciona e continua pertencendo ao Modo Campanha **mesmo sem CRT, cartuchos ou ambientação**.
- **Alternativas:** iterar mais o núcleo antes dos componentes autorais.
- **Status:** Aceita. Próximo: Sprint 4 — Signature Components (Player Card, MC-CART, CRT), avaliados isoladamente no showcase antes da Home.

# Sprint 4 — Signature Components (2026-10-08)

## D-031 — Player Card

- **Data:** 2026-10-08
- **Decisão:** `mc-player-card` é um perfil profissional lido pela linguagem de um sistema de videogame (não uma carta de RPG): PLAYER 01, foto, nome, CLASS, XP (profissional, real), STATUS. Base 03-A. UI digital: `panel`, moldura `border-subtle`, **cantos de mira exclusivos** em `border-accent`, sem sombra. Foto real com `alt`; até existir, placeholder explícito "FOTO DO EDUARDO" (sem avatar, pessoa fictícia ou pixel art). Semântica `<article>` + `<dl>`. Proibidos LV, HP, MP, atributos, estrelas, rankings ou métricas não reais.
- **Contexto:** primeiro signature component; representa Eduardo no MC System.
- **Motivo:** reforça "XP real, sem personagem" e reproduz o 03-A com a linguagem já aprovada.
- **Alternativas:** carta de RPG com atributos (proibido); moldura toda em laranja (testada: a moldura sutil com acento só nos cantos ficou mais próxima do 03-A e preserva a hierarquia do laranja).
- **Status:** **Aprovada** (2026-10-08). Manter como está: sem ornamentação extra para compensar o placeholder; a presença visual final virá da foto real.

## D-032 — MC-CART, Project Summary e material tokens

- **Data:** 2026-10-08
- **Decisão:** `mc-cart` é um cartucho físico autoral (sem formato de console real): arquitetura fixa (notch, MC-CART + serial, rótulo com faixa de acento, artwork 16:10, nome em até 2 linhas, tipo, sulcos laterais, contatos). Variam `shell` (dark, light, orange, cool), `accent` (warm, cool, special) e artwork. Objeto físico: material + sombra de objeto, sem glow. Exposto como `role="img"` com nome acessível; não clicável nesta fase. O resumo do projeto fica em `mc-project-summary` (nome, descrição curta, até 2 chips, ação futura), separado do objeto. Para os materiais, criados **tokens semânticos de material** (`--mc-material-*`), aliases de cores já existentes (nenhum HEX novo), com tintas e contratos de contraste próprios.
- **Contexto:** os shells do 03-B precisam de cores de "material" (ex.: creme como superfície), que não cabiam nos tokens de UI sem desvirtuar sua semântica (ex.: usar `text-secondary` como fundo).
- **Motivo:** separar materiais físicos da UI digital mantém os tokens de UI honestos e o objeto consistente entre variantes.
- **Alternativas:** reutilizar tokens de texto como fundo (rejeitado); criar cores novas (desnecessário); cartucho com descrição embutida (rejeitado: "coleção primeiro, documentação depois").
- **Status:** **Aprovada** (2026-10-08): MC-CART (sem adicionar informação ao cartucho), separação MC-CART × Project Summary (sem CTA novo por enquanto; a ação "ver projeto" será definida com interação real), material tokens e comportamento responsivo. Regra registrada: **três níveis de token** (primitive → semantic UI → physical material) e **material tokens não criam uma segunda paleta**. Seriais finais e artwork real ficam para a FASE 7.

## D-033 — CRT Project Viewer (estrutura)

- **Data:** 2026-10-08
- **Decisão:** `mc-crt` com anatomia shell → bezel → screen → content viewport → identificação MC-01. "CRT na moldura; clareza no conteúdo": vinheta e scanlines muito leves **atrás** do conteúdo, glow quente controlado na tela, tela com mínimo 4:3 que cresce com o conteúdo. Responsivo por container query: em larguras pequenas, moldura mínima e sem efeitos. `role="region"` rotulado; efeitos `aria-hidden`. Sem animações neste sprint.
- **Contexto:** visualizador dos project cases.
- **Motivo:** sensação física por fora sem sacrificar leitura de texto e screenshots por dentro.
- **Alternativas:** scanlines sobre o conteúdo (rejeitado: reduz contraste); proporção fixa com scroll interno (rejeitado: cortava conteúdo, defeito encontrado e corrigido na validação).
- **Status:** Arquitetura e conteúdo **aprovados** (2026-10-08). Refinamento físico do desktop (≈15–20% mais sensação de objeto) implementado sem mudar a arquitetura: vidro com `--mc-radius-glass` e aro, vinheta e reflexo atrás do conteúdo, bezel mais distinto, faixa inferior com ranhuras, um botão e LED. Novo raio `--mc-radius-glass` restrito ao vidro do CRT (objeto físico). **Refinamento aprovado** (desktop e mobile; glass, bezel, faixa inferior, LED e MC-01); `--mc-radius-glass` aprovado como token exclusivo de objeto físico.

## D-034 — MC-CART: construção física (Sprint 4.2)

- **Data:** 2026-10-08
- **Decisão:** sem redesenhar o MC-CART, aumentar a leitura de objeto físico encaixável pela **construção**: silhueta recortada por `clip-path` (ombros chanfrados, rebaixo de encaixe no topo, língua de conexão na base), espessura por segunda camada deslocada, rótulo rebaixado, pegas laterais em relevo, trilho + contatos na área de conexão e duas assimetrias controladas (entalhe-chave à esquerda, slot à direita), iguais em todos os shells. Sombra de objeto mantida (aplicada num retângulo interno, porque o recorte cortaria `box-shadow`). Conteúdo, variantes, proporção e Project Summary inalterados.
- **Contexto:** o cartucho aprovado ainda podia ser lido como um card grosso.
- **Motivo:** teste de silhueta: sem texto e artwork, a forma precisa ler como hardware; mantendo silhueta autoral (sem formatos comerciais) e implementável em CSS frontal.
- **Alternativas:** perspectiva 3D (rejeitado: pesado, menos responsivo); ornamentos (parafusos, badges, glow) (rejeitado: fisicalidade deve vir da construção).
- **Nota técnica:** o CSS do componente passou do orçamento de aviso de 4 kB por componente (`angular.json`). Em vez de aumentar o orçamento, o SCSS foi enxugado (nomes curtos de custom properties documentados no arquivo, regras compartilhadas), sem mudança visual.
- **Status:** **Aprovada** (2026-10-08): a comparação de silhueta confirma leitura de hardware/cartucho mesmo sem artwork ou texto.

## D-035 — Orçamento de CSS por componente: enxugar antes de aumentar

- **Data:** 2026-10-08
- **Decisão:** quando um componente passa do orçamento de estilo do `angular.json`, a primeira resposta é **enxugar o SCSS** (regras compartilhadas, nomes locais mais curtos), não aumentar o orçamento. Regra: **Abreviações utilizadas para otimização de CSS/SCSS devem permanecer locais ao componente e documentadas. Elas não devem reduzir a clareza de APIs públicas, tokens do Design System ou contratos compartilhados.**
- **Contexto:** o MC-CART refinado (D-034) chegou a 4,64 kB para um aviso de 4 kB.
- **Motivo:** o orçamento protege a performance; abreviações locais e documentadas resolvem sem custo para quem consome o componente.
- **Alternativas:** aumentar o orçamento (aceitável só com justificativa registrada).
- **Status:** Aceita.

## D-036 — Sprint 4 — Signature Components: APPROVED

- **Data:** 2026-10-08
- **Decisão:** **Sprint 4 — Signature Components: APPROVED.** Aprovados: Player Card (D-031), MC-CART (D-032, D-034), Project Summary (D-032), CRT Project Viewer (D-033), material tokens (D-032), `--mc-radius-glass` (D-033), comportamento responsivo e linguagem de objeto físico.
- **Contexto:** revisões visuais do showcase, incluindo o refinamento do CRT e o teste de silhueta do MC-CART.
- **Motivo:** os componentes autorais funcionam isoladamente; o próximo passo é validá-los numa página real.
- **Alternativas:** —
- **Status:** Aceita. Próximo: planejamento do **Home Slice 01** (Header, Hero, entrada do Player Status), `docs/12-home-slice-01.md`. Sem implementação antes de aprovação.

# FASE 3 — Core Experience

## D-037 — Home Slice 01: decisões aprovadas e implementação até 01-C

- **Data:** 2026-10-08
- **Decisão:**
  - **CRT:** `mc-crt-frame` (base visual presentational, ignorante de contexto: não conhece Project, Hero, "INSERT CARTRIDGE" nem regras de case; conteúdo por projeção, label impresso opcional) + `mc-crt-project-viewer` (compõe o frame e adiciona região rotulada, MC-01 e estado vazio). O Hero usa só o frame.
  - **Header:** sólido e fixo; marca provisória MC + MODO CAMPANHA (explicitamente provisória até monograma/wordmark); navegação Sobre/Projetos/Jornada/Contato · About/Projects/Journey/Contact; PT/EN; Currículo só com URL real. Sem ONLINE, build, versão, MC-01 ou outros metadados técnicos. A marca volta ao topo.
  - **Nav no mobile:** ausente temporariamente no Slice 01 porque as seções de destino ainda não existem. **Isso não define o comportamento mobile final**; um menu mobile real será reavaliado quando as seções existirem.
  - **Hero:** eyebrow "MC-01 / PORTFÓLIO PROFISSIONAL" · "MC-01 / PROFESSIONAL PORTFOLIO"; "MODO CAMPANHA" em Pixelify (único uso validado); H1 "Eduardo Arine"; cargo, linha de foco, texto humano e motto aprovados nos dois idiomas; CTAs: Explorar campanha (primary), GitHub e LinkedIn (text). Currículo não renderizado (sem URL real, sem href placeholder).
  - **Cena:** só CRT + console MC-01 (CSS local, não componente) + luz quente; `aria-hidden`. Sem controller, plantas, pôster, cartuchos, motion.
  - **Conteúdo:** `PlayerProfile` bilíngue em `data/profile.data.ts` com o conteúdo aprovado (inclui os dados futuros do Player Status: ORIGEM/ORIGIN, XP, CAMPANHA ATUAL/CURRENT CAMPAIGN, FOCO/FOCUS, STATUS ATIVO/ACTIVE).
- **Desvios do plano (registrados):**
  1. Limite da container query do `mc-crt-frame` reduzido de 34rem para **28rem**: com 34rem o CRT do Hero (~479 px) caía na moldura simplificada em pleno desktop. Diff de pixels do Project Viewer aprovado antes/depois em 1280, 820 e 390 px: **0 px**.
  2. Placeholder do Player Status ganhou só o `mc-section-header` + status (ATIVO/ACTIVE) para servir de referência de ritmo no checkpoint; a seção real continua sendo o 01-E.
  3. Padding inferior do Hero reduzido (space-5) para a entrada do Player Status aparecer na primeira dobra (900 px), como no 03-A.
  4. Histórico: o commit do refactor do CRT inclui o showcase já lendo o `PlayerProfile`, que só existe no commit seguinte; os dois juntos compilam.
- **Contexto:** primeiro vertical slice real da Home (docs/12).
- **Motivo:** validar o design system e os signature components numa página real antes das demais seções.
- **Status:** Implementado até **01-C**, aguardando revisão visual. Tablet/mobile definitivos (01-D), Player Status (01-E) e revisão final (01-F) não iniciados.

## D-038 — Home Slice 01: Hero desktop aprovado; tablet, mobile e Player Status

- **Data:** 2026-10-09
- **Decisão:**
  - **Home Slice 01-C — Hero Desktop: APPROVED.** Composição preservada (sem nova rodada desktop, sem perseguir o Concept pixel a pixel); tamanho máximo de "MODO CAMPANHA" mantido como identidade; cena só com CRT + console MC-01 + luz quente; CRT com "INSERT CARTRIDGE". GitHub e LinkedIn sem ícones de marca.
  - **Copy en do Hero:** "…and a degree in Digital Games Technology."
  - **01-D Tablet (~820 px):** conteúdo primeiro, cena depois e menor (largura máx. 31rem contra 34rem no desktop), mantendo moldura física e console. Limite: o CRT precisa de ≥ 28rem para não cair na moldura simplificada, por isso a cena do tablet não fica menor que isso.
  - **01-D Mobile (~390 px):** conteúdo primeiro; só o CRT compacto (moldura simplificada, glow menor); **sem console** (prejudicava altura e ritmo; a etiqueta "MC-01" quebrava). Navegação principal segue oculta temporariamente; isso não define a navegação mobile final. GitHub e LinkedIn agrupados abaixo do CTA principal.
  - **01-E Player Status:** Player Card (colunas 1–4) + dados complementares em lista aberta com linhas (colunas 6–12; coluna 5 vazia como respiro, D-022). Tablet: card 1–3 + dados 4–8. Mobile: empilhado, card primeiro. Card: CLASS, XP, STATUS; dados: ORIGEM/ORIGIN, CAMPANHA ATUAL/CURRENT CAMPAIGN, FOCO/FOCUS. Foto: placeholder "FOTO DO EDUARDO". **Sem bloco "Sobre a jornada"** (não há texto aprovado; espaço negativo no lugar de texto genérico).
  - **Duplicação de ATIVO:** testadas 3 variantes (A: cabeçalho + card; B: só card; C: só cabeçalho). Escolhida **B**: no card o status tem o rótulo STATUS e contexto; no cabeçalho ficava solto e repetido a poucos centímetros. O cabeçalho mantém marcador, título e linha.
  - **Âncoras:** o `ViewportScroller` do Angular ignora `scroll-margin-top`; o offset do header fixo passou a ser configurado no `ViewportScroller` (altura real do header + 16 px). Validado com cliques reais: CTA, link repetido, navegação e troca PT/EN preservando o hash param a seção 81 px abaixo do topo (header 65 + 16). Scroll instantâneo (sem motion).
  - **Histórico Git:** o commit de refactor do CRT dependia do commit seguinte. Como os commits eram locais, a sequência foi recriada a partir de `origin/main`: o refactor ficou só com o rename no showcase e o uso do `PlayerProfile` foi para o commit do perfil. Árvore final idêntica à original; todos os commits intermediários compilam e passam nos testes. Backup local: `backup/slice01-pre-rewrite`.
- **Desvios do plano:** LED do CRT compacto empurrado para a direita quando não há label (sem efeito no Project Viewer aprovado: diff 0 px); cena do tablet limitada a 31rem pela regra de 28rem do frame.
- **Status:** **Aprovado** (2026-10-09, ver D-039).

## D-039 — HOME SLICE 01 — APPROVED

- **Data:** 2026-10-09
- **Decisão:** **HOME SLICE 01 — APPROVED.** Aprovados: Site Header; Hero desktop, tablet e mobile; CRT + console no desktop; CRT compacto no mobile; conteúdo do Hero pt-BR/en; hierarquia; ações; Player Status e sua versão responsiva; variante B de STATUS; comportamento das âncoras; responsividade geral.
- **STATUS no Player Status (decisão final):** aparece **somente dentro do Player Card** (`STATUS · ● ATIVO`), nunca no Section Header. No card existe contexto (o rótulo STATUS); no cabeçalho o indicador fica semanticamente ambíguo e repete a mesma informação.
- **Aceitos como estado provisório (não definitivo):** ausência de navegação mobile (definir quando as seções de destino existirem); "INSERT CARTRIDGE" na tela do CRT do Hero (a arte futura é um asset; a composição não muda para compensar a ausência dele); tamanho do Player Card no mobile (não reduzir por causa do placeholder).
- **Backlog:** Mobile Navigation; Hero CRT Screen Artwork; revisar o equilíbrio visual do Player Card após a entrada da fotografia real (o placeholder tem peso visual diferente de uma foto).
- **Status:** Aceita. Próximo: planejamento do **Home Slice 02** (Skill Tree + Project Inventory), sem implementação antes de aprovação.

## D-040 — Home Slice 02: plano aprovado com refinamentos

- **Data:** 2026-10-09
- **Decisão:**
  - **SKILL TREE → SKILL LOADOUT.** "Tree" sugere progressão, níveis, unlocks e graduação; "Loadout" representa as capacidades, conhecimentos e ferramentas que Eduardo leva para os projetos. A navegação pública pode usar "Skills".
  - **Visual:** alternativa A (Loadout) aprovada: 4 áreas modulares abertas (code · title · divider · items), não necessariamente cards fechados; visualmente **mais silencioso que o Inventory** ("Loadout informa. Inventory impressiona.").
  - **Grupos aprovados:** BUILD · PRODUCT · AI · GAME DNA. Itens: lista candidata, validados um a um.
  - **Regra de publicação de skill:** só publica se Eduardo puder explicar o que significa, como usa e dar ao menos um exemplo real; não validado = `candidate`, não aparece no site.
  - **Proficiência continua proibida:** porcentagem, estrelas, levels, XP por skill, beginner/intermediate/expert, unlocked/evolving/core/exploring, qualquer graduação subjetiva.
  - **Evidência futura:** "Visto em / Seen in" ligando skills a cartuchos reais (não implementar ainda).
  - **Classificação inicial:** MC-001 Modo Campanha = PUBLIC / APPROVED; MC-002 Paco = PUBLIC / OWNER REVIEW (condicionado a direitos, ausência de restrição de colaborador/parceiro e materiais já públicos; nem todo concept/lore/material é publicável); Comunidade On, ON Learning e Mural do Parceiro = INTERNAL / NEEDS EXPLICIT APPROVAL; Dashboard Operacional = INTERNAL / HIGH REVIEW. Nenhum interno publicado.
  - **Aprovação interna:** não há evidência de qual cargo/pessoa aprova na On Tech & Co; **nenhum aprovador é presumido**. Cada case interno terá um pacote exato (texto, assets, dados, nomes, links, tecnologias) para quem tiver autoridade sobre o produto/material; arquitetura, integrações, métricas, operação, segurança e parceiro/cliente pedem revisão específica. O modelo guarda quem aprovou e quando. *(Refinado por D-042: quem aprovou e quando fica no processo privado, fora do repositório público.)*
  - **Serial global:** MC-001, MC-002, MC-003… ("MC" = coleção do Modo Campanha). **Substitui** a proposta `ON-` (D-032 citava `ON-001` como exemplo do concept). Origem num campo separado (`origin: personal | on-tech | other`). Serial não indica propriedade, empresa nem importância.
  - **Publicação conservadora:** um projeto só aparece com `publication: 'approved'` explícito; ausência, `draft`, `review` ou `blocked` não renderizam. Testes obrigatórios quando o modelo existir.
  - **Inventory v1 sem slots falsos:** mostra só os aprovados; até 4 / 2 / 1 por linha.
  - **02-0 começa só com MC-001 e MC-002**, com fichas completas para aprovação antes de qualquer cartucho.
  - **Roteamento do case:** pendente entre `#project-<slug>` e `/projects/<slug>`, com preferência arquitetural futura por rota própria; decidir com o primeiro case real.
  - **Artwork:** 16:10, mínimo 640 × 400, sem texto obrigatório, sem screenshots internos sem aprovação; produção em etapa própria.
- **Status:** Aceita. Plano em `docs/13-home-slice-02.md`; etapa atual 02-0 (content inventory).

## D-041 — Content inventory 02-0: MC-001 aprovado, MC-002 em revisão, Skill Loadout v1

- **Data:** 2026-10-09
- **Decisão:**
  - **MC-001 Modo Campanha:** ficha aprovada por Eduardo (descrição, tipo, papel, tecnologias, tags Produto/Gamificação, shell `orange` / accent `special`, dois aprendizados); **`publication: approved`**. Único link público: repositório GitHub; nenhum link de site enquanto o GitHub Pages não estiver publicado.
  - **MC-002 Paco:** título único nos dois idiomas (sem tradução oficial); descrição, tipo, papel, pipeline, tags Game Design/Prototipagem, contexto, contribuição e aprendizado aprovados; **`publication: review`** até confirmar equipe, links, direito de publicação dos assets e lista exata de material.
  - **Skill Loadout v1:** BUILD (Angular, TypeScript, C# / .NET, REST APIs, PostgreSQL / SQL Server, Docker), PRODUCT (Pensamento de produto, Colaboração UX/UI, Prototipação e iteração, Design systems), AI (Desenvolvimento assistido por IA, Agentes de desenvolvimento, Design de prompts e workflows, Automação de workflows), GAME DNA (Sistemas de jogo, Gamificação, Design de interação, Prototipação de jogos), bilíngue. Fora da v1: Application architecture, Product modeling, AI prototyping, Progression & feedback.
  - Nenhuma skill tem percentual, rating, level, estrelas, rótulo de proficiência ou XP individual. "Visto em / Seen in" segue como ideia futura.
- **Pendências registradas:** tom (warm/cool) das tags; artwork do MC-001 (publicar com placeholder ou produzir antes); shell/accent do Paco; traduções en dos aprendizados do MC-001 (rascunho).
- **Status:** Aceita. Fichas em `docs/14-content-inventory.md`. Implementação visual do Slice 02 não iniciada.

## D-042 — Modelos do Slice 02, catálogo de tags, artwork e privacidade do repositório

- **Data:** 2026-10-09
- **Decisão:**
  - **Tags:** o tom pertence à identidade da tag, nunca à posição, e é estável entre projetos: Produto/Product `warm`, Gamificação/Gamification `cool`, Game Design `warm`, Prototipagem/Prototyping `cool`. Catálogo tipado (`TagDefinition`: id, label localizado, tone); projetos guardam até 2 ids, sem duplicar tone.
  - **MC-001 artwork:** "PROJECT ARTWORK" **não** vai para a versão pública final do Inventory (só showcase, dev local e estados explícitos de dev). Novo checkpoint **02-C.5 — MC-001 Project Artwork**, aprovado antes do primeiro Inventory público (16:10, mín. 640 × 400, sem texto embutido, universo Modo Campanha, sem repetir o nome).
  - **Paco:** shell `dark`, accent `warm` (contraste com o MC-001, atmosfera noturna, diálogo futuro com vela/cempasúchil; sem significado de status/raridade; revisável com artwork real).
  - **Project:** `origin` (personal / on-tech / other) separado do serial; `type` bilíngue descritivo; `status` removido sem substituto (`stage` só com caso real); `year` opcional; `featured` removido; `publication` conservadora (só `approved` renderiza, com teste); configuração do MC-CART embutida (`cartridge: { shell, accent, artwork? }`), sem entidade `Cartridge` independente; `label` e `color` livre removidos.
  - **Privacidade (repositório público):** runtime e arquivos públicos sabem só se o conteúdo está autorizado. Nomes de aprovadores, fluxos internos, observações confidenciais, justificativas privadas e dados de revisão ficam fora do repositório. Refina D-040 (que previa guardar quem aprovou no modelo).
  - **Skills:** grupos `build / product / ai / game-dna`; `state` (unlocked/evolving/core/exploring) removido; autoria (`candidate`/`approved`) só nos docs; runtime com **apenas skills aprovadas**.
  - **Seção:** Skill Tree → Skill Loadout (componente, âncora, i18n, teste de ordem e docs no 02-B).
- **Status:** Aceita. Próxima etapa autorizada: **02-A — Skill Loadout data/content**.

## D-043 — Skill Loadout visual (Home Slice 02-B)

- **Data:** 2026-10-09
- **Decisão:**
  - Seção renomeada: `features/skill-tree` → `features/skill-loadout`, `#skill-tree` → `#skill-loadout` (sem alias: o site não foi lançado), `sections.skillTree` → `sections.skillLoadout`, teste de ordem da Home atualizado. Título **SKILL LOADOUT** nos dois idiomas, sem subtítulo.
  - **Quatro módulos de capacidades, não quatro cards:** código · título (h3) · divisor sutil · lista (`ul role="list"`), sem surface própria e sem caixa por grupo; itens como texto com marcador discreto (sem chip, botão, hover, pointer, tabindex ou role de interação).
  - **Códigos decorativos** (`aria-hidden`): BLD · PRD · AI · GDN, sem numeração; único laranja da seção além do marcador do header. Títulos BUILD / PRODUCT / AI / GAME DNA iguais nos dois idiomas. IBM Plex Sans em tudo.
  - **Layout:** ≥ 1200 px: 4 módulos (3/12); 768–1199 px: 2 × 2; < 768 px: 1 por linha com espaçamento de bloco. Alturas diferentes aceitas (BUILD tem 6 itens, os demais 4).
  - **Novo breakpoint `xl: 1200px`** no mapa de breakpoints: o grid só tinha `md` (768) e `lg` (1024), e os 4 módulos confortáveis começam em ~1200. Nenhum componente aprovado usa o `xl`.
- **Código AI:** o código "AI" repete o título "AI"; a redundância é **aceita** (o código é a camada de sistema, o título a camada legível). Não inventar AID/AIX/AIM ou outra sigla.
- **Breakpoint `xl` (1200 px) aprovado** como token do sistema; motivação: os 4 módulos do Skill Loadout só ficam confortáveis a partir de ~1200 px. Componentes aprovados não adotam `xl` sem necessidade própria.
- **Ritmo:** o respiro maior entre Player Status e Skill Loadout no desktop está aprovado; não reduzir só para ocupar menos altura.
- **Status:** **HOME SLICE 02-B — SKILL LOADOUT: APPROVED** (2026-10-09). Skill Loadout **congelado** salvo regressão: colunas (4 / 2×2 / 1), tipografia, marcadores, spacing, códigos, cores e section header.

## D-044 — Project model + Inventory foundation (Home Slice 02-C)

- **Data:** 2026-10-09
- **Decisão:**
  - `Project` reescrito conforme D-042 (ver `docs/07`): serial `MC-NNN`, `origin` separado, `publication` opcional e conservadora, conteúdo `Localized`, até 2 `TagId` (garantido pelo tipo), `cartridge: { shell, accent, artwork? }` embutido. Campos legados removidos.
  - Catálogo `TAGS` (`src/app/data/tags.data.ts`): product (warm), gamification (cool), game-design (warm), prototyping (cool).
  - Filtros puros: `isPublished` / `publishedProjects` (só `approved`) e `inventoryProjects(allowArtworkPlaceholder)` (fora de dev, exige artwork aprovado).
  - Dados: MC-001 Modo Campanha (`approved`, orange/special, link só do repositório). **O runtime contém somente projetos aprovados**: MC-002 Paco (`review`) fica documentado em `docs/14` e entra no runtime só quando aprovado. Filtro testado com fixtures neutros.
  - Inventory: `mc-section-header` sem subtítulo; `ul role="list"` com MC-CART + Project Summary por item (o item tem `max-width: 22rem`, a mesma medida do MC-CART, para o resumo não ficar mais largo que o cartucho); colunas 1 / 2 (≥ 768) / 4 (≥ 1200, `xl`), itens nos primeiros slots naturais, sem slots vazios. Sem CRT, sem "INSERT CARTRIDGE", sem link no cartucho. Placeholder feature `features/crt-project-viewer` removido (o signature `mc-crt-project-viewer` continua no design system).
- **Produção:** sem artwork, o MC-001 não aparece em produção (o Inventory ficaria só com o header). Sem workaround temporário: **a 02-C não é enviada sozinha**; 02-C + 02-C.5 (artwork aprovado) sobem juntos, e o `origin/main` nunca tem o Inventory vazio.
- **Learnings en do MC-001 aprovados:** "Validate typography at actual usage sizes." · "Separate the visual language of digital interfaces from that of physical objects." Learning candidato do case completo registrado em `docs/14` (fora do runtime).
- **Status:** **02-C APPROVED** (2026-10-09) com os refinamentos acima; commits locais até o 02-C.5. 02-D não iniciado.

## D-045 — MC-001 artwork direction: System Horizon (Home Slice 02-C.5)

- **Data:** 2026-10-09
- **Contexto:** três direções exploratórias para o artwork do MC-001 (16:10, pixel art 160 × 100 exportada em 640 × 400), avaliadas dentro do MC-CART real: **A — Campaign Map**, **B — System Horizon**, **C — Cartridge World**.
- **Decisão:** **MC-001 ARTWORK DIRECTION — SYSTEM HORIZON: APPROVED.** A etapa exploratória está encerrada; não criar quarta direção.
  - **Por que B:** maior maturidade profissional, menor risco de parecer jogo literal, bom equilíbrio retro/moderno, forte compatibilidade com o shell orange/special e melhor capacidade de gerar linguagem para artworks futuras.
  - **A** lê melhor pequena, mas parece seleção de fase/mapa de níveis. **C** é interessante, mas cria autorreferência (cartucho dentro de cartucho).
  - **Refinamento B2:** massas construídas mais largas, céu simplificado, horizonte mais alto, caminho abstrato (path + system diagram, não estrada), 2–3 marcos discretos de progressão, módulo em construção mantido, luz de destino sem "sunset synthwave". Laranja para construção/caminho/destaques; teal só em poucos sinais; o shell continua o maior bloco cromático do cartucho.
- **Princípios da família de artworks (regra inicial):** cada projeto tem sua própria cena; **"System Horizon" não é template obrigatório**. A família é construída por princípios compartilhados:
  - uma cena principal;
  - leitura forte em miniatura (≈ 282 px de largura no MC-CART);
  - sentido de progressão ou transformação;
  - poucos sinais de sistema;
  - paleta derivada do MC Design System;
  - pixel language controlada;
  - sem texto embutido, sem logos, sem UI literal.
- **Paco (MC-002):** sem artwork agora; poderá ter linguagem de cenário/gameplay própria. O compartilhado é a gramática visual, não o conteúdo da cena.
- **Status:** direção aprovada; B2 aprovada como artwork final (D-046).

## D-046 — MC-001 artwork final: System Horizon Refined (Home Slice 02-C.5)

- **Data:** 2026-10-09
- **Decisão:** **MC-001 ARTWORK — SYSTEM HORIZON REFINED: APPROVED.** A B2 é o artwork final, mantida exatamente como apresentada (estruturas, proporção, céu, horizonte, caminho segmentado, três marcos, passagem iluminada, módulo suspenso, distribuição de cores e **espaço negativo**, que faz parte da composição). Sem B3; não adicionar detalhes só para ocupar espaço.
- **Asset:** `public/assets/cartridges/mc-001-modo-campanha.png`: grade de 160 × 100 px exportada em 640 × 400 (16:10), cada pixel ampliado 4× sem interpolação; 2,8 KB, sem otimização adicional necessária. Nome estável, sem rótulo de exploração. No MC-CART, a arte ocupa 210 px de largura no desktop (4 colunas) e 280 px até 1199 px; o `object-fit: cover` não corta porque a proporção é a mesma do slot.
- **Alt (no modelo, `cartridge.artwork.alt`):**
  - pt-BR: "Paisagem em pixel art de um sistema em construção, com módulos crescentes e um caminho segmentado levando a uma passagem iluminada."
  - en: "Pixel-art landscape of a system under construction, with growing modules and a segmented path leading to an illuminated gateway."
- **Acessibilidade:** o MC-CART já é **um único objeto `role="img"`** com nome acessível ("MC-CART MC-001: Modo Campanha, PORTFÓLIO INTERATIVO"). A imagem interna é **decorativa** (`alt=""`, filho apresentacional do `role="img"`), para não haver dois anúncios do mesmo cartucho. O alt localizado fica guardado para usos em que o artwork for apresentado sozinho (ex.: case/CRT). Nenhuma mudança no `mc-cart`.
- **Identidade da coleção:** a artwork individual não precisa carregar sozinha toda a identidade do Modo Campanha. A coleção é formada por **MC-CART + shell + serial + artwork + label/conteúdo do projeto**. A artwork representa o universo do projeto; não repetir artificialmente os mesmos símbolos em todos os projetos.
- **Gramática da família de artworks (inicial, refina D-045):**
  - **compartilham:** cena própria do projeto; transformação, progressão ou construção quando pertinente; poucos sinais de sistema; pixel language controlada; paleta coerente com o MC Design System; leitura forte em tamanho pequeno; nenhum texto ou logo embutido;
  - **não compartilham obrigatoriamente:** horizonte, prédios, checkpoints, composição, cenário.
- **Produção:** MC-001 tem `publication: 'approved'` e artwork aprovado, então aparece em desenvolvimento, produção e no build do GitHub Pages. A política conservadora não mudou: projeto sem artwork aprovado continua fora da versão pública.
- **MC-002:** sem mudança (fora do runtime, `review` em `docs/14`).
- **Status:** **02-C — PROJECT INVENTORY FOUNDATION: APPROVED** e **02-C.5 — MC-001 PROJECT ARTWORK: APPROVED** (2026-10-09, `origin/main` `c204995`). Integração conferida contra o artwork aprovado. **Evolução (D-065):** artwork do MC-001 substituído pelo SYSTEM HORIZON dos renders oficiais (v1 arquivada) e shell do MC-001 passa a grafite com acentos laranja.
- **Freeze:** MC-001 (artwork, crop, escala, shell, accent, conteúdo, summary, tags), MC-CART e Project Inventory congelados. Composição aprovada: primeiro projeto no primeiro slot natural, alinhado à esquerda, sem centralização nem aumento por haver um só projeto, sem slots vazios nem placeholders; o espaço vazio à direita no desktop é aceito (a coleção cresce organicamente).
- **Interação:** o MC-CART continua não clicável e não vira link para o GitHub. Semântica futura: MC-CART → seleção do projeto → CRT → Project Case; o GitHub será uma ação explícita dentro do case.
- **Roadmap:** **02-D** (Inventory) absorvido por 02-C / 02-C.5; **02-E** (responsivo) absorvido por 02-B / 02-C / 02-C.5. Sem trabalho artificial para cumprir nomes de etapas antigas. Próxima etapa: **02-F — Integrated Slice Review** (sem feature nova). GitHub Pages: sem deploy até a aprovação do Slice 02 completo.

## D-047 — Home Slice 02 aprovado; Home pública só com seções construídas (02-F)

- **Data:** 2026-10-09
- **Decisão:** **HOME SLICE 02 — APPROVED.** Narrativa aprovada: Hero → Player Status → Skill Loadout → Project Inventory. Sem refinamentos adicionais nessas quatro áreas.
  - **Seções não construídas não são renderizadas** até seus slices reais existirem: Campaign Log, Achievements, Current Main Quest, Side Quests e Final Checkpoint saíram do template da Home (`home-page.ts`). Os componentes continuam no código como estrutura reservada. Nada de "coming soon", cards vazios, headers temporários, conteúdo fictício ou estilo provisório, e nenhuma feature flag.
  - **A navegação só expõe destinos que existem:** header com **Sobre / Projetos** (en: **About / Projects**) + PT / EN; **Jornada** e **Contato** removidos temporariamente (rótulos mantidos no dicionário; voltam com as seções reais; Contato não vira LinkedIn). Âncoras: Sobre/About → `#player-status`, Projetos/Projects → `#project-inventory`.
  - Navegação mobile continua no backlog (sem menu nesta etapa).
  - Testes: a ordem da Home cobre só as seções renderizadas; a Home termina no Project Inventory, sem títulos crus; o header só aponta para ids existentes.
- **Freeze:** Skill Loadout, Project Inventory, MC-001 e o artwork System Horizon Refined congelados.
- **GitHub Pages:** código em estado publicável; a primeira publicação será decidida separadamente (sem deploy).
- **Status:** **02-F — APPROVED.** Home Slice 02 encerrado.

## D-048 — Home Slice 03 (Campaign Log): plano aprovado; FASE 3 encerrada

- **Data:** 2026-10-09
- **Decisão:**
  - **Plano do Home Slice 03 — Campaign Log aprovado** (`docs/15-home-slice-03.md`). Direção visual **A + C — Checkpoint Log Editorial**: linha vertical discreta, markers quadrados, coluna de período, system label, título, summary curto, context só quando útil e aprovado. Sem cards pesados, objeto físico, shadow, alternância esquerda/direita ou mapa de fases.
  - **Modelo:** `CampaignLogKind = 'origin' | 'checkpoint' | 'current'` (semântica do dado). O rótulo temático é apresentação, no dicionário de UI: origin → NEW GAME; checkpoint → CHECKPOINT; current → CAMPANHA ATUAL / CURRENT CAMPAIGN. Não usar `'new-game'` no modelo. Estrutura simples: `CampaignLogPeriod { start; end? }` e `CampaignLogEntry { id; kind; period; title; context?; summary; publication? }` (publication só se a política de conteúdo exigir). Fora: technologies, highlights, results, location, tags, XP, levels, métricas, achievements artificiais.
  - **Conteúdo:** fatos disponíveis registrados (formação em Tecnologia em Jogos Digitais pela **FATEC Americana**; 10+ anos em tecnologia; Desenvolvedor de Produtos Digitais; desenvolvimento + produto + IA + gamificação; campanha atual Comunidade On). **Sem dados para cronologia; nenhuma data inferida.** Eduardo fornece o histórico bruto; os 4–6 checkpoints são propostos a partir dele pelo princípio de seleção (mudança significativa sustentada pelo histórico). O Campaign Log é uma seleção: lacunas não são preenchidas. Entrada atual curta, sem descrever o projeto Comunidade On.
  - **Fases:** **FASE 3 — Core Experience encerrada.** Itens que dependem da experiência de interação vão para a **FASE 5 — Game Feel**: CRT Project Viewer completo na experiência da Home, seleção de cartucho, inserção no console, transição cartucho → CRT e motion relacionado. O Slice 03 abre a **FASE 4 — Career Content**.
  - Roadmap da FASE 3 corrigido conforme o estado real (itens concluídos marcados; pendentes não concluídos transferidos e indicados).
- **Status:** Aceita. Etapa atual: **03-0 — Content inventory**, aguardando o histórico do Eduardo. 03-A/03-B/03-C não iniciados; nenhum runtime data do Campaign Log.

## D-049 — Campaign Log com conteúdo MOCK para desenvolvimento visual (03-A / 03-B)

- **Data:** 2026-10-09
- **Contexto:** o histórico real do Eduardo (03-0) ainda não existe. Para destravar modelo, composição, hierarquia, ritmo e responsividade, o Slice 03 avança com conteúdo **MOCK**.
- **Decisão:**
  - **CAMPAIGN LOG CONTENT = MOCK FOR VISUAL DEVELOPMENT.** Os 5 entries (períodos, títulos, contextos, textos) **não são fatos sobre o Eduardo** e não entram em CLAUDE.md, perfil, `docs/14`, README, metadata ou SEO. Serão substituídos pelo histórico real.
  - **Modelo implementado:** `CampaignLogKind = 'origin' | 'checkpoint' | 'current'`, `CampaignLogPeriod { start; end?: number | 'present' }`, `CampaignLogEntry { id; kind; period; title; context?; summary }` com `Localized`. Sem `publication` por enquanto: a política "runtime só com conteúdo aprovado" é garantida pelo arquivo de dados publicado. `CampaignCheckpoint` (FASE 0) removido.
  - **Segurança de produção (mecanismo já existente, sem feature flag):** `src/app/data/campaign-log.data.ts` (o que vai para produção) é uma **lista vazia**; em desenvolvimento, build de desenvolvimento e testes ele é trocado por `campaign-log.data.development.ts` (MOCK) via `fileReplacements` no angular.json, o mesmo padrão do showcase (D-028). A Home só renderiza o Campaign Log quando há entradas: em produção e no GitHub Pages a seção não existe e o MOCK nem entra no bundle. Os ids do MOCK começam com `mock-campaign-log-` e o workflow de deploy falha se essa string aparecer no build.
  - **Quando o conteúdo real for aprovado:** as entradas aprovadas vão para `campaign-log.data.ts`; o arquivo `.development.ts` e o `fileReplacements` correspondente são removidos.
  - **Labels de sistema na UI** (`campaignLog.kind`): origin → NEW GAME; checkpoint → CHECKPOINT; current → CAMPANHA ATUAL / CURRENT CAMPAIGN; "ATUAL" / "PRESENT" para períodos em aberto.
  - **Visual (A + C):** `ol` com `h3` por checkpoint; ≥ 768 px período em coluna própria à esquerda do eixo (colunas 1–2), conteúdo a partir da coluna 3 (até a 9 no desktop); < 768 px período no fluxo, acima do label. Linha de 1 px (`--mc-border-subtle`); markers quadrados de 8 px: origin em `--mc-accent-active`, checkpoint vazado em `--mc-border-default`, current em `--mc-status-online`. Sem cards, fundos, sombras, objeto físico, ícones ou métricas. IBM Plex Sans.
  - **Navegação:** Jornada / Journey continua fora do header até conteúdo real + seção aprovada + liberação para produção.
- **Status:** 03-A e 03-B implementados com MOCK; 03-B aprovado (D-050).

## D-050 — Campaign Log: visual aprovado e congelado; conteúdo factual pendente (03-B)

- **Data:** 2026-10-09
- **Decisão:**
  - **03-B — CAMPAIGN LOG VISUAL: APPROVED.** Direção **A + C — Checkpoint Log Editorial** congelada: estrutura desktop/tablet/mobile, linha vertical, markers (origin warm, checkpoints vazados, current verde), coluna de período, tipografia, spacing e system labels. Não redesenhar, compactar nem reduzir fonte; `mc-section-header` intocado.
  - **Período da entrada atual (apresentação, sem mudar o modelo):** `kind: 'current'` com `end: 'present'` é exibido como **DESDE 2025** / **SINCE 2025** (evita repetir "ATUAL" com o label CAMPANHA ATUAL). O dado continua `{ start: 2025, end: 'present' }`. Origin/checkpoint seguem `YYYY — YYYY`.
  - **Orçamento editorial do summary:** ~**120–140 caracteres** (≈ 2–3 linhas no desktop, 3–4 no mobile). Limite editorial, **não técnico**: sem truncation CSS nem line-clamp. O MOCK pode continuar maior até ser substituído.
  - **Estado separado:** Campaign Log — **STRUCTURE / VISUAL: APPROVED**; Campaign Log — **EDITORIAL CONTENT: PENDING FACTUAL REVIEW**. Todos os períodos e textos atuais continuam **MOCK** (inclusive a entry com FATEC Americana) e não vão para `docs/14`, README, SEO, metadata, CLAUDE.md (como fatos) ou perfil.
  - **Produção inalterada:** desenvolvimento com MOCK; produção e GitHub Pages sem Campaign Log e sem MOCK no bundle; deploy guard mantido. Jornada / Journey só volta ao header quando o conteúdo factual substituir o MOCK e o Campaign Log for liberado para produção.
  - **Etapas:** 03-0 = MOCK content for development; 03-A = model/data infrastructure done; 03-B = visual approved; **03-C = editorial content pending**. A 03-C não bloqueia o desenvolvimento das próximas partes da Home.
- **Status:** Aceita.

## D-051 — Home Slice 04 (Achievements): plano, Record Panel e conteúdo MOCK

- **Data:** 2026-10-09
- **Decisão:**
  - **Plano aprovado** (`docs/16-home-slice-04.md`). Achievements mostra **evidências concretas** da trajetória; a linguagem de jogo é só enquadramento. Critério: fonte factual aprovada + concreto + **novo** (não repetir Player Status, Skill Loadout, Inventory ou Campaign Log). Comunidade On não vira achievement (Current Main Quest).
  - **Regra pública:** 0 ou 1 achievement aprovado → não renderiza; **2–5 → renderiza**. Com 2 bons, publicar 2. Nunca slot vazio nem repetição para completar 3–4. `MIN_ACHIEVEMENTS = 2` em `achievements.rules.ts`.
  - **Modelo:** `Achievement { id; title; description; evidence; year? }` (`Localized`), **`evidence` obrigatório** (contrato de base factual). `ACH-0N` derivado da ordem, decorativo e `aria-hidden`. Fora: kind, icon, secret (volta na FASE 6), score, XP, rarity, level, unlocked, progress. Substitui o `Achievement` da FASE 0.
  - **Visual: A + B — Achievement Record Panel:** um único painel digital (`--mc-panel`, sem sombra/objeto físico) com células separadas por réguas de 1 px; célula = marker + ACH-0N (laranja) · manchete Plex em caixa alta · descrição · EVIDÊNCIA no pé. ≥ 1200: N células (`--n`); 768–1199: 2 por linha, ímpar final ocupa a linha; < 768: 1 por linha. Sem teal/verde, badge, medalha, estrela, raridade, glow, hover ou motion. Orçamento editorial: description ~80–110 caracteres, evidence até ~60, sem line-clamp.
  - **ACHIEVEMENTS CONTENT = MOCK FOR VISUAL DEVELOPMENT.** 4 itens genéricos e fictícios ("MARCO DE EXEMPLO A…"), sem derivar do MOCK do Campaign Log e sem fatos reais. Mesmo mecanismo do D-049: `achievements.data.ts` vazio em produção; `achievements.data.development.ts` (ids `mock-achievement-*`) só em dev/testes via `fileReplacements`; deploy guard agora procura `mock-campaign-log|mock-achievement`.
- **04-B.1 (aprovado o visual da 04-B, ajuste único):** com **exatamente 2 itens em ≥ 1200 px** o painel ocupa **8/12 colunas**, alinhado à esquerda (`:has(> :nth-child(2):last-child)`, só CSS); as 2 células dividem o painel e o restante é espaço negativo da página. 768–1199, < 768 e 3–5 itens inalterados (verificado pixel a pixel).
- **Status:** **04-B — ACHIEVEMENTS VISUAL: APPROVED e FROZEN** (2026-10-09), incluindo a 04-B.1. Nenhuma alteração visual adicional no Achievement Record Panel salvo regressão. Estado: STRUCTURE / VISUAL approved · **EDITORIAL CONTENT pending factual review** (04-0/04-C; não bloqueia o resto da Home). Produção e GitHub Pages seguem sem Achievements e sem MOCK.

## D-052 — Home Slice 05 (Final Checkpoint): construído antes de Current Main Quest e Side Quests

- **Data:** 2026-10-11
- **Decisão:**
  - **Ordem de construção alterada:** o **Final Checkpoint** é construído antes de Current Main Quest e Side Quests. A **ordem final da Home não muda**: ele continua sendo a última seção (#9, `docs/03`). Depois dele: Current Main Quest, depois Side Quests.
  - **Primeira composição publicável:** Hero → Player Status → Skill Loadout → Project Inventory → Final Checkpoint → Footer. Campaign Log e Achievements continuam dev-only enquanto tiverem conteúdo MOCK. A publicação no GitHub Pages segue como decisão separada.
  - **Direção A — Save Point Editorial** (plano em `docs/17-home-slice-05.md`): section header CAMPAIGN CONTINUES... com **SAVE COMPLETE** como único detalhe MC-01 (slot `code`); frase humana em `title-l` nas colunas 1–7; GitHub e LinkedIn como duas ações `secondary` equivalentes, nova aba, padrão `external` do Hero, **sem ícones de marca** e sem `primary`. Rejeitadas: B — Continue Prompt (`CONTINUE?`, cursor em bloco; videogame literal) e C — Save Slot Panel (repete o Record Panel; banner de CTA SaaS).
  - **Conteúdo aprovado:** pt-BR "Se quiser construir algo comigo ou trocar ideias sobre produto, IA, desenvolvimento ou games, estes são os melhores lugares para me encontrar." · en "If you'd like to build something together or exchange ideas about product, AI, development, or games, these are the best places to find me." Guardado em `PlayerProfile.closing` (voz do Eduardo; o dicionário de UI guarda só o rótulo SAVE COMPLETE).
  - **Fora:** currículo, email, WhatsApp e formulário (sem destinos públicos aprovados); "No coins required"; motion.
  - **Footer faz parte do slice (05-C):** só motto localizado, © ano atual, Eduardo Arine e Modo Campanha; sem link para o repositório na v1. Renderizado pela `HomePage` depois do `</main>` (não no shell): fecha semanticamente a Home e fica fora do `/dev/design-system` sem lógica de roteamento.
  - **Header (05-D):** Contato / Contact volta e aponta para `#final-checkpoint` (seção real; não vira LinkedIn, D-047).
- **Contexto:** já existe conteúdo público real suficiente para o encerramento (links aprovados, motto, nome); Current Main Quest e Side Quests dependem de conteúdo ainda não aprovado.
- **Motivo:** aproximar a Home de uma primeira versão publicável sem placeholder nem conteúdo inventado.
- **Alternativas:** seguir a ordem da página (Current Main Quest primeiro); footer no shell da app (apareceria no showcase dev ou exigiria condição de rota).
- **05-B — FINAL CHECKPOINT VISUAL: APPROVED e FROZEN** (2026-10-11): validado em 1440 / 820 / 390, pt-BR e en, em produção (depois do Project Inventory) e em desenvolvimento (depois dos Achievements MOCK). Nenhum ajuste no Final Checkpoint salvo regressão; o footer (05-C) se ajusta sozinho, sem mexer no espaçamento da seção.
- **Status:** Aceita. 05-A e 05-B concluídas; 05-C (footer) em andamento.

## D-053 — Modo autônomo de conclusão (Builder + Reviewer)

- **Data:** 2026-10-11
- **Decisão:** a partir do fim do Slice 05, o desenvolvimento segue sem aprovação manual do Eduardo a cada subetapa. Cada etapa é implementada (BUILDER), validada (testes, typecheck, builds dev/prod/GitHub Pages, guards, Prettier, screenshots 1440 / 820 / 390 em pt-BR e en) e enviada a um **REVIEWER independente**, que devolve `APPROVED`, `APPROVED WITH FIXES` ou `BLOCKED — EDUARDO DECISION REQUIRED`. O REVIEWER protege o sistema aprovado; não pede mudanças subjetivas; no máximo duas rodadas de ajustes visuais por etapa, salvo bug real.
  - **Bloqueia para o Eduardo:** fato público novo, organização nova, conteúdo interno da Comunidade On, afirmação profissional, novo canal de contato/dado pessoal, mudança importante de identidade visual, alteração de componente FROZEN sem causa técnica, mudança conceitual, remoção de feature, mudança material de escopo, deploy público final, ação destrutiva.
  - **Conteúdo não confirmado não bloqueia estrutura:** usa MOCK claramente fictício, só em desenvolvimento/testes (`fileReplacements`), produção vazia, guard no deploy, conteúdo editorial registrado como pendente.
  - **Git:** trabalho na branch `feat/autonomous-site-completion` (push permitido); **sem merge em `main` e sem deploy** até a revisão final do Eduardo.
- **Status:** Aceita.

## D-054 — HOME SLICE 05 — APPROVED (05-C e 05-D)

- **Data:** 2026-10-11
- **Decisão:**
  - **05-C — FOOTER: APPROVED e FROZEN.** Pertence só à Home (renderizado pela `HomePage`, fora do `<main>`, logo depois do Final Checkpoint; não está no shell). Uma régua de 1 px, mesmo fundo da página; desktop/tablet: motto à esquerda e copyright à direita; mobile: empilhado. Sem links, ícones, títulos ou linguagem de game. Ano calculado em runtime. Nenhum espaçamento de seção adicional entre Final Checkpoint e footer.
  - **05-D:** **Contato / Contact** volta ao header e aponta para `#final-checkpoint` (destino real; não vira LinkedIn, D-047). Nav: Sobre / Projetos / Contato. Jornada continua fora até o Campaign Log ter conteúdo real. Teste de integração garante que todo item da nav aponta para uma seção renderizada. Docs sincronizados (`docs/02`, `03`, `07`, README, roadmap, CLAUDE.md).
- **Status:** **HOME SLICE 05 — APPROVED** (REVIEWER, D-053). Final Checkpoint e footer congelados.

## D-055 — Home Slice 06 (Current Main Quest): Quest Briefing com MOCK dev-only

- **Data:** 2026-10-11
- **Decisão (modo autônomo, D-053; plano em `docs/18-home-slice-06.md`):**
  - **Direção A — Quest Briefing:** composição aberta em duas colunas (briefing: título `title-l` 600, papel, resumo `body-l` · frentes de atuação em lista informativa com o marcador do Skill Loadout); `mc-section-header` com `mc-status` **IN PROGRESS** (uso documentado em `docs/11`; D-039 restringe status no header só no Player Status). Desktop 1–7 / 9–12; tablet 1–5 / 6–8; mobile empilhado. Rejeitadas: **B — Quest Panel** (repetiria o Record Panel dos Achievements logo acima) e **C — CRT Briefing** (competiria com o Hero e com o CRT Project Viewer da FASE 5).
  - **Modelo:** `CurrentQuest { id; title; role?; summary; focus: Localized<readonly string[]> }`, sem métricas, resultados, clientes, parceiros, arquitetura, datas não aprovadas ou progresso.
  - **CURRENT MAIN QUEST CONTENT = MOCK FOR VISUAL DEVELOPMENT.** Único fato público aprovado: o nome "Comunidade On" como campanha atual (Player Status); só o nome repetiria o Player Status e o texto-base de `docs/02` não está aprovado (Comunidade On = INTERNAL / NEEDS EXPLICIT APPROVAL, D-040). `current-quest.data.ts` = `null` em produção (seção não renderizada); `current-quest.data.development.ts` (id `mock-current-quest`, "Campanha de exemplo / Sample campaign") só em dev/testes via `fileReplacements`; guard do deploy estendido para `mock-current-quest`. O MOCK não descreve a Comunidade On nem é fato sobre o Eduardo.
- **Status:** Aceita (REVIEWER). 06-A estrutura/MOCK e 06-B visual concluídos; **06-C editorial pendente** (texto público aprovado pelo Eduardo).

## D-056 — Home Slice 07 (Side Quests): Side Quest Log com MOCK dev-only

- **Data:** 2026-10-11
- **Decisão (modo autônomo, D-053; plano em `docs/19-home-slice-07.md`):**
  - **Direção C — Side Quest Log:** linhas compactas separadas por réguas de 1 px (tipo · título · resumo), marcador vazado do Campaign Log; desktop em uma linha (1–2 · 3–6 · 7–12), tablet 1–3 · 4–8, mobile empilhado. Rejeitadas: **A — Quest Grid** (repetiria o Skill Loadout) e **B — Demo Carts** (variação do MC-CART congelado; competiria com o Inventory).
  - **Modelo:** `SideQuest { id; kind: 'game' | 'art' | 'ai' | 'interface' | 'study'; title; summary }`; rótulos de tipo no dicionário de UI (`sideQuests.kind`). Links só com URL real aprovada.
  - **SIDE QUESTS CONTENT = MOCK FOR VISUAL DEVELOPMENT.** Produção vazia (seção não renderizada); `side-quests.data.development.ts` (ids `mock-side-quest-*`) só em dev/testes; guard do deploy estendido para `mock-side-quest`. Paco (MC-002, `review`) não entra.
- **Status:** Aceita (REVIEWER). 07-A e 07-B concluídos; **07-C editorial pendente**.

## D-057 — FASE 4: revisão integrada da Home e navegação mobile

- **Data:** 2026-10-11
- **Decisão (modo autônomo, D-053):**
  - **Home completa em estrutura:** desenvolvimento mostra as 9 seções de `docs/03` na ordem (Hero → … → Side Quests → Final Checkpoint) + footer; produção mostra só as seções com conteúdo aprovado (Hero, Player Status, Skill Loadout, Project Inventory, Final Checkpoint + footer). Validada em 1440 / 820 / 390, pt-BR e en, sem overflow; o ritmo entre seções segue o espaçamento de seção aprovado.
  - **Navegação mobile (backlog do Slice 01, D-037/D-039):** os destinos reais agora existem, então abaixo de 768 px a mesma nav (Sobre / Projetos / Contato) aparece como **segunda linha do header**, alinhada à marca. Sem menu, sem JS, sem novo ícone; marca e PT / EN da primeira linha inalterados (a 1ª linha mantém a altura do header). Header mobile: 117 px; o offset das âncoras continua medido em runtime (seção a 133 px). Rejeitado um botão "Menu": a 360 px sobram ~46 px na 1ª linha, e caber exigiria mover PT / EN para dentro do menu (mudança no header aprovado).
  - **≥ 768 px:** header **idêntico pixel a pixel** ao aprovado na 05-D (verificado em 1440 e 820, pt-BR e en).
  - **FASE 4 — CAREER CONTENT:** estrutura e visual de todas as seções concluídos; conteúdo editorial pendente em Campaign Log (03-C), Achievements (04-C), Current Main Quest (06-C) e Side Quests (07-C), todos com MOCK dev-only e produção vazia.
- **Status:** Aceita (REVIEWER).

## D-058 — FASE 5 / Game Feel 01: seleção de cartucho, inserção e CRT Project Viewer na Home

- **Data:** 2026-10-11
- **Decisão (modo autônomo, D-053; detalhes em `docs/20-game-feel-01.md`):**
  - **Seleção:** botão `Inserir cartucho / Insert cartridge` no Project Summary (slot de ação previsto no D-032); clicar no MC-CART é atalho de ponteiro para a mesma ação. O `mc-cart` continua `role="img"`, não focável e sem mudança no componente.
  - **Inserção (~600 ms):** cartucho sobe 8 px; CRT Project Viewer liga abaixo da grade (8/12 no desktop); `LOADING CARTRIDGE...` por 450 ms; case com foco no título. Outro cartucho troca na hora; ejetar devolve o foco. Deslocamento espacial até um console não implementado (versão simplificada "encaixe + boot", prevista em `docs/05`).
  - **Case:** só campos aprovados do `Project` (serial, tipo, nome, artwork com alt, descrição, papel, stack, aprendizados, links reais). `mc-crt-project-viewer` / `mc-crt-frame` inalterados.
  - **Motion:** CSS (transitions + keyframes), sem biblioteca; `prefers-reduced-motion` = sem boot, sem deslocamento, sem animação. Sem som, sem loop.
  - **Roteamento:** case na própria Home; `/projects/:slug` continua futuro.
  - Atualiza o D-046 ("MC-CART continua não clicável"): a interação chegou como previsto, sem transformar o objeto em link.
- **Status:** Aceita (REVIEWER).

## D-059 — FASE 5: Boot / Intro na tela do CRT do Hero; fechamento da FASE 5

- **Data:** 2026-10-11
- **Decisão (modo autônomo, D-053):**
  - **Boot / Intro (≤ 1 s, `docs/02`):** na primeira visita da sessão, a tela do CRT do Hero mostra `INITIALIZING CAMPAIGN...` → `PLAYER FOUND` (420 ms cada) antes do estado aprovado `INSERT CARTRIDGE`. Não é overlay nem tela de entrada: nada é coberto ou bloqueado, o layout do Hero não muda e a cena continua `aria-hidden`. Não repete na mesma sessão (`sessionStorage`, com fallback sem storage = não repetir); não acontece com `prefers-reduced-motion`. Só texto de sistema no dicionário de UI (`boot.*`).
  - Mudança no Hero aprovado (D-039) limitada ao texto da tela durante ≤ 840 ms; composição, cena e estado final idênticos. Motivo: item do roadmap (FASE 5) e a forma menos intrusiva de cumprir "nunca bloquear o conteúdo".
  - **Microinterações:** cobertas pelos estados do cartucho (hover/foco, inserido), boot do CRT e do Hero (D-058, D-059). Nenhuma microinteração decorativa constante.
  - **"Progress" (roadmap FASE 5):** sem definição nos docs; **não implementado** para não inventar feature. Fica como decisão do Eduardo (ex.: indicador de seção atual na nav, `docs/03`).
- **Status:** Aceita (REVIEWER). **FASE 5 — GAME FEEL: concluída** no escopo implementável (Progress pendente de definição).

## D-060 — FASE 8 / Quality: teclado, foco, SEO bilíngue e medição

- **Data:** 2026-10-11
- **Decisão (modo autônomo, D-053):**
  - **Teclado:** link "Pular para o conteúdo / Skip to content" como primeiro foco da página (shell), visível só com foco; leva o foco ao `<main id="main-content" tabindex="-1">` da Home sem mudar a URL (um `href="#…"` navegaria a partir do `<base href>`). Auditoria real (Tab em 1440 e 390 px, produção): 13 paradas em ordem lógica, todas com anel de foco, nenhuma sob o header.
  - **Foco/âncora sob o header (WCAG 2.4.11):** o header publica a altura real (`ResizeObserver` → `--mc-header-block`); `html { scroll-padding-top }` usa esse valor (+16 px). Substitui o `scroll-margin-top` fixo de 64 px nas seções, que falhava no header mobile de 117 px (D-057). O `ViewportScroller` continua com o offset medido em runtime.
  - **SEO bilíngue:** o `LocaleService` mantém `<link rel="alternate" hreflang>` (pt-BR, en, x-default), `<link rel="canonical">` e Open Graph (`og:title`, `og:description`, `og:locale`, `og:url`) por idioma, com URLs absolutas a partir do `<base href>` (funciona em `/` e em `/modo-campanha/`). `index.html` ganha Open Graph estático em pt-BR (crawlers sociais não executam JS). `public/robots.txt` (allow all; **só vale na raiz do host**: no GitHub Pages de projeto, `/modo-campanha/robots.txt` é ignorado pelos crawlers, então passa a valer com domínio próprio, FASE 9). `og:locale:alternate` acompanha o idioma. **Sem `og:image`** e sem favicon próprio até existir o monograma MC.
  - **Performance:** Lighthouse (build de produção, mediana de 3): mobile 87 / 100 / 100 / 100 (performance / a11y / best practices / SEO), FCP ≈ 2,8 s, LCP ≈ 3,4 s, CLS 0, TBT ≈ 30 ms; desktop 100 / 100 / 100 / 100. Testado e **revertido** carregar a Home sem lazy loading (89 em mobile, ganho marginal; o lazy de `docs/06` fica). A alavanca real para FCP/LCP mobile é **prerender estático** (`@angular/ssr` só em build), que é dependência nova: **decisão do Eduardo**. Preload da fonte do Hero continua pendente (nome com hash, D-023).
  - **Redução de movimento:** auditada nas FASES 5/8 (boot do Hero e do CRT pulados; transições zeradas pela regra global).
- **Status:** Aceita (REVIEWER). FASE 8 concluída no escopo implementável; pendentes: prerender (decisão), `og:image`/favicon (monograma MC), preload de fonte.

## D-061 — Upgrade para Angular 22 (fecha D-009)

- **Data:** 2026-10-11
- **Decisão (modo autônomo, D-053):** projeto atualizado com `ng update @angular/core@22 @angular/cli@22`: **Angular 22.2.2** e **TypeScript 6.0.3**. O bloqueio do D-009 (Node 22.14 incompatível) não existe mais: a máquina tem Node 24.21 (Angular 22 exige `^22.22.3 || ^24.15.0 || >=26`). CI do deploy passa para `node-version: 24`.
  - Migração oficial aplicada: `tsconfig.app.json` suprime os diagnósticos estendidos `nullishCoalescingNotNullable` e `optionalChainNotNullable` (preserva o comportamento pré-v22). As migrações opcionais (Karma → Vitest, application builder) não se aplicam: o projeto já usa os dois.
  - **Verificação:** 108/108 testes, typecheck, builds prod / GitHub Pages / dev sem warnings, guards OK; páginas de produção **idênticas pixel a pixel** antes e depois (1440 / 820 / 390, pt-BR e en); inserção de cartucho, foco e boot do Hero conferidos no build novo.
- **Status:** Aceita (REVIEWER). Substitui D-009.

## D-062 — Fim da rodada autônoma: estado do produto e decisões pendentes

- **Data:** 2026-10-11
- **Estado (branch `feat/autonomous-site-completion`, sem merge em `main`, sem deploy):**
  - **Concluído e aprovado pelo REVIEWER (D-053):** Home Slice 05 (Final Checkpoint + footer, D-052/D-054); Slice 06 Current Main Quest (D-055) e Slice 07 Side Quests (D-056) em estrutura/visual; revisão integrada da FASE 4 e nav mobile (D-057); FASE 5 — cartucho → CRT, boot do CRT e do Hero (D-058, D-059); FASE 8 — teclado, foco, SEO bilíngue, Lighthouse (D-060); Angular 22 (D-061).
  - **Produção (público):** Hero → Player Status → Skill Loadout → Project Inventory (com inserção no CRT) → Final Checkpoint → footer. **Sem MOCK** (guard do deploy cobre `mock-campaign-log|mock-achievement|mock-current-quest|mock-side-quest`).
  - **Só em desenvolvimento (MOCK):** Campaign Log, Achievements, Current Main Quest, Side Quests.
- **Pendente de decisão / conteúdo do Eduardo:**
  1. Conteúdo factual: histórico real do Campaign Log (03-0/03-C), 2–5 achievements com evidência (04-0/04-C), texto público da Current Main Quest (06-C), side quests reais (07-C), Paco (MC-002) para `approved`, foto real, "Sobre a jornada", currículo e email (se existirem).
  2. FASE 6 (Secrets): efeito do Konami Code, conteúdo e local da Secret Area.
  3. "Progress" (FASE 5): definir ou descartar.
  4. Prerender estático (`@angular/ssr` só em build) para FCP/LCP mobile e HTML por idioma.
  5. Monograma MC / wordmark (favicon, `og:image`) e artes (ex.: Hero CRT Screen Artwork).
  6. Revisão do que foi decidido em modo autônomo e toca áreas aprovadas: header mobile em 2 linhas (D-057), botão "Inserir cartucho" e hover no Inventory (D-058), boot na tela do CRT do Hero (D-059).
  7. Publicação (FASE 9): merge em `main` e primeiro deploy no GitHub Pages; o projeto agora exige Node 24 (ou 22.22.3+).
  8. **XP / Campaign XP** (D-021): só com regras reais e verificáveis.
  9. Direções visuais escolhidas em modo autônomo para as seções novas: **Quest Briefing** (Current Main Quest, D-055) e **Side Quest Log** (Side Quests, D-056).
- **Pendências técnicas (não dependem do Eduardo, adiadas):** preload da fonte do Hero (D-023/D-060: exige rever a fonte com hash ou um passo pós-build); documentar Motion, Responsive e Accessibility como fundamentos no `docs/11` (aprovação como DS definitivo é do Eduardo).
- ⚠️ **Alerta permanente:** o MOCK do Campaign Log (D-049, só em dev/testes) tem períodos e nomes **plausíveis** ("2013 — 2017", FATEC Americana, Comunidade On). Capturas do ambiente de desenvolvimento **nunca** devem circular como fato sobre o Eduardo. Os MOCKs de Achievements, Current Main Quest e Side Quests são explicitamente "de exemplo".
- **Status:** Aceita (REVIEWER).

## D-063 — Hero: refinamento de fidelidade à referência (rodada 1)

- **Data:** 2026-10-11
- **Pedido do Eduardo:** aproximar a Hero da referência visual (concept 03-B, "Referencia – Portfólio Modo Campanha Retro-Tech") em atmosfera, presença do objeto principal e storytelling, sem copiar e sem virar jogo literal. Plano e diagnóstico em `docs/21-hero-refinement.md`. Escopo só da Hero.
- **Decisão (substitui, só para a Hero, as partes de D-037/D-038/D-039 que vetavam controle e ambientação e mantinham "INSERT CARTRIDGE" como estado final):**
  - **Console MC-01 autoral** (inspirado na linguagem 16-bit: corpo horizontal, slot no tampo, chaves POWER/RESET, portas de controle), vetorial (SVG local, só tokens de material), com o **MC-CART MC-001 inserido** (shell laranja, faixa special, rótulo com o artwork aprovado). **Controle MC-01** em primeiro plano, com cabo. Sem formas, cores ou marcas de terceiros.
  - **CRT** (`mc-crt-frame`, inalterado) atrás do console; depois do boot (D-059) a tela mostra o **cartucho em execução**: artwork do MC-001 + faixa `MC-001 · Modo Campanha` (dados aprovados; nenhum texto novo). Sem cartucho aprovado com artwork, volta a `INSERT CARTRIDGE`. A partir de md o CRT tem > 28rem (mantém a moldura física); no mobile, moldura simplificada (D-038).
  - **Ambiente:** fundo da Hero com luz quente do lado da cena, painéis de parede só onde a luz bate, mesa com reflexo da TV; lado do texto escuro. Glow só na área visual (D-024).
  - **Texto:** eyebrow como etiqueta de sistema (tag `MC-01` + PORTFÓLIO PROFISSIONAL; `ui.hero.eyebrow` perdeu o prefixo), "MODO CAMPANHA" com gradiente laranja (sem glow), motto com marcador ▶ em laranja (`title-l` 600), GitHub / LinkedIn como ações **secondary**. Textos aprovados inalterados.
  - **Desktop:** cena em 7–12 com sangria até a borda da página.
  - **Assets dedicados** (render do hardware, ambiente, tela 4:3, variações de cartucho): especificados em `docs/21` §3; a Hero aceita cada um via `HERO_SCENE_ASSETS` sem mudar o layout.
- **Status:** Implementada na branch `feat/hero-refinement` (REVIEWER). **Aguardando revisão do Eduardo** antes de seguir para outras seções.

## D-065 — MC-CART oficial: renders do MC-001, shell grafite e SYSTEM HORIZON

- **Data:** 2026-10-11
- **Decisão do Eduardo** (a partir dos renders aprovados "MC-CART MC-001 — front" e "— 3/4"; fontes em `design/source/mc-cart/`):
  1. **MC-001 = shell grafite/preto fosco com acentos laranja queimado** (pequenos acentos metálicos, plástico texturizado; sem neon, sem excesso de LEDs). O laranja continua cor de identidade e destaque, sem dominar a carcaça. **O shell totalmente laranja deixa de ser a referência principal do MC-001** (dado: `shell: 'dark'`, `accent: 'warm'`, usados só pelo fallback em CSS).
  2. **SYSTEM HORIZON = artwork oficial do MC-001**: a paisagem pixel art dos renders (pôr do sol, montanhas, lago, caminho), 4:3. Substitui a v1 de D-046 (arquivada em `design/source/mc-cart/archive/mc-001-system-horizon-v1.png`, fora do runtime). Runtime: `assets/cartridges/mc-001/system-horizon.webp` (960 × 720), usada no case do CRT e na tela do CRT da Hero; alt bilíngue novo, descritivo.
  3. **Render frontal = representação padrão no Project Inventory.** O render É o objeto: o `mc-cart` ganhou o input `render` e, com ele, mostra só a imagem (sem casca, moldura, grips ou sombra interna em CSS). A construção em CSS (D-032/D-034) fica como **fallback** para projetos sem render. Nome acessível, `role="img"`, botão "Inserir cartucho", inserção → CRT, teclado e reduced motion inalterados.
  4. **Render 3/4 = representação de destaque / product shot** (Hero, inserção, destaques, documentação). Declarado no dado (`cartridge.renders.threeQuarter`), ainda sem uso: entra na próxima rodada da Hero.
  5. **Glifo de quatro quadrados laranja = SYSTEM / HARDWARE GLYPH**, presente no MC-01, no MC-CART, no controle, na CRT e em detalhes de hardware. **Não é logotipo** e não substitui MODO CAMPANHA nem MC na identidade principal; o monograma MC continua exploração futura separada (D-015).
  6. **A silhueta dos renders é a direção física oficial do MC-CART**: objeto autoral, ombros próprios, encaixe/rebaixo central no topo, laterais estruturadas, espessura física, área inferior de conexão; não copia cartucho comercial. Onde a construção em CSS divergir, o render prevalece.
  7. Label com SYSTEM HORIZON, MC-CART, MC-001 e MODO CAMPANHA; sem rarity, level, stats, QR code, selo, XP ou badges.
- **Implementação:**
  - Modelo: `ProjectCartridge.renders { front; threeQuarter? }` e `artwork` com `width`/`height` (`CartridgeImage`), sem sistema paralelo. Paths só em `projects.data.ts`.
  - Assets de runtime (WebP com alfa, recorte das margens transparentes, sem otimização agressiva): `front.webp` 960 × 690 (172 KB), `three-quarter.webp` 1244 × 1017 (367 KB, ainda não carregado), `system-horizon.webp` 960 × 720 (215 KB). Originais PNG em `design/source/mc-cart/`.
  - **Escala no Inventory:** o cartucho vira o segundo grande objeto físico do site: item até **24rem** (antes 22rem) e **3 por linha no desktop ≥ 1200** (antes 4); 2 no tablet, 1 no mobile. Hover continua sendo só a elevação curta (D-058); sombra de contato discreta (`drop-shadow` com `material-groove`); nada de glow, borda de card ou overlay.
  - Case e tela do CRT da Hero: artwork 4:3 reduzido com suavização (sem `image-rendering: pixelated`, que serrilha ao reduzir um original de alta resolução). Nenhuma mudança estrutural no CRT.
  - Orçamento de CSS do `mc-cart` (D-035): regras de host do render ficam no Inventory; removida uma cor duplicada herdada em `.top` (sem efeito visual).
- **Atualiza:** D-046 (artwork e shell do MC-001), D-032/D-034 (a construção em CSS passa a ser fallback), D-044 (densidade do Inventory no desktop: 3 por linha).
- **Status:** Aceita (decisão do Eduardo; integração aprovada pelo REVIEWER).

## D-066 — Hero: composição com os renders oficiais do ecossistema MC-01 (rodada 2)

- **Data:** 2026-10-11
- **Pedido do Eduardo:** reconstruir a composição da Hero tendo a imagem "Estação Retro ao Pôr do Sol" como alvo de direção de arte, **só com renders oficiais** (CRT, console MC-01, controle MC-01, MC-CART MC-001, SYSTEM HORIZON, imagem de setup/ambiente). Nada redesenhado em CSS/vetor. Plano e detalhes em `docs/21` §6.
- **Decisão:**
  - **Substitui a cena vetorial de D-063** (console/controle em SVG, `mc-crt-frame` na Hero, `HERO_SCENE_ASSETS`). A proposta intermediária com a foto de setup só em 1440 (D-064, nunca commitada, guardada em stash) fica obsoleta. Texto, hierarquia, eyebrow, gradiente de MODO CAMPANHA, motto e ações de D-063 continuam.
  - **Palco com a proporção do ambiente (1672 × 941)**, objetos em posições percentuais tiradas da referência: o render nítido cobre o objeto desfocado do ambiente. Três planos: texto (esquerda escura) · hardware (console com cartucho, MC-CART 3/4, controle) · CRT + ambiente.
  - **Ambiente integrado:** derivado desfocado/escurecido da imagem de setup, com opacidade 0,85 e máscara dupla (some à esquerda entre 34% e 64% do palco, o que deixa no escuro o cartucho deitado da imagem de setup; 42% → 72% no desktop compacto; dissolve em cima e embaixo). Nunca retângulo. Luz quente localizada (`--mc-glow-warm`, `screen`, opacidade 0,4); sem neon, bloom ou glow animado.
  - **CRT:** render oficial; a tela é um SVG recortado no vidro do render (`CRT_GLASS`) com o boot de D-059 e, depois, um **derivado de 440 px do SYSTEM HORIZON** (38 KB, não a arte de 215 KB) + faixa `MC-001 · Modo Campanha` (oculta no mobile, onde ficaria ilegível). O `mc-crt-frame` continua sendo o CRT do Project Viewer.
  - **Controle:** render frontal deitado na mesa por perspectiva CSS (`rotateX(42deg) rotate(-7deg)`); é apoio, não protagonista.
  - **Responsivo:** desktop ≥ 1200 = palco absoluto à direita com a altura da Hero (`min(56.25vw, 100svh − header)`), texto sobre a área escura; **desktop compacto 1024–1199** = cena nas colunas 7–12, mesmo palco recortado (40% → 100%) com a borda esquerda dissolvida; **tablet 768–1023** = cena abaixo do texto, mesmo palco recortado e sangrando até as bordas; **mobile** = CRT + console + controle sem ambiente (o MC-CART fica no Inventory), com a luz quente da Hero.
  - **Performance:** derivados WebP em duas larguras com `srcset`/`sizes`, `loading="lazy"` + `decoding="async"`, sem preload (o LCP é texto). Peso da cena: 176 KB no desktop (DPR 1) e 139 KB no mobile, contra 215 KB só do SYSTEM HORIZON antes. Lighthouse (mediana de 3): HTTP/2 + TLS (como o GitHub Pages) mobile 84 → **86**, desktop 99 → 99; servidor local HTTP/1.1 mobile 83 → 81 (LCP simulado +300 ms por 3 requisições a mais na fila de 6 conexões; total transferido cai de 806 para 726 KB). Tentativa de adiar a cena com `@defer (on idle)` piorou o LCP e foi descartada.
  - **Acessibilidade:** cena `aria-hidden`, imagens `alt=""`, nenhum elemento focável; H1, ordem de foco, contraste e reduced motion inalterados. Sem animação nova.
  - **Fontes:** PNGs em `design/source/hero/`; derivados em `public/assets/hero/`; o cartucho da cena é derivado do render 3/4 oficial (D-065).
- **REVIEWER independente:** 1ª passada APROVADO COM AJUSTES (3 MAJOR: fantasma do controle, fantasma do cartucho deitado do ambiente, ambiente com cara de painel em 1024–1199; MINOR: fade de topo no tablet, MC-CART flutuando, CRT empilhado no mobile, etiqueta da tela ilegível, cena competindo com a marca); corrigidos só com posição, escala e máscara; 2ª passada **APROVADO**. Acompanhamento (MINOR, não bloqueia): CTAs abaixo da dobra em 1280 × 720 (bloco de texto inalterado, não é regressão) e vão escuro entre texto e cena em ultrawide (2560).
- **Status:** Implementada na branch `feat/hero-refinement` (REVIEWER). **Hero NÃO congelada: aguardando revisão visual do Eduardo.**

## D-067 — Hero: fundo aprovado usado direto (substitui a composição de D-066)

- **Data:** 2026-10-11
- **Decisão do Eduardo:** a Hero usa **só a imagem de fundo aprovada** (setup MC-01 ao pôr do sol, a mesma imagem de referência de D-066), direto, **em vez de montar a cena com os renders separados**. Detalhes em `docs/21` §7.
- **Implementação:**
  - Um único `<img>` decorativo (`aria-hidden`, `alt=""`) dentro de `<picture>`; nada redesenhado nem sobreposto. CSS só recorta (`object-fit`/`object-position`), escala e aplica máscara: as bordas sempre se dissolvem no fundo da página (nunca retângulo).
  - **Desktop ≥ 1200:** a imagem ocupa a Hero inteira, ancorada à direita, na proporção dela (16:9), com altura `min(56.25vw, 100svh − header)`; a esquerda (texto) já é escura na imagem e a máscara a escurece até depois do texto (34% → 62%, para o teclado da imagem não ficar sob o resumo); a base dissolve na seção seguinte.
  - **Desktop compacto 1024–1199:** imagem nas colunas 7–12, recorte quadrado à direita (MC-01, CRT e controle). **Tablet:** abaixo do texto, 3:2, sangrando até as bordas. **Mobile:** abaixo do texto, **recorte quadrado próprio** (`background-mobile-*`, x 628–1569 da original), para não baixar a imagem inteira.
  - **Assets:** fonte `design/source/hero/hero-background.png` (renomeada de `hero-reference-setup.png`); runtime `background-{640,960,1280,1672}.webp` (36–147 KB) e `background-mobile-{480,800}.webp` (43/88 KB). Os derivados da cena de D-066 (CRT, console, controle, cartucho, ambiente desfocado, tela) saíram do runtime; os PNGs oficiais do MC-01 continuam em `design/source/hero/`.
  - Sem `loading="lazy"`: no desktop a imagem é o maior elemento da dobra.
- **Imagem trocada (2026-10-12, pedido do Eduardo):** nova versão do mesmo setup com **teclado e mouse** na mesa (mesmas dimensões e mesma posição do hardware; layout e recortes inalterados). Lighthouse igual ao da versão anterior.
- **Arte final do fundo (2026-10-12, Eduardo):** mesmo setup, sem teclado e mouse, com o cabo do controle ligado à porta 1 do MC-01. Mesmas dimensões e posições; derivados 33–137 KB e mobile 41/84 KB. A máscara do desktop (34% → 62%) continua.
- **Removido com a cena:** componente `hero-visual` e o **Boot / Intro na tela do CRT da Hero (D-059)**, que dependia da tela montada. As strings `ui.boot` ficam no dicionário, sem uso, até decisão do Eduardo (descartar ou recolocar como sobreposição na tela da imagem).
- **Performance (Lighthouse 12, mediana de 3; antes = D-065):** HTTP/2 + TLS mobile 84 → **85** (LCP 3930 → 3780 ms), desktop 99 → 99 (LCP 750 → 770 ms); HTTP/1.1 local mobile 83 → **80** (LCP 3820 → 4271 ms), desktop 99 → 99 (LCP 759 → 880 ms). A imagem é pedida com prioridade alta (está na dobra); no HTTP/1.1 ela disputa as 6 conexões com o JS e as fontes.
- **Substitui:** a composição de D-066 (texto, hierarquia e ações de D-063 continuam).
- **Status:** Implementada na branch `feat/hero-refinement`. **Hero NÃO congelada: aguardando revisão visual do Eduardo.**

## D-068 — SYSTEM HORIZON: teaser do CRT da Hero (attract mode)

- **Data:** 2026-10-12
- **Pedido e aprovação do Eduardo:** um teaser em pixel art no CRT da Hero que explique a ideia central ("experiência → progresso → conquista → campanha") e o CTA **Explorar campanha**, tratado como a primeira cena real do futuro SYSTEM HORIZON (MC-001), não como animação isolada. Especificação técnica e de assets em `docs/22-system-horizon-teaser.md`.
- **Decisões:**
  1. **HUD:** PLAYER 01 + 4 slots de inventário. **Sem "XP 10+"** nem pontuação (os 10+ anos seguem como dado profissional da página).
  2. **Jogador:** figura humana pequena representando o Eduardo (cabelo escuro, óculos, roupa escura, silhueta simples). É o avatar do jogador, não uma persona profissional fictícia ("XP real, sem personagem").
  3. **Linguagem de sistema em inglês nos dois idiomas** (PLAYER 01, BUILD, PRODUCT, AI, GAME DNA, CAMPAIGN UNLOCKED, MC-001, SYSTEM HORIZON, CAMPAIGN CONTINUES...), vinda do dicionário (`ui.systemHorizon`); controles localizados (Pausar demonstração / Pause demo, Reproduzir / Play). Texto sempre DOM (IBM Plex) sobre o canvas, nunca desenhado na arte.
  4. **Pausa:** ícone pause/play discreto no canto inferior do visual (32 × 32, foco visível, nome acessível localizado) e parada automática após **3 voltas** (WCAG 2.2.2).
  5. **Loop:** ~7 s a 12 fps, 160 × 120 (4:3). O CRT liga só no primeiro play da página; as voltas seguintes reiniciam com 2 quadros de interferência (sem tela preta, sem flash).
  6. **Estático oficial** (`prefers-reduced-motion` e pausado): os quatro itens formando o MC-CART + CAMPAIGN UNLOCKED + MC-001 (tick 58).
  7. **Ícones:** BUILD `</>`, PRODUCT card de interface, AI nós conectados, GAME DNA d-pad.
  8. **Arquitetura:** `src/app/system-horizon/` (`engine/`, `world/`, `scenes/`, `control/`, `content/`); engine em TypeScript puro; o teaser é o attract mode (roteiro) e o jogo trocará o roteiro por input.
  9. **Arte final produzida externamente** a partir de `docs/22` §4; nesta rodada, placeholders técnicos com a mesma geometria.
  10. O final da experiência completa (esposa e três gatos) fica fora do teaser.
- **Implementação:** `features/hero/hero-scene.*` (fundo de D-067 + tela + pausa; layout, textos, CTAs e imagem inalterados), tela posicionada sobre o vidro do CRT da imagem (recortada onde o cartucho do console cobre o vidro), chunk próprio (~5,8 KB gzip) carregado depois do `load` + idle + 1 s, pausa fora da viewport/aba oculta, ícones `pause`/`play` no `mc-icon`. Testes do roteiro (coletas, quadro-chave, boot único), do relógio, do estado de reprodução e da cena da Hero. `src/test-setup.ts` desliga o canvas do jsdom.
- **Performance:** sem regressão (HTTP/2 mobile 85 → 85, LCP igual; desktop 99, LCP 770 → 790 ms). Detalhes em `docs/22` §8.
- **Resolve:** a pendência do Boot / Intro (D-059, removido em D-067): o liga-CRT volta como parte do teaser.
- **Ajuste (2026-10-12, revisão do Eduardo):** a tela agora **segue o ângulo da TV**. O vidro da foto não é retangular (a TV está levemente girada: topo 161 → 151, base 400 → 405 na fonte); a tela recebe os quatro cantos do vidro (`HERO_CRT_GLASS`) e é projetada em perspectiva (`matrix3d`, `system-horizon/screen-quad.ts`), com canvas, textos e cantos arredondados juntos. Sem custo de performance (HTTP/2: mobile 85, desktop 99).
- **Aprovação (2026-10-12, Eduardo): TEASER TÉCNICO APPROVED e FROZEN.** Engine, roteiro, timings, pause/play, parada após 3 voltas, `prefers-reduced-motion`, responsivo e arquitetura do attract mode não mudam sem regressão objetiva. `ui.boot` removido (busca global sem usos; testes e builds verdes). Próxima etapa: só integrar a arte final conforme `docs/22` §4, sem mudar dimensões, pivots nem layout das folhas, validando **cenário + personagem antes** de pickups e MC-CART (`docs/22` §11). System Horizon jogável fora de escopo.
- **Rodada do cenário (2026-10-12):** SKY, MOUNTAINS (harmonização técnica do master) e TREES aprovados; GROUND em regeneração externa pela opção A (trilha plana → subida suave → mirante, perfil congelado mantido); paleta única de 16 cores derivada da identidade cromática do Modo Campanha, compartilhada por todas as camadas; sol central preservado (só a legenda MC-001 do quadro-chave pode ser reposicionada). Detalhes e pipeline em docs/22 §12. **Cenário integrado** (GROUND v3 aprovado, translação de 14 px; paleta oficial em `design/source/system-horizon/sh-palette.gpl`; legenda MC-001 ao lado do cartucho); personagem, pickups e MC-CART seguem placeholders. **Personagem provisório (2026-10-13):** quadros aprovados reduzidos 2:1, quadro do personagem revisado para 16 × 24 (pivot 8,23), paleta única recalculada com cenário + personagem, rótulos dos itens 30 px acima da trilha (docs/22 §13). **Pickups, HUD e MC-CART (2026-10-13):** desenhados em pixel art no repositório (fonte editável `design/source/system-horizon/pixel/build-pickups.mjs`), na paleta oficial e no contrato de §4; MC-CART na silhueta oficial (D-065). Toda a arte do teaser integrada (~23 KB); aguardando validação conjunta (docs/22 §14).
- **Status:** **APPROVED / FROZEN** (base técnica) na branch `feat/hero-refinement`; placeholders em uso até a arte final.
- **Aprovação para publicação (2026-10-19, Eduardo):** o teaser está aprovado como está, com cenário final, personagem provisório, pickups, HUD e MC-CART em pixel art do repositório (`docs/22` §13–§14). Arte externa futura pode substituir os assets sem mudar o contrato (§4).

## D-069 — SYSTEM HORIZON: MVP interativo (proposta)

- **Data:** 2026-10-13
- **Pedido do Eduardo:** definir, antes de implementar, como o MC-001 SYSTEM HORIZON vira a primeira experiência jogável do portfólio. Escopo desta rodada: arquitetura e experiência; nada implementado.
- **Proposta (`docs/23-system-horizon-mvp.md`):**
  - o jogo é o **Campaign Log transformado em lugar**: uma visão interativa dos dados já publicados, sem conteúdo próprio;
  - o mapa do mundo guarda **referências** (Campaign Log, Skill Loadout, Project Inventory, Player Status, Achievements, Current Main Quest, Final Checkpoint) e posições;
  - dado não publicado não aparece;
  - 5 atos (ORIGIN, BUILD, EVOLVE, CAMPAIGNS, HORIZON), 3–5 min, loop andar → marco → ler (DOM) → checkpoint;
  - os 4 grupos do Skill Loadout são os coletáveis do teaser; o MC-CART se forma no ato 04;
  - **entrada híbrida:** o case do MC-001 no CRT do Inventory leva à rota dedicada `/system-horizon` (pt/en), lazy, com layout próprio; a saída devolve a `#project-inventory`;
  - **engine:** evolução do engine do teaser (viewport lógico variável, terreno por segmento, controller com intenção de movimento, laço comum), com regressão zero no teaser congelado;
  - **acessibilidade:** conteúdo profissional só em DOM, versão em texto equivalente, `<dialog>` de leitura, região viva, teclado completo, toque com ◀ Ler ▶ e "próximo marco", reduced motion;
  - epílogo pessoal só estudado.
- **Status:** **PROPOSTA**, aguardando aprovação do Eduardo (decisões em `docs/23` §17). Não implementar antes disso.

## D-070 — Campaign Log: CHAPTER 00 — ORIGIN

- **Data:** 2026-10-17
- **Pedido do Eduardo:** começar o histórico real pelo arco de origem da paixão por videogames ("A campanha começou muito antes do código."). São cinco checkpoints com textos pt/en fornecidos por ele, sem inventar datas nem conquistas. Detalhes em `docs/15` §13.
- **Decisão (menor evolução):**
  - **Modelo:** o modelo das entradas profissionais (D-048) não muda. Entra `CampaignLogChapter` com `CampaignLogChapterEntry` (código de sistema, `when` = ano aproximado ou época, título, frase-resumo literal, história em parágrafos).
  - **Visual:** o visual congelado (D-050) é preservado. O capítulo é o primeiro grupo do mesmo eixo, com os mesmos markers, tipografia e spacing, sem cards.
  - **Interação:** a única interação nova é o `<details>` nativo "Ler a história completa". Isso flexibiliza o "nada é interativo" de D-048/D-050 só para as histórias de capítulo, a pedido do Eduardo.
  - **Publicação:** `ORIGIN_CHAPTER` é conteúdo real, mas `CAMPAIGN_LOG_CHAPTERS` fica vazio em produção até o Eduardo congelar o capítulo; em desenvolvimento aparece antes da linha profissional MOCK. A Home renderiza o Campaign Log se houver entradas ou capítulos.
  - **Datas:** só c. 1991; os demais checkpoints usam época em texto.
- **Fotos (2026-10-17):** as duas fotos reais da coleção e do móvel entram no checkpoint 05, dentro da história completa (modelo `CampaignLogPhoto`: WebP, proporção original, alt bilíngue, lazy).
- **Pendências:** aprovação das frases-resumo e dos textos alternativos das fotos; publicação; o checkpoint real da FATEC (hoje só MOCK).
- **Status:** **APPROVED / FROZEN e publicado em produção** (D-071).

## D-071 — Campaign Log: CHAPTER 01 — DO CONTROLE AO CÓDIGO; CHAPTER 00 publicado

- **Data:** 2026-10-17
- **CHAPTER 00 — ORIGIN:** aprovado e congelado pelo Eduardo (incluindo frases-resumo, fotos e textos alternativos). Publicado na produção: `CAMPAIGN_LOG_CHAPTERS = [ORIGIN_CHAPTER]`. Sem deploy.
- **CHAPTER 01 — DO CONTROLE AO CÓDIGO (2013–2017, FATEC Americana):**
  - **Conteúdo:** cinco checkpoints com o texto pt do Eduardo e o fechamento CHECKPOINT COMPLETE — 2017. A tradução para o inglês é minha e está pendente. Detalhes em `docs/15` §14.
  - **Modelo:** `when` passa a aceitar `{ year }`; `code` vira opcional; o capítulo ganha `name` localizado, `period`, `context` e `closing`.
  - **MOCK:** a entrada MOCK da formação saiu do MOCK de desenvolvimento.
  - **Publicação:** o capítulo 01 fica só em desenvolvimento até a revisão.
- **Links (2026-10-17):** o checkpoint 05 do CHAPTER 01 linka o TCC no repositório do CPS, dentro da história completa (campo `links`, só para documentos públicos que comprovam o checkpoint). O Google Play expirou: sem link, e retomar o Aedes Revenge fica como projeto futuro.
- **Status:** CHAPTER 00 **APPROVED / FROZEN / publicado**; CHAPTER 01 **aguardando revisão visual e aprovação da tradução**.

## D-072 — Campaign Log: CHAPTER 02 (ScoutEvo)

- **Data:** 2026-10-17
- **Conteúdo:** checkpoint ScoutEvo (2018) com os textos pt/en do Eduardo. Abre o CHAPTER 02 porque vem depois do fechamento do CHAPTER 01. Detalhes em `docs/15` §15.
- **Modelo:** `name` e `signature` do capítulo viram opcionais. Sem nome aprovado, o cabeçalho mostra só "CHAPTER 02"; nada é inventado.
- **Link e imagem (2026-10-17):** reportagem do O Globo sobre a maratona (2018) e a colagem com o anúncio do vencedor do FUTEBOOM, usada como o Eduardo enviou (decisão dele, ciente de que inclui a marca do O Globo e o escudo do Flamengo).
- **EOS (2026-10-17):** CHECKPOINT 02 do CHAPTER 02 (2019), com os textos pt/en do Eduardo.
- **Referências do EOS:** links do Campaign Log ganham tipo (lançamento institucional, publicação científica, imprensa, registro bibliográfico, documento acadêmico) e nota opcional. O EOS lista o artigo da Elsevier (ScienceDirect + DOI, autoria de Henrique Barros Bellotti e Maria Teresa Françoso, nunca do Eduardo), a reportagem do Portal Afya e o registro no OpenAlex. O anúncio da Unicamp fica pendente até o link chegar.
- **Axia (2026-10-17):** CHECKPOINT 03 do CHAPTER 02, atualizado para a versão 2021–2024 do Eduardo (`when: { span }`), com a reportagem da InfraFM como imprensa. Os links da Arppen não entram (404; a home da Arppen aponta para a Comunidade On).
- **Correção de regressão (2026-10-17):** o enxugamento de CSS do commit fa5adc0 grudou `.title` na regra de `.context`, e os títulos dos checkpoints de capítulo passaram a sair pequenos e apagados (inclusive no capítulo 00 da produção; sem deploy). A correção junta `.title` e `.signature` como era a intenção, e foi conferida no navegador: título, resumo e rótulo dos capítulos têm estilo computado idêntico ao da linha profissional aprovada (D-050).
- **Comunidade ON (2026-10-17):** CHECKPOINT 04 do CHAPTER 02 (`when: { since: 2025 }`, exibido como DESDE 2025), com os textos pt/en do Eduardo. O capítulo ganhou `ongoing: true`: o fechamento mostra CURRENT QUEST — EM ANDAMENTO e o lema do Player Status (`PLAYER_PROFILE.motto`), com o marker de campanha atual. Descrição pública escrita pelo Eduardo; nada interno da Comunidade On.
- **Status:** só em desenvolvimento, **aguardando revisão** e o nome/assinatura do capítulo.

## D-073 — Campaign Log: consolidação editorial dos CHAPTERS 01 e 02

- **Data:** 2026-10-17
- **Decisões do Eduardo:** CHAPTER 02 — DO CÓDIGO AO PRODUTO, 2018–atual, assinatura "Cada projeto trouxe um novo desafio. Cada desafio ampliou minha maneira de criar produtos digitais.", em aberto (CURRENT QUEST — EM ANDAMENTO + lema do Player Status). Resumo próprio do card da Comunidade ON, única exceção à regra "resumo = primeira frase". Axia com início aproximado (c. 2020/2021) e evolução posterior, sem ano final. EOS com 2019 como marco público.
- **Fontes:** notícia da Unicamp (FECFAU, 27/09/2019) como lançamento institucional do EOS; página inicial da Arppen como registro da empresa da Axia (`axia.html` em 404). Nenhuma fonte cita o Eduardo; as notas separam as datas de disponibilização, imprensa, artigo, início, protótipos e mercado, sem atribuir a ele publicações, resultados ou funcionalidades.
- **Modelo:** `approx` aceita dois anos possíveis (`[2020, 2021]` → "c. 2020/2021"); período do capítulo aceita `end: 'present'` (ATUAL / PRESENT); novo tipo de link `company` (REGISTRO DA EMPRESA / COMPANY RECORD).
- **Inglês:** revisão da tradução en do CHAPTER 01 (feita na implementação, não pelo Eduardo) e versões en propostas para o nome e a assinatura do CHAPTER 02; sugestões para os textos en do Eduardo ficam em `docs/15` §16.3, sem aplicar.
- **Correção:** `.story p` → `.story > p` devolve o estilo de rótulo e nota às referências (regressão desde fa5adc0; sem efeito no CHAPTER 00 de produção).
- **Auditoria:** repetições entre seções, entradas MOCK da linha profissional e recomendações para o Current Main Quest em `docs/15` §16.4–§16.6.
- **Status:** só em desenvolvimento, **aguardando aprovação visual e editorial do Eduardo**. A liberação em produção é uma etapa separada.

## D-074 — Campaign Log: conteúdo real canônico e linha profissional MOCK aposentada

- **Data:** 2026-10-17
- **Decisão do Eduardo:** os CHAPTERS 00, 01 e 02 estão aprovados editorialmente como base da versão de produção. Eles são agora o **conteúdo canônico do Campaign Log**: uma fonte única (`CAMPAIGN_LOG_CHAPTERS`), a mesma em desenvolvimento, testes, produção e GitHub Pages, sem `fileReplacements` nem `isDevMode()`. A autorização vale só para o Campaign Log.
- **MOCK aposentado:** as quatro entradas fictícias da antiga linha profissional (D-049) saíram da experiência real. Saíram o caminho de renderização (`CampaignLogEntry`, `CampaignLogKind`, bloco do template, markers e rótulos de dicionário sem uso), o arquivo de dados e o `fileReplacements`; os testes foram substituídos por testes da fonte canônica. O deploy guard `mock-campaign-log` fica.
- **Ajustes editoriais:** grafia pública "Comunidade ON" no Campaign Log; en "Digital Games" no lugar de "Game Development"; en "Axia Intelligence" para a evolução do produto; Axia c. 2020/2021 como estimativa do Eduardo; EOS com a Unicamp (set/2019) como marco público e a autoria do artigo preservada.
- **Links:** sai a página inicial da Arppen, que substituía a página da Axia (404). Nenhuma URL nova.
- **Visual e outras seções:** sem mudança na linguagem aprovada (D-050). Hero, teaser, Player Status, Skill Loadout, Project Inventory, Achievements, Current Main Quest, Side Quests, Final Checkpoint e footer não mudaram.
- **Status:** no build de produção e do GitHub Pages, **sem deploy**; aguardando a validação visual final do Eduardo. Detalhes em `docs/15` §17.

## D-075 — Project Inventory: refinamento da experiência (proposta)

- **Data:** 2026-10-18
- **Pedido do Eduardo:** transformar o Project Inventory numa experiência de exploração de projetos ("cada projeto é um cartucho; o MC-01 apresenta essas experiências"), com estados explícitos (INITIAL, SELECTED, INSERTING, READY, ERROR/FALLBACK). O congelamento visual do Inventory (02-C) fica suspenso só para esta revisão.
- **Proposta:** auditoria, diagnóstico e três direções prototipadas em `docs/24`: **A — Featured Cartridge**, **B — System Library** e **H — híbrido (recomendado)**: destaque de A com 1 cartucho, sistema de B no READY (faixa do slot, teaser no CRT, case fora do vidro) e biblioteca de B com 2 ou mais cartuchos aprovados.
- **Protótipo:** rota dev-only `/dev/inventory-lab` (nunca em produção), com dados reais do MC-001, renders oficiais, MC-CART, CRT e a tela do SYSTEM HORIZON sem modificação.
- **Pendente:** escolha da direção; nome do MC-001 (dados: "Modo Campanha"; rótulo/brief: SYSTEM HORIZON); teaser no CRT do Inventory; textos; derivados dos renders; modelo `experiences`. Nada implementado na Home; sem merge e sem deploy.

## D-076 — Project Inventory: estudo H2, inserção física do MC-CART (proposta)

- **Data:** 2026-10-18
- **Pedido do Eduardo:** testar a inserção física com os assets oficiais do MC-01 em camadas (traseira, cartucho, frente), o CRT frontal e o controle, e comparar com A, B e H antes de escolher. H não está aprovada.
- **Estudo:** `docs/24` §16 e o protótipo dev-only `/dev/inventory-lab?dir=h2`. As camadas registram exatamente contra a referência; a frente esconde a base do cartucho sem máscara; o movimento é só `transform` (750 ms, desacelerando); o CRT frontal recebe a camada digital no vidro (arte oficial, teaser sob demanda, carregamento, fallback); o case fica fora do vidro.
- **Assets:** fontes intactas em `design/source/mc-01/`; WebP de runtime em `public/assets/mc-01/` e `public/assets/cartridges/mc-001/console-scale.webp`, ainda sem uso em produção.
- **Status:** aguardando a escolha visual do Eduardo; nada na Home; sem merge e sem deploy.

## D-077 — Project Inventory: H2 aprovado e implementado; identidade do MC-01 e do MC-CART

- **Data:** 2026-10-18
- **Decisão do Eduardo:** H2 — Physical Cartridge Experience é a solução oficial do Project Inventory com um cartucho. Sem o controle nesta versão; sem WebGL, Three.js ou dependência de animação.
- **MC-01 canônico:** o console frontal em camadas do H2 é a referência física oficial do MC-01 para o Project Inventory. A Hero mantém a representação cinematográfica anterior (perspectiva e detalhes diferentes); a harmonização é pendência futura, e o console frontal não é redesenhado para imitar a foto da Hero.
- **MC-CART — conflito de identidade em aberto:** o MC-001 continua o cartucho oficial SYSTEM HORIZON (D-065), e `renders.front` segue canônico nos dados. O render que entra no console (`renders.console`, o `midle.png` do H2 aprovado) tem o mesmo rótulo, a mesma paleta e o mesmo lockup, mas **outro shell**: topo escalonado com blocos laterais e placa central, pegas laterais e janela do rótulo diferentes. A revisão independente mostrou que isso não se explica por câmera mais alta. Na Home, só essa variante aparece (o `front` fica nas miniaturas da escolha, com 2 ou mais cartuchos). **Decisão do Eduardo pendente:** aceitar a variante como shell oficial do MC-001 no console, ou pedir um render do console a partir do shell D-065. Detalhes em `docs/24` §17.4.
- **Posicionamento:** Modo Campanha = o portfólio e seu ecossistema; MC-01 = o sistema fictício que apresenta os projetos; MC-CART = a mídia física de cada projeto; SYSTEM HORIZON = a primeira experiência narrativa. O MC-001 passa a se chamar SYSTEM HORIZON, com a descrição do Eduardo e o estado "Teaser disponível · Campanha jogável em desenvolvimento". O tipo "EXPERIÊNCIA NARRATIVA / NARRATIVE EXPERIENCE" deriva da definição dele (confirmar).
- **Estado de domínio único** (`inventory.machine.ts`): empty → inserting → loading → ready (art | teaser | teaser-unavailable) → ejecting → empty; qualquer estado → unavailable se uma camada falhar. Textos, controles, LEDs (slot e tela) e anúncios saem só desse estado.
- **READY:** a arte oficial é o padrão; o teaser só roda em "Reproduzir teaser" (chunk carregado sob demanda; falha vira estado próprio). O case fica fora do vidro e entra junto com a ação de inserir (sem deslocar a página depois).
- **Componentes:** `mc-console` e `mc-crt-front` entram no design system como objetos físicos (geometria do console em `console.geometry.ts`). O Inventory deixa de usar a grade de cartuchos, o `mc-crt-project-viewer` e o case dentro do vidro; esses componentes continuam no showcase.
- **Múltiplos cartuchos:** a escolha aparece só com 2 ou mais aprovados (`INVENTORY_PROJECTS`); o laboratório dev-only usa o componente real com fixtures `mock-inventory-*` (deploy guard atualizado).
- **Proporção (2026-10-18):** a TV passa a ser a protagonista: 44/56 no desktop (CRT ≈ 1,27× o console), 45/55 em 820, console a 85% no mobile. Camadas, coordenadas e animação inalteradas; encaixe e vidro conferidos (`docs/24` §17.8).
- **Status:** implementado na Home, **aguardando aprovação final do Eduardo**; sem merge e sem deploy.

## D-078 — Project Inventory H2: aprovação final e consolidação

- **Data:** 2026-10-18
- **Aprovação do Eduardo:** o Project Inventory H2 está **aprovado e consolidado**, incluindo a proporção console × CRT (D-077, `docs/24` §17.8) nas quatro larguras. Ficam como estão a inserção, a ejeção, o teaser sob demanda, a responsividade, a acessibilidade e o tratamento de erros. Não há novos ajustes de tamanho ou composição nesta etapa.
- **Identidade do MC-001 (resolve o conflito da D-077):** a carcaça do MC-CART usada no encaixe físico do H2 (`renders.console`, fonte `design/source/mc-01/mc-001-console-scale.png`) é a **referência oficial** do cartucho na experiência interativa. Os renders anteriores (`front`, `threeQuarter`, D-065) ficam como material de referência, com os arquivos preservados. Nenhuma imagem é gerada ou substituída. **Regra:** a interface pública não mostra duas identidades do MC-001. Quando a escolha de cartuchos aparecer (2 ou mais aprovados), as miniaturas devem usar a carcaça do console, e não o `front`.
- **Tipo aprovado:** EXPERIÊNCIA NARRATIVA / NARRATIVE EXPERIENCE. Modo Campanha é o portfólio profissional; SYSTEM HORIZON é a experiência narrativa apresentada no cartucho MC-001.
- **Rótulos aprovados:** MINHA CONTRIBUIÇÃO / MY CONTRIBUTION, STACK, APRENDIZADOS / LEARNINGS e EVIDÊNCIAS / EVIDENCE. O conteúdo dos aprendizados pode passar por revisão editorial futura, o que não bloqueia esta aprovação.
- **Status:** **APPROVED / consolidado** na branch `feat/hero-refinement`; sem merge e sem deploy.

## D-079 — Hero: acabamento final (Direção B) e contrato da nova imagem

- **Data:** 2026-10-18
- **Decisão do Eduardo:** seguir a Direção B da auditoria, preservando integralmente a proposta visual. Composição, atmosfera, textos, CTAs e hierarquia ficam como estão.
- **Imagem atual:** provisória. A D-078 não ganha exceção permanente.
- **Nova arte:** produzida **externamente**, com o MC-01, o MC-CART e, de preferência, o CRT do H2 como referências oficiais. Proporção 1672 : 941, de preferência em 2×, com versões otimizadas. Nada é gerado no repositório, e os PNGs oficiais não são recompostos sobre a fotografia atual.
- **Teaser:**
  - o personagem provisório está aprovado para a primeira publicação;
  - o ícone do MC-CART pode continuar estilizado, desde que não conflite com a identidade física no tamanho real de exibição;
  - correção das scanlines autorizada só em CSS.
- **Etapa 1, ajustes técnicos (concluída, `docs/21` §8.1):**
  - **Scanlines:** faixas suaves alinhadas às 120 linhas nativas, com densidade de 120, 60, 40 ou 30 conforme a largura da tela e a densidade de pixels (≥ 3 px do dispositivo por faixa). O batimento caiu de até 0,64 para ≤ 0,05, e o escurecimento ficou uniforme.
  - **Fonte:** preload da Pixelify Sans no `index.html`, com `outputHashing: "bundles"` (fontes sem hash, nome estável; JS e CSS continuam com hash). Some o FOUT do "MODO CAMPANHA" em rede lenta. A IBM Plex Sans não precisa de preload.
  - **Pausa:** o controle é renderizado junto com o teaser, então não anuncia mais "Pausar" ~1 s antes do movimento.
  - **Sem regressões:** CLS por fonte não reproduzido (0 em 32 rodadas). Fora do CRT, zero pixel de diferença. Lighthouse inalterado.
- **Etapa 2, contrato da nova imagem (`docs/21` §8.2):**
  - referências oficiais;
  - formato 3344 × 1882;
  - composição e tolerâncias;
  - perspectiva e escala real (CRT ≈ 1,27× o console);
  - luz e materiais;
  - área escura à esquerda (x 560–900 com luminância ≤ 0,05);
  - CRT e tela (vidro de preferência em x 1157–1473 · y 151–405, nada na frente);
  - textos permitidos e proibições;
  - recortes responsivos;
  - lista exata do que precisa ser remedido se o vidro mudar;
  - derivados, inclusive 2× e mobile 1200;
  - aceite e briefing em inglês.

  Diagramas em `design/source/hero/contract/`.
- **Alternativas:**
  - Manter as 120 linhas com perfil suave, mas sem regra de densidade: rejeitado, porque abaixo de 2 px do dispositivo o padrão continua formando faixas.
  - Preload pelo nome com hash: rejeitado, porque quebraria em silêncio a cada mudança do build.
  - Preload também da IBM Plex Sans: sem ganho, porque ela já chega antes do primeiro render.
- **Custo:** as fontes perdem o cache longo por hash. É desprezível no GitHub Pages (~10 min de cache), e a guarda do deploy falha se o arquivo do preload não existir no build (D-023 marcada como parcialmente substituída).
- **REVIEWER:** aprovado com ressalvas. As ressalvas do contrato foram corrigidas em `docs/21` §8.2:
  - zona escura em x 560–800, sem conflito com o MC-01 e a janela;
  - vidro limitado a 4 : 3;
  - números revistos;
  - briefing completo.

  O resíduo leve das scanlines perto de 3 px por faixa fica registrado em §8.1. O botão de pausa ainda pode anunciar "Pausar" ~0,9 s antes do movimento em rede lenta, enquanto o chunk e a arte carregam; a correção completa exigiria um sinal de "pronto" da tela do teaser congelado.
- **Status:** etapas 1 e 2 concluídas na branch `feat/hero-refinement`. A substituição da imagem aguarda a nova arte do Eduardo. Sem merge e sem deploy.

## D-080 — Tubo transparente: telas atrás da imagem (Hero e CRT do Inventory)

- **Data:** 2026-10-18
- **Pedido do Eduardo:** usar imagens com o tubo do CRT transparente (Hero e CRT do H2) e colocar as telas digitais atrás delas, para acabar com os ajustes de recorte nos cantos e no cartucho.
- **Decisão:** a imagem fica na frente (`z-index`, sem capturar o ponteiro) e a tela digital atrás, vista pelo tubo.
  - **Hero:**
    - teaser na caixa do vidro com folga só lateral (x 1152–1477 · y 151–405), o que não mexe na escala do teaser nem no HUD;
    - sem `clip-path` e sem `--screen-radius`;
    - antes do teaser, a TV aparece desligada.
  - **`mc-crt-front`:**
    - camada digital atrás do render, cobrindo o furo inteiro;
    - sem o raio elíptico;
    - standby em vidro preto liso (refinado em D-081).
  - **Engine, roteiro e timings do teaser intactos.** Estados, transições e textos do Inventory também.
- **Assets:** os mockups do Eduardo substituem `design/source/hero/hero-background.png` (mesma foto, provisória) e `design/source/mc-01/crt-front.png` (render novo do mesmo CRT). O alfa foi normalizado: o corpo tinha 240–254. Os derivados WebP foram regerados, todos do mesmo tamanho ou menores.
- **Alternativas:**
  - Folga em todas as bordas: rejeitada, porque ampliava o teaser em 3–5% e escondia "PLAYER 01" e o último slot do HUD sob o aro.
  - Manter a tela por cima com `clip-path` e raio aproximado: era o problema a resolver.
- **Contrato da nova imagem (D-079):** o mestre já vem com o tubo transparente (`docs/21` §8.2 e §9).
- **REVIEWER:** com ressalvas e sem bloqueantes. Alfa e RGB conferidos, teaser intacto, Lighthouse e layout inalterados, a página fora das duas telas idêntica. Em aberto para o Eduardo (`docs/21` §9):
  - o canto mais curvo do tubo novo cobre ~13% do último slot do HUD no Inventory;
  - o visual do standby;
  - a TV desligada por ~1 s na Hero.
- **Status:** implementado na branch `feat/hero-refinement`, aguardando revisão visual do Eduardo. Sem merge e sem deploy.

## D-081 — CRT do Inventory: HUD do teaser dentro do tubo e reflexo do standby

- **Data:** 2026-10-18
- **Aprovação do Eduardo:** D-080 aprovada, inclusive os PNGs com o tubo transparente. Na Hero, a TV fica desligada ~1 s antes do teaser, sem imagem provisória nem mudança na transição.
- **HUD (opção escolhida pelo Eduardo):** o conteúdo do teaser recua discretamente, **só no CRT do Inventory**.
  - O recuo é de `.glass-fill { inset: 2.5% }`, o menor valor medido que deixa os quatro slots, o mini-cartucho e "PLAYER 01" 100% visíveis em 390, 820, 1024 e 1440. 2% falha; o limite fica entre 2,3% e 2,4%.
  - Proporção 4:3, escala inteira do canvas e área segura preservadas.
  - Fica uma borda preta discreta, a área útil de uma TV de tubo.
  - Engine, roteiro, sprites, timings e a Hero não mudam.
- **Standby:** vidro escuro com um reflexo estático, quente e muito discreto nas laterais altas do tubo, que sugere a curvatura.
  - Feito com dois `radial-gradient` de `--mc-material-orange` a 12% num `::before`. Sem animação e sem alterar PNGs.
  - Só aparece em `is-standby`; some quando o conteúdo digital aparece.
  - Pico de luminância de 0,017: a tela não parece acesa.
- **Alternativas** (registradas em D-080, não escolhidas): render com cantos menos curvos; aceitar o corte.
- **REVIEWER:** aprovado.
  - Cobertura do HUD 0% em todas as larguras e quadros.
  - CLS 0, foco e movimento reduzido corretos.
  - Página inteira idêntica fora do vidro do Inventory; Lighthouse inalterado.
  - Registro pré-existente, fora do escopo: com a arte indisponível, "Reproduzir teaser" não responde (`toggleTeaser` só age a partir de `art`).
- **Status:** **APPROVED / consolidado** na branch `feat/hero-refinement`; sem merge e sem deploy.

## D-082 — Player Status definitivo (mockup aprovado) e foto real

- **Data:** 2026-10-18
- **Pedido do Eduardo:** substituir o Player Status pelo mockup visual aprovado ("Painel de Status do Jogador"), com a fotografia oficial no lugar do placeholder. Fidelidade alta, sem novo concept. Tudo em HTML/Angular/SCSS, com textos acessíveis. Escopo restrito ao Player Status.
- **Implementação:** um painel único.
  - **Cabeçalho:** emblema pixel, PLAYER STATUS, PERFIL DO JOGADOR // DADOS DA CAMPANHA ATUAL e a barra de sistema MC-01 | MODO CAMPANHA | ● ONLINE.
  - **Quatro áreas:** Player Card com a foto real; dados do jogador; Sobre a jornada; Estado atual com a frase final.
  - **Grade responsiva:**
    - ≥ 1200 px: proporção do mockup, 461 / 519 / 597 / 435;
    - 768–1199 px: 2 × 2 (card + dados, jornada + estado);
    - < 768 px: empilhado, na ordem pedida.
  - **Conteúdo:** em `PlayerProfile` (`journey`, `tagline`, `currentState`, `quote`, `photo`, `status.xp.short`); rótulos no dicionário (`ui.playerStatus`).
  - **Ícones pixel:** 9 ícones novos no `mc-icon` (estilo `pixel`, grade de 12, sempre a 24 px).
  - **Montanhas em pixel:** geradas em `player-status.art.ts` e agrupadas em poucos `<path>`.
  - **Removido:** o `status.state` (ATIVO), que saiu do card.
- **Foto:**
  - **Fonte intacta:** `design/source/player/eduardo-arine.png` (1254 × 1254, 1,96 MB), sem regeneração nem filtro.
  - **Derivados WebP:** `public/assets/player/eduardo-arine-{400,640,960,1254}.webp` = 18 / 35 / 64 / 101 KB. O de 1254 evita ampliação em DPR 3.
  - **Exibição:** `sizes` igual à largura real exibida (1440: 236 px → 400 em 1×, 640 em 2×; 390 @ 3× → 960); `loading="lazy"`, largura e altura declaradas.
  - **Recorte:** só `object-fit` (boné inteiro, posição 50% 12%).
- **Adaptações ao design system (mínimas, registradas):**
  1. **"LV 99" → selo "XP 10+":** LV é proibido (D-017, D-031) e o projeto não tem regra de progressão. O selo mantém a forma e a posição do mockup e mostra o XP real, em forma curta e decorativo (`aria-hidden`), porque o dado já aparece em texto.
  2. **Barra segmentada:** metáfora visual, sem valor (13 segmentos, 11 acesos, `aria-hidden`), como pedido.
  3. **Pixelify Sans só no nome "EDUARDO ARINE" e no valor do selo ("10+"):** o novo papel `display-player` foi validado no tamanho real (tracking 0,02em, para o nome caber numa linha a partir de 1200 px). O "C" e o "c" da Pixelify leem como "O" e "o" em "CURRENT CAMPAIGN", "FOCUS", "CONSTRUINDO" e "Tecnologia" (D-029). Títulos, rótulos, lema e frase ficam em IBM Plex Sans; PLAYER STATUS segue o `section-title`, como as outras seções. Os rótulos monoespaçados do mockup viraram o estilo `system` (sem terceira família).
  4. **ONLINE na barra de sistema:** o card não tem mais a linha STATUS, então o status aparece uma única vez, como estado do sistema MC-01, e não como status profissional. Isso substitui o posicionamento da D-039 neste layout.
  5. **Versão omitida:** o `package.json` está em 0.0.0, sem release; nenhuma versão foi inventada (o mockup tinha "v1.0.0").
  6. **Alien do mockup → glifo de sistema (quatro quadrados) em pixel**, porque alien e space invader são proibidos.
  7. **Player Card sem cantos de mira:** o mockup não tem cantos de mira. A moldura laranja fina (`--mc-border-accent`) e a placa com o nome substituem o desenho anterior.
  8. **Cantos retos:** pela escala de raios, painéis e Player Card usam 0; 4 px só na barra de sistema, que funciona como chip. O mockup tem cantos arredondados.
  9. **Caixas internas:** são exceção deliberada ao princípio "espaço e linhas antes de caixas", porque são a estrutura do mockup aprovado.
  10. **Cores:** só tokens existentes. Verde `--mc-status-online` e turquesa `--mc-cool`, mais sóbrios que o verde e o ciano saturados do mockup. Bordas internas em `--mc-border-subtle`.
  11. **Altura:** o painel tem 1200 × 470 em 1440 (2,55 : 1, contra ~3 : 1 no mockup). Os textos têm o mesmo tamanho medido no mockup (~14 px). Só os valores de "Estado atual" são menores no mockup (~12,5 px). Aqui ficam em 14 px, e "Como profissional e pessoa" quebra em duas linhas, o que define a altura da linha da grade. O card com a foto 10 : 9 limita o mínimo a ~434 px.
  12. **Rótulos em pt:** ORIGEM / CAMPANHA ATUAL / FOCO, os já aprovados. O mockup mostrava os termos em inglês; no en são ORIGIN / CURRENT CAMPAIGN / FOCUS.
- **Conteúdo:** "Sobre a jornada", o lema, os estados e a frase são os textos aprovados pelo Eduardo. **As traduções en desses textos novos foram aprovadas pelo Eduardo (D-083):** "…and meaningful experiences", "Impactful solutions", "Every day", "Professionally and personally", "SAME ESSENCE, NEW LEVELS.", "Technology for real people." Grafia pública "Comunidade ON".
- **REVIEWER (com ressalvas, corrigidas):**
  - quebras de "PLAYER 01" e do nome entre 1200 e 1289 px (placa `auto minmax(0, 1fr)`, `nowrap`);
  - altura (espaçamentos de "Estado atual");
  - ícones `xp`, `target`, `book` e `flag` redesenhados; emblema ampliado 1,5×, ainda nítido na grade de 12;
  - montanhas mais agudas, rente ao canto; cápsula laranja;
  - lema com `text-wrap: pretty`; pontos ao lado do título só quando cabem (consulta de container).

  Aprovados pela revisão: foto (original idêntico byte a byte), conteúdo, acessibilidade, desempenho e escopo (outras seções idênticas pixel a pixel).
- **Validação:**
  - **Testes e builds:** 174 testes; tsc; builds de produção, GitHub Pages e dev; Prettier.
  - **axe (WCAG 2.2 AA):** 0 violações em 4 larguras, pt e en. O contraste vem dos pares do contrato, verificados no build.
  - **Layout:** sem rolagem horizontal; CLS 0.
  - **Lighthouse local, HTTP/1.1 sem compressão:** mobile 82 → 79 (+14 KB de JS sem compressão); desktop 99.
  - **Lighthouse em HTTP/2 + gzip (como o GitHub Pages):** mobile 97–98 → 98, desktop 100 → 100 (FCP e LCP iguais).
- **Status:** **APPROVED / FROZEN** (D-083). Sem merge e sem deploy.

## D-083 — Player Status: aprovação final

- **Data:** 2026-10-18
- **Aprovação do Eduardo:** o **Player Status** está aprovado oficialmente, conforme a implementação atual e a D-082. Isso inclui o resultado visual, a fotografia, a responsividade, os textos e as traduções en.
- **Congelado:** `features/player-status/`, `mc-player-card`, os ícones pixel do `mc-icon`, o papel `display-player`, a foto e os derivados em `public/assets/player/`, e o conteúdo do Player Status em `profile.data.ts` e nos dicionários. Sem novos ajustes visuais; alterar só para corrigir regressão objetiva, relatada.
- **Status:** **APPROVED / FROZEN** na branch `feat/hero-refinement`; sem merge e sem deploy.

## D-084 — Versão pt-BR sem termos em inglês; pacote técnico de pré-lançamento

- **Data:** 2026-10-18
- **Pedido do Eduardo:** com as duas versões disponíveis, a versão em português não mistura termos em inglês (Campaign Log, Player Status etc.). Os termos propostos foram aprovados ("pode seguir assim").
- **Revê a D-018 nesse ponto:** rótulos de sistema deixam de ficar em inglês nos dois idiomas. Em pt ficam em português; a versão en não muda.
- **Revê a D-083 nesse ponto, com aprovação do Eduardo:** os textos do Player Status congelados no dicionário mudam em pt ("STATUS DO JOGADOR", "JOGADOR 01"). O visual continua congelado.
- **Mantidos (nomes próprios e identidade):**
  - MODO CAMPANHA, MC-01, MC-CART, MC-001, SYSTEM HORIZON (nome do jogo) e Comunidade ON;
  - nomes de tecnologia;
  - termos correntes em português: XP, ONLINE e STATUS;
  - GitHub e LinkedIn, além de "teaser", "Game Design", "slot" (SLOT VAZIO) e "games" (DNA DE GAMES), correntes no Brasil e na voz do Eduardo;
  - os nomes das habilidades do Arsenal, conteúdo aprovado (D-041): "Design systems", "workflows", "prompts", "REST APIs", "UX/UI".
- **Traduzidos (pt-BR):**
  - **Seções:**
    - STATUS DO JOGADOR;
    - ARSENAL DE HABILIDADES (grupos: CONSTRUÇÃO, PRODUTO, IA, DNA DE GAMES; códigos: CON, PRD, IA, DNA);
    - INVENTÁRIO DE PROJETOS;
    - DIÁRIO DE CAMPANHA;
    - A CAMPANHA CONTINUA...;
    - as seções ocultas, para quando entrarem: CONQUISTAS, MISSÃO PRINCIPAL ATUAL, MISSÕES SECUNDÁRIAS.
  - **Rótulos:**
    - JOGADOR 01;
    - CAPÍTULO 00 — ORIGEM;
    - MARCO / MARCO CONCLUÍDO;
    - MISSÃO ATUAL — EM ANDAMENTO;
    - INSIRA UM CARTUCHO / CARREGANDO CARTUCHO...;
    - PRONTO;
    - TECNOLOGIAS;
    - PROGRESSO SALVO;
    - ATIVO / EM ANDAMENTO;
    - ARTE DO PROJETO.
  - **Codinomes do Capítulo 00 (agora `Localized`):** PRIMEIRO CONTATO, OS ANOS DE LOCADORA, O PEDIDO À JOANINHA, CONQUISTADO, NÃO DADO, FEITO DE MEMÓRIAS. Os nomes próprios do Capítulo 02 são iguais nos dois idiomas.
- **Teaser SYSTEM HORIZON (revê a D-068 nesse ponto):** os textos da tela também ficam em português: JOGADOR 01, CONSTRUÇÃO / PRODUTO / IA / DNA DE GAMES, CAMPANHA LIBERADA, A CAMPANHA CONTINUA... "CAMPANHA LIBERADA" substitui a proposta aprovada "CAMPANHA DESBLOQUEADA": a etiqueta encostava nas bordas do CRT no celular (1,9 a 3,2 px de folga). Só os textos do dicionário mudam; engine, roteiro, timings e arte, não.
  - **Medição:** nenhuma legenda passa da área visível em 1440, 1024, 820, 390 e 360 px, na Hero e no CRT do Inventory.
- **Pacote técnico de pré-lançamento (sem decisão pendente):**
  - **Menu:** com Jornada → Diário de Campanha, na ordem da página. Cabe numa linha em 320 px.
  - **Nome acessível da marca:** "MC Modo Campanha, voltar ao topo", que contém o texto visível (WCAG 2.5.3). Há um espaço entre os spans "MC" e "MODO CAMPANHA" (sem efeito visual), sem o qual o texto lido ficava "MCMODO CAMPANHA".
  - **`scripts/pages-postbuild.mjs` no workflow, com a URL real do `configure-pages`:**
    - `404.html`;
    - `en/index.html` e `en.html` com idioma, título, descrição e Open Graph em inglês. O `en.html` faz `/en` responder sem o redirecionamento 301 para `/en/`; confirmar no primeiro deploy;
    - canonical, hreflang e `og:url` estáticos;
    - `sitemap.xml`.

    O `LocaleService` reaproveita as tags, sem duplicar.
  - **Docs:** sem referências a capturas locais.
- **Pendentes de decisão do Eduardo (plano de pré-lançamento):** foto da Hero (D-079), ícone da aba e imagem de compartilhamento, aprovação de pickups e HUD do teaser.
- **Atualização (2026-10-19):** ícone da aba e imagem de compartilhamento resolvidos (D-085). **Teaser SYSTEM HORIZON aprovado pelo Eduardo** como está: cenário, personagem provisório, pickups, HUD e MC-CART em pixel art (D-068, `docs/22` §13–§14). Resta a foto da Hero (D-079).
- **Status:** implementado na branch `feat/hero-refinement`. Sem merge e sem deploy.

## D-085 — Símbolo da marca: glifo de quatro quadrados na placa do MC-CART

- **Data:** 2026-10-19
- **Contexto:** pré-lançamento (D-084): faltavam o ícone da aba e a imagem de compartilhamento, que dependiam do monograma MC (D-015), nunca desenhado. Foram estudadas três direções de monograma em letras (A — Pixel Mark, B — Haste compartilhada, C — Trilha da campanha). O Eduardo preferiu a linha do glifo de quatro quadrados do hardware; foram estudadas três variações (G1 — glifo do MC-01, G2 — glifo + jogador, G3 — glifo no cartucho).
- **Decisão do Eduardo:** **G3 é o símbolo da marca Modo Campanha.** Placa ink com o topo escalonado do MC-CART e o glifo de quatro quadrados laranja (2 × 2, quadrados arredondados), na grade 16 × 16.
  - **Revê a D-065 nesse ponto:** o glifo de quatro quadrados, sozinho, continua sendo o *system / hardware glyph* dos objetos (MC-01, MC-CART, CRT, controle) e da barra de sistema do Status do Jogador. **Dentro da placa do MC-CART (G3), ele é o símbolo da marca.**
  - **Revê a D-015 nesse ponto:** o monograma MC em letras não será desenhado; o símbolo da marca é o G3. MC-01 segue como linguagem de sistema e o nome da marca segue MODO CAMPANHA.
  - **Header:** o símbolo substitui a placa provisória "MC" (32 × 32, mesmo tamanho; altura do header inalterada). Cores por token (`--mc-bg` na placa, `--mc-accent` no glifo); SVG decorativo (`aria-hidden`). O nome acessível da marca passa a ser "Modo Campanha, voltar ao topo" / "Modo Campanha, back to top", que contém o texto visível (WCAG 2.5.3); a chave `ui.brand.monogram` saiu dos dicionários.
  - **Ícones:** `public/favicon.svg`, `public/favicon.ico` (16, 32 e 48 px) e `public/apple-touch-icon.png` (180 px, fundo ink-900 opaco e 10% de margem, porque o iOS não respeita transparência), declarados no `index.html`.
  - **Fonte editável:** `design/source/brand/build-symbol.mjs` (geometria única → SVG mestre `mc-symbol.svg`, PNG mestre `mc-symbol-512.png` e os ícones; sem dependências). Para regerar: `node design/source/brand/build-symbol.mjs`.
- **Leitura registrada no estudo:** em tamanho grande, o recorte do topo pode lembrar orelhas; abaixo de 32 px o recorte quase some e o símbolo lê como o glifo. Aceito pelo Eduardo.
- **Imagem de compartilhamento (aprovada pelo Eduardo, "aprova assim"):** `og:image` 1200 × 630 em pt e en (`public/og-image-pt-BR.png`, `public/og-image-en.png`, ~290 KB cada). À esquerda: símbolo G3, eyebrow da Hero (PORTFÓLIO PROFISSIONAL / PROFESSIONAL PORTFOLIO), MODO CAMPANHA em Pixelify (uso validado), Eduardo Arine, cargo e lema com o marcador ■; à direita, o MC-001 na carcaça oficial (D-078) com sombra de objeto; faixa laranja na base. Só textos já aprovados (dicionário e `PLAYER_PROFILE`).
  - **Fonte editável:** `design/source/brand/og/og-image.html` (template, `?lang=pt-BR|en`) e `render-og.mjs` (Chrome headless via DevTools Protocol, sem dependências; variável `CHROME` se o caminho for outro). Para regerar: `node design/source/brand/og/render-og.mjs`. Ao mudar eyebrow, cargo ou lema, regerar.
  - **Tags:** `og:image:type/width/height/alt` e `twitter:card=summary_large_image` estáticos no `index.html`; a URL absoluta do `og:image` entra no `scripts/pages-postbuild.mjs` (que conhece o domínio), por idioma, e o alt en vem do dicionário (`ui.meta.imageAlt`); o `LocaleService` atualiza `og:image` e `og:image:alt` em runtime, sem duplicar.
- **Status:** implementado na branch `feat/hero-refinement`. Sem merge e sem deploy.

## D-086 — Hero: arte final com as peças oficiais (substitui a imagem provisória)

- **Data:** 2026-10-19
- **Contexto:** a imagem da Hero era provisória (D-079): mostrava versões antigas do CRT, do MC-01 e do MC-CART, diferentes das oficiais do Project Inventory (D-077, D-078). O Eduardo gerou a nova arte externamente (ChatGPT) com o briefing do `docs/21` §8.2 N.
- **Rodadas:**
  - **v1:** reprovada em F (velas e fita de LED na estante atrás do texto) e I (placa do console "ɴcoo CAMPANHA", POWER embaralhado, "MC-001" ausente no cartucho).
  - **v2:** correções por edição (estante sem luzes, placa "MC-01 —— MODO CAMPANHA", POWER/RESET, "MC-001"). **Aprovada pelo Eduardo como está.**
- **Aceite (§M):**
  - Formato 3344 × 1882 RGBA, tubo transparente; alfa normalizado (143 pixels 240–254 → 255).
  - Identidade comparada a 200% com as referências: console, cartucho e controle conferem. **Aceitos pelo Eduardo:** o CRT sem o aro laranja do `crt-front` (o resto do modelo confere) e legendas minúsculas do CRT levemente irregulares (ilegíveis no tamanho real).
  - **Vidro remedido (§K):** furo x 1164–1503 · y 150,5–408,5 (1×), proporção 1,314 : 1 (dentro de 1,24–4 : 3); caixa x 1159,5–1507,5 · y 150,5–408,5 (folga lateral 4,5 px). `HERO_CRT_GLASS` = [0,01; 0,038] · [1; 0] · [0,993; 1] · [0; 0,976]; `.crt` top 15,99% / height 27,42%; `--sx/--sw` 69,35% / 20,81% (≥ 768) e 56,48% / 36,98% (mobile, recorte x 628–1569 mantido). Teaser alinhado em 1440 / 1024 / 820 / 390, sem faixa da foto nas bordas.
  - **Contraste real do texto** (208 linhas, 1200–2560 px, pt e en, pior caso por linha): falhas abaixo de 4,5 : 1 caíram de **11** (imagem antiga) para **3**. "MODO CAMPANHA" passou a passar em todas as larguras (antes 3,8 : 1 de 1200 a 1240). Restam só a 1ª linha do resumo em inglês em 1200–1210 px (2,8–4,2 : 1, encostando na borda iluminada do console), problema pré-existente; o Eduardo optou por não ajustar o layout.
  - **Peso e LCP** (rede ~Slow 4G, mediana de 3, build de produção): desktop 1440 LCP 3132 → **2952 ms**, mobile 390 igual (3356 ms); imagem 1× 128 → 119 KB (desktop) e 40 → 39 KB (mobile). O LCP é o texto da Hero. Layout e proporções inalterados.
- **Derivados (§L):** `background-{640,960,1280,1672,2560,3344}.webp` (31 / 58 / 81 / 119 / 194 / 267 KB) e `background-mobile-{480,800,1200}.webp` (39 / 71 / 121 KB), gerados por `design/source/hero/build-background.mjs` (Chrome headless, WebP com alfa, qualidade 0,82). Para regerar: `node design/source/hero/build-background.mjs`. `HERO_BACKGROUND` passa a listar os 2× e o mobile 1200.
- **Mestre:** `design/source/hero/hero-background.png` (3344 × 1882); o anterior foi para `hero-background-v1.png`.
- **Status:** **Hero com a arte final, aprovada pelo Eduardo.** A imagem deixa de ser provisória; o contrato do `docs/21` §8.2 vale para trocas futuras. Sem merge e sem deploy.

## D-087 — Project Inventory: biblioteca MC-CART com seis cartuchos (evolução do H2)

- **Data:** 2026-10-19
- **Contexto:** antes do lançamento, o Eduardo fez os seis cartuchos oficiais da coleção (MC-001 SYSTEM HORIZON, MC-002 AEDES REVENGE, MC-003 SCOUTEVO, MC-004 EOS, MC-005 AXIA, MC-006 COMUNIDADE ON) e pediu a biblioteca MC-CART como evolução do H2 (D-077, D-078), com o princípio ESCOLHER → INSERIR → EXPLORAR → TROCAR. Detalhes em `docs/24` §18.
- **Decisões de implementação (aguardando aprovação visual e funcional do Eduardo):**
  - **H2 reaproveitado:** a mesma estação MC-01 + CRT, com as mesmas camadas, geometria, poses, tempos (620 / 450 / 600 ms), CRT frontal (D-080, D-081), fallback e teaser do MC-001. A biblioteca entra **acima** da estação, como componente próprio (`cartridge-library`, orçamento de CSS).
  - **Selecionado ≠ inserido.** Primeira visita: MC-001 selecionado, slot vazio, CRT desligado. Com o slot vazio, escolher só seleciona (o editorial muda; o cartucho espera sobre o slot). Com um cartucho inserido, **uma escolha explícita faz a troca toda**: ejetar → inserir → carregar → PRONTO (`ejecting{then: 'insert'}` na máquina de estados; com movimento reduzido, direto ao PRONTO). Escolhas ficam bloqueadas durante as transições (`aria-disabled`, sem prender o foco). Sem troca por hover, Tab ou setas; a ejeção manual continua.
  - **Foco e anúncios:** a troca pela biblioteca não leva o foco nem rola até o CRT; anuncia "Trocando para MC-00X — Título." e "MC-00X — Título pronto." O "Inserir cartucho" mantém o comportamento do H2 (rola até o CRT e foca o estado).
  - **Carcaça do MC-001:** a coleção usa a arte nova do Eduardo também no MC-001 (alça superior laranja, como os outros cinco), para a coleção ter uma identidade só. **Revê a D-078 nesse ponto:** a carcaça oficial do MC-001 na experiência interativa passa a ser `design/source/mc-cart/collection/mc-001-system-horizon.png`; a anterior (`design/source/mc-01/mc-001-console-scale.png`) fica preservada como referência. A Hero (D-086) e a imagem de compartilhamento (D-085) ainda mostram a carcaça anterior: harmonização pendente de decisão do Eduardo.
  - **Arte no CRT:** MC-001 mantém a arte SYSTEM HORIZON 4:3 e o teaser. MC-002 a MC-006 mostram a **ilustração do rótulo** (≈ 2 : 1, recortada do cartucho, sem a carcaça), inteira no vidro 4:3 (`fit: 'contain'`, faixas escuras), sem botão de reproduzir.
  - **Assets:** originais preservados em `design/source/mc-cart/collection/` (1483 × 1061 RGBA, mesma proporção do slot 699 × 500). `build-collection.mjs` normaliza o alfa do corpo, aplica **uma escala uniforme por cartucho** (sem deformar nem redimensionar partes) e gera `console-scale-{360,540,699,1398}.webp` e `label-art-{640,952}.webp`. Todos usam o mesmo slot do MC-01. Para regerar: `node design/source/mc-cart/build-collection.mjs`.
  - **Modelo (extensão mínima):** `Project.challenge`, `Project.highlights`, `Project.ongoing`; `ProjectLink.kind` com os tipos do Campaign Log (`press`, `paper`, `academic`, `launch`, `record`) e `ProjectLink.note`; `artwork.fit`. Um MC-007 entra com dados + assets.
  - **Cases:** problema → contribuição → tecnologias → marcos → aprendizados → evidências, condensados do Campaign Log aprovado (D-070–D-074); as evidências são as mesmas referências, importadas de `campaign-log.chapters.data.ts`. O artigo do EOS aparece com a nota de autoria (não é obra do Eduardo). Comunidade ON: só fatos já públicos no Campaign Log, `EM ANDAMENTO`, sem link.
  - **Serial do Paco:** o MC-002 passa a ser AEDES REVENGE (cartucho oficial do Eduardo). O Paco (`review`, `docs/14` §2) recebe um novo serial quando for aprovado.
- **Status:** implementado na branch `feat/hero-refinement`, **aguardando aprovação visual e funcional do Eduardo**. Sem merge e sem deploy.

## D-088 — Biblioteca MC-CART: aprovação e congelamento

- **Data:** 2026-10-19
- **Aprovação do Eduardo:** a biblioteca MC-CART (D-087, `docs/24` §18) está **APROVADA visualmente e funcionalmente**: os seis cartuchos, a biblioteca horizontal, a proporção console × CRT, a troca automática e os cases profissionais. Sem novo redesign.
- **Decisões editoriais:**
  - **Carcaça do MC-001:** a nova carcaça é a **identidade oficial da coleção** (confirma a revisão da D-078 feita na D-087).
  - **Hero e `og:image`:** a harmonização com a nova carcaça fica como **pendência anterior à publicação**, sem modificá-las agora.
  - **Tipos impressos:** aprovados para os cinco projetos (JOGO 2D PARA CELULAR, PLATAFORMA DE TALENTOS NO FUTEBOL, LOGÍSTICA DE TRANSPLANTES, INTELIGÊNCIA OPERACIONAL, PLATAFORMA DE ATENDIMENTO).
  - **Comunidade ON:** apresentação pública em nível profissional e geral, sem informações internas, sem dados confidenciais e sem links inventados.
  - **Cases e aprendizados:** aprovados nesta versão.
  - **Evidências do EOS:** permanecem, desde que não atribuam ao Eduardo a autoria dos artigos acadêmicos (a nota de autoria do artigo garante isso).
  - **Nomes e termos:** preservar o nome documentado "Mostra de Jogos 2017". "facilities" e "webapp" ficam na versão pt.
  - **Paco:** ainda não recebe código MC-CART.
  - **Traduções antigas do Campaign Log:** a revisão segue como pendência separada.
- **Verificação final:**
  - **Âncora "Projetos":** testada na navegação real; o título fica abaixo do cabeçalho (80 px em 390, 82 px em 820, 112 px em 1440). O corte visto na captura mobile era da ferramenta de captura, não da página; nenhuma mudança foi necessária.
  - **Case na troca:** o case do cartucho anterior reserva o espaço, invisível e inerte (`aria-hidden`, `inert`), até o novo PRONTO. Nenhum dado do novo projeto aparece antes de ele estar carregado no console.
  - **Selo CARREGANDO:** o cartucho mostra CARREGANDO na biblioteca enquanto entra e carrega; INSERIDO só no PRONTO. O nome acessível segue a mesma regra ("MC-004 — EOS, carregando").
  - **Assets:** nenhuma imagem nova; os atuais passam nos critérios de desempenho.
- **Status:** **APPROVED / FROZEN** na branch `feat/hero-refinement`. Não alterar sem regressão objetiva. Sem merge e sem deploy.
- **Atualização (2026-10-19): `og:image` harmonizada, aprovada pelo Eduardo.**
  - **O que mudou:** o template (`design/source/brand/og/og-image.html`) passa a usar a carcaça oficial da coleção, `public/assets/cartridges/mc-001/console-scale-1398.webp`, a mesma fonte do encaixe no MC-01.
  - **Composição:** posição, tamanho, sombra e textos ficam como na D-085; a única diferença visível é a alça laranja.
  - **Arquivos:** `public/og-image-{pt-BR,en}.png` regerados (cerca de 244 / 242 KB, antes ~290 KB).
  - **Prévias:** o `render-og.mjs` aceita `OG_OUT` para gravar fora do `public/`.
  - **Pendência restante antes da publicação:** a Hero.

## D-089 — Hero: nova arte para a harmonização com o MC-001 da coleção

- **Data:** 2026-10-19
- **Contexto:** pendência anterior à publicação (D-088): a Hero (D-086) ainda mostrava a carcaça anterior do MC-001. O Eduardo gerou a nova arte externamente, a partir de um briefing com a carcaça da coleção (`design/source/mc-cart/collection/mc-001-system-horizon.png`), e a aprovou como está ("não quero mais mexer com ela").
- **Revisão antes da integração:** as diferenças em relação ao contrato (`docs/21` §8.2) foram apresentadas ao Eduardo, que as aceitou:
  - **Cartucho:** etiqueta próxima à da coleção ("— SYSTEM —" com filetes), mas as pegas laterais continuam frisadas (na coleção são lisas). O "MC-001" virou pseudotexto, e o "MODO CAMPANHA" do rótulo saiu irregular (ilegíveis no tamanho real; §8.2 H e I).
  - **Estante atrás do texto:** velas e fitas de LED acesas (§8.2 F; motivo da reprovação da v1 na D-086).
  - **Console e CRT:** a placa "MC-01 — MODO CAMPANHA" e os rótulos dos botões do CRT ficaram menos legíveis; saiu o glifo do canto do CRT.
  - **Mesa:** uma caixa com rótulo laranja à esquerda do console; o cabo do controle não aparece.
- **Aceite (§M):**
  - **Formato:** 3344 × 1882 RGBA, tubo transparente, nenhum pixel não opaco fora do tubo. Alfa normalizado como na D-086: 5.768 pixels de 240–254 → 255.
  - **Vidro remedido (§K):** furo x 1157–1475,5 · y 149,5–405 (1×), proporção 1,247 : 1 (dentro de 1,24–4 : 3; cortam-se ~6 px de cada lado do teaser, dentro da área segura). Caixa x 1152,5–1480 · y 149,5–405 (folga lateral 4,5 px).
    - `HERO_CRT_GLASS` = [0,004; 0,042] · [1; 0] · [0,998; 1] · [0; 0,971].
    - `.crt`: top 15,89%, height 27,15%.
    - `--sx` / `--sw`: 68,93% / 19,59% (≥ 768) e 55,74% / 34,8% (mobile; recorte x 628–1569 mantido).
    - Na arte anterior, a mesma fórmula reproduz a caixa, `top` / `height` e `--sx` / `--sw` da D-086; no quadrilátero, a diferença é ≤ 0,001 (~0,3 px).
  - **Teaser atrás do tubo** (palco magenta, 1440 / 1200 / 1024 / 820 / 390 / 360): nenhuma fresta nas laterais. Em cima e embaixo, onde o tubo é abaulado, sobram até 3 px CSS de vidro escuro (antes, até 4 px).
  - **Recortes (§J):** console, cartucho, CRT e controle inteiros em 1024, 820 e 390.
  - **Contraste real do texto** (272 linhas, 1200–2560 px, pt e en, pior pixel sob cada linha; mesmo script nas duas artes):
    - de 2 para **10** linhas abaixo de 4,5 : 1;
    - o resumo em inglês a 1200 px passou a atender (antes 4,25 : 1);
    - **regressão:** o título "MODO CAMPANHA" cai por causa das velas e do LED da estante. Pela caixa da linha (método conservador), fica entre 3,69 e 4,40 : 1 de 1200 a 1239 px e em 2560 px. Sob os glifos, só 1200–~1219 px (mínimo 3,69 : 1) e 2560 px (4,49 : 1) ficam abaixo de 4,5 : 1.
    - É texto grande (Pixelify Sans 700, 96 px): continua acima de 3 : 1 (WCAG AA), mas abaixo do critério M4 do contrato (4,5 : 1). **Exceção aceita pelo Eduardo** (2026-10-19): a Hero fica como está, sem ajuste de máscara.
  - **Peso e LCP** (rede ~Slow 4G, CPU 4×, mediana de 3, build de produção): o LCP continua sendo o texto da Hero (1440: 3320 → 3324 ms; 390: 3336 → 3364 ms, dentro da variação). A imagem 1× passa de 119 para 125 KB (desktop) e de 39 para 41 KB (mobile).
- **Derivados (§L):** `background-{640,960,1280,1672,2560,3344}.webp` (32 / 61 / 84 / 125 / 204 / 285 KB) e `background-mobile-{480,800,1200}.webp` (41 / 76 / 129 KB), por `node design/source/hero/build-background.mjs`.
- **Mestre:** `design/source/hero/hero-background.png` (regravado sem perdas, pixels idênticos à arte recebida após a normalização do alfa); a arte da D-086 foi para `hero-background-v2.png`.
- **Contrato (`docs/21` §8.2):** a referência do cartucho passa a ser a carcaça da coleção.
- **Revisão independente:** aprovada com ressalvas, sem bloqueantes; medidas, alfa, recortes, peso e LCP conferidos; ressalvas de documentação corrigidas.
- **Status:** **Hero com a nova arte, aprovada pelo Eduardo.** Harmonização anterior à publicação concluída (a `og:image` já estava harmonizada, D-088). **Hero APPROVED / FROZEN:** arte, máscara, layout e encaixe do teaser não mudam sem regressão objetiva. Sem merge e sem deploy.

## D-090 — Publicação no GitHub Pages

- **Data:** 2026-10-20
- **Autorização:** o Eduardo autorizou seguir até a publicação, inclusive a ativação do Pages pela API.
- **Passos:**
  - verificação local idêntica ao workflow (build do Pages, guardas de rota dev, MOCK e preload, pós-build): tudo passou;
  - `main` avançada por fast-forward até `feat/hero-refinement` (`c8df706`), sem conflitos;
  - a 1ª execução do `deploy-pages.yml` falhou no `configure-pages`: o Pages não estava ativado no repositório (404). Ativado com origem **GitHub Actions** (HTTPS obrigatório);
  - a 2ª execução publicou com sucesso.
- **Endereço:** https://eduardoarine.github.io/modo-campanha/ (pt-BR) e https://eduardoarine.github.io/modo-campanha/en (en).
- **Verificação no ar:**
  - `/` e `/en` respondem 200 (sem redirecionamento para `/en/`); rota desconhecida responde 404 com o fallback da SPA;
  - `/en` com `lang="en"`, `og:locale` en_US, canonical, hreflang e `og:image` absolutos; `sitemap.xml` com as duas versões;
  - imagens da Hero, fonte Pixelify e `og:image` servidas;
  - no Chrome (1440 pt/en e 390 pt): as seis seções de produção, menu com quatro destinos, teaser rodando, âncora "Projetos" abaixo do cabeçalho, sem erros de console ou de rede.
- **Pendências pós-publicação:** Safari e Firefox reais, links do LinkedIn e da ScienceDirect, LinkedIn Post Inspector, envio do `sitemap.xml` no Search Console.
- **Status:** **publicado.** O deploy continua manual: novos deploys só com autorização do Eduardo.

## D-091 — Diário de Campanha: mapa por capítulos (híbrido A + C)

- **Data:** 2026-10-20
- **Pedido do Eduardo:** substituir a timeline vertical do Diário de Campanha (Campaign Log, D-048 / D-050 / D-074) por uma experiência explorável por capítulos, a partir de uma prancha visual híbrida A + C aprovada por ele:
  - **A — World Map Editorial:** o mapa do capítulo ativo, com a rota e os marcos;
  - **C — capítulos com mini overworld:** os capítulos como unidades navegáveis.
  - **Revê a D-050:** a timeline vertical congelada deixa de ser a apresentação do Diário. **O conteúdo (D-074) não muda.**
- **Implementação (branch `feat/campaign-diary`, aguardando aprovação visual e funcional):**
  - **Estrutura:**
    - cabeçalho padrão das seções + texto de abertura;
    - seletor de capítulos (faixa horizontal);
    - capítulo ativo: mapa 16:9 (~70%) + painel de leitura (~30%) a partir de 1200 px; abaixo disso, mapa na largura toda e painel embaixo;
    - prévias dos outros capítulos;
    - no mobile, mini mapa + lista de marcos + painel.
  - **Estado único** na seção (capítulo e marco escolhidos); mapa, painel, lista e seletor só refletem esse estado.
  - **Mapa:**
    - três camadas no mesmo sistema de coordenadas (% da moldura 16:9): cenário (imagem decorativa, sem rota nem nós desenhados), rota em SVG (traço que não escala; laranja até o marco escolhido) e marcos (botões com número e título);
    - posições em `CampaignLogChapterEntry.map {x, y, label}`, provisórias até as artes; as do Cap. 00 são as do briefing;
    - zoom e pan ficam como melhoria opcional.
  - **Painel:**
    - número do marco + época real, título, imagem editorial 3:2 (2:1 ao lado do mapa), resumo;
    - "Ler a história completa" (texto, fotos reais e fontes);
    - no último marco, o fechamento do capítulo (MARCO CONCLUÍDO / MISSÃO ATUAL);
    - anterior / próximo / próximo capítulo.
  - **Sem dados sem base:** a ficha da prancha (Status "Concluído"), os cadeados, os capítulos ilustrativos ("Novas histórias", "Em expansão") e a barra "2/5 marcos" não foram implementados, porque não têm base nos dados. Capítulo sem marcos aparece como EM CONSTRUÇÃO (hoje nenhum).
  - **Assets:**
    - `CampaignLogChapter.map` (16:9) e `CampaignLogChapterEntry.image` (3:2): campo ausente = placeholder discreto com a proporção. O cenário do capítulo também é a prévia dos cards (recorte por CSS).
    - Nomes reservados: `assets/diary/maps/ch00-origem.webp`, `ch01-controle-codigo.webp` e `assets/diary/stories/ch00-01-primeiro-contato.webp` … `ch00-05-colecao-historias.webp`.
  - **Texto novo:** a abertura (`CAMPAIGN_LOG_INTRO`) usa o texto da prancha; a tradução en está pendente de revisão.
- **Revisão independente:** aprovável com correções. Todas as correções objetivas foram feitas:
  - codinomes dos marcos de volta no painel ("MARCO 01 de 05 · PRIMEIRO CONTATO", com a época acima), como na timeline;
  - um único botão "Próximo marco" / "Próximo capítulo", para o foco não se perder;
  - fotos limitadas a 24rem e textos a 62ch no painel largo (768–1199);
  - cabeçalho do capítulo sobre o mapa só a partir de 1200 (abaixo disso, acima do mapa) e sem interceptar cliques;
  - o resumo continua visível quando é texto próprio (D-073);
  - a história fechada pode ser achada pela busca do navegador (`hidden="until-found"`);
  - nome acessível dos capítulos começando pelo texto visível;
  - cards de mesma altura; anel do nó selecionado sem sombra.
- **Artes (2026-10-20), fornecidas pelo Eduardo:**
  - **Recebido:** cenários dos capítulos 00 (natureza, vila e rio até a cidade ao pôr do sol) e 01 (cidade iluminada, ponte e rio), em 1672 × 941; imagens editoriais dos cinco marcos do Cap. 00, em 1536 × 1024.
  - **Correspondência pelo conteúdo:** 01 sala com a TV; 02 locadora; 03 cartão com a joaninha; 04 escrivaninha com o caderno; 05 estante da coleção.
  - **Mestres PNG** preservados em `design/source/diary/{maps,stories}/`.
  - **Derivados WebP** por `node design/source/diary/build-diary.mjs` (só redimensiona, qualidade 0,82): mapas 640 / 960 / 1280 / 1672 (84–488 KB), histórias 480 / 720 / 1080 / 1536 (25–250 KB), carregados sob demanda.
  - **Textos alternativos** pt/en objetivos, pendentes de revisão do Eduardo.
  - **Posições dos marcos:** conferidas sobre as artes (marcos em terra, sobre a rota visual).
  - **Véu de leitura do cabeçalho:** reforçado.
  - **Rota:** mais grossa, com contorno escuro.
  - **Prévias dos outros capítulos:** a arte some também em direção ao rodapé do card, para o botão ficar sobre superfície lisa.
  - **Mapa do Cap. 02 (recebido depois, 1672 × 941):** campo de futebol, hospital com heliponto e van na ponte, escritórios com sensores e campus com terraços. Marcos sobre esses lugares: ScoutEvo (campo), EOS (van na ponte, junto ao hospital), Axia (escritórios), Comunidade ON (campus).
  - **Imagens editoriais dos capítulos 01 e 02 (recebidas depois, 1536 × 1024):** geradas pelo Eduardo com os prompts desta etapa.
    - Cap. 01: laboratório da faculdade (01), mesa com os esboços do mosquito (02), mostra com troféu (03), celulares com o jogo (04), dois troféus + TCC + capelo (05).
    - Cap. 02: campo com tablet (ScoutEvo), mesa com rota e maleta médica (EOS), saguão com sensores (Axia), espaço colaborativo com a árvore (Comunidade ON).
  - **Resultado:** todos os 3 capítulos e os 14 marcos têm arte; nenhum placeholder resta (teste dedicado).
  - **EOS, versão final:** a cruz vermelha sobre fundo branco da maleta (emblema protegido da Cruz Vermelha) foi trocada por uma cruz verde, numa edição feita pelo Eduardo; o resto da imagem não mudou.
  - **Consoles reconhecíveis:** o console de madeira com joystick (Cap. 01, marco 05) lembra o Atari citado na história; vale a mesma exceção do controle do SNES, sem logos.
- **Layout igual à prancha (2026-10-21, pedido do Eduardo; conteúdo inalterado):**
  - **Seletor de capítulos:** cards de mesma largura ocupando a linha (≥ 768), só código + nome, com a arte maior à direita; o selecionado tem contorno âmbar duplo + `aria-current` (o selo SELECIONADO saiu); "EM CONSTRUÇÃO" continua em texto num capítulo sem marcos.
  - **Capítulo ativo (≥ 1200):** mapa e painel dentro de uma moldura âmbar, com a mesma altura; painel mais compacto (texto menor, navegação no rodapé).
  - **Outros capítulos:** sem título visível (fica para leitores de tela), cards compactos com o rodapé alinhado e botão redondo de seta (o nome acessível diz qual capítulo abre).
  - **Prévias dos outros capítulos removidas (decisão do Eduardo, 2026-10-21):** eram redundantes com o seletor de capítulos (mesmos capítulos, nome e arte) e com o "Próximo capítulo" do painel, que já convida a seguir no último marco. A seção termina na moldura do capítulo ativo. Strings `diary.open` e `diary.others` removidas.
  - **Fora (anotação da prancha ou sem base nos dados):** CONCEITO HÍBRIDO, CAPÍTULO ATIVO, Recolher mapa, zoom, ficha com Status, barra de progresso e cadeados.
  - **Decisão do Eduardo: a estética do controle do SNES pode ficar nas ilustrações do Diário.** A história fala dele (Super Nintendo, "O pedido à joaninha"). É uma exceção à regra de não usar marcas de consoles nos assets: valem a forma e as cores do controle, **sem logos nem nomes de marca** legíveis.
- **Status:** implementado, aguardando aprovação visual e funcional do Eduardo. Sem merge e sem deploy.

## D-092 — Arsenal de Habilidades: Concept C, Loadout Interativo

- **Data:** 2026-10-21
- **Pedido do Eduardo:** integrar o Arsenal ao Status do Jogador com a **Concept C — Loadout Interativo** (prancha aprovada): quatro seletores, uma especialidade por vez, painel de habilidades e a visão "Ver todas". As propostas A e B não entram. Especificação completa em `docs/25-skill-loadout-concept-c.md`.
- **Revê a D-043 (02-B, composição aberta e informativa):** o Arsenal passa a ser interativo. Conteúdo: o Skill Loadout v1 (D-041), sem item novo e sem graduação.
- **Player Status (D-083) intacto:** nenhuma linha do componente mudou. O Arsenal se aproxima por margem negativa, usa a mesma moldura e dois engates atravessam o vão entre as molduras, sem cobrir nenhuma das bordas.
- **Especialidades:** CON CONSTRUÇÃO, PRD PRODUTO, IA INTELIGÊNCIA ARTIFICIAL e DNA DNA DE GAMES; em inglês DEV DEVELOPMENT, PRD PRODUCT, AI ARTIFICIAL INTELLIGENCE e GDN GAME DNA (o "BUILD / BLD" da D-043 vira "DEVELOPMENT / DEV", como no briefing). O teaser SYSTEM HORIZON (congelado) continua dizendo "BUILD" em inglês: **alinhamento pendente de decisão do Eduardo**. Cada uma tem frase própria (`SkillGroup.description`): a de CON veio do briefing; **PRD, IA e DNA são propostas para revisão do Eduardo**.
- **Interação:** botões nativos com `aria-pressed` (não tabs ARIA, porque a visão completa não tem aba selecionada); CON no início; "Ver todas as habilidades" / "Voltar ao loadout" recupera a última especialidade; troca de 180 ms só de opacidade, instantânea com movimento reduzido.
- **Design system:**
  - **Cores (revê a regra "Nenhum HEX novo" da D-014 nesse ponto):** dois primitivos novos, `violet-400` `#A393D9` e `coral-400` `#E07A5F`, só para a identidade das especialidades. Semânticos `specialty-build` / `-product` / `-ai` / `-game`; contraste validado no build sobre `bg`, `surface` e `panel`.
  - **Ícones:** 21 pictogramas pixel autorais (12 × 12), sem logos de terceiros.
  - **Modelo:** `Skill.icon`, `SkillGroup.icon` e `SkillGroup.description`.
- **Termo em inglês na versão pt (exceção à D-084, pedida no briefing):** "LOADOUT DE ESPECIALIDADES" e "Voltar ao loadout".
- **Título em inglês:** "SKILL LOADOUT" passa a "SKILL ARSENAL", porque a micro-label já diz "SPECIALTY LOADOUT".
- **Divergências da prancha** (`docs/25` §8):
  - duas molduras com engates, em vez de uma moldura única (o Player Status está congelado);
  - contagem real no lugar da barra "LOADOUT ATIVO";
  - pictogramas autorais e só o nome nos cards, sem logos nem descrições não aprovadas;
  - grade 2 × 2 no mobile, sem faixa com setas.
- **Visão completa no mobile:** um segundo "Voltar ao loadout" no fim da lista (a lista passa de 2.300 px em 390); ele devolve o foco ao botão do cabeçalho, já que ele próprio some.
- **Validação:**
  - axe sem violações;
  - teclado, foco e movimento reduzido conferidos;
  - capturas em 1440 / 1280 / 1024 / 820 / 390 / 360, pt e en, sem overflow;
  - as outras seções e o painel do Player Status idênticos à `main`, pixel a pixel;
  - testes e builds passam;
  - revisão independente: aprovada com ressalvas, sem bloqueantes; ressalvas corrigidas (ícone do TypeScript, docs, segundo "Voltar" no mobile).
- **Status:** implementado na branch `feat/skill-loadout-concept-c`, **aguardando a aprovação visual e funcional do Eduardo**. Sem merge e sem deploy.

## D-093 — Project Inventory H3: MC-CART Library + CRT Project Viewer

- **Data:** 2026-10-21
- **Pedido do Eduardo:** evoluir o H2 (D-077) e a biblioteca (D-087/D-088) para o H3, a partir de pranchas aprovadas por ele. Princípio: **a biblioteca escolhe, o MC-01 carrega, o CRT apresenta.** Todo o case passa a ficar dentro da TV. Detalhes em `docs/24` §19.
- **Revê a D-088 nesse ponto:** a biblioteca congelada continua igual; muda a estação abaixo dela. O case em blocos abaixo do CRT (D-077) sai e vai para dentro do vidro.
- **Implementação (aguardando aprovação visual e funcional):**
  - **Composição:**
    - biblioteca no topo (sem mudança);
    - estação com o MC-01 à esquerda e o CRT, protagonista, à direita (≥ 1024: 42/58 na capa; no dossiê, 34/66 e 28/72 a partir de 1200);
    - abaixo de 1024, CRT em cima e console embaixo; no celular, o CRT ocupa 122% da tela, centrado, para o vidro 4:3 usar a largura toda.
  - **Barra do console:** LED + "MC-00X · Nome" + estado do slot e **uma** ação (Inserir ou Ejetar). Os controles que ficavam sob a TV saíram (sem ejeção duplicada).
  - **CAPA (READY):** a arte oficial do cartucho ao fundo e, em HTML, código / PROJETO, nome (última palavra em laranja), tipo, EM ANDAMENTO (Comunidade ON), descrição, tecnologias e EXPLORAR PROJETO.
    - **MC-001:** também "Reproduzir teaser" e a linha "Teaser disponível · Campanha jogável em desenvolvimento" (nada prometido além do que existe).
    - **Celular:** descrição em 2 linhas e até 3 tecnologias (o texto completo fica no dossiê).
  - **DOSSIÊ:**
    - cabeçalho (código / nome + Voltar à capa);
    - seções: Sobre o projeto, Problema, Minha contribuição, Tecnologias, Marcos, Aprendizados e evidências;
    - uma seção por vez, numa única área com rolagem interna;
    - rodapé com 01 / 06, Anterior e Próxima ("Próxima: Problema");
    - vidro largo: lista ao lado; vidro do celular: seletor nativo e o "Voltar à capa" só com ícone (o nome acessível diz a ação).
    - **Só conteúdo real:** seções sem conteúdo não aparecem. Exemplos: sem marcos documentados não há "Marcos" (MC-001, Axia, Comunidade ON); sem link público, a última seção é só "Aprendizados" (Comunidade ON).
    - **A arte do cartucho** em "Sobre o projeto" é rotulada como ARTE DO CARTUCHO (não é captura de tela do produto).
  - **Biblioteca no dossiê:** recolhe num botão "← Biblioteca · MC-00X Nome". Voltar à biblioteca e Voltar à capa **não ejetam**.
  - **Estado (`inventory.machine.ts`):**
    - `ready.screen` ganha `dossier` (com `section`);
    - eventos `explore`, `cover` e `section`;
    - troca, ejeção e reduced motion sempre terminam (ou recomeçam) na capa, então nunca há um dossiê de um projeto com o cartucho de outro;
    - durante a troca, o vidro fica em espera.
  - **Teaser do SYSTEM HORIZON:** engine, quadros, pausa e voltas intactos; carregado sob demanda. Pausar/Reproduzir e Voltar à capa ficam dentro do vidro, no rodapé.
  - **Foco:**
    - Explorar → título do dossiê;
    - Voltar à capa → Explorar;
    - Biblioteca → cartucho inserido na biblioteca;
    - Ejetar → Inserir cartucho;
    - a troca pela biblioteca não move o foco (anunciada em texto); trocar de seção anuncia "Seção 02 de 06: Problema" e volta o conteúdo ao topo, sem mexer na página.
  - **Fallback (MC-01 indisponível):** o MC-CART canônico e o case em HTML (`ProjectCase`) seguem acessíveis; a biblioteca recupera a estação.
- **Diferenças inevitáveis em relação às pranchas:**
  - O vidro real do CRT é 4:3, mais alto que o das pranchas: o dossiê no celular tem ~140 px de leitura (com rolagem interna) e a capa encurta a descrição.
  - Os elementos de estudo das pranchas ficaram de fora: "H3 · CAPA/DOSSIÊ", "CRT DOSSIÊ", menu "01 Início", ONLINE / MC-01 no header, ícones de marca das tecnologias, "Beta publicado em maio de 2017" sob a arte e o resumo "Reconhecimento acadêmico". Esses dois últimos ficam como itens da seção Marcos, onde estão os fatos.
  - O título "MC-CART Library" grande não entrou: o cabeçalho da seção é o padrão do site, e a biblioteca mantém "COLEÇÃO MC-CART" (D-084).
  - "Ver coleção (6)" no celular: a biblioteca já mostra os seis cartuchos rolando na horizontal, com anterior / próximo.
- **Arte na capa:** a ilustração do rótulo preenche o vidro, ancorada à direita, como nas pranchas, e o texto fica sobre um degradê escuro à esquerda. **Revê a D-087 nesse ponto** (`fit: contain` no CRT): a ilustração inteira aparece no dossiê, em "Sobre o projeto".
- **Revisão independente:** aprovável com correções, sem bloqueante. Correções feitas e revalidadas no navegador:
  - **Foco:**
    - no READY, o foco vai ao título da capa (antes caía na barra do console, fora da tela, e o Tab pulava o EXPLORAR); o READY passa a ser anunciado;
    - "Reproduzir teaser" leva o foco ao Pausar;
    - "← Biblioteca" centraliza o cartucho inserido na faixa antes de focá-lo.
  - **Teaser:** se o visitante trocar de cartucho ou abrir o dossiê enquanto o teaser carrega, nada acontece (antes podia tocar no cartucho errado). Uma falha atrasada do teaser não afeta o dossiê.
  - **Seção do dossiê:** limitada às seções que existem.
  - **Fallback:** volta a mostrar a descrição, EM ANDAMENTO e as experiências.
  - **Botão Próxima:** "Próxima: Problema" sem espaço extra, com o nome acessível igual ao texto visível.
  - **Rolagem:** a área da seção só entra no Tab quando rola, e no fim do texto a rolagem passa para a página.
  - **Limpeza:** strings e estilos mortos removidos; o aviso do teaser agora diz "o dossiê do projeto continua disponível".
- **Status:** implementado na branch `feat/hero-refinement`, aguardando aprovação visual e funcional do Eduardo. Sem merge e sem deploy.

## D-094 — Project Inventory: moldura e cenário da estação

- **Data:** 2026-10-21
- **Pedido do Eduardo:** aproximar o layout do Inventory da referência aprovada (biblioteca e estação em painéis com fundo e borda; "hoje está sem fundo nenhum, como se estivesse jogado na tela"). **A funcionalidade não muda.** O cenário (estante desfocada e mesa) foi fornecido por ele.
- **Revê a D-087 / D-088 nesse ponto (só visual):** a biblioteca deixa de ser uma prateleira sem fundo.
- **Biblioteca:**
  - painel com borda de acento, superfície `--mc-surface` e cantos `--mc-radius-sm`;
  - cada cartucho numa placa própria (fundo `--mc-bg`, borda sutil);
  - o selecionado ganha borda dupla de acento, fundo de painel e o código em laranja, mantendo a elevação de 2 px e o rótulo de texto.
- **Estação:**
  - **Moldura:** a mesma borda e os mesmos cantos da biblioteca, com o cenário como `<img>` decorativo (`alt=""`, `loading="lazy"`), em `object-fit: cover` ancorado na base. A mesa fica sob os aparelhos, que se apoiam nela.
  - **Celular (< 768):** o painel vai de borda a borda e perde as laterais, porque o CRT já passa da largura do conteúdo.
  - **Fallback (MC-01 indisponível):** fundo liso, sem o cenário, para o texto continuar legível.
- **Proporção (≥ 1024):** console × CRT de 42/58 para 40/60 na capa, como na referência; o dossiê mantém 34/66 e 28/72.
  - **Motivo:** compensa a moldura. O vidro do CRT fica igual ou maior que antes (1440: 531 → 533 px; 1280: 523 → 526 px), e a descrição da capa não passa a ser cortada.
  - **Margens laterais da estação:** 16 px no desktop.
- **Asset:**
  - **Mestre:** `design/source/inventory/station-background.png` (1672 × 941).
  - **Derivados:** `public/assets/inventory/station-background-{640,960,1280,1672}.webp` (20 / 38 / 57 / 85 KB), gerados por `node design/source/inventory/build-station.mjs`. Só redimensiona.
  - **Novo cenário (2026-10-22, escolha do Eduardo entre duas versões):** a mesa vista levemente de cima, como o MC-01 e a TV, com a borda do tampo a 46% da altura e a estante bem desfocada e escura. Entre as duas versões, ficou a mais escura: pico de brilho 57/255 no fundo e 45 no canto superior esquerdo, atrás da barra, contra 66 e 56 na outra. Assim, o CRT e as bordas laranja continuam sendo o que mais brilha. Mesmo tamanho (1672 × 941). Derivados: 10 / 20 / 31 / 51 KB.
- **Validação:**
  - 1440 / 1280 / 1024 / 820 / 390 / 360 em pt, e 1440 / 390 em en, nos estados inicial, capa e dossiê: sem rolagem lateral nem erro;
  - testes, typecheck, Prettier e builds sem aviso;
  - orçamento de CSS respeitado.
- **Status:** implementado na branch `feat/hero-refinement`, **aguardando a aprovação visual do Eduardo**. Sem merge e sem deploy.

## D-095 — Project Inventory: moldura única, MC-01 frontal, mesa, filtro CRT e portátil no celular

- **Data:** 2026-10-21
- **Pedido do Eduardo, sobre a D-094:**
  - título "Biblioteca de cartuchos";
  - cartuchos unidos ao setup;
  - console no novo ângulo, mais coerente com a TV;
  - TV apoiada na madeira, não flutuando;
  - filtro CRT leve no tubo;
  - no celular, o portátil dele no lugar do console + TV, com os cartuchos em carrossel por cima e a mesma animação de inserir.

  Arte do Eduardo: console em camadas e portátil.
- **Título:** BIBLIOTECA DE CARTUCHOS / CARTRIDGE LIBRARY. A dica da troca ficou neutra ("troca o que está inserido"), porque vale para os dois aparelhos.
- **Moldura única:** a biblioteca e a estação são dois compartimentos de uma só moldura (`.rig`), separados por um filete de acento. No dossiê, o "← Biblioteca" fica logo acima.
- **MC-01 frontal (revê a geometria da D-077):**
  - **Camadas:** traseira (tampa com a abertura do slot, y 0–296) e frente (y 296–1170), recortes exatos do render inteiro do Eduardo (fora do repositório; 2508 × 1170; diferença < 0,05%).
  - **Cartucho:** em escala do console, entra na abertura laranja. Encaixado, a frente esconde tudo abaixo do slot, logo acima da faixa do rótulo. A pose "fora" paira acima da tampa.
    - **Ajuste de 2026-10-22 (pedido do Eduardo, sobrava lateral no slot):** de 1150 para 1270 px (+10%), centrado no miolo escuro do slot (x 607–1880 na base da tampa). A parte visível segue em 66%, a pose "fora" passou de −560 para −618 px e o espaço acima do console, de 820 para 935 px.
  - **Componente:** mesma ordem de camadas, só `transform` e as mesmas durações do `mc-console`.
  - **Derivados:** `mc01-{back,front}-{640,960,1280}.webp` (10 a 58 KB), por `node design/source/mc-01/build-console.mjs`. Os derivados antigos saíram do `public/`; os mestres antigos ficam em `design/source/mc-01/`.
- **Barra do console no topo (2026-10-22, pedido do Eduardo):** com os aparelhos lado a lado (≥ 1024), a barra (cartucho, estado e Inserir/Ejetar) fica no topo da coluna, alinhada ao topo da TV, e o MC-01 desce até a mesma linha de apoio da TV. Empilhado (< 1024), a barra fica logo acima do console. Com a coluna abaixo de 400 px, a ação desce para a linha de baixo. O portátil do celular não muda.
- **Apoio na mesa:** sombra de contato elíptica sob a TV, o console e o portátil (só objetos físicos), e uma base mais alta na estação (≥ 1024: 64 px), para a mesa aparecer à frente dos aparelhos.
- **Filtro CRT** (`mc-crt-front`, input `filter`, ligado por padrão):
  - fica por cima do conteúdo, sem capturar o ponteiro;
  - combina scanlines de 3 px (1 escura), vinheta e um reflexo no alto, com opacidade 0,55 e só tokens de material;
  - fica desligado no teaser, que já tem scanlines próprias;
  - o texto da capa continua legível (conferido a 2×).
- **Portátil no celular (< 768):**
  - **Componente:** `mc-handheld` (`shared/signature/handheld/`): cartucho < corpo < tela.
    - O cartucho entra por cima, ATRÁS do corpo, como na referência do Eduardo, com as mesmas curvas e durações.
    - A tela é o visor do render (x 118–1755 · y 156–1336) e recebe o mesmo conteúdo do CRT (capa, dossiê, teaser, carregando). Em espera, mostra o visor apagado da arte.
    - Derivados `handheld-{480,800,1200}.webp` (35 a 135 KB), por `node design/source/handheld/build-handheld.mjs`.
  - **Fluxo:**
    - a biblioteca vira o carrossel por cima, com encaixe centrado;
    - **escolher um cartucho já insere**: no slot vazio, insere; com outro cartucho, troca;
    - o "Inserir cartucho" da barra continua;
    - nessa escolha, a página não rola e o foco fica no carrossel (o READY é anunciado);
    - a máquina de estados é a mesma da D-093.
  - **Código:**
    - `handheld` vem de `matchMedia('(max-width: 767.98px)')`;
    - o conteúdo da tela e a barra viraram templates compartilhados pelo CRT e pelo portátil;
    - só um aparelho é renderizado por vez, então os ids e a região `#project-viewer` são únicos.
  - **Visor estreito:** controles do teaser compactos, para não cobrir a cena (≥ 24 px de altura).
- **Validação:**
  - fluxo real com movimento em 390 e 360: inserir pelo carrossel, teaser, troca e ejeção;
  - axe sem violações no Inventory;
  - sem rolagem lateral, com o portátil centrado (4 px de cada lado);
  - 1440 / 1280 / 1024 / 820 em pt, e 1440 / 390 em en;
  - 200 testes, incluindo um novo do portátil; typecheck, Prettier e build sem aviso.
- **Revisão independente:** aprovada com ressalvas, sem bloqueantes. Corrigido:
  - os controles compactos do teaser valem só no portátil (o CRT a 1024 mantém 46 px);
  - dossiê no visor do portátil (≤ 360 px) com seletor e navegação mais baixos (≥ 31 px): área de leitura de 98 → 113 px em 390;
  - ao girar o celular com o foco no aparelho, o foco vai ao equivalente no outro;
  - o reflexo do portátil sai no teaser;
  - testes do portátil (inserir o selecionado, nomes "Inserir" / "Trocar para", troca, mudança de aparelho em runtime) e do filtro no teaser (203 testes).
- **Pendente de decisão do Eduardo:**
  - entre 768 e 1023 px (layout empilhado), a TV fica sobre a estante e só o console fica na mesa;
  - ~~os PNGs só de referência ficam no repositório~~: removidos por decisão do Eduardo (cerca de 8 MB).
- **Status:** implementado na branch `feat/hero-refinement`, **aguardando a aprovação visual e funcional do Eduardo**. Sem merge e sem deploy.

## D-096 — Project Inventory: dossiê em tela cheia no celular ("entrar na tela")

- **Data:** 2026-10-22
- **Pedido do Eduardo:** no celular, o portátil deixava o dossiê muito apertado.
  - **Medição:** o visor tem 334 × 240 px em 390 (308 × 222 em 360), e a área de leitura do dossiê ficava com 113 px (96 em 360), cerca de 4 a 5 linhas.
  - O aparelho ocupa quase a tela toda, mas só 37% dele é visor.
- **Escolha do Eduardo, entre três opções** (as outras eram o dossiê abaixo do portátil e voltar ao CRT no celular): **entrar na tela.**
  - A capa continua no visor do portátil.
  - EXPLORAR PROJETO faz a tela crescer a partir do visor até ocupar o celular inteiro.
  - Voltar à capa a encolhe de volta.
  - O conteúdo segue "dentro da tela": o mesmo vidro escuro, com um filete de acento no aro e o reflexo do vidro mais fraco (é texto longo).
- **Implementação (`screen-zoom`, só no celular, < 768):**
  - **Diálogo:** `<dialog>` nativo modal, com o foco preso e o fundo inerte. Ao abrir, o foco vai ao título do dossiê.
  - **Animação:** a expansão é um recorte (`clip-path`) do retângulo do visor até a tela cheia, em 320 ms, e o caminho inverso ao fechar. Sem animação com reduced motion.
  - **Fechar:** por Voltar à capa, Esc ou o voltar do sistema (uma entrada no histórico, consumida ao fechar, sem mudar a URL). Ao fechar, o foco volta ao EXPLORAR PROJETO.
  - **Página atrás:** não rola com a tela cheia aberta e não se mexe ao fechar. Para isso, a biblioteca não recolhe no celular e o "← Biblioteca" é só do CRT.
  - **Leitura:** o dossiê recebe tipografia de leitura por variáveis CSS do diálogo (texto 16 px, título da seção 22 px).
    - O cabeçalho fica numa linha: código / nome e "Voltar à capa", com o texto.
    - O seletor de seções ocupa a largura toda.
    - A área de leitura vai de 113 para ~690 px em 390.
  - **Girar o celular para o tablet com o dossiê aberto:** o CRT assume o dossiê e o foco vai ao título dele.
- **Desktop e tablet (≥ 768):** sem mudança; o dossiê segue dentro do CRT.
- **Validação:**
  - **Navegador:** 390 e 360, pt e en, com movimento e com reduced motion. Abrir, trocar de seção e fechar pelos três caminhos: o foco, a URL e a posição da página se mantêm, e não há rolagem lateral.
  - **Desktop:** o CRT em 1024 / 820 / 1440 está igual.
  - **Testes:** 204, incluindo a tela cheia, o Esc e a troca de aparelho.
  - **Código:** typecheck, Prettier, builds e guardas passam, com o orçamento de CSS respeitado (removidas regras mortas do dossiê).
- **Status:** mergeado na `main` (PR #5), aguardando a aprovação do Eduardo. Sem deploy.

## D-097 — Remoção de Conquistas, Missão principal atual e Missões secundárias

- **Data:** 2026-10-23
- **Decisão do Eduardo:** as três seções repetiam o que a Home já mostra. Nenhuma estava no ar: em produção os dados eram vazios, e só havia conteúdo MOCK em desenvolvimento.
  - **Conquistas (D-051):** TCC nota 10, Mostra de Jogos, FAEL, publicação e lançamentos já estão nos marcos do Diário e nos dossiês dos cartuchos, junto da história que os explica.
  - **Missão principal atual (D-055):** a Comunidade ON já aparece no Player Status ("Estado atual"), no MC-006 (EM ANDAMENTO) e no capítulo 02 do Diário (CURRENT QUEST).
  - **Missões secundárias (D-056):** era a única com conteúdo próprio (projetos pessoais em andamento), mas exigiria manutenção constante. Projetos pessoais, como o *Paco*, entram como novos cartuchos MC-CART quando aprovados.
- **Removido:**
  - componentes `features/achievements`, `features/current-quest` e `features/side-quests`;
  - dados de produção e MOCK, `achievements.rules` e os modelos `Achievement`, `CurrentQuest` e `SideQuest`;
  - as substituições de arquivo no `angular.json`;
  - os textos `sections.achievements/currentQuest/sideQuests` e os grupos `achievements`, `currentQuest` e `sideQuests` do dicionário (pt e en);
  - as referências na Home, no teste da Home e no showcase de desenvolvimento.
- **Mantido:** a guarda do deploy contra ids `mock-*`. `docs/16`, `docs/18` e `docs/19` ficam como histórico, marcados como removidos.
- **Home:** Hero → Player Status → Arsenal → Inventário → Diário → Final Checkpoint + footer. **Sem mudança visível no site publicado.**
- **Status:** mergeado na `main` (PR #6). Sem deploy.

## D-098 — Ajustes da revisão de UI/UX e pré-renderização da Home

- **Data:** 2026-10-23
- **Origem:** revisão independente de UI/UX da Home, com notas UX 7,5 · visual 8,5 · acessibilidade 7,5 · conteúdo 7,5. O Eduardo concordou com tudo e quer chegar o mais perto de 10. Decisões dele:
  - **contato:** fica para depois;
  - **Inventário ao chegar:** continua vazio;
  - **menu:** com a seção atual destacada e rolagem suave;
  - **lema:** repetido em excesso;
  - **pré-renderização:** sim;
  - **Hero no celular:** fica como está;
  - **siglas do Arsenal:** atrapalham.
- **Navegação:**
  - **Tab no header:** não rola mais a página (os focáveis do header anulam o `scroll-padding-top` do `html`).
  - **Rolagem suave nas âncoras:** `scroll-behavior` no `html`; reduced motion mantém o salto.
  - **Foco depois da âncora:** vai ao título da seção de destino (`provideAnchorFocus`, em `core/layout/anchor-focus.ts`), sem anel no foco programático.
  - **Seção atual no menu:** `aria-current="location"` com o sublinhado de acento.
- **Inventário:**
  - **Cards:** a linha de tipo do projeto aparece em cada um.
  - **Escolha por toque ou mouse:** traz a tela do aparelho à vista, para o visitante ver o cartucho entrar e a capa. Pelo teclado, nada se move.
  - **Logo do rótulo na capa:** a arte é cortada no alto quando o logo fica do lado do título (`artwork.logo: 'right'`: ScoutEvo, EOS, Axia, Comunidade ON). No Aedes Revenge, com o logo à esquerda, a arte fica inteira.
  - **Texto no CRT:** mínimos de 12 px nos rótulos e 14 px na descrição e no dossiê.
  - **Foco nos cards:** o anel fica afastado da borda e não se confunde com o selecionado.
  - **Ordem do Tab no desktop:** barra → console → TV, porque o console vem antes no DOM; empilhado, a TV segue em cima com `order`.
  - **Tela cheia:** o diálogo tem nome (`aria-labelledby`).
  - **Barra a 360 px:** a ação desce para a linha de baixo.
- **Diário:**
  - **Escolher um marco por toque ou mouse:** com o painel abaixo do mapa (≤ 1024 e celular), a página rola até ele.
  - **Codinome igual ao título:** não se repete no rótulo do marco.
  - **Datas aproximadas:** "c." sempre minúsculo.
  - **Miniaturas dos capítulos:** versão de 320 px; antes baixavam a de 640 px.
- **Textos:**
  - **Sem inglês na versão pt:**
    - Arsenal: "ESPECIALIDADES" e "Voltar ao arsenal";
    - Inventário: "ENCAIXE VAZIO" e "demonstração" no lugar de teaser;
    - habilidades: "fluxos de trabalho" e "Sistemas de design";
    - Diário: "aplicação web".
  - **Ficam como jargão aceito:** "facilities" e nomes de tecnologia (WebAPI, .NET).
  - **Lema "XP real, sem personagem.":** só no Hero. Saiu do rodapé, do fechamento do capítulo 02 (que mostra só MISSÃO ATUAL — EM ANDAMENTO) e do fim do "Problema" do MC-001.
  - **Siglas CON/PRD/IA/DNA:** fora do Arsenal (modelo, dados e interface); o seletor mostra ícone e nome.
  - **en:** "THE CAMPAIGN CONTINUES...".
- **Pré-renderização:**
  - **Pacotes:** `@angular/ssr` e `@angular/platform-server` 22.2.2.
  - **Build:** a Home em `/` e `/en` sai em HTML no build de produção (`outputMode: static`) e é hidratada no navegador.
  - **Sem servidor:** o GitHub Pages continua servindo arquivos estáticos.
  - **Pós-build:** usa o `en/index.html` pré-renderizado e faz do `index.csr.html` o 404.
  - **Medição** (rede de 1,6 Mbps, 150 ms, CPU 4×):

    | | Antes | Agora, 1440 | Agora, 390 |
    | --- | --- | --- | --- |
    | Primeiro conteúdo | 2,6 s | 0,86 s | 0,82 s |
    | LCP | 4,3 s | 2,4 s (imagem do Hero) | 1,4 s |
    | CLS | — | 0,006 | 0 |

  - **Erros de console:** nenhum.
- **Fora desta rodada:**
  - repetições que tocam partes congeladas ("10+ anos" no Hero e no Player Status) ou textos do Eduardo (o marco 04 do capítulo 02 repete a descrição do MC-006);
  - o header do celular ao rolar ("celular: ok");
  - contato por e-mail e CV.
- **Segunda rodada do revisor:** os oito achados foram confirmados como resolvidos, mas apareceu uma regressão crítica introduzida aqui. Correções:
  - **Teclado preso no Inventário e no Diário (CRÍTICO):**
    - **Causa:** o handler `(keydown)` do host valia `false`, e o Angular cancela o evento quando o handler devolve `false`.
    - **Correção:** o handler passou a ser um método que devolve `void` (`markPointer`).
    - **Teste:** um teste garante que Tab, Enter, Espaço e Esc não são cancelados; com o código antigo, ele falha.
  - **Clique antes da hidratação no Inventário:** o `ngSkipHydration` saiu. Na página pré-renderizada, o Inventário nasce como o do servidor (CRT) e troca para o portátil logo depois, no celular. Assim ele hidrata e os cliques feitos antes do JavaScript são repetidos.
  - **Dossiê a 1024–1199:** a TV vai para cima, com até 48 rem, e o console desce. A área de leitura vai de ~140 para 287 px, com a lista de seções ao lado.
  - **Diário, "Próximo marco" por ponteiro:** o painel volta à vista quando o título fica acima da tela.
  - **Carrossel no celular:** o cartucho escolhido fica no centro da faixa.
  - **MC-005:** "aplicação web em Angular, API em .NET".
  - **Salto de layout no Hero (CLS 0,0065 → 0,0002):** o `max-width: 46ch` do resumo virou `27.6em`. É a mesma largura com a IBM Plex Sans, que mede 0,6 em por "0"; com a fonte reserva, `ch` era menor e o parágrafo passava de 4 para 3 linhas.
  - **CSS global bloqueante:** `inlineCritical: false` na produção; a primeira pintura já tem os tokens. O primeiro conteúdo segue em ~0,7 s.
  - **Medição com limitação:**

    | | 1440 | 390 |
    | --- | --- | --- |
    | Primeiro conteúdo | 0,70 s | 0,72 s |
    | LCP | 0,90 s | 1,7 s |
    | CLS | 0,0002 | 0 |

  - **Erros de console:** nenhum.
- **Terceira rodada do revisor:** nenhum problema crítico nem importante. Notas: UX 8,8 · visual 8,8 · acessibilidade 9 · conteúdo 8,5. Os seis menores foram corrigidos:
  - **Clique antes da hidratação no celular:** os cliques guardados miravam o "Inserir" do HTML do servidor (CRT), que saía com a troca para o portátil. A troca agora espera a hidratação terminar e os cliques serem repetidos (`whenStable` + próxima tarefa). Conferido com clique real de mouse a 390 e 1440 px: o cartucho entra.
  - **Salto de layout com a seção à vista durante a carga (0,0307 → 0,0002 a 390 px):**
    - **Causa:** o texto pré-renderizado pintava com a fonte do sistema, mais estreita que a IBM Plex Sans, e as larguras em `ch` dependiam da fonte ativa. Com a Plex, o Arsenal e o Diário ganhavam linhas e empurravam o Inventário.
    - **`ch` → `em`:** todas as larguras em `ch` dos componentes viraram `em`, com a mesma largura final (0,6 em por `ch` na Plex).
    - **Fontes reserva ajustadas** (`size-adjust` medido no navegador): Arial/Helvetica 100,1% e Roboto 110,9%, antes da fonte do sistema na pilha.
    - **Paginação da biblioteca:** o cabeçalho reserva a altura dos botões ‹ › abaixo de 1200 px (68 px medidos).
  - **Voltar à capa a 1024:** a tela volta à vista antes do foco em EXPLORAR PROJETO.
  - **Próximo/Anterior marco:** só rola quando o título saiu pelo topo com mais de 40 px de folga; nos toques seguintes, o botão não muda de lugar.
  - **Botão do teaser no Hero:** o nome acessível passou a ser "Reproduzir demonstração" / "Play demo" (só o dicionário; o visual não muda).
  - **Fica como está:** a capa lado a lado e o dossiê empilhado de 1024 a 1199, uma consequência aceita da correção da área de leitura.
  - **Medição com limitação:**

    | | 1440 | 390 |
    | --- | --- | --- |
    | Primeiro conteúdo | 0,68 s | 0,75 s |
    | LCP | 0,92 s | 1,8 s |
    | CLS | 0,0001 | 0,0001 |

  - **Erros de console:** nenhum.
- **Quarta rodada do revisor (final):** os seis ajustes foram confirmados e não há regressão funcional. Notas: UX 9 · visual 8,8 · acessibilidade 9,2 · conteúdo 8,5. Correções depois dela:
  - **Salto de layout em en a 390 px com o Inventário à vista durante a carga (CLS 0,29 → 0,0002, em 4 de 4 execuções):**
    - **Causa:** a régua do `mc-section-header` ia para o lado ou para baixo do título conforme a largura dele, e a troca da fonte reserva pela IBM Plex Sans mudava essa decisão.
    - **Correção:** no celular (< 768) a régua fica sempre na linha de baixo, como já acontecia na maioria dos títulos. Muda só a posição dela em "PROJECT INVENTORY" e "CAMPAIGN LOG" na versão en do celular.
  - **Primeira pintura com o Hero inteiro:** `<link rel="expect" href="#player-status" blocking="render">`. Em rede lenta, o navegador às vezes pintava parte do HTML do Hero e a linha de CTAs entrava depois (CLS 0,009 em 1 de 5 cargas); agora fica em 0,0001 em todas.
    - **Custo:** o primeiro conteúdo passa de ~0,70 para ~0,85–0,94 s (rede de 1,6 Mbps, CPU 4×).
    - **Imagem do Hero:** `fetchpriority="high"` (só atributo; o visual congelado não muda).
  - **Toque num cartucho antes da hidratação, no celular:** já insere, como depois de carregar. A seção sabe que é um celular desde a hidratação (`phone()`), antes de o portátil entrar.
  - **Fica como está:** o painel do Diário a 1440 pode ficar até 24 px sob o header depois de "Próximo marco" (limiar de 40 px, para o botão não pular).
- **Status:** mergeado na `main` (PRs #6 e #7), aguardando a aprovação do Eduardo. Sem deploy. Pendências em `PENDENCIAS.md`.

## D-099 — Currículo em PDF no cabeçalho e no Contato

- **Data:** 2026-10-24
- **Pedido do Eduardo:** publicar os currículos em PDF (pt e en). É a principal pendência de conteúdo da revisão de UI/UX (D-098).
- **Arquivos:** `public/assets/cv/eduardo-arine-curriculo.pdf` (pt, 2 páginas) e `eduardo-arine-resume.pdf` (en, 2 páginas).
  - Os arquivos são os do Eduardo, sem alteração. Conteúdo lido antes de publicar: sem telefone, e-mail ou endereço.
  - Os links internos dos PDFs apontam para o portfólio, o GitHub, o LinkedIn e as referências públicas que o Diário já usa.
- **Modelo:** `SocialLink.localizedUrl` (um arquivo por idioma); o link `resume` em `social-links.data.ts` abre o PDF do idioma da página.
- **Onde aparece:**
  - **Cabeçalho, a partir de 1024 px** (o espaço previsto desde a D-037: "Currículo só com URL real"). Abaixo disso, o botão quebrava o cabeçalho fixo:
    - no celular, uma terceira linha (117 → 181 px);
    - a 820 px, a marca e o PT / EN em duas linhas.

    O cabeçalho mantém as alturas de antes em todas as larguras.
  - **Contato (Final Checkpoint), em todas as larguras:** terceira ação `secondary`, depois de GitHub e LinkedIn, com o ícone de documento. Revê a D-054 nesse ponto ("currículo fora" valia enquanto não havia um destino real).
- **Comportamento:**
  - abre numa nova aba (`target="_blank"`, `rel="noopener"`, `type="application/pdf"`);
  - o nome acessível é "Currículo (PDF, abre em nova aba)" / "Résumé (PDF, opens in a new tab)".
- **E-mail:** continua sem destino público (não renderiza sem endereço real).
- **Validação:**
  - 190 testes;
  - axe sem violações no cabeçalho e no Contato (1440, 390, 360; pt e en);
  - sem rolagem lateral;
  - prerender com o PDF certo em `/` e `/en`;
  - o clique abre o PDF do idioma numa nova aba.
- **Status:** implementado, aguardando a aprovação do Eduardo.
