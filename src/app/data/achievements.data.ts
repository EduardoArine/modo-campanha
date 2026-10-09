import { Achievement } from '../models';

// Achievements publicados (Home Slice 04, D-051). Vazio até existirem fatos aprovados (04-C):
// cada achievement precisa de evidência factual e não pode repetir Player Status, Skill Loadout,
// Inventory ou Campaign Log.
//
// Em desenvolvimento (`ng serve`, build de desenvolvimento e testes) este arquivo é substituído
// por `achievements.data.development.ts` (conteúdo MOCK) via `fileReplacements` no angular.json,
// então o MOCK nunca entra no bundle de produção.
export const ACHIEVEMENTS: readonly Achievement[] = [];
// Regra de renderização (>= 2): achievements.rules.ts (não substituído por fileReplacements).
