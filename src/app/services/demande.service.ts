import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IDemande} from '../models/IDemande';
import {HttpErrorHandler} from '../http-service/http-error-handler';
import {HttpService} from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private httpService: HttpService, private http: HttpClient) {
  }

  async createDemande(demande: IDemande) {
    demande.id = 0;
    return await this.http.post<IDemande>(environment.url + '/demande/', demande).toPromise();
  }

  async updateDemande(demande: IDemande) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return await this.http.put<any>(environment.url + '/demande/', demande, httpOptions).toPromise();
  }

  // async deleteDemande(id: number) {
  //   return await this.http.delete<any>(environment.url + '/demande/' + id).toPromise();
  // }

  genereFacture(numDemande: string): HttpErrorHandler<Blob> {
    return this.httpService.request<Blob>(async httpClient => {
      return httpClient.post<Blob>(
        environment.url + '/demande/facturer/' + numDemande,
        null,
        {responseType: 'blob' as 'json'}
      ).toPromise();
    });
  }

  genererPDFDemande(numDemande: string): HttpErrorHandler<Blob> {
    return this.httpService.request(async httpClient => {
      return httpClient.post<Blob>(
        environment.url + '/demande/generer_pdf/' + numDemande,
        null,
        {responseType: 'blob' as 'json'}
      ).toPromise();
    })
      .withMessage(404, 'Demande inexistante.');
  }
}
