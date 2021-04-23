import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { TypeUtilisateur } from '../typeutilisateur';

@Injectable({
  providedIn: 'root'
})
export class TypeUtilisateurService {
  constructor(private http: HttpClient) { }
  getAllTypeUtilisateur(): Observable<TypeUtilisateur[]> {
    return this.http.get<TypeUtilisateur[]>(environment.url + '/typeutilisateur/all_type_utilisateur_details' );
  }

}
