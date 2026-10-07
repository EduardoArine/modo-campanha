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

## FASE 1 — VISUAL CONCEPT ⬜ ← próxima

- ⬜ Concept da home desktop
- ⬜ Hero
- ⬜ Player Status
- ⬜ Início do Project Inventory (cartuchos)
- ⬜ Aprovação da direção visual

> **NÃO desenvolver o layout final antes dessa aprovação.**

## FASE 2 — DESIGN SYSTEM ⬜

- ⬜ Cores (tokens, contraste AA)
- ⬜ Tipografia (pixel/display + leitura)
- ⬜ Spacing
- ⬜ Borders
- ⬜ Icons
- ⬜ Pixel assets
- ⬜ Buttons
- ⬜ Panels (HUD)
- ⬜ Cartridges
- ⬜ CRT

## FASE 3 — CORE EXPERIENCE ⬜

- ⬜ Hero
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

- ⬜ Textos finais
- ⬜ Projetos reais
- ⬜ Screenshots
- ⬜ Links (LinkedIn, email)
- ⬜ Currículo

## FASE 8 — QUALITY ⬜

- ⬜ Responsividade
- ⬜ Acessibilidade
- ⬜ SEO
- ⬜ Metadata (Open Graph, favicon próprio)
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
| Fontes e paleta definitivas            | 2    |
| Player Card com foto                   | 1    |
| Páginas dedicadas por case (`/projects/:slug`) | 3+ |
| Upgrade para Angular 22 (requer Node ≥ 22.22.3) | qualquer, antes da 3 |
| Domínio próprio                        | 9    |
