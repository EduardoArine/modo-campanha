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
- **Status:** Arquitetura e conteúdo **aprovados** (2026-10-08). Refinamento físico do desktop (≈15–20% mais sensação de objeto) implementado sem mudar a arquitetura: vidro com `--mc-radius-glass` e aro, vinheta e reflexo atrás do conteúdo, bezel mais distinto, faixa inferior com ranhuras, um botão e LED. Novo raio `--mc-radius-glass` restrito ao vidro do CRT (objeto físico). **Aguardando aprovação visual** do refinamento.

