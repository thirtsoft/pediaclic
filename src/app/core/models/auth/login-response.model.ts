import { OnboardingStatus } from "../onboarding/onboarding-status.model";
import { OnboardingStepCode } from "../onboarding/onboarding-step-code.model";
import { RoleType } from "./role-type.model";

export interface LoginResponse {
  token: string;
  type: string;
  utilisateurUuid: string;
  entrepriseUuid: string | null;
  role: string | null;
  typeRole: RoleType | null;
  permissions: string[];
  onboardingStatus: OnboardingStatus;
  onboardingStep: OnboardingStepCode;
}