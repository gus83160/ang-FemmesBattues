import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {RoutesEnum} from '../../../views/femmesbattues/RoutesEnum';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {
  @Input('items') public menuItems: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;

  constructor() {
  }

  // // Only for demo purpose
  // addMenuItem() {
  //   this.menuItems.push({
  //     name: 'ITEM',
  //     type: 'dropDown',
  //     tooltip: 'Item',
  //     icon: 'done',
  //     state: 'material',
  //     sub: [
  //       {name: 'SUBITEM', state: 'cards'},
  //       {name: 'SUBITEM', state: 'buttons'}
  //     ]
  //   });
  // }
}
