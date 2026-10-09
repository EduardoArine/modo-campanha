# 14 — Content Inventory (Home Slice 02, etapa 02-0)

> Status: **rascunho para aprovação de Eduardo.** Nada aqui está aprovado para publicação.
> Fonte: apenas fatos verificáveis no repositório, nos docs e no brief de Eduardo. Onde não há fonte: **PENDENTE (Eduardo)**, com perguntas.
> Legenda: **[FATO]** verificável no repositório/docs · **[RASCUNHO]** texto proposto, a aprovar ou reescrever · **[PENDENTE]** só Eduardo pode responder.

---

## 1. MC-001 — Modo Campanha

| Campo | Conteúdo | Base |
|---|---|---|
| Public name | **Modo Campanha** | [FATO] |
| Slug | `modo-campanha` | [RASCUNHO] |
| Serial | `MC-001` | D-040 |
| Origin | `personal` | D-040 |
| Classification | `public-approved` | D-040 |
| Publication status | **`review`** até esta ficha ser aprovada (depois `approved`) | regra conservadora |
| Short description (pt-BR) | "Portfólio profissional que apresenta a carreira de Eduardo como uma campanha de videogame." | [RASCUNHO] derivado de docs/01 |
| Short description (en) | "A professional portfolio that presents Eduardo's career as a video game campaign." | [RASCUNHO] |
| Project type (cartucho) | pt: **PORTFÓLIO INTERATIVO** · en: **INTERACTIVE PORTFOLIO** | [RASCUNHO] |
| Eduardo's role | pt: "Conceito, direção de produto e direção visual; desenvolvimento assistido por IA." · en: "Concept, product and visual direction; AI-assisted development." | [RASCUNHO] baseado no processo real do repositório; **confirmar como Eduardo quer descrever** |
| Technologies | Angular 21 · TypeScript · SCSS · Vitest · GitHub Actions / GitHub Pages | [FATO] package.json, workflow |
| Tags (até 2) | opções: **Produto** / Product · **Design system** · **Gamificação** / Gamification · **IA** / AI | [RASCUNHO] Eduardo escolhe 2 |
| Context | pt: "Um portfólio que não fosse um template genérico de desenvolvedor: a trajetória contada pela linguagem de videogames retrô, sem inventar personagem nem métricas ('XP real, sem personagem')." · en: "A portfolio that is not a generic developer template: the career told through retro video game language, without inventing a persona or metrics ('Real XP. No persona.')." | [RASCUNHO] derivado de docs/01 |
| Contribution | pt: "Definição do conceito e das regras de produto; aprovação de cada fase (concept, design system, componentes autorais, Home); conteúdo bilíngue; direção de um processo de desenvolvimento assistido por IA, com decisões registradas em log." · en: "Concept and product rules; approval of every phase (concept, design system, signature components, Home); bilingual content; direction of an AI-assisted development process with a recorded decision log." | [RASCUNHO] baseado em docs/10 (D-001…D-040) |
| Result / learning | Resultados verificáveis: **MC Design System** com contratos de contraste checados na compilação (D-025); site bilíngue pt-BR/en com troca em runtime (D-018/D-020); componentes autorais (MC-CART, CRT, Player Card). Aprendizados **candidatos** (confirmar se são aprendizados de Eduardo): validar tipografia no tamanho real (a pixel font perdeu legibilidade no "C", D-029); separar UI digital de objeto físico (D-024/D-032). | [RASCUNHO] |
| Public links | Repositório: `https://github.com/EduardoArine/modo-campanha` [FATO, público]. Site ao vivo: **nenhum ainda** (GitHub Pages não ativado) | [FATO] |
| Artwork requirement | 16:10, mín. 640 × 400; sugestão: motivo do próprio sistema (CRT/console MC-01 ou o futuro monograma MC). **Recomendo esperar o monograma MC** para não criar uma marca provisória dentro do cartucho | [RASCUNHO] |
| Publication restrictions | Nenhuma conhecida (projeto pessoal, repositório público). Não exibir o link do site enquanto ele não estiver publicado | [RASCUNHO] |
| Shell / accent (cartucho) | sugestão: `orange` / `special` (a cor da marca) ou `dark` / `warm` | [RASCUNHO] Eduardo escolhe |

Perguntas para fechar MC-001:

1. A descrição do papel ("desenvolvimento assistido por IA") está do jeito que você quer apresentar?
2. Quais 2 tags?
3. Os aprendizados candidatos são seus? Quer outros?
4. Shell/accent?

---

## 2. MC-002 — Paco: 23 Horas para a Última Vela

> Classificação **PUBLIC / OWNER REVIEW** (D-040). Além do título e de ser um projeto pessoal ligado a games (CLAUDE.md), **não há informação sobre o Paco no repositório.** Nada abaixo foi inventado; quase tudo está pendente.

