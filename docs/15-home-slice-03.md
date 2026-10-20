# 15 — Home Slice 03: Campaign Log

> Status: **plano aprovado (D-048).** Direção visual **A + C — Checkpoint Log Editorial** aprovada. **03-B — CAMPAIGN LOG VISUAL: APPROVED** e congelado (D-050). **Conteúdo real publicado (D-074):** os CHAPTERS 00, 01 e 02 são o conteúdo canônico do Campaign Log, em todos os ambientes.
>
> | Etapa | Estado                                                        |
> | ----- | ------------------------------------------------------------- |
> | 03-0  | histórico real recebido em capítulos (§13–§16)                |
> | 03-A  | model / data infrastructure done                              |
> | 03-B  | visual approved (frozen)                                      |
> | 03-C  | editorial content approved: CHAPTERS 00, 01 e 02 (D-074, §17) |
>
> A linha profissional MOCK (D-049, quatro entradas fictícias) foi **aposentada** em D-074 (§17): dados, `fileReplacements`, modelo `CampaignLogEntry`, bloco do template e testes saíram. As seções §1–§12 abaixo documentam o plano original e a linha profissional como histórico.

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
| 04  | 2017                | Um jogo de verdade, com jogadores de verdade | A Real Game with Real Players           |
| 05  | 2017                | Dois prêmios e um TCC nota 10                | Two Awards and a Perfect Capstone Score |

**Modelo (evolução mínima de §13):**

- `when` aceita ano confirmado (`{ year }`).
- `code` (codinome) ficou opcional; este capítulo não tem codinomes.
- O capítulo ganhou `name` localizado e três campos opcionais: `period`, `context` e `closing` (fechamento CHECKPOINT COMPLETE + ano final).

**Texto:**

- **Português:** o do Eduardo, sem alteração. As ênfases (negrito/itálico) viram texto simples, porque o modelo guarda parágrafos sem formatação.
- **Inglês:** tradução fiel, **pendente de aprovação**; revisada na consolidação (§16).
- **Frases-resumo:** extração literal; no 01, é a primeira frase do 2º parágrafo.

**Linha profissional:** a entrada MOCK da formação (FATEC) saiu do MOCK de desenvolvimento, porque este capítulo a substitui. Em produção nada muda até a aprovação.

**Pontos para o Eduardo:**

