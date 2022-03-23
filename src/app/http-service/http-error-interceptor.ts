// import {Injectable} from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import {Observable, ObservableInput, of, throwError} from 'rxjs';
// import {catchError, map, take} from 'rxjs/operators';
// import {alert} from 'devextreme/ui/dialog';
// import { ErrorMessage } from './models/ErrorMessage';
// import {ValidationErrorField, Error422} from './models/Error422';
//
//
// @Injectable()
// export class HttpErrorInterceptor implements HttpInterceptor {
//   constructor() {}
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log('Passed through the interceptor in request');
//
//     return next.handle(request)
//       .pipe(
//         map(res => {
//           console.log('Passed through the interceptor in response');
//           console.log('response : ', res);
//           return res;
//         }),
//         catchError((httpError): ObservableInput<any> => {
//           console.log('ErreurInterceptor', httpError);
//           if (httpError instanceof HttpErrorResponse) {
//             console.log(httpError.error.constructor.name);
//             if (httpError.error instanceof ErrorEvent) {
//               // client side error
//               const result = new ErrorMessage(0, `Erreur de communication avec le serveur. (${httpError.error.message})`);
//               return throwError(result);
//             } else if (httpError.error instanceof ProgressEvent) {
//               // client side error
//               const result = new ErrorMessage(0, `Erreur de communication avec le serveur.`);
//               return throwError(result);
//             } else if (httpError.error instanceof Blob) {
//               console.log('converting blob');
//               return httpError.error.text().then(str => {
//                 const res = this.handleError(httpError, JSON.parse(str)).toPromise();
//                 console.log('res:', res);
//                 return res;
//               });
//             } else if (typeof httpError.error == 'object') {
//               return this.handleError(httpError, httpError.error).toPromise();
//             } else {
//               return throwError('Type de réponse inconnu.');
//             }
//           } else {
//             return throwError(httpError);
//           }
//         }));
//   }
//
//   handleError(httpErrorResponse: HttpErrorResponse, error: any) {
//     console.log('handleError', error);
//     // erreur de validation coté serveur
//     if (error.status === 422) {
//       if (error.errors && Object.keys(error.errors).length > 0) {
//         const result = this.buildError422(error);
//         return throwError(result);
//       } else {
//         const result = new ErrorMessage(error.status, error.detail || error.title);
//         return throwError(result);
//       }
//     } else if (error.status === 412) {
//       const result = new ErrorMessage(412, error.detail);
//       return throwError(result);
//     } else if (error.status === 401) {
//       const result = new ErrorMessage(401, 'Accés refusé.');
//       return throwError(result);
//     } else if (error.status === 403) {
//       const result = new ErrorMessage(403, 'Accés interdit.');
//       return throwError(result);
//     } else if (error.status === 404) {
//       const result = new ErrorMessage(404, 'Elément non trouvé.');
//       return throwError(result);
//     } else if (error.status >= 500) {
//       const msg = error.message || httpErrorResponse.statusText;
//       alert(msg, 'Erreur');
//       //this.openDialog(error);
//       const result = new ErrorMessage(httpErrorResponse.status, msg);
//       return throwError(result);
//     } else {
//       const msg = error.message || httpErrorResponse.statusText || 'Erreur inconnu.';
//       alert(msg, 'Erreur');
//       //this.openDialog(error);
//       const result = new ErrorMessage(httpErrorResponse.status, msg);
//       return throwError(result);
//     }
//   }
//
//   buildError422(e: any): Error422 { /*: ApplicationHttpErrorResponse { */
//     let messages = new Array<string>();
//     const model: Error422 = new Error422();
//     if (e.errors) {
//       Object.keys(e.errors).forEach(key => {
//         let fieldName = key;
//         if (fieldName.startsWith('$.')) {
//           fieldName = fieldName.substring(2);
//         }
//         const fieldError: ValidationErrorField = {
//           fieldname: fieldName,
//           message: Reflect.get(e.errors, key),
//         };
//         fieldError.message.forEach(m => {
//           messages.push(m);
//         });
//         model.ValidationErrors.push(fieldError);
//       });
//     }
//
//     model.status = 422;
//     model.message = messages.join('<br/>');
//     return model;
//   }
// }
