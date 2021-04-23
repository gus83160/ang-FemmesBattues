import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
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

  async genererPDF(HTML: string) {
        this.pdf = new Pdf();
        this.pdf.body = HTML;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
        return await this.http.put<HttpResponse<any>>(environment.url + '/util/generer_pdf',this.pdf,httpOptions).toPromise();
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

}
