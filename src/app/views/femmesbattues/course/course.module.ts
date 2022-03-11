import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../../../shared/shared.module';
import {ViewPdfModule} from '../view-pdf/view-pdf.module';
import {CourseRoutingModule} from './course-routing.module';
import {CourseInformationComponent} from './infos/course-information.component';
import {CourseSaisieComponent} from './saisie/course-saisie.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxFormModule,
  DxLoadPanelModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxToolbarModule
} from 'devextreme-angular';
import {DemandeRechercheComponent} from './search/demande-recherche.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    ViewPdfModule,

    FormsModule,
    ReactiveFormsModule,

    DxFormModule,
    DxDateBoxModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxPopupModule,
    DxLoadPanelModule,
    DxToolbarModule,

    // FlexLayoutModule,
    // MatFormFieldModule,
    // MatCardModule,
    // MatInputModule,
    // MatDatepickerModule,
    // MatOptionModule,
    // MatSelectModule,
    // MatToolbarModule,
    // MatRadioModule,
    // MatDividerModule,
  ],
  declarations: [
    CourseInformationComponent,
    // CourseRecupChauffeurComponent,
    CourseSaisieComponent,
    //CourseRechercheComponent,
    DemandeRechercheComponent,
  ],
  providers: [
  ]
})
export class CourseModule { }
