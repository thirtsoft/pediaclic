import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InscrireUtilisateurRequest } from '@core/models/auth/inscrire-utilisateur-request.model';
import { AuthService } from '@features/auth/services/auth.service';

@Component({
  selector: 'app-register-page.component',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly logoImage = 'assets/landing/pediasaas-logo.png';
  readonly doctorChildImage = 'assets/landing/doctor-child.png';

  backToHome = output<void>();
  registerSubmitted = output<InscrireUtilisateurRequest>();

  showPassword = signal(false);
  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  registerForm = this.fb.nonNullable.group({
    nom: ['', [Validators.required, Validators.maxLength(100)]],
    prenom: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(180)
    ]],
    motDePasse: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(255)
    ]]
  });

  togglePasswordVisibility(): void {
    this.showPassword.update(visible => !visible);
  }

  onBackToHome(): void {
    this.backToHome.emit();
  }

  onSubmit(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const raw = this.registerForm.getRawValue();

    const payload: InscrireUtilisateurRequest = {
      nom: raw.nom.trim(),
      prenom: raw.prenom.trim(),
      email: raw.email.trim(),
      motDePasse: raw.motDePasse
    };

    this.registerSubmitted.emit(payload);

    this.authService.register(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);

        this.successMessage.set(
          'Compte créé avec succès. Vous pouvez maintenant vous connecter.'
        );

        setTimeout(() => {
          void this.router.navigate(['/auth/login']);
        }, 2500);

      },

      error: (error) => {
        this.isSubmitting.set(false);

        this.errorMessage.set(
          error?.error?.message ??
          'Une erreur est survenue lors de la création du compte.'
        );
      }
    });
  }
}