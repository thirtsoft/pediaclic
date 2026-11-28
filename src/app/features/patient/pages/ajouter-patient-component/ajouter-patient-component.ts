import { Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { Sexe } from '@core/models/patient/sexe';
import { TypeRelation } from '@core/models/patient/type-relation';
import { PatientService } from '@features/patient/services/patient.service';

@Component({
  selector: 'app-ajouter-patient-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ajouter-patient-component.html',
  styleUrl: './ajouter-patient-component.scss',
})
export class AjouterPatientComponent {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly patientApi = inject(PatientService);

  readonly sauvegardeEnCours = signal(false);
  readonly erreur = signal<string | null>(null);

  readonly sexes: { value: Sexe; label: string }[] = [
    {
      value: 'MASCULIN',
      label: 'Masculin'
    },
    {
      value: 'FEMININ',
      label: 'Féminin'
    }
  ];

  readonly typesRelation: {
    value: TypeRelation;
    label: string;
  }[] = [
    {
      value: 'PERE',
      label: 'Père'
    },
    {
      value: 'MERE',
      label: 'Mère'
    },
    {
      value: 'TUTEUR',
      label: 'Tuteur'
    },
    {
      value: 'TUTRICE',
      label: 'Tutrice'
    },
    {
      value: 'GRAND_PARENT',
      label: 'Grand-parent'
    }
  ];

  readonly form = this.fb.group({
    patient: this.fb.group({
      nom: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      prenom: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      dateNaissance: [
        '',
        Validators.required
      ],

      sexe: [
        null as Sexe | null,
        Validators.required
      ]
    }),

    parents: this.fb.array([
      this.creerParentForm()
    ])
  });

  get parents(): FormArray {
    return this.form.controls.parents;
  }

  ajouterParent(): void {
    this.parents.push(
      this.creerParentForm()
    );
  }

  supprimerParent(index: number): void {
    if (this.parents.length <= 1) {
      return;
    }

    this.parents.removeAt(index);
  }

  annuler(): void {
    void this.router.navigate(['/patient']);
  }

  enregistrer(): void {
    this.erreur.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      this.erreur.set(
        'Veuillez vérifier les informations obligatoires.'
      );

      return;
    }

    const value = this.form.getRawValue();

    const request = {
      nom: value.patient.nom!.trim(),
      prenom: value.patient.prenom!.trim(),
      dateNaissance: value.patient.dateNaissance!,
      sexe: value.patient.sexe!,

      parents: value.parents.map(parent => ({
        parent: {
          nom: parent.nom!.trim(),
          prenom: parent.prenom!.trim(),
          telephone: parent.telephone!.trim(),
          email: parent.email?.trim() || null
        },

        relation: {
          typeRelation: parent.typeRelation!
        }
      }))
    };

    this.sauvegardeEnCours.set(true);

    this.patientApi
      .creer(request)
      .pipe(
        finalize(() => {
          this.sauvegardeEnCours.set(false);
        })
      )
      .subscribe({
        next: () => {
          void this.router.navigate(['/patient']);
        },

        error: (error) => {
          console.error(
            'Erreur lors de la création du patient',
            error
          );

          this.erreur.set(
            error?.error?.message ??
            'Une erreur est survenue lors de l’enregistrement du patient.'
          );
        }
      });
  }

  estInvalide(
    controlName: string,
    groupe: 'patient' | 'parent',
    index?: number
  ): boolean {

    if (groupe === 'patient') {
      const control =
        this.form.controls.patient.get(controlName);

      return !!control &&
        control.invalid &&
        (control.touched || control.dirty);
    }

    if (index === undefined) {
      return false;
    }

    const control =
      this.parents.at(index).get(controlName);

    return !!control &&
      control.invalid &&
      (control.touched || control.dirty);
  }

  private creerParentForm() {
    return this.fb.group({
      nom: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      prenom: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      telephone: [
        '',
        [
          Validators.required,
          Validators.maxLength(30)
        ]
      ],

      email: [
        '',
        [
          Validators.email,
          Validators.maxLength(180)
        ]
      ],

      typeRelation: [
        null as TypeRelation | null,
        Validators.required
      ]
    });
  }
}