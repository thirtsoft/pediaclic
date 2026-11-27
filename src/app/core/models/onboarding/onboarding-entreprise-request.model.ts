export interface OnboardingEntrepriseRequest {
  nom: string;
  telephone: string;
  email: string | null;
  adresse: string | null;
  specialite: string;
  numeroOrdreMedecin: string;
}