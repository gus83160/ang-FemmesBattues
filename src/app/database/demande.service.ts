import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Demande } from './demande';
import { Retour } from './retour';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) { }

  async createDemande(demande: Demande) {
        console.log("createDemande");
        demande.id = 0;
        console.log(demande);

        return await this.http.post<Demande>(environment.url + '/demande/', demande).toPromise();
      }

}
