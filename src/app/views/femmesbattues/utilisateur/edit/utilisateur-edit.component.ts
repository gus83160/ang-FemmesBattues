import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {GlobalVariables} from '../../global/global_variables';
import {IUtilisateur} from '../../../../models/IUtilisateur';
import {UtilisateurService} from '../../../../services/utilisateur.service';
import {RoutesEnum} from '../../RoutesEnum';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur-edit.component.html',
  styleUrls: ['./utilisateur-edit.component.scss']
})
export class UtilisateurEditComponent implements OnInit {

  constructor(private route: Router,
              private http: HttpClient,
              private utilisateurService: UtilisateurService,
              public variables: GlobalVariables) {
  }

  UtilisateurForm!: FormGroup;
  utilisateur!: IUtilisateur;
  idtype!: number;

  // Mapping des IDs vers les labels
  fieldLabels: { [key: string]: string } = {
    ut_nom: 'Nom',
    ut_prenom: 'Prénom',
    ut_adresse: 'Adresse',
    ut_codepostal: 'Code Postal',
    ut_ville: 'Ville',
    ut_telephone: 'Téléphone',
    ut_email: 'Email',
    ut_siren: 'SIREN',
    ut_rib: 'RIB',
    ut_login: 'Login',
    ut_departement: 'Département',
    ut_adsville: 'ADS Ville',
    ut_adsnumero: 'ADS Numéro',
    ut_souchefacture: 'Souche Facture',
    ut_sequencefacture: 'Séquence Facture',
    ut_codechauffeur: 'Code Chauffeur'
  };

