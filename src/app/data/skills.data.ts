import { SkillGroup } from '../models';

// Grupos e skills definidos por Eduardo. Estados (`state`) ainda não atribuídos.
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'engineering',
    title: 'Engineering',
    skills: [
      { id: 'angular', name: 'Angular' },
      { id: 'typescript', name: 'TypeScript' },
      { id: 'csharp', name: 'C#' },
      { id: 'dotnet', name: '.NET / ASP.NET Core' },
      { id: 'rest-apis', name: 'APIs REST' },
      { id: 'postgresql', name: 'PostgreSQL' },
      { id: 'sql-server', name: 'SQL Server' },
      { id: 'docker', name: 'Docker' },
      { id: 'git', name: 'Git' },
    ],
  },
  {
    id: 'product',
    title: 'Product',
    skills: [
      { id: 'digital-products', name: 'Produtos digitais' },
      { id: 'ux', name: 'UX' },
      { id: 'interfaces', name: 'Interfaces' },
      { id: 'business-rules', name: 'Regras de negócio' },
      { id: 'journeys', name: 'Jornadas' },
      { id: 'user-experience', name: 'Experiência do usuário' },
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    skills: [
      { id: 'applied-ai', name: 'IA aplicada ao desenvolvimento' },
      { id: 'ai-assisted-dev', name: 'AI-assisted development' },
      { id: 'prompting', name: 'Prompting' },
      { id: 'analysis', name: 'Análise' },
      { id: 'documentation', name: 'Documentação' },
      { id: 'automation', name: 'Automação' },
    ],
  },
  {
    id: 'game-design',
    title: 'Game Design',
    skills: [
      { id: 'gamification', name: 'Gamificação' },
      { id: 'progression', name: 'Progressão' },
      { id: 'feedback', name: 'Feedback' },
      { id: 'reward', name: 'Recompensa' },
      { id: 'engagement-loops', name: 'Engagement loops' },
      { id: 'game-inspired-ux', name: 'Experiência inspirada por games' },
    ],
  },
];
