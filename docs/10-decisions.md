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
