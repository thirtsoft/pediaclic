import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PlanAbonnementOnboardingResponse } from '@core/models/abonnement/plan-abonnement-onboarding-response.model';
import { CreerAbonnementRequest } from '@core/models/abonnement/creer-abonnement-request.model';
import { AbonnementResponse } from '@core/models/abonnement/abonnement-response.model';
import { ModifierStatutAbonnementRequest } from '@core/models/abonnement/modifier-statut-abonnement-request.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/abonnement`;

  rechercherPlansDisponibles(): Observable<PlanAbonnementOnboardingResponse[]> {
    return this.http.get<PlanAbonnementOnboardingResponse[]>(
      `${this.apiUrl}/plans`
    );
  }

  creer(request: CreerAbonnementRequest): Observable<AbonnementResponse> {
    return this.http.post<AbonnementResponse>(
      this.apiUrl,
      request
    );
  }

  rechercher(uuid: string): Observable<AbonnementResponse> {
    return this.http.get<AbonnementResponse>(
      `${this.apiUrl}/${uuid}`
    );
  }

  modifierStatut(uuid: string, request: ModifierStatutAbonnementRequest): Observable<AbonnementResponse> {
    return this.http.patch<AbonnementResponse>(
      `${this.apiUrl}/${uuid}/statut`,
      request
    );
  }
}