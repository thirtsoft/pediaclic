import { OnboardingStatus } from './onboarding-status.model';
import { OnboardingStepCode } from './onboarding-step-code.model';

export interface OnboardingResponse {
  uuid: string;
  utilisateurUuid: string;
  entrepriseUuid: string | null;
  onboardingStatus: OnboardingStatus;
  currentStep: OnboardingStepCode;
  startedAt: string;
  completedAt: string | null;
  lastActivityAt: string;
  errorCode: string | null;
  errorMessage: string | null;
}