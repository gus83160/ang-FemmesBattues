import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AuthRoutingModule} from './auth.routing.module';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {LoginMDPComponent} from './login/login-mdp.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    LoginMDPComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
  ]
})
export class AuthModule { }
