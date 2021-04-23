import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pdf-visu',
  templateUrl: './pdf-visu.component.html',
  styleUrls: ['./pdf-visu.component.scss']
})
export class PdfVisuComponent implements OnInit {
  FichierPDF = "http://localhost:4200/tmp6E5F.pdf";
  //FichierPDF =  "D:\\FranceTaxi\\FemmesBattues\\FemmesBattues\\tmp6E5F.pdf";
  //FichierPDF =  "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  ngOnInit(): void {
     console.log(this.FichierPDF);
  }

}
