import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomValidators} from 'ngx-custom-validators';
import {GlobalVariables} from '../global/global_variables';
import {UtilisateurService} from '../../../models/utilisateur.service';
import {NavigationService} from '../../../shared/services/navigation.service';
import {RoutesEnum} from '../RoutesEnum';

@Component({
  selector: 'app-login-mdp',
  templateUrl: './login-mdp.component.html',
  styleUrls: ['./login-mdp.component.scss']
})
export class LoginMDPComponent implements OnInit {
  loginMDPForm: FormGroup;
  VerifMDP: boolean;

  constructor(private route: Router,
              private utilisateurservice: UtilisateurService,
              private navigationservice: NavigationService,
              private variables: GlobalVariables) {
  }

  ngOnInit(): void {
    const mdp = new FormControl('', Validators.required);

    this.loginMDPForm = new FormGroup({
      oldmdp: new FormControl('', Validators.required),
      mdp: mdp,
      mdpConfirm: new FormControl('', CustomValidators.equalTo(mdp)),
    });
    this.VerifMDP = false;
  }

  async ValidationMDP() {
    const loginMDPData = this.loginMDPForm.value;
    const utilisateur = await this.utilisateurservice.VerificationIdMDP(this.variables.currentUser.id, loginMDPData.oldmdp);
    if (utilisateur != null) {
      utilisateur.ut_mdp = loginMDPData.mdp;

      const verifiedUser = await this.utilisateurservice.UpdateUtilisateur(utilisateur);
      this.variables.currentUser = verifiedUser;
      // this.navigationservice.publishNavigationChange('Demande');
      await this.route.navigate([RoutesEnum.ROOT]);
    } else {
      this.VerifMDP = true;
    }
  }
}
