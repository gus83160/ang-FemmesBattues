import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewPdfComponent} from './view-pdf.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {DxLoadPanelModule, DxPopupModule} from 'devextreme-angular';

@NgModule({
  declarations: [ViewPdfComponent],
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    DxPopupModule,
    DxLoadPanelModule,
  ],
  exports: [
    ViewPdfComponent,
  ]
})
export class ViewPdfModule { }
