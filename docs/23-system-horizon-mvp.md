# 23 — SYSTEM HORIZON: MVP interativo (proposta)

> Status: **PROPOSTA, aguardando aprovação do Eduardo** (D-069). Só arquitetura e experiência: nada implementado, nenhuma arte nova, nenhum fato novo. O teaser do CRT (D-068, `docs/22`) continua congelado.

## 1. Visão do produto

**SYSTEM HORIZON é o Campaign Log transformado em lugar.** O visitante caminha pela trajetória do Eduardo, para nos marcos e lê os fatos que já existem no portfólio, na ordem em que aconteceram. É "uma forma diferente de explorar uma carreira", não um jogo dentro do portfólio.

- **Não tem conteúdo próprio.** O jogo é uma **visão** sobre os dados aprovados (Campaign Log, Player Status, Skill Loadout, Project Inventory, Achievements, Current Main Quest, Final Checkpoint). Ele cuida de espaço, ritmo e interação; os fatos continuam em um único lugar.
- **Cresce sozinho.** Cada fato aprovado no site vira automaticamente um marco no mundo; fato não publicado não aparece (mesma regra da Home).
- **O teaser é o jogo comprimido.** Coletar BUILD, PRODUCT, AI e GAME DNA, formar o MC-CART e chegar ao mirante: o attract mode já mostra a forma da experiência, e o jogo cumpre essa promessa.
- **Tom:** curto, autoral, silencioso, profissional. Linguagem de sistema em inglês no mundo; conteúdo humano localizado (pt-BR/en).

## 2. Duração e escopo do MVP

- **3–5 minutos** para a primeira conclusão; ~1 minuto se o visitante só caminhar sem ler.
- **5 atos**, cada um com 1 checkpoint (obrigatório) e 1–4 marcos (opcionais). Na largura do mundo: ~160–240 px nativos por ato (2–3 telas).
- **Mecânicas:** andar (esquerda/direita), interagir, ler, coletar (4 grupos de skill), checkpoint. Nada mais.
- **Fora:** combate, inimigos, vida, game over, pulo/plataforma, puzzle, pontuação, XP, inventário além dos 4 slots, save, som.

## 3. Jornada do usuário

1. Na Home, em **Project Inventory**, o visitante insere o **MC-001** e o CRT mostra o case do projeto (comportamento atual, D-058).
2. No case, uma ação **Jogar SYSTEM HORIZON** leva à rota dedicada (§11).
3. **Tela de título:** o próprio attract mode roda ao fundo; o visitante escolhe Começar, Versão em texto ou Voltar.
4. **Como jogar:** uma tela curta (teclado ou toque, conforme o dispositivo), que pode ser pulada.
5. **ACT 01 → ACT 05:** caminhar, ler marcos, ativar checkpoints e coletar os quatro grupos.
6. **ACT 04:** os quatro itens convergem e formam o MC-CART MC-001 (a cena do teaser, agora conquistada); o case do projeto aparece.
7. **ACT 05 — HORIZON:** o mirante, o texto de encerramento, os links reais e CAMPAIGN CONTINUES...
8. **Saída:** Voltar ao portfólio retorna a `#project-inventory`, com o foco no MC-001. As alternativas são Jogar de novo e, no futuro, Epílogo.

## 4. Atos e checkpoints (fontes de dados reais)

Cada marco aponta para um dado que **já existe**; nenhuma frase é escrita para o jogo.

| Ato | Sentido | Checkpoint (obrigatório) | Marcos possíveis | Fonte |
|---|---|---|---|---|
| **01 — ORIGIN** | começo da campanha | NEW GAME: origem | entrada `origin` do Campaign Log; coleta **GAME DNA** | Campaign Log; Player Status `origin`; Skill Loadout `game-dna` |
| **02 — BUILD** | construir sistemas | CHECKPOINT | entradas `checkpoint` do período; coleta **BUILD** | Campaign Log; Skill Loadout `build` |
| **03 — EVOLVE** | de tecnologias para produtos | CHECKPOINT | entradas do período; coleta **PRODUCT** e **AI** | Campaign Log; Skill Loadout `product`, `ai` |
| **04 — CAMPAIGNS** | experiência → projeto → campanha → MC-CART | MC-CART formado | MC-001 (e futuros cartuchos publicados); campanha atual | Project Inventory; Player Status `currentCampaign`; Current Main Quest |
| **05 — HORIZON** | "até aqui foi a jornada" | mirante | encerramento + links | Final Checkpoint (`closing`, links sociais) |

