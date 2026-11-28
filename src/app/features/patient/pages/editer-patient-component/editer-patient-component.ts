import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { Sexe } from '@core/models/patient/sexe';
import { TypeRelation } from '@core/models/patient/type-relation';
import { PatientService } from '@features/patient/services/patient.service';

@Component({
  selector: 'app-editer-patient-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editer-patient-component.html',
  styleUrl: './editer-patient-component.scss',
})
export class EditerPatientComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly patientApi = inject(PatientService);
  private readonly destroyRef = inject(DestroyRef);

  readonly chargement = signal(true);
  readonly sauvegardeEnCours = signal(false);
  readonly erreur = signal<string | null>(null);

  readonly patientUuid = signal<string | null>(null);

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

    parents: this.fb.array([])
  });

  get parents(): FormArray {
    return this.form.controls.parents;
  }

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');

    if (!uuid) {
      this.erreur.set(
        'Identifiant du patient introuvable.'
      );

      this.chargement.set(false);
      return;
    }

    this.patientUuid.set(uuid);
    this.chargerPatient(uuid);
  }

  private chargerPatient(uuid: string): void {
    this.chargement.set(true);
    this.erreur.set(null);

    this.patientApi
      .getByUuid(uuid)
      .pipe(
        finalize(() => {
          this.chargement.set(false);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (patient) => {
          this.form.controls.patient.patchValue({
            nom: patient.nom,
            prenom: patient.prenom,
            dateNaissance: patient.dateNaissance,
            sexe: patient.sexe
          });

          this.parents.clear();

          patient.parents.forEach((relation) => {
            this.parents.push(
              this.creerParentForm({
                uuid: relation.parent.uuid,
                relationUuid: relation.uuid,
                nom: relation.parent.nom,
                prenom: relation.parent.prenom,
                telephone: relation.parent.telephone,
                email: relation.parent.email,
                typeRelation: relation.typeRelation
              })
            );
          });
        },

        error: (error) => {
          console.error(
            'Erreur lors du chargement du patient',
            error
          );

          this.erreur.set(
            error?.error?.message ??
            'Impossible de charger les informations du patient.'
          );
        }
      });
  }

  private creerParentForm(parent?: {
    uuid: string;
    relationUuid: string;
    nom: string;
    prenom: string;
    telephone: string;
    email: string | null;
    typeRelation: TypeRelation;
  }) {
    return this.fb.group({
      uuid: [parent?.uuid ?? ''],
      relationUuid: [parent?.relationUuid ?? ''],

      nom: [
        parent?.nom ?? '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      prenom: [
        parent?.prenom ?? '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      telephone: [
        parent?.telephone ?? '',
        [
          Validators.required,
          Validators.maxLength(30)
        ]
      ],

      email: [
        parent?.email ?? '',
        [
          Validators.email,
          Validators.maxLength(180)
        ]
      ],

      typeRelation: [
        parent?.typeRelation ?? null,
        Validators.required
      ]
    });
  }

  ajouterParent(): void {
    this.parents.push(
      this.creerParentForm({
        uuid: '',
        relationUuid: '',
        nom: '',
        prenom: '',
        telephone: '',
        email: null,
        typeRelation: 'MERE'
      })
    );
  }

  supprimerParent(index: number): void {
    if (this.parents.length <= 1) {
      return;
    }

    this.parents.removeAt(index);
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

    const uuid = this.patientUuid();

    if (!uuid) {
      this.erreur.set(
        'Identifiant du patient introuvable.'
      );

      return;
    }

    const value = this.form.getRawValue();

    const request = {
      nom: value.patient.nom!.trim(),
      prenom: value.patient.prenom!.trim(),
      dateNaissance: value.patient.dateNaissance!,
      sexe: value.patient.sexe!
    };

    this.sauvegardeEnCours.set(true);

    this.patientApi
      .modifier(uuid, request)
      .pipe(
        finalize(() => {
          this.sauvegardeEnCours.set(false);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          void this.router.navigate(['/patient']);
        },

        error: (error) => {
          console.error(
            'Erreur lors de la modification du patient',
            error
          );

          this.erreur.set(
            error?.error?.message ??
            'Une erreur est survenue lors de la modification du patient.'
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

  annuler(): void {
    void this.router.navigate(['/patient']);
  }
}