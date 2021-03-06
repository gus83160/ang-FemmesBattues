export interface IRetour {
  idPriseEnCharge: number;
  noDemande: string;
  dateDemande: Date;
  dateDemandeVisu: string;
  noFacture: string;
  dateFacture: string;
  idPrescripteur: number;
  idVictime: number;
  idDemande: number;
  idCourse: number;
  idChauffeur: number;
  idStructureRequerante: number;
  idMotif: number;
  nomPrescripteur: string;
  depDemande: string;
  nomChauffeur: string;
  prenomChauffeur: string;
  structureRequerante: string;
  nomDemandeur: string;
  telephoneDemandeur: string;
  mailDemandeur: string;
  nomVictime: string;
  nomVictimeComplet: string;
  nomUsage: string;
  nomUsageComplet: string;
  prenom: string;
  prenomComplet: string;
  adresse: string;
  telephone: string;
  mail: string;
  age: number;
  enfantCharge: number;
  infoComplementaire: string;
  motif: string;
  dateAller: Date;
  heureAller: string;
  enfantPresent: boolean;
  nbEnfant: number;
  ageEnfant: string;
  particularite: string;
  adresseDepart: string;
  adresseArrivee: string;
  allerRetour: boolean;
  dateRetour?: Date;
  heureRetour: string;
  dateCourse: Date;
  heureCourseDebut: Date;
  heureCourseFin: Date;
  dateCourseVisu: string;
  heureCourseDebutVisu: string;
  heureCourseFinVisu: string;
  montant: number;
  peage: number;
}
