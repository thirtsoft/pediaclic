import { Sexe } from "./sexe";

export interface ModifierPatientRequest {
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: Sexe;
}