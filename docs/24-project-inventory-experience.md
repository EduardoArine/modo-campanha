# 24 — Project Inventory: refinamento da experiência

> Status: **H2 aprovado e implementado na Home (D-077), aguardando a aprovação final do Eduardo.** O histórico das propostas (A, B, H, H2 no laboratório) fica nas seções 1–16; a implementação está no §17. Sem merge e sem deploy.

## 1. Auditoria do estado atual

| Peça               | Comportamento hoje                                                                                                                                                                     | Observação                                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `mc-cart`          | Objeto físico, `role="img"`, não focável; usa o render frontal oficial (`front.webp`, 960 × 690) ou a construção em CSS como fallback.                                                 | Bom e reutilizável. O render ¾ (`three-quarter.webp`) não aparece no Inventory.                                                    |
| Project Inventory  | Grade de até 3 cartuchos por linha (≥ 1200), 2 (768–1199) e 1 (mobile). Com um só cartucho (384 × 276 px no desktop), **2/3 da largura ficam vazios**.                                 | O espaço vazio é o problema visual central.                                                                                        |
| "Inserir cartucho" | `button[mcAction="text"]` no Project Summary, `aria-controls="project-viewer"`, nome acessível com o projeto. O clique no cartucho é um atalho de ponteiro.                            | É a ação principal, mas tem o menor peso visual da seção.                                                                          |
| Inserção           | O cartucho sobe 8 px. O CRT aparece **abaixo da grade** (`crt-on` 220 ms), mostra LOADING CARTRIDGE... por 450 ms, e a página rola até ele. Com reduced motion, o case aparece direto. | O cartucho e o MC-01 ficam longe um do outro (~700 px de rolagem): a relação "cartucho → console" não se vê.                       |
| CRT Project Viewer | `mc-crt-project-viewer` (região rotulada) com o case **dentro do vidro**. O CRT cresce com o conteúdo: 971 px de altura em 1440 e 1143 px em 390.                                      | O CRT vira um contêiner de documento, não uma tela.                                                                                |
| `project-case`     | Serial + tipo, título, artwork, descrição, PAPEL, STACK, APRENDIZADOS, links e Ejetar. Foco no título ao carregar; o foco volta ao botão ao ejetar.                                    | Repete a descrição e a arte (a mesma do rótulo) e tem um **segundo** "Ejetar". Não diz que tipo de experiência o cartucho oferece. |
| Dados              | `PROJECTS` tem só o MC-001, com `publication: 'approved'`. `inventoryProjects(isDevMode())` aceita placeholder só em dev.                                                              | **O MC-001 se chama "Modo Campanha" nos dados** (PORTFÓLIO INTERATIVO). O rótulo do render diz SYSTEM HORIZON.                     |
| Teclado / toque    | Botões nativos (Enter/Space), nada só por hover, toque funciona.                                                                                                                       | Base de acessibilidade sólida (D-058).                                                                                             |

Capturas do estado atual: `scratchpad/inventory/current-{initial,ready}-{1440,1024,820,390}.png`.

## 2. O que preservar

- O MC-CART como objeto físico, e os renders oficiais (front e ¾) e o artwork SYSTEM HORIZON, sem alteração.
- `mc-crt-project-viewer` e `mc-crt-frame` (o MC-01) sem redesenho. Os protótipos usam os dois como estão.
- A tela do SYSTEM HORIZON (`app-system-horizon-screen`) e a engine congelada: reuso sem modificação, com instância própria de `AttractPlayback`.
- As regras do D-058: um botão nativo por ação; o clique no objeto como atalho de ponteiro; o foco no título do case ao carregar e de volta ao controle ao ejetar; reduced motion pula a inserção.
- A publicação conservadora (`publication: 'approved'`); nada de cartuchos sem decisão editorial e assets aprovados.

## 3. Diagnóstico

1. **Composição:** a grade foi pensada para muitos itens, mas hoje há um. O cartucho fica pequeno, sem protagonismo, e a seção parece incompleta.
2. **Metáfora:** "cada projeto é um cartucho, o MC-01 apresenta" não se vê, porque o MC-01 só aparece depois, longe, e sem ligação visual com o cartucho.
3. **Hierarquia:** a ação principal é um link de texto, e o objeto e o texto têm peso parecido.
4. **CRT como documento:** o case longo dentro do vidro tira o sentido de "tela": lê-se um documento emoldurado, e no mobile o vidro passa de 1100 px.
5. **Repetição:** descrição, arte e "Ejetar" aparecem duas vezes.
6. **Experiência:** o visitante não sabe o que o cartucho tem (teaser? case? demo?). O teaser existe, mas só no Hero.

## 4. Conceito A — FEATURED CARTRIDGE

O cartucho é o protagonista e o editorial fica ao lado.

- **INITIAL:** render ¾ grande (até 38rem) com sombra de contato e sem pedestal, em 7/12 colunas. À direita (5/12): uma linha de serial ("MC-001 · MODO CAMPANHA · PORTFÓLIO INTERATIVO"), o nome SYSTEM HORIZON, a descrição, os chips, **NESTE CARTUCHO** numa linha (teaser · case) e um **único** botão primário "Inserir cartucho". (Depois da revisão, o metadado repetido, a lista em bullets e o texto de apoio saíram, para tirar a leitura de "página de produto".)
- **SELECTED:** foco (teclado) ou hover no botão ou no objeto levanta o cartucho (−12 px, −1°). É um estado de intenção: com um só cartucho, o clique ou o toque já insere, então no toque não há SELECTED visível.
- **INSERTING (≈ 600 ms):** o cartucho desce e some **sobre o MC-01, que liga no mesmo lugar**: o cartucho vira a tela. A área de ação vira a linha "CARREGANDO MC-001".
- **READY:** o CRT (teaser rodando) fica no palco, à esquerda e fixo ao rolar no desktop; o case fica fora do vidro, à direita, com Ejetar e Pausar.
- **Forças:** impacto máximo com um cartucho; o objeto tem presença sem parecer produto à venda (sem preço, sem pedestal, sem "comprar").
- **Limites:** com vários cartuchos, precisa de um seletor; no READY, nada mostra que o cartucho continua "no console".

## 5. Conceito B — SYSTEM LIBRARY

O MC-01 é o protagonista e os cartuchos são a biblioteca dele.

