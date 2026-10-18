# 21 — Hero: refinamento com foco em fidelidade à referência

> Status: **rodada 3 implementada, aguardando revisão visual do Eduardo** (D-067, §7: fundo aprovado direto). Histórico: rodada 1 (D-063, §1–§5, cena vetorial) e rodada 2 (D-066, §6, renders montados); texto e ações de D-063 continuam. Escopo: **só a Hero**. Referência de direção: concept 03-B ("Referencia – Portfólio Modo Campanha Retro-Tech"), interpretado, não copiado.

## 1. Diagnóstico (Hero aprovada no Slice 01)

**Afasta da referência**

- O objeto principal lê como **monitor + gabinete com entrada de disquete**: o "console" é uma faixa baixa sob o CRT, sem cartucho, sem leitura de hardware de videogame.
- **Cena limpa demais**: um glow difuso e o CRT flutuando; sem mesa, sem ambiente, sem profundidade.
- **Storytelling fraco**: a tela diz `INSERT CARTRIDGE` e nada mais; não há cartucho, controle nem a ideia "portfólio = campanha rodando num console próprio".
- **Texto × cena**: as duas metades não conversam; o lado direito tem pouca massa e as ações secundárias (texto sublinhado) somem.

**Pode ser preservado**

- Estrutura 70% 03-A / 30% 03-B, H1 = Eduardo Arine (D-026), "MODO CAMPANHA" em Pixelify (único uso validado, D-029), textos aprovados, CTA primário único, `mc-crt-frame` (signature aprovado), boot da FASE 5 (D-059), regras de acessibilidade e responsivo.

## 2. Direção

- **Composição:** texto à esquerda (colunas 1–6); cena à direita (7–12) com sangria até a borda da página no desktop. Fundo da Hero vira **ambiente**: luz quente do lado da cena, parede com painéis muito sutis, **mesa** sob o hardware; lado do texto continua escuro (legibilidade).
- **Console MC-01 (autoral, inspirado no SNES):** corpo horizontal arredondado, tampo com **slot de cartucho** e **MC-CART MC-001 inserido** (shell laranja, rótulo com o artwork aprovado), chaves POWER/RESET deslizantes, LED aceso, portas de controle, ventilação. Paleta do sistema (material dark + laranja); sem logos, cores ou formas registradas de terceiros.
- **Controle MC-01:** formato "osso" horizontal, D-pad laranja, dois botões de ação, SELECT/START; em primeiro plano, à frente do console, com cabo até a porta. Não domina a cena.
- **CRT:** o mesmo `mc-crt-frame`, atrás do console. Depois do boot (D-059), a tela mostra o **cartucho em execução**: o artwork do MC-001 (System Horizon) com a faixa `MC-001 · Modo Campanha`. É a história: o portfólio (MC-001) roda no próprio console.
- **Texto:** eyebrow vira etiqueta de sistema (`MC-01` em tag laranja + PORTFÓLIO PROFISSIONAL); "MODO CAMPANHA" ganha gradiente laranja (sem glow); motto com marcador ▶ em laranja; GitHub / LinkedIn passam a **ações secondary** (presença equivalente, sem competir com o CTA).
- **Sem:** alien, ONLINE/versão, LV, ™, pôster/plantas/pilhas de cartuchos inventados, textos novos na tela, cyberpunk/neon, motion além do boot já aprovado.

## 3. Assets dedicados (rodada 1, histórico: atendidos pelos renders oficiais em §6)

A versão implementada é **vetorial (SVG + CSS)**: leve, responsiva e com tokens. A riqueza de materiais/luz de um key visual renderizado (como na referência) depende de assets. A Hero já aceita substituí-los sem mudar o layout (`HERO_SCENE_ASSETS`, `features/hero/hero-scene.assets.ts`).

