import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as MonsterSlayerReducer from './reducer';

const monsterSlayerState = createFeatureSelector<MonsterSlayerReducer.State>('monsterSlayer');

export const selectHero = createSelector(monsterSlayerState, MonsterSlayerReducer.getHero);

export const selectMonster = createSelector(monsterSlayerState, MonsterSlayerReducer.getMonster);

export const selectSlayers = createSelector(selectHero, selectMonster, MonsterSlayerReducer.getSlayers);

export const selectSlayerActions = createSelector(monsterSlayerState, MonsterSlayerReducer.getSlayerActions);

export const selectBattleStatus = createSelector(monsterSlayerState, MonsterSlayerReducer.getBattleStatus);

export const selectBattleLogs = createSelector(monsterSlayerState, MonsterSlayerReducer.getBattleLogs);

export const selectRound = createSelector(monsterSlayerState, MonsterSlayerReducer.getRound);
