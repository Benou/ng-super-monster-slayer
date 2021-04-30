import { createReducer, on } from '@ngrx/store';

import { BattleLog, BattleStatus, Hero, Slayer, SlayerAction, Slayers, SlayerType } from '../../shared';
import * as MonsterSlayerActions from './actions';

export interface State {
  hero: Hero;
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

export const reducer = createReducer(
  initialState,
  on(MonsterSlayerActions.setCooldown, (state, { cooldown }) =>
    ({ ...state, [SlayerType.HERO]: { ...state[SlayerType.HERO], cooldown } })
  ),
  on(MonsterSlayerActions.setHealth, (state, { slayerType, health }) =>
    ({ ...state, [slayerType]: { ...state[slayerType], health } })
  ),
  on(MonsterSlayerActions.surrender, state => ({ ...state, battleStatus: BattleStatus.SURRENDER })),
  on(MonsterSlayerActions.setActions, (state, { actions }) => ({ ...state, actions })),
  on(MonsterSlayerActions.setStatus, (state, { status }) => ({ ...state, status })),
  on(MonsterSlayerActions.log, (state, { log }) => ({ ...state, logs: [log, ...state.logs] })),
  on(MonsterSlayerActions.nextRound, state => ({ ...state, round: state.round + 1 }))
);

export const getHero = (state: State): Hero => state.hero;
export const getMonster = (state: State): Slayer => state.monster;
export const getSlayers = (hero: Hero, monster: Slayer): Slayers => ({ hero, monster });
export const getActions = (state: State): SlayerAction[] => state.actions;
export const getStatus = (state: State): BattleStatus => state.status;
export const getLogs = (state: State): BattleLog[] => state.logs;
export const getRound = (state: State): number => state.round;
