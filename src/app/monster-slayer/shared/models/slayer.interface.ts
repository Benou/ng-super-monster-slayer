import { SlayerType } from './slayer-type.enum';

export interface Slayer {
  type: SlayerType;
  health: number;
  maxHealth: number;
  damages: [number, number];
}

export interface Hero extends Slayer {
  healing: [number, number];
  cooldown: number;
  maxCooldown: number;
}

export type Slayers = Record<SlayerType, Slayer>;
