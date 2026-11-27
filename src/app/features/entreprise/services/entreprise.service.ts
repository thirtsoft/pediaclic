import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { EntrepriseResponse } from '@core/models/entreprise/entreprise-response.model';
import { CreerEntrepriseRequest } from '@core/models/entreprise/creer-entreprise-request.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/entreprises`;

  creer(request: CreerEntrepriseRequest): Observable<EntrepriseResponse> {
    return this.http.post<EntrepriseResponse>(
      this.apiUrl,
      request
    );
  }

  rechercherParUuid(uuid: string): Observable<EntrepriseResponse> {
    return this.http.get<EntrepriseResponse>(
      `${this.apiUrl}/${uuid}`
    );
  }
}