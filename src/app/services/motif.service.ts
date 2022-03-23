import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { IMotif } from '../models/IMotif';
import {HttpErrorHandler} from '../http-service/http-error-handler';
import {HttpService} from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class MotifService {
  constructor(private httpService: HttpService) { }

  getAllMotif(): HttpErrorHandler<IMotif[]> {
    return this.httpService.request(async httpClient => {
      return await httpClient.get<IMotif[]>(environment.url + '/motif/all_motif_details').toPromise();
    });
  }

  // getAllMotif(): Observable<IMotif[]> {
  //   return this.http.get<IMotif[]>(environment.url + '/motif/all_motif_details' );
  // }
}
