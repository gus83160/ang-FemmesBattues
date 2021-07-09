import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
//import {KeycloakService} from "keycloak-angular";

import { Variables } from '../../views/femmesbattues/global/variables';

interface IMenuItem {
	type: string; // Possible values: link/dropDown/icon/separator/extLink
	name?: string; // Used as display text for item and title for separator type
	state?: string; // Router state
	icon?: string; // Material icon name
	tooltip?: string; // Tooltip text
	disabled?: boolean; // If true, item will not be appeared in sidenav.
	sub?: IChildItem[]; // Dropdown items
	badges?: IBadge[];
}
interface IChildItem {
	type?: string;
	name: string; // Display text
	state?: string; // Router state
	icon?: string;
	sub?: IChildItem[];
}

interface IBadge {
	color: string; // primary/accent/warn/hex color codes(#fff000)
	value: string; // Display text
}

@Injectable()
export class NavigationService {
	constructor(private variables: Variables
//		private keycloakService:KeycloakService
	) {}


	plainMenu: IMenuItem[] = [
		{
			name: "",
			type: "link",
//			icon: "dashboard",
//			  state: "course",
	  	disabled: true
		},
		{
			name: "Information",
			type: "link",
//			icon: "dashboard",
			  state: "information",
	  	disabled: true
		},
		{
			name: "Demande",
			type: "link",
//			icon: "dashboard",
			  state: "recupcourse",
	  	disabled: true
		},
		{
			name: "Courses",
			type: "link",
//			icon: "dashboard",
			  state: "demandeliste",
	  	disabled: true
		},
		{
			name: "Nouvelle Demande",
			type: "link",
//			icon: "local_taxi",
			state: "demandenew",
			disabled: true
		},
		{
			name: "Utilisateur",
			type: "link",
//			icon: "local_taxi",
			state: "utilisateurliste",
			disabled: true
		}
	];

	// Icon menu TITLE at the very top of navigation.
	// This title will appear if any icon type item is present in menu.
	iconTypeMenuTitle: string = "Frequently Accessed";
	// sets iconMenu as default;
	menuItems = new BehaviorSubject<IMenuItem[]>(this.plainMenu);
	// navigation component has subscribed to this Observable
	menuItems$ = this.menuItems.asObservable();

	// Customizer component uses this method to change menu.
	// You can remove this method and customizer component.
	// Or you can customize this method to supply different menu for
	// different user type.
	publishNavigationChange(menuType: string) {
	  if (this.variables.IdTypeUtilisateur == this.variables.TypePrescripteur)
   	  this.plainMenu[0].name = "Prescripteur"
	  if (this.variables.IdTypeUtilisateur == this.variables.TypeChauffeur)
   	  this.plainMenu[0].name = "Chauffeur"
	  if (this.variables.IdTypeUtilisateur == this.variables.TypeAdmin)
   	  this.plainMenu[0].name = "Admin"
    this.plainMenu[0].type  = 'separator';
    this.plainMenu[0].disabled  = false;
    this.plainMenu[3].disabled  = false;

	  if (this.variables.IdTypeUtilisateur == this.variables.TypeChauffeur)  {
	     this.plainMenu[1].disabled  = false;
	     this.plainMenu[2].disabled  = false;
	     }
	  else
	     this.plainMenu[4].disabled  = false;

	  if (this.variables.IdTypeUtilisateur == this.variables.TypeAdmin) {
	     this.plainMenu[1].disabled  = false;
	     this.plainMenu[5].disabled  = false;
	  }
		this.menuItems.next(this.plainMenu);
	}
}
