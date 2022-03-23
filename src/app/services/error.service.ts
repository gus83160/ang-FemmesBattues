import {FormGroup} from '@angular/forms';
import {ValidationError} from '../http-service/models/ValidationError';
import {HttpError} from '../http-service/models/HttpError';

/* @Injectable({
  providedIn: 'root'
}) */
export class ErrorService {
  get getGlobalErrorMessage(): string[] {
    return this.globalErrorMessage;
  }
  private globalErrorMessage: string[];

  constructor(private form: FormGroup) {
    this.globalErrorMessage = [];
  }

  loadError(e: any, form: FormGroup): void {
    // console.log(JSON.stringify(e));
    if (e instanceof ValidationError) {
      e.ValidationErrors.forEach(fieldError => {
        const errorDesc = fieldError.message.join(', ');
        const field = form.controls[fieldError.fieldname];
        if (field !== null) {
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
    } else if (e instanceof HttpError) {
      this.addError(e.message);
      // this.globalErrorMessage = e.message;
    } else if (typeof e === 'string') {
      this.addError(e);
      // this.globalErrorMessage = e;
    } else if (e.error instanceof ErrorEvent) {
      // erreur locale au navigateur
      this.addError('Erreur : ' + e.error.message);
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
