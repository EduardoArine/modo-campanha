# 07 — Modelo de Conteúdo

Fonte da verdade: `src/app/models/`. Este documento explica a intenção de cada estrutura. **Ao alterar uma interface, atualizar este documento.**

## Mudanças planejadas (FASE 2/3, ainda não aplicadas no código)

As interfaces atuais são da FASE 0. Ao aprovar D-020 (i18n) e especificar o MC-CART, elas evoluem assim:

1. **Bilíngue (D-018, D-020):** todo campo de texto humano passa de `string` para `Localized<string>` (`{ 'pt-BR': string; en: string }`), e listas para `Localized<string[]>`. O tipo já existe em `src/app/core/i18n/locale.ts`; resolver no idioma ativo com `LocaleService.pick()`. Textos de UI (labels, navegação, mensagens, aria) não são conteúdo: ficam nos dicionários `core/i18n/ui.*.ts`. Campos neutros (ids, slug, ano, stack, URLs, serial) continuam simples.
   - Ex.: `title`, `subtitle`, `role`, `summary`, `mission`, `responsibilities`, `challenges`, `solution`, `results`, `learnings`, `ProjectScreenshot.alt/caption`, `ProjectLink.label`, `Skill.name`, `SkillGroup.title`, `Achievement.title/description`, `CampaignCheckpoint.title/period/description`, `SocialLink.label`.
   - Nomes próprios (ex.: "Comunidade On") também usam `Localized` por consistência; podem repetir o mesmo valor.
2. **MC-CART (D-013):** `Cartridge` ganha `shell` (`'black' | 'cream' | 'graphite' | 'orange'`), `accent` (token de cor) e `serial` no formato `<COLEÇÃO>-<NNN>` (ex.: `ON-001`, como no concept). A regra de prefixos será definida na spec do MC-CART. `color` será substituído por `shell` + `accent`.
3. **Listagem enxuta:** `Project` ganha `tags` (1–2, `Localized<string>[]`) para a vitrine; detalhes completos ficam para o CRT Viewer ("coleção primeiro, documentação depois").
4. **PlayerProfile:** ✅ **implementado no Home Slice 01** (`src/app/models/player-profile.model.ts`, `src/app/data/profile.data.ts`), com campos `Localized`: `name`, `role`, `focusLine`, `summary`, `motto`, `status` (origin, xp, currentCampaign, focus, state; cada um com `label` e `value`) e `photo?`. Os textos humanos saíram do dicionário de UI. Descrição original: nome, classe, origem, XP profissional (texto real, ex. "10+ anos em tecnologia", **nunca** pontos, D-021), campanha atual, foco, estado atual, texto "Sobre a jornada", foto (`photo?: { src; alt: Localized }`; ausente = placeholder "FOTO DO EDUARDO", D-017).

Regra de ouro: **nenhum dado fictício.** Os arquivos de `src/app/data/` só recebem conteúdo real, validado por Eduardo. Se for necessário um exemplo, ele deve ser explicitamente marcado como placeholder.

## Project

`src/app/models/project.model.ts`

```ts
type ProjectType = 'professional' | 'personal' | 'game' | 'experiment' | 'study';
type ProjectStatus = 'in-progress' | 'released' | 'archived' | 'concept';

interface Cartridge {
  label: string;   // texto do rótulo
  art?: string;    // ex.: 'assets/cartridges/paco.png'
  color: string;   // cor predominante (token do design system na FASE 2)
  serial: string;  // serial fictício, ex.: 'ON-001'
}

interface ProjectScreenshot { src: string; alt: string; caption?: string; }

interface ProjectLink {
  label: string;
  url: string;
  kind: 'live' | 'repository' | 'case-study' | 'video' | 'other';
}

interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  type: ProjectType;
  status: ProjectStatus;
  year: number;
  role: string;
  stack: string[];
  summary: string;
  mission?: string;
  responsibilities?: string[];
  challenges?: string[];
  solution?: string;
  results?: string[];
  learnings?: string[];
  cartridge: Cartridge;
  screenshots?: ProjectScreenshot[];
  links?: ProjectLink[];
  featured: boolean;
}
```

Notas:

- Campos de case (`mission` → `learnings`) são opcionais: nem todo projeto terá case completo.
- `type` separa **Project Inventory** (`professional`) de **Side Quests** (`personal`, `game`, `experiment`, `study`). Regra exata a confirmar na FASE 3.
- `results` deve conter apenas resultados reais e publicáveis (atenção a informações confidenciais da Comunidade On).
- `screenshots[].alt` é obrigatório (acessibilidade).

Dados: `src/app/data/projects.data.ts` (vazio).

## Skill / SkillGroup (Skill Loadout, D-042)

`src/app/models/skill.model.ts`

```ts
type SkillGroupId = 'build' | 'product' | 'ai' | 'game-dna';

interface Skill { id: string; name: Localized; }
interface SkillGroup { id: SkillGroupId; title: Localized; skills: readonly Skill[]; }
```

- **Proibido** no model: percentual, rating, level, estrelas, rótulo de proficiência, XP individual e os antigos `state` (unlocked/evolving/core/exploring), removidos.
- **Autoria × runtime:** `candidate`/`approved` vivem só em `docs/14-content-inventory.md`; o runtime carrega **apenas skills aprovadas**, sem campo de status.

Dados: `src/app/data/skills.data.ts` exporta `SKILL_LOADOUT` (Skill Loadout v1, D-041). Testes em `skills.data.spec.ts` garantem o conteúdo exato nos dois idiomas, a ausência dos itens removidos e de campos de proficiência/autoria.

## Achievement

`src/app/models/achievement.model.ts`

```ts
interface Achievement {
  id: string;
  title: string;        // ex.: 'GAME DEV ORIGIN'
  description: string;  // fato concreto
  icon?: string;
  secret?: boolean;     // desbloqueada por easter egg
}
```

Dados: `src/app/data/achievements.data.ts` (vazio; ideias em `docs/02-experience-concept.md`).

## CampaignCheckpoint

`src/app/models/campaign-checkpoint.model.ts`

```ts
type CheckpointKind = 'new-game' | 'checkpoint' | 'skill-unlocked' | 'main-quest';

interface CampaignCheckpoint {
  id: string;
  kind: CheckpointKind;
  title: string;
  period: string;       // ex.: '2015' ou '2019 — atual'
  description: string;
  tags?: string[];
}
```

Dados: `src/app/data/campaign-log.data.ts` (vazio).

## SocialLink

`src/app/models/social-link.model.ts`

```ts
type SocialLinkKind = 'github' | 'linkedin' | 'email' | 'resume' | 'other';
interface SocialLink { kind: SocialLinkKind; label: string; url: string; }
```

Dados: `src/app/data/social-links.data.ts`. Hoje contém apenas o GitHub; LinkedIn, email e currículo aguardam os links de Eduardo.

## Conteúdo ainda sem modelo

Criar quando a seção for implementada (evitar modelar cedo demais):

- **Player Status / Hero**: provavelmente um objeto `PlayerProfile` (nome, classe, origem, XP, campanha atual, foco, status, texto de apresentação).
- **Current Main Quest**: possivelmente reaproveita `Project` (Comunidade On) + campos de status.
- **Easter eggs**: configuração em `core/` quando aprovados.