- **Achievements** aprovados entram como marcos no ato do seu ano (só se tiverem `year`); sem badge.
- **Distribuição das entradas do Campaign Log entre os atos 02 e 03:** é uma decisão editorial do Eduardo, registrada só como referência (`act`) no mapa do mundo (§7).
- **A ordem de coleta difere do teaser.** O teaser segue BUILD → PRODUCT → AI → GAME DNA; no jogo, GAME DNA vem primeiro (formação). Se o Eduardo preferir outra associação entre skills e atos, é só ajustar o mapa.

## 5. Gameplay loop

```
ANDAR ──► aproximar de um marco ──► prompt "Enter: ler" (DOM)
  ▲                                   │
  │                                   ▼
  │                      painel de leitura (DOM, fatos reais)
  │                                   │ fechar
  │                                   ▼
  └── marco registrado ◄── (coleta: o item vai para o slot do HUD)
                                      │
                     checkpoint do ato ──► card do próximo ato ──► continua
```

- **Desbloquear contexto** = o checkpoint revela o resumo do ato e abre a passagem. Não é um portão difícil: basta interagir.
- Marcos opcionais ficam como "não lidos" (forma e texto, não só cor); dá para concluir sem ler tudo.
- O HUD é o do teaser: PLAYER 01, o ato atual e os 4 slots. Sem números.

## 6. Relação com os dados existentes (sem duplicação)

| Seção do site | Papel no jogo |
|---|---|
| **Campaign Log** | **fonte factual da trajetória**: checkpoints e marcos dos atos 01–03 (título, período, contexto, resumo) |
| Player Status | origem, campanha atual (só o nome, enquanto a Current Main Quest não existir) |
| Skill Loadout | os 4 coletáveis; ao coletar, o painel lista as skills aprovadas do grupo |
| Project Inventory | cartuchos do ato 04; o painel **reusa o case do projeto** (mesmo componente) |
| Current Main Quest | marco da campanha atual, quando houver texto público |
| Achievements | marcos datados, quando aprovados |
| Side Quests | fora do MVP (caminhos laterais no futuro) |
| Final Checkpoint | encerramento do ato 05 |

**Regra:** o jogo nunca guarda título, resumo nem período; guarda **referências** (`{ source: 'campaign-log', id }`) e posição no mundo. Em produção, uma referência a dado não publicado é ignorada; em desenvolvimento, os MOCKs já existentes (`fileReplacements`) alimentam o jogo, e as guardas de deploy continuam valendo.

## 7. Arquitetura técnica

**Rota dedicada** (`/system-horizon` e `/en/system-horizon`), página carregada sob demanda (chunk próprio; a Home não paga nada). O SPA fallback do GitHub Pages (`404.html`) já cobre deep links.

```
src/app/pages/system-horizon/          página (Angular): layout, DOM acessível, painéis, rotas
src/app/system-horizon/
  engine/    clock · renderer (viewport lógico variável) · sprite-sheet · loop (rAF + visibilidade + pausa)
  world/     assets · terrain (perfil por segmento) · entities · palette · art-loader · placeholder-art
  scenes/    scene (contrato) · attract (teaser, congelado) · campaign (jogo)
  control/   controller (intenção) · scripted (teaser) · input (teclado/toque/"ir ao próximo")
  content/   attract-content (teaser) · horizon-map (atos e marcos por referência) · resolve (referência → texto localizado, a partir de src/app/data)
```

**Modelo do mapa** (dados de layout; textos vêm das fontes):

```ts
type MilestoneSource =
  | { kind: 'campaign-log'; id: string }
  | { kind: 'skill-group'; id: SkillGroupId }      // coletável
  | { kind: 'project'; serial: string }            // cartucho
  | { kind: 'profile'; field: 'origin' | 'currentCampaign' }
  | { kind: 'current-quest' }
  | { kind: 'achievement'; id: string }
  | { kind: 'closing' };

interface HorizonMilestone {
  id: string;                 // estável, para URL/analytics futuro
  act: ActId;                 // 'origin' | 'build' | 'evolve' | 'campaigns' | 'horizon'
  role: 'checkpoint' | 'marker' | 'collectible';
  source: MilestoneSource;
  x: number;                  // posição no mundo (px nativos), relativa ao ato
}
```

- `resolve(milestone, locale)` devolve `{ title, period?, body, links? } | null` a partir dos dados publicados. Se o resultado for `null`, o marco some.
- **Rótulos de sistema** (ACT 01 — ORIGIN, CHECKPOINT, NEW GAME...) ficam no dicionário (`ui.systemHorizon`). Conteúdo humano vem sempre de `Localized`.
- **Estado do jogo** (`scenes/campaign.ts`): posição, ato atual, marcos lidos, slots coletados. Determinístico por passo, como o teaser, e testável sem canvas.
- **Ponte com a página:** a cena emite eventos (`near(milestone)`, `checkpoint(act)`, `collected(group)`, `completed`). A página traduz esses eventos em DOM: prompt, painel e anúncio para leitor de tela.

