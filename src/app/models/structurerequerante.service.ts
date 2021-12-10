import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { StructureRequerante } from './structurerequerante';

@Injectable({
  providedIn: 'root'
})
export class StructureRequeranteService {
  constructor(private http: HttpClient) { }
  getAllStructureRequerante(type): Observable<StructureRequerante[]> {
    return this.http.get<StructureRequerante[]>(environment.url + '/structurerequerante/all_structure_requerante_details/'+type );
  }

}
