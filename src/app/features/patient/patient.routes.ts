import { Routes } from '@angular/router';
import { PatientComponent } from './patient-component';

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    component: PatientComponent,
    children: [

      {
        path: '',
        loadComponent: () =>
          import('@features/patient/pages/patient-list-component/patient-list-component')
            .then((m) => m.PatientListComponent)
      },

      {
        path: 'create',
        loadComponent: () =>
          import('@features/patient/pages/ajouter-patient-component/ajouter-patient-component')
            .then((m) => m.AjouterPatientComponent)
      },

      {
        path: 'edit/:uuid',
        loadComponent: () =>
          import('@features/patient/pages/editer-patient-component/editer-patient-component')
            .then((m) => m.EditerPatientComponent)
      },


    ],
  },

];

