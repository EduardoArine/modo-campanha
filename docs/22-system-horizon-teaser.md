# 22 — SYSTEM HORIZON: teaser do CRT da Hero (attract mode)

> Status: **TEASER TÉCNICO APPROVED e FROZEN** (D-068, 2026-10-12): engine, roteiro, timings, pause/play, parada após 3 voltas, `prefers-reduced-motion`, responsivo e arquitetura do attract mode. Não alterar sem regressão objetiva. **Toda a arte integrada** (cenário §12, personagem provisório §13, pickups/HUD/MC-CART §14); **aguardando validação conjunta do Eduardo**. Pendência: versão definitiva do personagem (~12 × 24).

## 1. Conceito

O CRT da Hero mostra um pequeno teaser em pixel art que explica, sem texto longo, por que o CTA diz **Explorar campanha**:

> experiência → progresso → conquista → projeto/campanha

O jogador (o avatar do Eduardo) caminha por uma trilha inspirada no SYSTEM HORIZON, coleta quatro experiências (BUILD, PRODUCT, AI, GAME DNA), elas se juntam e formam o **MC-CART MC-001** (CAMPAIGN UNLOCKED) e ele chega a um mirante diante do horizonte (CAMPAIGN CONTINUES...).

O teaser é o **attract mode** (modo demonstração) do futuro SYSTEM HORIZON: uma cena real do jogo, conduzida por roteiro. O jogo completo troca o roteiro pelo input do visitante, sem refazer engine, mundo nem arte (§5, §9).

**Não é:** um jogo na Hero, combate, inimigos, pontuação, HUD carregado, RPG medieval, cyberpunk ou estética infantil. O final da experiência completa (encontrar a esposa e os três gatos) **não** aparece no teaser.

## 2. Decisões (D-068)

| Tema | Decisão |
|---|---|
| HUD | **PLAYER 01 + 4 slots de inventário**. Sem "XP 10+" nem qualquer pontuação: os "10+ anos" seguem como dado profissional da página, não mecânica do jogo. |
| Jogador | Figura humana pequena representando o Eduardo: cabelo escuro, óculos, roupa escura, silhueta simples; sem retrato detalhado. Avatar do jogador no SYSTEM HORIZON, não persona profissional fictícia. |
| Linguagem de sistema | en: PLAYER 01, BUILD, PRODUCT, AI, GAME DNA, CAMPAIGN UNLOCKED, MC-001, SYSTEM HORIZON, CAMPAIGN CONTINUES...; pt (desde D-084): JOGADOR 01, CONSTRUÇÃO, PRODUTO, IA, DNA DE GAMES, CAMPANHA LIBERADA, A CAMPANHA CONTINUA... (vêm do dicionário, `ui.systemHorizon`). Controles de interface localizados: *Pausar demonstração / Pause demo*, *Reproduzir / Play*. |
| Texto na tela | Sempre texto real (IBM Plex) sobre o canvas, nunca desenhado nos pixels (i18n, D-029: Pixelify troca "C" por "O"). |
| Pausa | Ícone pause/play pequeno no canto inferior do visual, nome acessível localizado, foco visível; parada automática depois de **3 voltas** (WCAG 2.2.2). |
| Loop | ~7 s, 12 fps. O CRT **liga** (linha que se abre) só no primeiro play da página; as voltas seguintes reiniciam com **2 quadros de interferência**, sem tela preta nem flash. |
| Estático | `prefers-reduced-motion` e pausado mostram o **quadro-chave oficial**: os quatro itens formando o MC-CART + CAMPAIGN UNLOCKED + MC-001. |
| Arquitetura | `src/app/system-horizon/` com `engine/`, `world/`, `scenes/`, `control/`, `content/` (§5). |
| Arte | Produzida externamente a partir da §4. Até lá, placeholders técnicos com a mesma geometria. |

## 3. Roteiro técnico (implementado)

Resolução nativa **160 × 120** (4:3), **12 fps**, **84 ticks** (7,0 s). Determinístico: o estado de cada tick só depende do roteiro (`scenes/attract.ts`).

