import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, distinctUntilChanged, map, tap, withLatestFrom } from 'rxjs/operators';

import { opponentTypes, SlayerType, SlayerActionType } from '../models';
import { MonsterSlayerService } from '../services/monster-slayer.service';
import * as MonsterSlayerActions from './actions';
import * as MonsterSlayerReducer from './reducer';
import * as MonsterSlayerSelectors from './selectors';

@Injectable()
export class MonsterSlayerEffects {

  attacks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.attack, MonsterSlayerActions.specialAttack),
      withLatestFrom(this.store.select(MonsterSlayerSelectors.selectSlayers)),
      map(([{ type, slayerType }, slayers]) =>
        MonsterSlayerActions.actionDone({
          result: this.monsterSlayerService.attack(
            slayers[slayerType],
            slayers[opponentTypes[slayerType]],
            type === MonsterSlayerActions.specialAttack.type
          )
        })
      )
    )
  );

  specialAttack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.specialAttack),
      map(() => MonsterSlayerActions.setCooldown({ cooldown: 0 }))
    )
  );

  heal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.heal),
      withLatestFrom(this.store.select(MonsterSlayerSelectors.selectHero)),
      map(([_, hero]) => MonsterSlayerActions.actionDone({ result: this.monsterSlayerService.heal(hero) }))
    )
  );

  surrender$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.surrender),
      map(() =>
        MonsterSlayerActions.log({ log: { slayerType: SlayerType.HERO, actionType: SlayerActionType.SURRENDER } })
      )
    )
  );

  slayerActionDone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.actionDone),
      map(action => action.result),
      concatMap(({ slayerType, actionType, targetType, targetHealth, value, counterAttack }) => [
        MonsterSlayerActions.setHealth({ slayerType: targetType, health: targetHealth }),
        MonsterSlayerActions.log({ log: { slayerType, actionType, value } }),
        counterAttack ? MonsterSlayerActions.attack({ slayerType: SlayerType.MONSTER }) : MonsterSlayerActions.nextRound()
      ])
    )
  );

  nextRound$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.nextRound),
      withLatestFrom(
        this.store.select(MonsterSlayerSelectors.selectSlayers),
        this.store.select(MonsterSlayerSelectors.selectStatus)
      ),
      tap(([_, { hero, monster }, status]) => {
        if (hero.cooldown < hero.maxCooldown) {
          this.store.dispatch(
            MonsterSlayerActions.setCooldown({ cooldown: this.monsterSlayerService.getCooldownAfterRound(hero) })
          );
        }
        const newStatus = this.monsterSlayerService.getStatusFromSlayers(hero, monster);
        if (status !== newStatus) {
          this.store.dispatch(MonsterSlayerActions.setStatus({ status: newStatus }));
        }
      })
    )
  , { dispatch: false });

  setCooldown$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.setCooldown),
      withLatestFrom(this.store.select(MonsterSlayerSelectors.selectHero)),
      map(([{ cooldown }, hero]) => !hero.cooldown || cooldown % hero.maxCooldown === 0),
      distinctUntilChanged(),
      map(() => MonsterSlayerActions.getActions())
    )
  );

  getSlayerActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.getActions),
      withLatestFrom(this.store.select(MonsterSlayerSelectors.selectHero)),
      map(([_, hero]) =>
        MonsterSlayerActions.setActions({ actions: this.monsterSlayerService.getActionsFromSlayer(hero) })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<MonsterSlayerReducer.State>,
    private monsterSlayerService: MonsterSlayerService
  ) {}
}
