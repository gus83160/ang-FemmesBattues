import {Component} from '@angular/core';
import {Validators, FormGroup, FormControl, AbstractControl, ValidatorFn, FormBuilder, ValidationErrors} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalVariables} from '../../global/global_variables';
import {UtilisateurService} from '../../../../services/utilisateur.service';
import {NavigationService} from '../../../../shared/services/navigation.service';
import {RoutesEnum} from '../../RoutesEnum';

@Component({
  selector: 'app-login-mdp',
  templateUrl: './login-mdp.component.html',
  styleUrls: ['./login-mdp.component.scss']
})
export class LoginMDPComponent {

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
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const mdp = formGroup.get('mdp');
      const mdpConfirm = formGroup.get('mdpConfirm');

      if (mdp == null || mdpConfirm == null) {
        return null;
      }

      const mdpValue = mdp.value;
      if (mdpValue === undefined) {
        return null;
      }

      const mdpConfirmValue = mdpConfirm.value;
      if (mdpConfirmValue === undefined) {
        return null;
      }

      if (mdpValue !== mdpConfirmValue) {
        return {notEquals: true}; // This is our error!
      }

      return null;
    };
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
    if (this.variables.currentUser != null) {
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
}