| Ticks | Tempo | Cena |
|---|---|---|
| 0–3 | 0,00–0,33 s | **Boot (só no 1º play):** tela escura, linha horizontal se abre (1 → 3 → 12 → 40 px). |
| 4–8 | 0,33–0,75 s | Cartão **MC-01 / SYSTEM HORIZON** (texto). |
| 9 | 0,75 s | Cena aparece; jogador no início da trilha (x 12). |
| 0–1 | — | **Voltas seguintes:** cena já montada + 2 quadros de interferência (linhas finas, 50%). |
| 10–47 | 0,8–4,0 s | Caminhada (2,5 px/tick, ciclo de 4 quadros a 6 fps). HUD: PLAYER 01 + 4 slots. |
| 23 · 29 · 35 · 41 | ~1,9–3,4 s | Coletas BUILD · PRODUCT · AI · GAME DNA: brilho (3 quadros), rótulo (4 ticks), item voa ao slot (3 ticks). |
| 48–51 | 4,0–4,3 s | Os quatro saem dos slots e convergem para o centro (80, 52). |
| 52–57 | 4,3–4,8 s | Formação do MC-CART (6 quadros). |
| 54–62 | 4,5–5,2 s | **CAMPAIGN UNLOCKED** + **MC-001**. |
| **58** | 4,8 s | **Quadro-chave oficial** (estático). |
| 60–63 | 5,0–5,3 s | O MC-CART vai para o HUD (canto superior direito). |
| 60–69 | 5,0–5,8 s | Subida até o mirante (x ≥ 128). |
| 64–74 | 5,3–6,2 s | **SYSTEM HORIZON**. |
| 70–83 | 5,8–7,0 s | Jogador olhando o horizonte. |
| 75–83 | 6,25–7,0 s | **CAMPAIGN CONTINUES...** |
| 84 → 0 | 7,0 s | Nova volta (interferência curta). Depois da 3ª volta: pausa no quadro-chave. |

Câmera: segue o jogador (x − 56), limitada a 0–80 (mundo de 240 px). Parallax: céu 0 · montanhas 0,25 · árvores 0,5 · chão 1.

## 4. Especificação dos assets (para produção externa)

### 4.0 Regras gerais

- **Resolução nativa:** tudo desenhado para a tela de **160 × 120**. Um pixel de arte = um pixel nativo; a engine amplia em múltiplos inteiros. Não entregar versões ampliadas.
- **Formato:** PNG (de preferência indexado). **Alfa binário** (0 ou 255): sem semitransparência, sem antialiasing, sem sombras suaves.
- **Paleta (D-068, revisada em 2026-10-12):** uma **única paleta de 16 cores**, compartilhada por **todas** as camadas finais (cenário, personagem, pickups, MC-CART). Ela é **derivada da identidade cromática do Modo Campanha**: **laranja, creme, grafite e frios complementares** continuam sendo as âncoras, mas a cena pode usar **tonalidades próprias** (por exemplo, vermelhos e roxos do pôr do sol) para preservar atmosfera e legibilidade. Não é exigida correspondência literal com os tokens do site quando isso degradar o visual. A paleta foi extraída das quatro camadas finais do cenário (§12) e é **a paleta oficial** para personagem, pickups e MC-CART: `design/source/system-horizon/sh-palette.gpl`.

  `#393455` `#c6805c` `#f04e1c` `#b43831` `#f1ba8c` `#3c372e` `#693548` `#51909a` `#264f5e` `#040403` `#312726` `#162637` `#21191b` `#fdba3f` `#f8761a` `#715313` (recalculada com cenário + personagem em §13)

  Referência de âncoras (tokens) que orientaram a paleta:

  | Âncora | Hex (token) | Papel na cena |
  |---|---|---|
  | laranja | `#f28c28` (orange-500), `#ffb357`, `#c96a1b` | sol, trilha, luz quente lateral |
  | creme | `#f3e9d2` (cream-100), `#d7cbb5` | brilhos, pele, PRODUCT |
  | grafite | `#2b2521` (ink-800), `#14110f` | carcaça do MC-CART, roupa, solo |
  | frios | `#1f3a4a` (petrol-800), `#3fa7a3` (teal-500) | céu alto, lago, montanhas, AI |

  Nada de neon, saturação extra ou gradiente suave.
