import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserValidators } from '../services/auth/validator.service';

@Component({
  selector: 'app-register',
  template: `
  <br />
  <br />
  <input type="text" placeholder="full name" [formControl]="nameCtrl"/><br /><br />
  <div *ngIf="nameCtrl.invalid && (nameCtrl.dirty || nameCtrl.touched)" class="alert alert-danger">
    <div *ngIf="nameCtrl.errors.required">
      UserName is required.
    </div>
    <div *ngIf="nameCtrl.errors.minlength">
    UserName must be at least 4 characters long.
    </div>
  </div>

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
    <div *ngIf="userCtrl.errors.existingEmail">
        Email not available
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
  <button (click)="signUp()" [disabled]="userCtrl.invalid"> sign up </button>
  `,
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  nameCtrl: FormControl;
  userCtrl: FormControl;
  passwordCtrl: FormControl;
  constructor(private authService: AuthService, private http: HttpClient, private router:Router, private userValidators: UserValidators) {
    if(authService.isUserSignIn()){
      this.router.navigate(['viewworkout']);
    }
    this.nameCtrl =  new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])
    this.userCtrl = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.email
    ],[
      userValidators.validate.bind(userValidators)
    ])
    this.passwordCtrl = new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])
  }
  public signUp(){
    if(this.userCtrl.valid && this.passwordCtrl.valid && this.nameCtrl.valid){
      this.http.post('http://localhost:4000/auth/register',{name: this.nameCtrl.value, email: this.userCtrl.value, password:this.passwordCtrl.value }).subscribe((resp:any) => {
        this.http.post('http://localhost:4000/auth/login',{ email: this.userCtrl.value, password:this.passwordCtrl.value }).subscribe((resp:any) => {
          this.authService.setToken(resp.token)
          this.router.navigate(['viewworkout']);
        })
    })
    }
  }
  ngOnInit(): void {
  }


}
