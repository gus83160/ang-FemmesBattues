import { Component, OnInit } from '@angular/core';
//import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
	selector: 'app-defaultrouting',
	template: '',
})
export class DefaultroutingComponent {
  constructor(protected router: Router) {
	  console.log("defaultrouting");
    this.router.navigate(['/login']);
  }

// 	constructor(private keycloakService: KeycloakService, protected router: Router) {
// 		if (this.keycloakService.isUserInRole('compta', 'webcompta-api')) {
// 			this.router.navigate(['/comptaweb/admin/drivers']);
// 		} else {
// 			this.router.navigate(['/comptaweb/caisse-journaliere']);
// 		}
// 	}

}
