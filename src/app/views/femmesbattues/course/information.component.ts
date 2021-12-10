import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { GlobalVariables } from '../global/global_variables';
import {RoutesEnum} from '../RoutesEnum';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  constructor(private route: Router,
              private variables: GlobalVariables) { }

  ngOnInit(): void {
       this.variables.Information = true;
       this.route.navigate([RoutesEnum.COURSE]);
  }

}
