/** Poses do jogador (cada uma é uma folha de sprites própria, docs/22 §4.2). */
export type PlayerPose = 'idle' | 'walk' | 'look';

/** O jogador do SYSTEM HORIZON: o avatar do Eduardo (D-068), nunca uma persona fictícia. */
export interface Player {
  x: number;
  pose: PlayerPose;
  /** Ticks na pose atual (escolhe o quadro da animação). */
  poseTicks: number;
}
