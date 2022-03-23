import {Injectable, Optional, SkipSelf} from '@angular/core';
import {IUtilisateur} from '../../../models/IUtilisateur';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalVariables {
  // guard singleton
  constructor(@Optional() @SkipSelf() parent?: GlobalVariables) {
    if (parent) {
      throw Error(
        `[GuardedSingletonService]: trying to create multiple instances,
        but this service should be a singleton.`
      );
    }
  }
  // constructor() {
  //   console.log('Variables Constructed');
  // }

  private isUserLoggedInSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$ = this.isUserLoggedInSource.asObservable();

  get currentUser(): IUtilisateur | null {
    return this._currentUser;
  }

  set currentUser(value: IUtilisateur | null) {
    if (value !== null) {
      sessionStorage.setItem('login', value.ut_login);
      sessionStorage.setItem('password', value.ut_mdp);
      this._currentUser = value;
    } else {
      sessionStorage.removeItem('login');
      sessionStorage.removeItem('password');
      this._currentUser = null;
    }

    this.isUserLoggedInSource.next((value != null));
  }

  private _currentUser: IUtilisateur | null = null;
//  IdUtilisateur: number;
//  CodeChauffeur: string;
//  Login: string;
//  MotDePasse: string;
//  TypeStructureRequerante: number;
//  IdTypeUtilisateur: number;
  IdPrescripteur!: number;
  IdDemande!: number;
  IdVictime!: number;
  IdStructureRequerante!: number;
  IdPriseEnCharge!: number;
  IdChauffeur!: number;
  IdCourse!: number;
  NoDemande!: string;
  NoFacture!: string;
  DateFacture!: string;
  DateDemande!: Date;
  DateDemandeVisu!: string;
  NomPrescripteur!: string;
  DepDemande!: string;
  StructureRequerante!: string;
  NomDemandeur!: string;
  TelephoneDemandeur!: string;
  MailDemandeur!: string;
  NomChauffeur!: string;
  PrenomChauffeur!: string;
  NomVictime!: string;
  NomVictimeComplet!: string;
  NomUsage!: string;
  NomUsageComplet!: string;
  Prenom!: string;
  PrenomComplet!: string;
  Adresse!: string;
  Telephone!: string;
  Mail!: string;
  Age!: number;
  EnfantCharge!: number;
  InfoComplementaire!: string;
  Motif!: string;
  EnfantPresent!: boolean;
  NbEnfant!: number;
  AgeEnfant!: string;
  Particularite!: string;
  AdresseDepart!: string;
  AdresseArrivee!: string;
  AllerRetour!: boolean;
  DateCourse!: Date;
  HeureCourseDebut!: Date;
  HeureCourseFin!: Date;
  DateCourseVisu!: string;
  HeureCourseDebutVisu!: string;
  HeureCourseFinVisu!: string;
  Montant!: number;
  Peage!: number;
  IdUser!: number;
  DateDebut!: Date;
  Prix!: string;
/*  DateFin: Date;
  HeureDebut: string;
  HeureFin: string; */
  Information!: boolean;


  TypePrescripteur = 1;
  TypeChauffeur = 2;
  TypeAssociation = 3;
  TypeAdmin = 4;
  MDPInitial = '1234';
  LibellePrescripteur = 'Prescripteur';
  LibelleChauffeur = 'Chauffeur';
  LibelleAssociation = 'Association';
  LibelleAdmin = 'Administrateur';

  previousUrl: string = '';
  currentUrl: string = '';
}
