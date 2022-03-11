import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DxFormComponent} from 'devextreme-angular';

@Component({
  selector: 'app-demande-recherche',
  templateUrl: './demande-recherche.component.html',
  styleUrls: ['./demande-recherche.component.scss']
})
export class DemandeRechercheComponent implements OnInit {
  @ViewChild(DxFormComponent, {static: false}) form: DxFormComponent | undefined;

  @Input() searchData: any = {};
  @Input() initiallyShowed: boolean = false;
  @Input() cancel = () => {};
  @Input() ok: (data: any) => CancelSearch | Promise<CancelSearch>;

  private _isPopupVisible = false;
  private isSubmited = false;
  message: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this._isPopupVisible = this.initiallyShowed;
  }

  get isPopupVisible() {
    return this._isPopupVisible;
  }

  set isPopupVisible(value: boolean) {
    this._isPopupVisible = value;
    if (this._isPopupVisible) {
      this.show();
    }
  }

  show() {
    this.isSubmited = false;

    // reset form state and validation
    this.form?.instance.resetValues();
    this._isPopupVisible = true;
  }

  onHidden() {
    if (!this.isSubmited) {
      this.cancel();
    }
  }

  onClose() {
    this.isPopupVisible = false;
  }

  onFormSubmit = (e: SubmitEvent) => {
    this.message = '';
    const resVal = this.form?.instance.validate();
    if (resVal?.isValid) {
      let eventData = {
        searchData: this.searchData,
        cancel: false,
        message: ''
      };

      const res = this.ok(eventData);
      if (res instanceof Promise) {
        res.then(value => {
          this.handleSubmitRes(value);
        })
      } else {
        this.handleSubmitRes(res);
      }
    }

    e.preventDefault();
  }

  handleSubmitRes(res) {
    if (res.cancel) {
      this.message = res.message;
    } else {
      this.isSubmited = true;
      this.isPopupVisible = false;
    }
  }
}

export class CancelSearch {
  cancel: boolean = false;
  message: string = '';
}
