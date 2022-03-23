import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

import {IUtilisateur} from '../models/IUtilisateur';
import {GlobalVariables} from '../views/femmesbattues/global/global_variables';
import {ParmsLogin} from '../views/femmesbattues/global/ParmsLogin';

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

  getAllUtilisateur(): Observable<IUtilisateur[]> {
//      const httpOptions = {
//           headers: new HttpHeaders({
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic ' + btoa(this.variables.Login + ':' + this.variables.MotDePasse)
//           })
//      };
//     return this.http.get<Utilisateur[]>(environment.url + '/utilisateur/allutilisateurs',httpOptions );
    return this.http.get<IUtilisateur[]>(environment.url + '/utilisateur/allutilisateurs');
  }


  async VerificationLoginMDP(login: string, mdp: string): Promise<IUtilisateur> {
    const params = new ParmsLogin(login, mdp);
    const utilisateur = await this.http.post<IUtilisateur>(environment.url + '/utilisateur/verifloginmdp', params).toPromise();

    this.variables.currentUser = utilisateur;
    return utilisateur;
  }

  async VerificationIdMDP(id: number, mdp: string) {
    return await this.http.get<IUtilisateur>(environment.url + '/utilisateur/verifidmdp/' + id.toString() + '/' + mdp).toPromise();
  }

  // async Payeur(dep) {
  //   return await this.http.get<IUtilisateur>(environment.url + '/utilisateur/payeur/' + dep).toPromise();
  // }

  async UtilisateurByID(id: number) {
    return await this.http.get<IUtilisateur>(environment.url + '/utilisateur/getutilisateurbyid/' + id.toString()).toPromise();
  }

  // GetUtilisateurByID(id) {
  //   return this.UtilisateurByID(id);
  // }

  async UpdateUtilisateur(utilisateur: IUtilisateur) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return await this.http.put<IUtilisateur>(environment.url + '/utilisateur/', utilisateur, httpOptions).toPromise();
  }

  async InsertUtilisateur(utilisateur: IUtilisateur) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return await this.http.post<any>(environment.url + '/utilisateur/', utilisateur, httpOptions).toPromise();
  }
}