- **Área segura:** a tela 4:3 aparece num vidro de proporção ~1,24 : 1, então até **~6 px de cada lado** podem ser cortados. Nada importante fora de **x 8–152**. Topo **y 4–18** é do HUD; faixas onde aparecem textos (centros em y 26–30 e 60; MC-001 no quadro-chave, ver §12) devem continuar legíveis com uma etiqueta sólida por cima.
- **Sem texto na arte.** Os textos são DOM (dicionário).
- **Folhas de sprites:** quadros do mesmo tamanho, em grade, **sem espaçamento**, lidos da esquerda para a direita e de cima para baixo. O tamanho do arquivo = colunas × largura do quadro por linhas × altura.
- **Pivot:** coordenada dentro do quadro que a engine posiciona no ponto do mundo (pés do jogador, centro do item etc.).
- **Nomenclatura:** `sh-<grupo>-<nome>.png`, minúsculas, kebab-case, exatamente como na tabela. Runtime em `public/assets/system-horizon/`; arquivos-fonte (Aseprite/PSD) em `design/source/system-horizon/`.
- A especificação também está no código (`world/assets.ts`); trocar placeholders pela arte = carregar estes arquivos, sem mudar a cena.

### 4.1 Cenário em camadas

| Arquivo | Tamanho | Parallax | Alfa | Conteúdo |
|---|---|---|---|---|
| `sh-bg-sky.png` | 160 × 120 | 0 (fixo) | não (opaco) | Céu ao pôr do sol, **sol central** (centro ~x 78, y 79, raio ~10), horizonte em y ~88, lago com reflexo abaixo. **Aprovado** (master em `design/source/system-horizon/`). |
| `sh-bg-mountains.png` | 180 × 120 | 0,25 | sim | Cordilheira distante: picos altos só nas laterais (topo ~y 57–75), **vale central aberto** (nada acima de y 88 entre x 60 e 116, para o sol ficar livre em qualquer câmera), **base no horizonte (y 92)**, transparente abaixo. **Aprovado** via harmonização técnica do master (§12). |
| `sh-bg-trees.png` | 200 × 120 | 0,5 | sim | Pinheiros com luz quente lateral, alturas variadas (y ~61–116), **abertura central** (x 62–134 abaixo de y ~95) que deixa ver o lago e o reflexo do sol. **Aprovado**. |
| `sh-bg-ground.png` | 240 × 120 | 1 | sim | Chão + **trilha**. A borda superior da trilha segue **exatamente** o perfil abaixo; abaixo dela, terreno escuro. Pedras, vegetação e a placa no platô (x ~180–230); corpo do chão **opaco até a borda inferior**. **Em regeneração externa** (opção A, §12; guia em `design/source/system-horizon/sh-bg-ground-guide.png`). |

Perfil da trilha (x, y dos pés), interpolação linear (`world/trail.ts`):

`(0, 104) → (100, 102) → (112, 98) → (122, 90) → (128, 86) → (240, 86)`. O **mirante** é o platô a partir de x 128.

Os itens flutuam 12 px acima da trilha em x **47, 62, 77, 92** (y ≈ 90–92): manter essa faixa limpa (grama/pedras no máximo ~6 px acima da trilha entre x 40 e 100; ~12 px no resto).

### 4.2 Eduardo (jogador)

**(Revisado em §13: quadro 16 × 24, pivot 8,23, figura ~12–13 × 23–24.)** Contrato original: silhueta de **~10 × 14 px** dentro de um quadro **16 × 16**, voltado para a direita. Sinais: **cabelo escuro, óculos** (1–2 px de reflexo teal), **roupa escura** (grafite), pele cream-300; sem rosto detalhado. Contorno legível sobre a trilha laranja e o chão escuro.

| Arquivo | Quadro | Quadros | Layout | Pivot | Animação |
|---|---|---|---|---|---|
| `sh-player-idle.png` | 16 × 24 | 2 | 2 × 1 (32 × 24) | 8, 23 (pés) | respiração sutil, 1 px; troca a cada 6 ticks |
| `sh-player-walk.png` | 16 × 24 | 4 | 4 × 1 (64 × 24) | 8, 23 | contato · passagem · contato (perna oposta) · passagem; 6 fps |
| `sh-player-look.png` | 16 × 24 | 2 | 2 × 1 (32 × 24) | 8, 23 | parado no mirante olhando o horizonte (3/4 de costas ou perfil, cabeça levemente erguida), respiração 1 px; troca a cada 8 ticks |

### 4.3 Experiências coletáveis