- **INITIAL:** o CRT aparece desde o início em 8/12 colunas (estado vazio já existente, INSERT CARTRIDGE), com uma faixa de slot abaixo ("SLOT VAZIO"). À esquerda (4/12), **BIBLIOTECA MC-01 · 1 cartucho** lista os itens como botões de seleção (`aria-pressed`, miniatura do render frontal, serial, nome, tipo).
- **SELECTED:** o item ganha borda de acento, e o CRT mostra a arte com a etiqueta "CARTRIDGE DETECTED · MC-001". A faixa do slot ganha o primário "Inserir cartucho". Selecionar e inserir são dois passos: a seleção **prepara** o sistema.
- **INSERTING:** LOADING CARTRIDGE... com uma barra de 600 ms na tela; a faixa mostra "CARREGANDO MC-001".
- **READY:** teaser no CRT. A faixa mostra o cartucho encaixado no slot, o LED verde, "MC-001 NO SLOT", Pausar e Ejetar. O case vem abaixo, em duas colunas.
- **Forças:** é a que mais parece produto do ecossistema MC-01, e escala naturalmente (a lista cresce).
- **Limites:** com um só cartucho, a biblioteca fica quase vazia e o CRT vazio domina; dá a sensação de sistema esperando conteúdo. Pede dois passos para a mesma ação.

## 6. Recomendação — H (híbrido)

**H = INITIAL de A + READY de B, com a biblioteca de B ativada por regra.**

- **Com 1 cartucho (hoje):** INITIAL e SELECTED como em A (objeto em destaque, um primário). A inserção é a de A: o cartucho desce sobre o MC-01 que liga.
- **READY:** a faixa do slot de B (cartucho encaixado, LED, Pausar, Ejetar) fica acima. Abaixo vêm o CRT com o teaser (7/12, fixo ao rolar) e o case fora do vidro (5/12).
- **Com 2 ou mais cartuchos aprovados:** a biblioteca de B aparece como seletor. O cartucho selecionado ocupa o destaque de A, e o fluxo de inserção não muda. Nenhum slot vazio, nenhum cartucho inventado.
- **Por quê:**
  - resolve o espaço vazio de hoje sem fingir uma coleção;
  - deixa a metáfora visível nos dois momentos: o objeto antes, o objeto dentro do sistema depois;
  - mantém um único primário por região;
  - cresce sem redesenho.
- **Custo:** dois layouts (destaque e sistema) e a regra 1 versus 2+. É o mesmo trabalho de A, mais a faixa do slot.
- **Honestidade sobre as direções:** com um só cartucho, H é igual a A até o READY. Na prática há **duas direções** (A e B) e uma variante de A que pega o READY de B. O H com 2 ou mais cartuchos é **outro layout**: biblioteca, troca de cartucho sem ejetar (D-058 §3) e biblioteca no mobile antes do destaque. Ainda não foi prototipado, porque exigiria cartuchos fictícios (ver §13).

## 7. Comportamento proposto de inserção

| Estado               | O que o visitante vê                                                                                                                                 | Acessibilidade                                                                                                                                                                                                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| INITIAL              | Cartucho em destaque, NESTE CARTUCHO, "Inserir cartucho" (primário).                                                                                 | Botão nativo; o objeto é decorativo (`aria-hidden`), com a mesma ação para ponteiro.                                                                                                                                                                                                 |
| SELECTED             | A e H: o cartucho levanta (foco ou hover; no toque, o toque já insere). B ou H com 2+: o item fica marcado e o CRT mostra CARTRIDGE DETECTED.        | Nada depende de hover. A seleção da biblioteca usa `aria-current`, com nome estável, e anuncia "SYSTEM HORIZON selecionado".                                                                                                                                                         |
| INSERTING (≈ 600 ms) | O cartucho desce (450 ms) sobre o MC-01, que liga (300 ms) com LOADING CARTRIDGE... e uma barra.                                                     | O botão continua no DOM, com `aria-disabled`, e o foco não se perde. `role="status"`: "Carregando cartucho". Com reduced motion, vai direto a READY.                                                                                                                                 |
| READY                | Faixa do slot (cartucho encaixado, LED verde), teaser no CRT e case ao lado.                                                                         | A página rola até o sistema (`ViewportScroller`, offset do header). O foco vai ao estado do slot (B/H; Tab segue para Pausar e Ejetar) ou ao título do case (A), sem anúncio duplicado. O teaser tem Pausar/Reproduzir (WCAG 2.2.2), para em 3 voltas e não roda com reduced motion. |
| EJECT                | Volta a INITIAL.                                                                                                                                     | O foco volta ao "Inserir cartucho" (A/H) ou ao item da biblioteca (B), rolando até ele se preciso; o anúncio é "Cartucho ejetado".                                                                                                                                                   |
| ERROR / FALLBACK     | Render indisponível: MC-CART em CSS (já existe). Teaser indisponível: arte estática com TEASER INDISPONÍVEL. O case continua inteiro, fora do vidro. | O texto nunca depende de imagem nem de canvas.                                                                                                                                                                                                                                       |

Só CSS (transições e `@keyframes`) e signals; sem biblioteca de animação. Toque, clique, Enter e Space seguem a semântica de botão. Não há arrastar e soltar.

## 8. Project Viewer (o que aparece depois de inserir)

- **No vidro:** o que é tela: o teaser (MC-001), uma demonstração ou screenshots de outros projetos, ou a arte estática. Texto essencial nunca fica dentro da imagem; as legendas de sistema são etiquetas sólidas.
- **Fora do vidro (case):**
  - serial e tipo;
  - nome;
  - **PROPOSTA** (descrição);
  - **MINHA CONTRIBUIÇÃO** (o `role` do projeto);
  - **STACK**;
  - **APRENDIZADOS**;
  - **EXPERIÊNCIA**: o que este cartucho oferece agora. Para o MC-001: "Teaser em execução no MC-01 e case do projeto. A experiência jogável ainda não está disponível.";
  - **EVIDÊNCIAS** (links reais).
