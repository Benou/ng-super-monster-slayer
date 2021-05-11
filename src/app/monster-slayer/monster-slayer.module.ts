import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MonsterSlayerRoutingModule } from './monster-slayer-routing.module';
import { MonsterSlayerComponent } from './containers';
import { BattleLogsComponent, SlayerComponent, SlayerActionsComponent, SlayerArenaComponent } from './components';
import { MonsterSlayerEffects } from './shared/store/effects';
import * as MonsterSlayerReducer from './shared/store/reducer';

@NgModule({
  declarations: [
    MonsterSlayerComponent,
    BattleLogsComponent,
    SlayerComponent,
    SlayerActionsComponent,
    SlayerArenaComponent
  ],
  imports: [
    CommonModule,
    MonsterSlayerRoutingModule,
    StoreModule.forFeature('monsterSlayer', MonsterSlayerReducer.reducer),
    EffectsModule.forFeature([MonsterSlayerEffects])
  ]
})
export class MonsterSlayerModule {}
