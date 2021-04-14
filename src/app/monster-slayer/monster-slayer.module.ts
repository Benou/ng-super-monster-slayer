import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonsterSlayerRoutingModule } from './monster-slayer-routing.module';
import { MonsterSlayerComponent } from './containers';

@NgModule({
  declarations: [MonsterSlayerComponent],
  imports: [
    CommonModule,
    MonsterSlayerRoutingModule
  ]
})
export class MonsterSlayerModule {}