## 8. Reutilização do engine atual

| Peça | Situação | Ação |
|---|---|---|
| `engine/clock` | serve como está | reusar |
| `engine/sprite-sheet` | serve | reusar |
| `engine/renderer` | `VIEW` fixo em 160 × 120 | viewport passa a ser propriedade da instância (teaser continua 160 × 120); adicionar desenho espelhado (andar para a esquerda sem arte nova) |
| `world/assets`, `palette`, `art-loader` | servem | reusar; adicionar folhas/camadas do jogo |
| `world/trail` | perfil fixo do teaser | generalizar para `terrain` (perfil por segmento/ato); o teaser mantém o seu |
| `world/entities` | `Player` sem direção nem velocidade | adicionar `facing` e `vx` |
| `scenes/scene` | contrato step/draw/captions | reusar; jogo acrescenta eventos |
| `scenes/attract` | é o teaser | **não reusar como jogo**; reusar como **fundo da tela de título** e como a cena de convergência do ato 04 (mesma animação) |
| `control/controller` | `intent()` só devolve pose | evoluir para `{ move: -1 \| 0 \| 1, interact }`; o `ScriptedController` traduz o roteiro atual (teste garante o mesmo comportamento) |
| `content/attract-content` | específico do teaser | manter; jogo usa `horizon-map` + `resolve` |
| `system-horizon-screen` | componente da Hero (quad, playback) | manter na Hero; extrair só o laço comum (`engine/loop`) se o teaser continuar idêntico pixel a pixel |

As mudanças em peças do teaser (controller, renderer, trail) **só são aceitas com regressão zero**: os testes atuais do attract mode precisam passar e as capturas do teaser precisam ficar iguais.

## 9. Desktop e mobile

**Altura lógica fixa: 120 px** (toda a arte já é de 120). A largura lógica acompanha a proporção da área do jogo, entre 160 e 240 px. A câmera mostra mais ou menos mundo, sem mudar a escala da arte. O canvas usa escala inteira, e o resto da tela é DOM.

| Largura | Área do jogo | Escala | Layout |
|---|---|---|---|
| 1440 | 213 × 120 (16:9) → ~1065 × 600 | ×5 | jogo central; painel de leitura sobre a base do canvas; barra superior: voltar · ato · pausa · texto |
| 1024 | 213 × 120 → ~852 × 480 | ×4 | idem |
| 820 (retrato) | 160 × 120 (4:3) → ~640 × 480 | ×4 | jogo no topo; painel abaixo do canvas |
| 390 (retrato) | 160 × 120 → ~358 × 268 | ×2 render + redução suave (como o teaser) | jogo no topo; barra de toque; painel como folha inferior |
| celular em paisagem | 213 × 120 | escala inteira que couber | controles nos cantos, sobre a margem |

**Controles:**
- **Teclado:** ←/→ ou A/D para andar; Enter ou Espaço para interagir; Esc ou P para pausar. Atalhos para o próximo e o anterior marco: N e B (ou Tab dentro do jogo, a validar). Tudo dá para fazer só pelo teclado.
- **Toque, sem joystick:** uma barra inferior com três botões de 48 px:
  - **◀** (anda enquanto pressionado);
  - **Ler/Interagir** (só aparece perto de um marco);
  - **▶** (anda enquanto pressionado).

  Tocar num marco visível faz o personagem andar até ele. Um toque duplo em ▶ leva **ao próximo marco** (caminhada automática), que é o modo mais confortável no celular.
- **Gamepad:** fica para o futuro (a `Gamepad API` entra no `InputController` sem mudar a cena).

## 10. Acessibilidade

- **Conteúdo nunca fica só em pixels.** Todo texto profissional aparece em DOM: painel de leitura, card do ato, encerramento. O canvas é `aria-hidden`.
- **Versão em texto** (botão na tela de título e no menu de pausa) mostra a jornada inteira como lista ordenada, por ato. Ela é gerada pelos mesmos `resolve`, então nunca diverge. É o caminho principal para leitor de tela.
- **Área do jogo:** é focável, com nome e instruções (`aria-describedby`). Uma região `aria-live="polite"` anuncia o essencial: "Marco próximo: <título>. Enter para ler.", "ACT 02 — BUILD", "BUILD coletado".
- **Painel de leitura:** usa `<dialog>` modal, com foco no título, Esc para fechar e o foco voltando à área do jogo.
- **Movimento:** o movimento é sempre iniciado pelo visitante. Com `prefers-reduced-motion`:
  - o parallax é desligado;
  - as transições entre atos viram corte seco;
  - a convergência do MC-CART mostra direto o quadro-chave.
