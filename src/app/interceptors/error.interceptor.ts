import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ValidationErrorField, ValidationErrorResponse} from '../models/validation_error_response';
import {ErrorMessage} from '../models/ErrorMessage';
import {ErrorComponent} from '../views/femmesbattues/error/error.component';
import {MatDialog} from '@angular/material/dialog';
import { alert } from "devextreme/ui/dialog"


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public dialog: MatDialog
    ) {
  }

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(ErrorComponent, {
      width: '500px',
      data: message,
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
        // erreur de validation coté serveur
        if (err.status === 422) {
          if (err.error && err.error.errors && Object.keys(err.error.errors).length > 0) {
            const result = this.buildResponse(err.error);
            return throwError(result);
          } else {
            const result = new ErrorMessage(422, err.error.detail);
            return throwError(result);
          }
        } else if (err.status === 412) {
          const result = new ErrorMessage(412, err.error.detail);
          return throwError(result);
        } else if (err.status === 401) {
          const result = new ErrorMessage(401,'Accés refusé.');
          return throwError(result);
        } else if (err.status === 403) {
          const result = new ErrorMessage(403,'Accés interdit.');
          return throwError(result);
        } else if (err.status === 404) {
          const result = new ErrorMessage(404,'Elément non trouvé.');
          return throwError(result);
        } else {
          const error = err.message || err.statusText;
          alert(error, 'Erreur');
          //this.openDialog(error);
          return throwError(error);
        }
//       if (err.status === 401) {
//         // auto logout if 401 response returned from api
// //                location.reload(true);
//       }
    }));
  }

  buildResponse(e: any): ValidationErrorResponse { /*: ApplicationHttpErrorResponse { */
    const model: ValidationErrorResponse = new ValidationErrorResponse();
    if (e.errors) {
      Object.keys(e.errors).forEach(key => {
        let fieldName = key;
        if (fieldName.startsWith('$.')) {
          fieldName = fieldName.substr(2);
        }
        const fieldError: ValidationErrorField = {
          fieldname: fieldName,
          message: Reflect.get(e.errors, key),
        };
        model.ValidationErrors.push(fieldError);
      });
    }
    return model;
  }
}
