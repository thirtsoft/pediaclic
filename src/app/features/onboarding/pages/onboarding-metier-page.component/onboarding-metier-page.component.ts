import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type RoleCode = 'MEDECIN_INDEPENDANT' | 'ADMIN_CABINET';

export type ProfileType = 'independent_doctor' | 'clinic_admin';
export type PlanId = 'starter' | 'standard' | 'professional' | 'enterprise';

export interface ProfileOption {
  id: ProfileType;
  title: string;
  description: string;
}

export interface SubscriptionPlan {
  id: PlanId;
  name: string;
  tagline: string;
  priceMonthly: string;
  period: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
}

@Component({
  selector: 'app-onboarding-metier-page.component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './onboarding-metier-page.component.html',
  styleUrl: './onboarding-metier-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingMetierPageComponent {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly doctorChildImage = 'assets/landing/doctor-child.png';
  readonly logoImage = 'assets/landing/pediasaas-logo.png';

  readonly steps = [
    { number: 1, label: 'Votre rôle' },
    { number: 2, label: 'Votre entreprise' },
    { number: 3, label: 'Votre abonnement' },
    { number: 4, label: 'Validation' }
  ];

  readonly profileOptions: ProfileOption[] = [
    {
      id: 'independent_doctor',
      title: 'Médecin indépendant',
      description: 'Exercez seul votre activité'
    },
    {
      id: 'clinic_admin',
      title: 'Administrateur de cabinet',
      description: 'Gérez votre cabinet et votre équipe'
    }
  ];

  readonly plans: SubscriptionPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      tagline: 'Idéal pour démarrer sereinement',
      priceMonthly: '15 000 FCFA',
      period: '/ mois',
      features: [
        'Jusqu’à 200 dossiers patients',
        'Agenda & prise de rendez-vous',
        'Ordonnances numériques',
        'Support par e-mail'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      tagline: 'Pour une pratique pédiatrique régulière',
      priceMonthly: '29 000 FCFA',
      period: '/ mois',
      features: [
        'Patients illimités',
        'Courbes de croissance OMS & vaccins',
        'Rappels SMS automatiques',
        'Facturation & reçus patients'
      ]
    },
    {
      id: 'professional',
      name: 'Professionnel',
      tagline: 'Le choix complet des cabinets actifs',
      priceMonthly: '49 000 FCFA',
      period: '/ mois',
      badge: 'Populaire',
      highlighted: true,
      features: [
        'Tout le pack Standard',
        'Jusqu’à 5 praticiens & secrétaires',
        'Statistiques médicales avancées',
        'Support prioritaire 7j/7'
      ]
    },
    {
      id: 'enterprise',
      name: 'Entreprise',
      tagline: 'Cliniques & centres médicaux multi-sites',
      priceMonthly: 'Sur devis',
      period: '',
      features: [
        'Praticiens & postes illimités',
        'Gestion multi-cabinets centralisée',
        'API & intégrations sur mesure',
        'Accompagnement dédié sur site'
      ]
    }
  ];

  currentStep = signal<number>(1);
  selectedProfile = signal<ProfileType>('independent_doctor');
  selectedPlanId = signal<PlanId>('professional');
  acceptedTerms = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  isCompleted = signal<boolean>(false);

  companyForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    specialty: ['Pédiatrie générale', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    mobile: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    city: ['Dakar', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    registrationNumber: ['']
  });

  selectedProfileInfo = computed(() =>
    this.profileOptions.find(p => p.id === this.selectedProfile())!
  );

  selectedPlanInfo = computed(() =>
    this.plans.find(p => p.id === this.selectedPlanId())!
  );

  progressPercent = computed(() => ((this.currentStep() - 1) / (this.steps.length - 1)) * 100);

  selectProfile(profileId: ProfileType): void {
    this.selectedProfile.set(profileId);
  }

  selectPlan(planId: PlanId): void {
    this.selectedPlanId.set(planId);
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= this.currentStep()) {
      this.currentStep.set(step);
    }
  }

  nextStep(): void {
    const step = this.currentStep();

    if (step === 2 && this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      return;
    }

    if (step < 4) {
      this.currentStep.update(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  submitOnboarding(): void {
    if (!this.acceptedTerms()) {
      return;
    }

    this.isSubmitting.set(true);

    const payload = {
      profile: this.selectedProfile(),
      company: this.companyForm.getRawValue(),
      subscriptionPlan: this.selectedPlanId()
    };

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isCompleted.set(true);
      console.log('Configuration PediaSaaS validée :', payload);
    }, 900);
  }

  gotoDashboard() {
    void this.router.navigate(['medecin']);
  }
}