import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilisateurService } from '../../../../services/utilisateur.service';

@Component({
  selector: 'app-reset-password',
  template: `
    <h2 mat-dialog-title>Réinitialiser le mot de passe</h2>
    <div mat-dialog-content>
      <p>Êtes-vous sûr de vouloir réinitialiser le mot de passe de l'utilisateur :</p>
      <p><strong>{{ data.nomUtilisateur }}</strong></p>
      <p>Le mot de passe sera réinitialisé à sa valeur par défaut : <strong>1234</strong></p>
      <p class="warning">L'utilisateur devra changer son mot de passe à sa prochaine connexion.</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Annuler</button>
      <button mat-raised-button color="warn" (click)="confirmerReinitialisation()" [disabled]="loading">
        <mat-icon *ngIf="!loading">key</mat-icon>
        <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
        {{ loading ? 'Réinitialisation...' : 'Réinitialiser' }}
      </button>
    </div>
  `,
  styles: [`
    .warning {
      color: #f44336;
      font-style: italic;
      margin-top: 16px;
    }
    button {
      margin-left: 8px;
    }
    mat-spinner {
      display: inline-block;
      margin-right: 8px;
    }
  `]
})
export class ResetPasswordComponent {
  loading = false;

  constructor(
    private dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idUtilisateur: number, nomUtilisateur: string },
    private utilisateurService: UtilisateurService,
    private snackBar: MatSnackBar
  ) {}

  confirmerReinitialisation(): void {
    this.loading = true;
    console.log('Id user:', this.data.idUtilisateur);
    this.utilisateurService.reinitialiserMotDePasse(this.data.idUtilisateur).subscribe({
      next: (success) => {
        if (success) {
          this.snackBar.open('Mot de passe réinitialisé avec succès', 'Fermer', { duration: 3000 });
          this.dialogRef.close(true);
        } else {
          this.snackBar.open('Erreur lors de la réinitialisation du mot de passe', 'Fermer', { duration: 3000 });
          this.dialogRef.close(false);
        }
      },
      error: (error) => {
        console.error('Erreur lors de la réinitialisation du mot de passe:', error);
        this.snackBar.open('Erreur lors de la réinitialisation du mot de passe', 'Fermer', { duration: 3000 });
        this.dialogRef.close(false);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
