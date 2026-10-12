import { PlayerPose } from '../world/entities';
import { PlayerController } from './controller';

/** Trecho do roteiro: a pose do jogador do tick `from` (inclusive) até o próximo trecho. */
export interface ScriptStep {
  readonly from: number;
  readonly pose: PlayerPose;
}

/** Controle por roteiro: o "piloto automático" do attract mode. */
export class ScriptedController implements PlayerController {
  constructor(private readonly script: readonly ScriptStep[]) {}

  intent(tick: number): PlayerPose {
    let pose: PlayerPose = 'idle';
    for (const step of this.script) if (tick >= step.from) pose = step.pose;
    return pose;
  }
}
