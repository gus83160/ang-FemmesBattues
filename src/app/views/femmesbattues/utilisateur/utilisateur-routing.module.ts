import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoutesEnum} from '../RoutesEnum';
import {AuthGuardService} from '../../../shared/services/auth/auth-guard.service';
import {UtilisateurListComponent} from './utilisateur-list/utilisateur-list.component';
import { UtilisateurListComponent_V0 } from './list/utilisateur-list.component_V0';
import {UtilisateurEditComponent} from './edit/utilisateur-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesEnum.UTILISATEUR_LIST,
    pathMatch: 'full'
  },
  {
    path: RoutesEnum.UTILISATEUR_LIST,
    component: UtilisateurListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path:   RoutesEnum.UTILISATEUR_LIST_V0,
    component: UtilisateurListComponent_V0,
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
