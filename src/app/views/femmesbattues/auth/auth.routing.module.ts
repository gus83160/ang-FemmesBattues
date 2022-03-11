import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {LogoutComponent} from './logout/logout.component';
import {RoutesEnum} from '../RoutesEnum';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../../../shared/services/auth/auth-guard.service';
import {LoginMDPComponent} from './login/login-mdp.component';

const routes: Routes = [
  {
    path: RoutesEnum.LOGIN,
    component: LoginComponent,
  },
  {
    path: RoutesEnum.LOGOUT,
    component: LogoutComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: RoutesEnum.LOGINMDP,
    component: LoginMDPComponent,
    canActivate: [ AuthGuardService ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [AuthGuardService],
  exports: [
    RouterModule,
  ],
  declarations: [
  ]
})

export class AuthRoutingModule { }
