# 14 — Content Inventory (Home Slice 02, etapa 02-0)

> Status: **conteúdo aprovado por Eduardo em 2026-10-09 (D-041).** MC-001 `approved`; MC-002 `review`; Skill Loadout v1 aprovado.
> Regra: só o que está marcado como aprovado vai para `src/app/data/`. Rascunhos e pendências não são publicados.

---

## 1. MC-001 — Modo Campanha (`publication: approved`)

| Campo | pt-BR | en |
|---|---|---|
| Public name | Modo Campanha | Modo Campanha |
| Slug | `modo-campanha` | |
| Serial | `MC-001` | |
| Origin | `personal` | |
| Classification | `public-approved` | |
| Publication | **`approved`** (aprovado por Eduardo Arine, 2026-10-09, ficha completa) | |
| Short description | Portfólio profissional gamificado que transforma projetos, habilidades e aprendizados reais em uma campanha interativa. | A gamified professional portfolio that turns real projects, skills, and learnings into an interactive campaign. |
| Type (cartucho) | PORTFÓLIO INTERATIVO | INTERACTIVE PORTFOLIO |
| Role | Conceito, direção de produto, direção visual e desenvolvimento, com IA integrada ao workflow de implementação, validação e documentação. | Concept, product direction, visual direction, and development, with AI integrated into the implementation, validation, and documentation workflow. |
| Technologies | Angular · TypeScript · SCSS · Vitest · GitHub Actions / Pages | |
| Tags | Produto | Product |
| | Gamificação | Gamification |
| Learnings (aprovados) | Validar tipografia no tamanho real de uso. | Validate typography at its real usage size. |
| | Separar linguagem de interface digital da linguagem de objetos físicos. | Separate digital interface language from physical object language. |
| Learning candidato (case completo) | Construir e validar o Design System antes da Home reduziu retrabalho e ajudou a preservar a direção do concept na implementação. | Building and validating the Design System before the Home reduced rework and helped preserve the concept's direction during implementation. |
| Public links | Repositório: `https://github.com/EduardoArine/modo-campanha` | idem |
| Site link | **não mostrar** enquanto o GitHub Pages não estiver publicado | |
| Cartucho | shell `orange` · accent `special` | |
| Artwork | 16:10, mín. 640 × 400; **ainda não definido** (recomendação anterior: aguardar o monograma MC). Até lá: placeholder "PROJECT ARTWORK" | |
| Restrictions | nenhuma conhecida; nenhum link de site enquanto ele não existir | |

Traduções en dos learnings e do learning candidato: **rascunho** (as versões pt-BR foram as aprovadas; confirmar o inglês).

Campos de case ainda **não aprovados** (ficam fora do data até o case completo): contexto e contribuição (rascunhos da versão anterior desta ficha).

---

## 2. MC-002 — Paco: 23 Horas para a Última Vela (`publication: review`)

| Campo | pt-BR | en |
|---|---|---|
| Public name | Paco: 23 Horas para a Última Vela | Paco: 23 Horas para a Última Vela (**sem tradução oficial do título**) |
| Slug | `paco` | |
| Serial | `MC-002` | |
| Origin | `personal` | |
| Classification | `public-owner-review` | |
| Publication | **`review`** (não renderiza) | |
| Short description | Projeto autoral de jogo 2D em pré-produção, unindo game design, prototipagem e direção visual para transformar conceitos em sistemas jogáveis. | An original 2D game project in pre-production, combining game design, prototyping, and visual direction to turn concepts into playable systems. |
| Type (cartucho) | JOGO 2D EM PRÉ-PRODUÇÃO | 2D GAME IN PRE-PRODUCTION |
| Role | Concepção, game design, direção visual e prototipagem. | Concept, game design, visual direction, and prototyping. |
| Technologies / pipeline | Unity · 2D prototyping · sprite / pixel-art production pipeline | |
| Tags | Game Design | Game Design |
| | Prototipagem | Prototyping |
| Context | Desenvolvimento de um jogo autoral em que gameplay, personagens, cenários e leitura visual são definidos primeiro em pré-produção antes da conversão para assets finais. | Development of an original game in which gameplay, characters, environments, and visual readability are defined in pre-production before conversion into final assets. |
| Contribution | Definição de sistemas de gameplay, exploração de personagens e cenários, prototipagem de movimentos e organização de um pipeline visual pensado para futura implementação no jogo. | Definition of gameplay systems, character and environment exploration, movement prototyping, and organization of a visual pipeline designed for later game implementation. |
| Learning | Validar silhueta, escala, leitura de gameplay e modularidade antes de investir em arte final. | Validate silhouette, scale, gameplay readability, and modularity before investing in final art. |
| Public link | nenhum informado | |
| Artwork | somente material do projeto **explicitamente selecionado e aprovado** para publicação | |
| Cartucho | shell / accent: **pendente** | |