- **Voltar ao Inventory:** "Ejetar cartucho", uma vez só, na faixa do slot (H/B) ou no case (A).
- **Não repetir:** a descrição e a arte do destaque somem no READY (o case as substitui). O Campaign Log conta a história; o case mostra o projeto. Se um projeto também for checkpoint (ScoutEvo, EOS, Axia, Comunidade ON), o case fala do produto e da contribuição, não da trajetória.
- **Profundidade futura:** uma página por case (`/projects/:slug`, já no roadmap) pode aprofundar, e o viewer ganha um link "Ver o case completo". Fora desta rodada.

## 9. Estratégia para múltiplos cartuchos

- **Regra de layout:** 1 cartucho aprovado = destaque; 2 ou mais = biblioteca + destaque do selecionado. A biblioteca nunca mostra slots vazios nem itens sem aprovação.
- **Tipos de experiência**, todos sob a mesma linguagem MC-CART, cada um com sua tela:

| Tipo                        | Exemplo possível                        | No vidro             | No case                                    |
| --------------------------- | --------------------------------------- | -------------------- | ------------------------------------------ |
| Experiência especial        | MC-001 SYSTEM HORIZON                   | teaser (engine SH)   | proposta, contribuição, stack              |
| Experiência interativa      | um jogo ou protótipo jogável, se houver | demo real            | como jogar, links                          |
| Case profissional           | projeto de trabalho, se aprovado        | screenshots ou arte  | contexto público, contribuição, evidências |
| Documentação e demonstração | projeto com repositório                 | screenshots ou vídeo | links de repo e demo                       |

- **Modelo (proposta, não implementado):** `Project.experiences: readonly { kind: 'teaser' | 'playable' | 'demo' | 'case'; label: Localized }[]` alimenta NESTE CARTUCHO, EXPERIÊNCIA e o que o vidro mostra. "Jogável" só entra quando existir de verdade.
- **Candidatos citados** (Aedes Revenge, ScoutEvo, EOS, Axia, Comunidade ON) só entram com decisão editorial, assets aprovados e confidencialidade resolvida (D-040/D-042). Nenhum aparece nos protótipos.

## 10. Responsividade

- **1440:** composição de referência (7 + 5 colunas).
- **1024:** a mesma, compacta.
- **820:** composição própria de tablet. No destaque, objeto e editorial lado a lado (4 + 4 de 8 colunas, 699 px de altura em vez de 1200). No READY, CRT e case empilhados.
- **390:** sequência **cartucho → ação → projeto**. No destaque: objeto, editorial e botão. No READY: faixa do slot (ação), CRT e case. Em B, a faixa com a ação vem antes da tela.
- Sem rolagem horizontal em nenhuma largura testada.

## 11. Performance

- Reuso dos WebP oficiais. Na implementação, proponho derivados redimensionados dos renders aprovados, sem arte nova (ver §13, item 5):
  - ¾ em 640 e 960 px com `srcset`: hoje 376 KB a 1244 px, desenhado com 608 px no desktop e 358 px no mobile;
  - frontal em 240 px para miniaturas: hoje 176 KB a 960 px, desenhado com ~90 px.
- O Inventory fica abaixo da dobra: `loading="lazy"` no render. A engine do teaser carrega por `@defer`, só quando o cartucho é inserido.
- **Dois teasers na página:** a instância do Hero já pausa fora da viewport. A do Inventory só existe depois da inserção e pausa ao ejetar.
- **Orçamento de CSS:** a seção se divide em componentes (destaque, faixa do slot, case) para ficar dentro dos 4 kB por componente.
- **Layout estável:** todas as imagens têm `width`/`height`; a área do CRT tem proporção 4:3 fixa.

## 12. Acessibilidade

- Mantém o que o D-058 já garante: botões nativos, foco visível, `role="status"`, foco no título do case e de volta ao ejetar, reduced motion e nada só por hover.
- **Novo:** controle de pausa do teaser em todas as direções, perto do CRT e logo após o foco do READY; seleção da biblioteca com `aria-current`; legendas sobre a arte em etiqueta sólida e a arte sem esmaecer; botões Inserir e Ejetar com o nome do projeto e `aria-controls` (D-058); listener de mudança de reduced motion (como o Hero). Os rótulos do botão de pausa do Hero são assimétricos ("Pausar demonstração" / "Reproduzir"): vale alinhar no dicionário, que é congelado com o teaser.

## 13. Riscos, dependências e decisões do Eduardo

1. **Escolha da direção:** A, B ou H (recomendado).
2. **Nome do MC-001:** os dados dizem "Modo Campanha" (PORTFÓLIO INTERATIVO); o brief e o rótulo dizem SYSTEM HORIZON. É preciso decidir o `title` do projeto, o `type` impresso e se a descrição muda.
3. **Teaser no Inventory:** é o uso do teaser congelado num segundo lugar, sem mudar a engine. Precisa de aprovação. Alternativa: a arte estática no vidro.
4. **Textos dos protótipos:** NESTE CARTUCHO, EXPERIÊNCIA, PROPOSTA, MINHA CONTRIBUIÇÃO, a frase "A experiência jogável ainda não está disponível" e os estados do slot vão para o dicionário pt-BR/en com aprovação.
5. **Derivados dos renders** para performance: são versões menores dos arquivos aprovados, não arte nova. Precisam de OK.
6. **Modelo `experiences`** no `Project` (§9).
7. **Riscos:**
   - o render ¾ grande pode ler como "produto em destaque" se ganhar preço, pedestal ou brilho (nada disso entra);
   - dois canvas animados na página em aparelhos fracos (mitigado pela pausa fora da viewport, pelo `@defer` e pela parada em 3 voltas);
   - o case fixo ao lado do CRT no desktop pede checagem com textos longos de projetos futuros;
   - **o payoff da inserção repete a Hero:** o teaser do Inventory é o mesmo loop do topo da página. Alternativas: começar no quadro-chave com "Reproduzir" explícito, mostrar a arte estática, ou aceitar a repetição como intencional (decisão do Eduardo);
   - **"teaser indisponível" não é detectável sem tocar na engine congelada:** a tela cai em placeholders sem avisar. Na implementação, o fallback cobre só o que o host detecta (sem canvas 2D, falha do chunk); detectar mais exige um output novo na tela (mudança no D-068, com aprovação);
   - **dependência de render ¾ por cartucho:** o destaque pede o render ¾. Sem ele, usa o MC-CART em CSS com o artwork aprovado (nunca "PROJECT ARTWORK");
   - **CSS:** o protótipo somava ~11 kB numa folha (acima do limite de erro de 8 kB, o que quebrava o build de produção mesmo sem a rota estar no bundle) e agora está dividido em 4 folhas de até ~3,5 kB. A implementação **tem** de seguir a mesma divisão em componentes de até 4 kB (destaque, faixa do slot, case, biblioteca);
   - **imagens:** o ¾ carrega já no INITIAL (376 KB). Na implementação: `loading="lazy"` e derivados com `srcset`. O `mc-cart` precisaria de `srcset` no render para as miniaturas (pequena mudança de API);
   - **H com 2 ou mais cartuchos:** validar a regra 1 versus 2+, a troca sem ejetar e a biblioteca no mobile exigiria cartuchos de teste. Como o brief proíbe inventar cartuchos, isso só acontece com a sua autorização (fixtures MOCK dev-only, `mock-`) ou quando houver um segundo projeto aprovado.

