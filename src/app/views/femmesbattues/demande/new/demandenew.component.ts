import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {GlobalVariables} from '../../global/global_variables';
import {RoutesEnum} from '../../RoutesEnum';

@Component({
  selector: 'app-demandenew',
  templateUrl: './demandenew.component.html',
  styleUrls: ['./demandenew.component.scss']
})
export class DemandeNewComponent implements OnInit {

  constructor(private route: Router,
              private variables: GlobalVariables) { }

  ngOnInit(): void {
       this.variables.IdPriseEnCharge = 0;
       this.route.navigate([RoutesEnum.DEMANDE, RoutesEnum.DEMANDE_EDIT]);
  }
}
