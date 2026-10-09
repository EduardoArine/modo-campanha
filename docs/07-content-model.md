# 07 — Modelo de Conteúdo

Fonte da verdade: `src/app/models/`. Este documento explica a intenção de cada estrutura. **Ao alterar uma interface, atualizar este documento.**

## Mudanças planejadas (FASE 2/3, ainda não aplicadas no código)

As interfaces atuais são da FASE 0. Ao aprovar D-020 (i18n) e especificar o MC-CART, elas evoluem assim:

1. **Bilíngue (D-018, D-020):** todo campo de texto humano passa de `string` para `Localized<string>` (`{ 'pt-BR': string; en: string }`), e listas para `Localized<string[]>`. O tipo já existe em `src/app/core/i18n/locale.ts`; resolver no idioma ativo com `LocaleService.pick()`. Textos de UI (labels, navegação, mensagens, aria) não são conteúdo: ficam nos dicionários `core/i18n/ui.*.ts`. Campos neutros (ids, slug, ano, stack, URLs, serial) continuam simples.
   - Ex.: `title`, `subtitle`, `role`, `summary`, `mission`, `responsibilities`, `challenges`, `solution`, `results`, `learnings`, `ProjectScreenshot.alt/caption`, `ProjectLink.label`, `Skill.name`, `SkillGroup.title`, `Achievement.title/description`, `CampaignLogEntry.title/context/summary`, `SocialLink.label`.
   - Nomes próprios (ex.: "Comunidade On") também usam `Localized` por consistência; podem repetir o mesmo valor.
2. ✅ **Implementado no 02-C (D-044), ver seção Project.** Plano original, MC-CART (D-013): `Cartridge` ganha `shell` (`'black' | 'cream' | 'graphite' | 'orange'`), `accent` (token de cor) e `serial` no formato `<COLEÇÃO>-<NNN>` (ex.: `ON-001`, como no concept). A regra de prefixos será definida na spec do MC-CART. `color` será substituído por `shell` + `accent`.
3. ✅ **Implementado no 02-C** (catálogo `TAGS`, ids em vez de strings). Plano original, **listagem enxuta:** `Project` ganha `tags` (1–2, `Localized<string>[]`) para a vitrine; detalhes completos ficam para o CRT Viewer ("coleção primeiro, documentação depois").
4. **PlayerProfile:** ✅ **implementado no Home Slice 01** (`src/app/models/player-profile.model.ts`, `src/app/data/profile.data.ts`), com campos `Localized`: `name`, `role`, `focusLine`, `summary`, `motto`, `status` (origin, xp, currentCampaign, focus, state; cada um com `label` e `value`) e `photo?`. Os textos humanos saíram do dicionário de UI. Descrição original: nome, classe, origem, XP profissional (texto real, ex. "10+ anos em tecnologia", **nunca** pontos, D-021), campanha atual, foco, estado atual, texto "Sobre a jornada", foto (`photo?: { src; alt: Localized }`; ausente = placeholder "FOTO DO EDUARDO", D-017).

Regra de ouro: **nenhum dado fictício.** Os arquivos de `src/app/data/` só recebem conteúdo real, validado por Eduardo. Se for necessário um exemplo, ele deve ser explicitamente marcado como placeholder.

## Project (Home Slice 02-C, D-042/D-044)

`src/app/models/project.model.ts`

```ts
type ProjectOrigin = 'personal' | 'on-tech' | 'other';
type ProjectPublication = 'approved' | 'draft' | 'review' | 'blocked';
type TagId = 'product' | 'gamification' | 'game-design' | 'prototyping';

interface TagDefinition {
  id: TagId;
  label: Localized;
  tone: McChipTone;
}
type ProjectTags = readonly [] | readonly [TagId] | readonly [TagId, TagId]; // até 2, pelo tipo

interface ProjectLink {
  kind: 'repository' | 'live' | 'case-study' | 'other';
  label: Localized;
  url: string;
}

interface ProjectCartridge {
  shell: McCartShell; // dark | light | orange | cool
  accent: McCartAccent; // warm | cool | special
  artwork?: { src: string; alt: Localized }; // 16:10, mín. 640 × 400
}

interface Project {
  id: string;
  serial: string; // MC-NNN: ordem de entrada na coleção
  slug: string;
  origin: ProjectOrigin; // separado do serial
  publication?: ProjectPublication;
  title: Localized;
  description: Localized;
  type: Localized; // texto do cartucho (ex.: PORTFÓLIO INTERATIVO)
  role: Localized;
  technologies: readonly string[];
  learnings: Localized<readonly string[]>;
  year?: number; // só com dado real
  tags: ProjectTags;
  cartridge: ProjectCartridge;
  links: readonly ProjectLink[];
}
```

Regras:

- **Publicação conservadora:** `isPublished()` só aceita `publication: 'approved'` explícito; ausente, `draft`, `review` e `blocked` não aparecem. `publishedProjects()` aplica a regra.
- **Artwork:** `inventoryProjects(allowArtworkPlaceholder)` exige, além de publicado, artwork aprovado fora de desenvolvimento. O componente passa `isDevMode()`: em produção, projeto sem artwork não aparece e "PROJECT ARTWORK" nunca é renderizado.
- **Tags:** catálogo fechado em `src/app/data/tags.data.ts` (`TAGS`), com label bilíngue e tom fixo por tag (cor = categorização, nunca importância).
- **Sem campos editoriais:** nada de aprovador, revisão ou confidencialidade no runtime (repositório público, D-042).
- **Removidos:** `ProjectType`, `ProjectStatus`/`status`, `featured`, `subtitle`, `summary` (→ `description`), `stack` (→ `technologies`), `mission`, `responsibilities`, `challenges`, `solution`, `results`, `screenshots`, link `video`, entidade `Cartridge` com `label`/`art`/`color`/`serial` (serial subiu para o projeto). Campos de case voltam só quando o CRT/case existir e houver conteúdo aprovado.

Dados: `src/app/data/projects.data.ts`: **MC-001 Modo Campanha** (`approved`, orange/special, artwork `assets/cartridges/mc-001-modo-campanha.png`, D-046). Dentro do MC-CART a arte é decorativa (o cartucho é um único `role="img"`); `artwork.alt` serve para usos independentes. **Regra: o runtime contém somente projetos aprovados para publicação**; projetos em revisão (MC-002 Paco) ficam só em `docs/14` até a aprovação. O filtro é testado com fixtures neutros (`approved`, `review`, `draft`, `blocked`, ausente), nunca com conteúdo editorial real não aprovado.

## Skill / SkillGroup (Skill Loadout, D-042)

`src/app/models/skill.model.ts`

```ts
type SkillGroupId = 'build' | 'product' | 'ai' | 'game-dna';

interface Skill {
  id: string;
  name: Localized;
}
interface SkillGroup {
  id: SkillGroupId;
  title: Localized;
  skills: readonly Skill[];
}
```

- **Proibido** no model: percentual, rating, level, estrelas, rótulo de proficiência, XP individual e os antigos `state` (unlocked/evolving/core/exploring), removidos.
- **Autoria × runtime:** `candidate`/`approved` vivem só em `docs/14-content-inventory.md`; o runtime carrega **apenas skills aprovadas**, sem campo de status.

Dados: `src/app/data/skills.data.ts` exporta `SKILL_LOADOUT` (Skill Loadout v1, D-041). Testes em `skills.data.spec.ts` garantem o conteúdo exato nos dois idiomas, a ausência dos itens removidos e de campos de proficiência/autoria.

## Achievement (Home Slice 04, D-051)

`src/app/models/achievement.model.ts`

```ts
interface Achievement {
  id: string;
  title: Localized; // manchete curta
  description: Localized; // 1 frase, ~80–110 caracteres
  evidence: Localized; // obrigatório: fonte factual curta (até ~60 caracteres)
  year?: number; // só com data real
}
```

- `evidence` obrigatório: nenhum achievement sem base factual.
- `ACH-0N` é derivado da ordem de apresentação (decorativo); não fica no dado.
- Fora: kind, icon, secret (volta na FASE 6, `docs/08`), score, XP, rarity, level, unlocked, progress.
- Regra pública: renderiza só com **≥ 2** itens (`MIN_ACHIEVEMENTS`, `src/app/data/achievements.rules.ts`).

Dados:

- `src/app/data/achievements.data.ts`: **publicado** (produção). Vazio até haver fatos aprovados.
- `src/app/data/achievements.data.development.ts`: **MOCK de desenvolvimento visual** (D-051), trocado via `fileReplacements` só em desenvolvimento e testes. **Não é conteúdo factual.**

## CampaignLogEntry (Home Slice 03, D-048/D-049)

`src/app/models/campaign-log.model.ts`

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
  context?: Localized; // organização/ambiente, só quando útil e aprovado
  summary: Localized; // 1–2 frases: o que mudou
}
```

- `kind` é semântica; o rótulo (NEW GAME / CHECKPOINT / CAMPANHA ATUAL) vem do dicionário de UI (`campaignLog.kind`).
- Fora do modelo: technologies, tags, highlights, results, XP, progress, level, logos, métricas.
- Substitui `CampaignCheckpoint` (FASE 0).

Dados:

- `src/app/data/campaign-log.data.ts`: **publicado** (produção). Vazio até o histórico real ser aprovado; vazio = seção não renderizada.
- `src/app/data/campaign-log.data.development.ts`: **MOCK de desenvolvimento visual** (D-049), trocado via `fileReplacements` só em desenvolvimento e testes. **Não é conteúdo factual.**

## SocialLink

`src/app/models/social-link.model.ts`

```ts
type SocialLinkKind = 'github' | 'linkedin' | 'email' | 'resume' | 'other';
interface SocialLink {
  kind: SocialLinkKind;
  label: string;
  url: string;
}
```

Dados: `src/app/data/social-links.data.ts`. Hoje contém apenas o GitHub; LinkedIn, email e currículo aguardam os links de Eduardo.

## Conteúdo ainda sem modelo

Criar quando a seção for implementada (evitar modelar cedo demais):

- **Player Status / Hero**: provavelmente um objeto `PlayerProfile` (nome, classe, origem, XP, campanha atual, foco, status, texto de apresentação).
- **Current Main Quest**: possivelmente reaproveita `Project` (Comunidade On) + campos de status.
- **Easter eggs**: configuração em `core/` quando aprovados.
