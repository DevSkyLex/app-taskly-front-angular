import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { AuthRegisterComponent } from './pages/auth-register/auth-register.component';
import { AuthLoginFormComponent } from './forms/auth-login-form/auth-login-form.component';
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRegisterFormComponent } from './forms/auth-register-form/auth-register-form.component';
import { TranslocoModule } from '@jsverse/transloco';

@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthRegisterComponent,
    AuthLoginFormComponent,
    AuthRegisterFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    TranslocoModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
