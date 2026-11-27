import { Routes } from '@angular/router';
import { AuthComponent } from './auth-component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page.component/forgot-password-page.component';


export const AUTH_ROUTES: Routes = [

  {
    path: '',
    component: AuthComponent,
    children: [

      {
        path: 'login',
        loadComponent: () =>
          import('@features/auth/pages/login-page.component/login-page.component')
            .then((m) => m.LoginPageComponent)
      },

      {
        path: 'register',
        loadComponent: () =>
          import('@features/auth/pages/register-page.component/register-page.component')
            .then((m) => m.RegisterPageComponent)
      },

      {
        path: 'mot-de-passe-oublie',
        loadComponent: () =>
          import('@features/auth/pages/forgot-password-page.component/forgot-password-page.component')
            .then((m) => m.ForgotPasswordPageComponent)
      },

      {

        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ]
  }

];
