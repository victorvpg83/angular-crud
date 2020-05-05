import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroComponent } from './pages/hero/hero.component';

const routes: Routes = [
  { path: 'users', component: HeroesComponent },
  { path: 'user/:id', component: HeroComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'users' }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
