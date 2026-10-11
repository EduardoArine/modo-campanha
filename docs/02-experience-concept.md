# 02 — Conceito de Experiência

Descrição conceitual de cada momento da onepage. Nada aqui é layout final: o visual é definido na FASE 1 (Visual Concept) e consolidado na FASE 2 (Design System).

Regra transversal: **a linguagem de jogo nunca pode atrapalhar o acesso ao conteúdo.**

---

## Boot / Intro

Entrada extremamente curta, como a tela de inicialização de um console.

```
INITIALIZING CAMPAIGN...
PLAYER FOUND
```

Em seguida, entra o Hero.

- Duração alvo: **≤ 1 segundo**.
- Nunca bloquear o conteúdo; deve poder ser pulada ou simplesmente não existir para quem prefere movimento reduzido.
- Não repetir de forma intrusiva em visitas seguintes (decisão futura).
- **Não implementado nesta fase.**

---

## Hero — Player Profile

Primeira tela. Apresenta o "jogador".

```
EDUARDO ARINE
Desenvolvedor de Produtos Digitais
IA • Produto • Desenvolvimento • Gamificação
```

Informações de status possíveis:

- XP: 10+ anos
- Quest atual: Comunidade On
- Origem: Tecnologia em Jogos Digitais
- Foco atual: IA aplicada ao desenvolvimento

CTAs:

- **Explorar campanha** (scroll para o conteúdo)
- GitHub
- LinkedIn
- Currículo (futuramente)

Frase: **XP real, sem personagem.**

Possibilidade futura: um pequeno **Player Card** com foto.

---

## Player Status

Substitui o tradicional "Sobre mim".

| Campo            | Valor                                |
| ---------------- | ------------------------------------ |
| PLAYER           | Eduardo Arine                        |
| CLASS            | Desenvolvedor de Produtos Digitais   |
| ORIGIN           | Tecnologia em Jogos Digitais         |
| XP               | 10+ anos em tecnologia               |
| CURRENT CAMPAIGN | Comunidade On                        |
| FOCUS            | IA aplicada ao desenvolvimento       |
| STATUS           | Construindo · Aprendendo · Evoluindo |

Inclui espaço para um **pequeno texto humano de apresentação**, escrito em primeira pessoa, sem jargão de jogo.

**Proibido:** barras de habilidade com percentuais (`Angular 95%`, `.NET 90%`).

---

## Skill Loadout (antes "Skill Tree", D-040)

As capacidades, conhecimentos e ferramentas que Eduardo leva para os projetos: **quatro módulos de capacidades, não quatro cards**. "Tree" foi abandonado porque sugeria progressão, níveis e unlocks.

- Grupos: **BUILD · PRODUCT · AI · GAME DNA** (códigos decorativos BLD · PRD · AI · GDN, sem numeração).
- Conteúdo: Skill Loadout v1 aprovado (D-041), bilíngue, em `src/app/data/skills.data.ts` (`SKILL_LOADOUT`).
- **Sem nenhuma graduação:** porcentagem, barras, estrelas, levels, XP por skill, rótulos de proficiência, ranking ou os antigos estados unlocked/evolving/core/exploring.
- Itens são conteúdo informativo (texto em lista), nunca chips, botões ou filtros.
- "Loadout informa. Inventory impressiona.": a seção é mais silenciosa que o Project Inventory.
- Futuro: "Visto em / Seen in" ligando skills a cartuchos reais.

---

## Project Inventory

Uma das seções principais. Projetos apresentados como **cartuchos de videogame antigos** em uma prateleira/inventário.

```
PROJECT INVENTORY
Cartuchos coletados durante a campanha.
```

Detalhamento completo em `docs/05-project-cartridge-system.md`.

Projetos candidatos (sujeitos a revisão, **sem conteúdo inventado**):

- Comunidade On
- ON Learning
- Dashboard Operacional
- Mural do Parceiro
- Paco: 23 Horas para a Última Vela
- futuros projetos pessoais

---

## Cartuchos e Console

Ao selecionar um projeto, o visitante tem a sensação de **inserir o cartucho em um videogame**:

1. cartucho selecionado
2. cartucho sobe da prateleira
3. desloca-se visualmente até o console
4. encaixa
5. LED do console acende
6. TV de tubo liga
7. pequena tela de boot
8. detalhes do projeto aparecem

Mensagens possíveis: `INSERT CARTRIDGE`, `LOADING CARTRIDGE...`, `NO SIGNAL`, `BOOTING...`

Duração alvo: **~500–800 ms**. **Implementado na FASE 5** (D-058, `docs/20-game-feel-01.md`) na versão simplificada "encaixe + boot": cartucho sobe, CRT liga, `LOADING CARTRIDGE...`, case.

---

## CRT Project Viewer

Os cases aparecem dentro de uma **TV de tubo retrô**, que funciona como visualizador.