| Campo | Conteúdo | Base |
|---|---|---|
| Public name | **Paco: 23 Horas para a Última Vela** (confirmar se há título em inglês ou se o título fica em português nos dois idiomas) | [FATO] título · [PENDENTE] versão en |
| Slug | `paco` ou `paco-23-horas-para-a-ultima-vela` | [RASCUNHO] |
| Serial | `MC-002` | D-040 |
| Origin | `personal` | D-040 |
| Classification | `public-owner-review` | D-040 |
| Publication status | **`review`** (só vira `approved` com a confirmação de direitos abaixo) | regra conservadora |
| Short description (pt-BR / en) | [PENDENTE] | — |
| Project type | [PENDENTE] (jogo? protótipo? conceito/roteiro? em desenvolvimento?) | — |
| Eduardo's role | [PENDENTE] (solo? equipe? quais funções?) | — |
| Technologies | [PENDENTE] (engine, linguagens, ferramentas) | — |
| Tags (até 2) | [PENDENTE] | — |
| Context | [PENDENTE] | — |
| Contribution | [PENDENTE] | — |
| Result / learning | [PENDENTE] (estágio atual: concept, protótipo jogável, publicado?) | — |
| Public links | [PENDENTE] (itch.io, vídeo, repositório público?) | — |
| Artwork requirement | 16:10, mín. 640 × 400. Fonte possível: arte existente do jogo **se** puder ser publicada; senão, artwork próprio | [PENDENTE] |
| Publication restrictions | [PENDENTE] o que **não** pode aparecer (lore, roteiro, arte de terceiros, materiais de colaboradores) | — |

Confirmações obrigatórias antes de `approved` (D-040):

- [ ] Eduardo tem direito de publicar os materiais selecionados.
- [ ] Não existe restrição de colaborador/parceiro.
- [ ] Os materiais escolhidos já podem ser mostrados publicamente.
- [ ] Lista exata do que será mostrado (texto, imagens, links): nem todo concept/lore/material é automaticamente publicável.

---

## 3. Skill Loadout: validação item a item

Regra (D-040): só publica se Eduardo puder **explicar o que significa, como usa e dar pelo menos um exemplo real**. Todos começam como `candidate`. A coluna "Evidência pública conhecida" mostra só o que já é verificável fora de trabalho interno; ela **não aprova** nada.

### BUILD

| Item candidato | Evidência pública conhecida | Pergunta / observação |
|---|---|---|
| Angular | Modo Campanha (Angular 21) | exemplo além deste repo? |
| C# / .NET | — (brief cita C#, .NET / ASP.NET Core) | exemplo publicável? (trabalho interno não pode ser detalhado) |
| REST APIs | — (brief) | exemplo publicável? |
| PostgreSQL / SQL Server | — (brief) | exemplo publicável? manter os dois juntos? |
| Docker | — (brief) | como usa? exemplo? |
| Application architecture | Modo Campanha: arquitetura por features, design tokens, CRT frame/viewer (D-037) | o termo representa seu trabalho além deste repo? |
| *(fora da lista)* TypeScript | Modo Campanha | estava no brief inicial; **incluir?** |

### PRODUCT

| Item candidato | Evidência pública conhecida | Pergunta / observação |
|---|---|---|
| Product thinking | Modo Campanha: docs de visão, roadmap, decision log | exemplo concreto em uma frase? |
| UX/UI collaboration | — | com quem/como colabora? exemplo publicável? |
| Prototyping & iteration | Modo Campanha: concepts e rodadas de refinamento (D-011, D-034) | sobrepõe "Game prototyping" e "AI prototyping": manter os três? |
| Design systems | Modo Campanha: MC Design System (docs/11) | exemplo além deste repo? |
| Product modeling | — | o que significa para você (modelagem de domínio? de regras de negócio?) e exemplo? |

### AI

| Item candidato | Evidência pública conhecida | Pergunta / observação |
|---|---|---|
| AI-assisted development | Modo Campanha: desenvolvimento assistido por IA (commits coassinados) | ok como exemplo público? |
| Coding agents | Modo Campanha (agente de código no fluxo) | sobrepõe "AI-assisted development": separar ou fundir? |
| Prompt/workflow design | — | exemplo? |
| Workflow automation | — | sobrepõe "Prompt/workflow design": separar ou fundir? exemplo? |
| AI prototyping | — | exemplo? |

### GAME DNA

| Item candidato | Evidência pública conhecida | Pergunta / observação |
|---|---|---|
| Game systems | — (formação em Jogos Digitais) | exemplo? (Paco?) |
| Gamification | — (brief; Comunidade On é interno) | exemplo publicável? |
| Interaction design | Modo Campanha (linguagem de interação do sistema) | exemplo além deste repo? |
| Progression & feedback | — | sobrepõe "Game systems"/"Gamification": manter? |
| Game prototyping | — | exemplo? (Paco?) |

Observações gerais:

- 21 itens candidatos; recomendo **publicar 4–5 por grupo**, só os que passarem na regra.
- Sobreposições a decidir: *prototyping* (3 variações), *AI-assisted development × coding agents*, *prompt/workflow design × workflow automation*, *game systems × progression & feedback*.
- Itens cuja única evidência é trabalho interno podem ser publicados como **capacidade** (sem detalhar o projeto interno), desde que Eduardo dê o exemplo real para si; a evidência "Visto em" só cita cartuchos aprovados.
- Traduções pt-BR dos itens (ex.: "Product thinking" fica em inglês?) a definir junto com a aprovação.
