import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {environment} from '../../../../environments/environment';
// import {Pdf} from './pdf';
// import {RepAutorisation} from './repautorisation';
import {IRepCourseHub} from './IRepCourseHub';
//import {RechCourse} from './rechcourse';
import {map} from 'rxjs/operators';
import {HttpService} from '../../../http-service/http.service';
import {HttpErrorHandler} from '../../../http-service/http-error-handler';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  // html: string;
  // pdf: Pdf;
  //rchcourse: RechCourse;

  RechCourseHub(numDemande: string): HttpErrorHandler<IRepCourseHub> {
    //this.rchcourse = new RechCourse();
    //this.rchcourse.dossier = demande;
    // console.log("avant put");
    return this.httpService.request(async httpClient => {
      return httpClient.get<IRepCourseHub>(environment.url + '/util/rech_course_hub/' + numDemande).toPromise()
    })
      .withMessage(404, "Demande inexistante.");
  }

/*  async openFileInNewWindow(fichier: string) {
    window.open(environment.url + '/util/download/' + fichier, 'application/pdf');
  } */

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
