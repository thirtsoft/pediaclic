//import { RecordStatus } from "@core/shared/record-status.model";
import { RecordStatus } from "@core/shared/record-status.model";
import { Sexe } from "./sexe";

export interface PatientListeResponse {
  uuid: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: Sexe;
  parentPrincipal: string | null;
  telephoneParentPrincipal: string | null;
  recordStatus: RecordStatus;
}