import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'monster-slayer',
    loadChildren: () => import('./monster-slayer/monster-slayer.module').then(m => m.MonsterSlayerModule)
  },
  {
    path: '**',
    redirectTo: 'monster-slayer'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
