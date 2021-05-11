import { SlayerType } from './slayer-type.enum';

export interface Slayer {
  type: SlayerType;
  health: number;
  maxHealth: number;
  damages: [number, number];
  healing?: [number, number];
  cooldown?: number;
  maxCooldown?: number;
}

export type Slayers = { hero: Required<Slayer>, monster: Slayer };
