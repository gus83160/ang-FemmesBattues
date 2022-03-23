import {NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, APP_INITIALIZER} from '@angular/core';
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
import {BasicAuthInterceptor} from './interceptors/basic-auth.interceptor';
import {SupprimerComponent} from './views/femmesbattues/dialogue/supprimer.component';
import config from 'devextreme/core/config';
import {locale, loadMessages} from 'devextreme/localization';
// @ts-ignore
import * as frMessages from 'devextreme/localization/messages/fr.json';
import {AngularDateHttpInterceptor} from './interceptors/date-transform-interceptor';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule
} from '@angular/material/core';
import {DxButtonModule, DxDataGridModule, DxDropDownButtonModule, DxFormModule, DxLoadPanelModule, DxPopupModule} from 'devextreme-angular';
import {PageNotFoundComponent} from './shared/components/not-found/page-not-found.component';
import {HttpServiceModule} from './http-service/http-service.module';
import {MatButtonModule} from '@angular/material/button';
import {Platform} from '@angular/cdk/platform';
import {CustomDateAdapter} from './helpers/custom-date-adapter';

registerLocaleData(localeFr, 'fr');

// // AoT requires an exported function for factories
// export function HttpLoaderFactory(httpClient: HttpClient) {
// 	return new TranslateHttpLoader(httpClient);
// }

const initializeLocalization = () => () => {
  loadMessages(frMessages);
  locale('fr');
};

config({
  defaultCurrency: 'EUR'
});

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    HttpServiceModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(rootRouterConfig, {useHash: false, onSameUrlNavigation: 'reload'}),
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    MatNativeDateModule,

    DxDataGridModule,
    DxPopupModule,
    DxLoadPanelModule,
    DxButtonModule,
    DxFormModule,
    DxDropDownButtonModule,
  ],
  // declarations: [AppComponent, DefaultroutingComponent, MycurrencyPipe],
  declarations: [AppComponent, DefaultroutingComponent, SupprimerComponent, PageNotFoundComponent],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},

    // pour gérer le bon format de date quand on tape une date au clavier dans un matdatetimepickeer
    {provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE, Platform] },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLocalization,
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: AngularDateHttpInterceptor, multi: true },

    {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
    DatePipe,
  ],
  exports: [
    RouterModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}

