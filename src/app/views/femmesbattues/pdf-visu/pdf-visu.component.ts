import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pdf-visu',
  templateUrl: './pdf-visu.component.html',
  styleUrls: ['./pdf-visu.component.scss']
})
export class PdfVisuComponent implements OnInit {
  //FichierPDF = "http://localhost:4200/tmp6E5F.pdf";
  //FichierPDF =  "D:/FranceTaxi/FemmesBattues/FemmesBattues/FVV1935000001.pdf";
  FichierPDF =  "https://fvvback.france-taxi.com/FVV1935000001.pdf";
  ngOnInit(): void {
     console.log(this.FichierPDF);
     window.open(this.FichierPDF);
  }

}
