import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {formatDate} from '@angular/common';
import {DxFormComponent} from 'devextreme-angular';

@Component({
  selector: 'app-demande-list-filter',
  templateUrl: './demande-list-filter.component.html',
  styleUrls: ['./demande-list-filter.component.scss']
})
export class DemandeListFilterComponent implements OnInit {
  @ViewChild(DxFormComponent, {static: false}) form: DxFormComponent | undefined;
  @Output() applyFilter = new EventEmitter();

  filterData: any = {};
  filterDataCopy: any = {};
  private _isFilterVisible = false;
  private isSubmited = false;

  get isFilterVisible() {
    return this._isFilterVisible;
  }
  set isFilterVisible(value: boolean) {
    this._isFilterVisible = value;
    if (this._isFilterVisible) {
      this.showFiltre();
    }
  }
  dateSelectionOptions = [
    {id: 0, text: 'Cette semaine'},
    {id: 1, text: 'Ce mois'},
    {id: 1, text: 'Cette année'},
  ]

  constructor() {
    //this.onTest();
  }

  ngOnInit(): void {
  }

  showFiltre() {
    this.isSubmited = false;

    this.filterDataCopy = Object.assign({}, this.filterData);
    // reset form state and validation
    this.form?.instance.resetValues();
    this._isFilterVisible = true;

    // set value to previous value
    this.filterData = Object.assign({}, this.filterDataCopy);
  }

  onSelectionDateClick(e: any) {
    // console.log(e.itemData);
    const now = new Date();
    switch (e.itemData.id) {
      case 0:
        this.filterData.du = this.getLundi(now);
        this.filterData.au = this.getDimanche(now);
        break;
      case 1:
        this.filterData.du = this.getDebutMois(now);
        this.filterData.au = this.getFinMois(now);
        break;
      case 2:
        this.filterData.du = this.getDebutAnnee(now);
        this.filterData.au = this.getFinAnnee(now);
        break;
    }
  }

  lines: any[] | undefined;

  onTest() {
    this.isFilterVisible = false;

    //let dt = new Date(2022, 2, 7, 21);
    let dt = new Date(2021, 11, 15, 21);

    this.lines = [];

    for(let i = 0; i < 400; i++) {
      const o = {
        dt: new Date(dt),
        lundi: this.getLundi(dt),
        dimanche: this.getDimanche(dt),
        debutMois: this.getDebutMois(dt),
        finMois: this.getFinMois(dt),
        debutAnnee: this.getDebutAnnee(dt),
        finAnnee: this.getFinAnnee(dt),
      };

      console.assert(o.dt >= o.lundi , 'Erreur');
      console.assert(o.dt <= o.dimanche, 'Erreur');
      console.assert(o.dt >= o.debutMois, 'Erreur');
      console.assert(o.dt <= o.finMois, 'Erreur');
      this.lines.push(o);

      dt = new Date(dt);
      dt.setDate(dt.getDate() + 1);
      console.log('-----');
    };
  }

  formatDateFull(dt: Date): string {
    return formatDate(dt, 'EEEE dd/MM/yyyy HH:mm', 'fr');
  }

  getLundi(dt: Date) : Date {
    let res = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    let weekday = dt.getDay();
    if (weekday === 0) {
      weekday = 6;
    } else {
      weekday--;
    }
    res.setDate(dt.getDate() - weekday);
    return res;
  }

  getDimanche(dt: Date): Date {
    let res = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    res.setDate(res.getDate() + 7);
    res = this.getLundi(res);
    res.setDate(res.getDate() - 1);
    res = this.getEndOfDay(res);
    return res;
  }

  getDebutMois(dt: Date): Date {
    let res = new Date(dt.getFullYear(), dt.getMonth(), 1);
    return res;
  }

  getFinMois(dt: Date): Date {
    let res = new Date(dt.getFullYear(), dt.getMonth() + 1, 1);
    res.setDate(res.getDate() - 1);
    res = this.getEndOfDay(res);
    return res;
  }

  getDebutAnnee(dt: Date): Date {
    let res = new Date(dt.getFullYear(), 0, 1);
    return res;
  }

  getFinAnnee(dt: Date): Date {
    let res = new Date(dt.getFullYear(), 11, 31);
    res = this.getEndOfDay(res);
    return res;
  }

  getEndOfDay(dt: Date): Date {
    let res = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    res.setDate(dt.getDate() + 1);
    res.setTime(res.getTime() - 1);
    return res;
  }

  validateDate = (e: any) => {
    if (this.filterData.du && this.filterData.au) {
      return this.filterData.du <= this.filterData.au;
    } else {
      return true;
    }
  }

  onClose() {
    if (!this.isSubmited) {
      this.filterData = Object.assign({}, this.filterDataCopy);
    }
    this.isFilterVisible = false;
  }

  onFormSubmit = (e: SubmitEvent) => {
    const resVal = this.form?.instance.validate();
    if (resVal?.isValid) {
      this.isSubmited = true;
      this.isFilterVisible = false;
      this.applyFilter.emit(this.filterData);
    }

    e.preventDefault();
  }
}