| Nome (arquivo sugerido)                              | Função                                 | Enquadramento                                                                   | Estilo                                                                                     | Prioridade |
| ---------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------- |
| `hero-hardware.webp` (console + controle + cartucho) | substitui o SVG do hardware            | 3/4 frontal, fundo transparente, ~1600 × 800, luz quente vinda da esquerda/cima | render 3D/fotográfico estilizado, material escuro fosco + laranja, sem marcas de terceiros | alta       |
| `hero-backdrop.webp`                                 | ambiente atrás da cena (parede + mesa) | 2880 × 1400, área do texto (esquerda) escura e vazia                            | estação/setup quente, desfocado, poucos objetos, sem texto                                 | média      |
| `hero-screen-mc-001.png`                             | tela do CRT com o cartucho em execução | 4:3, pixel art 160 × 120 exportada 4×                                           | mesma gramática do System Horizon (D-046), sem texto embutido                              | média      |
| `mc-cart-*-spine.webp` (variações)                   | futuros cartuchos visíveis na cena     | só quando houver projetos aprovados                                             | família MC-CART (D-032)                                                                    | baixa      |

## 4. Responsivo (rodada 1, histórico: ver §6)

| Faixa             | Comportamento                                                               |
| ----------------- | --------------------------------------------------------------------------- |
| Desktop (≥ 1024)  | texto 1–6; cena 7–12 com sangria à direita; ambiente atrás de toda a Hero   |
| Tablet (768–1023) | texto primeiro; cena centralizada abaixo (máx. 34rem)                       |
| Mobile (< 768)    | texto primeiro; cena compacta (CRT simplificado + hardware); ações empilham |

## 5. Acessibilidade

Cena inteira `aria-hidden` (decorativa; nada informativo só nela). Contraste do texto preservado (lado esquerdo escuro). Boot e qualquer movimento seguem `prefers-reduced-motion` (D-059). Ações secundárias mantêm `(abre em nova aba)`.

## 6. Rodada 2: renders oficiais do ecossistema MC-01 (D-066)

**Alvo de direção:** "Estação Retro ao Pôr do Sol" (`design/source/hero/hero-reference-setup.png`). Interpretado: o texto, a marca, a hierarquia e as ações continuam do Modo Campanha; a referência define composição, escala relativa, luz e profundidade.

### 6.1 Composição (1440 primeiro)

- **Plano 1, texto (esquerda, colunas 1–6):** sobre a parte escura do palco; nada da cena atrás das letras.
- **Plano 2, hardware:** console MC-01 com cartucho no slot (centro), MC-CART MC-001 3/4 na mesa à esquerda do console, controle à frente e à direita (deitado por perspectiva).
- **Plano 3, CRT + ambiente:** CRT atrás/acima do console; ambiente desfocado (janela, pôr do sol, luminária, mesa) revelado da esquerda para a direita (máscara de 34% a 64% do palco; o cartucho deitado da imagem de setup fica no escuro).
- **Técnica:** um palco com a proporção do ambiente (1672 × 941); cada objeto em `--x`/`--y`/`--w` (%) tirados da referência, então o render nítido cobre o objeto desfocado do ambiente (sem "fantasmas"). Ordem do DOM = profundidade. O CSS só posiciona, escala, sombreia e integra.

### 6.2 Assets

| Runtime (`public/assets/hero/`) | Origem                                             | Larguras (KB)        |
| ------------------------------- | -------------------------------------------------- | -------------------- |
| `ambient-1280.webp`             | `hero-reference-setup.png`, desfocado e escurecido | 1280 (27)            |
| `crt-*.webp`                    | `mc-01-crt.png`, recorte do alfa                   | 480 (33), 900 (95)   |
| `console-*.webp`                | `mc-01-console.png` (com cartucho no slot)         | 640 (48), 1040 (110) |
| `controller-*.webp`             | `mc-01-controller.png`                             | 360 (20), 680 (49)   |
| `cart-*.webp`                   | render 3/4 oficial do MC-001 (D-065)               | 160 (10), 300 (27)   |
| `screen-440.webp`               | SYSTEM HORIZON (D-065), para a tela do CRT         | 440 (38)             |

Fontes PNG em `design/source/hero/` (o 3/4 e o SYSTEM HORIZON ficam em `design/source/mc-cart/`). Todas as imagens com `srcset`/`sizes`, `alt=""`, `loading="lazy"`, `decoding="async"`; sem preload (o LCP é texto). A tela do CRT recorta o SYSTEM HORIZON no vidro do render (`CRT_GLASS`, `hero-scene.assets.ts`).

### 6.3 Responsivo

