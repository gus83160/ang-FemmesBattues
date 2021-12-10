import {Component, OnInit, ViewChild} from '@angular/core';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {UtilisateurService} from '../../../models/utilisateur.service';
import {NavigationService} from '../../../shared/services/navigation.service';
import {GlobalVariables} from '../global/global_variables';
import {RoutesEnum} from '../RoutesEnum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  ErrorLogin: boolean;
  executing: boolean;

  constructor(private route: Router,
              private utilisateurservice: UtilisateurService,
              private navigationservice: NavigationService,
              private variables: GlobalVariables) {
    variables.currentUser = null;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.ErrorLogin = false;
  }

  async loginin(): Promise<void> {
    try {
      this.executing = true;

      const loginData = this.loginForm.value;
      const utilisateur = await this.utilisateurservice.VerificationLoginMDP(loginData.username, loginData.password);
      if (utilisateur != null) {
        if (utilisateur.ut_mdp === this.variables.MDPInitial) {
          await this.route.navigate([RoutesEnum.LOGINMDP]);
        } else {
          // localStorage.setItem('MotDePasse',utilisateur.ut_mdp);
          this.navigationservice.publishNavigationChange('Demande');
          await this.route.navigate([RoutesEnum.ROOT]);
        }
      } else {
        this.ErrorLogin = true;
      }
    } finally {
      this.executing = false;
    }
  }
}
