import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-organization-step-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './organization-step-component.html',
  styleUrl: './organization-step-component.css',
})
export class OrganizationStepComponent {


}