1. Revisão visual e aprovação da tradução para o inglês.
2. **Aedes Revenge como projeto:** o capítulo descreve o projeto em detalhe. Pela regra original (§2), o Campaign Log não descreve projetos. Aqui é parte do relato, mas o Aedes Revenge poderia virar um MC-CART no Project Inventory (serial a definir; o MC-002 é o Paco, em revisão).
3. **Achievements:** os dois prêmios e o TCC nota 10 são evidências reais. Pela regra de não repetir o Campaign Log, só entram em Achievements se forem apresentados de outro jeito, ou ficam só aqui.
4. **Tecnologias no texto** (Unity, C#): estão no relato do Eduardo; o Skill Loadout não lista Unity.
5. **Google Play:** o link expirou e o jogo não está mais publicado (Eduardo, 2026-10-17). Não há link. Retomar o Aedes Revenge fica como possível projeto futuro.
6. **TCC publicado:** o checkpoint 05 tem o link "Ler o TCC (PDF)" / "Read the capstone project (PDF, in Portuguese)" para o PDF no Repositório Institucional do Conhecimento do CPS (`ric.cps.sp.gov.br`, verificado: HTTP 200, PDF de ~3,3 MB). O link fica dentro da história completa, abaixo do texto, como ação `text` com ícone de link externo e "(abre em nova aba)" para leitor de tela. O Campaign Log passa a ter links só para documentos públicos que comprovam um checkpoint (campo `links`).

## 15. CHAPTER 02 — DO CÓDIGO AO PRODUTO (D-072, D-073, 2026-10-17)

> Estado: **implementado em desenvolvimento, aguardando revisão do Eduardo**; não publicado em produção.

O ScoutEvo vem **depois** do fechamento do CHAPTER 01 (CHECKPOINT COMPLETE — 2017; "Depois da faculdade"), por isso abre um capítulo novo.

| #   | Quando       | Codinome      | Título pt / en                                                                          |
| --- | ------------ | ------------- | --------------------------------------------------------------------------------------- |
| 01  | 2018         | SCOUTEVO      | Quando uma ideia entrou em campo / When an Idea Took the Field                          |
| 02  | 2019         | EOS           | Tecnologia em que cada minuto importa / Technology Where Every Minute Matters           |
| 03  | c. 2020/2021 | AXIA          | Da ideia à inteligência operacional / From Concept to Operational Intelligence          |
| 04  | DESDE 2025   | COMUNIDADE ON | Quando os games viraram uma linguagem de produto / When Games Became a Product Language |

- **Textos:** pt e en são do Eduardo, sem alteração. A frase visível é a primeira de cada texto, exceto na Comunidade ON (resumo próprio, §16).
- **Nome, período e assinatura do capítulo:** definidos pelo Eduardo na consolidação (§16): `2018 — ATUAL · CHAPTER 02 — DO CÓDIGO AO PRODUTO`. `name` e `signature` continuam opcionais no modelo.
- **EOS (2019):** plataforma de logística de doação e transplante de órgãos. O Eduardo participou da engenharia da solução e fez todo o frontend web (ASP.NET/C#). Em setembro de 2019 foi disponibilizada à Central Estadual de Transplantes de São Paulo e divulgada pela Unicamp; a pesquisa gerou um artigo na _Case Studies on Transport Policy_ (2021). Ênfases do texto viram texto simples. Referências externas (2026-10-17), na história completa, agrupadas por tipo e verificadas:
  - **Publicação científica:** "System for transporting human organs", _Case Studies on Transport Policy_, Elsevier (2021): link do ScienceDirect e DOI permanente 10.1016/j.cstp.2021.01.005. A nota de contexto diz "Artigo sobre o EOS, de Henrique Barros Bellotti e Maria Teresa Françoso". **A autoria não é do Eduardo**; a participação dele, segundo o próprio relato, foi a engenharia da solução e o frontend web.
  - **Imprensa:** Portal Afya, "Software pode reduzir tempo no transporte de órgãos para transplante" (2019, publicada em 23/12/2019).
  - **Registro bibliográfico:** OpenAlex W3128566934.
  - **Lançamento institucional (Unicamp, 2019):** notícia da FECFAU/PPG-EC de 27/09/2019, "EOS - o primeiro sistema de planejamento de transporte de órgãos para transplante" (enviada na consolidação, verificada; §16). Primeira da lista.
  - **Sem afirmação de resultado:** nenhum rótulo apresenta resultados de teste como adoção operacional definitiva ou como redução comprovada de perdas de órgãos.
- **Axia (versão do Eduardo de 2026-10-17; data revista em §16 para c. 2020/2021, sem ano final):** plataforma de inteligência operacional da Ativvus/Arppen para limpeza e facilities. O Eduardo participou de toda a evolução do produto, incluindo a Inteligência Axia: arquitetura, webapp Angular, WebAPI .NET/C#, SQL Server, design das interfaces e contribuições ao código embarcado em C. Foco principal: plataforma web, APIs e experiência de uso. O modelo ganhou `when: { span }` para intervalos de anos confirmados.
  - **Referências:** **registro da empresa:** página inicial da Arppen, com a seção da Axia e a linha do tempo pública (entrou na consolidação, §16; `arppen.com/axia.html` segue em 404). **Imprensa:** InfraFM, "Como um pequeno dispositivo pode acabar com ruídos operacionais e prever afastamentos" (verificada; cita a Axia como produto da Ativvus; data de publicação não informada, por isso sem ano no rótulo).
  - **Nota factual:** a InfraFM diz que a Axia foi "desenvolvida pela empresa de tecnologia Ativvus em 2022", depois retirada do mercado para uma nova versão. O relato do Eduardo começa em 2021 (idealização e engenharia). Não é necessariamente conflito, mas vale a revisão dele.
- **Comunidade ON (desde 2025, textos do Eduardo de 2026-10-17):** "2025–Atual" aparece como **DESDE 2025 / SINCE 2025** (`when: { since }`, mesmo formato da entrada current em aberto, D-050). O Eduardo desenvolve as aplicações web, integra serviços e APIs e constrói as experiências de interface (Angular, TypeScript, .NET, C#); a gamificação liga o trabalho à formação em Jogos Digitais. O texto é a descrição pública que ele mesmo escreveu: nada interno da Comunidade On, sem links. Ênfases viram texto simples.
  - **Fechamento em andamento:** o CHAPTER 02 fecha com **CURRENT QUEST — EM ANDAMENTO / CURRENT QUEST — IN PROGRESS** (`ongoing: true`, rótulo do dicionário) no lugar de CHECKPOINT COMPLETE, sem ano final. A frase é o lema aprovado do Player Status ("XP real, sem personagem." / "Real XP. No persona."), lido de `PLAYER_PROFILE.motto`, sem cópia. O marker usa a cor de campanha atual (`--mc-status-online`), como a entrada current da linha profissional.
  - **Teste "sem métricas":** o lema é a única ocorrência permitida de "XP" no texto da seção; qualquer outro XP, LV, % ou ★ continua reprovando.
- **Fatos preservados (ScoutEvo):** 2018; maratona de inovação ligada ao Flamengo, vencida pela equipe; o Eduardo cuidou da arquitetura, do app de coleta (Unity/C#), do frontend web (ASP.NET/C#) e do design das interfaces; o banco de dados ficou com outro integrante.

**Pontos para o Eduardo:**

1. ~~Nome e assinatura do CHAPTER 02~~ **definidos** na consolidação (§16).
2. **Linha profissional MOCK em desenvolvimento:** depois do fechamento do CHAPTER 02 aparecem as entradas MOCK (2014–2018, 2019–2022, 2023–2025, "Comunidade On desde 2025"), com cronologia que não bate com os capítulos reais; a última agora duplica o checkpoint real. Elas não são fatos e devem sair quando os capítulos forem aprovados.
3. **Sobreposição com outras seções:** tratada na consolidação (§16.4 e §16.6).
4. **ScoutEvo como projeto e a vitória como achievement:** mesma questão do Aedes Revenge (§14), ou seja, MC-CART no Inventory e Achievements sem repetir o Campaign Log.
5. ~~Link público~~ **feito:** a reportagem do O Globo sobre a maratona (10/04/2018, "Flamengo faz 'maratona' de inovação em São Paulo para aprimorar gestão") está linkada dentro da história. A matéria trata do evento, não do resultado, e é fechada para assinantes.
6. **Imagem integrada (decisão do Eduardo, 2026-10-17):** a colagem enviada por ele (reportagem do O Globo, anúncio "And the winner is: ScoutEvo" do FUTEBOOM, escudo do Flamengo, logo do ScoutEvo) foi usada **como ele mandou**, como evidência documental da vitória, dentro da história completa. Arquivos: `public/assets/campaign-log/scoutevo/scoutevo-win-{480,894}.webp` (43/93 KB), na proporção original, sem metadados. Alt bilíngue descreve o conteúdo; largura limitada a 24rem.

## 16. Consolidação editorial dos CHAPTERS 01 e 02 (D-073, 2026-10-17)

> Estado: **aplicado em desenvolvimento, aguardando aprovação visual e editorial do Eduardo**. Nada foi publicado: a produção continua só com o CHAPTER 00. A liberação do Campaign Log completo é uma etapa separada, depois da aprovação.

### 16.1 Decisões do Eduardo aplicadas

| Capítulo | Período      | Nome pt / en                                    | Assinatura pt / en (en = proposta)                                                                                                                                                                       |
| -------- | ------------ | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 00       | —            | ORIGIN                                          | A campanha começou muito antes do código. / The campaign started long before the code. (FROZEN, sem mudança)                                                                                             |
| 01       | 2013 — 2017  | DO CONTROLE AO CÓDIGO / FROM CONTROLLER TO CODE | O que começou como paixão na infância se transformou em uma escolha de vida. / What started as a childhood passion became the path I chose.                                                              |
| 02       | 2018 — ATUAL | DO CÓDIGO AO PRODUTO / FROM CODE TO PRODUCT     | Cada projeto trouxe um novo desafio. Cada desafio ampliou minha maneira de criar produtos digitais. / Every project brought a new challenge. Every challenge broadened the way I build digital products. |

- **CHAPTER 02 em aberto:** período `{ start: 2018, end: 'present' }` (exibido "2018 — ATUAL / PRESENT") e fechamento CURRENT QUEST — EM ANDAMENTO / IN PROGRESS com o lema do Player Status (`PLAYER_PROFILE.motto`, fonte única).
- **Comunidade ON, resumo do card:** "Onde conecto engenharia, design de produto, inteligência artificial e gamificação para construir experiências digitais que vão além das interfaces tradicionais." / "Where I bring together engineering, product design, artificial intelligence, and gamification to build digital experiences that go beyond traditional interfaces." É a única exceção à regra "resumo = primeira frase da história" (modelo e testes documentam a exceção); a história completa segue intacta. Aberta, a história substitui o resumo, como nos outros checkpoints.
- **Axia:** "início aproximado em 2020/2021 e evolução posterior" vira **c. 2020/2021**, sem ano final (`when: { approx: [2020, 2021] }`). O ano final 2024 saiu.
- **EOS:** 2019 como marco público (sem mudança de data).

### 16.2 Fontes e datas (concepção, desenvolvimento, divulgação, evolução pública)

| Checkpoint    | Data exibida | O que cada data significa                                                                                                                                                                                                                                                                                                     | Fonte                                               |
| ------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| ScoutEvo      | 2018         | Maratona e vitória (relato do Eduardo). A matéria trata do evento, não do resultado.                                                                                                                                                                                                                                          | O Globo, 10/04/2018; colagem FUTEBOOM               |
| EOS           | 2019         | Disponibilização à Central Estadual de Transplantes de SP: 27/09/2019. Imprensa: 23/12/2019. Artigo científico: 2021. A data de concepção/desenvolvimento não foi informada e não aparece.                                                                                                                                    | Unicamp FECFAU; Portal Afya; Elsevier/DOI; OpenAlex |
| Axia          | c. 2020/2021 | Início aproximado segundo o Eduardo. Linha do tempo pública da Arppen: ponto de partida em 2021, protótipos e testes em 2022, "recalculando rotas" em 2023, Inteligência Axia no mercado em 2024; produto listado como 2021–2026. A InfraFM cita o desenvolvimento em 2022. **2020 não tem fonte pública**; vem só do relato. | Arppen (página inicial); InfraFM                    |
| Comunidade ON | DESDE 2025   | Relato do Eduardo. Sem links.                                                                                                                                                                                                                                                                                                 | —                                                   |

- **Atribuição:** nenhuma das fontes cita o Eduardo. A Unicamp credita o EOS a Henrique Bellotti (mestrando), "com apoio de Adriano Balista (Ativvus) e Dr. Ronaldo Honorato (InCor)", com orientação da Profa. Maria Teresa Françoso; o artigo é de Bellotti e Françoso. As fontes comprovam os **projetos e as datas**; a participação do Eduardo vem do relato dele, que não foi reescrito. As notas dos links não atribuem a ele publicações, resultados nem funcionalidades.
- **Arppen:** `arppen.com/axia.html` (enviado de novo) continua 404; o link aponta para a página inicial, que tem a seção da Axia. **Atenção:** essa página diz publicamente que a Arppen foi incorporada à Comunidade ON (2026) e cita um cliente na história da Axia. O Campaign Log não repete nada disso, mas o link leva até lá. Como o Eduardo enviou o link, ele entrou; confirmar na aprovação.
- **Novo tipo de link:** `company` = "REGISTRO DA EMPRESA / COMPANY RECORD" (página institucional da empresa responsável pelo produto).

### 16.3 Revisão das traduções em inglês

**Aplicado (CHAPTER 01: a tradução en foi feita na implementação, não pelo Eduardo; o pt não muda):**

- Assinatura: "…became a life choice." → "…became the path I chose." ("life choice" soa como "estilo de vida" em inglês).
- Títulos: "A Real Game, with Real Players" → "A Real Game with Real Players"; "Two Awards and a Perfect-Score Capstone" → "Two Awards and a Perfect Capstone Score".
- Aedes Revenge: frase com dois sinais de dois-pontos reescrita ("Aedes Revenge was born during college: … — the mosquito's own."); "many different development challenges" → "a wide range of development challenges".
- FAEL 2016: "at FAEL 2016, at FATEC Americana" → "at FATEC Americana's FAEL 2016"; "get recognized was a defining achievement" → "receive recognition was a memorable achievement" (pt: "conquista marcante").
- Google Play: "putting the game online … watch" → "getting the game online … see"; "needed to improve" → "needed improvement"; "thinking of" → "thinking about".
- TCC: "presented the project as my capstone project … perfect score of 10" → "presented it as my capstone project (TCC) and received a perfect 10".

**Sugestões para os textos en do Eduardo (não aplicadas):**

1. **Comunidade ON, §5:** "that led me to study Game Development" → "that led me to study Digital Games". O curso aparece como "Digital Games Technology" no Player Status e no CHAPTER 01.
2. **Axia, §2:** "including the development of Axia's intelligence capabilities" perde o nome do produto. Sugestão: "including its evolution into Axia Intelligence (Inteligência Axia)". A Arppen usa "A Inteligência Axia" como marco de 2024.
3. **Comunidade ON, §7:** o pt lista cinco frentes ("engenharia, produto, design, IA e gamificação") e o en, quatro ("engineering, product design, AI, and gamification"). O resumo novo usa "design de produto" nos dois idiomas, então o en atual combina com ele; manter se for intencional.
4. ScoutEvo, EOS e os títulos en do CHAPTER 02 estão naturais; sem sugestão.

### 16.4 Repetições identificadas

1. **Grafia da marca:** "Comunidade On" no Player Status (CAMPANHA ATUAL), no CLAUDE.md e nos docs; "Comunidade ON" no checkpoint (texto do Eduardo). Escolher uma. O Player Status está congelado: mudar exige aprovação.
2. **Lema "XP real, sem personagem."**: aparece no Hero, no footer e agora no fechamento do CHAPTER 02 (três vezes na Home). Frase curta de marca e fonte única; mantido por decisão do Eduardo.
3. **A fórmula "engenharia/desenvolvimento + produto + IA + gamificação"** aparece no Player Status (focusLine e resumo), no resumo do card da ON e no §7 da história da ON. Não é texto grande duplicado, mas o Current Main Quest não deve repetir a fórmula (§16.6).
4. **Achievements (futuros):** os dois prêmios do Aedes Revenge (CHAPTER 01, checkpoints 03 e 05), o TCC nota 10 (checkpoint 05) e a vitória do ScoutEvo (CHAPTER 02, checkpoint 01) já são narrados no Campaign Log. Nos Achievements devem entrar como **registro** (nome do prêmio, quem concedeu, ano, evidência), sem narrativa (D-051). **Evidência:** ScoutEvo tem a colagem com "And the winner is: ScoutEvo"; o PDF do TCC comprova o trabalho, mas falta confirmar se mostra a nota; os prêmios FAEL 2016 e Mostra de Jogos 2017 ainda não têm evidência pública (certificado, foto ou página).
5. **Project Inventory (futuro):** se Aedes Revenge, ScoutEvo, EOS ou Axia virarem MC-CART, o case conta o projeto e o Campaign Log continua contando a trajetória. Não copiar parágrafos de um para o outro.
6. **Player Status × Campaign Log:** só "Tecnologia em Jogos Digitais" (ORIGEM × contexto do CHAPTER 01) e "Comunidade On" (CAMPANHA ATUAL × checkpoint 04) se repetem, como rótulos curtos. Aceitável.

### 16.5 Auditoria das entradas MOCK da linha profissional

`campaign-log.data.development.ts` (só dev/testes; produção vazia, deploy guard `mock-campaign-log`):

| id                              | Período     | Título                                                | Conflito com os capítulos reais                  |
| ------------------------------- | ----------- | ----------------------------------------------------- | ------------------------------------------------ |
| `mock-campaign-log-development` | 2014 — 2018 | Da tecnologia para o desenvolvimento                  | Sobrepõe a FATEC (2013–2017) e o ScoutEvo (2018) |
| `mock-campaign-log-product`     | 2019 — 2022 | Código passou a ser só uma parte do produto           | Inventa uma fase que não existe entre EOS e Axia |
| `mock-campaign-log-ai`          | 2023 — 2025 | IA entrou no workflow                                 | Fase fictícia, sem relato real                   |
| `mock-campaign-log-current`     | DESDE 2025  | Construindo produtos de ponta a ponta (Comunidade On) | Duplica o checkpoint real da Comunidade ON       |

**Dependências:** a Home em dev (aparecem depois do fechamento do CHAPTER 02); `campaign-log-section.spec.ts` (testes da linha profissional: rótulos CHECKPOINT/CAMPANHA ATUAL, períodos, DESDE, contexto, h3); `campaign-log.data.spec.ts` (estrutura do MOCK); `home-page.spec.ts` (`hasCampaignLog`); o deploy guard; e o `stylecheck` de revisão, que compara os checkpoints de capítulo com os profissionais. O showcase `/dev/design-system` não usa.

**Proposta para a etapa de liberação (não executada):**

1. Esvaziar `CAMPAIGN_LOG` também em dev: a visualização real passa a ser só capítulos, sem datas fictícias.
2. Os capítulos cobrem de c. 1991 até hoje, então a linha profissional (`CampaignLogEntry`, D-048/D-050) fica sem conteúdo real previsto. **Recomendação:** aposentá-la (modelo, bloco do template, MOCK, `fileReplacements` e testes) e manter a tipografia aprovada do D-050 por um teste com valores fixos (título 20px/600, resumo 16px/400, rótulo 13px/500). Alternativa: manter o bloco com uma fixture só de teste, injetada por token, se houver plano para entradas profissionais fora dos capítulos.
3. O deploy guard `mock-campaign-log` pode ficar como proteção.

### 16.6 Current Main Quest: recomendações

O checkpoint da Comunidade ON já conta o quê, o porquê e o papel do Eduardo. O Current Main Quest (D-055, `docs/18`) deve falar do **agora**: o desafio em andamento, no presente, sem recontar a história.

1. **Título:** não repetir "Comunidade On" sozinho, que já está no Player Status e no Campaign Log. Usar o nome do desafio atual.
2. **Resumo (140–220 caracteres):** o problema que ele está resolvendo agora. Evitar a fórmula "engenharia, produto, IA e gamificação" (§16.4, item 3) e o lema.
3. **Frentes (2–4):** temas públicos de trabalho atual, sem arquitetura, integrações, métricas ou clientes (D-040). O texto e as frentes vêm do Eduardo, nada é presumido.
4. **Nomenclatura:** o fechamento do Campaign Log diz "CURRENT QUEST" e a seção se chama "CURRENT MAIN QUEST". Se a seção for publicada, o fechamento pode virar um link para `#current-main-quest` (proposta de interação, exige aprovação).
5. **Também é uma saída válida não publicar o Current Main Quest**, se não houver mais nada público para dizer além do checkpoint. Assim a Home evita uma seção que repetiria o Campaign Log.
6. A confirmação de que a seção pode falar da Comunidade On continua necessária (`docs/18` §6).

### 16.7 Correções visuais desta rodada

- **Rótulos e notas das referências:** desde o commit fa5adc0, a regra `.story p` (compartilhada com o resumo) sobrepunha `.kind` e `.context` dentro das referências. Os tipos ("IMPRENSA"...) e as notas saíam como texto corrido. Agora a regra vale só para `.story > p`, e voltam o rótulo de sistema e a nota body-s. O CHAPTER 00 de produção não tem referências e não muda.
- **Conhecido, não corrigido:** em rótulos longos (InfraFM no desktop), a seta de link externo pode quebrar sozinha para a linha seguinte. `&nbsp;` não resolve (a especificação CSS permite quebra junto de elementos inline-block). A correção exige envolver a última palavra e o ícone num `nowrap`; fica como proposta.

### 16.8 Para aprovação do Eduardo

1. Visual e texto dos CHAPTERS 01 e 02 (capturas desktop e mobile, pt e en).
2. Versões en do nome e da assinatura do CHAPTER 02 e a revisão en do CHAPTER 01 (§16.3).
3. Axia: exibir "c. 2020/2021" mesmo com as fontes públicas começando em 2021 (§16.2).
4. Link da página inicial da Arppen (§16.2, atenção).
5. Sugestões en para os textos dele (§16.3) e a grafia ON/On (§16.4).
6. Destino das entradas MOCK e da linha profissional (§16.5).
7. Current Main Quest (§16.6).

## 17. Liberação do conteúdo real (D-074, 2026-10-17)

> Estado: **CHAPTERS 00, 01 e 02 aprovados editorialmente pelo Eduardo e no build de produção e do GitHub Pages**. Gerar o build não é deploy: nada foi publicado. Aguardando a validação visual final do Eduardo.

**Estrutura canônica** (`src/app/data/campaign-log.data.ts` → `CAMPAIGN_LOG_CHAPTERS`, a mesma lista em desenvolvimento, testes, produção e GitHub Pages; sem `fileReplacements` e sem `isDevMode()`):

| Capítulo                   | Período      | Checkpoints                                                              | Fechamento                          |
| -------------------------- | ------------ | ------------------------------------------------------------------------ | ----------------------------------- |
| 00 — ORIGIN                | —            | 5 (c. 1991 → vida adulta)                                                | —                                   |
| 01 — DO CONTROLE AO CÓDIGO | 2013 — 2017  | 5 (FATEC, Aedes Revenge, prêmios 2016/2017, TCC)                         | CHECKPOINT COMPLETE — 2017          |
| 02 — DO CÓDIGO AO PRODUTO  | 2018 — ATUAL | 4 (ScoutEvo 2018, EOS 2019, Axia c. 2020/2021, Comunidade ON desde 2025) | CURRENT QUEST — EM ANDAMENTO + lema |

**Linha profissional MOCK aposentada.** Auditoria (§16.5) e o que saiu:

| Onde                          | Antes                                                                                    | Agora                                                                                                                                                                                                                                                                |
| ----------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dados                         | `campaign-log.data.development.ts` (4 entradas `mock-campaign-log-*`)                    | arquivo removido                                                                                                                                                                                                                                                     |
| Build                         | `fileReplacements` em `angular.json` (dev/testes)                                        | removido: uma fonte só                                                                                                                                                                                                                                               |
| Modelo                        | `CampaignLogKind`, `CampaignLogEntry`                                                    | removidos (`CampaignLogPeriod` fica, usado pelos capítulos)                                                                                                                                                                                                          |
| Componente / template         | `entries` + bloco `@for (entry of entries)`                                              | removidos (sem condicional nem CSS escondendo)                                                                                                                                                                                                                       |
| CSS                           | markers `.entry--origin` e `.entry--current`                                             | removidos; o fechamento em andamento mantém o marker de status                                                                                                                                                                                                       |
| Dicionário                    | `campaignLog.kind` (NEW GAME / CHECKPOINT / CAMPANHA ATUAL), `links.company`             | removidos (sem uso)                                                                                                                                                                                                                                                  |
| Home                          | `hasCampaignLog` lia `CAMPAIGN_LOG`                                                      | lê `CAMPAIGN_LOG_CHAPTERS`                                                                                                                                                                                                                                           |
| Testes                        | MOCK (`campaign-log.data.spec.ts`) e linha profissional (`campaign-log-section.spec.ts`) | substituídos por testes da fonte canônica (ids únicos sem `mock`, cronologia, só o último capítulo aberto, textos nos dois idiomas, sem métricas) e da seção (nada fora dos capítulos, eixo termina no CURRENT QUEST, paridade pt/en, nenhuma chave técnica visível) |
| Deploy guard                  | `mock-campaign-log` na regex                                                             | mantido como proteção                                                                                                                                                                                                                                                |
| Showcase `/dev/design-system` | não usava                                                                                | —                                                                                                                                                                                                                                                                    |

**Ajustes editoriais autorizados (D-074):**

- **Marca:** a grafia pública no Campaign Log é **Comunidade ON** (já era nos textos; um comentário foi alinhado). O Player Status ainda mostra "Comunidade On" e ficou fora desta rodada (seção congelada; tratar em etapa própria).
- **en, curso:** "that led me to study Game Development" → "that led me to study Digital Games" (Comunidade ON, §5).
- **en, Axia:** "including the development of Axia's intelligence capabilities" → "including its evolution into Axia Intelligence" (o pt já dizia "Inteligência Axia").
- **Axia, período:** c. 2020/2021, estimativa do Eduardo sobre o início da participação dele, não data documental.
- **EOS:** a notícia da Unicamp (27/09/2019) segue como marco público; a autoria do artigo segue com Bellotti e Françoso.

**Links (todos verificados no navegador em 2026-10-17):** TCC (CPS), O Globo, Unicamp FECFAU, Portal Afya, OpenAlex e InfraFM respondem 200 na URL publicada. O DOI redireciona para o próprio artigo no ScienceDirect (redirecionamento canônico do DOI). O ScienceDirect mostra uma verificação anti-robô ("Um momento…") a navegadores automatizados; não é link quebrado. **Saiu:** a página inicial da Arppen, que substituía a página da Axia (`arppen.com/axia.html`, 404). A Axia fica só com a reportagem da InfraFM até haver uma página específica funcional. Nenhum fato do relato foi removido.

**Visual:** sem mudança na linguagem aprovada. O eixo termina no marker do fechamento CURRENT QUEST, e a seção seguinte em produção é o Final Checkpoint; não sobra espaço vazio onde ficavam os MOCKs.

**Pendentes (fora desta rodada):**

1. **Jornada** no header (`#campaign-log`): o conteúdo real já está publicado, mas o header não mudou nesta rodada.
2. Grafia "Comunidade On" no Player Status (§16.4).
3. Página específica da Axia, se voltar a existir.
4. Achievements, Current Main Quest e Side Quests seguem com MOCK só em desenvolvimento (etapas próprias, §16.4 e §16.6).
5. Seta de link externo que pode quebrar sozinha em rótulos longos (§16.7).

## 18. Diário de Campanha: mapa por capítulos (D-091, 2026-10-20)

A timeline vertical deu lugar a uma experiência por capítulos (híbrido A + C da prancha aprovada). O conteúdo é o mesmo da §17 (D-074): três capítulos, 14 marcos, histórias, fotos, fontes e fechamentos.

### 18.1 Componentes (`features/campaign-log/`)

| Componente | Papel |
| --- | --- |
| `campaign-log-section` | estado único (capítulo e marco), cabeçalho, capítulo ativo, prévias dos outros |
| `diary-chapters` | seletor de capítulos (faixa horizontal, `aria-current`) |
| `diary-map` | moldura 16:9: cenário + rota SVG + marcos (≥ 768) / pontos (mini mapa, < 768) |
| `diary-milestones` | lista de marcos (só < 768) |
| `diary-milestone` | painel de leitura |
| `campaign-when` | época do marco (ano, intervalo, "desde", aproximado ou época em texto) |
| `diary-labels.ts` | número e nome acessível do marco ("MARCO 02 de 05: …") |

### 18.2 Layout

- **≥ 1200:** mapa (~70%) e painel (~30%) lado a lado. O cabeçalho do capítulo fica sobre o canto do mapa, com véu de leitura. O mapa fica fixo enquanto se lê uma história longa.
- **768–1199:** cabeçalho acima do mapa, mapa na largura toda e painel abaixo (imagem até 28rem, fotos até 24rem, texto até 62ch).
- **< 768:** cabeçalho do capítulo, mini mapa (só pontos), lista de marcos e painel.
- **Validação:** sem overflow horizontal, sem sobreposição de etiquetas, sem etiqueta sob o cabeçalho ou fora da moldura, em 1440 / 1280 / 1200 / 1199 / 1024 / 820 / 768 / 390, pt e en, nos três capítulos.

### 18.3 Para receber as artes

- **Cenário do capítulo:** preencher `map` no capítulo (16:9, WebP, `srcset`). Arte sem rota, sem nós e sem texto.
- **Imagem editorial:** preencher `image` no marco (3:2, com `alt` pt/en).
- **Posições dos marcos:** depois da arte, revisar `map {x, y, label}` de cada marco sobre ela.
- **Nomes reservados:** os da D-091, com o sufixo de largura (ex.: `ch00-origem-1672.webp`). Para gerar: salvar o PNG em `design/source/diary/maps/` ou `stories/` e rodar `node design/source/diary/build-diary.mjs`.

### 18.4 Pendências

- **Artes recebidas (D-091):** os mapas dos capítulos 00 e 01 e as imagens editoriais do Cap. 00, com mestres em `design/source/diary/` e derivados por `build-diary.mjs`.
- **Mapa do Cap. 02 e imagens editoriais dos capítulos 01 e 02:** recebidos e integrados. Todas as artes do Diário estão no lugar.
- **Textos alternativos:** revisão pelo Eduardo.
- **Texto de abertura:** revisão da tradução en.
- **Zoom e pan:** melhoria opcional.
- **Traduções antigas do Campaign Log:** revisão (pendência separada, D-088).
