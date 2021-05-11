import { SlayerActionType } from './slayer-action-type.enum';

export interface SlayerAction {
  type: SlayerActionType;
  disabled: boolean;
}
