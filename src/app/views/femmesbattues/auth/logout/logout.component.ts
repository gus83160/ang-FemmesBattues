import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalVariables} from '../../global/global_variables';
import {RoutesEnum} from '../../RoutesEnum';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, AfterViewInit {

  constructor(
    private variables: GlobalVariables,
    private route: Router
  ) {
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    sessionStorage.setItem('login', null);
    sessionStorage.setItem('password', null);

    await this.route.navigate([RoutesEnum.ROOT]);
    this.variables.currentUser = null;
  }
}