## 14. Protótipo

- **Rota:** `npm start` → `/dev/inventory-lab` (e `/en/dev/inventory-lab`). Só no build de desenvolvimento (`dev.routes.development.ts`), nunca em produção.
- **Parâmetros:** `dir=a|b|h`, `state=initial|selected|inserting|ready`, `error=1` (render e teaser indisponíveis), `clean=1` (sem a barra do laboratório). A barra no canto inferior direito troca direção, estado, erro e idioma.
- **Código:** `src/app/dev/inventory-lab/` usa o `PROJECTS[0]` real, os renders oficiais, `mc-cart`, `mc-crt-project-viewer` e `app-system-horizon-screen` sem modificá-los. Os textos de protótipo ficam em `lab-copy.ts`. **Não é a implementação definitiva.**
- **Capturas:** `scratchpad/inventory/lab/<dir>-<state>-<lang>-<largura>.png` (A, B e H; todos os estados em 1440 e 390; INITIAL e READY em 1024 e 820; en em 1440 e 390; erro em 1440 e 390).

## 15. Revisão independente (REVIEWER, 2026-10-18)

Testes com entrada real (Tab, Enter, Space, clique e toque), reduced motion emulado, 4 larguras e medição de layout shift e imagens. **Recomendação: H, com condições.**

**Corrigido no protótipo depois da revisão** (conferido de novo com teclado em A, B e H, em 1440 e 390):

1. O foco se perdia na inserção e ao ejetar. Agora fica no botão e volta ao controle de origem, visível na tela.
2. Faltava rolagem no READY. Agora usa o `ViewportScroller`, com o foco abaixo do header em todas as larguras.
3. Inserir e Ejetar tinham perdido o nome com o projeto e o `aria-controls` (D-058). Restaurados.
4. O fallback mostrava "PROJECT ARTWORK" (proibido). Agora usa o artwork aprovado.
5. Em B, `aria-pressed` com nome variável virou `aria-current` com nome estável.
6. O INITIAL lia como página de produto. Ficou condensado (uma linha de serial, NESTE CARTUCHO numa linha, sem texto de apoio).
7. O título do case era pequeno; agora usa `section-title`. Pausar e Ejetar ficam logo depois do título em A.
8. A arte esmaecida (`opacity`) e o texto "ao lado" no mobile foram corrigidos; havia também anúncio duplo no READY e o slot vazio no erro.

**Fica para a implementação ou para a sua decisão:**

- divisão do CSS em componentes;
- derivados de imagem e `lazy`;
- detecção do erro do teaser;
- repetição do teaser da Hero;
- nome do MC-001;
- protótipo com 2 ou mais cartuchos;
- faixa do slot com 7 colunas presa ao CRT no desktop (sugestão);
- rótulos assimétricos de pausa.

## 16. H2 — Physical Cartridge Experience (estudo, D-076, 2026-10-18)

> Estado: **protótipo para comparação, não aprovado.** Assets oficiais do Eduardo: o MC-01 em camadas (traseira, cartucho, frente), mais o CRT frontal e o controle frontal. Rota: `/dev/inventory-lab?dir=h2` (`pad=1` liga o controle; `pose=out|aligned|partial|seated` congela o cartucho para capturas).

### 16.1 Assets e montagem

| Arquivo enviado                                                         | No repositório (fonte intacta)                 | Runtime (WebP com alfa, mesma escala)                                          | Tamanho |
| ----------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------ | ------- |
| `back.png` (1254 × 229)                                                 | `design/source/mc-01/console-back.png`         | `assets/mc-01/console-back.webp`                                               | 49 KB   |
| `front.png` (1254 × 640)                                                | `design/source/mc-01/console-front.png`        | `assets/mc-01/console-front.webp`                                              | 170 KB  |
| `midle.png` (699 × 500): o cartucho                                     | `design/source/mc-01/mc-001-console-scale.png` | `assets/cartridges/mc-001/console-scale.webp`                                  | 109 KB  |
| `Group 22.png` (1254 × 1074): referência                                | `design/source/mc-01/console-reference.png`    | — (só conferência)                                                             | —       |
| CRT frontal (1254 × 1254)                                               | `design/source/mc-01/crt-front.png`            | `assets/mc-01/crt-front.webp` (recorte das margens transparentes: 1108 × 1013) | 141 KB  |
| Controle (é o `design/source/hero/mc-01-controller.png` que já existia) | —                                              | `assets/mc-01/controller.webp` (recorte: 1230 × 867)                           | 175 KB  |

- **Registro por pixels contra a referência:**
  - a traseira está em y = 205 e a frente em y = 434, as duas recortes exatos (diferença 0);
  - o cartucho encaixado fica em (277, 0), na escala 1,0 (diferença média de 0,8 na parte visível).
  - As três camadas compartilham um sistema de coordenadas (a referência), sem escala, sem deformação e sem máscara.
- **Ocultação:** a borda superior da frente (y = 434) é opaca em toda a largura do slot (alfa 253–254). A frente esconde de verdade a base do cartucho: 66 px quando encaixado. Não foi preciso `clip-path` nem `mask-image`.
- **Conferência:** o console montado, com o cartucho encaixado e renderizado a 1254 px, comparado à referência dá diferença média de 2 a 5 níveis (de 255) por região, efeito da compressão WebP. Visualmente idêntico (`scratchpad/inventory/h2/h2-assembly-seated-1254.png`).
- **Halos:** 0,8 a 1,4% dos pixels são semitransparentes, só nas bordas. Nenhum halo visível sobre o fundo escuro.
- **CRT:** o vidro está em (121, 120, 862 × 656) no recorte, ≈ 4:3. A camada digital (arte, teaser, carregamento, fallback) fica num elemento próprio sobre o vidro, com raio elíptico (6% / 8%) que acompanha a curvatura do render.

