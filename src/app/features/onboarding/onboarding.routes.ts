import { Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding-component';
export const ONBOARDING_ROUTES: Routes = [

  {
    path: '',
    component: OnboardingComponent,
    children: [

      {
        path: 'start',
        loadComponent: () =>
          import('@features/onboarding/pages/onboarding-metier-page.component/onboarding-metier-page.component')
            .then((m) => m.OnboardingMetierPageComponent)
      },

      {
        path: 'metier',
        loadComponent: () =>
          import('@features/onboarding/pages/start-onboarding-component/start-onboarding-component')
            .then((m) => m.StartOnboardingComponent)
      },

      {
        path: 'tenant',
        loadComponent: () =>
          import('@features/onboarding/pages/tenant/list-tenant-component/list-tenant-component')
            .then((m) => m.ListTenantComponent)
      },

      {
        path: 'process',
        loadComponent: () =>
          import('@features/onboarding/pages/process/list-onboarding-precess-component/list-onboarding-precess-component')
            .then((m) => m.ListOnboardingPrecessComponent)
      },

      {
        path: 'success',
        loadComponent: () =>
          import('@features/onboarding/components/success-step-component/success-step-component')
            .then((m) => m.SuccessStepComponent)
      },
    ],
  },
];

