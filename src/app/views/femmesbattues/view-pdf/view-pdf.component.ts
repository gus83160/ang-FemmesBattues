import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { environment } from '../../../../environments/environment';
import {UtilService} from '../global/util.service';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent implements OnInit {
  @Output() onHidden = new EventEmitter();

  isPopupVisible = false;
  showLoading = false;
  pdfFile: Blob;
  pdfFileName: string;

  constructor(private utilService: UtilService) {
  }

  ngOnInit(): void {
  }

  showPdfFromFile(fichier: string) {
    this.showLoading = true;

    this.pdfFileName = fichier
    this.utilService.downloadFile(fichier).subscribe(
      (res) => {
        this.isPopupVisible = true;
        this.showLoading = false;
        this.pdfFile = res;
      },
      (err) => {
        this.hidePdf();
        err.show();
      }
    );
  }

  showPdfFromByteArray(data: any) {
    this.showLoading = true;

    this.isPopupVisible = true;
    this.showLoading = false;
    this.pdfFile = data;
  }

  private hidePdf() {
    this.isPopupVisible = false;
    this.showLoading = false;
  }

  onPupupHidden() {
    this.onHidden.emit(null);
  }
}
