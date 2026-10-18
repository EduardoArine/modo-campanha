# 24 — Project Inventory: refinamento da experiência

> Status: **PROPOSTA, aguardando a escolha de direção do Eduardo** (D-075). Nada da Home mudou: os protótipos são uma rota dev-only (`/dev/inventory-lab`), fora de produção. O congelamento visual do Project Inventory (02-C) foi suspenso por autorização do Eduardo só para esta revisão. Hero, teaser SYSTEM HORIZON, Campaign Log e as demais seções não mudam.

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
