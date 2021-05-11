import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, distinctUntilChanged, filter, map, tap, withLatestFrom } from 'rxjs/operators';

import { BattleLog, BattleStatus, opponentTypes, Slayer, SlayerType, SlayerActionType } from '../models';
import { MonsterSlayerService } from '../services/monster-slayer.service';
import * as MonsterSlayerActions from './actions';
import * as MonsterSlayerReducer from './reducer';
import * as MonsterSlayerSelectors from './selectors';

@Injectable()
export class MonsterSlayerEffects {

  getSlayerActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.getSlayerActions),
      map(() => {
        const actions = this.monsterSlayerService.getSlayerActions();
        return MonsterSlayerActions.setSlayerActions({ actions });
      })
    )
  );

  attacks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.attack, MonsterSlayerActions.specialAttack),
      withLatestFrom(this.store.select(MonsterSlayerSelectors.selectSlayers)),
      concatMap(([{ type, slayerType }, slayers]) => {
        const actionType = type === MonsterSlayerActions.specialAttack.type ?
          SlayerActionType.SPECIAL_ATTACK : SlayerActionType.ATTACK;
        return this.handleSlayerAction(actionType, slayers[slayerType], slayers[opponentTypes[slayerType]]);
      })
    )
  );

  specialAttack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.specialAttack),
      map(({ slayerType }) => MonsterSlayerActions.setCooldown({ slayerType, cooldown: 0 }))
    )
  );

  heal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.heal),
      withLatestFrom(this.store.select(MonsterSlayerSelectors.selectSlayers)),
      concatMap(([{ slayerType }, slayers]) =>
        this.handleSlayerAction(SlayerActionType.HEAL, slayers[slayerType], slayers[slayerType])
      )
    )
  );

  surrender$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.surrender),
      map(() =>
        MonsterSlayerActions.addBattleLog({ log: new BattleLog(SlayerType.HERO, SlayerActionType.SURRENDER) })
      )
    )
  );

  nextRound$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.nextRound),
      withLatestFrom(
        this.store.select(MonsterSlayerSelectors.selectSlayers),
        this.store.select(MonsterSlayerSelectors.selectBattleStatus)
      ),
      tap(([_, { hero, monster }, status]) => {
        this.updateCooldowns([hero, monster]);
        this.updateBattleStatus(hero, monster, status);
      })
    ),
    { dispatch: false });

  setCooldown$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.setCooldown),
      filter(({ slayerType }) => slayerType === SlayerType.HERO),
      withLatestFrom(this.store.select(MonsterSlayerSelectors.selectHero)),
      map(([_, hero]) => this.monsterSlayerService.isWaitingForCooldown(hero)),
      distinctUntilChanged(),
      map(disabled => MonsterSlayerActions.setSpecialAttackState({ disabled }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<MonsterSlayerReducer.State>,
    private monsterSlayerService: MonsterSlayerService
  ) {}

  protected handleSlayerAction(
    actionType: SlayerActionType.SPECIAL_ATTACK | SlayerActionType.ATTACK | SlayerActionType.HEAL,
    slayer: Slayer,
    target: Slayer
  ): Action[] {
    const [delta, health] = this.monsterSlayerService[actionType](slayer, target);
    return [
      MonsterSlayerActions.setHealth({ slayerType: target.type, health }),
      MonsterSlayerActions.addBattleLog({ log: new BattleLog(slayer.type, actionType, delta) }),
      slayer.type === SlayerType.HERO ?
        MonsterSlayerActions.attack({ slayerType: SlayerType.MONSTER }) :
        MonsterSlayerActions.nextRound()
    ];
  }

  protected updateCooldowns(slayers: Slayer[]): void {
    slayers
      .filter(slayer => this.monsterSlayerService.isWaitingForCooldown(slayer))
      .forEach(slayer => {
        this.store.dispatch(
          MonsterSlayerActions.setCooldown({
            slayerType: slayer.type,
            cooldown: this.monsterSlayerService.adjustCooldown(slayer as Required<Slayer>)
          })
        );
      });
  }

  protected updateBattleStatus(hero: Slayer, monster: Slayer, status: BattleStatus): void {
    const newStatus = this.monsterSlayerService.getStatusFromSlayers(hero, monster);
    if (status !== newStatus) {
      this.store.dispatch(MonsterSlayerActions.setBattleStatus({ status: newStatus }));
    }
  }
}
