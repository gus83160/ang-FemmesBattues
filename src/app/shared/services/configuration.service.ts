import { Injectable } from '@angular/core';
// import {ConfigurationProperty} from "../models/configurationProperty.model";
// import {BehaviorSubject, Observable} from "rxjs";
// import {KeycloakService} from "keycloak-angular";

@Injectable({
	providedIn: 'root'
})
export class ConfigurationService {

	// private _configurationProperties: BehaviorSubject<ConfigurationProperty[]> = new BehaviorSubject<ConfigurationProperty[]>([]);
  //
	// constructor() {
  //
	// }

// 	loadConfiguration() {
// 		this.updateConfigurationProperties();
//
// 		if (this.keycloakService.isUserInRole('driver', 'webcompta-api')) {
// 			this._service.getFiscalPeriods().subscribe(
// 				(resp) => {
// 					this._fiscalPeriod.next(resp);
// 					if (resp.length > 0) {
// 						let fiscalPeriod = null;
// 						if (localStorage.getItem('fiscal_period') !== null) {
// 							fiscalPeriod = JSON.parse(localStorage.getItem('fiscal_period'));
// 						} else {
// 							fiscalPeriod = resp[0];
// 						}
//
// 						this.updateFiscalPeriod(fiscalPeriod);
// 					}
// 				}
// 			)
// 		}
// 	}

// 	public getConfigurationProperties(): Observable<ConfigurationProperty[]> {
// 		return this._configurationProperties;
// 	}


}
