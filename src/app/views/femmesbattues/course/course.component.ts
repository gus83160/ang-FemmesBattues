import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {GlobalVariables} from '../global/global_variables';
import {UtilService} from '../global/util.service';
import {RepCourseHub} from '../global/repcoursehub';
import {PriseEnChargeService} from '../../../models/priseencharge.service';
import {Retour} from '../../../models/retour';
import {RoutesEnum} from '../RoutesEnum';
import {ErrorService} from '../../../services/error.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courseForm: FormGroup;
  ret: Retour;
  repCourseHub: RepCourseHub;
  util: UtilService;
  public btnDisabled: boolean;
  public errorService: ErrorService;

  constructor(private route: Router,
              private http: HttpClient,
              private priseenchargeservice: PriseEnChargeService,
              private variables: GlobalVariables) {
  }


  ngOnInit(): void {
    this.courseForm = new FormGroup({
      nodemande: new FormControl('', Validators.required),
    });

    this.errorService = new ErrorService(this.courseForm);

    this.util = new UtilService(this.http);
  }


  async RechercheCourse(): Promise<void> {
    this.courseForm.markAllAsTouched();
    this.errorService.reset();

    try {
      this.btnDisabled = true;

      const courseData = this.courseForm.value;
      this.ret = await this.priseenchargeservice.PriseEnChargeDemande(courseData.nodemande);
      if (this.ret != null) {
        // console.log("avant");
        this.repCourseHub = await this.util.RechCourseHub(courseData.nodemande);
        // console.log("apres");
        if (this.variables.Information) {
          const rep = this.util.GenererPDF(null, null, courseData.nodemande, null, null);
          rep.then(() => {
            this.util.DownloadFile(courseData.nodemande);
          });
        } else {
          if (!this.repCourseHub.vehicleCode || (this.repCourseHub.vehicleCode === this.variables.currentUser.ut_codechauffeur)) {
            this.variables.IdPriseEnCharge = this.ret.idPriseEnCharge;
            this.variables.IdPrescripteur = this.ret.idPrescripteur;
            this.variables.IdDemande = this.ret.idDemande;
            this.variables.IdVictime = this.ret.idVictime;
            this.variables.IdStructureRequerante = this.ret.idStructureRequerante;
            this.variables.NoDemande = this.ret.noDemande;
            this.variables.DateDemande = this.ret.dateDemande;
            this.variables.NomDemandeur = this.ret.nomDemandeur;
            this.variables.TelephoneDemandeur = this.ret.telephoneDemandeur;
            this.variables.MailDemandeur = this.ret.mailDemandeur;
            this.variables.NomVictime = this.ret.nomVictime;
            this.variables.Particularite = this.ret.particularite;
            this.variables.AdresseDepart = this.ret.adresseDepart;
            this.variables.AdresseArrivee = this.ret.adresseArrivee;
            this.variables.AllerRetour = this.ret.allerRetour;
            this.variables.DateDebut = this.repCourseHub.dateBooking;
            this.variables.Prix = this.repCourseHub.price;
            this.variables.DateFin = this.repCourseHub.dateDropped;
            this.variables.HeureDebut = this.repCourseHub.heureDebut;
            this.variables.HeureFin = this.repCourseHub.heureFin;
            await this.route.navigate([RoutesEnum.COURSE_FICHE]);
          } else {
            this.errorService.addError('Cette demande n\'a pas été réalisée par vous.');
          }
        }
      }
    } catch (e) {
      this.errorService.loadError(e, this.courseForm);
    } finally {
      this.btnDisabled = false;
    }
  }
}
