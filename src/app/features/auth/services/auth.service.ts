import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '@env/environment';

import { LoginRequest } from '@core/models/auth/login-request.model';
import { LoginResponse } from '@core/models/auth/login-response.model';
import { InscrireUtilisateurRequest } from '@core/models/auth/inscrire-utilisateur-request.model';
import { InscriptionResponse } from '@core/models/auth/inscription-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/auth`;

  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly AUTH_USER_KEY = 'auth_user';

  register(request: InscrireUtilisateurRequest): Observable<InscriptionResponse> {
    return this.http.post<InscriptionResponse>(
      `${this.apiUrl}/register`,
      request
    );
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request)
      .pipe(tap(response => this.enregistrerSession(response)));
  }

  enregistrerSession(response: LoginResponse): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, response.token);

    localStorage.setItem(this.AUTH_USER_KEY, JSON.stringify(response));
  }

  getToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getUtilisateurConnecte(): LoginResponse | null {
    const storedUser = localStorage.getItem(this.AUTH_USER_KEY);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as LoginResponse;
    } catch {
      this.logout();
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.AUTH_USER_KEY);
  }
}