`sh-items.png`: quadros **8 × 8**, **8 quadros** em grade **2 × 4** (16 × 32), **pivot 4, 4**. Linha = item, coluna 0 = base, coluna 1 = brilho (1–2 px).

| Linha | Item | Ícone (aprovado) | Cor sugerida |
|---|---|---|---|
| 0 | BUILD | `</>` | orange-500 |
| 1 | PRODUCT | card simples de interface | cream-100 |
| 2 | AI | nós conectados | teal-500 |
| 3 | GAME DNA | d-pad | gold-400 |

Legíveis em 8 × 8, sem contorno grosso; o mesmo quadro base aparece na trilha, voando e dentro do slot.

### 4.4 Efeito de coleta

`sh-collect-fx.png`: quadros **12 × 12**, **3 quadros** em **3 × 1** (36 × 12), **pivot 6, 6**. Brilho curto e elegante: cruz pequena → cruz maior → pixels dispersos. Pixels de 1 px, sem glow, sem anel grande. Um único efeito para os quatro itens.

### 4.5 Slot do HUD

`sh-hud-slot.png`: quadros **10 × 10**, **2 quadros** em **2 × 1** (20 × 10), **pivot 0, 0**. Quadro 0 vazio (borda cream-500), quadro 1 preenchido (borda orange-500). Interior **8 × 8 livre**: o ícone do item é desenhado por cima, centrado (5, 5). Quatro slots em x 109, 120, 131, 142, y 6.

### 4.6 Mini MC-CART (HUD)

`sh-cart-mini.png`: **12 × 15**, **1 quadro**, **pivot 0, 0**. Fica no canto superior direito (x 140, y 4) depois do desbloqueio. Silhueta do MC-CART oficial (D-065) simplificada: shell grafite, acentos laranja, rótulo com os quatro quadrados. Redesenhar nesse tamanho (não reduzir a versão grande).

### 4.7 Formação do MC-CART

`sh-cart-form.png`: quadros **24 × 30**, **6 quadros** em **6 × 1** (144 × 30), **pivot 12, 15** (centro), posicionado em (80, 52).

| Quadro | Conteúdo |
|---|---|
| 0 | contorno do cartucho |
| 1 | carcaça grafite + topo laranja |
| 2 | rótulo (área petrol) |
| 3 | dois dos quatro quadrados acesos |
| 4 | os quatro quadrados acesos (= os quatro itens) |
| 5 | completo, com 1–2 px de brilho (**quadro-chave oficial**) |

Os quatro itens chegam em (80 ± 3, 52 ± 3): os **quatro quadrados do glifo** devem ficar nesses quadrantes do rótulo, para a transição item → quadrado ser contínua. O glifo é o *system/hardware glyph* (D-065), não logotipo.

### 4.8 Reuso de quadros

- Passagens do walk (quadros 1 e 3) podem ser o mesmo desenho; o quadro 2 pode espelhar as pernas do 0.
- `look` reaproveita pernas/tronco do `idle`; muda cabeça e postura.
- O quadro base de cada item (coluna 0) serve para trilha, voo, slot e convergência.
- `sh-cart-form` quadro 5 é também o quadro-chave estático; o mini MC-CART é o mesmo desenho, redesenhado em 12 × 15.
- **Sem asset:** CRT ligando, interferência, scanlines, vinheta e textos (tudo em código/CSS).

### 4.9 Lista de entrega

| # | Arquivo | Tamanho do arquivo |
|---|---|---|
| 1 | `sh-bg-sky.png` | 160 × 120 |
| 2 | `sh-bg-mountains.png` | 180 × 120 |
| 3 | `sh-bg-trees.png` | 200 × 120 |
| 4 | `sh-bg-ground.png` | 240 × 120 |
| 5 | `sh-player-idle.png` | 32 × 24 |
| 6 | `sh-player-walk.png` | 64 × 24 |
| 7 | `sh-player-look.png` | 32 × 24 |
| 8 | `sh-items.png` | 16 × 32 |
| 9 | `sh-collect-fx.png` | 36 × 12 |
| 10 | `sh-hud-slot.png` | 20 × 10 |
| 11 | `sh-cart-mini.png` | 12 × 15 |
| 12 | `sh-cart-form.png` | 144 × 30 |

Mais os arquivos-fonte editáveis e a paleta final (`.gpl` ou `.ase`) em `design/source/system-horizon/`. Peso esperado: < 20 KB no total.

