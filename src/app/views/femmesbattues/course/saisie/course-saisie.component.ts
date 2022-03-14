import {AfterViewInit, Component, isDevMode, OnInit, ViewChild} from '@angular/core';
import {formatDate} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

import {GlobalVariables} from '../../global/global_variables';
import {PriseEnCharge} from '../../../../models/PriseEnCharge';
import {PriseEnChargeService} from '../../../../services/PriseEnCharge.service';
import {Course} from '../../../../models/course';
import {CourseService} from '../../../../models/course.service';
import {RoutesEnum} from '../../RoutesEnum';
import {DxFormComponent} from 'devextreme-angular';
import {DxoFormSimpleItem} from 'devextreme-angular/ui/nested/base/form-simple-item';
import {ErrorMessage} from '../../../../models/ErrorMessage';
import {ValidationErrorResponse} from '../../../../models/validation_error_response';
import {CancelSearch} from '../search/demande-recherche.component';
import {UtilService} from '../../global/util.service';
import {Retour} from '../../../../models/retour';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-course-saisie',
  templateUrl: './course-saisie.component.html',
  styleUrls: ['./course-saisie.component.scss']
})
export class CourseSaisieComponent implements OnInit, AfterViewInit {
  @ViewChild(DxFormComponent, {static: false}) form: DxFormComponent | undefined;
  @ViewChild('attjour', {static: false}) attjour: DxoFormSimpleItem | undefined;

  searchData: any = {};
  priseEnCharge: Retour = null;
  showLoading: boolean;
  popupInitiallyShowed = false;
  isDevMode: boolean;

  // course: Course;
  priseencharge: PriseEnCharge;
  // CourseForm: FormGroup;
  dt: string;

  formData: Course = new Course();
  // courseData: any = {};

  globalErrorMessage: string[];

  typeCourseDatasource = [
    {id: 0, text: 'Course normale'},
    {id: 1, text: 'Course intramuros de jour'},
    {id: 2, text: 'Course intramuros de nuit'},
  ];

  private readonly validateOnlyRemotelly: boolean;

