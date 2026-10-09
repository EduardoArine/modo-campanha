# 13 — Home Slice 02 (plano aprovado com refinamentos)

> Status: **plano aprovado (D-040, D-042).** 02-0 concluído (D-041). 02-A concluído (models e dados do Skill Loadout). Próxima etapa: **02-B — Skill Loadout visual** (aguardando autorização). Nenhuma implementação.
> Escopo: **Skill Loadout** (contexto profissional) e **Project Inventory** (protagonista do slice).
> Header, Hero e Player Status aprovados (D-039) não mudam, salvo regressão justificada e relatada.

Princípio que governa o slice: **XP real, sem personagem.** Nada de proficiência inventada, nada de projeto ou resultado sem fonte, nada interno da Comunidade On sem aprovação explícita.

---

## 1. Skill Loadout (antes "Skill Tree")

### 1.1 Nome

A seção passa de **SKILL TREE** para **SKILL LOADOUT**. "Tree" sugere progressão, níveis, unlocks e graduação de proficiência, que o sistema não tem. "Loadout" representa as capacidades, conhecimentos e ferramentas que Eduardo leva para os projetos. A navegação pública pode usar "Skills" se necessário. (Renomear componente, âncora e dicionário no 02-A.)

### 1.2 Proibido

Porcentagem, estrelas, levels, XP por skill, beginner/intermediate/expert, `unlocked / evolving / core / exploring` e qualquer graduação subjetiva. Também: skill points, desbloqueios fictícios, árvores de talento, nós com dezenas de conexões.

### 1.3 Grupos (aprovados) e itens (candidatos)

Grupos aprovados: **BUILD · PRODUCT · AI · GAME DNA**.

Itens: lista candidata de Eduardo, **não aprovada automaticamente**. Validação item por item na etapa 02-0.

| Grupo | Itens candidatos |
|---|---|
| BUILD | Angular · C# / .NET · REST APIs · PostgreSQL / SQL Server · Docker · Application architecture |
| PRODUCT | Product thinking · UX/UI collaboration · Prototyping & iteration · Design systems · Product modeling |
| AI | AI-assisted development · Coding agents · Prompt/workflow design · Workflow automation · AI prototyping |
| GAME DNA | Game systems · Gamification · Interaction design · Progression & feedback · Game prototyping |

### 1.4 Regra de publicação de skill

Uma skill só é publicada quando Eduardo pode: **explicar o que significa, explicar como usa e dar pelo menos um exemplo real.** Termos que só "soam bem" não entram. Itens ainda não validados ficam com status **`candidate`** e **não aparecem no site público**.

### 1.5 Visual (alternativa A aprovada: Loadout)

4 áreas modulares abertas, **não necessariamente cards fechados**:

```
BLD          ← código (Plex, papel `system`)
BUILD        ← título do grupo
──────────── ← divisor subtle
Angular      ← itens em lista (ou chips informativos)
C# / .NET
…
```

> **Loadout informa. Inventory impressiona.**

O Skill Loadout é visualmente **mais silencioso** que o Project Inventory: sem objetos físicos, sem sombra, sem glow, sem laranja além do marcador do section header.

### 1.6 Evidência futura (não implementar)

"Visto em / Seen in": cada skill cita, de forma factual, os cartuchos onde foi usada (ex.: `Angular · Visto em MC-001, MC-003`). Liga skills a projetos reais sem nota. Só quando houver projetos aprovados.

---

## 2. Project Inventory

### 2.1 Princípios

- **Protagonista do slice.** Reusa o MC-CART aprovado **sem redesenho**; Project Summary separado.
- **Coleção inteira visível:** grid sem carrossel; **até 4 por linha** (desktop) · 2 (tablet) · 1 (mobile).
- **Sem slots falsos:** se houver dois projetos aprovados, mostram-se dois. A coleção cresce organicamente.
- Funciona inteiro **sem animação**. "Ver projeto / View project" só com destino real.

### 2.2 Publicação: conservadora por padrão

Um projeto **só aparece publicamente com `publication: 'approved'` explícito.** Ausência do campo, `draft`, `review` ou `blocked` → **não renderiza**. A regra terá testes automatizados quando o modelo for implementado (02-C).

