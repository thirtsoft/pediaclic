import { RecordStatus } from '@core/shared/record-status.model';
import { StatutAbonnement } from './statut-abonnement.model';

export interface AbonnementResponse {
  uuid: string;
  entrepriseUuid: string;
  planUuid: string;
  dateDebut: string;
  dateFin: string;
  statut: StatutAbonnement;
  recordStatus: RecordStatus;
  createdAt: string;
  updatedAt: string;
}