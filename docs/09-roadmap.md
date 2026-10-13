# 09 — Roadmap

O Modo Campanha é construído em fases. **Nenhuma fase significativa de design ou desenvolvimento começa sem aprovação do Eduardo.**

Legenda: ✅ concluído · 🟡 em andamento · ⬜ não iniciado

---

## FASE 0 — FOUNDATION ✅

- ✅ Repositório Git + GitHub (`EduardoArine/modo-campanha`)
- ✅ Projeto Angular (standalone, SCSS, Router)
- ✅ Estrutura por features, models e data
- ✅ Documentação (`docs/`), `CLAUDE.md`, `README.md`
- ✅ Workflow de GitHub Pages preparado (disparo manual, ainda não ativado)
- ✅ Arquitetura base

## Backlog de product exploration

- **Campaign XP**: sistema real de pontos do Modo Campanha (D-021). Requer regras verificáveis antes de qualquer número.

## FASE 1 — VISUAL CONCEPT ✅ (concluída em 2026-10-08)

**Status: Concept 03 — Approved as Hybrid** (D-011 a D-017)

- ✅ Concept da home desktop
- ✅ Hero: 70% Concept 03-A + 30% Concept 03-B (D-013)
- ✅ Player Status: base Concept 03-A (D-012)
- ✅ Início do Project Inventory: cartuchos do Concept 03-B como base do MC-CART (D-013)
- ✅ Aprovação da direção visual
- ✅ Paleta-base aprovada (D-014)
- ✅ Direção de marca: monograma MC; MC-01 como linguagem de sistema; alien descartado (D-015, D-016)
- ✅ Nova exigência: site bilíngue pt-BR / en (D-018)

## FASE 2 — MC DESIGN SYSTEM ✅ (núcleo + signature components aprovados)

Especificação completa em `docs/11-design-system.md`. **A home final só é implementada depois do Design System.**

### Sprint 1 ✅ (2026-10-08)

- ✅ Typography: Pixelify Sans + IBM Plex Sans, tokens e fontes self-hosted (D-022, D-023)
- ✅ Grid: tokens e mixins (D-022)
- ✅ Spacing: escala fechada + arquitetura de aliases (D-022)
- ✅ i18n: D-020 aprovada; `LocaleService`, dicionários tipados, rotas `/` e `/en`

### Sprint 2 ✅ (2026-10-08)

- ✅ Colors (primitivos + semânticos, foco, links, interação, disabled), Borders, Surfaces (D-024)
- ✅ Contratos de contraste verificados na compilação (D-025)

### Sprint 3 ✅ (2026-10-08)

- ✅ Icons (`mc-icon`), Actions (`mcAction`), Chips, Status, Section header (D-027)
- ✅ Design System Showcase dev-only em `/dev/design-system` (D-028)
- ✅ Legibilidade do "C" da Pixelify: resolvida com nova regra de uso (D-029)

**MC Design System Core — APPROVED** (D-030, 2026-10-08).

### Sprint 4 ✅ Signature Components: APPROVED (D-036)

- ✅ Player Card (D-031)
- ✅ MC-CART + Project Summary + material tokens (D-032)
- ✅ CRT Project Viewer, incluindo refinamento físico (D-033)
- ✅ Sprint 4.2 — MC-CART physical refinement (D-034)

Fundamentos restantes do design system (XP, Motion, Easter Egg Language, consolidação responsive/a11y/i18n) seguem para as fases onde são usados.

### Fundamentos restantes (estado em 2026-10-11)

