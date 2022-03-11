import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DemandeListComponent} from './list/demande-list.component';
import {DemandeListFilterComponent} from './list/filter/demande-list-filter.component';
import {DemandeRoutingModule} from './demande-routing.module';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {DemandeEditComponent} from './edit/demande-edit.component';
import {DemandeNewComponent} from './new/demandenew.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {SharedModule} from '../../../shared/shared.module';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDropDownButtonModule,
  DxFormModule,
  DxLoadPanelModule,
  DxPopupModule,
  DxToolbarModule
} from 'devextreme-angular';
import {ViewPdfModule} from '../view-pdf/view-pdf.module';

@NgModule({
  imports: [
    CommonModule,
    DemandeRoutingModule,
    SharedModule,
    ViewPdfModule,

    DxDataGridModule,
    DxPopupModule,
    DxLoadPanelModule,
    DxButtonModule,
    DxFormModule,
    DxDropDownButtonModule,
    DxToolbarModule,

//    NgxExtendedPdfViewerModule,

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
  ],
  declarations: [
    DemandeListComponent,
    DemandeListFilterComponent,
    DemandeEditComponent,
    DemandeNewComponent,
  ],
  providers: [
  ]
})
export class DemandeModule { }
