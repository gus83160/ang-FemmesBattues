import {Injectable} from '@angular/core';
import {ValidationErrorResponse} from '../models/validation_error_response';
import {FormGroup} from '@angular/forms';
import {ErrorMessage} from '../models/ErrorMessage';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  get getGlobalErrorMessage(): string[] {
    return this.globalErrorMessage;
  }
  private globalErrorMessage: string[];

  constructor(private form: FormGroup) {
    this.globalErrorMessage = [];
  }

  loadError(e: any, form): void {
    // console.log(JSON.stringify(e));
    if (e instanceof ValidationErrorResponse) {
      e.ValidationErrors.forEach(fieldError => {
        const errorDesc = fieldError.Description.join(', ');
        const field = form.controls[fieldError.Name];
        if (field) {
          field.setErrors({server: errorDesc});
        } else {
          this.addError(errorDesc);
          // if (this.globalErrorMessage.length === 0) {
          //   this.globalErrorMessage = errorDesc;
          // } else {
          //   this.globalErrorMessage = this.globalErrorMessage + ', ' + errorDesc;
          // }
        }
      });
    } else if (e instanceof ErrorMessage) {
      this.addError(e.message);
      // this.globalErrorMessage = e.message;
    } else if (typeof e === 'string') {
      this.addError(e);
      // this.globalErrorMessage = e;
    } else if (e.error instanceof ErrorEvent) {
      // erreur locale au navigateur
      const result = new ErrorMessage('Erreur : ' + e.error.message);
    } else {
      this.addError('Erreur innatendue.');
      // this.globalErrorMessage = 'Erreur innatendue.';
    }
  }

  reset(): void {
    this.globalErrorMessage = [];
  }

  async try(func: () => void): Promise<void> {
    this.globalErrorMessage = [];
    try {
      await func();
    } catch (e) {
      this.loadError(e, this.form);
      return;
    }
  }

  addError(msg: string): void {
    this.globalErrorMessage.push(msg);
  }
}
