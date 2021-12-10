import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Motif } from './motif';

@Injectable({
  providedIn: 'root'
})
export class MotifService {
  constructor(private http: HttpClient) { }
  getAllMotif(): Observable<Motif[]> {
    return this.http.get<Motif[]>(environment.url + '/motif/all_motif_details' );
  }
}
