import { PlayerPose } from '../world/entities';

/**
 * Quem conduz o jogador. No attract mode, um roteiro (`ScriptedController`); no jogo completo,
 * o input do visitante (teclado/toque). A cena não sabe qual dos dois está no comando.
 */
export interface PlayerController {
  intent(tick: number): PlayerPose;
}