- ✅ Player Card (D-031; foto real aguarda o Eduardo, D-017)
- ✅ MC-CART System (D-032, D-034)
- ✅ CRT (D-033; uso na Home em D-058)
- ⏸ XP (XP profissional vs. Campaign XP, D-021): Campaign XP exige regras reais (decisão do Eduardo)
- 🟡 Motion: aplicado na FASE 5 (D-058, D-059), CSS + reduced motion; fundamento/tokens ainda não documentados no `docs/11`
- ⏸ Easter Egg Language (FASE 6, efeitos exigem aprovação do Eduardo)
- 🟡 Responsive behavior: validado nas FASES 4–8 (1440 → 360); sem seção própria no `docs/11`
- 🟡 Accessibility: D-025 + D-060 aplicados; sem seção própria no `docs/11`
- ✅ i18n / content behavior (D-020; todos os textos novos pt-BR + en)
- ⏸ Monograma MC (símbolo, favicon, loading, selo): desenho da marca, decisão do Eduardo (D-015)
- ⏸ Pixel assets (ex.: Hero CRT Screen Artwork): produção de arte com aprovação do Eduardo

## FASE 3 — CORE EXPERIENCE ✅ (encerrada, D-048)

### Home Slice 01 ✅ APPROVED (D-039; `docs/12-home-slice-01.md`)

- ✅ 01-0 preparação · ✅ 01-A header · ✅ 01-B Hero content · ✅ 01-C Hero desktop (**APPROVED**)
- ✅ 01-D tablet + mobile · ✅ 01-E Player Status · ✅ 01-F revisão

Backlog:

- 🟡 **Hero refinement (D-063 → D-066 → D-067, `docs/21` §7)**: fundo aprovado do setup MC-01 usado direto (recorte próprio no mobile); aguardando revisão visual do Eduardo. Antes: ⬜ **Hero CRT Screen Artwork**: arte da tela do CRT do Hero como asset próprio (a sensação de tela vazia não se resolve com mais objetos na cena)
- ✅ **Mobile Navigation**: nav como segunda linha do header abaixo de 768 px (D-057)
- ⬜ Revisar o equilíbrio visual do Player Card após a entrada da fotografia real do Eduardo
- ⬜ Bloco "Sobre a jornada" no Player Status (quando houver texto aprovado)

### Home Slice 02 ✅ (**APPROVED**, D-047; `docs/13-home-slice-02.md`)

- ✅ 02-0 content inventory (D-041, D-042) · ✅ 02-A Skill Loadout data · ✅ 02-B Skill Loadout visual (**APPROVED**) · ✅ 02-C Project model (**APPROVED**, D-044) · ✅ 02-C.5 MC-001 artwork (**System Horizon Refined APPROVED**, D-045, D-046) · ✅ 02-D Inventory (absorvido por 02-C / 02-C.5) · ✅ 02-E Responsive (absorvido por 02-B / 02-C / 02-C.5) · ✅ 02-F Integrated Slice Review (**APPROVED**, D-047)

### Checklist da fase (estado real no encerramento)

- ✅ Infraestrutura de i18n (pt-BR / en, troca em runtime) — adiantada na FASE 2
- ✅ Header (marca provisória, navegação, seletor de idioma) — Slice 01; nav só com destinos existentes (D-047)
- ✅ Hero (H1 semântico = Eduardo Arine, D-026) — Slice 01
- ✅ Player Status — Slice 01
- ✅ Skill Loadout (antes "Skill Tree"; sem estados/graduação, D-040) — Slice 02
- ✅ Project Inventory (MC-001 com artwork aprovado) — Slice 02
- ➡️ CRT Project Viewer na experiência da Home → **FASE 5** (o componente visual `mc-crt-project-viewer` existe no design system desde a FASE 2)
- ➡️ Wordmark MODO CAMPANHA + monograma MC em SVG → backlog do design system (não implementado; ver "Monograma MC" na FASE 2)
- ➡️ Papel tipográfico `stat-value` → backlog do design system (não implementado; o XP usa texto, `docs/11`)

### Transferido para a FASE 5 (D-048)

CRT Project Viewer completo na Home · seleção de cartucho · inserção no console · transição cartucho → CRT · motion relacionado.

## FASE 4 — CAREER CONTENT 🟡 (estrutura ✅ D-057; conteúdo editorial pendente)

