import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },

  {
    path: '',
    loadChildren: () =>
      import('./features/website/website.routes')
        .then(m => m.WEBSITE_ROUTES)
  },

  /*   {
    path: '',
    redirectTo: 'medecin-dashboard',
    pathMatch: 'full'
  }, */
  {
    path: 'medecin-dashboard',
    loadComponent: () =>
      import('@features/medecin/pages/medecin-dashboard.component/medecin-dashboard.component')
        .then((m) => m.MedecinDashboardComponent)
  },

  /*   {
      path: 'medecin',
      loadComponent: () =>
        import('@features/medecin/pages/tableau-medecin.component/tableau-medecin.component')
          .then((m) => m.TableauMedecinComponent)
    }, */

  {
    path: 'onboarding',
    loadChildren: () =>
      import('./features/onboarding/onboarding.routes')
        .then(m => m.ONBOARDING_ROUTES)
  },

  {
    path: 'medecin',
    loadChildren: () =>
      import('./features/medecin/medecin.routes')
        .then(m => m.MEDECIN_ROUTES)
  },


  {
    path: 'cabinet-dashboard',
    loadComponent: () =>
      import('@features/cabinet/pages/cabinet-dashboard.component/cabinet-dashboard.component')
        .then((m) => m.CabinetDashboardComponent)
  },


  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(m => m.AUTH_ROUTES)
  },

  {
    path: '**',
    redirectTo: ''
  },
];

export default routes;