# 20 — FASE 5 / Game Feel 01: cartucho → CRT

> Status: **APPROVED** (D-058, REVIEWER). Implementa os itens da FASE 5 "CRT Project Viewer completo na Home", "seleção de cartucho", "inserção no console", "transição cartucho → CRT", "CRT boot", "hover states" e a decisão de animação.

## 1. Fluxo

```
MC-CART (prateleira) → [Inserir cartucho] → cartucho sobe → CRT liga abaixo da grade
                                                            LOADING CARTRIDGE...
                                                            case do projeto → [Ejetar cartucho]
```

1. **Seleção:** botão `Inserir cartucho / Insert cartridge` no Project Summary (`button[mcAction="text"]`, `aria-controls="project-viewer"`, nome acessível com o projeto). Clicar no próprio MC-CART é atalho de ponteiro para a mesma ação; o cartucho continua `role="img"`, não focável (um único controle por item).
2. **Inserção (~600 ms):** o cartucho sobe da prateleira (150 ms); o CRT Project Viewer aparece abaixo da grade (`crt-on`, 220 ms, opacidade + subida curta); a tela mostra `LOADING CARTRIDGE...` (`role="status"`) por 450 ms; o case aparece e recebe o foco (título `h3`, `tabindex="-1"`). A página rola até o viewer pelo `ViewportScroller`, que respeita a altura real do header.
3. **Troca:** inserir outro cartucho cancela o boot em andamento e troca na hora (um por vez).
4. **Ejetar:** `Ejetar cartucho / Eject cartridge` (no resumo ou no case) desliga o CRT e devolve o foco ao botão do projeto.
5. **`prefers-reduced-motion`:** sem boot, sem deslocamento, sem animação; o case aparece direto e a rolagem é instantânea.

Sem som, sem loop, sem efeito constante, sem bloquear a leitura. O deslocamento espacial até um console (`docs/05`) **não** foi implementado: não há console no Inventory, e um objeto atravessando a página seria videogame literal. Vale a versão simplificada já prevista em `docs/05` ("encaixe + boot").

## 2. Case no CRT

Só campos **aprovados** do `Project` (`docs/14`): serial + tipo, nome, artwork (com o `alt` guardado no modelo, D-046), descrição, **PAPEL / ROLE**, **STACK**, **APRENDIZADOS / LEARNINGS**, links reais (`secondary`, nova aba). Nada de contexto, contribuição, desafios ou resultados não aprovados.

- "CRT na moldura; clareza no conteúdo": nenhum efeito sobre texto ou artwork; artwork com `image-rendering: pixelated`.
- `mc-crt-project-viewer` e `mc-crt-frame` **não mudam**.
- Desktop: viewer em 8/12 colunas; tablet e mobile: largura total (abaixo de 28rem o frame simplifica sozinho).

## 3. Decisão de animação

**CSS** (transitions + `@keyframes`), como previa `docs/06`: sem biblioteca, sem `@angular/animations`. A regra global de `prefers-reduced-motion` (`_base.scss`) zera durações; o componente também pula o boot.

## 4. Roteamento do case

Continua **na própria Home** (sem rota). `/projects/:slug` segue como decisão futura (roadmap, "Páginas dedicadas por case").

## 5. Boot / Intro (D-059)

Na primeira visita da sessão, a tela do CRT do Hero mostra `INITIALIZING CAMPAIGN...` → `PLAYER FOUND` → `INSERT CARTRIDGE` (≤ 840 ms). Sem overlay, sem bloquear nada, cena `aria-hidden`, layout inalterado; não repete na sessão e não acontece com `prefers-reduced-motion`.

## 6. Acessibilidade

Botão nativo com o projeto no nome acessível e `aria-controls`; região rotulada (`role="region"`, "Visualizador de projetos"); status de carregamento; foco no título do case ao terminar; foco devolvido ao ejetar; links externos com aviso de nova aba; nada depende de hover.
