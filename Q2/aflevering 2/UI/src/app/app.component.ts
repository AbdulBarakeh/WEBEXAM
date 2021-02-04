import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-dark bg-primary">
        <a class="navbar-brand" *ngIf="!isSignedIn" href="/login">Login</a>
        <a class="navbar-brand" *ngIf="isSignedIn" href="/createworkout">Create Workout</a>
        <a class="navbar-brand" href="/allworkouts">All Workouts</a>
        <a class="navbar-brand" *ngIf="isSignedIn" href="/myworkouts">My Workouts</a>
        <a class="navbar-brand" *ngIf="!isSignedIn" href="/register">Register</a>
        <a class="navbar-brand" *ngIf="isSignedIn" href="/logout">Logout</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'aflevering2';
  isSignedIn:boolean;
  constructor(private authService:AuthService){
    authService.authChanged.subscribe(value => {
      this.isSignedIn = authService.isUserSignIn()
    });
    this.isSignedIn = authService.isUserSignIn();
  }
}