### 16.2 Sistema de camadas (reutilizável)

- `mc01-console.ts` guarda a geometria **do console**: traseira, frente, slot e poses. Um container com `aspect-ratio` e `isolation: isolate` cria um contexto de empilhamento próprio (traseira < cartucho < frente). Todas as posições são variáveis CSS em % do container, então as camadas escalam juntas em qualquer largura.
- **Poses** (px da referência; 0 = encaixado): `out` −230 (fora, acima do slot aberto, com sombra de contato suave na tampa), `aligned` −167 (base na borda traseira do slot), `partial` −33, `seated` 0.
- **Movimento:** só `transform: translateY` em % da altura do cartucho, 620 ms, `cubic-bezier(0.5, 0, 0.25, 1)` (acelera, desacelera e para firme, sem cauda longa nem bounce; a versão de 750 ms foi revisada, §16.8). Ejetar usa o caminho inverso (600 ms). Reduced motion leva direto à pose final.
- **Outros cartuchos:** basta um render em escala do console (699 × 500, frontal); nenhuma coordenada é do projeto. Hoje o `midle.png` é o render frontal oficial reduzido: um segundo projeto precisa do mesmo derivado do seu render frontal aprovado.

### 16.3 Comportamento

| Estado    | Console                                                                                      | CRT frontal                                                                                                                                                                                         | Acessibilidade                                                                                                                            |
| --------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| INITIAL   | Cartucho fora, acima do slot aberto (laranja). "Inserir cartucho" (primário) + "SLOT VAZIO". | Desligado, com "INSERT CARTRIDGE".                                                                                                                                                                  | Botão nativo com o nome do projeto e `aria-controls`; o console é decorativo, e o clique nele é atalho de ponteiro.                       |
| SELECTED  | Foco ou hover na ação levanta o cartucho 3%.                                                 | —                                                                                                                                                                                                   | Não depende de hover.                                                                                                                     |
| INSERTING | O cartucho desce (620 ms) e some atrás da frente; o botão fica com `aria-disabled`.          | "LOADING CARTRIDGE..." + barra (450 ms).                                                                                                                                                            | O foco fica no botão; `role="status"` anuncia "Carregando cartucho".                                                                      |
| READY     | Encaixado; "Ejetar cartucho" + "MC-001 NO SLOT".                                             | **Arte oficial do SYSTEM HORIZON** (liga do centro, 280 ms) e "SYSTEM HORIZON · READY". O teaser só roda em "Reproduzir teaser" (com "Pausar teaser"); "Ejetar cartucho" fica nos controles do CRT. | Rola até o CRT; o foco vai ao estado (sem anúncio duplicado); Tab leva a Reproduzir e depois a Ejetar. Cerca de 1,1 s do clique ao READY. |
| EJECT     | Movimento inverso até `out`.                                                                 | Desliga.                                                                                                                                                                                            | O foco volta ao Inserir; o status anuncia "Cartucho ejetado".                                                                             |
| ERROR     | —                                                                                            | Arte estática + TEASER INDISPONÍVEL.                                                                                                                                                                | O case continua fora do vidro.                                                                                                            |

- O teaser **sob demanda** resolve o risco do §13 (o payoff repetia a Hero). O visitante vê a arte oficial e escolhe reproduzir.
- O case abaixo dos aparelhos não repete o nome nem a proposta (já estão no editorial). Fatos em 3 colunas no desktop.

### 16.4 Composição

- **1440 e 1024:**
  - à esquerda, o editorial (serial, nome, descrição, NESTE CARTUCHO) e o console com o cartucho, com a ação logo abaixo;
  - à direita, o CRT frontal, maior, apoiado na mesma linha de base;
  - o case vem embaixo.
- **820:** console e CRT lado a lado (4 + 4 colunas), com o editorial acima.
- **390:** editorial → console com o cartucho (largura total, legível) → ação → CRT → case. A sequência cartucho → ação → projeto se mantém.
- **Folga acima do cartucho encaixado:** a altura do console inclui o espaço da pose `out`, para a página não pular durante a inserção. No READY isso aparece como respiro acima do cartucho.
- **Controle (`pad=1`): não recomendado agora.**
  - No desktop, encosta na base do CRT e o cabo parece ligado à TV.
  - Disputa atenção com o cartucho e aumenta a altura da seção (+160 px no desktop, +175 no mobile), sem função.
  - Faz sentido só quando houver uma experiência jogável de verdade, como contexto dela.

### 16.5 Como a montagem física se encaixa em A, B e H

- **A:** o console com o cartucho substitui com vantagem o render ¾ isolado. Responde à crítica de "página de produto": o objeto passa a estar num sistema, não numa vitrine. Na prática, **A + console + CRT = H2**.
- **B:** a biblioteca permanente ao lado do console e do CRT vira três colunas disputando a largura. Mesmo assim, a seleção de B continua útil para muitos cartuchos: escolher um cartucho na biblioteca troca o que está **fora, acima do slot**. Com um cartucho só, a biblioteca segue vazia.
- **H:** H2 é a evolução direta de H. O INITIAL ganha o objeto num sistema, e o READY troca o CRT em CSS e a faixa do slot pelos renders oficiais (o próprio console mostra o cartucho encaixado). A biblioteca aparece só com 2 ou mais cartuchos, como seletor do cartucho fora do slot.

### 16.6 Riscos e dependências

1. **Peso:** no INITIAL carregam console (220 KB), cartucho (109 KB) e CRT (141 KB), cerca de 470 KB. Com `loading="lazy"` (a seção fica abaixo da dobra) e derivados menores para o mobile (640 px), o peso cai bastante. O controle não entra.
2. **Assets públicos não usados em produção:** os WebP do protótipo ficam em `public/` e são copiados para o build (cerca de 640 KB), mas nenhuma página de produção os carrega. Se H2 não for escolhida, saem.
3. **Novos cartuchos** precisam do derivado em escala do console (699 × 500) a partir do render frontal aprovado.
4. **O CRT em CSS (`mc-crt-project-viewer`) deixa de ser usado no Inventory** se H2 for escolhida. O componente fica no design system; é uma decisão de direção.
5. Os pontos pendentes de §13 continuam valendo: nome do MC-001, textos e o modelo `experiences`.

