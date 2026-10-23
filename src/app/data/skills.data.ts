import { Localized } from '../core/i18n';
import { SkillGroup } from '../models';

// Skill Loadout v1 (D-041). Somente skills APROVADAS por Eduardo; candidatas e removidas
// ficam em docs/14-content-inventory.md e nunca entram aqui. Nenhuma graduação de proficiência.
// Concept C (D-092): nomes completos das especialidades, frase de cada uma e pictogramas autorais.
// Frases: a de CON veio do briefing do Eduardo; as de PRD, IA e DNA são PROPOSTA, aguardando aprovação.

/** Mesmo texto nos dois idiomas (nomes próprios de tecnologia, títulos de grupo). */
const same = (text: string): Localized => ({ 'pt-BR': text, en: text });

export const SKILL_LOADOUT: readonly SkillGroup[] = [
  {
    id: 'build',
    title: { 'pt-BR': 'CONSTRUÇÃO', en: 'DEVELOPMENT' },
    description: {
      'pt-BR': 'Tecnologias e ferramentas para transformar ideias em produtos digitais.',
      en: 'Technologies and tools to turn ideas into digital products.',
    },
    icon: 'cube',
    skills: [
      { id: 'angular', name: same('Angular'), icon: 'web' },
      { id: 'typescript', name: same('TypeScript'), icon: 'codefile' },
      { id: 'csharp-dotnet', name: same('C# / .NET'), icon: 'server' },
      { id: 'rest-apis', name: same('REST APIs'), icon: 'exchange' },
      { id: 'postgresql-sql-server', name: same('PostgreSQL / SQL Server'), icon: 'database' },
      { id: 'docker', name: same('Docker'), icon: 'container' },
    ],
  },
  {
    id: 'product',
    title: { 'pt-BR': 'PRODUTO', en: 'PRODUCT' },
    description: {
      'pt-BR': 'Práticas para transformar problemas reais em produtos que fazem sentido.',
      en: 'Practices to turn real problems into products that make sense.',
    },
    icon: 'clipboard',
    skills: [
      {
        id: 'product-thinking',
        name: { 'pt-BR': 'Pensamento de produto', en: 'Product thinking' },
        icon: 'bulb',
      },
      {
        id: 'ux-ui-collaboration',
        name: { 'pt-BR': 'Colaboração UX/UI', en: 'UX/UI collaboration' },
        icon: 'people',
      },
      {
        id: 'prototyping-iteration',
        name: { 'pt-BR': 'Prototipação e iteração', en: 'Prototyping & iteration' },
        icon: 'frames',
      },
      {
        id: 'design-systems',
        name: { 'pt-BR': 'Sistemas de design', en: 'Design systems' },
        icon: 'components',
      },
    ],
  },
  {
    id: 'ai',
    title: { 'pt-BR': 'INTELIGÊNCIA ARTIFICIAL', en: 'ARTIFICIAL INTELLIGENCE' },
    description: {
      'pt-BR':
        'IA aplicada ao desenvolvimento, com agentes, prompts e fluxos de trabalho automatizados.',
      en: 'AI applied to development, with agents, prompts and automated workflows.',
    },
    icon: 'chip',
    skills: [
      {
        id: 'ai-assisted-development',
        name: { 'pt-BR': 'Desenvolvimento assistido por IA', en: 'AI-assisted development' },
        icon: 'sparkles',
      },
      {
        id: 'coding-agents',
        name: { 'pt-BR': 'Agentes de desenvolvimento', en: 'Coding agents' },
        icon: 'robot',
      },
      {
        id: 'prompt-workflow-design',
        name: { 'pt-BR': 'Design de prompts e fluxos de trabalho', en: 'Prompt & workflow design' },
        icon: 'bubble',
      },
      {
        id: 'workflow-automation',
        name: { 'pt-BR': 'Automação de fluxos de trabalho', en: 'Workflow automation' },
        icon: 'flow',
      },
    ],
  },
  {
    id: 'game-dna',
    title: { 'pt-BR': 'DNA DE GAMES', en: 'GAME DNA' },
    description: {
      'pt-BR': 'A formação em Jogos Digitais aplicada a sistemas, interação e gamificação.',
      en: 'A Digital Games degree applied to systems, interaction and gamification.',
    },
    icon: 'gamepad',
    skills: [
      {
        id: 'game-systems',
        name: { 'pt-BR': 'Sistemas de jogo', en: 'Game systems' },
        icon: 'nodes',
      },
      { id: 'gamification', name: { 'pt-BR': 'Gamificação', en: 'Gamification' }, icon: 'trophy' },
      {
        id: 'interaction-design',
        name: { 'pt-BR': 'Design de interação', en: 'Interaction design' },
        icon: 'cursor',
      },
      {
        id: 'game-prototyping',
        name: { 'pt-BR': 'Prototipação de jogos', en: 'Game prototyping' },
        icon: 'joystick',
      },
    ],
  },
];
