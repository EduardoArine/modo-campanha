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
