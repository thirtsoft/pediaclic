import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  role: any;
  actions: any;
  code: any;
  token: any;

  /*
  private readonly localStorage = inject(LocalStorageService);
  private readonly router = inject(Router);
  private readonly roleService = inject(RoleService);


  afterLoginSuccessful(response: SignInResponse, urlNavigation: string) {


  }

  private saveUserData(response: SignInResponse): void {
    const userData = {
      token: response.token,
      id: response.id,
      matricule: response.typeCompte,
      email: response.email,
      name: response.name,
      typeUtilisateur: response.typeCompte
    };

    Object.entries(userData).forEach(([key, value]) => {
      if (value) {
        this.localStorage.setItem(key, value);
      }
    });
  }

  private redirectAfterLogin(role: string, fallbackUrl?: string): void {
    if (fallbackUrl && fallbackUrl !== '/' && fallbackUrl !== '') {
      this.router.navigateByUrl(fallbackUrl);
      return;
    }

    const route = this.roleService.getRouteForRole(role);
    this.router.navigateByUrl(route);
  }

  logout(): void {
    this.localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  */
}
