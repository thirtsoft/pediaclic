import { Routes } from '@angular/router';
import { MedecinComponent } from './medeccin-component';

export const MEDECIN_ROUTES: Routes = [
  {
    path: '',
    component: MedecinComponent,
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('@features/medecin/pages/medecin-dashboard.component/medecin-dashboard.component')
            .then((m) => m.MedecinDashboardComponent)
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

];

