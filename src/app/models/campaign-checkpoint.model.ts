export type CheckpointKind = 'new-game' | 'checkpoint' | 'skill-unlocked' | 'main-quest';

export interface CampaignCheckpoint {
  id: string;
  kind: CheckpointKind;
  title: string;
  /** Período livre (ex.: `2015` ou `2019 — atual`). Somente datas reais. */
  period: string;
  description: string;
  tags?: string[];
}
