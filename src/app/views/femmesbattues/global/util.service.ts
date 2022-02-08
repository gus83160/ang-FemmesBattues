import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpRequest} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


import {environment} from '../../../../environments/environment';
import {Pdf} from './pdf';
import {RepAutorisation} from './repautorisation';
import {RepCourseHub} from './repcoursehub';
import {RechCourse} from './rechcourse';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) {
  }

  html: string;
  pdf: Pdf;
  rchcourse: RechCourse;

  async GenererPDF(HTML: string, facture: string, demande: string, payeur: string, chauffeur: string): Promise<void> {
    this.pdf = new Pdf();
    this.pdf.body = HTML;
    this.pdf.nomfacture = facture;
    this.pdf.nomdemande = demande;
    this.pdf.mailPayeur = payeur;
    this.pdf.mailChauffeur = chauffeur;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const re = await this.http.put<any>(environment.url + '/util/generer_pdf', this.pdf, httpOptions).toPromise()
      .catch(error => {
        console.log(error);
        return null;
      });
    return re;
  }

  async RechCourseHub(demande): Promise<RepCourseHub> {
    this.rchcourse = new RechCourse();
    this.rchcourse.dossier = demande;
    // console.log("avant put");
    const re = await this.http.put<RepCourseHub>(environment.url + '/util/rech_course_hub', this.rchcourse).toPromise()
      .catch(error => {
        console.log(error);
        return null;
      });
    return re;
  }

  async DownloadFile(fichier: string) {
    window.open(environment.url + '/util/download/' + fichier, 'application/pdf');
  }

  async CSV(fichier: string) {
    await this.http.get(environment.url + '/util/csv/' + fichier).toPromise();
  }

  async DownloadFileCSV(fichier: string) {
    window.open(environment.url + '/util/download_csv/' + fichier, 'text/csv');
  }
}
