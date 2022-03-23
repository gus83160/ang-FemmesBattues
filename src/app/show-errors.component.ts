import {Component, Input} from '@angular/core';
import {AbstractControl } from '@angular/forms';
import {ErrorService} from './services/error.service';

// https://mdmoin07.medium.com/writing-validation-message-dynamically-angular-c032c1c2e0d4
// https://stackblitz.com/edit/angular-dynamic-validation-messages?file=src%2Fapp%2Fapp.component.html

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.css']
})
export class ShowErrorsComponent {
  @Input() ctrl: AbstractControl;
  @Input() errorService: ErrorService;

  ERROR_MESSAGE = {
    required: () => `Ce champ est obligatoire`,
    min: (par) => `Valeur minimale ${par.min}`,
    max: (par) => `Valeur maximale ${par.max}`,
    minlength: (par) => `${par.requiredLength} caractères minimum`,
    maxlength: (par) => `${par.requiredLength} caractères maximum`,
    pattern: (par) => `Format invalide`,
    email: () => 'Ce champ doit être un e-mail',
    server: (par) => par,
    matDatepickerParse: (par) => `Date invalide`,
  };

  constructor() {
  }

  shouldShowErrors(): boolean {
    if (this.ctrl != null && this.ctrl.errors != null) {
      return this.ctrl.touched;
    } else {
      if (this.errorService != null) {
        return this.errorService.getGlobalErrorMessage.length !== 0;
      } else {
        return false;
      }
    }
  }

  listOfErrors(): string[] {
    if (this.ctrl != null && this.ctrl.errors != null) {
      return Object.keys(this.ctrl.errors).map(
        err => {
          if (this.ERROR_MESSAGE[err] != null) {
            return this.ERROR_MESSAGE[err](this.ctrl.getError(err));
          } else {
            return err;
          }
        }
      );
    } else {
      if (this.errorService != null) {
        return this.errorService.getGlobalErrorMessage;
      } else {
        return [];
      }
    }
  }
}
