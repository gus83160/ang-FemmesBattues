import {Routes} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './shared/components/layouts/auth-layout/auth-layout.component';
import {AuthGuard} from './shared/auth.guard';
import {DefaultroutingComponent} from './defaultrouting/defaultrouting.component';


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
        loadChildren: () => import('./views/femmesbattues/femmesbattues.module').then(m => m.FemmesBattuesModule),
        data: {
          title: '',
          breadcrumb: ''
        }
      },
    ]
  },

  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

