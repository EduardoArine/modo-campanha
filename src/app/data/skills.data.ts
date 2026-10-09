import { Localized } from '../core/i18n';
import { SkillGroup } from '../models';

// Skill Loadout v1 (D-041). Somente skills APROVADAS por Eduardo; candidatas e removidas
// ficam em docs/14-content-inventory.md e nunca entram aqui. Nenhuma graduação de proficiência.

/** Mesmo texto nos dois idiomas (nomes próprios de tecnologia, títulos de grupo). */
const same = (text: string): Localized => ({ 'pt-BR': text, en: text });

export const SKILL_LOADOUT: readonly SkillGroup[] = [
  {
    id: 'build',
    code: 'BLD',
    title: same('BUILD'),
    skills: [
      { id: 'angular', name: same('Angular') },
      { id: 'typescript', name: same('TypeScript') },
      { id: 'csharp-dotnet', name: same('C# / .NET') },
      { id: 'rest-apis', name: same('REST APIs') },
      { id: 'postgresql-sql-server', name: same('PostgreSQL / SQL Server') },
      { id: 'docker', name: same('Docker') },
    ],
  },
  {
    id: 'product',
    code: 'PRD',
    title: same('PRODUCT'),
    skills: [
      {
        id: 'product-thinking',
        name: { 'pt-BR': 'Pensamento de produto', en: 'Product thinking' },
      },
      {
        id: 'ux-ui-collaboration',
        name: { 'pt-BR': 'Colaboração UX/UI', en: 'UX/UI collaboration' },
      },
      {
        id: 'prototyping-iteration',
        name: { 'pt-BR': 'Prototipação e iteração', en: 'Prototyping & iteration' },
      },
      { id: 'design-systems', name: same('Design systems') },
    ],
  },
  {
    id: 'ai',
    code: 'AI',
    title: same('AI'),
    skills: [
      {
        id: 'ai-assisted-development',
        name: { 'pt-BR': 'Desenvolvimento assistido por IA', en: 'AI-assisted development' },
      },
      { id: 'coding-agents', name: { 'pt-BR': 'Agentes de desenvolvimento', en: 'Coding agents' } },
      {
        id: 'prompt-workflow-design',
        name: { 'pt-BR': 'Design de prompts e workflows', en: 'Prompt & workflow design' },
      },
      {
        id: 'workflow-automation',
        name: { 'pt-BR': 'Automação de workflows', en: 'Workflow automation' },
      },
    ],
  },
  {
    id: 'game-dna',
    code: 'GDN',
    title: same('GAME DNA'),
    skills: [
      { id: 'game-systems', name: { 'pt-BR': 'Sistemas de jogo', en: 'Game systems' } },
      { id: 'gamification', name: { 'pt-BR': 'Gamificação', en: 'Gamification' } },
      {
        id: 'interaction-design',
        name: { 'pt-BR': 'Design de interação', en: 'Interaction design' },
      },
      {
        id: 'game-prototyping',
        name: { 'pt-BR': 'Prototipação de jogos', en: 'Game prototyping' },
      },
    ],
  },
];
