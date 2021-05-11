import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BattleLog, Slayer, SlayerAction, SlayerActionType, SlayerType } from '../../shared';
import * as MonsterSlayerActions from '../../shared/store/actions';
import * as MonsterSlayerReducer from '../../shared/store/reducer';
import * as MonsterSlayerSelectors from '../../shared/store/selectors';

@Component({
  selector: 'app-monster-slayer',
  templateUrl: './monster-slayer.component.html',
  styleUrls: ['./monster-slayer.component.scss']
})
export class MonsterSlayerComponent implements OnInit {
  slayers$: Observable<Slayer[]>;
  slayerActions$: Observable<SlayerAction[]>;
  battleLogs$: Observable<BattleLog[]>;

  constructor(private store: Store<MonsterSlayerReducer.State>) {
    this.slayers$ = this.store.select(MonsterSlayerSelectors.selectSlayers).pipe(
      map(({ hero, monster }) => [hero, monster])
    );
    this.slayerActions$ = this.store.select(MonsterSlayerSelectors.selectSlayerActions);
    this.battleLogs$ = this.store.select(MonsterSlayerSelectors.selectBattleLogs);
  }

  ngOnInit(): void {
    this.store.dispatch(MonsterSlayerActions.getSlayerActions());
  }

  dispatchSlayerAction(type: SlayerActionType): void {
    this.store.dispatch(MonsterSlayerActions[type]({ slayerType: SlayerType.HERO }));
  }
}
