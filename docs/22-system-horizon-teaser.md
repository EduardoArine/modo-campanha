# 22 — SYSTEM HORIZON: teaser do CRT da Hero (attract mode)

> Status: **engine, roteiro, estados e integração implementados com placeholders técnicos** (D-068). **Arte final pendente** (produção externa, especificação em §4). Aguardando revisão do Eduardo antes de substituir os placeholders.

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
| Linguagem de sistema | PLAYER 01, BUILD, PRODUCT, AI, GAME DNA, CAMPAIGN UNLOCKED, MC-001, SYSTEM HORIZON, CAMPAIGN CONTINUES... em **inglês nos dois idiomas** (vêm do dicionário, `ui.systemHorizon`). Controles de interface localizados: *Pausar demonstração / Pause demo*, *Reproduzir / Play*. |
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
- **Paleta:** até **16 cores**, todas derivadas do MC Design System. Base obrigatória (13):

  | Nome | Hex | Uso sugerido |
  |---|---|---|
  | ink-950 | `#14110f` | sombras mais profundas, contorno |
  | ink-900 | `#1d1815` | chão, pinheiros |
  | ink-850 | `#231f1c` | montanhas distantes |
  | ink-800 | `#2b2521` | carcaça grafite (MC-CART, roupa) |
  | cream-100 | `#f3e9d2` | brilhos, PRODUCT |
  | cream-300 | `#d7cbb5` | pele, luz suave |
  | cream-500 | `#a89a86` | detalhes, slot vazio |
  | orange-500 | `#f28c28` | marca, BUILD, acentos |
  | orange-300 | `#ffb357` | luz do pôr do sol |
  | orange-700 | `#c96a1b` | trilha, sombras quentes |
  | gold-400 | `#f2c14e` | sol, GAME DNA |
  | petrol-800 | `#1f3a4a` | céu alto, lago |
  | teal-500 | `#3fa7a3` | AI, reflexo dos óculos |

  Até **3 cores livres** (tons intermediários de céu/lago), aprovadas com a arte. Nada de neon, saturação extra ou gradiente suave.
- **Área segura:** a tela 4:3 aparece num vidro de proporção ~1,24 : 1, então até **~6 px de cada lado** podem ser cortados. Nada importante fora de **x 8–152**. Topo **y 4–18** é do HUD; faixas onde aparecem textos (centros em y 26–30, 60 e 78) devem continuar legíveis com uma etiqueta sólida por cima.
- **Sem texto na arte.** Os textos são DOM (dicionário).
- **Folhas de sprites:** quadros do mesmo tamanho, em grade, **sem espaçamento**, lidos da esquerda para a direita e de cima para baixo. O tamanho do arquivo = colunas × largura do quadro por linhas × altura.
- **Pivot:** coordenada dentro do quadro que a engine posiciona no ponto do mundo (pés do jogador, centro do item etc.).
- **Nomenclatura:** `sh-<grupo>-<nome>.png`, minúsculas, kebab-case, exatamente como na tabela. Runtime em `public/assets/system-horizon/`; arquivos-fonte (Aseprite/PSD) em `design/source/system-horizon/`.
- A especificação também está no código (`world/assets.ts`); trocar placeholders pela arte = carregar estes arquivos, sem mudar a cena.

### 4.1 Cenário em camadas

| Arquivo | Tamanho | Parallax | Alfa | Conteúdo |
|---|---|---|---|---|
| `sh-bg-sky.png` | 160 × 120 | 0 (fixo) | não (opaco) | Céu do SYSTEM HORIZON ao pôr do sol (petrol no alto → laranja/ouro no horizonte, ~y 70), **sol** visível entre x ~100–124 e y ~44–60, lago abaixo do horizonte com reflexo. |
| `sh-bg-mountains.png` | 180 × 120 | 0,25 | sim | Cordilheira distante, cumes entre y ~54–66, base em y 72; não esconder o sol. |
| `sh-bg-trees.png` | 200 × 120 | 0,5 | sim | Pinheiros/bosque na faixa y ~70–92, espaçados (o lago aparece entre eles). |
| `sh-bg-ground.png` | 240 × 120 | 1 | sim | Chão + **trilha**. A borda superior da trilha segue **exatamente** o perfil abaixo; abaixo dela, terreno escuro. Pode ter pedras, grama, cerca baixa no mirante (sem obstruir o jogador). |

Perfil da trilha (x, y dos pés), interpolação linear (`world/trail.ts`):

`(0, 104) → (100, 102) → (112, 98) → (122, 90) → (128, 86) → (240, 86)`. O **mirante** é o platô a partir de x 128.

Os itens flutuam 12 px acima da trilha em x **47, 62, 77, 92** (y ≈ 90–92): manter essa faixa limpa.

### 4.2 Eduardo (jogador)

Silhueta de **~10 × 14 px** dentro de um quadro **16 × 16**, voltado para a direita. Sinais: **cabelo escuro, óculos** (1–2 px de reflexo teal), **roupa escura** (grafite), pele cream-300; sem rosto detalhado. Contorno legível sobre a trilha laranja e o chão escuro.

| Arquivo | Quadro | Quadros | Layout | Pivot | Animação |
|---|---|---|---|---|---|
| `sh-player-idle.png` | 16 × 16 | 2 | 2 × 1 (32 × 16) | 8, 15 (pés) | respiração sutil, 1 px; troca a cada 6 ticks |
| `sh-player-walk.png` | 16 × 16 | 4 | 4 × 1 (64 × 16) | 8, 15 | contato · passagem · contato (perna oposta) · passagem; 6 fps |
| `sh-player-look.png` | 16 × 16 | 2 | 2 × 1 (32 × 16) | 8, 15 | parado no mirante olhando o horizonte (3/4 de costas ou perfil, cabeça levemente erguida), respiração 1 px; troca a cada 8 ticks |

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
| 5 | `sh-player-idle.png` | 32 × 16 |
| 6 | `sh-player-walk.png` | 64 × 16 |
| 7 | `sh-player-look.png` | 32 × 16 |
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
- O palco tem a proporção da imagem mostrada e é recortado pela moldura como um `object-fit: cover`, então a tela usa coordenadas da própria imagem: vidro do CRT na fonte 1672 × 941 em **x 1157–1474, y 150–406** (no recorte mobile: x 529–846 de 941). O cartucho do console cobre o canto inferior esquerdo do vidro: a tela é recortada ali (`clip-path`).
- A tela 4:3 cobre o vidro (~1,24 : 1) cortando as laterais (área segura, §4.0).
- **Carregamento:** chunk próprio (~13,7 KB, ~5,8 KB gzip), só depois do `load`, no idle + 1 s. Antes disso, a tela da foto já mostra o SYSTEM HORIZON.
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

- Produção da arte (§4.9) e revisão antes de trocar os placeholders.
- Strings `ui.boot` (D-059) seguem sem uso: o boot agora é o cartão MC-01 / SYSTEM HORIZON do teaser. Descartar quando o Eduardo confirmar.
