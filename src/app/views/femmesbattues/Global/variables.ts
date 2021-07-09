import { Injectable } from '@angular/core';
import { Moment } from 'moment';

@Injectable()
export class Variables {
  IdUtilisateur: number;
  CodeChauffeur: string;
  Login: string;
  MotDePasse: string;
  TypeStructureRequerante: number;
  IdTypeUtilisateur: number;
  IdPrescripteur: number ;
  IdDemande: number ;
  IdVictime: number ;
  IdStructureRequerante: number;
  IdPriseEnCharge: number;
  IdChauffeur: number;
  IdCourse: number ;
  NoDemande: string;
  NoFacture: string;
  DateFacture : string;
  DateDemande : Date;
  DateDemandeVisu: string;
  NomPrescripteur : string;
  DepDemande : String;
  StructureRequerante: string;
  NomDemandeur: string;
  TelephoneDemandeur: string;
  MailDemandeur: string;
  NomChauffeur : string;
  PrenomChauffeur : string;
  NomVictime : string;
  NomVictimeComplet : string;
  NomUsage : string;
  NomUsageComplet : string;
  Prenom : string;
  PrenomComplet : string;
  Adresse : string;
  Telephone : string;
  Mail : string;
  Age : number;
  EnfantCharge : number;
  InfoComplementaire : string;
  Motif: string;
  EnfantPresent: boolean;
  NbEnfant: number;
  AgeEnfant: string;
  Particularite: string;
  AdresseDepart: string;
  AdresseArrivee: string;
  AllerRetour: boolean;
  DateCourse: Date;
  HeureCourseDebut: Date;
  HeureCourseFin: Date;
  DateCourseVisu: string;
  HeureCourseDebutVisu: string;
  HeureCourseFinVisu: string;
  Montant: number;
  Peage: number;
  IdUser: number;
  DateDebut: Date;
  Prix: string;
  DateFin: Date;
  HeureDebut: string;
  HeureFin: string;
  Information: boolean;


  TypePrescripteur:    number = 1;
  TypeChauffeur:       number = 2;
  TypeAssociation:     number = 3;
  TypeAdmin:           number = 4;
  MDPInitial:          string = '1234';
  LibellePrescripteur: string = 'Prescripteur';
  LibelleChauffeur:    string = 'Chauffeur';
  LibelleAssociation:  string = 'Association';
  LibelleAdmin:        string = 'Administrateur';

}
