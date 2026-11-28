import { CreerParentRequest } from "./create-parent-request";
import { RelationParentPatientRequest } from "./relation-parent-patient-request";

export interface CreerParentPatientRequest {
  parent: CreerParentRequest;
  relation: RelationParentPatientRequest;
}