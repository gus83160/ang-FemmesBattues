import {Component, OnInit, } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';

import {RoutePartsService} from './shared/services/route-parts.service';

import {filter} from 'rxjs/operators';
import {ConfigurationService} from './shared/services/configuration.service';
import {MatDialog} from '@angular/material/dialog';

import {environment} from '../environments/environment';
import {GlobalVariables} from './views/femmesbattues/global/global_variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appTitle = '';
  pageTitle = '';
  env = environment;

  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private configurationService: ConfigurationService,
    private dialog: MatDialog,
    private variables: GlobalVariables
  ) {
  }

  async ngOnInit(): Promise<void> {
    // await this.authService.checkLoggedState();
    // console.log('AppComponent');
    // console.log(this.variables.currentUser);

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.variables.previousUrl = this.variables.currentUrl;
      this.variables.currentUrl = (event as NavigationEnd).url;
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
