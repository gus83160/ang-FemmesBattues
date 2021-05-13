import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';


import { Variables } from '../global/variables';
import { UtilService } from '../global/util.service';
import { Utilisateur } from '../../../database/utilisateur';
import { UtilisateurService} from '../../../database/utilisateur.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {

  util: UtilService;
  Chauffeur : Utilisateur;
  Payeur : Utilisateur;
  MontantHT: number;
  MontantTVA: number;
  PeageHT: number;
  PeageTVA: number;
  TotalHT: number;
  TotalTTC: number;
  MontantHTAff: string;
  MontantTVAAff: string;
  MontantAff: string;
  PeageHTAff: string;
  PeageTVAAff: string;
  PeageAff: string;
  TotalHTAff: string;
  TotalTTCAff: string;
  DateDuJour: string;
  AffPeage: boolean = false;

  resp : HttpResponse<any>;

  constructor(private http: HttpClient,
              private utilisateurservice: UtilisateurService,
              public variables: Variables) { }

  ngOnInit(): void {
    this.util = new UtilService(this.http);
    this.DateDuJour = formatDate(new Date(),'dd/MM/yyyy','fr');

    this.AdresseChauffeurPayeur();
  }

  async  AdresseChauffeurPayeur() {
     this.Chauffeur = await this.utilisateurservice.UtilisateurByID(this.variables.IdChauffeur);
     this.Payeur = await this.utilisateurservice.Payeur(this.variables.DepDemande);
     this.MontantHT     = this.variables.Montant / 1.10;
     this.MontantHTAff  = this.MontantHT.toFixed(2);
     this.MontantTVA    = this.variables.Montant - this.MontantHT;
     this.MontantTVAAff = this.MontantTVA.toFixed(2);
     this.MontantAff    = this.variables.Montant.toFixed(2);
     this.PeageHT       = this.variables.Peage / 1.20;
     this.PeageHTAff    = this.PeageHT.toFixed(2);
     this.PeageTVA      = this.variables.Peage - this.PeageHT;
     this.PeageTVAAff   = this.PeageTVA.toFixed(2);
     this.PeageAff      = this.variables.Peage.toFixed(2);
     this.TotalHT       = this.MontantHT + this.PeageHT;
     this.TotalHTAff    = this.TotalHT.toFixed(2);
     this.TotalTTC      = this.variables.Montant + this.variables.Peage;
     this.TotalTTCAff   = this.TotalTTC.toFixed(2);

     if (this.variables.Peage > 0 )
       this.AffPeage = true;
  }

  async DocumentPDF()
  {
    var data = document.getElementById('DocumentPDF');
    this.util.GenererPDF(data.outerHTML,this.variables.NoFacture,this.variables.NoDemande,this.Payeur.ut_email,this.Chauffeur.ut_email);

  }

}