Campos possíveis: PROJECT NAME, TYPE, ROLE, STACK, MISSION, MY ROLE, CHALLENGES, SOLUTION, RESULTS, LEARNINGS, SCREENSHOTS, LINKS.

- A estética CRT vive **principalmente na moldura**.
- Screenshots e textos precisam permanecer **totalmente legíveis**.
- Efeitos futuros muito sutis: scanlines, glow, leve distorção nas bordas, boot screen.
- **Nunca comprometer a visualização do trabalho.**

---

## Campaign Log

Substitui a timeline tradicional da carreira.

```
CAMPAIGN LOG
```

Uma **seleção de 4–6 checkpoints** da trajetória (não um currículo), cada um registrando o que mudou. Tipos (semântica do dado → rótulo de sistema, D-048):

- `origin` → **NEW GAME**: origem da jornada
- `checkpoint` → **CHECKPOINT**: mudança significativa
- `current` → **CAMPANHA ATUAL / CURRENT CAMPAIGN**: momento atual (curto)

"SKILL UNLOCKED" e "MAIN QUEST" saíram (proibição de "unlocked"; Main Quest é seção própria). Sem datas ou experiências inventadas. Plano em `docs/15-home-slice-03.md`.

---

## Achievements

**Evidências concretas** da trajetória, não badges (D-051). A linguagem de jogo é só enquadramento (código `ACH-0N`, painel de registros).

Regras:

- cada achievement nasce de um **fato verificável e aprovado**, com `evidence` obrigatório;
- precisa acrescentar algo **novo**: não repete Player Status, Skill Loadout, Inventory ou Campaign Log;
- sem medalhas, troféus, estrelas, raridade, score, XP, percentuais, streak, ranking ou "unlocked";
- 2–5 itens públicos (0 ou 1 → seção não aparece); nada de autopromoção exagerada;
- conquistas secretas possíveis via easter eggs na FASE 6 (`docs/08-easter-eggs.md`).

Os exemplos conceituais antigos (10 YEARS XP, GAME DEV ORIGIN, AI ADOPTER…) foram descartados: repetiam outras seções ou usavam linguagem de badge. Plano em `docs/16-home-slice-04.md`.

---

## Current Main Quest

Seção especial dedicada à **Comunidade On**.

```
CURRENT MAIN QUEST
STATUS: IN PROGRESS
```

Objetivo: mostrar a participação de Eduardo na construção e evolução da plataforma **sem expor informações confidenciais ou internas**.

Texto-base conceitual (a revisar):

> Participação na construção e evolução de uma plataforma digital desde suas fundações, conectando desenvolvimento, produto, experiência, automação e gamificação.

Implementação (D-055, `docs/18-home-slice-06.md`): direção **A — Quest Briefing** (título, papel, resumo e frentes de atuação, com `IN PROGRESS`). Conteúdo atual: **MOCK dev-only** ("Campanha de exemplo"); produção `null` até haver texto público aprovado. O texto-base acima continua conceitual e não é publicado.

---

## Side Quests

Projetos fora da atividade profissional principal:

- Paco
- game development
- concept art
- experimentos com IA
- interfaces experimentais
- projetos pessoais
- estudos

Direção **C — Side Quest Log** (D-056, `docs/19-home-slice-07.md`): linhas compactas (tipo · título · resumo) separadas por réguas finas, **sem cartucho**. Projetos completos e aprovados vão para o Project Inventory (MC-CART); side quests são mais leves (experimento, estudo, exploração). O MC-CART congelado não ganha variação para esta seção. Conteúdo atual: **MOCK dev-only**; produção vazia até haver conteúdo aprovado.

---

## Final Checkpoint

Fechamento da página (Home Slice 05, D-052; `docs/17-home-slice-05.md`). Direção **A — Save Point Editorial**: encerramento aberto, sem painel, objeto físico ou motion.

```
SAVE COMPLETE
■ CAMPAIGN CONTINUES...
Se quiser construir algo comigo ou trocar ideias sobre produto, IA, desenvolvimento
ou games, estes são os melhores lugares para me encontrar.
[ GitHub ↗ ]  [ LinkedIn ↗ ]
```

- **SAVE COMPLETE** é o único detalhe de sistema MC-01.
- Só destinos públicos aprovados: **GitHub** e **LinkedIn**, como ações equivalentes (`secondary`). Sem email, WhatsApp, formulário ou currículo enquanto não houver destino aprovado.
- **Footer** da Home logo abaixo: motto ("XP real, sem personagem.") e "© {ano} Eduardo Arine · Modo Campanha". Sem links, ícones ou linguagem de game.
- Descartados: "Ainda há muito XP para ganhar." (sugere XP inventado), a interação `CONTINUE? > YES` (videogame literal) e "No coins required" (arcade).
