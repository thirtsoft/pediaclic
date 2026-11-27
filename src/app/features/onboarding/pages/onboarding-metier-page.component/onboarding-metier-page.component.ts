import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RoleOnboardingResponse } from '@core/models/onboarding/role-onboarding-response.model';
import { OnboardingRoleRequest } from '@core/models/onboarding/onboarding-role-request.model';
import { OnboardingEntrepriseRequest } from '@core/models/onboarding/onboarding-entreprise-request.model';
import { OnboardingPlanRequest } from '@core/models/onboarding/onboarding-plan-request.model';
import { OnboardingRecapitulatifResponse } from '@core/models/onboarding/onboarding-recapitulatif-response.model';
import { PlanAbonnementOnboardingResponse } from '@core/models/abonnement/plan-abonnement-onboarding-response.model';
import { OnboardingService } from '@features/onboarding/service/onboarding.service';
import { AbonnementService } from '@features/abonnement/services/abonnement.service';

@Component({
  selector: 'app-onboarding-metier-page.component',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './onboarding-metier-page.component.html',
  styleUrl: './onboarding-metier-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingMetierPageComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly onboardingService = inject(OnboardingService);
  private readonly abonnementService = inject(AbonnementService);

  readonly doctorChildImage = 'assets/landing/doctor-child.png';

  readonly logoImage = 'assets/landing/pediasaas-logo.png';

  readonly steps = [
    {
      number: 1,
      label: 'Votre rôle'
    },
    {
      number: 2,
      label: 'Votre entreprise'
    },
    {
      number: 3,
      label: 'Votre abonnement'
    },
    {
      number: 4,
      label: 'Validation'
    }
  ];

  acceptedTerms = signal<boolean>(false);

  isLoadingRoles = signal<boolean>(false);

  isLoadingPlans = signal<boolean>(false);

  isLoadingRecapitulatif = signal<boolean>(false);

  isSubmitting = signal<boolean>(false);

  isCompleted = signal<boolean>(false);

  errorMessage = signal<string | null>(null);


  currentStep = signal<number>(1);

  roles = signal<RoleOnboardingResponse[]>([]);

  plans = signal<PlanAbonnementOnboardingResponse[]>([]);

  recapitulatif = signal<OnboardingRecapitulatifResponse | null>(null);

  selectedRoleUuid = signal<string | null>(null);

  selectedRole = computed<RoleOnboardingResponse | null>(() => {
    const uuid = this.selectedRoleUuid();

    if (!uuid) {
      return null;
    }
    return (this.roles().find(role => role.uuid === uuid) ?? null);
  });

  selectedPlanUuid = signal<string | null>(null);

  selectedPlan = computed<PlanAbonnementOnboardingResponse | null>(() => {
    const uuid = this.selectedPlanUuid();

    if (!uuid) {
      return null;
    }

    return (this.plans().find(plan => plan.uuid === uuid) ?? null);
  });

  companyForm = this.fb.nonNullable.group({
    nom: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150)
      ]
    ],

    specialite: [
      'Pédiatrie générale',
      [
        Validators.maxLength(150)
      ]
    ],

    telephone: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
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

    numeroOrdreMedecin: [
      '',
      [
        Validators.maxLength(50)
      ]
    ],

    adresse: [
      '',
      [
        Validators.maxLength(255)
      ]
    ]
  });

  progress = computed(() => {
    return (this.currentStep() / this.steps.length) * 100;
  });

  ngOnInit(): void {
    this.chargerRoles();
  }

  chargerRoles(): void {
    this.isLoadingRoles.set(true);
    this.errorMessage.set(null);

    this.onboardingService
      .rechercherRolesDisponibles()
      .subscribe({
        next: roles => {
          this.roles.set(roles);
          this.isLoadingRoles.set(false);
        },

        error: error => {
          this.isLoadingRoles.set(false);

          this.errorMessage.set(
            this.extraireMessageErreur(
              error,
              'Impossible de charger les profils professionnels.'
            )
          );
        }
      });
  }

  selectRole(role: RoleOnboardingResponse): void {
    this.selectedRoleUuid.set(role.uuid);
    this.errorMessage.set(null);
  }

  selectPlan(plan: PlanAbonnementOnboardingResponse): void {
    this.selectedPlanUuid.set(plan.uuid);
    this.errorMessage.set(null);
  }


  nextStep(): void {
    this.errorMessage.set(null);

    switch (this.currentStep()) {

      case 1:
        this.validerEtapeRole();
        return;

      case 2:
        this.validerEtapeEntreprise();
        return;

      case 3:
        this.validerEtapePlan();
        return;

      default:
        return;
    }
  }

  private validerEtapeRole(): void {
    const roleUuid = this.selectedRoleUuid();

    if (!roleUuid) {
      this.errorMessage.set('Veuillez sélectionner votre profil professionnel.');
      return;
    }

    const request: OnboardingRoleRequest = {
      roleUuid
    };

    this.isSubmitting.set(true);

    this.onboardingService
      .choisirRole(request)
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.currentStep.set(2);
          this.errorMessage.set(null);
        },

        error: error => {
          this.isSubmitting.set(false);

          this.errorMessage.set(
            this.extraireMessageErreur(
              error, 'Impossible d’enregistrer votre profil professionnel.'
            )
          );
        }
      });
  }

  private validerEtapeEntreprise(): void {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      this.errorMessage.set('Veuillez vérifier les informations renseignées.');
      return;
    }

    const raw = this.companyForm.getRawValue();

    const request: OnboardingEntrepriseRequest = {
      nom: raw.nom.trim(),
      telephone: raw.telephone.trim(),
      email: raw.email.trim(),
      adresse: raw.adresse.trim(),
      specialite: raw.specialite.trim(),
      numeroOrdreMedecin: raw.numeroOrdreMedecin.trim()
    };

    this.isSubmitting.set(true);

    this.onboardingService
      .renseignerEntreprise(request)
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.currentStep.set(3);
          this.errorMessage.set(null);

          this.chargerPlans();
        },

        error: error => {
          this.isSubmitting.set(false);

          this.errorMessage.set(
            this.extraireMessageErreur(
              error, 'Impossible d’enregistrer les informations du cabinet.'
            )
          );
        }
      });
  }

  private chargerPlans(): void {
    this.isLoadingPlans.set(true);
    this.errorMessage.set(null);

    this.abonnementService
      .rechercherPlansDisponibles()
      .subscribe({
        next: plans => {
          this.plans.set(plans);
          this.isLoadingPlans.set(false);
        },

        error: error => {
          this.isLoadingPlans.set(false);

          this.errorMessage.set(
            this.extraireMessageErreur(
              error, 'Impossible de charger les offres disponibles.'
            )
          );
        }
      });
  }

  private validerEtapePlan(): void {
    const planUuid = this.selectedPlanUuid();

    if (!planUuid) {
      this.errorMessage.set('Veuillez sélectionner une formule d’abonnement.');
      return;
    }

    const request: OnboardingPlanRequest = {
      planUuid
    };

    this.isSubmitting.set(true);

    this.onboardingService
      .choisirPlan(request)
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.errorMessage.set(null);
          this.currentStep.set(4);

          this.chargerRecapitulatif();
        },

        error: error => {
          this.isSubmitting.set(false);

          this.errorMessage.set(
            this.extraireMessageErreur(
              error, 'Impossible d’enregistrer votre formule d’abonnement.'
            )
          );
        }
      });
  }

  private chargerRecapitulatif(): void {
    this.isLoadingRecapitulatif.set(true);
    this.errorMessage.set(null);

    this.onboardingService
      .rechercherRecapitulatif()
      .subscribe({
        next: recapitulatif => {
          this.recapitulatif.set(recapitulatif);
          this.isLoadingRecapitulatif.set(false);
        },

        error: error => {
          this.isLoadingRecapitulatif.set(false);

          this.errorMessage.set(
            this.extraireMessageErreur(
              error, 'Impossible de charger le récapitulatif de votre configuration.'
            )
          );
        }
      });
  }

  toggleAcceptedTerms(): void {
    this.acceptedTerms.update(value => !value);
    this.errorMessage.set(null);
  }

  submitOnboarding(): void {
    this.errorMessage.set(null);

    if (!this.acceptedTerms()) {
      this.errorMessage.set('Veuillez accepter les conditions d’utilisation pour continuer.');
      return;
    }

    this.isSubmitting.set(true);

    this.onboardingService
      .finaliserOnboarding()
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.isCompleted.set(true);
        },

        error: error => {
          this.isSubmitting.set(false);

          this.errorMessage.set(
            this.extraireMessageErreur(
              error, 'Impossible de finaliser votre configuration.'
            )
          );
        }
      });
  }

  gotoDashboard(): void {
    const roleCode = this.selectedRole()?.code;

    if (roleCode === 'MEDECIN_INDEPENDANT') {
      void this.router.navigate(['/medecin/dashboard']);
      return;
    }

    if (roleCode === 'ADMIN_CABINET') {
      void this.router.navigate(['/cabinet-dashboard']);
      return;
    }

    void this.router.navigate(['/cabinet-dashboard']);
  }

  previousStep(): void {
    if (this.currentStep() <= 1 || this.isSubmitting()) {
      return;
    }

    this.errorMessage.set(null);

    this.currentStep.update(step => step - 1);
  }

  getRoleIllustrationClass(role: RoleOnboardingResponse): string {
    return role.code === 'MEDECIN_INDEPENDANT'
      ? 'profile-card__illustration--doctor'
      : 'profile-card__illustration--cabinet';
  }

  formatPrix(prix: number): string {
    return new Intl.NumberFormat('fr-FR').format(prix);
  }

  private extraireMessageErreur(error: any, messageParDefaut: string): string {
    const apiMessage = error?.error?.message;

    if (typeof apiMessage === 'string' && apiMessage.trim().length > 0) {
      return apiMessage;
    }

    return messageParDefaut;
  }
}