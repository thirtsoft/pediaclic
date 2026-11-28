export interface CreerParentRequest {
  nom: string;
  prenom: string;
  telephone: string;
  email?: string | null;
  adresse?: string | null;
}