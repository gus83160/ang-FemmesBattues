import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Utilisateur } from './utilisateur';
import { Variables } from '../views/femmesbattues/global/variables';
import { ParmsLogin } from '../views/femmesbattues/global/parmslogin';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  parms : ParmsLogin;

  constructor(private http: HttpClient,
              private variables : Variables) { }

  getAllUtilisateur(): Observable<Utilisateur[]> {
//      const httpOptions = {
//           headers: new HttpHeaders({
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic ' + btoa(this.variables.Login + ':' + this.variables.MotDePasse)
//           })
//      };
//     return this.http.get<Utilisateur[]>(environment.url + '/utilisateur/allutilisateurs',httpOptions );
     return this.http.get<Utilisateur[]>(environment.url + '/utilisateur/allutilisateurs' );
  }


  async VerificationLoginMDP(login,mdp) {
      this.parms = new ParmsLogin();
      this.parms.login = login;
      this.parms.mdp = mdp;
      return await this.http.put<Utilisateur>(environment.url + '/utilisateur/verifloginmdp',this.parms).toPromise();
  }
  async VerificationIdMDP(id,mdp) {
      return await this.http.get<Utilisateur>(environment.url + '/utilisateur/verifidmdp/'+id+'/'+mdp).toPromise();
  }
  async Payeur(dep) {
      return await this.http.get<Utilisateur>(environment.url + '/utilisateur/payeur/'+dep).toPromise();
  }

  async UtilisateurByID(id) {
      return await this.http.get<Utilisateur>(environment.url + '/utilisateur/getutilisateurbyid/'+id).toPromise();
  }
  GetUtilisateurByID(id) {
      return this.UtilisateurByID(id);
  }

  async UpdateUtilisateur(utilisateur: Utilisateur) {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
      return await this.http.put<any>(environment.url + '/utilisateur/',utilisateur,httpOptions).toPromise();
  }

  async InsertUtilisateur(utilisateur: Utilisateur) {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
      return await this.http.post<any>(environment.url + '/utilisateur/',utilisateur,httpOptions).toPromise();
  }
}
