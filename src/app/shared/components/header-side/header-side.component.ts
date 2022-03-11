import {
  Component,
  OnInit,
  Input,
  Renderer2, OnDestroy,
} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {LayoutService} from '../../services/layout.service';
// import {FiscalPeriod} from '../../models/fiscalPeriod.model';
import {BehaviorSubject, Subscription} from 'rxjs';
import {GlobalVariables} from '../../../views/femmesbattues/global/global_variables';
import {RoutesEnum} from '../../../views/femmesbattues/RoutesEnum';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

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

  // public fiscalPeriods: BehaviorSubject<FiscalPeriod[]> = new BehaviorSubject<FiscalPeriod[]>([]);
  // public fiscalPeriod: BehaviorSubject<FiscalPeriod> = new BehaviorSubject<FiscalPeriod>(null);

  private isLogged$: Subscription;
  public isLogged: boolean;
  public identite: string;
  public type: string;

  title = '';
  private routeSubs$: Subscription;

  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    private renderer: Renderer2,
    private variables: GlobalVariables,
    private router: Router
  ) {
    this.setTitle(router.url);
    this.routeSubs$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setTitle(event.url);
    });

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

  private setTitle(url: string): void {
    this.title = '';
    if (url === '/') {
      this.title = 'Accueil';
    } else if (url === '/' + RoutesEnum.DEMANDE + '/' + RoutesEnum.DEMANDE_LIST) {
      this.title = 'Courses';
    } else if (url === '/' + RoutesEnum.COURSE + '/' + RoutesEnum.COURSE_INFORMATION) {
      this.title = 'Information sur une demande';
    } else if (url === '/' + RoutesEnum.COURSE + '/' + RoutesEnum.COURSE_SAISIE) {
      this.title = 'Saisie des informations de la course';
    } else if (url === '/' + RoutesEnum.AUTH + '/' + RoutesEnum.LOGIN) {
      this.title = 'Connexion';
    } else if (url === '/' + RoutesEnum.AUTH + '/' + RoutesEnum.LOGINMDP) {
      this.title = 'Changement de mot de passe';
    } else if (url === '/' + RoutesEnum.DEMANDE + '/' + RoutesEnum.DEMANDE_EDIT) {
      this.title = 'Création demande';
    } else if (url === '/' + RoutesEnum.UTILISATEUR + '/' + RoutesEnum.UTILISATEUR_LIST) {
      this.title = 'Utilisateurs';
    } else if (url === '/' + RoutesEnum.UTILISATEUR + '/' + RoutesEnum.UTILISATEUR_EDIT) {
      this.title = 'Utilisateur';
    } else if (url === '/' + RoutesEnum.FACTURE) {
      this.title = 'Facture';
    }
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
    if (this.routeSubs$) {
      this.routeSubs$.unsubscribe();
    }
  }

  connexion(): void {
    // this.router.navigate([RoutesEnum.LOGIN]);
    this.router.navigate([RoutesEnum.AUTH, RoutesEnum.LOGIN]);
  }

  deconnexion(): void {
    //this.router.navigate([RoutesEnum.LOGOUT]);
    this.router.navigate([RoutesEnum.AUTH, RoutesEnum.LOGOUT]);
  }
}
