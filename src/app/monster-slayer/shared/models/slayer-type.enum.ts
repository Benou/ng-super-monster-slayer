export enum SlayerType {
  HERO = 'hero',
  MONSTER = 'monster'
}

export const opponentTypes: Record<SlayerType, SlayerType> = {
  [SlayerType.HERO]: SlayerType.MONSTER,
  [SlayerType.MONSTER]: SlayerType.HERO
};
