import { OnboardingRecapitulatifFonctionnaliteResponse } from './onboarding-recapitulatif-fonctionnalite-response.model';

export interface OnboardingRecapitulatifResponse {
  roleUuid: string;
  roleCode: string;
  roleLibelle: string;

  nomEntreprise: string;
  telephone: string;
  email: string;
  adresse: string;

  planUuid: string;
  planCode: string;
  planNom: string;
  prixMensuel: number;
  nombreUtilisateursMax: number;

  fonctionnalites: OnboardingRecapitulatifFonctionnaliteResponse[];
}