import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {RoutesEnum} from '../views/femmesbattues/RoutesEnum';

@Component({
  selector: 'app-defaultrouting',
  template: '',
})
export class DefaultroutingComponent {
  constructor(
    protected router: Router
  ) {
    // console.log("defaultrouting");

    this.router.navigate([RoutesEnum.ROOT]).then(() => {});
  }

// 	constructor(private keycloakService: KeycloakService, protected router: Router) {
// 		if (this.keycloakService.isUserInRole('compta', 'webcompta-api')) {
// 			this.router.navigate(['/comptaweb/admin/drivers']);
// 		} else {
// 			this.router.navigate(['/comptaweb/caisse-journaliere']);
// 		}
// 	}

}
