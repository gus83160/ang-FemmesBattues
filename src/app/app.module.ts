import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import {SharedModule} from './shared/shared.module';

import {rootRouterConfig} from './app.routing';
import {AppComponent} from './app.component';
import {DefaultroutingComponent} from './defaultrouting/defaultrouting.component';
import {BasicAuthInterceptor} from './views/femmesbattues/Authentification/basic-auth.interceptor';
import {ErrorInterceptor} from './views/femmesbattues/Authentification/error.interceptor';
import {SupprimerComponent} from './views/femmesbattues/dialogue/supprimer.component';


registerLocaleData(localeFr, 'fr');

// // AoT requires an exported function for factories
// export function HttpLoaderFactory(httpClient: HttpClient) {
// 	return new TranslateHttpLoader(httpClient);
// }

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
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MatDialogModule,
    HttpClientModule,
    PerfectScrollbarModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true}),
    RouterModule.forRoot(rootRouterConfig, {useHash: false, onSameUrlNavigation: 'reload'}),
    FlexLayoutModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatMomentDateModule,
    // 	SharedPipesModule
  ],
  // declarations: [AppComponent, DefaultroutingComponent, MycurrencyPipe],
  declarations: [AppComponent, DefaultroutingComponent, SupprimerComponent],
  providers: [
    // {provide: ErrorHandler, useClass: ErrorHandlerService},
    {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    DatePipe,
    // {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    // {provide: LOCALE_ID, useValue: 'fr'},
//    Variables
  ],
  exports: [
    RouterModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
