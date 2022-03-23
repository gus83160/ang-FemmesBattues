import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IVictime } from '../models/IVictime';

@Injectable({
  providedIn: 'root'
})
export class VictimeService {
  constructor(private http: HttpClient) { }

  async createVictime(victime: IVictime) {
     victime.id = 0;
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
     return await this.http.post<IVictime>(environment.url + '/victime/', victime, httpOptions).toPromise();
  }
  async updateVictime(victime: IVictime){
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
     return await this.http.put<any>(environment.url + '/victime/', victime, httpOptions).toPromise();
  }
  // async deleteVictime(id: number){
  //    return await this.http.delete<any>(environment.url + '/victime/' + id).toPromise();
  // }
}
