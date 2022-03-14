// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpResponse } from '@angular/common/http';
//
// import { GlobalVariables } from '../global/global_variables';
// import { UtilService } from '../global/util.service';
//
// @Component({
//   selector: 'app-priseencharge',
//   templateUrl: './priseencharge.component.html',
//   styleUrls: ['./priseencharge.component.scss']
// })
//
//
//
//
// export class PriseenchargeComponent implements OnInit {
//
//   constructor(private http: HttpClient,
//               public variables: GlobalVariables) { }
//
//   util: UtilService;
//
//   ngOnInit(): void {
//       this.util = new UtilService(this.http);
//
//   }
//   async DocumentPDF()
//   {
//     var data = document.getElementById('DemandePDF');
//     this.util.GenererPDF(data.outerHTML,null,this.variables.NoDemande,null,null);
//   }
// }
