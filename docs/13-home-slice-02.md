# 13 — Home Slice 02 (plano)

> Status: **planejamento, aguardando aprovação de Eduardo.** Nada implementado.
> Escopo: **Skill Tree** (contexto profissional) e **Project Inventory** (protagonista do slice).
> Header, Hero e Player Status aprovados (D-039) não mudam, salvo regressão justificada e relatada.

Princípio que governa o slice inteiro: **XP real, sem personagem.** Nada de proficiência inventada, nada de projeto ou resultado sem fonte, nada interno da Comunidade On sem aprovação explícita.

---

## 1. Skill Tree

### 1.1 Proibido

Percentuais, estrelas, levels, notas (80/100), barras, beginner/intermediate/expert, rankings, skill points, desbloqueios fictícios, árvores de talento de MMO, nós com dezenas de conexões. Também os estados `unlocked / evolving / core / exploring` do modelo atual (`docs/07`) **ficam fora** da v1: são graduações subjetivas.

### 1.2 Proposta de conteúdo (para aprovação; nada aqui está aprovado)

Base: as listas que Eduardo definiu no brief inicial (já em `src/app/data/skills.data.ts`) cruzadas com a direção nova (BUILD / PRODUCT / AI / GAME DNA). Coluna "Origem" mostra de onde cada item veio.

| Grupo (pt / en) | Itens propostos | Origem |
|---|---|---|
| **BUILD** / BUILD | Angular · TypeScript · C# · .NET / ASP.NET Core · APIs REST · PostgreSQL · SQL Server · Docker · Git | brief inicial (Engineering) |
| | Arquitetura de software / Software architecture | direção nova: **confirmar** |
| **PRODUCT** / PRODUCT | Produtos digitais · UX · Interfaces · Regras de negócio · Jornadas · Experiência do usuário | brief inicial (Product) |
| | Product thinking · Colaboração UX/UI | direção nova: **confirmar** (sobrepõe "Produtos digitais"/"UX") |
| **AI** / AI | IA aplicada ao desenvolvimento · AI-assisted development · Prompting · Análise · Documentação · Automação | brief inicial (AI) |
| | Agents / tooling · Workflow automation | direção nova: **confirmar** (sobrepõe "Automação") |
| **GAME DNA** / GAME DNA | Gamificação · Progressão · Feedback · Recompensa · Engagement loops · Experiência inspirada por games | brief inicial (Game Design) |
| | Game systems · Interaction design | direção nova: **confirmar** |

Decisões de conteúdo pendentes:

1. Nomes dos grupos: **BUILD / PRODUCT / AI / GAME DNA** (novos) ou ENGINEERING / PRODUCT / AI / GAME DESIGN (brief inicial)?
2. Itens: manter a lista do brief inteira, enxugar (recomendo **5–7 por grupo**, o que importa para os projetos), e quais itens novos entram.
3. Tradução en dos itens em português (ex.: "Regras de negócio" → "Business rules").
4. **Evidência opcional (recomendada para depois):** cada skill pode citar, de forma factual, os cartuchos onde foi usada ("visto em ON-001, MC-001"). É a forma real de "provar" uma skill sem nota: liga a Skill Tree ao Inventory. Só vale quando os projetos estiverem aprovados.

### 1.3 Alternativas visuais

| | A. Loadout (recomendada) | B. Capability map | C. Módulos de hardware |
|---|---|---|---|
| Ideia | 4 grupos como "módulos" de um loadout, lado a lado; cada um com código de sistema, título e lista de itens | grupos em grade 2×2 ligados a um núcleo central "PLAYER 01" | cada grupo como cartucho/expansão física encaixada no MC-01 |
| Linguagem | UI digital: linhas, labels, tipografia (mesma família do Player Status) | diagrama | objeto físico (materiais, sombra) |
| Prós | simples, escaneável, profissional, responsivo, sem sugerir nível | sensação de "sistema" | forte identidade |
| Riscos | pode parecer lista se a tipografia não carregar o tom | lembra árvore de RPG; conexões viram decoração; difícil no mobile | **mistura objeto físico com dado de UI** (regra D-024/D-032); compete com o MC-CART, que é o protagonista |

**Recomendação: A.** Desktop 4 colunas (3/12 cada), tablet 2×2, mobile empilhado. Cada módulo:

```
BLD          ← código de sistema curto (Plex, papel `system`; sem Pixelify, D-029)
BUILD        ← título do grupo (Plex 600, caixa alta)
──────────── ← linha subtle
Angular
TypeScript
C# · .NET
…
```

Itens como **texto em lista** (ou chips informativos `mc-chip` sem cor de importância). Sem caixas por item, sem indicadores de nível. O "retro" vem do código de módulo, da caixa alta, do marcador do section header e do ritmo de HUD, não de gráficos de status.

---

