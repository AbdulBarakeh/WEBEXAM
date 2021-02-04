import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service'
import { HttpClient } from '@angular/common/http'
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
      <br />
      <br />
      <input type="text" placeholder="username" [formControl]="userCtrl"/><br /><br />
      <div *ngIf="userCtrl.invalid && (userCtrl.dirty || userCtrl.touched)" class="alert alert-danger">
        <div *ngIf="userCtrl.errors.required">
          UserName is required.
        </div>
        <div *ngIf="userCtrl.errors.minlength">
        UserName must be at least 4 characters long.
        </div>
        <div *ngIf="userCtrl.errors.email">
        Email not valid.
        </div>
        <div *ngIf="userCtrl.errors.minlength">
        UserName must be at least 4 characters long.
        </div>
      </div>
      <input type="password" placeholder="password" [formControl]="passwordCtrl"/><br /><br />
      <div *ngIf="passwordCtrl.invalid && (passwordCtrl.dirty || passwordCtrl.touched)" class="alert alert-danger">
        <div *ngIf="passwordCtrl.errors.required">
          UserName is required.
        </div>
        <div *ngIf="passwordCtrl.errors.minlength">
        UserName must be at least 4 characters long.
        </div>
      </div>
      <button (click)="signIn()" [disabled]="userCtrl.invalid" > sign in </button>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  userCtrl: FormControl;
  passwordCtrl: FormControl;
  constructor(private authService:AuthService, private http: HttpClient, private router:Router) {
    if(authService.isUserSignIn()){
      this.router.navigate(['viewworkout']);
    }
    this.userCtrl = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.email
    ])
    this.passwordCtrl = new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])
  }
  public signIn(){
    if(this.userCtrl.valid && this.passwordCtrl.valid){
      let req = this.http.post('http://localhost:4000/auth/login',{ email: this.userCtrl.value, password:this.passwordCtrl.value });
      req.subscribe((resp:any) => {
        this.authService.setToken(resp.token)
        this.router.navigate(['viewworkout']);
      },
      (error) => {
        alert("Wrong email or password.")
      })
    }
  }
  ngOnInit(): void {
  }

}
