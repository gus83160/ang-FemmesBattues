import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {formatDate} from '@angular/common';
import {DxFormComponent} from 'devextreme-angular';
import {DateService} from '../../../../../services/date.service';

@Component({
  selector: 'app-demande-list-filter',
  templateUrl: './demande-list-filter.component.html',
  styleUrls: ['./demande-list-filter.component.scss']
})
export class DemandeListFilterComponent {
  @ViewChild(DxFormComponent, {static: false}) form: DxFormComponent | undefined;

  @Input() filterData: Partial<FilterDemandeData> = {}
  @Output() applyFilter = new EventEmitter();

  filterDataCopy: Partial<FilterDemandeData> = {};
  private _isFilterVisible = false;
  private isSubmited = false;

  constructor(private dateService: DateService) {
    //this.onTest();
  }

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
    {id: 2, text: 'Cette année'},
  ]

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
        this.filterData.du = this.dateService.getLundi(now);
        this.filterData.au = this.dateService.getDimanche(now);
        break;
      case 1:
        this.filterData.du = this.dateService.getDebutMois(now);
        this.filterData.au = this.dateService.getFinMois(now);
        break;
      case 2:
        this.filterData.du = this.dateService.getDebutAnnee(now);
        this.filterData.au = this.dateService.getFinAnnee(now);
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
        lundi: this.dateService.getLundi(dt),
        dimanche: this.dateService.getDimanche(dt),
        debutMois: this.dateService.getDebutMois(dt),
        finMois: this.dateService.getFinMois(dt),
        debutAnnee: this.dateService.getDebutAnnee(dt),
        finAnnee: this.dateService.getFinAnnee(dt),
      };

      console.assert(o.dt >= o.lundi , 'Erreur');
      console.assert(o.dt <= o.dimanche, 'Erreur');
      console.assert(o.dt >= o.debutMois, 'Erreur');
      console.assert(o.dt <= o.finMois, 'Erreur');
      this.lines.push(o);

      dt = new Date(dt);
      dt.setDate(dt.getDate() + 1);
      console.log('-----');
    }
  }

  formatDateFull(dt: Date): string {
    return formatDate(dt, 'EEEE dd/MM/yyyy HH:mm', 'fr');
  }

  validateDate = () => {
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
    if (resVal !== undefined && (resVal.isValid ?? false)) {
      this.isSubmited = true;
      this.isFilterVisible = false;
      this.applyFilter.emit(this.filterData);
    }

    e.preventDefault();
  }
}

export class FilterDemandeData {
  du: Date | null = null;
  au: Date | null = null;
  numDemande: string = '';
}

