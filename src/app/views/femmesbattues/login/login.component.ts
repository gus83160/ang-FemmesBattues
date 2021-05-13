import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { Variables } from '../global/variables';
import { Utilisateur } from '../../../database/utilisateur';
import { UtilisateurService} from '../../../database/utilisateur.service';
import { NavigationService } from "../../../shared/services/navigation.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  VerifLogin: boolean;

  constructor(private route: Router,
              private utilisateurservice: UtilisateurService,
              private navigationservice: NavigationService,
              private variables : Variables) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.VerifLogin = false;
  }

  async loginin() {
      const loginData = this.loginForm.value
      var utilisateur = await this.utilisateurservice.VerificationLoginMDP(loginData.username,loginData.password);
      if (utilisateur != null) {
        this.variables.IdUtilisateur = utilisateur.id;
        this.variables.IdTypeUtilisateur = utilisateur.idtypeutilisateur;
        this.variables.CodeChauffeur = utilisateur.ut_codechauffeur;
        this.variables.Login = utilisateur.ut_login;
        localStorage.setItem('Login',utilisateur.ut_login);
        if (utilisateur.ut_mdp === this.variables.MDPInitial)
          this.route.navigate(['loginMDP']);
        else {
             this.variables.MotDePasse = utilisateur.ut_mdp;
             localStorage.setItem('MotDePasse',utilisateur.ut_mdp);
             this.navigationservice.publishNavigationChange('Demande');
             this.route.navigate(['menu']);
        }
     }
      else {
        this.VerifLogin = true;
      }
    }
}
