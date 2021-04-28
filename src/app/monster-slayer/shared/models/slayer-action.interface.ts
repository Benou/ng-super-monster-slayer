import { SlayerActionType } from './slayer-action-type.enum';

export interface SlayerAction {
  type: SlayerActionType;
  disabled: boolean;
}

export const slayerActions: SlayerAction[] = [
  {
    type: SlayerActionType.ATTACK,
    disabled: false
  },
  {
    type: SlayerActionType.SPECIAL_ATTACK,
    disabled: false
  },
  {
    type: SlayerActionType.HEAL,
    disabled: false
  },
  {
    type: SlayerActionType.SURRENDER,
    disabled: false
  }
];
