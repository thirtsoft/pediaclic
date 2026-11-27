import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LoginResponse } from '@core/models/auth/login-response.model';
import { AuthService } from '@features/auth/services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    return true;
  }

  const user: LoginResponse | null = authService.getUtilisateurConnecte();

  if (!user) {
    authService.logout();
    return router.createUrlTree(['/auth/login']);
  }

  if (user.typeRole === 'SAAS_MANAGEMENT') {
    return router.createUrlTree(['/saas-managment-dashboard']);
  }

  if (user.role === null && user.onboardingStatus !== 'TERMINE') {
    return router.createUrlTree(['/onboarding']);
  }

  if (user.role === 'ADMIN_CABINET') {
    if (user.onboardingStatus !== 'TERMINE') {
      return router.createUrlTree(['/onboarding']);
    }

    return router.createUrlTree(['/cabinet-dashboard']);
  }

  if (user.role === 'MEDECIN_INDEPENDANT') {
    if (user.onboardingStatus !== 'TERMINE') {
      return router.createUrlTree(['/onboarding']);
    }

    return router.createUrlTree(['/medecin/dashboard']);
  }

  if (user.typeRole === 'CABINET' && user.entrepriseUuid !== null) {
    return router.createUrlTree(['/cabinet-dashboard']);
  }

  authService.logout();

  return router.createUrlTree(['/auth/login']);
};