| Faixa                        | Comportamento                                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| Desktop (≥ 1200)             | palco absoluto à direita, altura da Hero = `min(56.25vw, 100svh − header)`; composição única na dobra |
| Desktop compacto (1024–1199) | cena nas colunas 7–12: mesmo palco, recortado em 40% → 100%, borda esquerda dissolvida                |
| Tablet (768–1023)            | cena abaixo do texto: mesmo palco (140%), recortado à esquerda, sangrando até as bordas               |
| Mobile (< 768)               | CRT + console + controle, sem ambiente nem MC-CART; luz quente da Hero; identidade e texto primeiro   |

### 6.4 Performance (Lighthouse 12, mediana de 3, build de produção)

| Servidor       | Mobile antes → depois     | Desktop antes → depois  |
| -------------- | ------------------------- | ----------------------- |
| HTTP/2 + TLS   | 84 → 86 (LCP 3930 → 3630) | 99 → 99 (LCP 750 → 750) |
| HTTP/1.1 local | 83 → 81 (LCP 3820 → 4120) | 99 → 99 (LCP 759 → 840) |

No HTTP/1.1 o LCP simulado piora porque há 3 requisições a mais na fila de 6 conexões, embora o total transferido caia (806 → 726 KB); no HTTP/2 (GitHub Pages) melhora. `@defer (on idle)` na cena foi testado e piorou o LCP (descartado).

## 7. Rodada 3: fundo aprovado direto (D-067)

Decisão do Eduardo: em vez de montar a cena com renders separados (§6), a Hero usa a **imagem de fundo aprovada direto** (`design/source/hero/hero-background.png`, 1672 × 941). A §6 vira histórico.

| Faixa                        | Comportamento                                                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Desktop (≥ 1200)             | imagem na Hero inteira, ancorada à direita (16:9); máscara escurece a esquerda até depois do texto (34% → 62%) e dissolve a base |
| Desktop compacto (1024–1199) | colunas 7–12, recorte quadrado à direita (MC-01, CRT, controle), bordas dissolvidas                                              |
| Tablet (768–1023)            | abaixo do texto, 3:2, sangrando até as bordas                                                                                    |
| Mobile (< 768)               | abaixo do texto, recorte quadrado próprio (`background-mobile-*`, 43/88 KB)                                                      |

Runtime: `<picture>` com `background-{640,960,1280,1672}.webp` (≥ 768) e `background-mobile-{480,800}.webp`; `alt=""`, `aria-hidden`, sem lazy (maior elemento da dobra no desktop). O boot da tela do CRT (D-059) saiu com a cena; decisão pendente. Imagem atual (2026-10-12): **arte final** do fundo (sem teclado e mouse, cabo do controle ligado ao MC-01). Sobre o vidro do CRT roda o teaser SYSTEM HORIZON (D-068, `docs/22`), projetado no ângulo da TV.

## 8. Rodada 4: acabamento final (D-079)

Direção B da auditoria: a Hero mantém composição, atmosfera, textos, CTAs e hierarquia. A **imagem atual é provisória** (sem exceção permanente à D-078) até a nova arte, produzida **externamente** com as referências oficiais do H2. Nada é gerado no repositório e os PNGs oficiais não são recompostos sobre a fotografia atual. O personagem provisório do teaser está aprovado para a primeira publicação. O ícone do MC-CART no teaser pode continuar estilizado, desde que não conflite com a identidade física no tamanho real.

### 8.1 Ajustes técnicos (etapa 1, concluída)

Todos medidos no build de produção, antes × depois.

**Scanlines** (só CSS, `system-horizon-screen.scss`)

- **Problema:** com 120 linhas fixas, o período ficava em 0,9–2,3 px do dispositivo em DPR 1 e 1,25 (e em 390 até DPR 2). As linhas caíam entre os pixels e formavam faixas: batimento de 0,22–0,64 e escurecimento médio variando de 7 a 14.
- **Correção:** faixas suaves alinhadas às 120 linhas nativas, com densidade de 120, 60, 40 ou 30 conforme a largura da tela e a densidade de pixels, para cada faixa ter ≥ 3 px do dispositivo. Engine, timings e roteiro intactos.
- **Resultado:** batimento ≤ 0,05 (a maioria ≤ 0,014) e escurecimento uniforme (13,3–13,9) nas 16 combinações de 1440/1024/820/390 × DPR 1/1,25/2/3. O CRT do Inventory usa a mesma tela e também melhora (0,65 → ≤ 0,05), sem nenhuma mudança no Inventory.

**Pixelify Sans**

