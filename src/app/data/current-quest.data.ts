import { CurrentQuest } from '../models';

// Current Main Quest publicada (Home Slice 06). `null` até existir texto público aprovado sobre a
// campanha atual: só o nome repetiria o Player Status. Com `null`, a seção não é renderizada.
//
// Em desenvolvimento (`ng serve`, build de desenvolvimento e testes) este arquivo é substituído
// por `current-quest.data.development.ts` (conteúdo MOCK) via `fileReplacements` no angular.json,
// então o MOCK nunca entra no bundle de produção.
export const CURRENT_QUEST: CurrentQuest | null = null;
