import { APP_INITIALIZER, NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { Component, OnInit, Input, ViewChild, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, OnDestroy, ComponentRef } from "@angular/core";
import { RouterModule, Routes  } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	PerfectScrollbarModule,
	PERFECT_SCROLLBAR_CONFIG,
	PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { HttpClient, HttpClientModule,HTTP_INTERCEPTORS }         from '@angular/common/http';
import {DatePipe}                               from '@angular/common';
import { FlexLayoutModule}                      from '@angular/flex-layout';
import { registerLocaleData }                   from '@angular/common';
import localeFr                                 from '@angular/common/locales/fr';

import { InMemoryWebApiModule }                 from 'angular-in-memory-web-api';
//import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';

import { TranslateModule, TranslateLoader }     from '@ngx-translate/core';
import { TranslateHttpLoader }                  from '@ngx-translate/http-loader';

import { InMemoryDataService }                  from './shared/inmemory-db/inmemory-db.service';
import { ErrorHandlerService }                  from './shared/services/error-handler.service';
import { SharedModule }                         from './shared/shared.module';
// import { SharedMaterialModule }                 from './shared/shared-material.module';
// import { SharedPipesModule }                    from './shared/pipes/shared-pipes.module';


import { rootRouterConfig }                     from './app.routing';
import { AppComponent }                         from './app.component';
import {DefaultroutingComponent}                from "./defaultrouting/defaultrouting.component";
import { Variables }                            from './views/femmesbattues/global/variables';
import { BasicAuthInterceptor }                 from './views/femmesbattues/Authentification/basic-auth.interceptor';
import { ErrorInterceptor }                     from './views/femmesbattues/Authentification/error.interceptor';



registerLocaleData(localeFr, 'fr');

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
	return new TranslateHttpLoader(httpClient);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

// function initializeKeycloak(keycloak: KeycloakService) {
// 	return () =>
// 		keycloak.init({
// 			config: {
// 				url: 'https://auth.france-taxi.com/auth',
// 				realm: 'compta-driver',
// 				clientId: 'webcompta-web',
// 			},
// 			initOptions: {
// 				onLoad: 'check-sso',
// 				//silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
// 				checkLoginIframe: false,
// 			},
// 			bearerExcludedUrls: ['/assets', '/clients/public'],
// 		});
// }

@NgModule({
	imports: [
	//	LoginComponent,
  	BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
//		SharedMaterialModule,
		HttpClientModule,
		PerfectScrollbarModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true}),
		RouterModule.forRoot(rootRouterConfig, { useHash: false, onSameUrlNavigation: 'reload' }),
		FlexLayoutModule
	//	SharedPipesModule
	],
	// declarations: [AppComponent, DefaultroutingComponent, MycurrencyPipe],
	declarations: [AppComponent, DefaultroutingComponent],
	providers: [
		{ provide: ErrorHandler, useClass: ErrorHandlerService },
		{ provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
		DatePipe,
		{provide: LOCALE_ID, useValue: 'fr' },
		Variables
	],
	exports: [RouterModule],
	bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
	ngOnInit(): void {
    console.log("AppModule");
  }
}
