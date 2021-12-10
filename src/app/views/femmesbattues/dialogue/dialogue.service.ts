import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

import { DialogueComponent } from './dialogue.component';

interface confirmData {
  message?: string;
}

@Injectable()
export class DialogueService {

  constructor(private dialog: MatDialog) { }

  public confirm(data: confirmData = {}): Observable<boolean> {
    data.message = data.message || 'Etes vous sûr ?';
    let dialogRef: MatDialogRef<DialogueComponent>;
    dialogRef = this.dialog.open(DialogueComponent, {
      width: '500px',
      disableClose: true,
      data: { message: data.message}
    });
    return dialogRef.afterClosed();
  }
}
