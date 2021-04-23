import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PriseEnCharge } from './priseencharge';
import { Retour } from './retour';

@Injectable({
  providedIn: 'root'
})
export class PriseEnChargeService {
        html: string;

//  ret : Victime;
  constructor(private http: HttpClient) { }

  async createPriseEnCharge(priseencharge: PriseEnCharge) {
     return await this.http.post<PriseEnCharge>(environment.url + '/priseencharge/', priseencharge).toPromise();
  }
  async PriseEnChargeDemande(demande){
     return await this.http.get<Retour>(environment.url + '/priseencharge/prise_en_charge_demande/'+demande).toPromise();
  }
  async PriseEnChargeId(id){
     return await this.http.get<Retour>(environment.url + '/priseencharge/prise_en_charge_id/'+id).toPromise();
  }

  async GetNoFacture(id){
     return await this.http.get<Retour>(environment.url + '/priseencharge/no_facture/'+id).toPromise();
  }

  async updatePriseEnCharge(priseencharge: PriseEnCharge){
     console.log("Update");
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
     return await this.http.put<any>(environment.url + '/priseencharge/',priseencharge,httpOptions).toPromise();
  }
  getAllPriseEnCharge(type,id): Observable<Retour[]> {
     return this.http.get<Retour[]>(environment.url + '/priseencharge/liste_prise_en_charge/'+type+'/'+id );
  }

}
