import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, filter, map, withLatestFrom } from 'rxjs/operators';

import { opponentTypes, Hero, SlayerType, SlayerActionType } from '../models';
import { MonsterSlayerService } from '../services/monster-slayer.service';
import * as MonsterSlayerActions from './actions';
import * as MonsterSlayerReducer from './reducer';
import * as MonsterSlayerSelectors from './selectors';

@Injectable()
export class MonsterSlayerEffects {

  battleStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((action: any) => action.payload.event.url === '/monster-slayer'),
      withLatestFrom(this.store.pipe(select(MonsterSlayerSelectors.selectHero))),
      map(([_, hero]) =>
        MonsterSlayerActions.setActions({ actions: this.monsterSlayerService.getActionsFromSlayer(hero) })
      )
    )
  );

  attacks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonsterSlayerActions.attack, MonsterSlayerActions.specialAttack),
      map(action =>
        action.type === MonsterSlayerActions.attack.type ? action : { ...action, slayerType: SlayerType.HERO }
      ),
      withLatestFrom(this.store.pipe(select(MonsterSlayerSelectors.selectSlayers))),
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
      withLatestFrom(this.store.pipe(select(MonsterSlayerSelectors.selectHero))),
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

  actionDone$ = createEffect(() =>
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
      withLatestFrom(this.store.pipe(select(MonsterSlayerSelectors.selectSlayers))),
      concatMap(([_, { hero, monster }]) => [
        MonsterSlayerActions.setCooldown({ cooldown: this.monsterSlayerService.getCooldownAfterRound(hero as Hero) }),
        MonsterSlayerActions.setStatus({ status: this.monsterSlayerService.getStatusFromSlayers(hero, monster) })
      ])
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<MonsterSlayerReducer.State>,
    private monsterSlayerService: MonsterSlayerService
  ) {}
}