### 2.3 Classificação inicial

| Serial | Projeto | Origem | Classificação | Situação |
|---|---|---|---|---|
| MC-001 | Modo Campanha | personal | **PUBLIC / APPROVED** | projeto atual, repositório público, conteúdo controlado por Eduardo; entra no Content Inventory |
| MC-002 | Paco: 23 Horas para a Última Vela | personal | **PUBLIC / OWNER REVIEW** | publicável se Eduardo confirmar: direito de publicar os materiais selecionados; nenhuma restrição de colaborador/parceiro; materiais já podem ser públicos. Não assumir que todo concept/lore/material pode ser mostrado |
| — | Comunidade On | on-tech | **INTERNAL / NEEDS EXPLICIT APPROVAL** | não publicar |
| — | ON Learning | on-tech | **INTERNAL / NEEDS EXPLICIT APPROVAL** | não publicar |
| — | Mural do Parceiro | on-tech | **INTERNAL / NEEDS EXPLICIT APPROVAL** | não publicar |
| — | Dashboard Operacional | on-tech | **INTERNAL / HIGH REVIEW** | não publicar |

Projetos internos não recebem serial até serem aprovados.

### 2.4 Aprovação de cases internos

Esta documentação **não tem evidência** de qual cargo ou pessoa da On Tech & Co tem autoridade formal para aprovar; **nenhum aprovador é presumido.** Para cada case interno será preparado um **pacote de aprovação** exato:

- texto público (pt-BR e en);
- screenshots/assets;
- dados mostrados;
- nomes citados;
- links;
- tecnologias mencionadas.

A aprovação vem de quem tiver autoridade sobre o produto/material na empresa. Se o case envolver **arquitetura, integrações, métricas, informação operacional, segurança ou parceiro/cliente**, marcar também a revisão específica apropriada. **Quem aprovou e quando fica no processo privado de revisão, fora do repositório público** (D-042); o runtime só recebe `publication: approved`.

### 2.5 Serial

Serial **global do inventário**: `MC-001`, `MC-002`, `MC-003`… "MC" é a coleção do Modo Campanha, não empresa nem origem. Origem fica num campo separado (`origin: 'personal' | 'on-tech' | 'other'`). O serial não representa propriedade, empresa ou importância; é a ordem de entrada na coleção. (Substitui a ideia `ON-` do plano anterior e dos concepts.)

### 2.6 Modelo de dados (D-042)

Regra de privacidade: **o repositório é público.** O runtime e os arquivos públicos sabem só **se** um conteúdo está autorizado. Nomes de aprovadores, fluxos internos, observações confidenciais, justificativas privadas e dados de revisão ficam num processo privado, **fora do repositório**. Classificação, quando existir, é genérica (ex.: "pessoal / público").

```ts
type Publication = 'approved' | 'draft' | 'review' | 'blocked'; // só 'approved' renderiza
type ProjectOrigin = 'personal' | 'on-tech' | 'other';       // origem/contexto; nunca no serial

// Catálogo de tags: o tom pertence à identidade da tag (não à posição), sem duplicar por projeto.
type TagId = 'product' | 'gamification' | 'game-design' | 'prototyping';
interface TagDefinition { id: TagId; label: Localized; tone: McChipTone }

interface Project {
  id: string;
  slug: string;
  serial: string;                         // MC-NNN (ordem de entrada na coleção)
  origin: ProjectOrigin;
  publication?: Publication;              // ausente = não publica
  title: Localized;
  type: Localized;                        // texto impresso no cartucho (ex.: PORTFÓLIO INTERATIVO)
  summary: Localized;                     // descrição curta (Project Summary)
  tags: readonly TagId[];                 // até 2
  cartridge: {                            // configuração visual 1:1 do MC-CART (sem entidade própria)
    shell: McCartShell;
    accent: McCartAccent;
    artwork?: { src: string; alt: Localized };
  };
  year?: number;                          // opcional; nunca inventado
  role?: Localized;
  stack?: readonly string[];
  context?: Localized;
  contribution?: Localized;
  learnings?: Localized<string[]>;
  links?: { label: Localized; url: string; kind: 'live' | 'repository' | 'case-study' | 'other' }[];
}
```

