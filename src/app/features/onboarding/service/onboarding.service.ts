import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

import { OnboardingEntrepriseRequest } from '@core/models/onboarding/onboarding-entreprise-request.model';
import { OnboardingPlanRequest } from '@core/models/onboarding/onboarding-plan-request.model';
import { OnboardingRecapitulatifResponse } from '@core/models/onboarding/onboarding-recapitulatif-response.model';
import { OnboardingResponse } from '@core/models/onboarding/onboarding-response.model';
import { OnboardingRoleRequest } from '@core/models/onboarding/onboarding-role-request.model';
import { RoleOnboardingResponse } from '@core/models/onboarding/role-onboarding-response.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/onboarding`;
  private readonly roleUrl = `${environment.apiUrl}/roles`;

  rechercherPourUtilisateurConnecte(): Observable<OnboardingResponse> {
    return this.http.get<OnboardingResponse>(
      `${this.apiUrl}/me`
    );
  }

  choisirRole(request: OnboardingRoleRequest): Observable<OnboardingResponse> {
    return this.http.put<OnboardingResponse>(
      `${this.apiUrl}/role`,
      request
    );
  }

  rechercherRolesDisponibles(): Observable<RoleOnboardingResponse[]> {
    return this.http.get<RoleOnboardingResponse[]>(`${this.roleUrl}/onboarding`);
  }



  renseignerEntreprise(request: OnboardingEntrepriseRequest): Observable<OnboardingResponse> {
    return this.http.put<OnboardingResponse>(
      `${this.apiUrl}/entreprise`,
      request
    );
  }

  choisirPlan(request: OnboardingPlanRequest): Observable<OnboardingResponse> {
    return this.http.put<OnboardingResponse>(
      `${this.apiUrl}/plan`,
      request
    );
  }

  rechercherRecapitulatif(): Observable<OnboardingRecapitulatifResponse> {
    return this.http.get<OnboardingRecapitulatifResponse>(
      `${this.apiUrl}/recapitulatif`
    );
  }

  finaliserOnboarding(): Observable<OnboardingResponse> {
    return this.http.post<OnboardingResponse>(
      `${this.apiUrl}/terminer`,
      {}
    );
  }
}