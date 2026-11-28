import { RecordStatus } from "@core/shared/record-status.model";
import { Sexe } from "./sexe";
import { RelationParentPatientResponse } from "./relation-parent-patient-response";

export interface PatientResponse {
  uuid: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: Sexe;
  recordStatus: RecordStatus;
  parents: RelationParentPatientResponse[];
}