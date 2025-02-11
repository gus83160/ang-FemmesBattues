import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilisateurService } from '../../../../services/utilisateur.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { IUtilisateur } from '../../../../models/IUtilisateur';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutesEnum } from '../../RoutesEnum';
import { Router } from '@angular/router';

import {GlobalVariables} from '../../global/global_variables';
//import { Retour } from '../../../models/retour';
import {DxDataGridComponent} from 'devextreme-angular';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.scss']
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: IUtilisateur[] = [];
  loading = false;

  constructor(
    private utilisateurService: UtilisateurService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: Router,
    public variables: GlobalVariables
  ) {}

  ngOnInit(): void {
    console.log('UtilisateurListComponent_V0 - ngOnInit');
    this.loadUtilisateurs();
  }

  loadUtilisateurs(): void {
    console.log('UtilisateurListComponent_V0 - loadUtilisateurs - Start');
    this.loading = true;
    this.utilisateurService.getAllUtilisateur().subscribe({
      next: (data) => {
        console.log('UtilisateurListComponent_V0 - loadUtilisateurs - Data received:', data);
        this.utilisateurs = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('UtilisateurListComponent_V0 - loadUtilisateurs - Error:', error);
        this.snackBar.open('Erreur lors du chargement des utilisateurs', 'Fermer', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  detail(id: number) {
    this.variables.IdUser = id;
    this.route.navigate([RoutesEnum.UTILISATEUR, RoutesEnum.UTILISATEUR_EDIT]);
  }

  isResetVisible = (e: any) => {
    return e.row.data.idtypeutilisateur !== this.variables.TypeAdmin;
  }

  isAdmin(): boolean {
    return this.variables.currentUser?.idtypeutilisateur === this.variables.TypeAdmin;
  }

  createUser() {
    if (!this.isAdmin()) return;
    
    this.variables.IdUser = 0; // Indique qu'il s'agit d'un nouvel utilisateur
    this.route.navigate([RoutesEnum.UTILISATEUR, RoutesEnum.UTILISATEUR_EDIT]);
  }

  deleteUser = (e: any) => {
    if (!this.isAdmin()) return;

    const userId = e.row.data.id;
    const userName = e.row.data.ut_nom;

    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${userName} ?`)) {
      this.loading = true;
      this.utilisateurService.deleteUtilisateur(userId).subscribe({
        next: () => {
          this.snackBar.open('Utilisateur supprimé avec succès', 'Fermer', { duration: 3000 });
          this.loadUtilisateurs();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.snackBar.open('Erreur lors de la suppression de l\'utilisateur', 'Fermer', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  resetPassword = (e: any) => {
    console.log('Reset password for user:', e.row.data);
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '400px',
//      data: { utilisateur: e.row.data }
      data: { idUtilisateur: e.row.data.id, nomUtilisateur: e.row.data.ut_nom }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Mot de passe réinitialisé avec succès', 'Fermer', { duration: 3000 });
      }
    });
  }
}