### Home Slice 03 — Campaign Log 🟡 (plano aprovado, D-048; `docs/15-home-slice-03.md`)

- 🟡 03-0 MOCK content for development (histórico real pendente) · ✅ 03-A model / data infrastructure (D-049) · ✅ 03-B visual (**APPROVED**, congelado, D-050) · ⬜ 03-C editorial content (pendente de revisão factual; não bloqueia o resto da Home)

- 🟡 Campaign Log (Slice 03)
- 🟡 Achievements (Slice 04)

### Home Slice 04 — Achievements 🟡 (plano aprovado, D-051; `docs/16-home-slice-04.md`)

- 🟡 04-0 content intake (fatos novos do Eduardo, pendente) · ✅ 04-A model / data (**MOCK**, D-051) · ✅ 04-B visual (**APPROVED / FROZEN**, D-051) · ⬜ 04-C editorial (pendente de fatos reais; não bloqueia o resto da Home)

### Home Slice 05 — Final Checkpoint ✅ (**APPROVED**, D-054; `docs/17-home-slice-05.md`)

Construído antes de Current Quest e Side Quests; continua sendo a última seção da Home (D-052).

- ✅ 05-0 decisões e conteúdo · ✅ 05-A estrutura + dados · ✅ 05-B visual (**APPROVED / FROZEN**) · ✅ 05-C footer (**APPROVED / FROZEN**) · ✅ 05-D revisão integrada (Contato no header; **HOME SLICE 05 — APPROVED**, D-054)
- ✅ Final Checkpoint + footer (Slice 05)

### Home Slice 06 — Current Main Quest 🟡 (D-055; `docs/18-home-slice-06.md`)

- ✅ 06-A modelo / dados (**MOCK**, produção `null`) · ✅ 06-B visual (**APPROVED**, Quest Briefing) · ⬜ 06-C editorial (texto público aprovado pelo Eduardo; não bloqueia o resto da Home)
- 🟡 Current Main Quest (Slice 06)

### Home Slice 07 — Side Quests 🟡 (D-056; `docs/19-home-slice-07.md`)

- ✅ 07-A modelo / dados (**MOCK**, produção vazia) · ✅ 07-B visual (**APPROVED**, Side Quest Log) · ⬜ 07-C editorial (conteúdo real do Eduardo; não bloqueia o resto da Home)
- 🟡 Side Quests (Slice 07)

## FASE 5 — GAME FEEL ✅ (D-058, D-059; Progress pendente de definição)

- ✅ CRT Project Viewer completo na experiência da Home (D-058)
- ✅ Seleção de cartucho (MC-CART → seleção → CRT → Project Case; GitHub como ação explícita no case) (D-058)
- ✅ Transição cartucho → CRT (D-058)
- ✅ Microinterações (estados do cartucho, boot do CRT e do Hero, D-058/D-059)
- ✅ Cartridge insert (~600 ms, versão "encaixe + boot", D-058)
- ✅ CRT boot (`LOADING CARTRIDGE...`, D-058)
- ✅ Boot / Intro: removido com a cena em D-067 e retomado como o liga-CRT do teaser SYSTEM HORIZON (D-068)
- ✅ **SYSTEM HORIZON — teaser do CRT da Hero: base técnica APPROVED / FROZEN** (D-068, `docs/22`): engine, roteiro, timings, pause/play, 3 voltas, reduced motion, responsivo, arquitetura
- ✅ SYSTEM HORIZON — cenário final integrado (4 camadas, paleta única de 16 cores, `docs/22` §12)
- ⬜ SYSTEM HORIZON — arte final do personagem (validar com o cenário), depois pickups + MC-CART (`docs/22` §4, §11)
- ⏸ Progress (sem definição nos docs; decisão do Eduardo, D-059)
- ✅ Hover states (cartucho sobe da prateleira, D-058)
- ✅ Transitions (CRT on, cartucho, D-058)
- ✅ Decisão: CSS (transitions + keyframes), sem biblioteca (D-058)