  typeCourseOptions = {
    dataSource: this.typeCourseDatasource,
    valueExpr: 'id',
    displayExpr: 'text',
    onValueChanged: (event) => this.intramurosChanged(event)
  };
  private readonly numDemandeParam: string;
  private readonly returnUrl: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private priseEnChargeService: PriseEnChargeService,
              private courseService: CourseService,
              private utilService: UtilService,
              public variables: GlobalVariables) {

    // this.formData.co_typeCourse = 0;
    // this.formData.co_kmsA = 0;
    // this.formData.co_kmsB = 0;
    // this.formData.co_kmsC = 0;
    // this.formData.co_kmsD = 0;

    // id de la prise en charge
    this.numDemandeParam = this.activatedRoute.snapshot.queryParamMap.get('numDemande') || '';
    if (this.numDemandeParam === '') {
      this.popupInitiallyShowed = true;
    }
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '';

    this.isDevMode = isDevMode();
    if (this.isDevMode) {
      this.searchData.numDemande = 'DEM899236';
      // this.validateOnlyRemotelly = false;
      // this.variables.NomVictime = 'NOM DE LA VICTIME';
      // this.variables.AdresseDepart = 'Adresse de départ';
      // this.variables.AdresseArrivee = 'Adresse d\'arrivée';
    }
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.numDemandeParam != '') {
      const res = await this.doRecherche(this.numDemandeParam);
      if (res.cancel) {
        notify(res.message);
        await this.navigateToReturnUrl();
      }
    }
  }

  async MajCourse(): Promise<boolean> {
    let ok = false;

    let formPost = Object.assign({}, this.formData);

    function convertToTime(dt: Date | string) {
      if (dt != null) {
        return formatDate(dt, 'HH:mm', 'fr-FR') + ':00';
      } else {
        return null;
      }
    }

    formPost.co_heuredebut = convertToTime(formPost.co_heuredebut);
    formPost.co_heurefin = convertToTime(formPost.co_heurefin);
    formPost.co_attjour = convertToTime(formPost.co_attjour);
    formPost.co_attnuit = convertToTime(formPost.co_attnuit);

    try {
      //console.log(this.priseEnCharge.idPriseEnCharge);
      if (this.formData.id === 0) {
        let result = await this.courseService.createCourse(formPost, this.priseEnCharge.idPriseEnCharge);
        if (result != null) {
          this.formData.id = result.id;
        }
        ok = true;
      } else {
        try {
          await this.courseService.updateCourse(formPost);
          ok = true;
        } catch (ex) {
          this.globalErrorMessage = ex.toString();
        }
      }
    } catch (e) {
      if (e instanceof ErrorMessage) {
        this.globalErrorMessage.push(e.message);
      } else if (e instanceof ValidationErrorResponse) {
        this.globalErrorMessage = e.applyToForm(this.form);
      } else {
        this.globalErrorMessage.push(e.toString());
      }
    }

    return ok;
  }

  async onFormSubmit(e: SubmitEvent) {
    console.log(this.formData.co_appForf);

    this.globalErrorMessage = [];

    const resVal = this.validateOnlyRemotelly ? {isValid: true} : this.form?.instance.validate();
    if (!this.validateOnlyRemotelly) {
      if (this.formData.co_typeCourse === 0) {
        if (this.formData.co_kmsA + this.formData.co_kmsB + this.formData.co_kmsC + this.formData.co_kmsD === 0) {
          this.globalErrorMessage.push('Vous n\'avez saisie aucune distance');
          resVal.isValid = false;
        }
      }
      if (this.formData.co_appForf && this.formData.co_typeCourse === 0) {
        if (this.formData.co_kmsA + this.formData.co_kmsB + this.formData.co_kmsC + this.formData.co_kmsD >= 30) {
          this.globalErrorMessage.push('Approche invalide pour course >= 30kms');
          resVal.isValid = false;
        }
      }
    }

    if (resVal?.isValid) {
      if (await this.MajCourse()) {
        await this.navigateToReturnUrl();
      }
    }

    e.preventDefault();
  }

  onClose = async () => {
    await this.navigateToReturnUrl();
  };

  async navigateToReturnUrl() {
    if (this.returnUrl !== '') {
      await this.router.navigateByUrl(this.returnUrl);
    } else {
      await this.router.navigate([RoutesEnum.ROOT]);
    }
  }

  validateAttente(e) {
    const dt = e.value as Date;
    if (dt !== null) {
      return dt.getTime() % (10 * 60 * 1000) === 0;
    } else {
      return true;
    }
  }

  intramurosChanged(e) {
    if (!this.validateOnlyRemotelly) {
      const intramuros = e.value !== 0;
      this.form.instance.getEditor('co_kmsA').option('disabled', intramuros);
      this.form.instance.getEditor('co_kmsB').option('disabled', intramuros);
      this.form.instance.getEditor('co_kmsC').option('disabled', intramuros);
      this.form.instance.getEditor('co_kmsD').option('disabled', intramuros);
      this.form.instance.getEditor('co_peage').option('disabled', intramuros);

      if (intramuros) {
        this.formData.co_kmsA = 0;
        this.formData.co_kmsB = 0;
        this.formData.co_kmsC = 0;
        this.formData.co_kmsD = 0;
        this.formData.co_peage = 0;
      }
    }
  }

  fillValues() {
    const now = new Date();

    this.formData.co_typeCourse = 0;

    this.formData.co_date = now;
    this.formData.co_heuredebut = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0);
    this.formData.co_heurefin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 10);

    this.formData.co_kmsA = 1;
    this.formData.co_kmsB = 2;
    this.formData.co_kmsC = 3;
    this.formData.co_kmsD = 4;

    this.formData.co_peage = 10;

    this.formData.co_attjour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, 10);
  }

  onRecherche = async (e: any): Promise<CancelSearch> => {
    return await this.doRecherche(e.searchData.numDemande);
  };

  async doRecherche(numDemande: string) {
    let priseEnCharge: Retour;
    this.showLoading = true;

    let res = new CancelSearch();
    try {
      priseEnCharge = await this.priseEnChargeService.PriseEnChargeDemande(numDemande);
      let repCourseHub = await this.utilService.RechCourseHub(numDemande);
      if (repCourseHub === null) {
        res.cancel = true;
        res.message = 'Erreur lors de la récupération de la course auprès du HUB.';
      } else {
        if (repCourseHub.vehicleCode && (repCourseHub.vehicleCode !== this.variables.currentUser.ut_codechauffeur)) {
          res.cancel = true;
          res.message = 'Cette demande n\'a pas été réalisée par vous.';
        }

        try {
          if (priseEnCharge.idCourse !== 0) {
            this.formData = await this.courseService.getById(priseEnCharge.idCourse);
          } else {
            this.formData = new Course();
          }
        } catch (ex) {
          if (ex instanceof ErrorMessage && ex.status === 404) {
            res.cancel = true;
            res.message = 'Information course non trouvée.';
          }
        }
      }
    } catch (ex) {
      res.cancel = true;
      if (ex instanceof ErrorMessage && ex.status == 412) {
        res.message = ex.message;
      } else {
        res.message = 'Erreur inattendue';
      }
    } finally {
      this.showLoading = false;
    }
    // if (this.priseEnCharge === null) {
    //   e.cancel = true;
    //   e.message = 'Demande non trouvé';
    // }
    if (!res.cancel) {
      this.priseEnCharge = priseEnCharge;
    }
    return res;
  }

  onCancel = async () => {
    await this.navigateToReturnUrl();
  };
}
