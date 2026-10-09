import { CampaignLogEntry } from '../models';

// Campaign Log publicado (Home Slice 03, D-048/D-049). Vazio até o histórico real do Eduardo
// ser aprovado (03-0): com a lista vazia, a seção não é renderizada.
//
// Em desenvolvimento (`ng serve`, build de desenvolvimento e testes) este arquivo é substituído
// por `campaign-log.data.development.ts` (conteúdo MOCK) via `fileReplacements` no angular.json,
// então o MOCK nunca entra no bundle de produção.
export const CAMPAIGN_LOG: readonly CampaignLogEntry[] = [];