## 5. Arquitetura

```
src/app/system-horizon/
  engine/    clock.ts (passo fixo 12 fps) · renderer.ts (160 × 120, escala inteira) · sprite-sheet.ts
  world/     assets.ts (especificação §4) · trail.ts (mundo e perfil) · entities.ts · palette.ts · placeholder-art.ts
  scenes/    scene.ts (contrato) · attract.ts (o teaser)
  control/   controller.ts · scripted-controller.ts (roteiro; o jogo terá input)
  content/   attract-content.ts (os 4 coletáveis e o MC-001)
  attract-playback.ts       estado play/pause, boot único
  system-horizon-screen.ts  canvas + textos do dicionário; não conhece a Hero
```

- Engine, mundo, cena e controle são TypeScript puro (sem Angular). Só a tela e o estado de reprodução usam signals.
- **Placeholders → arte final:** criar o carregador dos PNGs de `ASSET_BASE` com o mesmo formato `Art` (sheets + layers) e usá-lo no lugar de `createPlaceholderArt`. Cena, roteiro e tela não mudam.
- As cores dos placeholders vêm de tokens semânticos lidos em runtime (`--mc-*`); o código não carrega cores próprias.

## 6. Integração na Hero

- `features/hero/hero-scene.*`: fundo aprovado (D-067) + tela do SYSTEM HORIZON + controle de pausa. O layout, os textos, os CTAs e a imagem da Hero não mudaram.
- O palco tem a proporção da imagem mostrada e é recortado pela moldura como um `object-fit: cover`, então a tela usa coordenadas da própria imagem: vidro do CRT na fonte 1672 × 941 em x 1157–1473, y 151–405. Desde D-080, a caixa da tela é **x 1152–1477, y 151–405** (folga lateral para cobrir o tubo transparente; no recorte mobile, x 524–849 de 941). O cartucho cobre o canto inferior esquerdo do vidro e, como a imagem fica na frente, recorta a tela sozinho.
- **Ângulo da TV:** o vidro da foto é um quadrilátero (a TV está levemente girada: topo 161 → 151, base 400 → 405). A tela recebe os cantos (`HERO_CRT_GLASS`, input `quad`) e é projetada em perspectiva com `matrix3d` (`screen-quad.ts`), recalculado no resize; canvas e textos seguem o mesmo plano. Desde D-080, a tela fica **atrás** da imagem (tubo transparente), e o aro recorta cantos e cartucho, sem `--screen-radius` nem `clip-path` na Hero. Ao trocar a imagem de fundo, medir de novo os quatro cantos e o furo (`docs/21` §8.2 K e §9).
- A tela 4:3 cobre o vidro (~1,24 : 1) cortando as laterais (área segura, §4.0).
- Scanlines (CSS): faixas suaves alinhadas às 120 linhas nativas, com densidade de 120/60/40/30 pela largura da tela e pela densidade de pixels, para não formar faixas irregulares (D-079, `docs/21` §8.1). Engine, roteiro e timings intactos.
- **Carregamento:** chunk próprio (~13,7 KB, ~5,8 KB gzip), só depois do `load`, no idle + 1 s. Antes disso, o tubo transparente mostra a TV desligada (D-080), e o teaser entra ligando o CRT.
- **Execução:** canvas nativo, redesenho só quando o tick muda (12/s); pausa fora da viewport e com a aba oculta; para sozinho após 3 voltas.
- **Textos pequenos:** em telas de CRT menores que 220 px (mobile/tablet) somem os secundários (PLAYER 01, rótulos dos itens) e ficam as mensagens principais.

## 7. Acessibilidade

- Tela decorativa (`aria-hidden`): a mensagem está no texto da Hero.
- Controle de pausa: `button` com ícone, `aria-label` localizado (Pausar demonstração / Reproduzir; Pause demo / Play), foco visível padrão, alvo 32 × 32, fora da área com máscara. Único elemento interativo da cena.
- `prefers-reduced-motion`: começa pausado no quadro-chave; reproduzir é escolha do visitante. Se a preferência mudar durante a reprodução, pausa.
- Parada automática em 3 voltas (~21 s) + pausa a qualquer momento (WCAG 2.2.2).

## 8. Performance (Lighthouse 12, mediana de 3, build de produção)

