import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';


import { Variables } from '../global/variables';
import { Utilisateur } from '../../../database/utilisateur';
import { UtilisateurService } from '../../../database/utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  constructor(private route: Router,
              private http: HttpClient,
              private utilisateurService: UtilisateurService,
              public variables: Variables) {

               }

  UtilisateurForm: FormGroup;
  utilisateur: Utilisateur;
  idtype:number;

  async ngOnInit() {

      await this.InitUser();
      this.idtype = this.utilisateur.idtypeutilisateur;
      this.UtilisateurForm = new FormGroup({
      ut_nom : new FormControl(this.utilisateur.ut_nom, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      ut_prenom : new FormControl(this.utilisateur.ut_prenom, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      ut_adresse : new FormControl(this.utilisateur.ut_adresse, [
        Validators.maxLength(150)
      ]),
      ut_codepostal : new FormControl(this.utilisateur.ut_codepostal, [
        Validators.maxLength(5)
      ]),
      ut_ville : new FormControl(this.utilisateur.ut_ville, [
        Validators.maxLength(50)
      ]),
      ut_telephone : new FormControl(this.utilisateur.ut_telephone, [
        Validators.maxLength(15)
      ]),
      ut_email : new FormControl(this.utilisateur.ut_email, [
        Validators.maxLength(50)
      ]),
      ut_siren : new FormControl(this.utilisateur.ut_siren, [
        Validators.maxLength(14)
      ]),
      ut_rib : new FormControl(this.utilisateur.ut_rib, [
        Validators.maxLength(50)
      ]),
      ut_login : new FormControl(this.utilisateur.ut_login, [
        Validators.required,
        Validators.maxLength(15)
      ]),
      ut_departement : new FormControl(this.utilisateur.ut_departement, [
        Validators.required,
        Validators.maxLength(2)
      ]),
      ut_adsville : new FormControl(this.utilisateur.ut_adsville, [
        Validators.maxLength(50)
      ]),
      ut_adsnumero : new FormControl(this.utilisateur.ut_adsnumero, [
        Validators.maxLength(10)
      ]),
      ut_souchefacture : new FormControl(this.utilisateur.ut_souchefacture, [
        Validators.maxLength(10)
      ]),
      ut_sequencefacture : new FormControl(this.utilisateur.ut_sequencefacture),
      ut_codechauffeur : new FormControl(this.utilisateur.ut_codechauffeur, [
        Validators.maxLength(10)
      ])
      });
  }


  async InitUser() {
      if (this.variables.IdUser > 0 )
          this.utilisateur = await this.utilisateurService.UtilisateurByID(this.variables.IdUser);
      else {
          this.utilisateur = new Utilisateur();
          this.utilisateur.idtypeutilisateur = this.variables.TypeChauffeur;
          }


}
  async CreationModification(){
     const data = this.UtilisateurForm.value;
     if (data.ut_nom == "")
       this.utilisateur.ut_nom = " ";
     else
       this.utilisateur.ut_nom = data.ut_nom;

     if (data.ut_prenom == "")
       this.utilisateur.ut_prenom = " ";
     else
       this.utilisateur.ut_prenom = data.ut_prenom;

     if (data.ut_adresse == "")
       this.utilisateur.ut_adresse = " ";
     else
       this.utilisateur.ut_adresse = data.ut_adresse;

     if (data.ut_codepostal == "")
       this.utilisateur.ut_codepostal = " ";
     else
       this.utilisateur.ut_codepostal = data.ut_codepostal;

     if (data.ut_ville == "")
       this.utilisateur.ut_ville = " ";
     else
       this.utilisateur.ut_ville = data.ut_ville;

     if (data.ut_telephone == "")
       this.utilisateur.ut_telephone = " ";
     else
       this.utilisateur.ut_telephone = data.ut_telephone;

     if (data.ut_email == "")
       this.utilisateur.ut_email = " ";
     else
       this.utilisateur.ut_email = data.ut_email;

     if (data.ut_siren == "")
       this.utilisateur.ut_siren = " ";
     else
       this.utilisateur.ut_siren = data.ut_siren;

     if (data.ut_rib == "")
       this.utilisateur.ut_rib = " ";
     else
       this.utilisateur.ut_rib = data.ut_rib;

     if (data.ut_login == "")
       this.utilisateur.ut_login = " ";
     else
       this.utilisateur.ut_login = data.ut_login;

     if (data.ut_departement == "")
       this.utilisateur.ut_departement = "62";
     else
       this.utilisateur.ut_departement = data.ut_departement;

     if (data.ut_adsville == "")
       this.utilisateur.ut_adsville = " ";
     else
       this.utilisateur.ut_adsville = data.ut_adsville;

     if (data.ut_adsnumero == "")
       this.utilisateur.ut_adsnumero = " ";
     else
       this.utilisateur.ut_adsnumero = data.ut_adsnumero;

     if (data.ut_souchefacture == "")
       this.utilisateur.ut_souchefacture = " ";
     else
       this.utilisateur.ut_souchefacture = data.ut_souchefacture;

     if (data.ut_sequencefacture == "" || data.ut_sequencefacture == null) {
       this.utilisateur.ut_sequencefacture = 0;
       }
     else {
       this.utilisateur.ut_sequencefacture = data.ut_sequencefacture;
       }
     if (data.ut_codechauffeur == "")
       this.utilisateur.ut_codechauffeur = " ";
     else
       this.utilisateur.ut_codechauffeur = data.ut_codechauffeur;


     this.utilisateur.idtypeutilisateur = this.idtype;

     if (this.variables.IdUser > 0 )
        await this.utilisateurService.UpdateUtilisateur(this.utilisateur);
     else {
        this.utilisateur.id = 0;
        this.utilisateur.ut_mdp = this.variables.MDPInitial;
        this.utilisateur.idtypeutilisateur = 2;
        await this.utilisateurService.InsertUtilisateur(this.utilisateur);

      }


     this.route.navigate(['utilisateurliste']);

  }

}
