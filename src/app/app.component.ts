import {Component, OnInit, AfterViewInit, Renderer2} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

import {RoutePartsService} from './shared/services/route-parts.service';
// import { ThemeService } from './shared/services/theme.service';

import {filter} from 'rxjs/operators';
import {ConfigurationService} from './shared/services/configuration.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {environment} from '../environments/environment';
import {GlobalVariables} from './views/femmesbattues/global/global_variables';
import {UtilisateurService} from './models/utilisateur.service';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appTitle = '';
  pageTitle = '';
  env = environment;
  private _dialogRef: MatDialogRef<any>;

  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private configurationService: ConfigurationService,
    private dialog: MatDialog,
    private variables: GlobalVariables,
    private authService: AuthService,
    private utilisateurService: UtilisateurService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    // await this.authService.checkLoggedState();
    // console.log('AppComponent');
    // console.log(this.variables.currentUser);

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.variables.previousUrl = this.variables.currentUrl;
      this.variables.currentUrl = event.url;
    });

    // //  this.changePageTitle();
    // window.addEventListener('keyup', disableF5);
    // window.addEventListener('keydown', disableF5);
    //
    // function disableF5(e) {
    //   if ((e.which || e.keyCode) == 116) {
    //     e.preventDefault();
    //   }
    // }
  }

  // changePageTitle() {
  //   this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
  //     var routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
  //     if (!routeParts.length) {
  //       return this.title.setTitle(this.appTitle);
  //     }
  //     // Extract title from parts;
  //     this.pageTitle = routeParts
  //       .reverse()
  //       .map((part) => part.title)
  //       .reduce((partA, partI) => {
  //         return `${partA} > ${partI}`;
  //       });
  //     this.pageTitle += ` | ${this.appTitle}`;
  //     this.title.setTitle(this.pageTitle);
  //   });
  // }
}
