import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpRequest} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


import {environment} from '../../../../environments/environment';
// import {Pdf} from './pdf';
// import {RepAutorisation} from './repautorisation';
import {RepCourseHub} from './repcoursehub';
import {RechCourse} from './rechcourse';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) {
  }

  // html: string;
  // pdf: Pdf;
  rchcourse: RechCourse;

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

  async openFileInNewWindow(fichier: string) {
    window.open(environment.url + '/util/download/' + fichier, 'application/pdf');
  }

  downloadFile(fichier: string): any {
    let url = environment.url + '/util/download/' + fichier;
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  async CSV(fichier: string) {
    await this.http.get(environment.url + '/util/csv/' + fichier).toPromise();
  }

  async DownloadFileCSV(fichier: string) {
    window.open(environment.url + '/util/download_csv/' + fichier, 'text/csv');
  }
}
