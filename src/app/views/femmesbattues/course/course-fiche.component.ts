import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { formatDate} from '@angular/common';
import { Router } from "@angular/router";

import { Variables } from '../global/variables';
import { PriseEnCharge } from '../../../database/priseencharge';
import { PriseEnChargeService } from '../../../database/priseencharge.service';
import { Course } from '../../../database/course';
import { CourseService } from '../../../database/course.service';

@Component({
  selector: 'app-course-fiche',
  templateUrl: './course-fiche.component.html',
  styleUrls: ['./course-fiche.component.scss']
})
export class CourseFicheComponent implements OnInit {

  course: Course;
  priseencharge: PriseEnCharge;
  CourseForm: FormGroup;
  dt: string;

  constructor(private route: Router,
              private priseenchargeservice: PriseEnChargeService,
              private courseservice: CourseService,
              public variables : Variables) { }

  ngOnInit(): void {
    this.CourseForm = new FormGroup({
    co_date : new FormControl(this.variables.DateDebut ,Validators.required),
    co_heuredebut : new FormControl(this.variables.HeureDebut,Validators.required),
    co_heurefin : new FormControl(this.variables.HeureFin,Validators.required),
    co_montant : new FormControl(this.variables.Prix,Validators.required),
    co_peage : new FormControl('')
    })
  }

  async CreationCourse() {
    const courseData = this.CourseForm.value;
    this.course = new Course();
    this.course.co_date = courseData.co_date;
    this.course.co_heuredebut = courseData.co_heuredebut;
    this.course.co_heurefin = courseData.co_heurefin;
    this.course.co_montant = courseData.co_montant;
    this.dt=formatDate(this.course.co_date,'yyyy-MM-ddT','Fr') + this.course.co_heuredebut + ":00";
    this.course.co_heuredebut = new Date(this.dt);
    this.dt=formatDate(this.course.co_date,'yyyy-MM-ddT','Fr') + this.course.co_heurefin + ":00";
    this.course.co_heurefin = new Date(this.dt);

    if (courseData.co_peage == "")
      this.course.co_peage = 0;
    else
      this.course.co_peage = courseData.co_peage;

    this.course = await this.courseservice.createCourse(this.course);

    this.priseencharge = new PriseEnCharge();
    this.priseencharge.id = this.variables.IdPriseEnCharge;
    this.priseencharge.pe_date = this.variables.DateDemande;
    this.priseencharge.pe_nodemande = this.variables.NoDemande;
    this.priseencharge.idprescripteur = this.variables.IdPrescripteur;
    this.priseencharge.idvictime = this.variables.IdVictime;
    this.priseencharge.iddemande = this.variables.IdDemande;
    this.priseencharge.idcourse = this.course.id;
    this.priseencharge.idchauffeur = this.variables.IdUtilisateur;
    this.priseenchargeservice.updatePriseEnCharge(this.priseencharge);
    this.route.navigate(['menu']);
  }


}
