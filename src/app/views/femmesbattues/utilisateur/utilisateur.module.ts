import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {SharedModule} from '../../../shared/shared.module';
import {UtilisateurListComponent} from './list/utilisateur-list.component';
import {UtilisateurEditComponent} from './edit/utilisateur-edit.component';
import {UtilisateurRoutingModule} from './utilisateur-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatDividerModule} from '@angular/material/divider';
import {LibelleTypeUtilisateurPipe} from '../libelle-type-utilisateur.pipe';

@NgModule({
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
    SharedModule,

    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    MatRadioModule,
    MatDividerModule,
  ],
  declarations: [
    UtilisateurListComponent,
    UtilisateurEditComponent,

    LibelleTypeUtilisateurPipe,
  ],
  providers: [
  ]
})
export class UtilisateurModule { }