  async ngOnInit() {
    await this.InitUser();
    this.idtype = this.utilisateur.idtypeutilisateur;
    this.UtilisateurForm = new FormGroup({
      ut_nom: new FormControl(this.utilisateur.ut_nom, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      ut_prenom: new FormControl(this.utilisateur.ut_prenom, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      ut_adresse: new FormControl(this.utilisateur.ut_adresse, [
        Validators.maxLength(150)
      ]),
      ut_codepostal: new FormControl(this.utilisateur.ut_codepostal, [
        Validators.maxLength(5)
      ]),
      ut_ville: new FormControl(this.utilisateur.ut_ville, [
        Validators.maxLength(50)
      ]),
      ut_telephone: new FormControl(this.utilisateur.ut_telephone, [
        Validators.maxLength(15)
      ]),
      ut_email: new FormControl(this.utilisateur.ut_email, [
        Validators.maxLength(50)
      ]),
      ut_siren: new FormControl(this.utilisateur.ut_siren, [
        Validators.maxLength(14)
      ]),
      ut_rib: new FormControl(this.utilisateur.ut_rib, [
        Validators.maxLength(50)
      ]),
      ut_login: new FormControl(this.utilisateur.ut_login, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      ut_departement: new FormControl(this.utilisateur.ut_departement, [
        Validators.required,
        Validators.maxLength(2)
      ]),
      ut_adsville: new FormControl(this.utilisateur.ut_adsville, [
        Validators.maxLength(50)
      ]),
      ut_adsnumero: new FormControl(this.utilisateur.ut_adsnumero, [
        Validators.maxLength(10)
      ]),
      ut_souchefacture: new FormControl(this.utilisateur.ut_souchefacture, [
        Validators.maxLength(10)
      ]),
      ut_sequencefacture: new FormControl(this.utilisateur.ut_sequencefacture),
      ut_codechauffeur: new FormControl(this.utilisateur.ut_codechauffeur, [
        Validators.maxLength(10)
      ])
    });
  }

  async InitUser(): Promise<void> {
    if (this.variables.IdUser > 0) {
      this.utilisateur = await this.utilisateurService.UtilisateurByID(this.variables.IdUser);
    } else {
      this.utilisateur = <IUtilisateur>{};
      this.utilisateur.idtypeutilisateur = this.variables.TypeChauffeur;
    }
  }

  getFormValidationErrors() {
    const errors: string[] = [];
    Object.keys(this.UtilisateurForm.controls).forEach(key => {
      const controlErrors = this.UtilisateurForm.get(key)?.errors;
      if (controlErrors != null) {
        const fieldLabel = this.fieldLabels[key] || key;
        Object.keys(controlErrors).forEach(keyError => {
          switch (keyError) {
            case 'required':
              errors.push(`Le champ ${fieldLabel} est obligatoire`);
              break;
            case 'maxlength':
              errors.push(`Le champ ${fieldLabel} ne doit pas dépasser ${controlErrors[keyError].requiredLength} caractères`);
              break;
            default:
              errors.push(`${fieldLabel}: ${keyError}`);
          }
        });
      }
    });
    return errors;
  }

  async CreationModification() {
    const data = this.UtilisateurForm.value;
    if (data.ut_nom == '') {
      this.utilisateur.ut_nom = ' ';
    } else {
      this.utilisateur.ut_nom = data.ut_nom;
    }

    if (data.ut_prenom == '') {
      this.utilisateur.ut_prenom = ' ';
    } else {
      this.utilisateur.ut_prenom = data.ut_prenom;
    }

    if (data.ut_adresse == '') {
      this.utilisateur.ut_adresse = ' ';
    } else {
      this.utilisateur.ut_adresse = data.ut_adresse;
    }

    if (data.ut_codepostal == '') {
      this.utilisateur.ut_codepostal = ' ';
    } else {
      this.utilisateur.ut_codepostal = data.ut_codepostal;
    }

    if (data.ut_ville == '') {
      this.utilisateur.ut_ville = ' ';
    } else {
      this.utilisateur.ut_ville = data.ut_ville;
    }

    if (data.ut_telephone == '') {
      this.utilisateur.ut_telephone = ' ';
    } else {
      this.utilisateur.ut_telephone = data.ut_telephone;
    }

    if (data.ut_email == '') {
      this.utilisateur.ut_email = ' ';
    } else {
      this.utilisateur.ut_email = data.ut_email;
    }

    if (data.ut_siren == '') {
      this.utilisateur.ut_siren = ' ';
    } else {
      this.utilisateur.ut_siren = data.ut_siren;
    }

    if (data.ut_rib == '') {
      this.utilisateur.ut_rib = ' ';
    } else {
      this.utilisateur.ut_rib = data.ut_rib;
    }

    if (data.ut_login == '') {
      this.utilisateur.ut_login = ' ';
    } else {
      this.utilisateur.ut_login = data.ut_login;
    }

    if (data.ut_departement == '') {
      this.utilisateur.ut_departement = '62';
    } else {
      this.utilisateur.ut_departement = data.ut_departement;
    }

    if (data.ut_adsville == '') {
      this.utilisateur.ut_adsville = ' ';
    } else {
      this.utilisateur.ut_adsville = data.ut_adsville;
    }

    if (data.ut_adsnumero == '') {
      this.utilisateur.ut_adsnumero = ' ';
    } else {
      this.utilisateur.ut_adsnumero = data.ut_adsnumero;
    }

    if (data.ut_souchefacture == '') {
      this.utilisateur.ut_souchefacture = ' ';
    } else {
      this.utilisateur.ut_souchefacture = data.ut_souchefacture;
    }

    if (data.ut_sequencefacture == '' || data.ut_sequencefacture == null) {
      this.utilisateur.ut_sequencefacture = 0;
    } else {
      this.utilisateur.ut_sequencefacture = data.ut_sequencefacture;
    }
    if (data.ut_codechauffeur == '') {
      this.utilisateur.ut_codechauffeur = ' ';
    } else {
      this.utilisateur.ut_codechauffeur = data.ut_codechauffeur;
    }


    this.utilisateur.idtypeutilisateur = this.idtype;

    if (this.variables.IdUser > 0) {
      await this.utilisateurService.UpdateUtilisateur(this.utilisateur);
    } else {
      this.utilisateur.id = 0;
      this.utilisateur.ut_mdp = this.variables.MDPInitial;
      this.utilisateur.idtypeutilisateur = 2;
      await this.utilisateurService.InsertUtilisateur(this.utilisateur);

    }

    await this.route.navigate([RoutesEnum.UTILISATEUR, RoutesEnum.UTILISATEUR_LIST]);
  }
}