## 2. Project Inventory

### 2.1 Princípios

- **Protagonista do slice.** Reusa o MC-CART aprovado **sem redesenho**; Project Summary separado.
- **Coleção inteira visível:** grid sem carrossel, 4 por linha (desktop) · 2 (tablet) · 1 (mobile). Menos de 4 projetos: o grid não estica nem cria "slots vazios" fictícios.
- **Só projetos aprovados para publicação** entram no data (campo `publication`, §2.4). Rascunhos não renderizam.
- Funciona inteiro **sem animação**. "Ver projeto / View project" só aparece quando existir destino real.

### 2.2 Candidatos iniciais e classificação

> Concept copy continua sendo concept copy: nenhum nome ou descrição dos concepts está aprovado.

| Candidato | Natureza | Classificação inicial | Por quê |
|---|---|---|---|
| **Modo Campanha** (este portfólio) | pessoal, repositório público | **PUBLIC / SAFE** (provável) | código e decisões já são públicos no GitHub; excelente primeiro cartucho real |
| **Paco: 23 Horas para a Última Vela** | projeto pessoal de game | **PUBLIC / SAFE** (provável), confirmar estágio | pessoal; depende do que Eduardo quer mostrar (conceito? protótipo?) |
| **Comunidade On** | trabalho atual | **INTERNAL / NEEDS REVIEW** | nome público, mas papel, arquitetura, métricas, clientes e telas exigem aprovação explícita (empregador/contrato) |
| **ON Learning** | trabalho (produto da Comunidade On?) | **INTERNAL / NEEDS REVIEW** | idem; confirmar se é público e com qual nome |
| **Mural do Parceiro** | trabalho | **INTERNAL / NEEDS REVIEW** | envolve parceiros: risco de expor terceiros |
| **Dashboard Operacional** | trabalho, ferramenta interna (provável) | **INTERNAL / NEEDS REVIEW (alto risco)** | dashboards operacionais costumam conter dados, processos e métricas internas |
| Outros projetos pessoais / estudos | pessoal | a levantar | só se forem reais e publicáveis |

Na dúvida, **revisar em vez de publicar**.

### 2.3 Content inventory: ficha por projeto (para Eduardo preencher)

| Campo | pt-BR | en | Observação |
|---|---|---|---|
| Nome público | | | pode ser diferente do nome interno |
| Descrição curta (1 linha) | | | vai no Project Summary |
| Tipo do projeto | | | ex.: plataforma digital, jogo, ferramenta |
| Papel do Eduardo | | | só o que ele de fato fez |
| Tecnologias | | — | |
| Tags (até 2) | | | chips |
| Problema / contexto | | | para o case no CRT |
| Contribuição | | | |
| Resultado / aprendizado | | | **sem métricas não publicáveis** |
| Artwork necessário | | — | ver §2.6 |
| Link público | | — | só se existir |
| Restrições de publicação | | — | o que **não** pode aparecer |
| Classificação | PUBLIC / SAFE · INTERNAL / NEEDS REVIEW | | |
| Aprovado para publicar? | sim / não | | quem aprovou (Eduardo; empregador, se for o caso) |

### 2.4 Riscos de confidencialidade (Comunidade On e trabalho)

Nunca publicar sem aprovação explícita: APIs, arquitetura interna, código, métricas, números de usuários, clientes e parceiros, processos internos, roadmap, screenshots de ferramentas internas, dados reais em telas, nomes de colegas. Mitigações: nome público aprovado; descrição em nível de produto (não de implementação); screenshots só com dados fictícios **e** aprovação; papel do Eduardo descrito sem expor decisões internas; checagem de contrato/NDA por Eduardo.

### 2.5 Estrutura de dados proposta

Evolui o `Project` atual (plano já previsto em `docs/07`):

```ts
type Publication = 'approved' | 'draft';          // só 'approved' renderiza
type Confidentiality = 'public' | 'needs-review';

interface Cartridge {
  serial: string;                                  // <COLEÇÃO>-<NNN>
  shell: McCartShell;                              // dark | light | orange | cool
  accent: McCartAccent;                            // warm | cool | special
  artwork?: { src: string; alt: Localized };       // ausente = "PROJECT ARTWORK"
}

interface Project {
  id: string;
  slug: string;
  publication: Publication;
  confidentiality: Confidentiality;
  title: Localized;
  type: Localized;                                 // vai no cartucho (TYPE)
  summary: Localized;                              // descrição curta (Project Summary)
  tags: { label: Localized; tone: McChipTone }[];  // até 2 exibidas
  cartridge: Cartridge;
  year?: number;
  role?: Localized;
  stack?: string[];
  // Case (CRT, futuro): todos opcionais
  context?: Localized; contribution?: Localized; results?: Localized<string[]>;
  learnings?: Localized<string[]>; screenshots?: { src: string; alt: Localized }[];
  links?: { label: Localized; url: string; kind: 'live' | 'repository' | 'case-study' | 'other' }[];
  featured?: boolean;
}

interface SkillGroup { id: string; code: string; title: Localized; skills: { id: string; name: Localized }[] }
```

