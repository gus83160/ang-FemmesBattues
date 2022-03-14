import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PriseEnCharge } from '../models/PriseEnCharge';
import { Retour } from '../models/retour';
import {createStore} from 'devextreme-aspnet-data-nojquery';
import CustomStore from 'devextreme/data/custom_store';
import {DataSourceFactoryService} from './datasource/data-source-factory.service';

@Injectable({
  providedIn: 'root'
})
export class PriseEnChargeService {
        html: string;

//  ret : Victime;
  constructor(private http: HttpClient, private dataSourceService: DataSourceFactoryService) { }

  async createPriseEnCharge(priseencharge: PriseEnCharge) {
     return await this.http.post<PriseEnCharge>(environment.url + '/priseencharge/', priseencharge).toPromise();
  }
  async PriseEnChargeDemande(demande): Promise<Retour> {
     return this.http.get<Retour>(environment.url + '/priseencharge/prise_en_charge_demande/' + demande).toPromise();
  }
  async PriseEnChargeById(id){
     return await this.http.get<PriseEnCharge>(environment.url + '/priseencharge/prise_en_charge/'+id).toPromise();
  }

  async PriseEnChargeAllDonnees(id){
     return await this.http.get<Retour>(environment.url + '/priseencharge/prise_en_charge_all_donnees/'+id).toPromise();
  }

  async PriseEnChargeDonneesModif(id){
     return await this.http.get<Retour>(environment.url + '/priseencharge/prise_en_charge_donnees_modif/'+id).toPromise();
  }

  // async GetNoFacture(id){
  //    return await this.http.get<Retour>(environment.url + '/priseencharge/no_facture/'+id).toPromise();
  // }

  async updatePriseEnCharge(priseencharge: PriseEnCharge){
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
     return await this.http.put<any>(environment.url + '/priseencharge/',priseencharge,httpOptions).toPromise();
  }

  async deletePriseEnCharge(id: number){
     return await this.http.delete<any>(environment.url + '/priseencharge/'+id).toPromise();
  }

  // getAllPriseEnCharge(type,id): Observable<Retour[]> {
  //    return this.http.get<Retour[]>(environment.url + '/priseencharge/liste_prise_en_charge/'+type+'/'+id );
  // }

  getAllPriseEnChargeStore(type,id): CustomStore {
    const serviceUrl = environment.url + '/priseencharge/datasource/liste_prise_en_charge/'+type+'/'+id;
    return this.dataSourceService.createStore<Retour>('idPriseEnCharge', serviceUrl)
  }
}
