import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { PageResponse } from '@core/shared/page-response.model';
import { PatientResponse } from '@core/models/patient/patient-response';
import { CreerPatientRequest } from '@core/models/patient/create-patient-request';
import { ModifierPatientRequest } from '@core/models/patient/modifier-patient-request';
import { RelationParentPatientResponse } from '@core/models/patient/relation-parent-patient-response';
import { ModifierParentRequest } from '@core/models/patient/modifier-parent-request';
import { ParentResponse } from '@core/models/patient/parent-response';
import { RelationParentPatientRequest } from '@core/models/patient/relation-parent-patient-request';
import { PatientListeResponse } from '@core/models/patient/patient-liste-response';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.apiUrl}/patients`;

  rechercher(recherche?: string, page = 0, size = 20, sort = 'nom,asc'): Observable<PageResponse<PatientListeResponse>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    if (recherche?.trim()) {
      params = params.set('recherche', recherche.trim());
    }

    return this.http.get<PageResponse<PatientListeResponse>>(
      this.baseUrl,
      { params }
    );
  }

  getByUuid(patientUuid: string): Observable<PatientResponse> {
    return this.http.get<PatientResponse>(
      `${this.baseUrl}/${patientUuid}`
    );
  }

  creer(request: CreerPatientRequest): Observable<PatientResponse> {
    return this.http.post<PatientResponse>(
      this.baseUrl,
      request
    );
  }

  modifier(patientUuid: string, request: ModifierPatientRequest): Observable<PatientResponse> {
    return this.http.put<PatientResponse>(
      `${this.baseUrl}/${patientUuid}`,
      request
    );
  }

  supprimer(patientUuid: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${patientUuid}`
    );
  }

  getParents(patientUuid: string): Observable<RelationParentPatientResponse[]> {
    return this.http.get<RelationParentPatientResponse[]>(
      `${this.baseUrl}/${patientUuid}/parents`
    );
  }

  getEnfants(parentUuid: string): Observable<PatientResponse[]> {
    return this.http.get<PatientResponse[]>(
      `${this.baseUrl}/${parentUuid}/enfants`
    );
  }

  modifierParent(parentUuid: string, request: ModifierParentRequest): Observable<ParentResponse> {
    return this.http.put<ParentResponse>(
      `${this.baseUrl}/parents/${parentUuid}`,
      request
    );
  }

  ajouterParentAuPatient(patientUuid: string, parentUuid: string, request: RelationParentPatientRequest): Observable<RelationParentPatientResponse> {
    return this.http.post<RelationParentPatientResponse>(
      `${this.baseUrl}/${patientUuid}/parents/${parentUuid}`,
      request
    );
  }
  supprimerRelation(relationUuid: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/relations/${relationUuid}`
    );
  }
}