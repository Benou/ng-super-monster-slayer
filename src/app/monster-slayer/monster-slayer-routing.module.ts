import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonsterSlayerComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: MonsterSlayerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonsterSlayerRoutingModule {}
