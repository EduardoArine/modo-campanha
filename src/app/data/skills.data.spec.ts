import { SKILL_LOADOUT } from './skills.data';

const names = (locale: 'pt-BR' | 'en') =>
  Object.fromEntries(
    SKILL_LOADOUT.map((group) => [group.id, group.skills.map((skill) => skill.name[locale])]),
  );

describe('SKILL_LOADOUT (runtime data)', () => {
  it('has exactly the four approved groups, in order', () => {
    expect(SKILL_LOADOUT.map((group) => group.id)).toEqual(['build', 'product', 'ai', 'game-dna']);
    expect(SKILL_LOADOUT.map((group) => group.title.en)).toEqual([
      'BUILD',
      'PRODUCT',
      'AI',
      'GAME DNA',
    ]);
  });

  it('contains exactly the approved Skill Loadout v1 in pt-BR', () => {
    expect(names('pt-BR')).toEqual({
      build: [
        'Angular',
        'TypeScript',
        'C# / .NET',
        'REST APIs',
        'PostgreSQL / SQL Server',
        'Docker',
      ],
      product: [
        'Pensamento de produto',
        'Colaboração UX/UI',
        'Prototipação e iteração',
        'Design systems',
      ],
      ai: [
        'Desenvolvimento assistido por IA',
        'Agentes de desenvolvimento',
        'Design de prompts e workflows',
        'Automação de workflows',
      ],
      'game-dna': [
        'Sistemas de jogo',
        'Gamificação',
        'Design de interação',
        'Prototipação de jogos',
      ],
    });
  });

  it('contains exactly the approved Skill Loadout v1 in en', () => {
    expect(names('en')).toEqual({
      build: [
        'Angular',
        'TypeScript',
        'C# / .NET',
        'REST APIs',
        'PostgreSQL / SQL Server',
        'Docker',
      ],
      product: [
        'Product thinking',
        'UX/UI collaboration',
        'Prototyping & iteration',
        'Design systems',
      ],
      ai: [
        'AI-assisted development',
        'Coding agents',
        'Prompt & workflow design',
        'Workflow automation',
      ],
      'game-dna': ['Game systems', 'Gamification', 'Interaction design', 'Game prototyping'],
    });
  });

  it('does not ship items removed from v1', () => {
    const all = JSON.stringify(SKILL_LOADOUT);

    for (const removed of [
      'Application architecture',
      'Product modeling',
      'AI prototyping',
      'Progression & feedback',
    ]) {
      expect(all).not.toContain(removed);
    }
  });

  it('carries no proficiency or authoring fields at runtime', () => {
    for (const group of SKILL_LOADOUT) {
      expect(Object.keys(group).sort()).toEqual(['id', 'skills', 'title']);
      for (const skill of group.skills) {
        expect(Object.keys(skill).sort()).toEqual(['id', 'name']);
      }
    }
    expect(JSON.stringify(SKILL_LOADOUT)).not.toMatch(
      /level|percent|rating|stars|state|status|candidate|unlocked|evolving|core|exploring|xp/i,
    );
  });

  it('uses unique skill ids', () => {
    const ids = SKILL_LOADOUT.flatMap((group) => group.skills.map((skill) => skill.id));

    expect(new Set(ids).size).toBe(ids.length);
  });
});
