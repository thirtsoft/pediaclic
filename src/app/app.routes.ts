import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'medecin-dashboard',
    pathMatch: 'full'
  },
  {
    path: 'medecin-dashboard',
    loadComponent: () =>
      import('@features/medecin/pages/medecin-dashboard.component/medecin-dashboard.component')
        .then((m) => m.MedecinDashboardComponent)
  },

  {
    path: 'medecin',
    loadComponent: () =>
      import('@features/medecin/pages/tableau-medecin.component/tableau-medecin.component')
        .then((m) => m.TableauMedecinComponent)
  },


  {
    path: 'cabinet-dashboard',
    loadComponent: () =>
      import('@features/cabinet/pages/cabinet-dashboard.component/cabinet-dashboard.component')
        .then((m) => m.CabinetDashboardComponent)
  },
  {
    path: '**',
    redirectTo: 'medecin-dashboard'
  }
];

export default routes;