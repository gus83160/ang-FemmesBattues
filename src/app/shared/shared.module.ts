import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// SERVICES
import {ThemeService} from './services/theme.service';
import {NavigationService} from './services/navigation.service';
import {RoutePartsService} from './services/route-parts.service';
import {AppConfirmService} from './services/app-confirm/app-confirm.service';
import {AppLoaderService} from './services/app-loader/app-loader.service';

import {SharedComponentsModule} from './components/shared-components.module';
import {SharedPipesModule} from './pipes/shared-pipes.module';
import {SharedDirectivesModule} from './directives/shared-directives.module';
// import {KeycloackAuthGuard} from './keycloack-auth-guard.service';
import {OnlyNumberDirective} from './directives/only-number.directive';
import {AuthGuard} from './services/auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule
  ],
  providers: [
    ThemeService,
    NavigationService,
    RoutePartsService,
//    KeycloackAuthGuard,
    AppConfirmService,
    AppLoaderService,
    AuthGuard
  ],
  declarations: [
    OnlyNumberDirective
  ],
  exports: [
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    OnlyNumberDirective
  ]
})
export class SharedModule {
}
