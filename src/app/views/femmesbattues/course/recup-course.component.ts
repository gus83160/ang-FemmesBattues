import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { GlobalVariables } from '../global/global_variables';
import {RoutesEnum} from '../RoutesEnum';

@Component({
  selector: 'app-recup-course',
  templateUrl: './recup-course.component.html',
  styleUrls: ['./recup-course.component.scss']
})
export class RecupCourseComponent implements OnInit {

  constructor(private route: Router,
              private variables: GlobalVariables) { }

  ngOnInit(): void {
       this.variables.Information = false;
       this.route.navigate([RoutesEnum.COURSE]);
  }

}
