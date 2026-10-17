# 15 — Home Slice 03: Campaign Log

> Status: **plano aprovado (D-048).** Direção visual **A + C — Checkpoint Log Editorial** aprovada. **03-B — CAMPAIGN LOG VISUAL: APPROVED** e congelado (D-050). Estado: **STRUCTURE / VISUAL: APPROVED** · **EDITORIAL CONTENT: PENDING FACTUAL REVIEW**.
>
> | Etapa | Estado                                                              |
> | ----- | ------------------------------------------------------------------- |
> | 03-0  | MOCK content for development (histórico real pendente)              |
> | 03-A  | model / data infrastructure done                                    |
> | 03-B  | visual approved (frozen)                                            |
> | 03-C  | editorial content pending (não bloqueia as próximas partes da Home) |
>
> ⚠️ **Capturas do ambiente de desenvolvimento nunca devem circular como fato**: este MOCK tem períodos e nomes plausíveis (D-062).
>
> ⚠️ **CAMPAIGN LOG CONTENT = MOCK FOR VISUAL DEVELOPMENT.** Os entries em `src/app/data/campaign-log.data.development.ts` não são fatos sobre o Eduardo. Só existem em desenvolvimento e testes; a produção usa `campaign-log.data.ts` (vazio) e não renderiza a seção.

Abre a **FASE 4 — Career Content**.

## 1. Objetivo

Mostrar **como a trajetória profissional foi construída**: de onde Eduardo veio, quais mudanças marcaram a carreira e como desenvolvimento, games, produto e IA foram se conectando até o momento atual.

O Campaign Log é **uma seleção de 4–6 checkpoints**, não um currículo completo nem uma lista de empregos. Ele registra **o que mudou**, não responsabilidades.

Não é: RPG quest log literal, timeline gamer, terminal, currículo genérico, cópia do LinkedIn.

## 2. Papel na narrativa da Home

Hero → Player Status (quem é) → Skill Loadout (o que sabe) → Project Inventory (o que construiu) → **Campaign Log (como chegou aqui)**.

- Project Inventory mostra **o que foi construído**; Campaign Log mostra **como a trajetória evoluiu**. Nenhuma entrada descreve um projeto; um checkpoint pode citar um contexto profissional, mas não vira Project Card.
- Peso visual **intermediário**: mais expressivo que o Skill Loadout, abaixo do Hero e do MC-CART. Sem objeto físico.

## 3. Modelo de dados (proposta, implementação na 03-A)

```ts
type CampaignLogKind = 'origin' | 'checkpoint' | 'current';

interface CampaignLogPeriod {
  start: number; // ano real
  end?: number | 'present'; // ausente = ano único
}

interface CampaignLogEntry {
  id: string;
  kind: CampaignLogKind;
  period: CampaignLogPeriod;
  title: Localized;
  context?: Localized; // só quando útil e aprovado (ex.: nome da organização)
  summary: Localized; // 1–2 frases: o que mudou
  publication?: ContentPublication; // só se necessário à política de conteúdo
}
```

- **Semântica separada da apresentação:** `kind` guarda o significado do dado; o rótulo temático vem do dicionário de UI:
  - `origin` → **NEW GAME**
  - `checkpoint` → **CHECKPOINT**
  - `current` → **CAMPANHA ATUAL** / **CURRENT CAMPAIGN**
- Substitui `CampaignCheckpoint` (FASE 0), que tinha texto não localizado e o tipo `skill-unlocked` (conflita com a proibição de "unlocked").
- **Fora do modelo:** technologies, highlights, results, location, tags, XP, levels, métricas, achievements artificiais. O Campaign Log não repete o Skill Loadout.
- **Período:** ano, intervalo de anos ou atual. Formato visual final só depois dos dados reais. Mês só se os dados pedirem.
- **Publicação:** se adotada, mesma regra conservadora do D-044 (runtime só com conteúdo aprovado).

## 4. Conteúdo

### 4.1 Fatos já disponíveis

