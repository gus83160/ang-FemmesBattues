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
     victime.id = 0;
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
     return await this.http.post<Victime>(environment.url + '/victime/', victime,httpOptions).toPromise();
  }
  async updateVictime(victime: Victime){
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
     return await this.http.put<any>(environment.url + '/victime/',victime,httpOptions).toPromise();
  }

  async deleteVictime(id: number){
     return await this.http.delete<any>(environment.url + '/victime/'+id).toPromise();
  }

}
