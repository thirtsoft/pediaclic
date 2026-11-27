import { TypeEntreprise } from './type-entreprise.model';

export interface CreerEntrepriseRequest {
  code: string;
  nom: string;
  type: TypeEntreprise;
  email: string | null;
  telephone: string | null;
  adresse: string | null;
}