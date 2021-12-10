import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class HubService {

  constructor(private http: HttpClient) { }

  async Autorisation() {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                                         'Username': environment.login,
                                                         'Password': environment.mdp,
                                                         'Access-Control-Allow-Origin':'*',
                                                         'grant_type':'client_credentials'
                                                       })
                            };
        return await this.http.post<HttpResponse<any>>(environment.urlAutorisation,httpOptions).toPromise();
  }
}


