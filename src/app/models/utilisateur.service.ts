import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

import {Utilisateur} from './utilisateur';
import {GlobalVariables} from '../views/femmesbattues/global/global_variables';
import {ParmsLogin} from '../views/femmesbattues/global/parmslogin';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  constructor(private http: HttpClient,
              private variables: GlobalVariables) {
    // this.variables.currentUser = null;
    // sessionStorage.setItem('login', '');
    // sessionStorage.setItem('password', '');
  }

  getAllUtilisateur(): Observable<Utilisateur[]> {
//      const httpOptions = {
//           headers: new HttpHeaders({
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic ' + btoa(this.variables.Login + ':' + this.variables.MotDePasse)
//           })
//      };
//     return this.http.get<Utilisateur[]>(environment.url + '/utilisateur/allutilisateurs',httpOptions );
    return this.http.get<Utilisateur[]>(environment.url + '/utilisateur/allutilisateurs');
  }


  async VerificationLoginMDP(login, mdp): Promise<Utilisateur> {
    const params = new ParmsLogin();
    params.login = login;
    params.mdp = mdp;
    const utilisateur = await this.http.post<Utilisateur>(environment.url + '/utilisateur/verifloginmdp', params).toPromise();

    this.variables.currentUser = utilisateur;
    return utilisateur;
  }

  async VerificationIdMDP(id, mdp) {
    return await this.http.get<Utilisateur>(environment.url + '/utilisateur/verifidmdp/' + id + '/' + mdp).toPromise();
  }

  async Payeur(dep) {
    return await this.http.get<Utilisateur>(environment.url + '/utilisateur/payeur/' + dep).toPromise();
  }

  async UtilisateurByID(id) {
    return await this.http.get<Utilisateur>(environment.url + '/utilisateur/getutilisateurbyid/' + id).toPromise();
  }

  GetUtilisateurByID(id) {
    return this.UtilisateurByID(id);
  }

  async UpdateUtilisateur(utilisateur: Utilisateur) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return await this.http.put<Utilisateur>(environment.url + '/utilisateur/', utilisateur, httpOptions).toPromise();
  }

  async InsertUtilisateur(utilisateur: Utilisateur) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return await this.http.post<any>(environment.url + '/utilisateur/', utilisateur, httpOptions).toPromise();
  }
}
