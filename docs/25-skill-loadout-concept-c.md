# 25 — Arsenal de Habilidades: Concept C, Loadout Interativo (D-092)

> Status: **implementado na branch `feat/skill-loadout-concept-c`, aguardando a aprovação visual e funcional do Eduardo.** Sem merge e sem deploy.
> Substitui a composição aberta do Skill Loadout (02-B, D-043) pela **Concept C — Loadout Interativo**, escolhida pelo Eduardo. Conteúdo: o Skill Loadout v1 aprovado (D-041), sem nenhum item novo.

## 1. Direção

O Arsenal passa a ser a extensão da ficha do jogador: o visitante conhece o profissional no **Status do Jogador** e, logo abaixo, escolhe qual especialidade quer explorar. É linguagem de jogo para competências reais, não um RPG.

- Implementada a **Concept C**. As direções A e B não entram.
- A prancha é referência de hierarquia, proporção e linguagem. Onde ela diverge das regras do projeto, valem as regras (§8).

## 2. Integração com o Player Status (congelado, D-083)

O Player Status não foi alterado: nem o componente, nem os estilos, nem os textos. A integração é toda do lado do Arsenal.

- **Aproximação:** o Arsenal sobe por margem negativa (`space(4) − --mc-space-section`) e a seção perde o padding superior. Entre as duas molduras fica um vão de 16 px.
- **Moldura:** a mesma do Player Status (borda de acento, superfície `--mc-surface`, padding `space(4)`).
- **Engates:** dois blocos de 32 px (`space(6)`) atravessam o vão, com as laterais na borda de acento (`::before` e `::after` do painel). Eles comunicam "módulo encaixado na ficha". Ocupam exatamente o vão e não cobrem nenhuma das duas bordas.
- **Cabeçalho menor que o do Player Status**, para não virar outra seção dominante:
  - micro-label **LOADOUT DE ESPECIALIDADES** (en: SPECIALTY LOADOUT), em laranja;
  - título `h2` **ARSENAL DE HABILIDADES** (en: SKILL ARSENAL), no papel `title-m` em caixa alta;
  - frase "Selecione uma especialidade para explorar minhas principais habilidades." (en: "Select a specialty to explore my main skills.").
- **Âncora:** `#skill-loadout` mantida.

## 3. Especialidades

| Código pt / en | Nome pt                 | Nome en                 | Tom (`--mc-specialty-*`)   | Ícone     |
| -------------- | ----------------------- | ----------------------- | -------------------------- | --------- |
| CON / DEV      | CONSTRUÇÃO              | DEVELOPMENT             | `build` = laranja da marca | cubo      |
| PRD / PRD      | PRODUTO                 | PRODUCT                 | `product` = teal (D-014)   | prancheta |
| IA / AI        | INTELIGÊNCIA ARTIFICIAL | ARTIFICIAL INTELLIGENCE | `ai` = violeta suave       | chip      |
| DNA / GDN      | DNA DE GAMES            | GAME DNA                | `game` = coral discreto    | controle  |

- **Itens:** os 18 do Skill Loadout v1 (D-041), sem mudança.
- **Frase de cada especialidade** (`SkillGroup.description`): CON foi definida pelo Eduardo; PRD, IA e DNA são **propostas para revisão**.
- **Tons:** só diferenciam as categorias, sem significar status, nível ou raridade. O laranja segue dominante na estrutura (molduras, micro-labels, ação).
- **Sem descrições nos cards:** a prancha mostra uma descrição por tecnologia, mas não há texto aprovado para isso. Os cards levam só o nome e o pictograma (regra do pedido: sem alegações não documentadas).

## 4. Interação

- **Estado:** dois signals no componente:
  - `active` guarda a última especialidade escolhida e começa em CON;
  - `showAll` liga a visão completa.

  Os grupos são lidos de `SKILL_LOADOUT` (dados), então acrescentar ou mudar um item não mexe no componente.

