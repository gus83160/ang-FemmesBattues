import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {GlobalVariables} from '../../global/global_variables';
//import { Retour } from '../../../models/retour';
import {UtilisateurService} from '../../../../services/utilisateur.service';
import {RoutesEnum} from '../../RoutesEnum';
import {IUtilisateur} from '../../../../models/IUtilisateur';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.scss']
})
export class UtilisateurListComponent implements OnInit {

  rows: IUtilisateur[] = [];
  columns: ColumnConf[] = [];

  constructor(private route: Router,
              private utilisateurservice: UtilisateurService,
              private variables: GlobalVariables) {
  }

  ngOnInit(): void {
    this.columns = this.getDataConf();
    this.loadAllUtilisateur();
  }

  getDataConf(): ColumnConf[] {
    return [
      {
        prop: 'ut_nom',
        name: 'Nom'
      },
      {
        prop: 'ut_prenom',
        name: 'Prenom'
      },
      {
        prop: 'idtypeutilisateur',
        name: 'Type'
      }
    ] as ColumnConf[];
  }

  loadAllUtilisateur() {
    const res = this.utilisateurservice.getAllUtilisateur();
    res.subscribe(ret => {
      this.rows = ret;
    });
  }

  async detail(id: number) {
    this.variables.IdUser = id;
    await this.route.navigate([RoutesEnum.UTILISATEUR, RoutesEnum.UTILISATEUR_EDIT]);
  }
}

interface ColumnConf {
  prop: string,
  name: string,
}
