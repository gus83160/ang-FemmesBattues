import {ActivatedRouteSnapshot, CanLoad, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
//import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";

@Injectable()
export class AuthGuard
//extends KeycloakAuthGuard
{

// 	constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
// 		super(router, keycloakAngular);
// 	}
//
// 	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
// 		return new Promise<boolean | UrlTree>(async (resolve, reject) => {
// 			try {
// 				this.authenticated = await this.keycloakAngular.isLoggedIn();
// 				this.roles = await this.keycloakAngular.getUserRoles(true);
// 				const result = await this.isAccessAllowed(route, state);
// 				if (result != true) {
// 					this.router.navigate(['/sessions/not-found']);
// 				}
// 				resolve(result);
// 			} catch (error) {
// 				reject('An error happened during access validation. Details:' + error);
// 			}
// 		});
// 	}
//
// 	isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
// 		return new Promise((resolve, reject) => {
// 			if (!this.authenticated) {
// 				this.keycloakAngular.login()
// 					.catch(e => console.error(e));
// 				return reject(false);
// 			}
//
// 			const requiredRoles: string[] = route.data.roles;
// 			if (!requiredRoles || requiredRoles.length === 0) {
// 				return resolve(true);
// 			} else {
// 				if (!this.roles || this.roles.length === 0) {
// 					resolve(false);
// 				}
// 				resolve(requiredRoles.every(role => this.roles.indexOf(role) > -1));
// 			}
// 		});
// 	}



}
