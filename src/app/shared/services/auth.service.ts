import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {GlobalVariables} from '../../views/femmesbattues/global/global_variables';
import {UtilisateurService} from '../../models/utilisateur.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    public variables: GlobalVariables,
    private utilisateurService: UtilisateurService
  ) {
  }

  get isLoggedIn(): boolean {
    return this.variables.currentUser !== null;
  }

  async tryLoadFromSession(): Promise<void> {
    if (this.variables.currentUser === null) {
      const login = sessionStorage.getItem('login');
      const password = sessionStorage.getItem('password');
      if (login && password) {
        await this.utilisateurService.VerificationLoginMDP(login, password);
      }
    }
  }

  public get userAuth(): string {
//       console.log("AuthentificationService 1 " + this.variables.Login + ':' + this.variables.MotDePasse);
//       console.log("AuthentificationService 2 " + localStorage.getItem('Login') + ':' + localStorage.getItem('MotDePasse'));
    const login = sessionStorage.getItem('login');
    const password = sessionStorage.getItem('password');
    if (login !== '' && password !== '') {
      return window.btoa(login + ':' + password);
    } else {
      return null;
    }
//        return window.btoa(this.variables.Login + ':' + this.variables.MotDePasse);
  }
}
