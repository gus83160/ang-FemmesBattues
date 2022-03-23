import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {IStructureRequerante} from '../models/i-structure-requerante';
import {HttpService} from '../http-service/http.service';
import {HttpErrorHandler} from '../http-service/http-error-handler';

@Injectable({
  providedIn: 'root'
})
export class StructureRequeranteService {
  constructor(private httpService: HttpService) {
  }

  getAllStructureRequerante(type: number): HttpErrorHandler<IStructureRequerante[]> {
    return this.httpService.request(async httpClient => {
      return await httpClient.get<IStructureRequerante[]>(environment.url + '/structurerequerante/all_structure_requerante_details/' + type.toString()).toPromise();
    });
  }

  // getAllStructureRequerante(type: number): Observable<IStructureRequerante[]> {
  //   return this.http.get<IStructureRequerante[]>(environment.url + '/structurerequerante/all_structure_requerante_details/' + type.toString());
  // }
}
