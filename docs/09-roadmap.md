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

### Próximos sprints ⬜

- ⬜ Player Card (foto real, D-017)
- ⬜ MC-CART System (shells preto, creme, grafite, laranja)
- ⬜ CRT
- ⬜ XP (XP profissional vs. Campaign XP, D-021)
- ⬜ Motion
- ⬜ Easter Egg Language
- ⬜ Responsive behavior
- ⬜ Accessibility
- ⬜ i18n / content behavior (regras de conteúdo; infraestrutura pronta)
- ⬜ Monograma MC (símbolo, favicon, loading, selo)
- ⬜ Pixel assets

## FASE 3 — CORE EXPERIENCE 🟡 ← atual (planejamento)

### Home Slice 01 ✅ APPROVED (D-039; `docs/12-home-slice-01.md`)

- ✅ 01-0 preparação · ✅ 01-A header · ✅ 01-B Hero content · ✅ 01-C Hero desktop (**APPROVED**)
- ✅ 01-D tablet + mobile · ✅ 01-E Player Status · ✅ 01-F revisão

Backlog:

- ⬜ **Hero CRT Screen Artwork**: arte da tela do CRT do Hero como asset próprio (a sensação de tela vazia não se resolve com mais objetos na cena)
- ⬜ **Mobile Navigation**: definir quando as seções reais de destino existirem (a ausência atual não é o comportamento final)
- ⬜ Revisar o equilíbrio visual do Player Card após a entrada da fotografia real do Eduardo
- ⬜ Bloco "Sobre a jornada" no Player Status (quando houver texto aprovado)

### Home Slice 02 🟡 (plano aprovado, D-040; `docs/13-home-slice-02.md`)

- ✅ 02-0 content inventory (D-041, D-042) · ✅ 02-A Skill Loadout data · ✅ 02-B Skill Loadout visual (**APPROVED**) · ✅ 02-C Project model (**APPROVED**, local até o 02-C.5) · 🟡 02-C.5 MC-001 artwork (direção **System Horizon APPROVED**, D-045; B2 ◆ em revisão) · ⬜ 02-D/E Inventory · ⬜ 02-F revisão

- ✅ Infraestrutura de i18n (pt-BR / en, troca em runtime) — adiantada na FASE 2
- ⬜ Header (logo, navegação, seletor de idioma)
- ⬜ Wordmark MODO CAMPANHA + monograma MC em SVG (Pixelify não imita o logo do concept)
- ⬜ Hero (H1 semântico = Eduardo Arine, D-026)
- ⬜ Papel tipográfico `stat-value` para números reais (ex.: `10+`)
- ⬜ Player Status
- ⬜ Skill Tree (inclui decisão sobre estados das skills)
- ⬜ Project Inventory
- ⬜ CRT Viewer

## FASE 4 — CAREER CONTENT ⬜

- ⬜ Campaign Log
- ⬜ Achievements
- ⬜ Current Quest
- ⬜ Side Quests
- ⬜ Final Checkpoint

## FASE 5 — GAME FEEL ⬜

- ⬜ Microinterações
- ⬜ Cartridge insert (500–800 ms)
- ⬜ CRT boot
- ⬜ Boot / Intro (≤ 1 s)
- ⬜ Progress
- ⬜ Hover states
- ⬜ Transitions
- ⬜ Decisão: CSS vs. Angular animations vs. biblioteca

## FASE 6 — SECRETS ⬜

- ⬜ `???`
- ⬜ Secret Area
- ⬜ Konami Code. **Decisão pendente: qual o efeito?**
- ⬜ Achievement secreto

## FASE 7 — CONTENT ⬜

- ⬜ Textos finais em pt-BR **e** en
- ⬜ Foto real do Eduardo para o Player Card
- ⬜ Projetos reais
- ⬜ Screenshots
- ⬜ Links (LinkedIn, email)
- ⬜ Currículo

## FASE 8 — QUALITY ⬜

- ⬜ Responsividade
- ⬜ Acessibilidade
- ⬜ SEO bilíngue (`hreflang`, `<html lang>` dinâmico, avaliar prerender)
- ⬜ Metadata (Open Graph, favicon próprio a partir do monograma MC)
- ⬜ Performance
- ⬜ Lighthouse
- ⬜ Redução de movimento
- ⬜ Teclado

## FASE 9 — RELEASE ⬜

- ⬜ GitHub Pages (ativar e publicar)
- ⬜ Domínio opcional no futuro
- ⬜ Adicionar ao LinkedIn
- ⬜ Iniciar posts do Modo Campanha (cartuchos como peças de social)

---

## Decisões futuras em aberto

| Tema                                   | Fase |
| -------------------------------------- | ---- |
| Efeito do Konami Code                  | 6    |
| Localização do `???` / Secret Area     | 6    |
| Estados das skills (uso e critérios)   | 3    |
| Abordagem de animação                  | 5    |
| ~~Paleta definitiva~~ ✅ D-014         | 1    |
| ~~Fontes definitivas~~ ✅ D-022        | 2    |
| ~~Player Card com foto~~ ✅ foto real, D-017 | 1 |
| ~~Estratégia de i18n~~ ✅ D-020        | 2    |
| Inventory: 2 cartuchos por linha no mobile? | 3/8 |
| Composição final do Player Status (4/4/4 vs. 3/4/5) | 3 |
| Preferência de idioma em localStorage (sem sobrepor a URL) | futuro |
| Desenho do monograma MC                | 2    |
| Campaign XP: regras reais de pontuação (product exploration) | futuro |
| Itens de navegação do header           | 3    |
| Páginas dedicadas por case (`/projects/:slug`) | 3+ |
| Upgrade para Angular 22 (requer Node ≥ 22.22.3) | qualquer, antes da 3 |
| Domínio próprio                        | 9    |
