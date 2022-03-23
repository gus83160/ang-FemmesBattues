import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ICourse} from '../models/ICourse';
import {HttpService} from '../http-service/http.service';
import {HttpErrorHandler} from '../http-service/http-error-handler';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpService: HttpService) {
  }

  getById(idCourse: number): HttpErrorHandler<ICourse> {
    return this.httpService.request(async httpClient => {
      const res = await httpClient.get<ICourse>(environment.url + '/course/' + idCourse.toString()).toPromise();
      return CourseService.convertRecordTime(res);
    })
      .withMessage(404, 'Information course inexistante.');
  }

  createCourse(course: ICourse, idPriseEnCharge: number): HttpErrorHandler<ICourse> {
    return this.httpService.request<ICourse>(async httpClient => {
      return await httpClient.post<ICourse>(environment.url + '/course/' + idPriseEnCharge.toString(), course).toPromise();
    })
  }

  updateCourse(course: ICourse): HttpErrorHandler<ICourse>  {
    return this.httpService.request<ICourse>(async httpClient => {
      return await httpClient.put<ICourse>(environment.url + '/course/' + course.id.toString(), course).toPromise();
    })
  }

  private static convertRecordTime(res: ICourse) : ICourse {
    if (res != null) {
      res.co_heuredebut = CourseService.convertTime(res.co_heuredebut);
      res.co_heurefin = CourseService.convertTime(res.co_heurefin);
      res.co_attjour = CourseService.convertTime(res.co_attjour);
      res.co_attnuit = CourseService.convertTime(res.co_attnuit);
    }
    return res;
  }

  private static convertTime(f: Date | string | undefined) {
    if (f !== null) {
      // 1986-05-04T22:59:59
      f = new Date(formatDate(new Date(), 'yyyy-MM-dd', 'fr-FR') + 'T' + f);
    }
    return f;
  }
}
