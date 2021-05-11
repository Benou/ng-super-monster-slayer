import { createAction, props } from '@ngrx/store';

import { BattleLog, BattleStatus, Slayer, SlayerAction, SlayerType } from '../models';

export const getSlayerActions = createAction('[Monster Slayer] getSlayerActions');
export const setSlayerActions = createAction(
  '[Monster Slayer] setSlayerActions',
  props<{ actions: SlayerAction[] }>()
);

export const attack = createAction('[Monster Slayer] attack', props<{ slayerType: SlayerType }>());
export const specialAttack = createAction('[Monster Slayer] specialAttack', props<{ slayerType: SlayerType }>());
export const heal = createAction('[Monster Slayer] heal', props<{ slayerType: SlayerType }>());
export const surrender = createAction('[Monster Slayer] surrender');

export const setCooldown = createAction(
  '[Monster Slayer] setCooldown',
  props<{ slayerType: SlayerType, cooldown: Slayer['cooldown'] }>()
);
export const setSpecialAttackState = createAction(
  '[Monster Slayer] setSpecialAttackState',
  props<{ disabled: boolean }>()
);
export const setHealth = createAction(
  '[Monster Slayer] setHealth',
  props<{ slayerType: SlayerType, health: Slayer['health'] }>()
);

export const setBattleStatus = createAction('[Monster Slayer] setBattleStatus', props<{ status: BattleStatus }>());
export const addBattleLog = createAction('[Monster Slayer] addBattleLog', props<{ log: BattleLog }>());
export const nextRound = createAction('[Monster Slayer] nextRound');
