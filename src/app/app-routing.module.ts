import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './page/game/game.component';
import { GameoverComponent } from './page/gameover/gameover.component';

const routes: Routes = [
  {
    path: '', component: GameComponent
  },
  { 
    path: 'gameover', component: GameoverComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
