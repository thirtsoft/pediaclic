import { FonctionnalitePlanResponse } from "./fonctionnalite-plan-response.model";

export interface PlanAbonnementOnboardingResponse {
  uuid: string;
  code: string;
  nom: string;
  description: string | null;
  prixMensuel: number;
  nombreUtilisateursMax: number;
  fonctionnalites: FonctionnalitePlanResponse[];
}