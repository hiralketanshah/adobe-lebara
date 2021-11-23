
import { BaseFormFields } from "../../Formik/types";
import { BaseValidationMessages } from "../../Formik/validations/types";

export interface FormFields extends BaseFormFields {
    verifyCodeLabel?:string;
    verifyCodePlaceholder?:string;
    ctaEditMobileLabel?: string;
    ctaContinueLabel?: string;
    ctaResendVerificationLabel?: string;
    ctaVerifyMobileLabel?: string; 
}
export interface ValidationMessages extends BaseValidationMessages {
    verifyCodeRequiredMsg?:string;
    verifyCodeInvalidMsg?:string;
}

export interface VerifyMobileNumberProps  {
  heading?: string;
  subHeading?: string;
  initalCountdownValue?: number;
  validationMessages?: ValidationMessages;
  frmFields: FormFields;
  successMessages?: {
    otpSentSuccessfullyMsg?: string;
  }
  timeCounter?: {
      label1: string;
      label2: string;
  }
}
