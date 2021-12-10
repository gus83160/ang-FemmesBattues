import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm',
  template: `
    <div mat-dialog-content class="mb-1">{{ data.message }}</div>
    <div mat-dialog-actions>
    <button
    type="button"
    mat-raised-button
    color="primary"
    (click)="dialogRef.close(true)">OK</button>
    </div>`
})
export class DialogueComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
}