- **Problema:** sem SSR, a fonte só era pedida quando "MODO CAMPANHA" já estava na tela. Em rede lenta chegava ~1 s depois do primeiro conteúdo, e o título aparecia ~160 ms na fonte substituta (FOUT).
- **Correção:** `<link rel="preload">` no `index.html` e `outputHashing: "bundles"` (JS e CSS continuam com hash; as fontes ficam sem hash, com nome estável). A IBM Plex Sans já chegava antes do primeiro render, por isso ficou sem preload.
- **Resultado:** a Pixelify chega em ~0,5 s e o título nasce na fonte final, sem troca. Uma requisição por fonte e console limpo, também com `base-href /modo-campanha/`.

**Rótulo da pausa**

- **Problema:** o botão anunciava "Pausar demonstração" ~1,0 s antes de a tela existir (~1,3 s em rede lenta).
- **Correção:** o controle é renderizado junto com o teaser (`teaserReady`). O comportamento da reprodução não mudou.
- **Resultado:** botão e tela surgem no mesmo quadro. Em rede lenta sobram ~0,3 s (chunk) + ~0,5 s (arte) até o boot visual. Esse intervalo é do teaser congelado, e nele o CRT da foto já mostra o SYSTEM HORIZON.

**Deslocamentos por fonte**

- **Problema:** a auditoria registrou um deslocamento de 0,013 em 1024. Não foi reproduzido em 32 rodadas (CLS 0); a única troca de fonte observada era a da Pixelify.
- **Correção:** coberto pelo preload.
- **Resultado:** no Lighthouse desktop, o CLS era 0,0074 numa das rodadas antes e ficou estável em 0,0003 depois. Performance inalterada: mobile 82, desktop 99; acessibilidade, boas práticas e SEO em 100.

Regressão: fora do CRT, diferença de **0 pixel** na Hero (pt/en × 4 larguras × DPR 1 e 2), com a mesma altura. Ferramentas e capturas ficaram fora do repositório (scratchpad da sessão).

### 8.2 Contrato da nova imagem (etapa 2)

Para quem vai produzir a arte. **A imagem atual não é substituída até a nova arte chegar.** As coordenadas estão em pixels da fonte atual (1672 × 941); na entrega em 2×, multiplicar por 2. Diagramas: `design/source/hero/contract/guide-zones.webp` (zonas, vidro e equipamentos) e `guide-crops.webp` (recortes responsivos).

#### A. Referências oficiais

| Objeto             | Referência (usar)                                                                                           | O que vale                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| MC-01 com o MC-001 | `design/source/mc-01/console-reference.png` (1254 × 1074); camadas `console-front.png` e `console-back.png` | carcaça, placa "MC-01 —— MODO CAMPANHA" com o glifo, POWER/RESET com LEDs, portas 1 e 2, acentos laranja nas laterais |
| MC-CART MC-001     | `design/source/mc-01/mc-001-console-scale.png` (699 × 500), carcaça oficial (D-078)                         | topo escalonado, pegas laterais (fenda laranja à direita), janela da etiqueta, triângulo na base                      |
| Etiqueta e tela    | `public/assets/cartridges/mc-001/system-horizon.webp`                                                       | pôr do sol, montanhas, lago, trilha e cerca, em pixel art                                                             |
| CRT                | `design/source/mc-01/crt-front.png` (1254 × 1254), o CRT do H2                                              | gabinete grafite com aro laranja, glifo no canto superior esquerdo, 4 botões com LED no canto inferior direito        |
| Controle           | `design/source/hero/mc-01-controller.png` (1254 × 1254)                                                     | o mesmo da Hero atual (já confere)                                                                                    |

**Não usar como referência:**

- `design/source/hero/mc-01-console.png` e `mc-01-crt.png`: versões anteriores (D-066).
- Os renders `front` e `threeQuarter` do MC-001: histórico (D-078).
- A própria fotografia atual para o desenho dos objetos. Ela serve só para a composição e a luz.

#### B. Formato e resolução

- **Mestre:** 3344 × 1882 px (2×, exatamente 1672 : 941), PNG sRGB de 8 bits, sem alfa e sem marca-d'água. Detalhe real em 2×, não um upscale do 1×.
- **Opcional:** a mesma imagem em 1672 × 941, se o gerador reduzir melhor que o navegador.
- Os derivados WebP são gerados no repositório na substituição (L), não pelo gerador.