| Servidor | Antes (D-067) | Com o teaser |
|---|---|---|
| HTTP/2 + TLS, mobile | 85 · LCP 3780 ms | **85** · LCP 3780 ms |
| HTTP/2 + TLS, desktop | 99 · LCP 770 ms | **99** · LCP 790 ms |
| HTTP/1.1 local, mobile | 80 · LCP 4271 ms | **81** · LCP 4271 ms |
| HTTP/1.1 local, desktop | 99 · LCP 879 ms | **99** · LCP 900 ms |

Carregar só no idle não bastou (o chunk ainda caía na janela do LCP simulado: −1 ponto, +150 ms); com `load` + idle + 1 s o teaser sai do caminho crítico.

## 9. Evolução para o SYSTEM HORIZON jogável

1. **Arte final** (§4) substitui os placeholders.
2. **InputController** (teclado/toque) ao lado do `ScriptedController`; a cena do jogo (`scenes/campaign.ts`) usa o mesmo mundo, sprites e câmera.
3. **Conteúdo real:** os coletáveis passam a vir de dados aprovados (skills, projetos, Campaign Log), nunca inventados.
4. **Rota própria** (carregada sob demanda); a Hero continua importando só o attract mode.
5. **Final pessoal** (esposa e três gatos): só na experiência completa, com representação e publicação decididas pelo Eduardo.

## 10. Pendências

- Produção da arte (§4.9) e integração conforme §11.
- ~~Strings `ui.boot`~~: removidas (2026-10-12, autorizado pelo Eduardo; busca global sem usos, testes e builds verdes). O boot agora é o cartão MC-01 / SYSTEM HORIZON do teaser.

## 11. Integração dos assets finais (próxima etapa)

Regras do Eduardo (2026-10-12):

- **A arte se adapta ao contrato aprovado**: preservar exatamente dimensões, pivots e layout das folhas (§4, `world/assets.ts`). Não redesenhar a animação, o roteiro nem os timings para acomodar a arte.
- **Ordem de validação:**
  1. **Cenário** (`sh-bg-*`, 4 camadas) **+ personagem** (`sh-player-*`): integrar, capturar e validar com o Eduardo; pickups e MC-CART continuam placeholders.
  2. Só depois: **pickups** (`sh-items`, `sh-collect-fx`, `sh-hud-slot`) e **MC-CART** (`sh-cart-mini`, `sh-cart-form`).
- Antes de integrar, conferir cada PNG: tamanho exato do arquivo (§4.9), alfa binário, paleta (§4.0), área segura.
- Integração = carregador dos PNGs de `ASSET_BASE` com o mesmo formato `Art`, por grupo (o que não chegou continua placeholder). Cena, controle, tela e Hero não mudam.
- **Fora de escopo:** o SYSTEM HORIZON jogável, merge em `main` e deploy.

## 12. Rodada do cenário (2026-10-12)

Masters aprovados como direção visual (SKY, MOUNTAINS, TREES, GROUND v1). Decisões do Eduardo:

| Camada | Estado | Tratamento |
|---|---|---|
| SKY | **Aprovado** | Só técnico: resolução nativa, alfa, paleta compartilhada. |
| MOUNTAINS | **Aprovado** (harmonização técnica do master) | Altura reduzida mais no centro que nas laterais (fator vertical `0,55 + 0,33·t^1,3`: 0,55 no centro → 0,88 nas bordas, ancorado na base), base movida para y 92 (horizonte), transparente abaixo; alfa binário; paleta compartilhada. Sem arte nova, se continuar limpo na integração. |
| TREES | **Aprovado** | Só técnico. |
| GROUND | **Em regeneração externa** | **Opção A:** trecho inicial praticamente plano (y 102–104 até x 100), subida suave até y 86 em x 128 e platô (mirante) até o fim; mesma estética, mesma placa, sem novos objetos; corpo opaco até a borda inferior. **Sem warp, stretch nem deformação** na arte final (a prévia deformada foi só referência de posição). Guia: `sh-bg-ground-guide.png`. O perfil congelado (`world/trail.ts`) **não muda**. |

**Pipeline técnico de integração (todas as camadas):**

