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

Duração alvo: **~500–800 ms**. **Não implementado nesta fase**; ver FASE 5 (Game Feel).

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

Checkpoints profissionais importantes, com tipos conceituais:

- `NEW GAME`: início de uma jornada
- `CHECKPOINT`: marco relevante
- `SKILL UNLOCKED`: nova competência
- `MAIN QUEST`: projeto/missão principal

Sem datas ou experiências inventadas. Estrutura pronta em `src/app/models/campaign-checkpoint.model.ts`.

---

## Achievements

Conquistas profissionais como **badges**. Exemplos conceituais (a validar):

| Badge           | Fato                                                   |
| --------------- | ------------------------------------------------------ |
| 10 YEARS XP     | Mais de uma década em tecnologia.                      |
| GAME DEV ORIGIN | Formação em Tecnologia em Jogos Digitais.              |
| ZERO TO PRODUCT | Participação na construção de produtos desde as bases. |
| AI ADOPTER      | IA aplicada ao fluxo de desenvolvimento.               |
| PRODUCT THINKING| Tecnologia além do código.                             |

Regras:

- cada conquista ligada a um **fato concreto**;
- nada de autopromoção exagerada;
- conquistas secretas possíveis via easter eggs (`docs/08-easter-eggs.md`).

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

Podem reutilizar o sistema de cartuchos com uma variação visual (a definir).

---

## Final Checkpoint

Fechamento da página.

```
CAMPAIGN CONTINUES...
Ainda há muito XP para ganhar.
```

Links: LinkedIn, GitHub, Email.

Interação possível:

```
CONTINUE?
> YES
```

Detalhe opcional no rodapé:

```
Built with Angular.
No coins required.
```
