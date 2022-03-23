import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.css']
})
export class AppLoaderComponent {
  title: any;
  message: any;
  constructor(public dialogRef: MatDialogRef<AppLoaderComponent>) {}
}
