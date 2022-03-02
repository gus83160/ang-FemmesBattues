import {LOCALE_ID, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {LoginComponent} from './login/login.component';
import {LoginMDPComponent} from './login/login-mdp.component';
import {DemandeComponent} from './demande/edit/demande.component';
import {DemandeNewComponent} from './demande/new/demandenew.component';
import {DemandeListComponent} from './demande/list/demande-list.component';
import {MenuComponent} from './menu/menu.component';
import {CourseComponent} from './course/course.component';
import {RecupCourseComponent} from './course/recup-course.component';
import {InformationComponent} from './course/information.component';
import {CourseFicheComponent} from './course/course-fiche.component';
import {PriseenchargeComponent} from './priseencharge/priseencharge.component';
import {FactureComponent} from './facture/facture.component';
import {UtilisateurComponent} from './utilisateur/utilisateur.component';
import {UtilisateurListComponent} from './utilisateur/utilisateur-list.component';
import {DialogueService} from './dialogue/dialogue.service';
import {DefaultroutingComponent} from '../../defaultrouting/defaultrouting.component';
import {BasicAuthInterceptor} from '../../interceptors/basic-auth.interceptor';
import {ErrorInterceptor} from '../../interceptors/error.interceptor';
import {LogoutComponent} from './logout/logout.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {RoutesEnum} from './RoutesEnum';
import {AuthGuard} from '../../shared/services/auth/auth.guard';

const routes: Routes = [
  {path: RoutesEnum.LOGIN, component: LoginComponent},
  {path: RoutesEnum.LOGOUT, component: LogoutComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.LOGINMDP, component: LoginMDPComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.INFORMATION, component: InformationComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.COURSE, component: CourseComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.RECUP_COURSE, component: RecupCourseComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.COURSE_FICHE, component: CourseFicheComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.DEMANDE_LISTE, component: DemandeListComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.DEMANDE_NEW, component: DemandeNewComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.DEMANDE, component: DemandeComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.UTILISATEUR_LISTE, component: UtilisateurListComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.UTILISATEUR, component: UtilisateurComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.ADMIN, component: DefaultroutingComponent, canActivate: [AuthGuard]},
//  {path: RoutesEnum.MENU, component: MenuComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.PRISE_EN_CHARGE, component: PriseenchargeComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.FACTURE, component: FactureComponent, canActivate: [AuthGuard]},
//  {path: RoutesEnum.PDF_VISU, component: PdfVisuComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.ROOT, component: MenuComponent},
  {path: '**', redirectTo: RoutesEnum.ROOT},
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    DialogueService,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: LOCALE_ID, useValue: 'fr'}
  ],
// 	   Variables],
  declarations: [
    // FacturePipe
  ],
  exports: [RouterModule]
})
export class FemmesBattuesRoutingModule {

  constructor() {
  }
}
