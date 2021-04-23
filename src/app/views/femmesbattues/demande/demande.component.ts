import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { Variables } from '../global/variables';
import { Victime } from '../../../database/victime';
import { VictimeService } from '../../../database/victime.service';
import { Demande } from '../../../database/demande';
import { DemandeService } from '../../../database/demande.service';
import { PriseEnCharge } from '../../../database/priseencharge';
import { PriseEnChargeService } from '../../../database/priseencharge.service';
import { DialogueService } from '../dialogue/dialogue.service';

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
              private variables: Variables) { }

  DemandeForm: FormGroup;
  victime: Victime;
  victimeret: Victime;

  demande: Demande;
  priseencharge: PriseEnCharge;

  ngOnInit(): void {
    this.DemandeForm = new FormGroup({
    vi_nom : new FormControl('', [
          Validators.required,
          Validators.maxLength(50)
    ]),
    vi_nomusage : new FormControl('', [
          Validators.maxLength(50)
    ]),
    vi_prenom : new FormControl('', [
          Validators.maxLength(50)
    ]),
    vi_adresse : new FormControl('', [
          Validators.maxLength(150)
    ]),
    vi_telephone : new FormControl('', [
          Validators.maxLength(15)
    ]),
    vi_email : new FormControl('', [
          Validators.maxLength(50)
    ]),
    vi_age : new FormControl(''),
    vi_enfantcharge : new FormControl(''),
    vi_infocomplementaire : new FormControl('', [
          Validators.maxLength(200)
    ]),
    de_motif : new FormControl('', [
          Validators.maxLength(100)
    ]),
    de_enfantpresent : new FormControl('N'),
    de_nbenfant : new FormControl('0'),
    de_particularite : new FormControl('', [
          Validators.maxLength(100)
     ]),
    de_adressedepart : new FormControl('', [
          Validators.maxLength(150)
    ]),
    de_adressearrivee : new FormControl('', [
         Validators.maxLength(150)
    ]),
    de_allerretour : new FormControl('N')
    })
    this.victime = new Victime();
    this.demande = new Demande();
    this.priseencharge = new PriseEnCharge();
  }

  async CreationDemande() {
      const data = this.DemandeForm.value;
      console.log("Creation demande");
      console.log(this.router);
      if (data.vi_nom == "")
        this.victime.vi_nom = " ";
      else
        this.victime.vi_nom = data.vi_nom;

      if (data.vi_nomusage =="")
        this.victime.vi_nomusage = " ";
      else
        this.victime.vi_nomusage = data.vi_nomusage;

      if (data.vi_prenom == "")
        this.victime.vi_prenom = " ";
       else
        this.victime.vi_prenom = data.vi_prenom;

      if (data.vi_adresse == "")
        this.victime.vi_adresse = " ";
      else
        this.victime.vi_adresse = data.vi_adresse;

      if (data.vi_telephone =="")
        this.victime.vi_telephone = " ";
      else
        this.victime.vi_telephone = data.vi_telephone;

      if (data.vi_email == "")
        this.victime.vi_email = " ";
      else
        this.victime.vi_email = data.vi_email;

      if (data.vi_age == "")
        this.victime.vi_age = 0;
      else
        this.victime.vi_age = data.vi_age;

      if (data.vi_enfantcharge =="")
        this.victime.vi_enfantcharge = 0;
      else
        this.victime.vi_enfantcharge = data.vi_enfantcharge;

      if (data.vi_infocomplementaire == "")
        this.victime.vi_infocomplementaire = " ";
      else
        this.victime.vi_infocomplementaire = data.vi_infocomplementaire;

      this.victimeret = await this.victimeService.createVictime(this.victime);
      this.variables.IdVictime = this.victimeret.id;

      if (data.de_motif == "")
        this.demande.de_motif = " ";
      else
        this.demande.de_motif = data.de_motif;

      if (data.de_enfantpresent == "O")
        this.demande.de_enfantpresent = true;
      else
        this.demande.de_enfantpresent = false;

      if (data.de_nbenfant == "" )
        this.demande.de_nbenfant = 0;
      else
        this.demande.de_nbenfant = data.de_nbenfant;

      if (data.de_particularite == "")
        this.demande.de_particularite = " ";
      else
        this.demande.de_particularite = data.de_particularite;

      if (data.de_adressedepart == "")
        this.demande.de_adressedepart = " ";
      else
        this.demande.de_adressedepart = data.de_adressedepart;

      if (data.de_adressearrivee == "")
        this.demande.de_adressearrivee = " ";
      else
        this.demande.de_adressearrivee = data.de_adressearrivee;

      if (data.de_allerretour == "O")
        this.demande.de_allerretour = true;
      else
        this.demande.de_allerretour = false;

      this.demande = await this.demandeService.createDemande(this.demande);
      this.variables.IdDemande = this.demande.id;

      this.priseencharge.pe_nodemande = ""
      this.priseencharge.pe_date = new Date();
      this.priseencharge.idprescripteur = this.variables.IdUtilisateur;
      this.priseencharge.idvictime = this.variables.IdVictime;
      this.priseencharge.iddemande = this.variables.IdDemande;
      this.priseencharge.idcourse = 0;

      this.priseencharge = await this.priseenchargeService.createPriseEnCharge(this.priseencharge);
      this.dialogueService.confirm({message: 'No de la demande : ' + this.priseencharge.pe_nodemande});
      this.router.navigate(['menu']);
  }

}