- Formação em **Tecnologia em Jogos Digitais** — **FATEC Americana**.
- **10+ anos em tecnologia**.
- Posicionamento atual: **Desenvolvedor de Produtos Digitais**.
- Atuação atual conectando desenvolvimento, produto, IA e gamificação.
- Campanha atual: **Comunidade On**.

Não há dados suficientes para uma cronologia. **Nenhuma data é inferida.**

### 4.2 Histórico bruto a receber do Eduardo (03-0)

Eduardo fornece o histórico; a seleção dos checkpoints é proposta a partir dele (não é preciso escolher antes):

1. **Formação:** período (ano de início/conclusão) na FATEC Americana; se a instituição aparece na interface.
2. **Empresas/organizações:** nome, período (anos), cargo(s) em cada uma.
3. **Autorização** para nomear cada organização (ou só descrever o contexto).
4. **O que mudou** em cada fase (indicação simples, em poucas palavras).
5. **Início do uso relevante de IA** no trabalho (ano e contexto).
6. **Início da Comunidade On** (ano), cargo a exibir e se a organização pode ser nomeada.
7. **Precisão:** confirmar que ano basta (ou se algum marco precisa de mês).
8. **Coerência:** confirmar se o primeiro marco profissional deve bater com os "10+ anos".

### 4.3 Não inferir

Anos, empresas, cargos, motivos de transição, tecnologias por período, responsabilidades, resultados, métricas, clientes e qualquer informação interna da Comunidade On / On Tech & Co. Paco (MC-002, `review`) não aparece no Campaign Log enquanto não for aprovado.

### 4.4 Princípio de seleção (critério editorial, não dado)

Um período vira checkpoint quando houve mudança significativa em pelo menos um destes aspectos: forma de construir software; responsabilidade; visão de produto; integração entre desenvolvimento e UX; retorno/influência da formação em games; gamificação; uso de IA; natureza do produto construído; momento profissional atual. **A mudança precisa ser sustentada pelo histórico fornecido.** Nem todo emprego vira checkpoint.

### 4.5 Lacunas

O Campaign Log pode não cobrir todos os anos: é **explicitamente uma seleção de checkpoints da trajetória**. Lacunas não são preenchidas.

### 4.6 Entrada atual

Curta. Player Status já mostra "CAMPANHA ATUAL: Comunidade On" e haverá a seção Current Main Quest; o Campaign Log registra **somente a transformação profissional daquele período**. Sem descrição do projeto Comunidade On e sem informação interna; dúvida → `review`.

## 5. Direção visual: A + C — Checkpoint Log Editorial (aprovada)

Avaliadas: **A — Vertical Checkpoint Log** (clara, segura, risco de currículo genérico), **B — Campaign Track** (autoral, mas parece mapa de fases e compete com o Inventory; fraca no mobile), **C — System Log** (editorial, risco de terminal/planilha; rótulos repetidos pesam no mobile).

Híbrido aprovado: estrutura da A + tipografia editorial da C.

- linha vertical discreta; markers quadrados (mesma linguagem do marcador do section header, menor);
- coluna de período; system label (NEW GAME / CHECKPOINT / CAMPANHA ATUAL); título; summary curto; context só quando útil e aprovado;
- entrada atual: marker laranja + `mc-status` (texto "ATIVO"); demais markers neutros;
- **sem** cards pesados, objeto físico, shadow, timeline alternando esquerda/direita, mapa de fases, métricas, badges, barras, XP, LV, score, rank, rarity, estrelas, "unlocked", percentuais.

A linguagem de jogo vem da composição e da nomenclatura, não de dados inventados.

### Responsivo

| Faixa             | Comportamento                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Desktop (≥ 1024)  | período em 2–3 colunas; linha e markers no gutter; conteúdo em ~6–7 colunas (medida de leitura); espaço livre à direita aceito |
| Tablet (768–1023) | mesma estrutura, período em 2/8 colunas                                                                                        |
| Mobile (< 768)    | linha na borda esquerda; período na linha do label (`■ CHECKPOINT · 2017–2020`), depois título e summary                       |

