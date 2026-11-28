import { CreerParentPatientRequest } from "./create-parent-patient-request";
import { Sexe } from "./sexe";

export interface CreerPatientRequest {
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: Sexe;
  parents: CreerParentPatientRequest[];
}