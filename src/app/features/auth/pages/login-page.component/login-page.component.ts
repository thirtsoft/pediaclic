import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { LoginRequest } from '@core/models/auth/login-request.model';
import { LoginResponse } from '@core/models/auth/login-response.model';
import { AuthService } from '@features/auth/services/auth.service';

export type AccountType = 'health_pro' | 'company';

@Component({
  selector: 'app-login-page.component',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly doctorChildImage = 'assets/landing/doctor-child.png';
  readonly logoImage = 'assets/landing/pediasaas-logo.png';

  backToHome = output<void>();

  accountType = signal<AccountType>('health_pro');
  showPassword = signal(false);
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.nonNullable.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]],
    rememberMe: [false]
  });

  setAccountType(type: AccountType): void {
    this.accountType.set(type);
    this.errorMessage.set(null);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(visible => !visible);
  }

  onBackToHome(): void {
    this.backToHome.emit();
  }

  onSubmit(): void {
    this.errorMessage.set(null);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const raw = this.loginForm.getRawValue();

    const payload: LoginRequest = {
      email: raw.email.trim(),
      motDePasse: raw.password
    };

    this.authService.login(payload).subscribe({
      next: (response: LoginResponse) => {
        this.isSubmitting.set(false);

        this.redirigerApresConnexion(response);
      },

      error: (error) => {
        this.isSubmitting.set(false);

        this.errorMessage.set(
          error?.error?.message ??
          'Email ou mot de passe incorrect.'
        );
      }
    });
  }

  onGoogleLogin(): void {
    this.errorMessage.set(null);
  }

  private redirigerApresConnexion(response: LoginResponse): void {

    if (response.typeRole === 'SAAS_MANAGEMENT') {
      void this.router.navigate(['/saas-managment-dashboard']);
      return;
    }

    if (response.role === null && response.onboardingStatus !== 'TERMINE') {
      void this.router.navigate(['/onboarding/start']);
      return;
    }

    if (response.role === 'ADMIN_CABINET') {

      if (response.onboardingStatus !== 'TERMINE') {
        void this.router.navigate(['/onboarding/start']);
        return;
      }

      void this.router.navigate(['/cabinet-dashboard']);
      return;
    }

    if (response.role === 'MEDECIN_INDEPENDANT') {

      if (response.onboardingStatus !== 'TERMINE') {
        void this.router.navigate(['/onboarding/start']);
        return;
      }

      void this.router.navigate(['/medecin/dashboard']);
      return;
    }

    if (response.typeRole === 'CABINET' && response.entrepriseUuid !== null) {
      void this.router.navigate(['/cabinet-dashboard']);
      return;
    }

    this.authService.logout();

    this.errorMessage.set(
      'Votre compte ne peut pas être ouvert pour le moment. Veuillez contacter le support.'
    );
  }

  gotoOnboardingMetier(): void {
    void this.router.navigate(['/onboarding/metier']);
  }

  gotoRegistrer(): void {
    void this.router.navigate(['/auth/register']);
  }
}