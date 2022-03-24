import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {alert} from 'devextreme/ui/dialog';
import {HttpError} from './models/HttpError';
import {ValidationError, ValidationErrorField} from './models/ValidationError';
import {HttpResult} from './models/HttpResult';

export class HttpErrorHandler<TModel> {
  private _catchAllErrors: ((error: ValidationError | HttpError) => void) | null = null;
  private _catchOtherErrors: ((error: ValidationError | HttpError) => void) | null = null;
  private errorMap: Map<number, any> = new Map<number, any>();
  private customMessages: Map<number, string> = new Map<number, string>();
  private _error: ValidationError | HttpError;

  public get error() { return this._error; }

  constructor(private httpClient: HttpClient, private httpMethod: (httpClient: HttpClient) => Promise<TModel>) {
  }

  public async execute(onResult? : (result: TModel) => void): Promise<HttpResult<any>> {
    let res: HttpResult<TModel> = new HttpResult<TModel>();

    try {
      res.data = await this.httpMethod(this.httpClient);
      res.isOk = true;
      if (onResult) {
        await onResult(res.data);
      }
    } catch (ex: any) {
      if (ex.status !== undefined) {
        let status: number = ex.status;
        const err = await this.analyseResult(ex);
        if (ex.status === 422 && err instanceof HttpError) {
          status = 412;
        }
        this._error = err;

        const errorMethod = this.errorMap.get(status);
        if (errorMethod != null) {
          errorMethod(err);
          if (this._catchOtherErrors != null) {
            this._catchOtherErrors(err);
          }
        } else {
          if (this._catchAllErrors != null) {
            this._catchAllErrors(err);
          } else {
            await alert(`${err.message}`, `Erreur`);
          }
        }
      } else {
        await alert(`Erreur inconnu`, `Erreur`);
      }
    }

    return res;
  }

  private async analyseResult(httpError: any) : Promise<HttpError | ValidationError> {
    if (httpError instanceof HttpErrorResponse) {
      if (httpError.error instanceof ErrorEvent) {
        // client side error
        return this.buildHttpError(1000, `Erreur de communication avec le serveur. (${httpError.error.message})`);
      } else if (httpError.error instanceof ProgressEvent) {
        // client side error
        return this.buildHttpError(1001, `Erreur de communication avec le serveur.`);
      } else if (httpError.error instanceof Blob) {
        const str = await httpError.error.text();
        return this.analyseError(httpError, JSON.parse(str));
      } else if (typeof httpError.error.status !== "undefined") {
        return this.analyseError(httpError, httpError.error);
      } else {
        return this.buildHttpError(1002, 'Type de réponse inconnu.');
      }
    } else {
      return this.buildHttpError(1003, 'Type de réponse inconnu.');
    }
  }

  private analyseError(httpErrorResponse: HttpErrorResponse, error: any) : HttpError | ValidationError {
    // erreur de validation coté serveur
    if (httpErrorResponse.status === 422) {
      if (error.errors != null && Object.keys(error.errors).length > 0) {
        return this.buildValidationError(error);
      } else {
        //return this.buildHttpError(httpErrorResponse.status, (error.detail == null ? error.title : error.detail));
        return this.buildHttpError(httpErrorResponse.status, error.detail ?? error.title);
      }
    } else if (httpErrorResponse.status === 412) {
      return this.buildHttpError(412, error.detail);
    } else if (httpErrorResponse.status === 401) {
      return this.buildHttpError(401, 'Accés refusé.');
    } else if (httpErrorResponse.status === 403) {
      return this.buildHttpError(403, 'Accés interdit.');
    } else if (httpErrorResponse.status === 404) {
      return this.buildHttpError(404, 'Elément non trouvé.');
    } else if (httpErrorResponse.status >= 500) {
      const msg = error.message ?? httpErrorResponse.statusText;
      //this.openDialog(error);
      return this.buildHttpError(httpErrorResponse.status, msg);
    } else {
      const msg = (error.message ?? httpErrorResponse.statusText) ?? 'Erreur inconnu de type : ' + httpErrorResponse.status;
      return this.buildHttpError(httpErrorResponse.status, msg);
    }
  }

  private buildHttpError(statusCode: number, message: string): HttpError {
    let customMessage = this.customMessages.get(statusCode);
    if (customMessage == null) {
      customMessage = message;
    }
    return new HttpError(statusCode, customMessage);
  }

  private buildValidationError(e: any): ValidationError {
    let messages = new Array<string>();
    const model: ValidationError = new ValidationError();
    if (e.errors != null) {
      Object.keys(e.errors).forEach(key => {
        let fieldName = key;
        if (fieldName.startsWith('$.')) {
          fieldName = fieldName.substring(2);
        }
        const fieldError: ValidationErrorField = {
          fieldname: fieldName,
          message: Reflect.get(e.errors, key),
        };
        fieldError.message.forEach(m => {
          messages.push(`\'${fieldName}\' : ${m}`);
        });
        model.ValidationErrors.push(fieldError);
      });
    }

    model.status = 422;
    model.message = messages.join('<br/>');
    return model;
  }

  /**
   * Erreurs de validation liées aux données des champs envoyés (erreur : 422)
   * @param onError
   */
  public catchValidationError(onError: (error: ValidationError) => void): HttpErrorHandler<TModel> {
    this.errorMap.set(422, (err: ValidationError) => onError(err));
    return this;
  }

  /**
   * Erreur liée au traitement (erreur : 412)
   * @param onError
   */
  public catchApplicationError(onError: (error: HttpError) => void): HttpErrorHandler<TModel> {
    this.errorMap.set(412, (err: HttpError) => onError(err));
    return this;
  }


  /**
   * Permets de catcher une erreur http précise
   * @param statusCode
   * @param onError
   */
  public catch(statusCode: number, onError: (error: HttpError) => void): HttpErrorHandler<TModel> {
    this.errorMap.set(statusCode, (err: HttpError) => onError(err));
    return this;
  }


  /**
   * Catche la totalité des erreurs http,
   * @param onError
   */
  public catchAllErrors(onError: (error: ValidationError | HttpError) => void): HttpErrorHandler<TModel> {
    this._catchAllErrors = onError;
    return this;
  }

  /**
   * catche les autres erreurs qui n'ont pas été spécifiquement catché
   * @param onError
   */
  public catchOtherErrors(onError: (error: ValidationError | HttpError) => void): HttpErrorHandler<TModel> {
    this._catchOtherErrors = onError;
    return this;
  }

  withMessage(statusCode: number, messageToShow: string) : HttpErrorHandler<TModel> {
    if (statusCode === 422) {
      throw 'withMessage can\'t be used with status code 422';
    }
    this.customMessages.set(statusCode, messageToShow);
    return this;
  }
}
