import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";
import { formatDate} from '@angular/common';

import { Variables } from '../global/variables';
import { Victime } from '../../../database/victime';
import { VictimeService } from '../../../database/victime.service';
import { Demande } from '../../../database/demande';
import { DemandeService } from '../../../database/demande.service';
import { PriseEnCharge } from '../../../database/priseencharge';
import { PriseEnChargeService } from '../../../database/priseencharge.service';
import { DialogueService } from '../dialogue/dialogue.service';
import { Retour } from '../../../database/retour';
import { MotifService } from '../../../database/motif.service';
import { Motif } from '../../../database/motif';
import { StructureRequeranteService } from '../../../database/structurerequerante.service';
import { StructureRequerante } from '../../../database/structurerequerante';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent  {

  constructor(public dialogueService: DialogueService,
              private router: Router,
              private victimeService: VictimeService,
              private demandeService: DemandeService,
              private priseenchargeService: PriseEnChargeService,
              private motifService: MotifService,
              private structureRequeranteService: StructureRequeranteService,
              private variables: Variables) { }

  DemandeForm: FormGroup;
  victime: Victime;
  victimeret: Victime;
  allMotifs: Motif[];
  allStructureRequerantes: StructureRequerante[];

  dt: string;
  demande: Demande;
  priseencharge: PriseEnCharge;
  retour : Retour;
  enfantPresent: string;
  allerRetour: string;

  async ngOnInit() {
      await this.InitDemande();
      if (this.retour.enfantPresent)
         this.enfantPresent = 'O';
      else
         this.enfantPresent = 'N';

      if (this.retour.allerRetour)
         this.allerRetour = 'O';
      else
         this.allerRetour = 'N';


      this.DemandeForm = new FormGroup({
      pe_datedemande : new FormControl(this.retour.dateDemande),
      idstructurerequerante : new FormControl(this.retour.idStructureRequerante, [
            Validators.required
      ]),
      pe_nomdemandeur : new FormControl(this.retour.nomDemandeur, [
            Validators.required,
            Validators.maxLength(100)
      ]),
      pe_telephone : new FormControl(this.retour.telephoneDemandeur, [
            Validators.maxLength(15)
      ]),
      pe_mail : new FormControl(this.retour.mailDemandeur, [
            Validators.maxLength(50)
      ]),
      vi_nom : new FormControl(this.retour.nomVictime, [
            Validators.required,
            Validators.maxLength(50)
      ]),
      vi_nomusage : new FormControl(this.retour.nomUsage, [
            Validators.maxLength(50)
      ]),
      vi_prenom : new FormControl(this.retour.prenom, [
            Validators.maxLength(50)
      ]),
      vi_adresse : new FormControl(this.retour.adresse, [
            Validators.maxLength(150)
      ]),
      vi_telephone : new FormControl(this.retour.telephone, [
            Validators.maxLength(15)
      ]),
      vi_email : new FormControl(this.retour.mail, [
            Validators.maxLength(50)
      ]),
      vi_age : new FormControl(this.retour.age),
      vi_enfantcharge : new FormControl(this.retour.enfantCharge),
      vi_infocomplementaire : new FormControl(this.retour.infoComplementaire, [
            Validators.maxLength(200)
      ]),
      de_datealler : new FormControl(this.retour.dateAller),
      de_heurealler : new FormControl(this.retour.heureAller),
      idmotif : new FormControl(this.retour.idMotif, [
            Validators.required
      ]),
      de_enfantpresent : new FormControl(this.enfantPresent),
      de_nbenfant : new FormControl(this.retour.nbEnfant
      ),
      de_ageenfant : new FormControl(this.retour.ageEnfant),
      de_particularite : new FormControl(this.retour.particularite, [
            Validators.maxLength(100)
       ]),
      de_adressedepart : new FormControl(this.retour.adresseDepart, [
            Validators.required,
            Validators.maxLength(150)
      ]),
      de_adressearrivee : new FormControl(this.retour.adresseArrivee, [
            Validators.required,
            Validators.maxLength(150)
      ]),
      de_allerretour : new FormControl(this.allerRetour),
      de_dateretour : new FormControl(this.retour.dateRetour),
      de_heureretour : new FormControl(this.retour.heureRetour),
      encadredate : new FormControl("")
      },
      { validators: this.ControleEnfant('de_enfantpresent','de_nbenfant','de_ageenfant','de_allerretour','de_dateretour','de_heureretour')}
      );
      this.victime = new Victime();
      this.demande = new Demande();
      this.priseencharge = new PriseEnCharge();
  }

  ControleEnfant (enfant:string, nb:string, age:string, ar:string, dretour:string, hretour:string): ValidatorFn {
       return (group: FormGroup): {[key:string]: boolean} | null  => {
       let enfantPresent = group.controls[enfant];
       let nbEnfant = group.controls[nb];
       let ageEnfant = group.controls[age];
       let allerRetour = group.controls[ar];
       let dateRetour = group.controls[dretour];
       let heureRetour = group.controls[hretour];
       if (enfantPresent.value == 'O' &&( nbEnfant == undefined || nbEnfant.value == 0 || nbEnfant.value == "" || nbEnfant.value == null)) {
           return {'nbenfant':true};
           }
       if (enfantPresent.value == 'O' &&( ageEnfant == undefined || ageEnfant.value == 0 || ageEnfant.value == "" || ageEnfant.value == null )) {
           return {'ageenfant':true};
           }
       if (allerRetour.value == 'O' &&( dateRetour == undefined || dateRetour.value == '' || dateRetour.value == null)) {
           return {'dateRetour':true};
           }
       if (allerRetour.value == 'O' &&( heureRetour == undefined || heureRetour.value == '' || heureRetour.value == null)) {
           return {'heureRetour':true};
           }
       return null;
       }
  }

  async InitDemande() {
      if (this.variables.IdPriseEnCharge > 0 ) {
          this.retour = await this.priseenchargeService.PriseEnChargeDonneesModif(this.variables.IdPriseEnCharge);
          this.dt = formatDate(this.retour.dateRetour,'yyyy-MM-dd','Fr');
          if (this.dt == '2001-01-01') {
             this.retour.dateRetour = null;
             this.retour.heureRetour = "";
          }
      }
      else {
          this.retour = new Retour();
          this.retour.dateDemande = new Date();
          this.retour.dateAller = new Date();
          this.retour.heureAller = formatDate(Date(),'HH:mm','fr');
//          this.retour.dateRetour = new Date();
//          this.retour.heureRetour = formatDate(Date(),'HH:mm','fr');;
          }
      this.loadAllMotif();
      this.loadAllStructureRequerante();
  }

  loadAllMotif() {
    var res = this.motifService.getAllMotif();
    res.subscribe(tm => { this.allMotifs = tm; });
  }
  loadAllStructureRequerante() {
    var res = this.structureRequeranteService.getAllStructureRequerante(this.variables.TypeStructureRequerante);
    res.subscribe(ts => { this.allStructureRequerantes = ts; });
  }

  async CreationDemande() {
      const data = this.DemandeForm.value;
      if (data.vi_nom == "")
        this.victime.vi_nom = " ";
      else
        this.victime.vi_nom = data.vi_nom;

      if (data.vi_nomusage =="" || data.vi_nomusage == null)
        this.victime.vi_nomusage = " ";
      else
        this.victime.vi_nomusage = data.vi_nomusage;

      if (data.vi_prenom == "" || data.vi_prenom == null)
        this.victime.vi_prenom = " ";
       else
        this.victime.vi_prenom = data.vi_prenom;

      if (data.vi_adresse == "" || data.vi_adresse == null)
        this.victime.vi_adresse = " ";
      else
        this.victime.vi_adresse = data.vi_adresse;

      if (data.vi_telephone =="" || data.vi_telephone == null)
        this.victime.vi_telephone = " ";
      else
        this.victime.vi_telephone = data.vi_telephone;

      if (data.vi_email == "" || data.vi_email == null)
        this.victime.vi_email = " ";
      else
        this.victime.vi_email = data.vi_email;

      if (data.vi_age == "" || data.vi_age == null)
        this.victime.vi_age = 0;
      else
        this.victime.vi_age = data.vi_age;

      if (data.vi_enfantcharge =="" || data.vi_enfantcharge == null)
        this.victime.vi_enfantcharge = 0;
      else
        this.victime.vi_enfantcharge = data.vi_enfantcharge;

      if (data.vi_infocomplementaire == "" || data.vi_infocomplementaire == null)
        this.victime.vi_infocomplementaire = " ";
      else
        this.victime.vi_infocomplementaire = data.vi_infocomplementaire;
      if (this.variables.IdPriseEnCharge > 0) {
         this.victime.id = this.variables.IdVictime;
         this.victimeret = await this.victimeService.updateVictime(this.victime);
         }
      else {
         this.victimeret = await this.victimeService.createVictime(this.victime);
         this.variables.IdVictime = this.victimeret.id;
         }

      this.dt=formatDate(data.de_datealler,'yyyy-MM-ddT','Fr') + data.de_heurealler + ":00";
      this.demande.de_datealler = new Date(this.dt);

      this.demande.idmotif = data.idmotif;

      if (data.de_enfantpresent == "O" )
        this.demande.de_enfantpresent = true;
      else
        this.demande.de_enfantpresent = false;

      if (data.de_nbenfant == ""  || data.de_nbenfant == null)
        this.demande.de_nbenfant = 0;
      else
        this.demande.de_nbenfant = data.de_nbenfant;

      if (data.de_ageenfant == ""  || data.de_ageenfant == null)
        this.demande.de_ageenfant = " ";
      else
        this.demande.de_ageenfant = data.de_ageenfant;
      if (data.de_particularite == "" || data.de_particularite == null)
        this.demande.de_particularite = " ";
      else
        this.demande.de_particularite = data.de_particularite;

      if (data.de_adressedepart == "" || data.de_adressedepart == null)
        this.demande.de_adressedepart = " ";
      else
        this.demande.de_adressedepart = data.de_adressedepart;

      if (data.de_adressearrivee == "" || data.de_adressearrivee == null)
        this.demande.de_adressearrivee = " ";
      else
        this.demande.de_adressearrivee = data.de_adressearrivee;

      if (data.de_allerretour == "O") {
         this.demande.de_allerretour = true;
         this.dt=formatDate(data.de_dateretour,'yyyy-MM-ddT','Fr') + data.de_heureretour + ":00";
         this.demande.de_dateretour = new Date(this.dt);
         }
      else {
        this.demande.de_allerretour = false;
        this.dt = '2001-01-01T00:00:00'
        this.demande.de_dateretour = new Date(this.dt);
       }

      if (this.variables.IdPriseEnCharge > 0) {
          this.demande.id = this.variables.IdDemande;
          this.demande = await this.demandeService.updateDemande(this.demande);
         }
      else {
         this.demande = await this.demandeService.createDemande(this.demande);
         this.variables.IdDemande = this.demande.id;
         }


      this.priseencharge.pe_date = data.pe_datedemande;
      this.priseencharge.idstructurerequerante = data.idstructurerequerante
      if (data.pe_nomdemandeur == "" || data.pe_nomdemandeur == null)
        this.priseencharge.pe_nomdemandeur = " ";
      else
        this.priseencharge.pe_nomdemandeur = data.pe_nomdemandeur;
      if (data.pe_telephone == "" || data.pe_telephone == null)
        this.priseencharge.pe_telephone = " ";
      else
        this.priseencharge.pe_telephone = data.pe_telephone;
      if (data.pe_mail == "" || data.pe_mail == null)
        this.priseencharge.pe_mail = " ";
      else
        this.priseencharge.pe_mail = data.pe_mail;

      this.priseencharge.pe_nofacture = ""
      this.priseencharge.idprescripteur = this.variables.IdUtilisateur;
      this.priseencharge.idvictime = this.variables.IdVictime;
      this.priseencharge.iddemande = this.variables.IdDemande;
      this.priseencharge.idcourse = 0;
      if (this.variables.IdPriseEnCharge > 0) {
         this.priseencharge.id = this.variables.IdPriseEnCharge;
         this.priseencharge.pe_nodemande = this.variables.NoDemande,
         this.priseencharge = await this.priseenchargeService.updatePriseEnCharge(this.priseencharge);
         this.variables.IdPriseEnCharge = 0;
         this.router.navigate(['demandeliste']);
         }
      else {
         this.priseencharge.pe_nodemande = ""
         this.priseencharge = await this.priseenchargeService.createPriseEnCharge(this.priseencharge);
         this.dialogueService.confirm({message: 'No de la demande : ' + this.priseencharge.pe_nodemande});
         this.router.navigate(['menu']);
         }
  }

}
