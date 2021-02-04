import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authChanged: Subject<boolean>;
  public isUserSignIn(): boolean {
    return (this.getToken() !== null && this.getToken() !== undefined);
  }
  public getToken():string {
    return sessionStorage.getItem('token')
  }
  public setToken(token:string):void {
      sessionStorage.setItem('token',token)
      this.authChanged.next(true)
  }
  public clearToken():void{
    sessionStorage.clear();
    this.authChanged.next(false)
  }
  constructor() {
    this.authChanged = new Subject();
  }
}
