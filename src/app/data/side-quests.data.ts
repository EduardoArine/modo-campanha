import { SideQuest } from '../models';

// Side Quests publicadas (Home Slice 07). Vazio até existir conteúdo aprovado: com a lista vazia,
// a seção não é renderizada. Paco (MC-002) segue em revisão e não entra no runtime.
//
// Em desenvolvimento (`ng serve`, build de desenvolvimento e testes) este arquivo é substituído
// por `side-quests.data.development.ts` (conteúdo MOCK) via `fileReplacements` no angular.json,
// então o MOCK nunca entra no bundle de produção.
export const SIDE_QUESTS: readonly SideQuest[] = [];
