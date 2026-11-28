import { RecordStatus } from "@core/shared/record-status.model";

export interface ParentResponse {
  uuid: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string | null;
  recordStatus: RecordStatus;
}