import {NgModule, OnInit} from '@angular/core';
import {FemmesBattuesRoutingModule} from './FemmesBattues-routing.module';
import {GlobalVariables} from './global/global_variables';
import {Router} from '@angular/router';
import {RoutesEnum} from './RoutesEnum';
import {ErrorComponent} from './Authentification/error/error.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  imports: [
    FemmesBattuesRoutingModule,
    MatDialogModule,
  ],
  declarations: [
    ErrorComponent],
  exports: [],
  providers: [],

})
export class FemmesBattuesModule /*implements OnInit*/ {

  constructor(
    private variables: GlobalVariables,
    private router: Router) {
  }

  // ngOnInit(): void {
  //   this.variables.currentUser = null;
  //   this.router.navigate([RoutesEnum.ROOT]);
  // }
}