- **Seleção:** clicar numa especialidade atualiza o seletor, o título (`CON — CONSTRUÇÃO`), a frase, a contagem real ("6 HABILIDADES") e os itens. Não recarrega nem rola a página; o foco fica no botão.
- **Ver todas as habilidades** (en: View all skills):
  - é uma ação de texto no cabeçalho, secundária aos seletores;
  - mostra os quatro grupos no mesmo painel, sem duplicar dados nem criar uma segunda seção;
  - nenhum seletor fica marcado nesse modo;
  - o botão passa a dizer **Voltar ao loadout** (en: Back to loadout), que recupera a última especialidade;
  - escolher uma especialidade também volta ao loadout.
  - um segundo **Voltar ao loadout** fica no fim da lista (no celular ela passa de 2.300 px). Como ele some ao voltar, o foco vai para o botão do cabeçalho, que fica visível.
- **Movimento:**
  - troca de painel com entrada só de opacidade (180 ms);
  - borda e fundo dos seletores em 160 ms;
  - nada em loop, nenhum deslocamento de conteúdo;
  - com movimento reduzido, tudo instantâneo (regra global de `_base.scss`).
- **Estabilidade de altura:** o painel mantém a altura entre especialidades em 1440 / 1280 (idêntica), 1024 (±1 px) e 820 (±3 px):
  - três colunas a partir de 768 px, em que 6 e 4 itens ocupam as mesmas duas linhas;
  - duas linhas de nome reservadas nos cards de 768 a 1199 px;
  - duas linhas de frase reservadas de 768 a 1023 px.

  No mobile a altura segue o número de itens (6 ou 4). Para reservar, seria preciso deixar ~140 px vazios nas categorias com 4 itens. A mudança acontece abaixo dos seletores, então nada acima deles se move.

## 5. Acessibilidade

- **Padrão:** botões nativos com `aria-pressed`, num `role="group"` rotulado "Especialidades" (en: Specialties), com `aria-controls` apontando para o painel.
  - **Por que não tabs ARIA:** na visão completa nenhuma especialidade fica selecionada, e tabs exigem uma aba sempre selecionada. Simular tabs incompletas violaria o padrão.
  - **Teclado:** Tab percorre o grupo e Espaço / Enter ativam; não há navegação por setas.
- **Ordem do Tab:** Ver todas → CON → PRD → IA → DNA, a mesma da leitura visual.
- **Nome acessível:**
  - **seletor:** o nome da especialidade; o código (CON etc.) e o ícone são decorativos (`aria-hidden`);
  - **"Ver todas":** troca o rótulo a cada estado.
- **Títulos:**
  - **uma especialidade:** `h3` (CON — CONSTRUÇÃO);
  - **visão completa:** um `h3` visualmente oculto ("TODAS AS HABILIDADES") e um `h4` por grupo.
- **Sem região viva:** a troca não gera anúncios automáticos. O conteúdo novo vem logo depois dos controles, na ordem de leitura.
- **Selecionado sem depender só da cor:** borda dupla no tom, fundo de painel, nome em texto principal e, com os quatro seletores numa linha (≥ 1024 px), um indicador triangular apontando para o painel. No 2 × 2 o indicador sai, porque apontaria para o seletor de baixo.
- **Foco:** o anel global (`--mc-focus-ring`, 2 px com folga de 2 px).
- **Contraste:** cada tom é validado no build sobre `bg`, `surface` e `panel` como texto (`$supported-pairs`).

## 6. Responsivo

| Largura   | Seletores                                          | Uma especialidade | Visão completa               |
| --------- | -------------------------------------------------- | ----------------- | ---------------------------- |
| ≥ 1200    | 4 numa linha, ícone à esquerda                     | 3 colunas         | 2 × 2 grupos, 2 colunas cada |
| 1024–1199 | 4 numa linha                                       | 3 colunas         | grupos empilhados, 2 colunas |
| 768–1023  | 2 × 2, ícone à esquerda                            | 3 colunas         | grupos empilhados, 2 colunas |
| < 768     | 2 × 2, nome em linha própria (sem quebrar palavra) | 1 coluna          | grupos empilhados, 1 coluna  |

