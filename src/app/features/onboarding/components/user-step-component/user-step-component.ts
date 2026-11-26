import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-step-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-step-component.html',
  styleUrl: './user-step-component.css',
})

export class UserStepComponent {

  /*
  private readonly fb = inject(FormBuilder);
  private readonly state = inject(OnboardingStateService);

  readonly form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required]]
  });

  constructor() {
    const request = this.state.request().onboardingUserRequest;
    if (request) {
      this.form.patchValue(request);
    }
  }

  get value(): OnboardingUserRequest {
    return this.form.getRawValue() as OnboardingUserRequest;
  }

  isValid(): boolean {
    return this.form.valid;
  }

  markTouched(): void {
    this.form.markAllAsTouched();

  }

  */
}
