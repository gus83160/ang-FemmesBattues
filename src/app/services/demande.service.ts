import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Demande} from '../models/demande';
import {Retour} from '../models/retour';
import {map} from 'rxjs/operators';
import {subscribeToPromise} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) {
  }

  async createDemande(demande: Demande) {
    demande.id = 0;
    return await this.http.post<Demande>(environment.url + '/demande/', demande).toPromise();
  }

  async updateDemande(demande: Demande) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return await this.http.put<any>(environment.url + '/demande/', demande, httpOptions).toPromise();
  }

  async deleteDemande(id: number) {
    return await this.http.delete<any>(environment.url + '/demande/' + id).toPromise();
  }

  async genereFacture(numDemande: string) {
    return await this.http.post(
      environment.url + '/demande/facturer/' + numDemande,
      null,
      {responseType: 'blob'}
      ).toPromise();
  }
}
