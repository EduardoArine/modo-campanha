# 03 — Arquitetura de Informação

O site é, inicialmente, uma **onepage**. O Angular Router já está configurado para permitir evolução futura (ex.: páginas dedicadas por case, `/projects/:slug`).

## Sequência da onepage

| #   | Seção              | Âncora (`id`)        | Componente                  | Responsabilidade                                                                            |
| --- | ------------------ | -------------------- | --------------------------- | ------------------------------------------------------------------------------------------- |
| 0   | Boot / Intro       | (sem âncora)         | futuro, em `core/`          | Entrada de ≤ 1 s. Nunca bloqueia o conteúdo.                                                |
| 1   | Player Profile     | `#hero`              | `HeroSection`               | Quem é Eduardo, em uma tela. Nome, classe, foco, frase central e CTAs.                      |
| 2   | Player Status      | `#player-status`     | `PlayerStatusSection`       | "Sobre mim" em formato de ficha de personagem + texto humano curto.                         |
| 3   | Skill Tree         | `#skill-tree`        | `SkillTreeSection`          | Competências em quatro grupos, sem percentuais.                                             |
| 4   | Project Inventory  | `#project-inventory` | `ProjectInventorySection`   | Projetos como cartuchos. Seleção abre o case no CRT Viewer.                                 |
| 4a  | CRT Project Viewer | (dentro do #4)       | `CrtProjectViewer`          | Exibe o case do cartucho selecionado. Componente interno, não é seção própria.              |
| 5   | Campaign Log       | `#campaign-log`      | `CampaignLogSection`        | Trajetória profissional em checkpoints.                                                     |
| 6   | Achievements       | `#achievements`      | `AchievementsSection`       | Conquistas baseadas em fatos concretos.                                                     |
| 7   | Current Main Quest | `#current-quest`     | `CurrentQuestSection`       | Destaque para a Comunidade On, sem informações confidenciais.                               |
| 8   | Side Quests        | `#side-quests`       | `SideQuestsSection`         | Projetos pessoais, games, experimentos e estudos.                                           |
| 9   | Final Checkpoint   | `#final-checkpoint`  | `FinalCheckpointSection`    | Encerramento, contato e links.                                                              |

A ordem é garantida por `src/app/pages/home/home-page.ts` e verificada em `home-page.spec.ts`. **Ao mudar a ordem, atualizar esta tabela e o teste.**

## Header (aprovado no Concept 03)

Não é uma seção, é a moldura fixa do site. Base 03-A:

- à esquerda: marca **Modo Campanha** (monograma MC quando existir, D-015);
- navegação por âncoras (itens exatos a definir na FASE 3; o 03-A usa Início / Jornada / Projetos, o 03-B usa 01 Início / 02 Projetos / 03 Sobre / 04 Contato);
- à direita: CTA **Currículo** (quando existir) e **seletor de idioma pt-BR / en** (D-018);
- opcional, do 03-B: chip de sistema discreto (ex.: `MC-01 · ONLINE`). Avaliar no design system; não inventar números de versão.

## Notas da FASE 1 sobre as seções

- **Hero:** visualmente, "MODO CAMPANHA" é o maior texto. Semanticamente, o `h1` deve continuar identificando Eduardo (ex.: `h1` = "Eduardo Arine", com "Modo Campanha" como marca/eyebrow, ou `h1` combinado). Decidir na FASE 3, pensando em SEO e leitores de tela.
- **Player Status (03-A):** Player Card (foto real) | Origin · XP · Current Campaign | Focus · Sobre a jornada · Estado atual. Grid em `docs/11`.
- **Project Inventory:** grade de cartuchos MC-CART com nome, tipo, descrição curta e 1–2 tags; detalhes no CRT Viewer.
- Todas as âncoras (`id`) permanecem iguais nos dois idiomas; só os textos mudam.

## Racional da ordem

1. **Hero → Player Status**: em segundos o visitante sabe quem é Eduardo.
2. **Skill Tree antes dos projetos**: dá contexto de repertório antes da prova.
3. **Project Inventory no meio da página**: é o coração do portfólio; fica cedo o suficiente para quem tem pressa.
4. **Campaign Log → Achievements → Current Quest**: a história e os marcos, culminando no presente.
5. **Side Quests**: o lado autoral/pessoal, depois do profissional.
6. **Final Checkpoint**: contato.

> A posição exata de Skill Tree vs. Project Inventory pode ser revista na FASE 1. Registrar em `docs/10-decisions.md` se mudar.

## Navegação

- Âncoras com scroll nativo (`withInMemoryScrolling({ anchorScrolling: 'enabled' })`).
- Header fixo aprovado no Concept 03 (ver acima). Indicador de "fase atual" da página pode ser avaliado no design system.
- Toda navegação deve funcionar por teclado.

## Evolução futura possível

- `/en`: versão em inglês da mesma onepage (**implementada**, D-020; pt-BR na raiz). Âncoras iguais nos dois idiomas.
- `/projects/:slug`: página dedicada por case (compartilhável).
- `/secret`: área secreta (ver `docs/08-easter-eggs.md`), se fizer sentido.
- Currículo em PDF linkado.
