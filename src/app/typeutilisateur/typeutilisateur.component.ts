import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {TypeUtilisateur} from '../models/type-utilisateur';
import {TypeUtilisateurService} from '../services/typeutilisateur.service';
import {RoutesEnum} from '../views/femmesbattues/RoutesEnum';
import {Router} from '@angular/router';


@Component({
  selector: 'app-typeutilisateur',
  templateUrl: './typeutilisateur.component.html',
  styleUrls: ['./typeutilisateur.component.css']
})
export class TypeUtilisateurComponent implements OnInit {

  allTypeUtilisateurs: TypeUtilisateur[];

  constructor(
    private router: Router,
    private typeutilisateurservice:TypeUtilisateurService
  ) { }

  async ngOnInit(): Promise<void> {
     await this.loadAllTypeUtilisateur();
  }

  async loadAllTypeUtilisateur() {
    const httpResult = await this.typeutilisateurservice.getAllTypeUtilisateur()
      .execute(res => {
        this.allTypeUtilisateurs = res;
      })

    if (!httpResult.isOk) {
      await this.router.navigate([RoutesEnum.ROOT]);
    }
  }
}
