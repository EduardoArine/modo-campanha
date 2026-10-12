/**
 * Conteúdo do attract mode (D-068): as quatro experiências coletadas na trilha, na ordem da
 * coleta. Os rótulos vêm do dicionário (`ui.systemHorizon.items`, linguagem de sistema em inglês
 * nos dois idiomas). `row` = linha do item em `sh-items.png`; `x` = posição na trilha.
 * No jogo completo, os coletáveis passam a vir de dados reais e aprovados (skills, projetos).
 */
export type CollectibleId = 'build' | 'product' | 'ai' | 'gameDna';

export interface Collectible {
  readonly id: CollectibleId;
  readonly row: number;
  readonly x: number;
}

export const ATTRACT_COLLECTIBLES: readonly Collectible[] = [
  { id: 'build', row: 0, x: 47 },
  { id: 'product', row: 1, x: 62 },
  { id: 'ai', row: 2, x: 77 },
  { id: 'gameDna', row: 3, x: 92 },
];

/** Cartucho desbloqueado ao fim das coletas: o próprio Modo Campanha. */
export const ATTRACT_CARTRIDGE_SERIAL = 'MC-001';
