import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient,HttpResponse } from '@angular/common/http';

import { Variables } from '../global/variables';
import { UtilService } from '../global/util.service';
import { RepAutorisation } from '../global/repautorisation';
import { RepCourseHub } from '../global/repcoursehub';
import { PriseEnCharge } from '../../../database/priseencharge';
import { PriseEnChargeService } from '../../../database/priseencharge.service';
import { Retour } from '../../../database/retour';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courseForm: FormGroup;
  VerifCourse: number;
  ret : Retour ;
  repAutorisation: RepAutorisation;
  repCourseHub: RepCourseHub;
  util: UtilService;

  constructor(private route: Router,
              private http: HttpClient,
              private priseenchargeservice: PriseEnChargeService,
              private variables : Variables) { }


  ngOnInit(): void {
    this.courseForm = new FormGroup({
        nodemande: new FormControl('', Validators.required),
       });
       this.VerifCourse = 0;
       this.util = new UtilService(this.http);
    }


  async RechercheCourse() {
     const courseData = this.courseForm.value
     this.ret = await this.priseenchargeservice.PriseEnChargeDemande(courseData.nodemande);
     if (this.ret != null) {
         this.repAutorisation = await this.util.Autorisation();
         this.repCourseHub = await this.util.RechCourseHub(courseData.nodemande,this.repAutorisation.access_token);
         if (this.repCourseHub.vehicleCode == this.variables.CodeChauffeur ) {
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
             this.route.navigate(['coursefiche']);

         }
         else {
            this.VerifCourse = 2;
            }
     }
     else {
         this.VerifCourse = 1;
     }
  }
}
