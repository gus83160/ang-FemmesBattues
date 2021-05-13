import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from "@angular/forms";
import { MatTimepickerModule } from 'mat-timepicker';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { LoginMDPComponent } from './login/login-mdp.component';
import { DemandeComponent } from './demande/demande.component';
import { DemandeNewComponent } from './demande/demandenew.component';
import { DemandeListComponent } from './demande/demande-list.component';
import { MenuComponent } from './menu/menu.component';
import { CourseComponent } from './course/course.component';
import { CourseFicheComponent } from './course/course-fiche.component';
import { PriseenchargeComponent } from './priseencharge/priseencharge.component';
import { FactureComponent } from './facture/facture.component';
import { PdfVisuComponent } from './pdf-visu/pdf-visu.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { UtilisateurListComponent } from './utilisateur/utilisateur-list.component';
//import { Variables } from './global/variables'

import { DialogueService } from './dialogue/dialogue.service';
import { DefaultroutingComponent } from "../../defaultrouting/defaultrouting.component";
import { LibelleTypeUtilisateurPipe } from './libelle-type-utilisateur.pipe';
import { BasicAuthInterceptor } from './Authentification/basic-auth.interceptor';
import { ErrorInterceptor } from './Authentification/error.interceptor';

//import { FacturePipe } from './facture.pipe';

//import { TypeUtilisateurComponent } from '../../typeutilisateur/typeutilisateur.component';


const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'loginMDP',
		component: LoginMDPComponent
	},
	{
		path: 'course',
		component: CourseComponent
	},
	{
		path: 'coursefiche',
		component: CourseFicheComponent
	},
  {
  		path: 'demandeliste',
  		component: DemandeListComponent
  },
  {
  		path: 'demandenew',
  		component: DemandeNewComponent
  },
  {
   		path: 'demande',
  		component: DemandeComponent
  },
  {
  		path: 'utilisateurliste',
   		component: UtilisateurListComponent
  },
  {
   		path: 'utilisateur',
   		component: UtilisateurComponent
  },
  {
  		path: 'admin',
  		component: DefaultroutingComponent
  },
  {
  		path: 'menu',
  		component: MenuComponent
  },
  {
  		path: 'priseencharge',
  		component: PriseenchargeComponent
  },
  {
  		path: 'facture',
  		component: FactureComponent
  },
  {
  		path: 'pdfvisu',
  		component: PdfVisuComponent
  }

];


@NgModule({
	imports: [
//    BrowserModule,
//    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
//   ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatNativeDateModule,
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
	  RouterModule.forChild(routes)
 	],
 	providers: [
 	   { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
 	   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
 	   DialogueService],
// 	   Variables],
	 declarations: [
	       LoginComponent,
	       LoginMDPComponent,
	       DemandeComponent,
	       DemandeListComponent,
	       CourseComponent,
	       CourseFicheComponent,
	       PriseenchargeComponent,
	       FactureComponent,
         UtilisateurComponent,
         UtilisateurListComponent,
         PdfVisuComponent,
         LibelleTypeUtilisateurPipe
         //FacturePipe
   ],
   exports: [RouterModule]
})
export class FemmesBattuesRoutingModule { }
