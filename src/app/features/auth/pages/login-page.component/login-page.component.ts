import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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

  readonly doctorChildImage = 'assets/landing/doctor-child.png';
  readonly logoImage = 'assets/landing/pediasaas-logo.png';

  backToHome = output<void>();

  accountType = signal<AccountType>('health_pro');
  showPassword = signal(false);
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
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

    const payload = {
      accountType: this.accountType(),
      ...this.loginForm.getRawValue()
    };

    setTimeout(() => {
      this.isSubmitting.set(false);
      console.log('Connexion PediaSaaS :', payload);
    }, 200);
    this.gotoOnboardingMetier();
  }

  onGoogleLogin(): void {
    this.errorMessage.set(null);
    console.log('Connexion Google pour le profil :', this.accountType());
  }

  gotoOnboardingMetier(): void {
    void this.router.navigate(['onboarding/metier'])
  }

  gotoRegistrer(): void {
    void this.router.navigate(['auth/register'])
  }

}