**Serial (proposta, precisa aprovação):** prefixo por coleção: `ON-` para projetos da Comunidade On (como no concept), `MC-` para projetos pessoais/Modo Campanha (ex.: Modo Campanha = `MC-001`). Numeração na ordem de entrada no inventário, sem significado de importância.

### 2.6 Artwork (sem assets finais agora)

| Requisito | Proposta |
|---|---|
| Proporção | 16:10 (janela do rótulo do MC-CART) |
| Resolução | ≥ 640 × 400 (2×); WebP/AVIF |
| Linguagem | pixel art ou ilustração plana coerente com a paleta D-014; legível em tamanho pequeno; sem texto dentro da arte (o nome já está no rótulo) |
| Conteúdo permitido | símbolos e cenas abstratas/temáticas do projeto; **nunca** screenshots internos, logos de terceiros sem permissão ou dados reais |
| Até existir | placeholder explícito "PROJECT ARTWORK" (já implementado) |

Produção dos artworks: etapa própria, posterior, por projeto aprovado.

### 2.7 Layout

```
■ PROJECT INVENTORY ───────────────────────────────
  Cartuchos coletados durante a campanha.            ← subtitle já no dicionário

[ MC-CART ]   [ MC-CART ]   [ MC-CART ]   [ MC-CART ]
 Nome          Nome          Nome          Nome         ← Project Summary
 Descrição     Descrição     …
 [chip][chip]  …
 (Ver projeto, só com destino real)
```

| Breakpoint | Colunas | Observação |
|---|---|---|
| Desktop (≥ 1024) | 4 por linha (3/12 cada) | igual ao showcase aprovado |
| Tablet (768–1023) | 2 por linha | |
| Mobile (< 768) | 1 por linha | cartucho reconhecível (máx. 22 rem) |

Ordem da Home (docs/03): Player Status → **Skill Tree** → **Project Inventory**. A âncora `#project-inventory` já é alvo do nav "Projetos".

### 2.8 Relação futura Inventory → CRT (não implementar)

```
MC-CART → selecionar projeto → "inserir" no sistema → CRT Project Viewer → case
```

Opções a decidir quando houver cases reais:

1. **Viewer na própria página:** o cartucho inteiro vira `<button aria-controls>` e o `mc-crt-project-viewer` (abaixo do grid) mostra o case; deep link por `#project-<slug>`.
2. **Rota por projeto:** `/projects/:slug` e `/en/projects/:slug` (compartilhável, melhor para SEO na FASE 8), com o CRT como moldura do case.

Em ambos, o cartucho inteiro recebe a semântica de interação (D-032), nunca só um hover. A animação de inserção é FASE 5 (Game Feel); o Slice 02 funciona sem ela.

---

## 3. Plano por sub-slices

| Etapa | Entrega | Gate |
|---|---|---|
| **02-0 Content inventory** | fichas (§2.3) preenchidas por Eduardo; classificação PUBLIC/SAFE × INTERNAL/NEEDS REVIEW; lista final de projetos publicáveis; conteúdo da Skill Tree aprovado (§1.2) | ◆ **aprovação de conteúdo** (bloqueia 02-C/D) |
| **02-A Skill Tree content model** | `SkillGroup` com `code` e `Localized`; `skills.data.ts` com o conteúdo aprovado | |
| **02-B Skill Tree visual** | alternativa A no showcase e na Home (abaixo do Player Status) | ◆ revisão visual |
| **02-C Project model + layout** | `Project` evoluído (§2.5); seção Inventory com section header + grid vazio-seguro | |
| **02-D Inventory** | MC-CART + Project Summary com os projetos aprovados e artwork placeholder | |
| **02-E Responsive** | 4/2/1, sem overflow, cartucho reconhecível no mobile | |
| **02-F Revisão** | pt-BR/en × 1440/820/390, acessibilidade (cartucho `role="img"` até haver interação), contraste, âncoras, regressão do Slice 01 (diff de pixels Hero/Player Status) | ◆ aprovação final |

Se o conteúdo dos projetos atrasar, 02-A/02-B podem andar antes; o Inventory só entra com pelo menos um projeto aprovado (candidato natural: o próprio Modo Campanha).

## 4. Primeira decisão para aprovação

**02-0: quais projetos entram no content inventory e com que classificação** (§2.2), começando por confirmar se **Modo Campanha** e **Paco** podem ser publicados e quem aprova os projetos ligados à Comunidade On. Em paralelo: grupos e itens da Skill Tree (§1.2) e a alternativa visual A (§1.3).
