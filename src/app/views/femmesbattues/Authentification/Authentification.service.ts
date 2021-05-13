import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Variables } from '../global/variables';

@Injectable({ providedIn: 'root' })
export class AuthentificationService {

    constructor(
        private router: Router,
        private http: HttpClient,
        public variables : Variables
    ) {
    }

    public get userValue(): string {
//       console.log("AuthentificationService 1 " + this.variables.Login + ':' + this.variables.MotDePasse);
//       console.log("AuthentificationService 2 " + localStorage.getItem('Login') + ':' + localStorage.getItem('MotDePasse'));
        return window.btoa(this.variables.Login + ':' + this.variables.MotDePasse);
    }

}
