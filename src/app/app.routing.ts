import {Routes} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/layouts/admin-layout/admin-layout.component';
import {RoutesEnum} from './views/femmesbattues/RoutesEnum';
import {AuthGuardService} from './shared/services/auth/auth-guard.service';
import {LoginComponent} from './views/femmesbattues/auth/login/login.component';
import {PageNotFoundComponent} from './shared/components/not-found/page-not-found.component';
// import {AuthLayoutComponent} from './shared/components/layouts/auth-layout/auth-layout.component';
// import {KeycloackAuthGuard} from './shared/keycloack-auth-guard.service';
// import {DefaultroutingComponent} from './defaultrouting/defaultrouting.component';

export const rootRouterConfig: Routes = [
  // {
  //   path: '',
  //   component: DefaultroutingComponent,
  // },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        //loadChildren: () => import('./views/femmesbattues/femmesbattues.module').then(m => m.FemmesBattuesModule),
        loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
        data: {
          title: '',
          breadcrumb: ''
        }
      },
      {
        path: RoutesEnum.AUTH,
        loadChildren: () => import('./views/femmesbattues/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: RoutesEnum.DEMANDE,
        loadChildren: () =>
          import('./views/femmesbattues/demande/demande.module').then(
            (m) => m.DemandeModule
          )
        , canActivate: [AuthGuardService]
      },
      {
        path: RoutesEnum.COURSE,
        loadChildren: () =>
          import('./views/femmesbattues/course/course.module').then(
            (m) => m.CourseModule
          )
        , canActivate: [AuthGuardService]
      },
      {
        path: RoutesEnum.UTILISATEUR,
        loadChildren: () =>
          import('./views/femmesbattues/utilisateur/utilisateur.module').then(
            (m) => m.UtilisateurModule
          )
        , canActivate: [AuthGuardService]
      },
      {
        path: '**',
        component: PageNotFoundComponent
        //redirectTo: RoutesEnum.ROOT
      },
    ]
  },

  {
    path: '**',
    component: PageNotFoundComponent
    //redirectTo: RoutesEnum.ROOT
  },
];

