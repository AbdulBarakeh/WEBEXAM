import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { ViewWorkoutComponent } from './view-workout/view-workout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FlexLayoutModule} from "@angular/flex-layout"
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    CreateWorkoutComponent,
    ViewWorkoutComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],

  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