1. **Resolução nativa** com amostragem pela cor predominante de cada bloco (sem média, preserva os pixels nítidos).
2. **Alfa binário** (limiar 128; os masters vêm com alfa 224–254 no conteúdo).
3. **Harmonização** específica (só MOUNTAINS, parâmetros acima).
4. **Paleta compartilhada de 16 cores** extraída das camadas finais juntas (k-means), aplicada a todas; registrada em §4.0.
5. **Validação:** sobreposição com o parallax real (câmera 0, 40, 80), perfil da trilha por cima, nenhum vazamento do lago sob o chão, sol livre, área segura.

**Quadro-chave × sol central:** o sol da arte fica no centro e não se move. Está autorizado ajustar **só a posição da legenda HTML "MC-001"** no quadro-chave para não cobrir o sol (por exemplo, acima do cartucho, sob CAMPAIGN UNLOCKED). Ajuste específico do teaser, feito na integração com a arte e validado em captura; não reabre o layout da Hero nem muda engine, timings ou roteiro.

**Ordem:** os masters atuais **não** entram como arte final até o novo GROUND chegar; então o cenário inteiro é integrado de uma vez (com a paleta única), validado com o personagem e só depois seguem pickups e MC-CART (§11).

Fontes: `design/source/system-horizon/` (`sh-bg-sky-master.png`, `sh-bg-mountains-master.png`, `sh-bg-trees-master.png`, `sh-bg-ground-master.png`, `sh-bg-ground-guide.png`, `sh-palette.gpl`; GROUND v1 e v2 em `archive/` como referência).

**Ao receber o novo GROUND:** reduzir para 240 × 120, alfa binário, paleta compartilhada, validar contra o perfil congelado (sobreposição com a linha da trilha) e verificar que o lago não vaza por baixo do chão.

**GROUND v2 (2026-10-12) — validação:** 1774 × 887 (2:1), corpo opaco até a borda (sem vazamento do lago), placa no platô. Na integração ele desce **16 px nativos** (só translação vertical). Com isso, o trecho plano (x 0–110) e o platô (a partir de x ~165, y ~86–87) coincidem com o perfil. **Reprovado só na rampa:** a subida da arte vai de x ~110 a ~165 (813–1220 px no master); o perfil sobe de x 100 a 128 (739–946 px). No mirante (x 132) a trilha desenhada fica em y ~95 e o personagem pisa em y 86, ou seja, ~9 px no ar. Pedido para a próxima versão: **só encurtar e antecipar a rampa** (de ~739 a ~946 px, ≈ 118 px de altura no master); manter todo o resto. Guia: `sh-bg-ground-v2-ramp-fix.png`; master em `archive/sh-bg-ground-master-v2.png`. Nada integrado.

**GROUND v3 (2026-10-12) — APROVADO e integrado:** rampa de x ~100 a ~135, platô a partir daí. Na integração desce **14 px nativos** (translação vertical, sem deformar). Assim os pés ficam dentro da faixa da trilha no trecho plano e rentes ao topo no mirante (x 132) e no platô. Resta uma folga de 2–4 px só na subida (x 112–127, ~4 quadros), aceitável no tamanho da tela. O corpo é opaco até a borda e o lago não vaza. Master: `sh-bg-ground-master.png`.

**Cenário integrado (2026-10-12):** as quatro camadas (`public/assets/system-horizon/sh-bg-{sky,mountains,trees,ground}.png`, ~20 KB no total) passaram pelo pipeline acima e compartilham a paleta oficial de 16 cores (§4.0). São carregadas por `world/art-loader.ts` (`FINAL_LAYERS` em `world/assets.ts`) antes de a tela ficar pronta, sem troca visível de placeholder para arte final. Se algum arquivo falhar, aquela camada continua placeholder. **Personagem, pickups e MC-CART seguem placeholders** (§11: próximo passo é o personagem). A legenda **MC-001** do quadro-chave saiu de cima do sol e foi para o lado do cartucho, em (96, 52), alinhada à esquerda. É a única mudança na cena; engine, timings e roteiro estão intactos. Lighthouse (HTTP/2) inalterado: mobile 85, desktop 99.

## 13. Personagem provisório (2026-10-13)

Arte do personagem aprovada pelo Eduardo (19 quadros: walk 8, look 7, idle 4) chegou em escala maior que o contrato (figura ~24 × 47 em quadros de 68 × 68 / 80 × 80). Decisões:

