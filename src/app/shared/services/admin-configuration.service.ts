import { Injectable } from '@angular/core';
import {ConfigurationProperty} from "../models/configurationProperty.model";
import {ApercucomptaService} from "./apercucompta.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class AdminConfigurationService {

	private configurationProperties: BehaviorSubject<ConfigurationProperty[]> = new BehaviorSubject<ConfigurationProperty[]>([]);

	constructor(private _service: ApercucomptaService) {
		this.loadAdminConfiguration();
	}

	loadAdminConfiguration() {
		this._service.adminGetConfigurationProperties().subscribe(
			(resp) => {
				this.configurationProperties.next(resp);
			});
	}

	public getConfigurationProperties(): Observable<ConfigurationProperty[]> {
		return this.configurationProperties;
	}

}