## FASE 6 — SECRETS ⏸ (bloqueada: efeitos exigem aprovação do Eduardo, `docs/08`)

- ⬜ `???`
- ⬜ Secret Area
- ⬜ Konami Code. **Decisão pendente: qual o efeito?**
- ⬜ Achievement secreto

## FASE 7 — CONTENT ⏸ (conteúdo real do Eduardo; ver relatório da branch `feat/autonomous-site-completion`)

- ⬜ Textos finais em pt-BR **e** en
- ⬜ Foto real do Eduardo para o Player Card
- ⬜ Projetos reais
- ⬜ Screenshots
- ⬜ Links (LinkedIn, email)
- ⬜ Currículo

## FASE 8 — QUALITY ✅ (D-060; pendentes dependem de decisão/asset)

- ✅ Responsividade (1440 / 1024 / 820 / 768 / 390 / 360 validados nas FASES 4–8)
- ✅ Acessibilidade (Lighthouse a11y 100; skip link; foco visível; status de carregamento; `aria-hidden` em decoração)
- ✅ SEO bilíngue: `hreflang` + canonical + `<html lang>` dinâmicos (D-060)
- ⏸ Prerender estático das duas versões (`@angular/ssr` só em build): dependência nova, **decisão do Eduardo**
- 🟡 Metadata: Open Graph por idioma ✅; `og:image` e favicon próprio aguardam o monograma MC
- 🟡 Performance: mobile 87 / desktop 100 (Lighthouse); preload da fonte do Hero pendente (D-023)
- ✅ Lighthouse: a11y / best practices / SEO 100 em mobile e desktop
- ✅ Redução de movimento
- ✅ Teclado (ordem de foco, skip link, foco nunca sob o header)
- ✅ Offset de âncora/foco em CSS acompanha a altura real do header (D-060)

## FASE 9 — RELEASE ⏸ (deploy público só com o Eduardo)

- ⬜ GitHub Pages (ativar e publicar)
- ⬜ Domínio opcional no futuro
- ⬜ Adicionar ao LinkedIn
- ⬜ Iniciar posts do Modo Campanha (cartuchos como peças de social)

---

## Decisões futuras em aberto

| Tema                                                                                                                | Fase     |
| ------------------------------------------------------------------------------------------------------------------- | -------- |
| Efeito do Konami Code                                                                                               | 6        |
| Localização do `???` / Secret Area                                                                                  | 6        |
| ~~Estados das skills~~ ✅ sem estados/graduação, D-040                                                              | 3        |
| ~~Abordagem de animação~~ ✅ CSS, D-058                                                                             | 5        |
| ~~Paleta definitiva~~ ✅ D-014                                                                                      | 1        |
| ~~Fontes definitivas~~ ✅ D-022                                                                                     | 2        |
| ~~Player Card com foto~~ ✅ foto real, D-017                                                                        | 1        |
| ~~Estratégia de i18n~~ ✅ D-020                                                                                     | 2        |
| ~~Inventory no mobile~~ ✅ 1 por linha, D-044                                                                       | 3        |
| ~~Composição final do Player Status~~ ✅ Slice 01, D-039                                                            | 3        |
| Preferência de idioma em localStorage (sem sobrepor a URL)                                                          | futuro   |
| Desenho do monograma MC                                                                                             | 2        |
| Campaign XP: regras reais de pontuação (product exploration)                                                        | futuro   |
| Itens de navegação do header: Sobre / Projetos / Contato (D-054); Jornada volta com o conteúdo real do Campaign Log | 4        |
| Páginas dedicadas por case (`/projects/:slug`)                                                                      | 5+       |
| ~~Upgrade para Angular 22~~ ✅ Angular 22.2 + TypeScript 6.0, Node 24 (D-061)                                       | qualquer |
| Domínio próprio                                                                                                     | 9        |