- **Pausa:** Esc/P e botão sempre visível; a pausa também é automática com a aba oculta.
- **Cor nunca é o único sinal:**
  - lido/não lido aparece com forma e com o texto "lido";
  - os slots mostram o ícone, além da borda;
  - o contraste do DOM segue os tokens, e o `_contrast.scss` continua valendo.
- **Toque:** alvos de pelo menos 44 px; nenhum gesto complexo.

## 11. Entrada e saída

| Opção | Prós | Contras |
|---|---|---|
| A. CRT do Inventory roda o jogo | contexto imediato | CRT pequeno, sem espaço para painéis e toque; mistura o jogo com a Home; sem URL |
| B. Rota dedicada | URL compartilhável, deep link, voltar do navegador, chunk isolado, analytics futuro por rota, manutenção separada | troca de página precisa de uma transição para não parecer "sair do site" |
| C. Fullscreen dentro da Home | imersão | sem URL, foco/scroll frágeis, Fullscreen API no iOS é limitada, a Home carrega o jogo |
| **D. Híbrida (recomendada)** | **o CRT do Inventory é a porta; o jogo vive em `/system-horizon`** | — |

**Recomendação D:**
1. **Inserir cartucho** continua igual: o CRT liga e mostra o case do MC-001.
2. O case ganha a ação **Jogar SYSTEM HORIZON**, que leva para `/system-horizon` (ou `/en/system-horizon`).

   Proposta mínima: um novo `kind` de link do projeto (por exemplo `experience`), renderizado pela lista de links que o case já tem. Isso evita mudar o layout congelado.
3. **Transição:** um corte de CRT curto, de ≤ 300 ms (sem transição com reduced motion), que entra na tela de título, onde o attract mode está rodando.
4. **Saída:**
   - **Voltar ao portfólio** leva a `/#project-inventory` e devolve o foco ao botão "Inserir cartucho" do MC-001.
   - O botão voltar do navegador faz o mesmo.
   - A barra superior mantém o idioma.
5. **Layout próprio da rota:** sem o header do site; uma barra fina com Voltar, o nome SYSTEM HORIZON, o ato atual, pausa, versão em texto e idioma.
6. **Futuro:** um link discreto no Final Checkpoint e deep link por ato (`?act=03`) para a versão em texto.

## 12. Wireflow

```
HOME
 └─ PROJECT INVENTORY
     └─ INSERIR CARTUCHO (MC-001) ──► CRT: case do MC-001 [D-058, sem mudança]
         └─ "Jogar SYSTEM HORIZON"
             ▼
/system-horizon ─ TÍTULO (attract mode ao fundo)
 ├─ Começar ──► COMO JOGAR (1 tela, pular) ──► JOGO
 ├─ Versão em texto ──► LISTA DA JORNADA (por ato) ──► Voltar
 └─ Voltar ao portfólio ──► /#project-inventory

JOGO
 ACT 01 ORIGIN ─► ACT 02 BUILD ─► ACT 03 EVOLVE ─► ACT 04 CAMPAIGNS ─► ACT 05 HORIZON
   │ em cada ato: card do ato → andar → [marco → painel] … → checkpoint → passagem
   │ ACT 04: 4 slots → convergência → MC-CART MC-001 → case do projeto
   │ Esc/P: PAUSA (continuar · versão em texto · recomeçar · sair)
   ▼
 HORIZON: mirante · encerramento + links · CAMPAIGN CONTINUES...
   ├─ Voltar ao portfólio ──► RETURN TO CAMPAIGN (/#project-inventory, foco no MC-001)
   ├─ Jogar de novo ──► TÍTULO
   └─ [futuro] Epílogo ──► mirante ao entardecer ──► CAMPAIGN CONTINUES...
```

## 13. MVP