#### C. Composição e enquadramento (preservar a atual)

- **Cena:** mesa escura ao pôr do sol. Ao fundo, no centro, uma janela com montanhas.
- **Equipamentos:**
  - CRT à direita.
  - MC-01 com o MC-001 inserido, à frente e à esquerda da TV.
  - Controle à frente e à direita, com o cabo ligado ao MC-01.
- **Objetos:** luminária no canto superior direito, plantas, porta-canetas, caderno no canto inferior direito e cadeira no canto inferior esquerdo.
- **Ausentes:** teclado e mouse (D-067).

| Elemento        | Caixa atual (aprox., 1×) | Tolerância                 |
| --------------- | ------------------------ | -------------------------- |
| Vidro do CRT    | x 1157–1473 · y 151–405  | ver G e K                  |
| Gabinete do CRT | x 1115–1545 · y 93–500   | ±3% da largura da imagem   |
| MC-01 + MC-CART | x 805–1342 · y 375–645   | ±3%                        |
| Controle        | x 1215–1597 · y 588–768  | ±3%                        |
| Luminária       | x 1495–1672 · y 0–130    | livre, sem invadir o vidro |

**Câmera:** na altura de quem está sentado, um pouco acima da mesa e olhando levemente para baixo. Lente normal, sem grande-angular exagerada. Equipamentos nítidos e fundo com desfoque suave.

#### D. Perspectiva e proporção

- **Escala real** (H2, D-077, `docs/24` §17.8): o gabinete do CRT tem ≈ 1,27× a largura do console, e o MC-CART ≈ 0,56× (`console-reference`). Na foto, o console está mais perto da câmera e pode parecer do tamanho atual. As proporções reais entre os objetos continuam as mesmas.
- **MC-01 em três quartos:** frente e topo visíveis, levemente girado, como hoje. O MC-001 fica encaixado com a etiqueta voltada para a câmera.
- **CRT:** quase frontal, com o leve giro atual. O lado direito do vidro fica ~4% mais alto (topo 161 → 151, base 400 → 405).
- **Carcaças oficiais sem deformação:** nada esticado, achatado ou com proporções inventadas.

#### E. Iluminação e materiais

- **Luz:**
  - pôr do sol quente vindo da janela ao fundo;
  - luminária quente no canto superior direito;
  - rim light laranja nas bordas dos aparelhos;
  - sombras profundas.
- **Paleta:** 70% neutros escuros, 20% quentes e 10% frios complementares (azul-petróleo no céu e nas montanhas).
- **Materiais:**
  - plástico grafite fosco, levemente texturizado;
  - acentos laranja iluminados;
  - LED POWER laranja e LED RESET branco;
  - etiqueta do MC-CART impressa e fosca.
- **Proibido:** neon, cyberpunk, glow exagerado, cromados e reflexos espelhados.

#### F. Área escura à esquerda

No desktop (≥ 1200), o texto da Hero fica **sobre** a imagem:

- **Alcance do texto:** chega a **x ≈ 830** (en em 1200; ≈ 700–750 de 1280 a 2560) e desce até y ≈ 900.
- **Máscara:** esconde x 0–560 e dissolve x 568–1037.

Zonas:

- **x 560–900, altura inteira:**
  - luminância relativa ≤ **0,05** (≈ #3f3f3f) em qualquer ponto;
  - sem pontos de luz (velas, LEDs, lâmpadas).

  Com a máscara, isso garante ≥ 4,5 : 1 para o texto mais fraco (`cream-500`). Na imagem atual, as velas da estante (x ≈ 640–830) deixam o contraste no limite: 4,45 : 1 em en, de 1200 a 1239.

- **x 0–560:** escuro e com pouco detalhe. Fica oculto no desktop, mas aparece no tablet (x ≥ 208).
- **A partir de x ≈ 900:** objetos claros e protagonismo.

#### G. CRT e tela

- **Modelo:** o CRT do H2 (`crt-front.png`) em perspectiva. Sem outro modelo de TV, sem grade de ventilação lateral e sem botões diferentes.
- **Vidro, posição:** de preferência **exatamente** na caixa x 1157–1473 · y 151–405 (316 × 254, ~1,24 : 1), com os cantos de `HERO_CRT_GLASS` e tolerância de ±2 px no 1× (±4 px no 2×).
- **Vidro, se a identidade pedir outra proporção:** a tela do `crt-front` é mais larga (~1,35 : 1) e tem cantos mais arredondados. Nesse caso vale a identidade: a proporção pode ficar entre 1,24 e 1,36, com o remedimento de K.
- **Nada na frente do vidro:** o topo do MC-CART fica abaixo da borda inferior do vidro. Hoje o cartucho cobre x 1157–1232 · y 375–405, o que obriga um recorte na tela do teaser.
- **Conteúdo da tela:** o cenário do SYSTEM HORIZON (pôr do sol, montanhas, lago, trilha), em pixel art e sem texto, HUD ou personagem. Ele aparece antes de o teaser carregar e quando o teaser falha.
- **Reflexos:** o teaser cobre o vidro inteiro, então reflexos e brilho ficam no aro e no gabinete, nunca dentro do vidro.

#### H. Identidade oficial: textos permitidos

Os únicos textos legíveis da imagem são estes, e só nos objetos oficiais:

- **MC-01:** "MC-01", "MODO CAMPANHA", "POWER", "RESET", "1", "2" e o glifo de quatro quadrados.
- **MC-CART:** "SYSTEM HORIZON", "MC-CART", "MC-001", "MODO CAMPANHA" e o glifo.
- **CRT:** "BRIGHTNESS", "CONTRAST", "VOLUME", "POWER" e o glifo.
- **Controle:** "MC-01", "SELECT", "START", "L", "R", "X", "Y", "A", "B" e o glifo.

Textos pequenos demais para ler no tamanho final podem virar marcas lisas, nunca pseudoletras.

#### I. Proibido

- Pseudotexto e letras inventadas. Na imagem atual: "VIDEO GAME CONSOLE", "BBT 9Y1", "HORIZ9 CAMPAGNE".
- Livros, cadernos ou pôsteres com texto. Esboços sem letras são permitidos.
- Pilhas, caixas ou cartuchos de outro formato. Se houver outro cartucho, só a carcaça oficial e sem etiqueta legível; de preferência, nenhum.
- Marcas de consoles ou de terceiros, formatos de consoles ou cartuchos reais, logotipos.
- Alien, pessoas, mãos, marca-d'água, segunda tela ou monitor, teclado e mouse.

#### J. Recortes responsivos

| Faixa     | Parte da fonte mostrada                | Zona opaca (sem dissolver) | Precisa conter                                        |
| --------- | -------------------------------------- | -------------------------- | ----------------------------------------------------- |
| ≥ 1200    | imagem inteira, ancorada à direita     | x ≥ 1037 · y ≤ 753         | tudo; texto sobre x < 900 (F)                         |
| 1024–1199 | quadrado x 731–1672                    | x ≥ 1013 · y 207–734       | vidro, MC-CART, frente do MC-01, controle             |
| 768–1023  | 3:2, x 208–1620                        | x 377–1450 · y 169–734     | MC-01, CRT, controle                                  |
| < 768     | quadrado x 628–1569 (derivado próprio) | x 741–1456 · y 169–734     | MC-01, vidro do CRT, controle (pode cortar à direita) |

Se os equipamentos saírem da tolerância de C, o recorte `background-mobile-*` (x 628–1569) e as posições `--pos` são revistos na substituição.

#### K. Coordenadas que dependem da imagem

Se o vidro ficar na caixa atual, dentro da tolerância de G, **nada é remedido**: só os quatro cantos são conferidos. Se mudar, estes valores precisam ser remedidos (fonte W × H = 1672 × 941; vidro de x0 a x1 e de y0 a y1):

| Valor                                               | Onde                     | Fórmula                                                                                  |
| --------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| `HERO_CRT_GLASS` (4 cantos) e o comentário da caixa | `hero-scene.assets.ts`   | cantos do vidro em frações da caixa (x0–x1, y0–y1)                                       |
| `top` / `height` da `.crt`                          | `hero-scene.scss`        | y0 / H · (y1 − y0) / H (hoje 16,05% / 26,99%)                                            |
| `--sx` / `--sw` (≥ 768)                             | `hero-scene.scss`        | x0 / W · (x1 − x0) / W (hoje 69,2% / 18,9%)                                              |
| `--sx` / `--sw` (mobile)                            | `hero-scene.scss`        | (x0 − 628) / 941 · (x1 − x0) / 941 (hoje 56,22% / 33,58%)                                |
| `clip-path` da `.crt`                               | `hero-scene.scss`        | área do vidro coberta pelo cartucho; sem sobreposição, o recorte sai                     |
| `--screen-radius`                                   | `hero-scene.scss`        | raio dos cantos do vidro em % da caixa (hoje 4% / 5%)                                    |
| Área segura do teaser                               | `docs/22` §4.0           | proporção do vidro: em 1,24 : 1 cortam-se ~6 px de cada lado; perto de 4 : 3, quase nada |
| Recorte mobile                                      | `HERO_BACKGROUND.mobile` | x do quadrado que contém MC-01, vidro e controle                                         |

A engine, o roteiro, os timings e a câmera do teaser não mudam em nenhum caso.

#### L. Derivados (na substituição)

Gerados a partir do mestre:

| Derivado                              | Hoje                  | Na substituição                                        |
| ------------------------------------- | --------------------- | ------------------------------------------------------ |
| `background-{640,960,1280,1672}.webp` | 34 / 62 / 92 / 140 KB | regerados                                              |
| `background-{2560,3344}.webp`         | não existem           | novos 2×: ~260 / ~380 KB, orçamento a validar pelo LCP |
| `background-mobile-{480,800}.webp`    | 42 / 86 KB            | regerados, mais um novo `1200` para 390 @ 3×           |

- **Por que os 2×:** hoje, em telas 2×, a imagem é ampliada até 1,76×.
- **Código:** atualizar `HERO_BACKGROUND` e os `sizes`.
- **Mestre:** substitui `design/source/hero/hero-background.png`. A versão atual vai para o histórico com o sufixo `-v1`.

#### M. Aceite (validação da substituição)

1. Identidade comparada lado a lado com as referências de A, no tamanho real e a 200%.
2. Nenhum texto fora da lista de H, verificado a 200%.
3. Vidro e cantos medidos; teaser alinhado (erro ≤ 1 px) em 1440, 1024, 820 e 390.
4. Contraste ≥ 4,5 : 1 no texto da Hero de 1200 a 2560, em pt e en.
5. Recortes de J com os equipamentos inteiros.
6. Pesos e LCP medidos, sem CLS; teste também com movimento reduzido.
7. Aprovação do Eduardo.

#### N. Briefing para o gerador (en)

> Cinematic photo-real still of a dark wooden desk at sunset, 3344 × 1882 px (16:9, exactly 1672:941).
>
> **Composition (keep the existing one).** A window with mountains at the back-center. A compact CRT TV on the right. The MC-01 console in three-quarter view, in front of the TV and to its left, with the MC-001 cartridge inserted and its label facing the camera. A wired controller at the front right, connected to the console. A warm desk lamp at the top right. Plants and a pen cup. A sketchbook at the bottom right (sketches only, no lettering). The edge of a chair at the bottom left.
>
> **Official objects.** Reproduce the reference objects exactly: shapes, proportions, colors and printed labels.
>
> - Console: console-reference.png.
> - Cartridge shell: mc-001-console-scale.png.
> - CRT: crt-front.png.
> - Controller: mc-01-controller.png.
>
> Real-world scale: the CRT cabinet is about 1.27× the console width; the cartridge is about 0.56× the console width.
>
> **CRT and screen.** The CRT is nearly frontal. Its glass sits at x 2314–2946, y 302–810, with the right side slightly taller, and nothing overlaps it. The screen shows the SYSTEM HORIZON pixel-art sunset landscape (lake, mountains, trail) with no text.
>
> **Light and materials.** Warm sunset and lamp light, orange rim light, matte graphite plastic, deep shadows. No neon.
>
> **Dark left side.** The left half (x < 1800) must stay very dark and low-detail, with no light sources.
>
> **Text.** The only legible text allowed:
>
> - Console: MC-01, MODO CAMPANHA, POWER, RESET, 1, 2.
> - Cartridge: SYSTEM HORIZON, MC-CART, MC-001, MODO CAMPANHA.
> - CRT: BRIGHTNESS, CONTRAST, VOLUME, POWER.
> - Controller: MC-01, SELECT, START, L, R, X, Y, A, B.
>
> **Exclude.** Any other text or pseudo-text, other cartridges or boxes, brand logos or real console designs, people, a keyboard or mouse, watermarks.
