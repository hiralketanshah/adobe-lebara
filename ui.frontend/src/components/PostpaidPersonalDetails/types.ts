import { BaseFormFields } from "../Formik/types";
import { BaseValidationMessages } from "../Formik/validations/types";

type PortInStatus = "No" | "Yes" | "ExistingPhone";
export interface PostpaidDetails {
  email?: string;
  firstName?: string;
  lastName?: string;
  day?: string;
  month?: string;
  year?: string;
  shippingAddress?: {
    label: string;
    value: {
      place_id: string;
    };
  };
  isAdvertisingAccepted?: boolean;
  portInStatus?: PortInStatus;
  portInNumber?: string;
  currentProvider?: string;
  portInContractChecked?: boolean;
  portInConditionsAccepted?: boolean;
}

export interface ValidationMessages extends BaseValidationMessages {
  portInNumberRequiredMsg?: string;
  portInNumberInValidMsg?: string;
  currentProviderRequiredMsg?: string;
}
export interface PortInOptionsFields {
  label: string;
  value: string;
}
export interface FormFields extends BaseFormFields {
  portInOptions: PortInOptionsFields[];
}

export interface PostpaidDetailsErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  day?: string;
  month?: string;
  year?: string;
  shippingAddress?: string;
  isAdvertisingAccepted?: string;
  portInStatus?: string;
  portInNumber?: string;
  currentProvider?: string;
  portInContractChecked?: string;
  portInConditionsAccepted?: string;
}

export interface PostpaidPersonalDetailsProps {
  pageTitle?: string;
  heading?:string;
  validationMessages: ValidationMessages;
  frmFields: FormFields;
  portingSectionHeading?: string;
}