Pendências antes de `approved`:

- [ ] confirmar solo ou equipe;
- [ ] confirmar links públicos;
- [ ] confirmar direito de publicação dos assets selecionados;
- [ ] definir a lista exata de material mostrado.

---

## 3. Skill Loadout v1 (aprovado)

Todos com `status: approved`. Sem percentual, rating, level, estrelas, rótulo de proficiência ou XP individual.

| Grupo | pt-BR | en |
|---|---|---|
| **BUILD** | Angular | Angular |
| | TypeScript | TypeScript |
| | C# / .NET | C# / .NET |
| | REST APIs | REST APIs |
| | PostgreSQL / SQL Server | PostgreSQL / SQL Server |
| | Docker | Docker |
| **PRODUCT** | Pensamento de produto | Product thinking |
| | Colaboração UX/UI | UX/UI collaboration |
| | Prototipação e iteração | Prototyping & iteration |
| | Design systems | Design systems |
| **AI** | Desenvolvimento assistido por IA | AI-assisted development |
| | Agentes de desenvolvimento | Coding agents |
| | Design de prompts e workflows | Prompt & workflow design |
| | Automação de workflows | Workflow automation |
| **GAME DNA** | Sistemas de jogo | Game systems |
| | Gamificação | Gamification |
| | Design de interação | Interaction design |
| | Prototipação de jogos | Game prototyping |

Fora da v1 (podem voltar se um case real justificar a distinção): Application architecture · Product modeling · AI prototyping · Progression & feedback.

Ideia futura (não implementar): **Visto em / Seen in**, skill → serial de projeto.

---

## 4. Conflitos com os models atuais (resolver em 02-A e 02-C)

Os models de `src/app/models/` são da FASE 0. `PROJECTS` e `SKILL_GROUPS` **ainda não são usados por nenhum componente**, então a evolução não quebra nada visível.

| Model | Conflito | Proposta |
|---|---|---|
| `Project.title`, `summary`, `role`, `learnings` | `string` | `Localized` (pt-BR/en) |
| `Project.type` | enum `ProjectType` ('professional', 'personal'…) mistura **origem** com **tipo impresso** | `type: Localized` (texto do cartucho) + `origin: 'personal' \| 'on-tech' \| 'other'` |
| `Project.status` (`in-progress`…) | não pedido; confunde com `publication` | remover; estágio vai no `type` (ex.: "EM PRÉ-PRODUÇÃO") |
| `Project.year`, `featured` | obrigatórios; não definidos nas fichas | opcionais |
| `Project.publication`, `classification`, `approvals`, `restrictions`, `tags` | inexistentes | adicionar (D-040) |
| `Cartridge` (`label`, `color`, `art`, `serial`) | `color` livre e `label` não existem no MC-CART aprovado | `shell` + `accent` + `artwork?` (`{ src, alt: Localized }`); serial vai para o `Project` |
| Tags | sem `tone`; as fichas não definem warm/cool | **decidir** tom de cada tag (sugestão: 1ª `warm`, 2ª `cool`; cor = categorização, não importância) |
| `SkillGroupId` | `engineering / product / ai / game-design` | `build / product / ai / game-dna` + `code` + `title: Localized` |
| `Skill.state` (`unlocked / evolving / core / exploring`) | **proibido** (D-040) | remover; adicionar `status: 'candidate' \| 'approved'` (só `approved` renderiza) |
| `Skill.name` | `string` | `Localized` |
| `skills.data.ts` | conteúdo do brief inicial (lista antiga) | substituir pelo Skill Loadout v1 |
| Seção `skill-tree` | componente, âncora, teste de ordem e dicionário (`SKILL TREE`) | renomear para `skill-loadout` / `SKILL LOADOUT` (docs/03, home-page.spec) |
| MC-001 artwork | `approved` sem artwork: o cartucho público mostraria o placeholder "PROJECT ARTWORK" | **decidir**: publicar com placeholder até existir a arte, ou produzir a arte antes do 02-D |
