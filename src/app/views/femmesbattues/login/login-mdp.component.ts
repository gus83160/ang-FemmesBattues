import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { CustomValidators } from 'ngx-custom-validators';

import { Variables } from '../global/variables';
import { Utilisateur } from '../../../database/utilisateur';
import { UtilisateurService} from '../../../database/utilisateur.service';
import { NavigationService } from "../../../shared/services/navigation.service";

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
              private variables : Variables) { }

  ngOnInit(): void {
      let mdp = new FormControl('', Validators.required);

      this.loginMDPForm = new FormGroup({
        oldmdp: new FormControl('', Validators.required),
        mdp: mdp,
        mdpConfirm: new FormControl('', CustomValidators.equalTo(mdp)),
      });
      this.VerifMDP = false;
  }

  async ValidationMDP () {
     const loginMDPData = this.loginMDPForm.value;
     console.log('id ' + this.variables.IdUtilisateur + ' MDP ' + loginMDPData.oldmdp);
     var utilisateur = await this.utilisateurservice.VerificationIdMDP(this.variables.IdUtilisateur,loginMDPData.oldmdp);
     if (utilisateur != null) {
         utilisateur.ut_mdp = loginMDPData.mdp;
         this.utilisateurservice.UpdateUtilisateur(utilisateur);
         this.variables.MotDePasse = utilisateur.ut_mdp;
         this.navigationservice.publishNavigationChange('Demande');
         this.route.navigate(['menu']);
     }
     else
        this.VerifMDP = true;
  }
}
