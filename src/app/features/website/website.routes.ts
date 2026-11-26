
import { Routes } from '@angular/router';
import { WebsiteComponent } from './website-component';
import { HomePageComponent } from '@features/website/pages/home-page.component/home-page.component';

export const WEBSITE_ROUTES: Routes = [

  {
    path: '',
    component: WebsiteComponent,
    title: 'Accueil Scoolli',
    children: [

      {
        path: '',
        component: HomePageComponent
      },

      {
        path: '',
        loadComponent: () =>
          import('@features/website/pages/home-page.component/home-page.component')
            .then((m) => m.HomePageComponent)
      },

      {
        path: 'demo',
        loadComponent: () =>
          import('@features/website/pages/demo-component/demo-component')
            .then((m) => m.DemoComponent)
      },

      {
        path: 'demande-demo',
        loadComponent: () =>
          import('@features/website/pages/demande-demo/demande-demo-component')
            .then((m) => m.DemandeDemoComponent)
      },
    ]

  }
];