### 16.7 Capturas

`scratchpad/inventory/h2/`:

- **Montagem:** `h2-assembly-seated-1254.png`.
- **Sequência:** `seq-{out,aligned,partial,seated,ready}-1440.png` e a tira `seq-strip-1440.png`.
- **Composições:** `h2-{initial,ready}-{pt,en}-{1440,390}.png` e `h2-{initial,ready}-pt-{1024,820}.png`.
- **Com o controle:** `h2pad-*.png`.
- **Teaser no vidro:** `h2-teaser-{1440,390}.png`.
- **Erro:** `h2-ready-err-pt-{1440,390}.png`.

### 16.8 Revisão independente do H2 (REVIEWER, 2026-10-18)

**Veredito:** é a direção com a metáfora mais legível até agora, com montagem tecnicamente impecável. O REVIEWER recomenda H2 para 1 cartucho, **condicionado às decisões D1–D4** e às correções B1–B4.

- **Montagem:** com os PNGs-fonte, pixel-exata (diferença de 0,01; deslocar 1 px já dá cerca de 8). Com os WebP, diferença de 2 a 5 níveis só em detalhe fino do rótulo. A junção traseira/frente não tem fresta em 1440@2x, 1024, 820, 390@3x, 375@2x e 412@2,625 (testado com fundo magenta).
- **Perspectiva:** de `aligned` a `seated`, lê fisicamente certo; o cartucho passa à frente da parede traseira do slot e atrás do lábio frontal.

**Corrigido no protótipo e conferido de novo:**

| #   | Problema                                                                             | Correção                                                                         | Medição depois                                  |
| --- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------- |
| B1  | Ejetar levava 200 ms com hover ou foco (conflito de especificidade com o "levantar") | Estado `is-ejecting` durante a volta                                             | ~515 ms com foco no botão, em todas as larguras |
| B2  | A TV saltava 80–93 px no READY e ao ejetar (CLS 0,021)                               | Linha da ação e controles do CRT com a altura do READY reservada desde o INITIAL | 0 px em 1440, 1024 e 390; 1 px em 820           |
| B3  | Anúncio duplo no READY                                                               | Só o foco anuncia                                                                | —                                               |
| B4  | Ejetar ficava antes do foco (só com Shift+Tab)                                       | Ejetar vai para os controles do CRT, depois de Reproduzir (sem duplicar)         | Ordem: estado → Reproduzir → Ejetar             |

**Também corrigido:**

- o hover/foco agora aproxima o cartucho do slot (antes o afastava);
- a sombra de contato na pose `out`;
- o encaixe ficou mais firme (620 ms, sem a cauda de ~190 ms);
- no erro, o status diz TEASER INDISPONÍVEL (não READY);
- rótulos simétricos ("Reproduzir teaser" / "Pausar teaser") e `aria-controls` no botão;
- o `cursor: pointer` do console só no INITIAL;
- o listener de mudança de reduced motion.

**Decisões do Eduardo (levantadas pelo REVIEWER):**

- **D1 — Qual é o MC-01 canônico.**
  - O fundo da Hero (D-067) mostra um MC-01 preto e baixo, um CRT preto quadrado e outro controle. O H2 usa um console grafite volumoso com laterais laranja, e um CRT frontal diferente.
  - Com H2, a página teria **dois desenhos de MC-01**.
  - Ou um deles vira o canônico (e o outro é ajustado depois), ou a diferença é aceita.
- **D2 — O MC-001 em escala do console é outro shell.**
  - O `front.webp` (D-065) reduzido não coincide com o `midle.png` (diferença média de 64): mudam o entalhe do topo, as pegas, a proporção e o recorte do rótulo.
  - É preciso decidir qual vale. Cada cartucho novo vai precisar de um render dedicado em escala do console (699 × 500, mesma pose e luz, com 66 px de base escondível).
  - O modelo ganharia `cartridge.renders.console`.
- **D3 — O READY repete o quadro da Hero:** o console com o SYSTEM HORIZON encaixado e o CRT com a mesma arte (e, com o controle, o mesmo trio).
- **D4 — Sair do `mc-crt-frame`, do `mc-crt-project-viewer` e do `mc-cart` no Inventory e usar renders.** É uma decisão de design system, não só de layout (os componentes ficam no showcase).

**Pendente (não bloqueante):**

- No INITIAL em 1440, o CRT vazio é o maior elemento (a mesma fraqueza de B).
- Em 820, TV e console ficam com escalas e linhas de base diferentes.
- Há uma folga de ~70–90 px acima do cartucho encaixado.
- Imagens sem `srcset`/`lazy` (481 KB no INITIAL) e o teaser sem `@defer`.
- Não há fallback se as camadas do console falharem.
- O READY acumula três "ligar" (LOADING, power-on da arte, boot do teaser).
- A sombra da pose `out` é muito sutil com o token disponível.
- **O controle:** descartado nesta etapa. O cabo cobria o status, abria um vão vertical e sugeria jogabilidade.

**Alternativa se D1 ou D4 forem "não":** H com a inserção física do H2 só na faixa do slot, mantendo o MC-01 da Hero e o `mc-crt-frame`.

## 17. Implementação do H2 na Home (D-077, 2026-10-18)

### 17.1 Arquitetura

| Peça              | Onde                                                     | Papel                                                                                                                                                                       |
| ----------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Estado de domínio | `features/project-inventory/inventory.machine.ts`        | Transições puras e `inventoryView(state)`: pose, movimento, texto do slot, LEDs (slot e tela), tela do CRT, botões, case, escolha e anúncio. Nada derivado de flags soltas. |
| Inventory         | `features/project-inventory/project-inventory-section.*` | Compõe editorial, `mc-console`, `mc-crt-front`, controles e case; agenda as transições (620 / 450 / 600 ms); foco, rolagem e anúncios.                                      |
| Case              | `features/project-inventory/project-case.*`              | Fora do vidro: minha contribuição, stack, aprendizados, evidências.                                                                                                         |
| MC-01 físico      | `shared/signature/console/`                              | Três camadas oficiais com geometria do console (`console.geometry.ts`); só `transform`. Decorativo; avisa falha de camada.                                                  |
| CRT frontal       | `shared/signature/crt-front/`                            | Render + camada digital no vidro; `standby` escurece o vidro. Avisa falha.                                                                                                  |
| Projetos          | `INVENTORY_PROJECTS`                                     | Produção: `inventoryProjects`. Laboratório e testes: fixtures isoladas.                                                                                                     |

