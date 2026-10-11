# 21 — Hero: refinamento com foco em fidelidade à referência

> Status: **rodada 1 implementada, aguardando revisão do Eduardo** (D-063). Escopo: **só a Hero**. Referência de direção: concept 03-B ("Referencia – Portfólio Modo Campanha Retro-Tech"), interpretado, não copiado.

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

## 3. Assets dedicados (fidelidade de render)

A versão implementada é **vetorial (SVG + CSS)**: leve, responsiva e com tokens. A riqueza de materiais/luz de um key visual renderizado (como na referência) depende de assets. A Hero já aceita substituí-los sem mudar o layout (`HERO_SCENE_ASSETS`, `features/hero/hero-scene.assets.ts`).

| Nome (arquivo sugerido)                              | Função                                 | Enquadramento                                                                   | Estilo                                                                                     | Prioridade |
| ---------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------- |
| `hero-hardware.webp` (console + controle + cartucho) | substitui o SVG do hardware            | 3/4 frontal, fundo transparente, ~1600 × 800, luz quente vinda da esquerda/cima | render 3D/fotográfico estilizado, material escuro fosco + laranja, sem marcas de terceiros | alta       |
| `hero-backdrop.webp`                                 | ambiente atrás da cena (parede + mesa) | 2880 × 1400, área do texto (esquerda) escura e vazia                            | estação/setup quente, desfocado, poucos objetos, sem texto                                 | média      |
| `hero-screen-mc-001.png`                             | tela do CRT com o cartucho em execução | 4:3, pixel art 160 × 120 exportada 4×                                           | mesma gramática do System Horizon (D-046), sem texto embutido                              | média      |
| `mc-cart-*-spine.webp` (variações)                   | futuros cartuchos visíveis na cena     | só quando houver projetos aprovados                                             | família MC-CART (D-032)                                                                    | baixa      |

## 4. Responsivo

| Faixa             | Comportamento                                                               |
| ----------------- | --------------------------------------------------------------------------- |
| Desktop (≥ 1024)  | texto 1–6; cena 7–12 com sangria à direita; ambiente atrás de toda a Hero   |
| Tablet (768–1023) | texto primeiro; cena centralizada abaixo (máx. 34rem)                       |
| Mobile (< 768)    | texto primeiro; cena compacta (CRT simplificado + hardware); ações empilham |

## 5. Acessibilidade

Cena inteira `aria-hidden` (decorativa; nada informativo só nela). Contraste do texto preservado (lado esquerdo escuro). Boot e qualquer movimento seguem `prefers-reduced-motion` (D-059). Ações secundárias mantêm `(abre em nova aba)`.
