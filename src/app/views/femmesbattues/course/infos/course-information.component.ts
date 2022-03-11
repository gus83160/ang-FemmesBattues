import {Component, isDevMode, OnInit, ViewChild} from '@angular/core';
import { Router } from "@angular/router";

import { GlobalVariables } from '../../global/global_variables';
import {RoutesEnum} from '../../RoutesEnum';
import {CancelSearch} from '../search/demande-recherche.component';
import {ErrorMessage} from '../../../../models/ErrorMessage';
import {PriseEnChargeService} from '../../../../services/PriseEnCharge.service';
import {UtilService} from '../../global/util.service';
import {ViewPdfComponent} from '../../view-pdf/view-pdf.component';

@Component({
  selector: 'app-information',
  templateUrl: './course-information.component.html',
  styleUrls: ['./course-information.component.scss']
})
export class CourseInformationComponent implements OnInit {
  @ViewChild(ViewPdfComponent, {static: false}) viewPdf: ViewPdfComponent;

  searchData: any = {}
  popupInitiallyShowed = true;
  showLoading: boolean;
  private readonly isDevMode: boolean;

  constructor(private route: Router,
              private priseEnChargeService: PriseEnChargeService,
              private utilService: UtilService,
              private variables: GlobalVariables) {
    this.isDevMode = isDevMode();
    if (this.isDevMode) {
      this.searchData.numDemande = 'DEM776240';
    }
  }

  ngOnInit(): void {
  }

  onRecherche = async (e: any): Promise<CancelSearch> => {
    // let priseEnCharge: Retour;
    this.showLoading = true;

    let res = new CancelSearch();
    try {
      console.log(e.searchData.numDemande);
      // priseEnCharge = await this.priseEnChargeService.PriseEnChargeDemande(e.searchData.numDemande);
      let repCourseHub = await this.utilService.RechCourseHub(e.searchData.numDemande);
      if (repCourseHub === null) {
        res.cancel = true;
        res.message = 'Erreur lors de la récupération de la course auprès du HUB.';
      } else {
        await this.utilService.GenererPDF(null, null, e.searchData.numDemande, null, null)
        this.viewPdf.showPdf(e.searchData.numDemande);
      }
    } catch (ex) {
      res.cancel = true;
      if (ex instanceof ErrorMessage && ex.status == 412) {
        res.message = ex.message;
      } else {
        res.message = "Erreur inattendue";
      }
    } finally {
      this.showLoading = false;
    }

    return res;
  }

  onCancel = async () => {
    await this.route.navigate([RoutesEnum.ROOT]);
  }

  onPdfHidden = async () => {
    await this.route.navigate([RoutesEnum.ROOT]);
  }
}
