import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IPriseEnCharge} from '../models/i-prise-en-charge';
import {IRetour} from '../models/IRetour';
import CustomStore from 'devextreme/data/custom_store';
import {DataSourceFactoryService} from './datasource/data-source-factory.service';
import {HttpErrorHandler} from '../http-service/http-error-handler';
import {HttpService} from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class PriseEnChargeService {
  constructor(private http: HttpClient, private dataSourceService: DataSourceFactoryService, private httpService: HttpService) {
  }

  async createPriseEnCharge(priseencharge: IPriseEnCharge) {
    return await this.http.post<IPriseEnCharge>(environment.url + '/priseencharge/', priseencharge).toPromise();
  }

  async updatePriseEnCharge(priseencharge: IPriseEnCharge) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return await this.http.put<any>(environment.url + '/priseencharge/', priseencharge, httpOptions).toPromise();
  }

  getPriseEnChargeDemande(numDemande: string): HttpErrorHandler<IRetour> {
    return this.httpService.request<IRetour>(httpClient => {
      return httpClient.get<IRetour>(environment.url + '/priseencharge/prise_en_charge_demande/' + numDemande).toPromise();
    });
  }

  PriseEnChargeById(id: number): HttpErrorHandler<IPriseEnCharge> {
    return this.httpService.request(async httpClient => {
      return await httpClient.get<IPriseEnCharge>(environment.url + '/priseencharge/prise_en_charge/' + id.toString()).toPromise();
    }).withMessage(404, 'Prise en charge non trouvé');
  }

  getPDFFacture(numDemande: string): HttpErrorHandler<Blob> {
    return this.httpService.request<Blob>(httpClient => {
      return httpClient.get<Blob>(
        environment.url + '/priseencharge/getPDFFacture/' + numDemande,
        {responseType: 'blob' as 'json'}
      ).toPromise();
    });
  }

  envoiPDFFactureParMail(numDemande: string): HttpErrorHandler<any> {
    return this.httpService.request<any>(httpClient => {
      return httpClient.put<any>(
        environment.url + '/priseencharge/envoiPDFFactureParMail/' + numDemande,
        null
      ).toPromise();
    });
  }

  /*  async PriseEnChargeAllDonnees(id: number) {
      return await this.http.get<IRetour>(environment.url + '/priseencharge/prise_en_charge_all_donnees/' + id.toString()).toPromise();
    } */

  getPriseEnChargeDonneesModif(id: number): HttpErrorHandler<IRetour> {
    return this.httpService.request(async httpClient => {
      return await httpClient.get<IRetour>(environment.url + '/priseencharge/prise_en_charge_donnees_modif/' + id.toString()).toPromise();
    })
      .withMessage(404, 'Prise en charge inexistante');
  }

  // async GetNoFacture(id){
  //    return await this.http.get<Retour>(environment.url + '/priseencharge/no_facture/'+id).toPromise();
  // }

  deletePriseEnCharge(id: number): HttpErrorHandler<any> {
    return this.httpService.request(async httpClient => {
      return await httpClient.delete<any>(environment.url + '/priseencharge/' + id.toString()).toPromise();
    });
  }

  // getAllPriseEnCharge(type,id): Observable<Retour[]> {
  //    return this.http.get<Retour[]>(environment.url + '/priseencharge/liste_prise_en_charge/'+type+'/'+id );
  // }

  getAllPriseEnChargeStore(typeUtilisateur: number, id: number): CustomStore {
    const serviceUrl = environment.url + '/priseencharge/datasource/liste_prise_en_charge/' + typeUtilisateur.toString() + '/' + id.toString();
    return this.dataSourceService.createStore<IRetour>('idPriseEnCharge', serviceUrl);
  }
}
