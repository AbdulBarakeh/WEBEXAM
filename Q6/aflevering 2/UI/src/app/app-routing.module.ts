import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { ViewWorkoutComponent } from './view-workout/view-workout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './signout/logout.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'createworkout', component: CreateWorkoutComponent },
  { path: 'allworkouts', component: ViewWorkoutComponent },
  { path: 'myworkouts', component: ViewWorkoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