- A ação "Ver todas" fica à direita do cabeçalho e desce para baixo da frase quando falta espaço.
- **Sem conteúdo só no hover:** em 360 px não há overflow horizontal, corte ou palavra quebrada.

## 7. Design system

- **Cores (revê a regra "Nenhum HEX novo" da D-014 / `docs/11` nesse ponto):** a pedido do Eduardo, a paleta ganha dois primitivos, só para a identidade das especialidades:
  - `violet-400` `#A393D9`;
  - `coral-400` `#E07A5F`.

  Semânticos: `specialty-build` (orange-500), `specialty-product` (teal-500), `specialty-ai` (violet-400) e `specialty-game` (coral-400). Os tons de laranja e teal já existiam.

- **Ícones:** 21 pictogramas pixel autorais (12 × 12, a 24 px, como os do Player Status, D-082): três de especialidade (o controle de DNA DE GAMES é o mesmo de ORIGEM) e um por habilidade. Não são logos de terceiros (Angular, Docker etc.), para manter a unidade visual e não depender de marcas.
- **CSS:** duas folhas no componente (`skill-loadout-section.scss` e `skill-loadout-board.scss`), dentro do orçamento de 4 kB por folha, sem estilos globais.

## 8. Divergências em relação à prancha

| Prancha                                                  | Implementação                                                        | Motivo                                                                       |
| -------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Uma moldura única envolvendo o Player Status e o Loadout | duas molduras unidas por engates                                     | o Player Status está congelado (D-083); envolvê-lo mudaria o componente      |
| Título "LOADOUT DE ESPECIALIDADES" com emblema           | micro-label + "ARSENAL DE HABILIDADES", menor que o do Player Status | pedido do Eduardo (§4 do briefing)                                           |
| Barra segmentada "LOADOUT ATIVO"                         | contagem real ("6 HABILIDADES")                                      | a barra leria como nível ou progresso (proibido)                             |
| Logos de tecnologia e descrições nos cards               | pictogramas autorais e só o nome                                     | unidade visual; descrições sem texto aprovado não entram                     |
| Faixa horizontal com setas no mobile                     | grade 2 × 2                                                          | as quatro especialidades à vista, sem conteúdo escondido nem rolagem lateral |
| Setas (›) nos itens do mobile                            | sem setas                                                            | os itens não são clicáveis; a seta prometeria uma ação inexistente           |

## 9. Validação

- **Funcional (Vitest e navegador):**
  - CON inicial; troca para PRD, IA e DNA e volta a CON;
  - ver todas e voltar, recuperando a última especialidade; escolher uma especialidade a partir da visão completa;
  - pt e en;
  - teclado (Tab, Espaço, Enter), com o foco preservado e sem rolagem.
- **axe:** sem violações (WCAG 2.2 AA e boas práticas) em 1440 pt e 390 en, nos dois modos.
- **Movimento reduzido:** animação e transições instantâneas; com movimento normal, 180 ms.
- **Capturas:** 1440, 1280, 1024, 820, 390 e 360 px, pt e en, nos cinco estados. Sem overflow horizontal.
- **Regressão contra a `main`:**
  - **Header, Hero, Player Status, Project Inventory, Diário de Campanha, Final Checkpoint e footer:** pixel a pixel idênticos em 1440 / 1024 / 820 / 390, pt e en, com o Arsenal oculto nas duas builds (as seções abaixo dele descem uma fração de pixel, o que muda a suavização do texto).
  - **Painel do Player Status com o Arsenal presente:** idêntico. Só muda a última linha da captura, abaixo da borda, onde começam os engates (arredondamento de sub-pixel).
