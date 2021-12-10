import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {NavigationService} from '../../../shared/services/navigation.service';
import {ThemeService} from '../../services/theme.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ILayoutConf, LayoutService} from 'app/shared/services/layout.service';
import {GlobalVariables} from '../../../views/femmesbattues/global/global_variables';

@Component({
  selector: 'app-sidebar-side',
  templateUrl: './sidebar-side.component.html'
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  private variableSub: Subscription;
  public layoutConf: ILayoutConf;

  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private variables: GlobalVariables,
  ) {
  }

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;

    // console.log('observer length before', Variables.isUserLoggedIn.observers.length);
    this.variableSub = this.variables.isUserLoggedIn$.subscribe((value) => {
      this.navService.publishNavigationChange('');
    });
    // console.log('observer length after', Variables.isUserLoggedIn.observers.length);

    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === 'icon'
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
    if (this.variableSub) {
      this.variableSub.unsubscribe();
    }
  }

  toggleCollapse() {
    if (
      this.layoutConf.sidebarCompactToggle
    ) {
      this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
      this.layout.publishLayoutChange({
        // sidebarStyle: "compact",
        sidebarCompactToggle: true
      });
    }
  }
}
