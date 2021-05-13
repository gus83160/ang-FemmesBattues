import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { environment } from '../../../../environments/environment';
import { Pdf } from './pdf';
import { RepAutorisation } from './repautorisation';
import { RepCourseHub } from './repcoursehub';
import { RechCourse } from './rechcourse';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

constructor(private http: HttpClient) { }
      html: string;
      pdf: Pdf;
      rchcourse : RechCourse;

  async GenererPDF(HTML: string, facture : string, demande : string, payeur : string, chauffeur : string) {
        this.pdf = new Pdf();
        this.pdf.body = HTML;
        this.pdf.nomfacture = facture;
        this.pdf.nomdemande = demande;
        this.pdf.mailPayeur = payeur;
        this.pdf.mailChauffeur = chauffeur;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
//        var tmp = await this.http.put<any>(environment.url + '/util/generer_pdf',this.pdf,httpOptions).toPromise();
       await this.http.put<any>(environment.url + '/util/generer_pdf',this.pdf,httpOptions).toPromise();
//        return tmp;
    }
   async Autorisation() {
        return await this.http.get<RepAutorisation>(environment.url + '/util/autorisation/' + environment.urlAutorisation).toPromise();
   }
   async RechCourseHub(demande,token) {
         this.rchcourse = new RechCourse();
         this.rchcourse.url = environment.urlHub;
         this.rchcourse.dossier = demande;
         this.rchcourse.token = token;

        return await this.http.put<RepCourseHub>(environment.url + '/util/rech_course_hub', this.rchcourse).toPromise();

   }

   async DownloadFile(fichier: string) {
     window.open(environment.url + '/util/download/'+fichier,"application/pdf");
     }
}