Sem scroll horizontal, zoom, hover, alternância esquerda/direita ou conectores cruzando a tela. A ordem cronológica se preserva naturalmente.

### Regras de conteúdo e apresentação (D-050)

- **Summary:** ~120–140 caracteres (≈ 2–3 linhas no desktop, 3–4 no mobile). Regra **editorial**: sem truncation CSS nem line-clamp.
- **Período da entrada atual:** `current` + `end: 'present'` → **DESDE 2025** / **SINCE 2025** (só apresentação; o modelo não muda). Origin/checkpoint: `YYYY — YYYY`.

## 6. Acessibilidade

- `<ol>` (ordem cronológica é significativa); ordem do DOM = ordem visual, **da origem ao atual**.
- `h3` por entrada; período em `<time datetime>` (dois elementos para intervalo).
- Label de tipo como texto visível; linha e markers decorativos (`aria-hidden`).
- "Atual" comunicado por texto (`mc-status`), nunca só por cor.
- Sem interação, foco ou semântica de botão. Pares de cor já existentes; nenhum par novo previsto.

## 7. Componentes

- **Reutilizados:** `mc-section-header` (**CAMPAIGN LOG** nos dois idiomas), `mc-status`, tokens, papéis tipográficos (`label`, `title-m`, `body`), grid e breakpoints.
- **Novos:** apenas a `CampaignLogSection` reescrita (SCSS local) e uma função pura de formatação de período, com testes. Nenhum componente compartilhado novo (a timeline só aparece uma vez).

## 8. i18n

- `sections.campaignLog` já existe (CAMPAIGN LOG).
- Novas chaves de UI: rótulos de `kind` (NEW GAME, CHECKPOINT, CAMPANHA ATUAL / CURRENT CAMPAIGN), "atual" / "present" e separador de intervalo.
- Conteúdo das entradas em `Localized`.

## 9. Header / navegação

Sem mudança até a 03-C. Depois da aprovação do Campaign Log implementado, **Jornada / Journey** volta ao header apontando para `#campaign-log`. Contato continua oculto até existir destino real.

## 10. Riscos

1. Conteúdo insuficiente (nenhuma data confirmada hoje): por isso a 03-0 vem primeiro.
2. Parecer currículo: poucos checkpoints, foco em "o que mudou", sem lista de tecnologias.
3. Confidencialidade da Comunidade On: entrada atual em `review` até ter texto público aprovado.
4. Duplicação com Player Status / Current Main Quest: entrada atual curta.
5. Anticlímax ou excesso depois do MC-CART: presença intermediária, sem objeto físico.
6. Datas inconsistentes com "10+ anos": confirmar na 03-0.

## 11. Etapas e checkpoints

| Etapa                      | Conteúdo                                                                                                       | Parada                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **03-0 Content inventory** | histórico bruto do Eduardo → proposta de 4–6 checkpoints bilíngues em `docs/14`, classificação approved/review | ◆ aprovação do conteúdo  |
| **03-A Model + data**      | `CampaignLogEntry`, formatação de período, runtime só com conteúdo aprovado, testes                            | ◆ aprovação              |
| **03-B Visual**            | seção A + C com dados reais; 1440 / 820 / 390 em pt-BR e en                                                    | ◆ revisão visual         |
| **03-C Integrated review** | Home completa até o Campaign Log; retorno de Jornada / Journey; docs                                           | ◆ aprovação final e push |

Commits ficam locais até a aprovação da 03-C (mesmo fluxo da 02-C).

## 12. Documentação ao longo do slice

`docs/14` (seção Campaign Log, só depois do histórico real), `docs/07` (modelo, na 03-A), `docs/02` (tipos de checkpoint), `docs/03` (Home e nav, na 03-C), roadmap, decision log e CLAUDE.md.

## 13. CHAPTER 00 — ORIGIN (D-070, 2026-10-17)

> Estado: **APPROVED e FROZEN** pelo Eduardo (2026-10-17), inclusive frases-resumo, fotos e textos alternativos. **Publicado na produção** (`CAMPAIGN_LOG_CHAPTERS = [ORIGIN_CHAPTER]`); sem deploy.

