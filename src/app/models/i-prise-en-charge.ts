// import { Moment } from 'moment';

export interface IPriseEnCharge {
  id: number;
  pe_nodemande: string;
  pe_date: Date;
  pe_nofacture: string;
  pe_datefacture: Date;
  pe_nomdemandeur: string;
  pe_telephone: string;
  pe_mail: string;
  idprescripteur: number;
  idvictime: number;
  iddemande: number;
  idcourse: number;
  idchauffeur: number;
  idstructurerequerante: number;
}
