import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserValidators implements AsyncValidator {
  constructor(private http: HttpClient) { }
  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    return this.findUser(control.value).pipe(
    map(res => {
      return res ? null : {existingEmail: true};
    }));
  }
  findUser(userMail) {
    return timer(500)
      .pipe(
        switchMap(() => {
          return this.http.get<any>(` http://localhost:4000/auth/exsists?email=${userMail}`)}));
  }
}