**Assinatura:** A campanha começou muito antes do código. / The campaign started long before the code.

Cinco checkpoints da origem da paixão por videogames, antes da formação e da carreira. É um relato pessoal real fornecido pelo Eduardo; os textos pt/en são dele, sem alteração de fatos, cronologia ou intenção.

| #   | Código (sistema)       | Quando                                 | Título pt / en                                              |
| --- | ---------------------- | -------------------------------------- | ----------------------------------------------------------- |
| 01  | FIRST CONTACT          | c. 1991 (aproximado, informado)        | Primeiro contato / First Contact                            |
| 02  | THE RENTAL STORE YEARS | Época do SNES / SNES era               | A escola das locadoras / The Rental Store Years             |
| 03  | THE LADYBUG WISH       | Infância / Childhood                   | O pedido à joaninha / The Ladybug Wish                      |
| 04  | EARNED, NOT GIVEN      | Época do PlayStation / PlayStation era | Uma conquista construída com trabalho / Earned Through Work |
| 05  | BUILT FROM MEMORIES    | Vida adulta / Adulthood                | Uma coleção de histórias / A Collection of Stories          |

**Apresentação (menor evolução do visual congelado, D-050):**

- **Cabeçalho:** o capítulo é o primeiro grupo do **mesmo eixo** do Campaign Log, com `CHAPTER 00 — ORIGIN` (h3), a assinatura e um marker warm vazado.
- **Checkpoints:** cada um mostra a época na coluna de período, o rótulo `CHECKPOINT 0N · CÓDIGO`, o título (h4) e uma frase do próprio texto. Tipografia, markers e spacing são os aprovados, sem redução.
- **História completa:** "Ler a história completa / Read the full story" abre um `<details>` nativo, que funciona com teclado e leitor de tela sem JS. Aberta, a história substitui a frase-resumo.
- **Linha profissional:** continua depois do capítulo, intacta (NEW GAME = formação; checkpoints; campanha atual). O cabeçalho e os checkpoints são itens do mesmo `<ol>` (lista plana), para o eixo continuar íntegro.

**Regras factuais:**

- **Datas:** só "c. 1991" é data; os outros quatro checkpoints usam a época descrita pelo Eduardo, sem anos inventados.
- **Joaninha:** mantém a ambiguidade ("não sei se foi coincidência ou sorte").
- **Trabalho:** o trabalho de servente de pedreiro não é experiência em tecnologia.
- **Causalidade:** nenhuma relação causal entre um jogo e a escolha profissional.
- **Marcas:** nomes de consoles e jogos aparecem só como texto do relato. A regra de marcas vale para assets e formatos visuais, e nenhum asset de terceiros foi usado.

**Pendências:**

1. ~~Fotografias~~ **integradas (2026-10-17):** as duas fotos da coleção e do móvel, fornecidas pelo Eduardo, ficam no checkpoint 05, dentro da história completa e logo depois do texto que as cita.
   - **Arquivos:** WebP em `public/assets/campaign-log/origin/` (`collection-front-{480,720}` em retrato 3:4 e `collection-wide-{640,960}` em paisagem 4:3, 22–56 KB). Proporção original, sem filtro pixel nem sombra, borda sutil; não há metadados nos originais.
   - **Layout:** lado a lado na mesma altura a partir de 768 px, empilhadas no celular.
   - **Carregamento:** `loading="lazy"`, então só carregam quando a história é aberta.
   - **Texto alternativo:** objetivo e bilíngue; precisa de aprovação.
   - **Marca na foto 2:** a TV mostra o logo de um jogo de terceiros (Gears 5). É registro documental, não asset do projeto, mas vale a sua decisão.
