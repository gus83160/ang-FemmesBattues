import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoutesEnum} from '../RoutesEnum';
import {AuthGuardService} from '../../../shared/services/auth/auth-guard.service';
import {CourseInformationComponent} from './infos/course-information.component';
import {CourseSaisieComponent} from './saisie/course-saisie.component';
//import {CourseRecupChauffeurComponent} from './recup-course-chauffeur/course-recup-chauffeur.component';
//import {CourseRechercheComponent} from './search-old/course-recherche.component';

const routes: Routes = [
  {
    path: RoutesEnum.COURSE_INFORMATION,
    component: CourseInformationComponent,
    canActivate: [ AuthGuardService ]
  },
  // {
  //   path: RoutesEnum.COURSE_RECH,
  //   component: CourseRechercheComponent,
  //   canActivate: [ AuthGuardService ]
  // },
  {
    path: RoutesEnum.COURSE_SAISIE,
    component: CourseSaisieComponent,
    canActivate: [ AuthGuardService ]
  },
  // {
  //   path: RoutesEnum.COURSE_RECUP,
  //   //component: CourseRecupChauffeurComponent,
  //   component: CourseSaisieComponent,
  //   canActivate: [ AuthGuardService ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
