import { createAction, props } from '@ngrx/store';

import { BattleLog, BattleStatus, Hero, Slayer, SlayerAction, SlayerActionResult, SlayerType } from '../models';

export const attack = createAction('[Monster Slayer] attack', props<{ slayerType: SlayerType }>());
export const specialAttack = createAction('[Monster Slayer] specialAttack', props<{ slayerType: SlayerType }>());
export const heal = createAction('[Monster Slayer] heal');
export const surrender = createAction('[Monster Slayer] surrender');
export const actionDone = createAction('[Monster Slayer] actionDone', props<{ result: SlayerActionResult }>());

export const getActions = createAction('[Monster Slayer] getActions');
export const setActions = createAction('[Monster Slayer] setActions', props<{ actions: SlayerAction[] }>());
export const setCooldown = createAction('[Monster Slayer] setCooldown', props<{ cooldown: Hero['cooldown'] }>());
export const setHealth = createAction(
  '[Monster Slayer] setHealth',
  props<{ slayerType: SlayerType, health: Slayer['health'] }>()
);

export const setStatus = createAction('[Monster Slayer] setStatus', props<{ status: BattleStatus }>());
export const log = createAction('[Monster Slayer] log', props<{ log: BattleLog }>());
export const nextRound = createAction('[Monster Slayer] nextRound');
