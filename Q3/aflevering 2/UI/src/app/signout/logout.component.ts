import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service'
import { HttpClient } from '@angular/common/http'
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `
  `,
  styles: [
  ]
})
export class LogoutComponent implements OnInit {
  userCtrl: FormControl;
  passwordCtrl: FormControl;
  constructor(private authService:AuthService, private router:Router) {
    if(authService.isUserSignIn()){
      this.authService.clearToken();
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['login']);
    }
  }
  ngOnInit(): void {
  }
}
