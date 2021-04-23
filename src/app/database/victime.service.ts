import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Victime } from './victime';

@Injectable({
  providedIn: 'root'
})
export class VictimeService {

//  ret : Victime;
  constructor(private http: HttpClient) { }

  async createVictime(victime: Victime) {
        return await this.http.post<Victime>(environment.url + '/victime/', victime).toPromise();
      }

}
