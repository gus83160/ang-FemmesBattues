import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../views/femmesbattues/Authentification/auth.service';
import { GlobalVariables } from '../views/femmesbattues/global/global_variables';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authentificationService: AuthService,
                private variables: GlobalVariables) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentCredential = this.authentificationService.userAuth;
        if (currentCredential != null) {
           request = request.clone({
              setHeaders: {
                 Authorization: `Basic ${currentCredential}`
              }
           });
        }
        return next.handle(request);
    }
}
