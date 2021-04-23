import {
	Component,
	OnInit,
	EventEmitter,
	Input,
	Output,
	Renderer2,
	ChangeDetectionStrategy,
	ChangeDetectorRef, NgZone
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
//import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";
import {ConfigurationService} from "../../services/configuration.service";
import {FiscalPeriod} from "../../models/fiscalPeriod.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Component({
	selector: 'app-header-side',
	templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
	@Input() notificPanel;
	public availableLangs = [{
		name: 'FR',
		code: 'fr',
		flag: 'flag-icon-fr'
	}]
	currentLang = this.availableLangs[0];

	public egretThemes;
	public layoutConf:any;

	public fiscalPeriods: BehaviorSubject<FiscalPeriod[]> = new BehaviorSubject<FiscalPeriod[]>([]);
	public fiscalPeriod: BehaviorSubject<FiscalPeriod> = new BehaviorSubject<FiscalPeriod>(null);

	constructor(
//		public keycloakService:KeycloakService,
		private themeService: ThemeService,
		private layout: LayoutService,
		public translate: TranslateService,
		private renderer: Renderer2,
		private router: Router,
		public configurationService: ConfigurationService
	) {}

	ngOnInit() {
		this.egretThemes = this.themeService.egretThemes;
		this.layoutConf = this.layout.layoutConf;
		this.translate.use(this.currentLang.code);
	}
	setLang(lng) {
		this.currentLang = lng;
		this.translate.use(lng.code);
	}
	changeTheme(theme) {
		// this.themeService.changeTheme(theme);
	}
	toggleNotific() {
		this.notificPanel.toggle();
	}
	toggleSidenav() {
		if(this.layoutConf.sidebarStyle === 'closed') {
			return this.layout.publishLayoutChange({
				sidebarStyle: 'full'
			})
		}
		this.layout.publishLayoutChange({
			sidebarStyle: 'closed'
		})
	}

	toggleCollapse() {
		// compact --> full
		if(this.layoutConf.sidebarStyle === 'compact') {
			return this.layout.publishLayoutChange({
				sidebarStyle: 'full',
				sidebarCompactToggle: false
			}, {transitionClass: true})
		}

		// * --> compact
		this.layout.publishLayoutChange({
			sidebarStyle: 'compact',
			sidebarCompactToggle: true
		}, {transitionClass: true})

	}

	onSearch(e) {
		//   console.log(e)
	}

	logout() {
//		this.keycloakService.logout(document.baseURI);
	}

	profile() {
		this.router.navigate(["/comptaweb/my-profile"]);
	}

}
