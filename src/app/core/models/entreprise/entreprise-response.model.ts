import { RecordStatus } from '@core/shared/record-status.model';
import { TypeEntreprise } from './type-entreprise.model';

export interface EntrepriseResponse {
  uuid: string;
  code: string;
  nom: string;
  type: TypeEntreprise;
  email: string | null;
  telephone: string | null;
  adresse: string | null;
  recordStatus: RecordStatus;
  createdAt: string;
  updatedAt: string;
}