# 15 — Home Slice 03: Campaign Log

> Status: **plano aprovado (D-048).** Direção visual **A + C — Checkpoint Log Editorial** aprovada. Etapa atual: **03-0 — Content inventory**, aguardando o histórico real do Eduardo. 03-A, 03-B e 03-C não iniciados. Nenhum runtime data do Campaign Log existe ainda.

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
