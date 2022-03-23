import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {RoutesEnum} from '../../../views/femmesbattues/RoutesEnum';
import {AuthService} from '../auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  // public authToken;
  // private isAuthenticated = true; // Set this value dynamically

  constructor(private router: Router, private authService: AuthService) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      await this.authService.tryLoadFromSession();
      if (this.authService.isLoggedIn) {
        return true;
      }
    }

    // await await this.router.navigate([RoutesEnum.LOGIN]);
    await this.router.navigate([RoutesEnum.AUTH, RoutesEnum.LOGIN], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
