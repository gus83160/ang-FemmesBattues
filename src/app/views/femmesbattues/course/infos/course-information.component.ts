import {Component, isDevMode, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {RoutesEnum} from '../../RoutesEnum';
import {CancelSearch, DemandeRechercheComponent} from '../search/demande-recherche.component';
import {PriseEnChargeService} from '../../../../services/prise-en-charge.service';
import {UtilService} from '../../global/util.service';
import {ViewPdfComponent} from '../../view-pdf/view-pdf.component';
import {DemandeService} from '../../../../services/demande.service';

@Component({
  selector: 'app-information',
  templateUrl: './course-information.component.html',
  styleUrls: ['./course-information.component.scss']
})
export class CourseInformationComponent {
  @ViewChild(ViewPdfComponent, {static: false}) viewPdf!: ViewPdfComponent;
  @ViewChild(DemandeRechercheComponent, {static: false}) demandeRechercheComponent!: DemandeRechercheComponent;

  searchData: ISearchData = <ISearchData>{};
  popupInitiallyShowed = true;
  showLoading: boolean = false;
  private readonly isDevMode: boolean;

  constructor(private route: Router,
              private priseEnChargeService: PriseEnChargeService,
              private demandeService: DemandeService,
              private utilService: UtilService) {
    this.isDevMode = isDevMode();
    if (this.isDevMode) {
      this.searchData.numDemande = 'DEM776240';
    }
  }

  onRecherche = async (e: any): Promise<CancelSearch> => {
    // let priseEnCharge: Retour;
    this.showLoading = true;

    const res = new CancelSearch();

    // console.log(e.searchData.numDemande);
    // priseEnCharge = await this.priseEnChargeService.PriseEnChargeDemande(e.searchData.numDemande);
    const httpResult = await this.utilService.RechCourseHub(e.searchData.numDemande)
      .catchAllErrors(err => {
        res.cancel = true;
        res.message = err.message;
      })
      .execute();

    if (httpResult.isOk) {
      await this.demandeService.genererPDFDemande(e.searchData.numDemande)
        .catchAllErrors(err => {
          res.cancel = true;
          res.message = err.message;
        })
        .execute(res => {
          this.viewPdf.showPdfFromBlob(res);
        });
    }

    this.showLoading = false;

    return res;
  };

  onCancel = async () => {
    await this.route.navigate([RoutesEnum.ROOT]);
  };

  onPdfHidden = async () => {
    this.demandeRechercheComponent.show();
  };
}

interface ISearchData {
  numDemande: string;
}
