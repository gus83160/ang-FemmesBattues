import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DemandeListComponent} from './list/demande-list.component';
import {RoutesEnum} from '../RoutesEnum';
import {AuthGuardService} from '../../../shared/services/auth/auth-guard.service';
// import {DemandeNewComponent} from './new/demandenew.component';
import {DemandeEditComponent} from './edit/demande-edit.component';

const routes: Routes = [
  {
    path: RoutesEnum.DEMANDE_LIST,
    component: DemandeListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: RoutesEnum.DEMANDE_NEW,
    //component: DemandeNewComponent,
    component: DemandeEditComponent,
    data: {creation: true},
    canActivate: [ AuthGuardService ]
  },
  {
    path: RoutesEnum.DEMANDE_EDIT,
    component: DemandeEditComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandeRoutingModule {}