Removido do modelo atual: `status` (misturava estágio com publicação; se um dia houver caso real, avaliar um campo `stage` separado), `featured` (sem comportamento), entidade `Cartridge` independente com `label` e `color` livre (relação 1:1; sem segundo caso de uso), `approvals` e `classification` no runtime (privacidade).

Skills (D-042): **autoria × runtime.** `candidate` / `approved` vivem só no content inventory (docs); o runtime carrega **apenas skills aprovadas**, sem campo de status.

```ts
type SkillGroupId = 'build' | 'product' | 'ai' | 'game-dna';
interface Skill { id: string; name: Localized }
interface SkillGroup { id: SkillGroupId; title: Localized; skills: readonly Skill[] }
```

### 2.7 Artwork

| Requisito | Regra |
|---|---|
| Proporção | **16:10** (janela do rótulo do MC-CART) |
| Resolução | **mínimo 640 × 400** (2×); WebP/AVIF |
| Texto | não obrigatório dentro da arte (o nome está no rótulo) |
| Conteúdo | nada de screenshots internos sem aprovação, logos de terceiros sem permissão ou dados reais |
| Produção | etapa própria; **"PROJECT ARTWORK" nunca na versão pública final do Inventory** (permitido só no showcase, em desenvolvimento local e em estados explícitos de dev). MC-001: checkpoint **02-C.5** |
| Nome | não repetir desnecessariamente o nome do projeto (o rótulo do MC-CART já o contém) |

### 2.8 Layout

```
■ PROJECT INVENTORY ───────────────────────────────
  Cartuchos coletados durante a campanha.

[ MC-CART ]   [ MC-CART ]          ← só os aprovados; sem slots falsos
 Nome          Nome
 Descrição     Descrição
 [chip][chip]  [chip][chip]
```

| Breakpoint | Colunas |
|---|---|
| Desktop (≥ 1024) | até 4 por linha (3/12 cada) |
| Tablet (768–1023) | 2 por linha |
| Mobile (< 768) | 1 por linha |

Ordem da Home: Player Status → **Skill Loadout** → **Project Inventory**.

### 2.9 Inventory → CRT (pendente)

`MC-CART → selecionar → inserir no sistema → CRT Project Viewer → case`. Decisão entre `#project-<slug>` e `/projects/<slug>` **fica pendente até existir o primeiro Project Case real**, com **preferência arquitetural futura por rota própria** (deep link, compartilhamento, SEO, case independente). O cartucho inteiro recebe a semântica de interação quando ela existir. Sem animação no Slice 02.

---

## 3. Plano por sub-slices

| Etapa | Entrega | Gate |
|---|---|---|
| **02-0 Content inventory** | fichas de **MC-001** e **MC-002** + validação item a item do Skill Loadout | ◆ aprovação de conteúdo (atual) |
| **02-A Skill Loadout data/content** | models novos (`build/product/ai/game-dna`, `Localized`, sem `state`); dados bilíngues só com skills aprovadas; testes | |
| **02-B Skill Loadout visual** | alternativa A aberta e silenciosa; renomear seção `skill-tree` → `skill-loadout` (componente, âncora, i18n, teste de ordem, docs) | ◆ revisão visual |
| **02-C Project model + layout** | `Project` evoluído (§2.6); catálogo de tags; regra de publicação conservadora com testes | |
| **02-C.5 MC-001 Project Artwork** | artwork do MC-001 (16:10, mín. 640 × 400, sem texto embutido, universo Modo Campanha, sem repetir o nome) | ◆ **aprovação do artwork** (bloqueia o Inventory público) |
| **02-D Inventory** | MC-CART + Project Summary dos projetos aprovados, com artwork aprovado (placeholder só em dev/showcase) | |
| **02-E Responsive** | até 4 / 2 / 1, sem overflow | |
| **02-F Revisão** | pt-BR/en × 1440/820/390, acessibilidade, contraste, âncoras, regressão do Slice 01 | ◆ aprovação final |
