import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoutesEnum} from '../RoutesEnum';
import {AuthGuardService} from '../../../shared/services/auth/auth-guard.service';
import {UtilisateurListComponent} from './list/utilisateur-list.component';
import {UtilisateurEditComponent} from './edit/utilisateur-edit.component';

const routes: Routes = [
  {
    path: RoutesEnum.UTILISATEUR_LIST,
    component: UtilisateurListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: RoutesEnum.UTILISATEUR_EDIT,
    component: UtilisateurEditComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilisateurRoutingModule {}
