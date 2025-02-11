import {Component, OnInit, ViewChild} from '@angular/core';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilisateurService} from '../../../../services/utilisateur.service';
import {NavigationService} from '../../../../shared/services/navigation.service';
import {GlobalVariables} from '../../global/global_variables';
import {RoutesEnum} from '../../RoutesEnum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorLogin: boolean = false;
  executing: boolean = false;
  private returnUrl: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private utilisateurservice: UtilisateurService,
              private navigationservice: NavigationService,
              private variables: GlobalVariables) {
    variables.currentUser = null;
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl ?? RoutesEnum.ROOT;

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async loginIn(e: { preventDefault: () => void; }): Promise<void> {
    try {
      this.executing = true;

      const loginData = this.loginForm.value;
      const utilisateur = await this.utilisateurservice.VerificationLoginMDP(loginData.username, loginData.password);
      if (utilisateur != null) {
        if (utilisateur.ut_mdp === this.variables.MDPInitial) {
          await this.router.navigate([RoutesEnum.AUTH, RoutesEnum.LOGINMDP]);
        } else {
          this.variables.currentUser = utilisateur; 
          this.navigationservice.publishNavigationChange('Demande');
          await this.router.navigate([this.returnUrl]);
        }
      } else {
        this.errorLogin = true;
      }
    } catch (error) {
      console.error('Login error:', error);
      this.errorLogin = true;
    } finally {
      this.executing = false;
    }

    e.preventDefault();
  }
}
