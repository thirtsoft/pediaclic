import { ErrorCode } from './error-code.model';
import { ApiFieldError } from './api-field-error.model';

export interface ApiError {
  timestamp: string;
  status: number;
  code: ErrorCode;
  message: string;
  path: string;
  errors: ApiFieldError[];
}