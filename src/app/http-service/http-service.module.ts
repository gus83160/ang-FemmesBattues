import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './http.service';
import {DxFormModule} from 'devextreme-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    DxFormModule,
  ]
})

export class HttpServiceModule {
  static forRoot(): ModuleWithProviders<HttpServiceModule> {
    return {
      ngModule: HttpServiceModule,
      providers: [
        // {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
        HttpService,
      ]
    };
  }
}
