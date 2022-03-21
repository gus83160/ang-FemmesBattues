import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Demande} from '../models/demande';
import {Retour} from '../models/retour';
import {map} from 'rxjs/operators';
import {subscribeToPromise} from 'rxjs/internal-compatibility';
// import {Pdf} from '../views/femmesbattues/global/pdf';

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

  async genereFacture(numDemande: string): Promise<Blob> {
    // return await this.http.post(
    //   environment.url + '/demande/facturer/' + numDemande,
    //   null,
    //   {responseType: 'blob'}
    //   ).toPromise();

    console.log('before post');

    const res = await this.http.post<Blob>(
      environment.url + '/demande/facturer/' + numDemande,
      null,
      {responseType: 'blob' as 'json' }
    ).toPromise();
    console.log('after post');

    console.log(res);

    return res;
    //return this.b64ToBlob(res);
  }

  //async GenererPDFDemande(HTML: string, facture: string, demande: string, payeur: string, chauffeur: string): Promise<void> {
  async genererPDFDemande(numDemande: string): Promise<Blob> {
    return await this.http.post(
      environment.url + '/demande/generer_pdf/' + numDemande,
      null,
      {responseType: 'blob'}
    ).toPromise();

    // this.pdf = new Pdf();
    // this.pdf.body = HTML;
    // this.pdf.nomfacture = facture;
    // this.pdf.nomdemande = numDemande;
    // this.pdf.mailPayeur = payeur;
    // this.pdf.mailChauffeur = chauffeur;
    // const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    // const re = await this.http.put<any>(environment.url + '/util/generer_pdf', this.pdf, httpOptions).toPromise()
    //   .catch(error => {
    //     console.log(error);
    //     return null;
    //   });
    // return re;
  }

  b64ToBlob(b64: string): Blob {
    const byteCharacters = atob(b64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: 'application/pdf'});
  }

  //async GenererPDFDemande(HTML: string, facture: string, demande: string, payeur: string, chauffeur: string): Promise<void> {
  async genererPDFDemande(numDemande: string): Promise<Blob> {
    return await this.http.post(
      environment.url + '/demande/generer_pdf/' + numDemande,
      null,
      {responseType: 'blob'}
    ).toPromise();

    // this.pdf = new Pdf();
    // this.pdf.body = HTML;
    // this.pdf.nomfacture = facture;
    // this.pdf.nomdemande = numDemande;
    // this.pdf.mailPayeur = payeur;
    // this.pdf.mailChauffeur = chauffeur;
    // const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    // const re = await this.http.put<any>(environment.url + '/util/generer_pdf', this.pdf, httpOptions).toPromise()
    //   .catch(error => {
    //     console.log(error);
    //     return null;
    //   });
    // return re;
  }
}
