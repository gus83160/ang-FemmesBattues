import {Component, OnInit, Input} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {ErrorService} from './services/error.service';

// https://mdmoin07.medium.com/writing-validation-message-dynamically-angular-c032c1c2e0d4
// https://stackblitz.com/edit/angular-dynamic-validation-messages?file=src%2Fapp%2Fapp.component.html

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.css']
})
export class ShowErrorsComponent implements OnInit {

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

  ngOnInit(): void {
  }

  shouldShowErrors(): boolean {
    if (this.ctrl) {
      return this.ctrl.errors && this.ctrl.touched;
    } else {
      return this.errorService.getGlobalErrorMessage.length !== 0;
    }
  }

  listOfErrors(): string[] {
    if (this.ctrl) {
      return Object.keys(this.ctrl.errors).map(
        err => {
          if (this.ERROR_MESSAGE[err]) {
            return this.ERROR_MESSAGE[err](this.ctrl.getError(err));
          } else {
            return err;
          }
        }
      );
    } else {
      return this.errorService.getGlobalErrorMessage;
    }
  }
}
