# 07 — Modelo de Conteúdo

Fonte da verdade: `src/app/models/`. Este documento explica a intenção de cada estrutura. **Ao alterar uma interface, atualizar este documento.**

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
  serial: string;  // serial fictício, ex.: 'MC-001'
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

## Skill / SkillGroup

`src/app/models/skill.model.ts`

```ts
type SkillGroupId = 'engineering' | 'product' | 'ai' | 'game-design';
type SkillState = 'unlocked' | 'evolving' | 'core' | 'exploring';

interface Skill { id: string; name: string; state?: SkillState; }
interface SkillGroup { id: SkillGroupId; title: string; skills: Skill[]; }
```

- **Nunca** adicionar campo de percentual / nível numérico.
- `state` ainda não atribuído a nenhuma skill: decisão da FASE 3.

Dados: `src/app/data/skills.data.ts` (quatro grupos preenchidos com as skills listadas por Eduardo).

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
