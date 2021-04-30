import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SlayerAction, SlayerActionType, SlayerType } from '../../shared';
import * as MonsterSlayerActions from '../../shared/store/actions';
import * as MonsterSlayerReducer from '../../shared/store/reducer';
import * as MonsterSlayerSelectors from '../../shared/store/selectors';

@Component({
  selector: 'app-monster-slayer',
  templateUrl: './monster-slayer.component.html',
  styleUrls: ['./monster-slayer.component.scss']
})
export class MonsterSlayerComponent implements OnInit {
  actions$: Observable<SlayerAction[]>;

  constructor(private store: Store<MonsterSlayerReducer.State>) {
    this.actions$ = this.store.select(MonsterSlayerSelectors.selectActions);
  }

  ngOnInit(): void {
    this.store.dispatch(MonsterSlayerActions.getActions());
  }

  dispatchAction(type: SlayerActionType): void {
    this.store.dispatch(MonsterSlayerActions[type]({ slayerType: SlayerType.HERO }));
  }
}
