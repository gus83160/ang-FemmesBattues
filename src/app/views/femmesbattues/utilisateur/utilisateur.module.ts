import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

// DevExtreme Modules
import { DxDataGridModule, DxButtonModule, DxTemplateModule, DxFormModule, DxSelectBoxModule } from 'devextreme-angular';

// Application Components
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import { UtilisateurListComponent_V0 } from './list/utilisateur-list.component_V0';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../../../shared/shared.module';
import { LibelleTypeUtilisateurPipe } from '../libelle-type-utilisateur.pipe';
import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { UtilisateurEditComponent } from './edit/utilisateur-edit.component';
import { SharedPipesModule } from '../../../shared/pipes/shared-pipes.module';

@NgModule({
  declarations: [
    UtilisateurListComponent,
    UtilisateurListComponent_V0,
    ResetPasswordComponent,
    UtilisateurEditComponent,
    LibelleTypeUtilisateurPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilisateurRoutingModule,
    SharedModule,
    FlexLayoutModule,
    
    // Material Modules
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatDividerModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatGridListModule,

    // DevExtreme Modules
    DxDataGridModule,
    DxButtonModule,
    DxTemplateModule,
    DxFormModule,
    DxSelectBoxModule,
    SharedPipesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class UtilisateurModule { }