2. ~~Publicação~~ **feita:** o capítulo 00 está em `campaign-log.data.ts`, então a seção aparece em produção com ele (a linha profissional real ainda não existe).
3. ~~Checkpoint da FATEC Americana~~ **substituído pelo CHAPTER 01 real (§14).** A entrada MOCK da formação saiu do MOCK de desenvolvimento.
4. ~~Frases-resumo~~ **aprovadas** junto com o capítulo.
5. **Jornada / Journey no header:** o Campaign Log já está na produção, então pela regra 03-C a Jornada poderia voltar ao header. Não mexi no header (fora do escopo); depende do Eduardo.

## 14. CHAPTER 01 — DO CONTROLE AO CÓDIGO (D-071, 2026-10-17)

> Estado: **implementado em desenvolvimento, aguardando revisão visual do Eduardo**; não publicado em produção.

**Cabeçalho:** 2013 — 2017 · `CHAPTER 01 — DO CONTROLE AO CÓDIGO` (en: FROM CONTROLLER TO CODE) · assinatura "O que começou como paixão na infância se transformou em uma escolha de vida." · contexto "Tecnologia em Jogos Digitais · FATEC Americana". **Fechamento:** `CHECKPOINT COMPLETE — 2017` · "A campanha estava apenas começando."

| #   | Quando              | Título pt                                    | Título en (tradução)                    |
| --- | ------------------- | -------------------------------------------- | --------------------------------------- |
| 01  | 2013                | Quando a paixão virou escolha                | When Passion Became a Choice            |
| 02  | Durante a graduação | Aedes Revenge — Meu primeiro grande projeto  | Aedes Revenge — My First Big Project    |
| 03  | 2016                | Meu primeiro Melhor Jogo                     | My First Best Game Award                |
| 04  | 2017                | Um jogo de verdade, com jogadores de verdade | A Real Game, with Real Players          |
| 05  | 2017                | Dois prêmios e um TCC nota 10                | Two Awards and a Perfect-Score Capstone |

**Modelo (evolução mínima de §13):**

- `when` aceita ano confirmado (`{ year }`).
- `code` (codinome) ficou opcional; este capítulo não tem codinomes.
- O capítulo ganhou `name` localizado e três campos opcionais: `period`, `context` e `closing` (fechamento CHECKPOINT COMPLETE + ano final).

**Texto:**

- **Português:** o do Eduardo, sem alteração. As ênfases (negrito/itálico) viram texto simples, porque o modelo guarda parágrafos sem formatação.
- **Inglês:** tradução fiel, **pendente de aprovação**.
- **Frases-resumo:** extração literal; no 01, é a primeira frase do 2º parágrafo.

**Linha profissional:** a entrada MOCK da formação (FATEC) saiu do MOCK de desenvolvimento, porque este capítulo a substitui. Em produção nada muda até a aprovação.

**Pontos para o Eduardo:**

1. Revisão visual e aprovação da tradução para o inglês.
2. **Aedes Revenge como projeto:** o capítulo descreve o projeto em detalhe. Pela regra original (§2), o Campaign Log não descreve projetos. Aqui é parte do relato, mas o Aedes Revenge poderia virar um MC-CART no Project Inventory (serial a definir; o MC-002 é o Paco, em revisão).
3. **Achievements:** os dois prêmios e o TCC nota 10 são evidências reais. Pela regra de não repetir o Campaign Log, só entram em Achievements se forem apresentados de outro jeito, ou ficam só aqui.
4. **Tecnologias no texto** (Unity, C#): estão no relato do Eduardo; o Skill Loadout não lista Unity.
5. **Google Play:** o link expirou e o jogo não está mais publicado (Eduardo, 2026-10-17). Não há link. Retomar o Aedes Revenge fica como possível projeto futuro.
6. **TCC publicado:** o checkpoint 05 tem o link "Ler o TCC (PDF)" / "Read the capstone project (PDF, in Portuguese)" para o PDF no Repositório Institucional do Conhecimento do CPS (`ric.cps.sp.gov.br`, verificado: HTTP 200, PDF de ~3,3 MB). O link fica dentro da história completa, abaixo do texto, como ação `text` com ícone de link externo e "(abre em nova aba)" para leitor de tela. O Campaign Log passa a ter links só para documentos públicos que comprovam um checkpoint (campo `links`).
