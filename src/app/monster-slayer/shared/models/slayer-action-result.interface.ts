import { Slayer } from './slayer.interface';
import { SlayerType } from './slayer-type.enum';
import { SlayerActionType } from './slayer-action-type.enum';

export interface SlayerActionResult {
  actionType: SlayerActionType;
  slayerType: SlayerType;
  targetType: SlayerType;
  targetHealth: Slayer['health'];
  value: number;
  counterAttack: boolean;
}
