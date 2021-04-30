import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as MonsterSlayerReducer from './reducer';

const monsterSlayerState = createFeatureSelector<MonsterSlayerReducer.State>('monsterSlayer');

export const selectHero = createSelector(monsterSlayerState, MonsterSlayerReducer.getHero);

export const selectMonster = createSelector(monsterSlayerState, MonsterSlayerReducer.getMonster);

export const selectSlayers = createSelector(selectHero, selectMonster, MonsterSlayerReducer.getSlayers);

export const selectActions = createSelector(monsterSlayerState, MonsterSlayerReducer.getActions);

export const selectStatus = createSelector(monsterSlayerState, MonsterSlayerReducer.getStatus);

export const selectLogs = createSelector(monsterSlayerState, MonsterSlayerReducer.getLogs);

export const selectRound = createSelector(monsterSlayerState, MonsterSlayerReducer.getRound);
