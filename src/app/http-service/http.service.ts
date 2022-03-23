import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpErrorHandler} from './http-error-handler';

@Injectable()
export class HttpService {
  constructor(private httpClient: HttpClient) {
  }

  // /**
  //  * Permets de gérer les erreurs lors de l'exécution d'une requête http
  //  * @param httpMethod callback à implémenter et qui doit lancer la requête http
  //  * (reçoit en paramètre un HttpClient)
  //  * @param onError callback à implémenter (optionel) pour gérer les erreurs.
  //  * Renvoyer true si l'erreur est géré par le callback et ne nécessite pas l'affichage d'un message.
  //  * Reçoit en paramètre l'erreur
  //  * @example
  //  */
  // async try(httpMethod: (httpClient: HttpClient) => Promise<void>, onError?: (error: ErrorMessage | Error422) => boolean) {
  //   try {
  //     await httpMethod(this.httpClient);
  //   } catch (e) {
  //     if (onError != null) {
  //       if (!onError(e)) {
  //         await this.showError(e);
  //       }
  //     } else {
  //       await this.showError(e);
  //     }
  //     console.log(e);
  //   }
  // }

  request<TModel>(httpMethod: (httpClient: HttpClient) => Promise<TModel>): HttpErrorHandler<TModel> {
    return new HttpErrorHandler<TModel>(this.httpClient, httpMethod);
  }
}
