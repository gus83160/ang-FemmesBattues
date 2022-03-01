import {LOCALE_ID, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatNativeDateModule} from '@angular/material/core';
// import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {FlexLayoutModule} from '@angular/flex-layout';
import {QuillModule} from 'ngx-quill';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTimepickerModule} from 'mat-timepicker';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';

import {LoginComponent} from './login/login.component';
import {LoginMDPComponent} from './login/login-mdp.component';
import {DemandeComponent} from './demande/demande.component';
import {DemandeNewComponent} from './demande/demandenew.component';
import {DemandeListComponent} from './demande/demande-list.component';
import {MenuComponent} from './menu/menu.component';
import {CourseComponent} from './course/course.component';
import {RecupCourseComponent} from './course/recup-course.component';
import {InformationComponent} from './course/information.component';
import {CourseFicheComponent} from './course/course-fiche.component';
import {PriseenchargeComponent} from './priseencharge/priseencharge.component';
import {FactureComponent} from './facture/facture.component';
import {PdfVisuComponent} from './pdf-visu/pdf-visu.component';
import {UtilisateurComponent} from './utilisateur/utilisateur.component';
import {UtilisateurListComponent} from './utilisateur/utilisateur-list.component';
// import { Variables } from './global/variables'

import {DialogueService} from './dialogue/dialogue.service';
import {DefaultroutingComponent} from '../../defaultrouting/defaultrouting.component';
import {LibelleTypeUtilisateurPipe} from './libelle-type-utilisateur.pipe';
import {BasicAuthInterceptor} from './Authentification/basic-auth.interceptor';
import {ErrorInterceptor} from './Authentification/error.interceptor';
import {LogoutComponent} from './logout/logout.component';
import {ShowErrorsComponent} from '../../show-errors.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RoutesEnum} from './RoutesEnum';
import {AuthGuard} from '../../shared/services/auth/auth.guard';
import {DevExtremeModule} from 'devextreme-angular';

// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FacturePipe } from './facture.pipe';
// import { TypeUtilisateurComponent } from '../../typeutilisateur/typeutilisateur.component';


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
  {path: RoutesEnum.PDF_VISU, component: PdfVisuComponent, canActivate: [AuthGuard]},
  {path: RoutesEnum.ROOT, component: MenuComponent},
  {path: '**', redirectTo: RoutesEnum.ROOT},
];


@NgModule({
  imports: [
//    BrowserModule,
//    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatTimepickerModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    FlexLayoutModule,
    QuillModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
//    NgxFileSaverService,
    RouterModule.forChild(routes),
    MatToolbarModule,
    DevExtremeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    DialogueService,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: LOCALE_ID, useValue: 'fr'}
  ],
// 	   Variables],
  declarations: [
    LoginComponent,
    LoginMDPComponent,
    LogoutComponent,
    DemandeComponent,
    DemandeListComponent,
    CourseComponent,
    CourseFicheComponent,
    PriseenchargeComponent,
    FactureComponent,
    UtilisateurComponent,
    UtilisateurListComponent,
    PdfVisuComponent,
    LibelleTypeUtilisateurPipe,
    ShowErrorsComponent,
    MenuComponent,
    // FacturePipe
  ],
  exports: [RouterModule]
})
export class FemmesBattuesRoutingModule {

  constructor() {
  }
}
