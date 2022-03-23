import {Component, EventEmitter, Output} from '@angular/core';
import {UtilService} from '../global/util.service';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent {
  @Output() Hidden = new EventEmitter();

  isPdfVisible = false;
  showLoading = false;
  pdfFile: Blob;
  pdfFileName: string = '';

  constructor(private utilService: UtilService) {
    this.pdfFile = new Blob();
  }

  showPdfFromFile(fichier: string) {
    this.showLoading = true;

    this.pdfFileName = fichier;
    this.utilService.downloadFile(fichier).subscribe(
      (res: Blob) => {
        this.isPdfVisible = true;
        this.showLoading = false;
        this.pdfFile = res;
      },
      (err: { show: () => void; }) => {
        this.hidePdf();
        err.show();
      }
    );
  }

  showPdfFromBlob(data: Blob) {
    this.showLoading = true;

    this.isPdfVisible = true;
    this.showLoading = false;
    this.pdfFile = data;
  }

  private hidePdf() {
    this.isPdfVisible = false;
    this.showLoading = false;
  }

  onPopupHidden() {
    this.Hidden.emit(null);
  }
}
