import {
  Component,
  OnInit,
  Input,
  Renderer2, OnDestroy,
} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {LayoutService} from '../../services/layout.service';
import {FiscalPeriod} from '../../models/fiscalPeriod.model';
import {BehaviorSubject, Subscription} from 'rxjs';
import {GlobalVariables} from '../../../views/femmesbattues/global/global_variables';
import {RoutesEnum} from '../../../views/femmesbattues/RoutesEnum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit, OnDestroy {
  @Input() notificPanel;
  // public availableLangs = [{
  //   name: 'FR',
  //   code: 'fr',
  //   flag: 'flag-icon-fr'
  // }];
  // currentLang = this.availableLangs[0];

  public egretThemes;
  public layoutConf: any;

  public fiscalPeriods: BehaviorSubject<FiscalPeriod[]> = new BehaviorSubject<FiscalPeriod[]>([]);
  public fiscalPeriod: BehaviorSubject<FiscalPeriod> = new BehaviorSubject<FiscalPeriod>(null);

  private isLogged$: Subscription;
  public isLogged: boolean;
  public identite: string;
  public type: string;

  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    private renderer: Renderer2,
    private variables: GlobalVariables,
    private router: Router
  ) {
    this.isLogged$ = variables.isUserLoggedIn$.subscribe((value) => {
      this.isLogged = value;
      if (this.isLogged) {
        this.identite =
          (variables.currentUser.ut_prenom ? variables.currentUser.ut_prenom + ' ' : '')
            + (variables.currentUser.ut_nom ? variables.currentUser.ut_nom : '');

        if (this.variables.currentUser.idtypeutilisateur === this.variables.TypePrescripteur) {
          this.type = 'Prescripteur';
        }
        if (this.variables.currentUser.idtypeutilisateur === this.variables.TypeChauffeur) {
          this.type = 'Chauffeur';
        }
        if (this.variables.currentUser.idtypeutilisateur === this.variables.TypeAssociation) {
          this.type = 'Association';
        }
        if (this.variables.currentUser.idtypeutilisateur === this.variables.TypeAdmin) {
          this.type = 'Admin';
        }
      } else {
        this.identite = '';
        this.type = '';
      }
    });
  }

  ngOnInit(): void {
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    // this.translate.use(this.currentLang.code);
  }

  // setLang(lng) {
  // 	this.currentLang = lng;
  // 	// this.translate.use(lng.code);
  // }
  // changeTheme(theme) {
  //   // this.themeService.changeTheme(theme);
  // }

  // toggleNotific() {
  //   this.notificPanel.toggle();
  // }

  toggleSidenav(): void {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  // toggleCollapse() {
  //   // compact --> full
  //   if (this.layoutConf.sidebarStyle === 'compact') {
  //     return this.layout.publishLayoutChange({
  //       sidebarStyle: 'full',
  //       sidebarCompactToggle: false
  //     }, {transitionClass: true});
  //   }
  //
  //   // * --> compact
  //   this.layout.publishLayoutChange({
  //     sidebarStyle: 'compact',
  //     sidebarCompactToggle: true
  //   }, {transitionClass: true});
  // }

  // onSearch(e) {
  //   //   console.log(e)
  // }

//   logout() {
// //		this.keycloakService.logout(document.baseURI);
//   }

  // profile() {
  //   // this.router.navigate(['/comptaweb/my-profile']);
  // }

  ngOnDestroy(): void {
    if (this.isLogged$) {
      this.isLogged$.unsubscribe();
    }
  }

  connexion(): void {
    this.router.navigate([RoutesEnum.LOGIN]);
  }

  deconnexion(): void {
    this.router.navigate([RoutesEnum.LOGOUT]);
  }
}
