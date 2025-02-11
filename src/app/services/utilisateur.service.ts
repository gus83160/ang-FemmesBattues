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
  }

  private getHttpOptions() {
    const login = sessionStorage.getItem('login');
    const password = sessionStorage.getItem('password');
    
    if (!login || !password) {
      throw new Error('Utilisateur non connecté');
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(login + ':' + password)
      })
    };
  }

  getAllUtilisateur(): Observable<IUtilisateur[]> {
    return this.http.get<IUtilisateur[]>(environment.url + '/utilisateur/allutilisateurs', this.getHttpOptions());
  }

  async VerificationLoginMDP(login: string, mdp: string): Promise<IUtilisateur> {
    const params = new ParmsLogin(login, mdp);
    const utilisateur = await this.http.post<IUtilisateur>(environment.url + '/utilisateur/verifloginmdp', params).toPromise();

    this.variables.currentUser = utilisateur;
    sessionStorage.setItem('login', login);
    sessionStorage.setItem('password', mdp);
    return utilisateur;
  }

  async VerificationIdMDP(id: number, mdp: string) {
    return await this.http.get<IUtilisateur>(environment.url + '/utilisateur/verifidmdp/' + id.toString() + '/' + mdp, this.getHttpOptions()).toPromise();
  }

  async UtilisateurByID(id: number) {
    return await this.http.get<IUtilisateur>(environment.url + '/utilisateur/getutilisateurbyid/' + id.toString(), this.getHttpOptions()).toPromise();
  }

  async GetUtilisateurRecords(): Promise<any[]> {
    return await this.http.get<any[]>(environment.url + '/utilisateur', this.getHttpOptions()).toPromise();
  }

  async UpdateUtilisateur(utilisateur: IUtilisateur) {
    return await this.http.put<IUtilisateur>(environment.url + '/utilisateur/', utilisateur, this.getHttpOptions()).toPromise();
  }

  async InsertUtilisateur(utilisateur: IUtilisateur) {
    return await this.http.post<any>(environment.url + '/utilisateur/', utilisateur, this.getHttpOptions()).toPromise();
  }

  reinitialiserMotDePasse(idUtilisateur: number): Observable<boolean> {
    const login = sessionStorage.getItem('login');
    const password = sessionStorage.getItem('password');
    
    if (!login || !password) {
      return new Observable(observer => {
        observer.error(new Error('Utilisateur non connecté'));
        observer.complete();
      });
    }

    return this.http.post<boolean>(
      environment.url + '/utilisateur/reinitialisermdp/' + idUtilisateur, 
      {}, 
      this.getHttpOptions()
    );
  }

  deleteUtilisateur(idUtilisateur: number): Observable<boolean> {
    return this.http.post<boolean>(
      environment.url + '/utilisateur/delete/' + idUtilisateur,
      {},  // corps vide car l'ID est dans l'URL
      this.getHttpOptions()
    );
  }
}
