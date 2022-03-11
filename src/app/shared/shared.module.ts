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
import {AuthGuardService} from './services/auth/auth-guard.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ErrorComponent} from '../views/femmesbattues/error/error.component';
import {LoginComponent} from '../views/femmesbattues/auth/login/login.component';
import {DialogueService} from '../views/femmesbattues/dialogue/dialogue.service';
import {ShowErrorsComponent} from '../show-errors.component';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    MatDialogModule,
  ],
  providers: [
    ThemeService,
    NavigationService,
    RoutePartsService,
    DialogueService,
//    KeycloackAuthGuard,
    AppConfirmService,
    AppLoaderService,
    AuthGuardService
  ],
  declarations: [
    OnlyNumberDirective,
    ErrorComponent,
    ShowErrorsComponent,
  ],
  exports: [
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    OnlyNumberDirective,
    ErrorComponent,
    ShowErrorsComponent,
  ]
})
export class SharedModule {
}
