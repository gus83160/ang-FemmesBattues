import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormControl, AbstractControl, ValidatorFn, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalVariables} from '../../global/global_variables';
import {UtilisateurService} from '../../../../models/utilisateur.service';
import {NavigationService} from '../../../../shared/services/navigation.service';
import {RoutesEnum} from '../../RoutesEnum';

@Component({
  selector: 'app-login-mdp',
  templateUrl: './login-mdp.component.html',
  styleUrls: ['./login-mdp.component.scss']
})
export class LoginMDPComponent implements OnInit {

  VerifMDP: boolean;
  loginMDPForm: FormGroup;

  constructor(private route: Router,
              private formBuilder: FormBuilder,
              private utilisateurservice: UtilisateurService,
              private navigationservice: NavigationService,
              private variables: GlobalVariables) {

    this.loginMDPForm = formBuilder.group({
      oldmdp: new FormControl('', Validators.required),
      mdp: new FormControl('', Validators.required),
      mdpConfirm: new FormControl('', Validators.required),
    },
      {
        validators: [this.passwordEquals()],
        updateOn: 'blur',
      }
    );

    // const mdp = new FormControl('', Validators.required);
    //
    // this.loginMDPForm = new FormGroup({
    //   oldmdp: new FormControl('', Validators.required),
    //   mdp: mdp,
    //   mdpConfirm: new FormControl('', this.passwordConfirming),
    // });
    this.VerifMDP = false;
  }

  public passwordEquals(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const mdp = formGroup.get('mdp');
      const mdpConfirm = formGroup.get('mdpConfirm');

      if (!mdp || !mdpConfirm) {
        return null;
      }

      const mdpValue = mdp.value;
      if (!mdpValue) {
        return null;
      }

      const mdpConfirmValue = mdpConfirm.value;
      if (!mdpConfirmValue) {
        return null;
      }

      if (mdpValue !== mdpConfirmValue) {
        return { notEquals: true }; // This is our error!
      }

      return null;
    };
  }

  ngOnInit(): void {
  }

  // passwordConfirming() {
  //   return (c: AbstractControl): { invalid: boolean } => {
  //     console.log(this.loginMDPForm.controls.oldmdp.value);
  //     console.log(c.get('oldmdp')?.value);
  //     console.log(c.get('mdpConfirm')?.value);
  //
  //     if (c.get('oldmdp') && c.get('mdpConfirm')) {
  //       if (c.get('oldmdp').value !== c.get('mdpConfirm').value) {
  //         return {invalid: true};
  //       }
  //     }
  //   }
  // }

  // passwordConfirming: ValidatorFn = () => (c: AbstractControl): { invalid: boolean } => {
  //   console.log(c.get('oldmdp').value);
  //   console.log(c.get('mdpConfirm').value);
  //
  //   if (c.get('oldmdp') && c.get('mdpConfirm')) {
  //     if (c.get('oldmdp').value !== c.get('mdpConfirm').value) {
  //       return { invalid: true };
  //     }
  //   }
  // }

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