1. Rota `/system-horizon` (pt/en), lazy, layout próprio, entrada pelo case do MC-001 e saída para o Inventory.
2. Tela de título (attract mode ao fundo), como jogar, pausa, versão em texto.
3. Cena `campaign` com 5 atos, terreno por segmentos, câmera, andar para os dois lados, interagir.
4. Mapa de marcos por referência + `resolve` a partir dos dados publicados (com MOCK em dev).
5. Painel de leitura acessível (`<dialog>`), card de ato, região viva, HUD com 4 slots, convergência do MC-CART no ato 04 (reuso do teaser), encerramento no ato 05.
6. Teclado + toque (◀ Ler ▶ e "próximo marco"); reduced motion; responsivo nas 4 larguras.
7. Testes da cena (determinística), do `resolve` (só publicados) e da página; Lighthouse da Home inalterado.

**Arte necessária para o MVP** (a produzir depois, no contrato da paleta de 16 cores):
- terreno em segmentos por ato, que podem ser variações do chão atual;
- marcador de marco (ex.: placa pequena) e de checkpoint, nos estados não lido e lido;
- o mesmo céu, montanhas e árvores (com repetição, se possível);
- o personagem definitivo.

**Pré-requisito de conteúdo:** sem o Campaign Log aprovado (03-0), os atos 01–03 ficam só com origem e skills. O jogo funciona, mas fica raso. Recomendação: **publicar o MVP só depois do Campaign Log real**.

## 14. Versões futuras

- **Epílogo pessoal** (§16).
- Side Quests como caminhos laterais opcionais.
- MC-002 e futuros cartuchos no ato 04.
- Achievements sem data.
- Gamepad.
- Progresso salvo na sessão.
- Deep link por ato.
- Som discreto (com controle).
- Analytics de etapas (só com decisão registrada).
- Konami/Secret Area (FASE 6).

## 15. Riscos

| Risco | Mitigação |
|---|---|
| Conteúdo de produção vazio (Campaign Log, Achievements, Current Quest) | lançar após 03-0; `resolve` ignora não publicados; MOCK só em dev |
| Virar "videogame" e crescer além de 5 min | escopo fechado (§2), sem mecânicas novas sem decisão |
| Mexer em peças congeladas (case do Inventory, engine do teaser) | mudança mínima (link `experience`); refactors só com regressão zero e capturas iguais |
| Leitor de tela e jogo em canvas | conteúdo 100% em DOM, versão em texto equivalente, região viva |
| Ergonomia no celular | ◀ Ler ▶ + "próximo marco"; validar em 390 cedo |
| Produção de arte (terreno longo, marcadores) | listar no contrato antes de implementar; placeholders técnicos até lá |
| Duplicação editorial | o mapa só guarda referências; teste falha se o mapa tiver texto |
| Epílogo expor vida pessoal | sem nomes, rostos ou fotos; opcional; aprovado à parte |

## 16. Epílogo pessoal (estudo, não implementar)

- **Momento:** depois do encerramento profissional. É um passo opcional e discreto: "continuar caminhando". Não bloqueia nem substitui o fim profissional.
- **Cena:** o mirante ao entardecer. Duas figuras humanas e três gatos sentados de costas, olhando o horizonte; o jogador chega e senta ao lado. A câmera para por poucos segundos.
- **Representação:** sem diálogo, sem nomes, sem rostos, sem fotos. Pequenas silhuetas na mesma pixel art; o carinho fica no gesto, não no texto.
- **Texto:** no máximo uma linha de sistema (por exemplo, CAMPAIGN CONTINUES..., já existente). Para leitor de tela, uma descrição neutra e aprovada pelo Eduardo.
- **Por que funciona com "XP real, sem personagem":** é um fato real, mostrado sem exposição. A carreira é uma parte da vida, não o todo.
- **Riscos:** soar piegas ou infantil (evitar corações, partículas e música) e expor a família (nenhum detalhe identificável).

## 17. Decisões que dependem do Eduardo

1. **Aprovar a direção:** jogo como visão dos dados (sem conteúdo próprio), 5 atos, loop andar → marco → ler → checkpoint.
2. **Entrada:** opção D (rota `/system-horizon` a partir do case), incluindo o novo `kind` de link no MC-001 (toca o Inventory congelado de forma mínima).
3. **Associação skills × atos:** GAME DNA no ato 01, BUILD no 02, PRODUCT e AI no 03 (ou outra).
4. **Distribuição das entradas do Campaign Log pelos atos**, quando o histórico real (03-0) for aprovado.
5. **Lançamento condicionado ao Campaign Log real**, ou um MVP inicial só com origem, skills, MC-001 e encerramento.
6. **Controles de toque:** ◀ Ler ▶ + "próximo marco" (sem joystick).
7. **Arte do MVP:** terreno por ato e marcadores (quem produz: PixelLab, artista ou pixel art no repositório como no §14 do `docs/22`).
8. **Epílogo:** se vai existir, quando, e a descrição textual pública.