### 17.2 Estados (um único estado decide tudo)

| Estado                          | Slot                               | LED do slot / da tela | CRT                                   | Controles                                           | Case  | Anúncio                  |
| ------------------------------- | ---------------------------------- | --------------------- | ------------------------------------- | --------------------------------------------------- | ----- | ------------------------ |
| INITIAL (`empty`)               | SLOT VAZIO / EMPTY SLOT            | apagado / apagado     | standby escurecido + INSERT CARTRIDGE | Inserir cartucho                                    | —     | —                        |
| INSERTING (`inserting`, 620 ms) | CARREGANDO MC-001 / LOADING MC-001 | laranja / laranja     | standby                               | Inserir bloqueado (`aria-disabled`, focável)        | entra | "Carregando cartucho."   |
| (`loading`, 450 ms)             | CARREGANDO MC-001                  | laranja / laranja     | LOADING CARTRIDGE... + barra          | idem                                                | sim   | —                        |
| READY (`ready`, art)            | MC-001 INSERIDO / MC-001 INSERTED  | verde / verde         | arte oficial                          | SYSTEM HORIZON · READY · Reproduzir teaser · Ejetar | sim   | foco no estado           |
| READY (teaser)                  | MC-001 INSERIDO                    | verde / verde         | teaser (sob demanda)                  | Pausar/Reproduzir teaser · Ejetar                   | sim   | —                        |
| ERRO do teaser                  | MC-001 INSERIDO                    | verde / vermelho      | arte + TEASER INDISPONÍVEL            | SYSTEM HORIZON · TEASER INDISPONÍVEL · Ejetar       | sim   | "O teaser não carregou…" |
| EJECTING (600 ms)               | EJETANDO MC-001 / EJECTING MC-001  | laranja / apagado     | standby                               | —                                                   | sai   | —                        |
| ERRO de asset (`unavailable`)   | MC-01 INDISPONÍVEL                 | vermelho              | — (MC-CART canônico em CSS)           | —                                                   | sim   | —                        |

- **Reduced motion:** `insert` vai direto a READY e `eject` direto a INITIAL.
- **Foco:** no READY, a página rola até o CRT e o foco vai a "SYSTEM HORIZON · READY", depois Tab: Reproduzir → Ejetar. Ao ejetar, o foco volta a "Inserir cartucho", visível.
- **Troca (2+ cartuchos):** escolher outro no READY ejeta o atual e deixa o escolhido fora do slot.

### 17.3 Comparação com o H2 do laboratório

- **Mantido:** a montagem em camadas, as poses, a inserção de 620 ms, o caminho inverso, o CRT frontal, a arte oficial como padrão, o teaser sob demanda, o case fora do vidro, a ordem de foco e as alturas reservadas.
- **Mudou, por aprovação ou correção:**
  1. "MC-001 NO SLOT" virou **MC-001 INSERIDO**, e o estado do ejetar tem texto próprio, **EJETANDO**.
  2. Composição 6 + 6: o CRT tem a mesma largura do console (antes 7/12) e o vidro em espera é escurecido, então o cartucho é o protagonista do INITIAL.
  3. LED do slot e LED da tela separados: no erro do teaser, o cartucho segue "inserido" (verde) e só a tela fica vermelha.
  4. O case entra junto com o clique de inserir, não 1,1 s depois. Isso evitou um CLS de 0,046 no desktop.
  5. No mobile, botão e estado ficam empilhados com altura reservada. O texto mais longo de CARREGANDO quebrava linha e deslocava a TV (CLS 0,018 → 0,001).
  6. Linhas de base iguais a partir do tablet: a ação e os controles do CRT têm a mesma altura.
  7. O fallback de asset agora existe de fato: se uma camada falha, aparece o MC-CART canônico em CSS e o case.
  8. Copy do Eduardo, a experiência guiada por dados e o tipo EXPERIÊNCIA NARRATIVA.
  9. Sem controle.

### 17.4 Identidade do MC-CART: conflito em aberto

Comparação lado a lado: `scratchpad/inventory/mc001-identity.png` e `scratchpad/review-final/review-final-identity.png`.

- **Iguais:** o rótulo (arte, SYSTEM HORIZON, MC-CART, MC-001, MODO CAMPANHA, glifo), os trilhos laterais laranja, a fenda laranja à direita, o triângulo, a paleta e a tipografia.
- **Diferentes, e estruturais:**
  - **Topo:** o canônico (D-065) tem um entalhe central rebaixado; a variante tem um topo escalonado, com blocos laterais elevados e uma placa central.
  - **Pegas laterais:** têm outro desenho.
  - **Janela do rótulo:** tem outra proporção, cerca de 4% maior e mais baixa, e a arte tem outro recorte.
- **Leitura revisada:** a primeira auditoria falava em "mesmo modelo, câmera mais alta". A revisão independente mostrou que os dois renders são frontais, com a mesma proporção (1,39 e 1,40), e uma câmera mais alta não muda a silhueta. É o mesmo design (rótulo, paleta, lockup) em **outro shell**.
- **O que foi feito:**
  - nada no design canônico foi substituído: `renders.front` segue como identidade nos dados;
  - a variante entra como `renders.console`, porque o H2 aprovado depende dela;
  - na Home, o visitante vê só a variante (a pose fora, a inserção e o encaixe).
- **Decisão do Eduardo:** (a) aceitar a variante como shell oficial do MC-001 para o console, e então atualizar D-065, o `front` e o `threeQuarter` para o mesmo shell; ou (b) pedir um render do console a partir do shell D-065, mantendo a geometria do slot (699 × 500, base de 66 px).

### 17.5 Performance

