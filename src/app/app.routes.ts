import { Routes } from '@angular/router';

import { authGuard } from '@core/guards/auth.guard';
import { guestGuard } from '@core/guards/guest.guard';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      import('./features/website/website.routes')
        .then(m => m.WEBSITE_ROUTES)
  },

  {
    path: 'onboarding',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/onboarding/onboarding.routes')
        .then(m => m.ONBOARDING_ROUTES)
  },

  {
    path: 'medecin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/medecin/medecin.routes')
        .then(m => m.MEDECIN_ROUTES)
  },

  {
    path: 'cabinet-dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        '@features/cabinet/pages/cabinet-dashboard.component/cabinet-dashboard.component'
      ).then((m) => m.CabinetDashboardComponent)
  },

  {
    path: 'auth',
    canActivate: [guestGuard],
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