import { RecordStatus } from "@core/shared/record-status.model";
import { ParentResponse } from "./parent-response";
import { TypeRelation } from "./type-relation";

export interface RelationParentPatientResponse {
  uuid: string;
  parent: ParentResponse;
  typeRelation: TypeRelation;
  recordStatus: RecordStatus;
}