import { RecordStatus } from "@core/shared/record-status.model";
import { ProviderAuthentification } from "./provider-authentification.model";


export interface InscriptionResponse {
  utilisateurUuid: string;
  nom: string;
  prenom: string;
  email: string;
  providerAuthentification: ProviderAuthentification;
  onboardingRequis: boolean;
  recordStatus: RecordStatus;
  createdAt: string;
}