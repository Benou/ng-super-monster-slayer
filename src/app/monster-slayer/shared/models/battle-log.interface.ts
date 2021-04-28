import { SlayerType } from './slayer-type.enum';
import { SlayerActionType } from './slayer-action-type.enum';

export interface BattleLog {
  slayerType: SlayerType;
  actionType: SlayerActionType;
  value?: number;
}
