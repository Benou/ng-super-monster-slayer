import { createReducer, on } from '@ngrx/store';

import { BattleLog, BattleStatus, Slayer, SlayerAction, SlayerActionType, Slayers, SlayerType } from '../../shared';
import * as MonsterSlayerActions from './actions';

export interface State {
  hero: Required<Slayer>;
  monster: Slayer;
  actions: SlayerAction[];
  status: BattleStatus;
  logs: BattleLog[];
  round: number;
}

export const initialState: State = {
  hero: {
    type: SlayerType.HERO,
    health: 100,
    maxHealth: 100,
    damages: [5, 12],
    healing: [8, 20],
    cooldown: 3,
    maxCooldown: 3
  },
  monster: {
    type: SlayerType.MONSTER,
    health: 100,
    maxHealth: 100,
    damages: [8, 12]
  },
  actions: [],
  status: BattleStatus.SLAYERING,
  logs: [],
  round: 1
};

function setSpecialAttackState(actions: SlayerAction[], disabled: boolean): SlayerAction[] {
  return (actions || []).map(action =>
    action.type === SlayerActionType.SPECIAL_ATTACK ? { ...action, disabled } : action
  );
}

export const reducer = createReducer(
  initialState,
  on(MonsterSlayerActions.setSlayerActions, (state, { actions }) => ({ ...state, actions })),
  on(MonsterSlayerActions.setCooldown, (state, { slayerType, cooldown }) =>
    ({ ...state, [slayerType]: { ...state[slayerType], cooldown } })
  ),
  on(MonsterSlayerActions.setSpecialAttackState, (state, { disabled }) =>
    ({ ...state, actions: setSpecialAttackState(state.actions, disabled) })
  ),
  on(MonsterSlayerActions.setHealth, (state, { slayerType, health }) =>
    ({ ...state, [slayerType]: { ...state[slayerType], health } })
  ),
  on(MonsterSlayerActions.surrender, state => ({ ...state, status: BattleStatus.SURRENDER })),
  on(MonsterSlayerActions.setBattleStatus, (state, { status }) => ({ ...state, status })),
  on(MonsterSlayerActions.addBattleLog, (state, { log }) => ({ ...state, logs: [log, ...state.logs] })),
  on(MonsterSlayerActions.nextRound, state => ({ ...state, round: state.round + 1 }))
);

export const getHero = (state: State): Required<Slayer> => state.hero;
export const getMonster = (state: State): Slayer => state.monster;
export const getSlayers = (hero: Required<Slayer>, monster: Slayer): Slayers => ({ hero, monster });
export const getSlayerActions = (state: State): SlayerAction[] => state.actions;
export const getBattleStatus = (state: State): BattleStatus => state.status;
export const getBattleLogs = (state: State): BattleLog[] => state.logs;
export const getRound = (state: State): number => state.round;
