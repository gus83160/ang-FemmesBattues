import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

import { Variables } from '../global/variables';
//import { Retour } from '../../../database/retour';
import { UtilisateurService } from '../../../database/utilisateur.service';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.scss']
})
export class UtilisateurListComponent implements OnInit {

    rows = [];
    columns = [];

    constructor(private route: Router,
                private utilisateurservice: UtilisateurService,
                private variables: Variables) { }

    ngOnInit(): void {
     this.columns = this.getDataConf();
     this.loadAllUtilisateur();
    }
  getDataConf() {
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
    ];
  }
  loadAllUtilisateur() {
    var res = this.utilisateurservice.getAllUtilisateur();
    res.subscribe(ret => { this.rows = ret; });
  }
  async detail(id) {
    this.variables.IdUser = id;
    this.route.navigate(['utilisateur']);
  }



}
