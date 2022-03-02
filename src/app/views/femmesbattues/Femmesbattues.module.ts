import {NgModule, OnInit} from '@angular/core';
import {FemmesBattuesRoutingModule} from './FemmesBattues-routing.module';
import {GlobalVariables} from './global/global_variables';
import {Router, RouterModule} from '@angular/router';
import {ErrorComponent} from './Authentification/error/error.component';
import {MatDialogModule} from '@angular/material/dialog';
import {DevExtremeModule} from 'devextreme-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {LoginComponent} from './login/login.component';
import {LoginMDPComponent} from './login/login-mdp.component';
import {LogoutComponent} from './logout/logout.component';
import {DemandeComponent} from './demande/edit/demande.component';
import {DemandeListComponent} from './demande/list/demande-list.component';
import {CourseComponent} from './course/course.component';
import {CourseFicheComponent} from './course/course-fiche.component';
import {PriseenchargeComponent} from './priseencharge/priseencharge.component';
import {FactureComponent} from './facture/facture.component';
import {UtilisateurComponent} from './utilisateur/utilisateur.component';
import {UtilisateurListComponent} from './utilisateur/utilisateur-list.component';
import {LibelleTypeUtilisateurPipe} from './libelle-type-utilisateur.pipe';
import {ShowErrorsComponent} from '../../show-errors.component';
import {MenuComponent} from './menu/menu.component';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CommonModule,
    FemmesBattuesRoutingModule,
    MatDialogModule,
    DevExtremeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatMomentDateModule,
    // MatTimepickerModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    FlexLayoutModule,
//    QuillModule,
    NgxDatatableModule,
    ReactiveFormsModule,
//    PdfViewerModule,
//    NgxExtendedPdfViewerModule,
//    NgxFileSaverService,
    MatToolbarModule,
    DevExtremeModule
  ],
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
    LibelleTypeUtilisateurPipe,
    ShowErrorsComponent,
    MenuComponent,
    ErrorComponent
  ],
  exports: [],
  providers: [],

})
export class FemmesBattuesModule /*implements OnInit*/ {

  constructor(
    private variables: GlobalVariables,
    private router: Router) {
  }

  // ngOnInit(): void {
  //   this.variables.currentUser = null;
  //   this.router.navigate([RoutesEnum.ROOT]);
  // }
}
