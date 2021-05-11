import { SlayerType } from './slayer-type.enum';
import { SlayerActionType } from './slayer-action-type.enum';

export class BattleLog {
  constructor(public slayerType: SlayerType, public actionType: SlayerActionType, public value?: number) {}
}
