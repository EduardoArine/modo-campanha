# 14 — Content Inventory (Home Slice 02, etapa 02-0)

> Status: **conteúdo aprovado (D-041, D-042).** MC-001 `approved`; MC-002 `review`; Skill Loadout v1 aprovado; tags, artwork e cartucho do Paco definidos.
> Repositório público: este documento guarda só o conteúdo e o estado de publicação, nunca detalhes internos de revisão.
> Regra: só o que está marcado como aprovado vai para `src/app/data/`. Rascunhos e pendências não são publicados.

---

## 1. MC-001 — Modo Campanha (`publication: approved`)

| Campo | pt-BR | en |
|---|---|---|
| Public name | Modo Campanha | Modo Campanha |
| Slug | `modo-campanha` | |
| Serial | `MC-001` | |
| Origin | `personal` | |
| Publication | **`approved`** | |
| Short description | Portfólio profissional gamificado que transforma projetos, habilidades e aprendizados reais em uma campanha interativa. | A gamified professional portfolio that turns real projects, skills, and learnings into an interactive campaign. |
| Type (cartucho) | PORTFÓLIO INTERATIVO | INTERACTIVE PORTFOLIO |
| Role | Conceito, direção de produto, direção visual e desenvolvimento, com IA integrada ao workflow de implementação, validação e documentação. | Concept, product direction, visual direction, and development, with AI integrated into the implementation, validation, and documentation workflow. |
| Technologies | Angular · TypeScript · SCSS · Vitest · GitHub Actions / Pages | |
| Tags | Produto | Product |
| | Gamificação | Gamification |
| Learnings (aprovados) | Validar tipografia no tamanho real de uso. | Validate typography at actual usage sizes. |
| | Separar linguagem de interface digital da linguagem de objetos físicos. | Separate the visual language of digital interfaces from that of physical objects. |
| Learning candidato (case completo) | Construir e validar o Design System antes da Home reduziu retrabalho e ajudou a preservar a direção do concept na implementação. | Building and validating the Design System before the Home reduced rework and helped preserve the concept direction during implementation. |
| Public links | Repositório: `https://github.com/EduardoArine/modo-campanha` | idem |
| Site link | **não mostrar** enquanto o GitHub Pages não estiver publicado | |
| Cartucho | shell `orange` · accent `special` | |
| Artwork | **System Horizon Refined (aprovado, D-046)**: `assets/cartridges/mc-001-modo-campanha.png`, 640 × 400 (16:10) | |
| Artwork alt | Paisagem em pixel art de um sistema em construção, com módulos crescentes e um caminho segmentado levando a uma passagem iluminada. | Pixel-art landscape of a system under construction, with growing modules and a segmented path leading to an illuminated gateway. |
| Restrictions | nenhuma conhecida; nenhum link de site enquanto ele não existir | |

Traduções en dos learnings e do learning candidato: **aprovadas** (2026-10-09). O learning candidato fica fora do runtime até o case completo.

Campos de case ainda **não aprovados** (ficam fora do data até o case completo): contexto e contribuição (rascunhos da versão anterior desta ficha).

---

## 2. MC-002 — Paco: 23 Horas para a Última Vela (`publication: review`)

| Campo | pt-BR | en |
|---|---|---|
| Public name | Paco: 23 Horas para a Última Vela | Paco: 23 Horas para a Última Vela (**sem tradução oficial do título**) |
| Slug | `paco` | |
| Serial | `MC-002` | |
| Origin | `personal` | |
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
| Cartucho | shell `dark` · accent `warm` (revisável quando existir artwork real do Paco; sem significado de status/raridade) | |

Pendências antes de `approved`:

- [ ] confirmar solo ou equipe;
- [ ] confirmar links públicos;
- [ ] confirmar direito de publicação dos assets selecionados;
- [ ] definir a lista exata de material mostrado.

---

## 2-A. Catálogo de tags (D-042)

O tom pertence à **identidade da tag**, nunca à posição; estável entre projetos. Cor = só categorização visual (nunca importância, status ou proficiência).

| id | pt-BR | en | tone |
|---|---|---|---|
| `product` | Produto | Product | warm |
| `gamification` | Gamificação | Gamification | cool |
| `game-design` | Game Design | Game Design | warm |
| `prototyping` | Prototipagem | Prototyping | cool |

MC-001: `product`, `gamification` · MC-002: `game-design`, `prototyping`.

---

## 3. Skill Loadout v1 (aprovado)

Autoria: `candidate` / `approved` só neste documento. Runtime (`src/app/data/skills.data.ts`): **apenas as aprovadas, sem campo de status** (D-042). Sem percentual, rating, level, estrelas, rótulo de proficiência ou XP individual.

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

## 4. Conflitos com os models atuais: resolvidos (D-042)

| Ponto | Resolução |
|---|---|
| Textos (`title`, `summary`, `role`, `learnings`) | `Localized` |
| `type` × origem | `type: Localized` (texto do cartucho) + `origin: personal \| on-tech \| other` |
| `status` | removido (sem substituto; `stage` só com caso de uso real) |
| `year` | opcional, nunca inventado |
| `featured` | removido (sem comportamento) |
| `publication` | adicionado; só `approved` renderiza (teste obrigatório) |
| `approvals`, `classification`, `restrictions` | **fora do runtime e do repositório público** (processo privado) |
| `Cartridge` independente (`label`, `color`) | removido; `cartridge: { shell, accent, artwork? }` dentro do `Project`; serial no `Project` |
| Tags | catálogo tipado (`TagDefinition`: id, label, tone); projeto guarda até 2 ids |
| Skills | grupos `build/product/ai/game-dna`; `state` removido; nomes `Localized`; só aprovadas no runtime |
| Seção `skill-tree` | renomear para `skill-loadout` no 02-B |
| MC-001 artwork | aprovado e integrado (D-046); sem placeholder no Inventory público |
