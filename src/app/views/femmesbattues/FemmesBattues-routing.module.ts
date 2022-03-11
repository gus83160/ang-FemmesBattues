// import {LOCALE_ID, NgModule} from '@angular/core';
// import {Routes, RouterModule} from '@angular/router';
// import {HTTP_INTERCEPTORS} from '@angular/common/http';
//
// // import {LoginComponent} from './auth/login/login.component';
// // import {LoginMDPComponent} from './auth/login/login-mdp.component';
// // import {DemandeEditComponent} from './demande/edit/demande-edit.component';
// // import {DemandeNewComponent} from './demande/new/demandenew.component';
// // import {DemandeListComponent} from './demande/list/demande-list.component';
// import {HomeComponent} from './menu/home.component';
// import {CourseRechercheComponent} from './course/search-old/course-recherche.component';
// import {CourseRecupChauffeurComponent} from './course/recup-course-chauffeur/course-recup-chauffeur.component';
// import {CourseInformationComponent} from './course/infos/course-information.component';
// import {CourseSaisieComponent} from './course/saisie/course-saisie.component';
// import {PriseenchargeComponent} from './priseencharge/priseencharge.component';
// import {FactureComponent} from './facture/facture.component';
// import {UtilisateurEditComponent} from './utilisateur/edit/utilisateur-edit.component';
// import {UtilisateurListComponent} from './utilisateur/list/utilisateur-list.component';
// import {DialogueService} from './dialogue/dialogue.service';
// import {DefaultroutingComponent} from '../../defaultrouting/defaultrouting.component';
// import {BasicAuthInterceptor} from '../../interceptors/basic-auth.interceptor';
// import {ErrorInterceptor} from '../../interceptors/error.interceptor';
// import {LogoutComponent} from './auth/logout/logout.component';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
// import {RoutesEnum} from './RoutesEnum';
// import {AuthGuardService} from '../../shared/services/auth/auth-guard.service';
// import {DemandeModule} from './demande/demande.module';
//
// const routes: Routes = [
// //  {path: RoutesEnum.LOGIN, component: LoginComponent},
// //  {path: RoutesEnum.LOGOUT, component: LogoutComponent, canActivate: [AuthGuard]},
// //  {path: RoutesEnum.LOGINMDP, component: LoginMDPComponent, canActivate: [AuthGuardService]},
// //  {path: RoutesEnum.COURSE_INFORMATION, component: CourseInformationComponent, canActivate: [AuthGuardService]},
//   //{path: RoutesEnum.COURSE_RECH, component: RechCourseComponent, canActivate: [AuthGuardService]},
// //  {path: RoutesEnum.COURSE_RECUP, component: CourseRecupChauffeurComponent, canActivate: [AuthGuardService]},
// //  {path: RoutesEnum.COURSE_SAISIE, component: CourseSaisieComponent, canActivate: [AuthGuardService]},
//   // {path: RoutesEnum.DEMANDE_LISTE, component: DemandeListComponent, canActivate: [AuthGuard]},
// //  {path: RoutesEnum.DEMANDE_NEW, component: DemandeNewComponent, canActivate: [AuthGuardService]},
// //  {path: RoutesEnum.DEMANDE, component: DemandeEditComponent, canActivate: [AuthGuardService]},
//   {path: RoutesEnum.UTILISATEUR_LIST, component: UtilisateurListComponent, canActivate: [AuthGuardService]},
//   {path: RoutesEnum.UTILISATEUR, component: UtilisateurEditComponent, canActivate: [AuthGuardService]},
//   {path: RoutesEnum.ADMIN, component: DefaultroutingComponent, canActivate: [AuthGuardService]},
// //  {path: RoutesEnum.MENU, component: MenuComponent, canActivate: [AuthGuard]},
// //  {path: RoutesEnum.PRISE_EN_CHARGE, component: PriseenchargeComponent, canActivate: [AuthGuardService]},
//   {path: RoutesEnum.FACTURE, component: FactureComponent, canActivate: [AuthGuardService]},
// //  {path: RoutesEnum.PDF_VISU, component: PdfVisuComponent, canActivate: [AuthGuard]},
//   {path: RoutesEnum.ROOT, component: HomeComponent},
//   {path: '**', redirectTo: RoutesEnum.ROOT},
// ];
//
//
// @NgModule({
//   imports: [
//     RouterModule.forChild(routes),
//   ],
//   providers: [
//     {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
//     {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
//     DialogueService,
//     {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
//     // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
//     // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
//     {provide: LOCALE_ID, useValue: 'fr'}
//   ],
// // 	   Variables],
//   declarations: [
//     // FacturePipe
//   ],
//   exports: [RouterModule]
// })
// export class FemmesBattuesRoutingModule {
//   constructor() {
//   }
// }
