import { Component, OnInit } from '@angular/core';
import { Variables } from '../global/variables';

@Component({
  selector: 'app-priseencharge',
  templateUrl: './priseencharge.component.html',
  styleUrls: ['./priseencharge.component.scss']
})




export class PriseenchargeComponent implements OnInit {

  constructor(public variables: Variables) { }

  ngOnInit(): void {
  }
}
