import { NgModule, OnInit } from '@angular/core';

//import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FemmesBattuesRoutingModule } from './FemmesBattues-routing.module';
//import { PdfVisuComponent } from './pdf-visu/pdf-visu.component';
//import { AppComponent } from './app.component';

// import { TypeUtilisateurComponent } from './typeutilisateur/typeutilisateur.component';
// import { TypeUtilisateurService } from './typeutilisateur.service';

@NgModule({
  imports: [
//    CommonModule,
//    BrowserModule,
//    BrowserAnimationsModule,
  		FemmesBattuesRoutingModule
  ],
  declarations: [
//    AppComponent,
//    TypeUtilisateurComponent,
  ],
  exports: [],
  providers: [],

})
export class FemmesBattuesModule implements OnInit {
 	ngOnInit(): void {
     }
 }