- **Escala:** o quadro do personagem passa de 16 × 16 para **16 × 24, pivot 8,23** (só dados das folhas em `world/assets.ts`; engine, roteiro e timings intactos). Na cena de 160 × 120 a figura com ~23 px fica proporcional aos pickups e não briga com o horizonte (a escala inteira dominava a tela; a do contrato original virava borrão).
- **Versão provisória:** redução automática 2:1 dos quadros aprovados (cor predominante por bloco 2 × 2, mesma grade e janela por animação para não tremer), pés na linha 23 e centro da animação em x 8. Perde olhos e parte do contorno; **será substituída** pela arte definitiva em ~12 × 24 (PixelLab ou artista), sem mudar o contrato.
- **Quadros usados** (contagens e ritmo congelados): walk = master 1, 3, 5, 7 (contato · passagem · contato · passagem, 6 fps); idle = master 1, 3; look = master 3, 7 (parado, olhando para cima). Os 19 quadros ficam em `design/source/system-horizon/player/` (`sh-player-{walk,look,idle}-master-N.png`) para a versão definitiva e para o jogável.
- **Paleta:** a paleta única foi **recalculada com cenário + personagem** (a anterior não tinha teal, pele nem tons claros); cenário requantizado sem mudança visível relevante. Total: 16 cores; `sh-palette.gpl` atualizado.
- **Rótulos dos itens** (BUILD, PRODUCT, AI, GAME DNA) subiram de 24 para **30 px** acima da trilha, para não cobrir a cabeça.
- **Integração:** `FINAL_SHEETS` (idle, walk, look) carregadas por `world/art-loader.ts` junto com o cenário; placeholder do personagem continua como fallback, já no quadro 16 × 24. Total de arte final no runtime: ~22 KB. Lighthouse (HTTP/2) inalterado: mobile 85, desktop 99.
- **Próximo:** validação do Eduardo (cenário + personagem); depois, pickups (`sh-items`, `sh-collect-fx`, `sh-hud-slot`) e MC-CART (`sh-cart-mini`, `sh-cart-form`), na paleta oficial.

## 14. Pickups, HUD e MC-CART (2026-10-13)

Sem arte externa disponível, o Eduardo pediu para concluir a parte e validar tudo junto. Os cinco assets foram **desenhados em pixel art no repositório**, como fonte editável: `design/source/system-horizon/pixel/build-pickups.mjs` (grades de caracteres, só cores da paleta oficial, encoder PNG sem dependências). Para regerar: `node design/source/system-horizon/pixel/build-pickups.mjs`. Podem ser trocados por arte externa sem mudar código, desde que mantenham o contrato.

| Arquivo | Tamanho | Conteúdo |
|---|---|---|
| `sh-items.png` | 16 × 32 | BUILD `</>` (laranja, traço fino sem borda), PRODUCT card de interface (creme, contorno), AI nós conectados (teal, sombra de 1 px), GAME DNA d-pad (ouro, contorno); coluna 1 = brilho de 1 px |
| `sh-collect-fx.png` | 36 × 12 | cruz pequena → cruz maior com cantos → pixels dispersos (ouro/laranja/claro, sem glow) |
| `sh-hud-slot.png` | 20 × 10 | vazio (borda bronze) · preenchido (borda laranja), interior escuro |
| `sh-cart-mini.png` | 12 × 15 | MC-CART reduzido à mão (centrado na vertical) |
| `sh-cart-form.png` | 144 × 30 | 0 contorno · 1 carcaça · 2 rótulo · 3 dois quadrados do glifo · 4 os quatro · 5 completo com brilho (quadro-chave) |

**MC-CART:** segue a silhueta oficial dos renders (D-065): horizontal, carcaça grafite, trilhos laranja nas laterais, rebaixo no centro do topo, rótulo com o pôr do sol do SYSTEM HORIZON, faixa inferior (MC-CART) com o glifo de quatro quadrados, ▼ embutido na base. Desenho de 24 × 15 centrado no quadro 24 × 30. Sem texto na arte.

**Integração:** `FINAL_SHEETS` = todas as folhas; placeholders em código só como fallback. Total de arte do teaser no runtime: **~23 KB**. Engine, roteiro, timings e posições congelados intactos. 123 testes e builds verdes; Lighthouse (HTTP/2) inalterado: mobile 85, desktop 99.

**Para a validação do Eduardo:** cenário (§12), personagem provisório (§13), ícones e MC-CART (§14), legendas, quadro-chave e reduced motion.
