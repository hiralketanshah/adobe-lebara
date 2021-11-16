
import { BaseFormFields } from "../Formik/types";
import { BaseValidationMessages } from "../Formik/validations/types";

export interface FormFields extends BaseFormFields {
    ctaEditMobileLabel?: string;
    ctaContinueLabel?: string;
    ctaResendVerificationLabel?: string;
    ctaVerifyMobileLabel?: string; 
  }

export interface VerifyMobileNumberFormProps  {
  heading?: string;
  subHeading?: string;
  validationMessages?: BaseValidationMessages;
  frmFields: FormFields;
  successMessages?: {
    otpSentSuccessfullyMsg?: string;
  }
  timeCounter?: {
      label1: string;
      label2: string;
  }
}
