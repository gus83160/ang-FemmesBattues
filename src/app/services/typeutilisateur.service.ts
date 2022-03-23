import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {TypeUtilisateur} from '../models/type-utilisateur';
import {HttpService} from '../http-service/http.service';
import {HttpErrorHandler} from '../http-service/http-error-handler';

@Injectable({
  providedIn: 'root'
})
export class TypeUtilisateurService {
  constructor(private httpService: HttpService) { }
  getAllTypeUtilisateur(): HttpErrorHandler<TypeUtilisateur[]> {
    return this.httpService.request(async httpClient => {
      return httpClient.get<TypeUtilisateur[]>(environment.url + '/typeutilisateur/all_type_utilisateur_details').toPromise();
    })
  }
}
