import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

import { Variables } from '../global/variables';
import { Retour } from '../../../database/retour';
import { PriseEnChargeService } from '../../../database/priseencharge.service';
import { DialogueService } from '../dialogue/dialogue.service';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.scss']
})
export class DemandeListComponent implements OnInit {

  rows = [];
  columns = [];
  ret: Retour;
  retFacture: Retour;
  ret2: Retour = new Retour();
  AfficheFacture: boolean;
  nbRetour: number = 0;

  constructor(public dialogueService: DialogueService,
              private route: Router,
              private priseenchargeservice: PriseEnChargeService,
              private variables: Variables) { }

  ngOnInit(): void {
   this.columns = this.getDataConf();
   this.loadAllPriseEnCharge();
  }

  getDataConf() {
    return [
      {
        prop: 'fact',
        name: 'montant'
      },
      {
        prop: 'dateDemandeVisu',
        name: 'Date'
      },
      {
        prop: 'noDemande',
        name: 'Demande'
      },
      {
        prop: 'nomVictime',
        name: 'Victime'
      },
      {
        prop: 'adresseDepart',
        name: 'Départ'
      },
      {
        prop: 'adresseArrivee',
        name: 'Arrivée'
      },
      {
        prop: 'nomPrescripteur',
        name: 'Prescripteur'
      },
      {
        prop: 'nomChauffeur',
        name: 'Chauffeur'
      },
      {
        prop: 'montant',
        name: 'Momtant'
      }

    ];
  }

  loadAllPriseEnCharge() {
    var res = this.priseenchargeservice.getAllPriseEnCharge(this.variables.IdTypeUtilisateur,this.variables.IdUtilisateur);
    res.subscribe(ret => { this.rows = ret;
                           this.ret2.montant = ret[this.nbRetour].montant;
                           console.log(this.ret2.montant + " nb ret " + this.nbRetour);
                           this.nbRetour++;
                           if (this.ret2.montant > 0 )
                              this.AfficheFacture = true;
                           else
                              this.AfficheFacture = false;
                         });
  }

  PdfVisu() {
   this.route.navigate(['pdfvisu']);
  }
  async detail(id:number,url:string) {
    this.ret = await this.priseenchargeservice.PriseEnChargeId(id);
    if (this.ret != null) {
        if(this.ret.montant > 0 ) {
          if ((this.ret.noFacture == "" || this.ret.noFacture == null ) && url == 'facture') {
             this.retFacture = await this.priseenchargeservice.GetNoFacture(id);
             this.ret.noFacture = this.retFacture.noFacture;
          }
          this.variables.IdPriseEnCharge = this.ret.idPriseEnCharge;
          this.variables.IdPrescripteur = this.ret.idPrescripteur;
          this.variables.IdDemande = this.ret.idDemande;
          this.variables.IdVictime = this.ret.idVictime;
          this.variables.IdChauffeur = this.ret.idChauffeur;
          this.variables.IdCourse = this.ret.idCourse;
          this.variables.NoDemande = this.ret.noDemande;
          this.variables.NoFacture = this.ret.noFacture;
          this.variables.DateDemande = this.ret.dateDemande;
          this.variables.DateDemandeVisu = this.ret.dateDemandeVisu;
          this.variables.NomPrescripteur = this.ret.nomPrescripteur;
          this.variables.DepDemande = this.ret.depDemande;
          this.variables.NomChauffeur = this.ret.nomChauffeur;
          this.variables.NomVictime = this.ret.nomVictime;
          this.variables.NomUsage = this.ret.nomUsage;
          this.variables.Prenom = this.ret.prenom;
          this.variables.Adresse = this.ret.adresse;
          this.variables.Telephone = this.ret.telephone;
          this.variables.Mail = this.ret.mail;
          this.variables.Age = this.ret.age;
          this.variables.EnfantCharge = this.ret.enfantCharge;
          this.variables.InfoComplementaire = this.ret.infoComplementaire;
          this.variables.Motif = this.ret.motif;
          this.variables.EnfantPresent = this.ret.enfantPresent;
          this.variables.NbEnfant = this.ret.nbEnfant;
          this.variables.Particularite = this.ret.particularite;
          this.variables.AdresseDepart = this.ret.adresseDepart;
          this.variables.AdresseArrivee = this.ret.adresseArrivee;
          this.variables.AllerRetour = this.ret.allerRetour;
          this.variables.DateCourse = this.ret.dateCourse;
          this.variables.HeureCourseDebut = this.ret.heureCourseDebut;
          this.variables.HeureCourseFin = this.ret.heureCourseFin;
          this.variables.DateCourseVisu = this.ret.dateCourseVisu;
          this.variables.HeureCourseDebutVisu = this.ret.heureCourseDebutVisu;
          this.variables.HeureCourseFinVisu = this.ret.heureCourseFinVisu;
          this.variables.Montant = this.ret.montant;
          this.variables.Peage = this.ret.peage;
          this.route.navigate([url]);
          }
        else
          this.dialogueService.confirm({message: "Le montant de le course n'a pas été transmis"});

        }
    else
        console.log ("Detail ERREUR " );

  }

}