|                            | 1x (1440)                                                   | 2x (1440) / 3x (390)                   |
| -------------------------- | ----------------------------------------------------------- | -------------------------------------- |
| Antes de rolar até a seção | 0 imagens do Inventory (`lazy`)                             | 0                                      |
| INITIAL                    | **151 KB** (traseira 16, frente 40, cartucho 31, CRT 64)    | 424 KB (derivados de 1254/1108/699 px) |
| READY (arte)               | +94 KB (arte de 640 px)                                     | +215 KB (arte de 960 px)               |
| Teaser                     | chunk de 15 KB, só em "Reproduzir teaser" (o mesmo da Hero) | idem                                   |

- **Comparação:** o laboratório carregava 481 KB no INITIAL em qualquer tela. Sem downloads duplicados.
- **CLS:** 0,0007 (1440) e 0,0013 (390) somando inserir e ejetar.
- **Lighthouse:**
  - acessibilidade 100 (mobile pt, mobile en e desktop), sem auditoria falhando;
  - performance mobile 81, o mesmo nível de antes desta rodada (82);
  - performance desktop 99.

### 17.6 Pendências

1. **Harmonização do MC-01 da Hero** (foto cinematográfica) com o MC-01 canônico do H2. A Hero não foi alterada.
2. **Confirmar o tipo do MC-001:** "EXPERIÊNCIA NARRATIVA / NARRATIVE EXPERIENCE".
3. **Contribuição e aprendizados do MC-001** descrevem o portfólio como um todo; vale revisar se devem falar do SYSTEM HORIZON.
4. **Telas de alta densidade (2x/3x)** baixam os derivados maiores (424 KB). Um derivado intermediário (~1080 px) economizaria pouco, com risco de nitidez.
5. **Próximos cartuchos** precisam do render em escala do console (699 × 500) a partir do render frontal aprovado, e as miniaturas da escolha, de um derivado pequeno do `front`.

### 17.7 Revisão independente (REVIEWER, 2026-10-18)

**Veredito: APROVADO COM RESSALVAS.**

**Conferido pelo REVIEWER:**

- **Montagem pixel-exata:** diferença de 2,0 a 5,1 contra a referência; com 1 px de deslocamento sobe para 7,5 a 13,5.
- **Linhas de base iguais** em 1440, 1024 e 820.
- **Estados:** nenhum contraditório nas amostras a cada 30–40 ms, em pt e en, nas quatro larguras, incluindo reduced motion e falhas de camada, de teaser e do laboratório.
- **Lighthouse:** acessibilidade 1,0.
- **Contraste:** novos textos de 5,4 a 8,6.
- **Peso:** 151 KB a 1x no INITIAL; nada carrega antes de rolar; sem duplicatas.
- **CLS fora de interação:** de 0,0003 a 0,0013.
- **Áreas congeladas:** intactas.
- **Build:** sem warnings.

**Corrigido depois da revisão** (conferido de novo com teclado e mouse em 1440 e 390):

1. **A1:** quando o teaser falhava, o foco caía no `body`. Agora vai ao estado "SYSTEM HORIZON · TEASER INDISPONÍVEL".
2. **A2:** durante o ejetar, o foco ficava no `body`. Agora o "Inserir cartucho" volta na hora, bloqueado, e recebe o foco.
3. **A3:** o Tab até o Inserir deixava o cartucho sob o header. Agora o foco por teclado traz o console inteiro à vista.
4. **Falha da arte do READY:** o vidro ficava preto. Agora a falha tem estado próprio (`art-unavailable`): o nome no vidro, com o teaser ainda possível.
5. **Texto do slot:** pulava ~208 px no READY e quebrava linha em 820. Agora o estado fica em cima, a ação embaixo, e a mesma altura de 76 px é reservada em todas as larguras: o texto não se move e nada desloca a página.
6. **Identidade do MC-CART:** a descrição imprecisa no código e nos docs foi corrigida e o conflito ficou registrado como aberto (§17.4).

**Observações mantidas:**

- **Capturas `seq-*`:** congelam a pose com os textos do INITIAL. São só estudo de movimento, não um estado do runtime.
- **Chunk do teaser:** é o mesmo da Hero, que já o baixa no idle; "sob demanda" no Inventory quer dizer montagem sob demanda.
- **Folga acima do cartucho encaixado:** ~108 px em 1440.
- **Case:** só aparece depois do clique em Inserir; sem prerender.
- **Confirmações editoriais:** EXPERIÊNCIA NARRATIVA; os rótulos MINHA CONTRIBUIÇÃO e EVIDÊNCIAS; o case com conteúdo do portfólio sob o título SYSTEM HORIZON.

### 17.8 Ajuste de proporção console × CRT (2026-10-18)

A pedido do Eduardo, **a TV é a protagonista** e o console, o aparelho que roda o cartucho. Só a composição mudou: as três camadas, as coordenadas, as poses, a animação, os estados e os textos ficaram como estavam.

| Largura | Colunas                           | Console                    | CRT           | CRT / console | Altura da seção (antes → depois) |
| ------- | --------------------------------- | -------------------------- | ------------- | ------------- | -------------------------------- |
| 1440    | 44 / 56, 48 px entre os aparelhos | 507 px (42%)               | 645 px (54%)  | 1,27×         | 1152 → 1096                      |
| 1024    | 44 / 56                           | 393 px                     | 501 px        | 1,27×         | 978 → 964                        |
| 820     | 45 / 55                           | 318 px                     | 389 px        | 1,22×         | 835 → 839                        |
| 390     | empilhado                         | 304 px (85%, centralizado) | 358 px (100%) | 1,18×         | 1319 → 1291                      |

- **Escala do console:** o console escala inteiro, as três camadas juntas, porque as posições são % do próprio container.
- **Encaixe:** continua pixel-exato. Contra a referência em 1254 px, a diferença média é 5,0 no cartucho, 3,65 no slot e 2,17 na frente, os mesmos valores de antes.
- **Vidro:** a camada digital acompanha o render com erro de 0,01 px em todas as larguras.
- **Linhas de base:** console e TV seguem na mesma linha (os estados ficam na mesma altura).
- **Sem regressões:** sem overflow nem CLS ao inserir ou ejetar; a ordem de foco não mudou; Lighthouse dá acessibilidade 100.
- **`sizes`:** foram atualizados para as novas larguras. O INITIAL em 390@3x caiu de 424 para 299 KB.
- **Capturas antes × depois:** `scratchpad/inventory/proportion/compare-*.png`.
