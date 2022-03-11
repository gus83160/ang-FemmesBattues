import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Course} from './course';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {
  }

  async getById(idCourse: number): Promise<Course> {
    let res = await this.http.get<Course>(environment.url + '/course/' + idCourse.toString()).toPromise();
    this.convertRecordTime(res);
    return res;
  }

  async createCourse(course: Course, idPriseEnCharge: number) {
    return await this.http.post<Course>(environment.url + '/course/' + idPriseEnCharge.toString(), course).toPromise();
  }

  async updateCourse(course: Course) {
    return await this.http.put<Course>(environment.url + '/course/' + course.id.toString(), course).toPromise();
  }

  private convertRecordTime(res: Course) {
    if (res) {
      res.co_heuredebut = this.convertTime(res.co_heuredebut);
      res.co_heurefin = this.convertTime(res.co_heurefin);
      res.co_attjour = this.convertTime(res.co_attjour);
      res.co_attnuit = this.convertTime(res.co_attnuit);
    }
  }

  private convertTime(f: Date | string) {
    if (f !== null) {
      // 1986-05-04T22:59:59
      f = new Date(formatDate(Date.now(), 'yyyy-MM-dd', 'fr-FR') + 'T' + f);
    }
    return f;
  }
}
