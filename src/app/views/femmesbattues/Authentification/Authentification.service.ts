import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Variables } from '../global/variables';

@Injectable({ providedIn: 'root' })
export class AuthentificationService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private variables : Variables
    ) {
    }

    public get userValue(): string {
        return window.btoa(this.variables.Login + ':' + this.variables.MotDePasse);
    }

}
