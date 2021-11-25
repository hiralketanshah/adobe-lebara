import { BaseFormFields } from "../Formik/types";
import { BaseValidationMessages } from "../Formik/validations/types";

export interface FormFields extends BaseFormFields {
  consentDescription?: string;
  userProfilePhoto?: string;
  ctaCancelURL?: string;
  editLinkLabel?: string;
  emailEditLinkURL?: string;
  passwordEditLinkURL?: string;
}
export interface ValidationMessages extends BaseValidationMessages {

}
export interface UserDetailsProps {
  // New
  heading?: string;
  description?: string;
  sectionUsernameHeading?: string;
  sectionAddressHeading?: string;
  sectionEmailPasswordHeading?: string;
  sectionConsentHeading?: string;
  frmFields?: FormFields;
  validationMessages?: ValidationMessages;

  // Old
  userName?: string;
  userSurname?: string;
  streetName?: string;
  houseNumber?: string;
  postCode?: string;
  city?: string;
  alternateContactNumber?: number;
  emailAddress?: string;
  password?: string;
  informedEmail?: boolean;
  informedSms?: boolean;
  informedPhone?: boolean;
  selectedPartnerEmail?: boolean;
  selectedParterSms?: boolean;
  userInfo?: string;
}

export interface UserProfileSchema {
  email?: string;
  password?: string;
}

export interface ChangePasswordSchema {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ChangeEmailPasswordProfileProps {
  frmFields?: FormFields;
  onEmailEdit: () => void;
  onPasswordEdit: () => void;
}

export interface ModalProps {
  isOpen: any;
  onClose: () => void;
}

export interface ChangeEmailMobileProps {
  isOpen: any;
  onClose: () => void;
  mobile: string;
  onPinSend: () => void;
}

export interface ChangeEmailPinSendProps {
  isOpen: any;
  onClose: () => void;
  mobile: string;
}

export interface PinSendSchema {
  pin?: string;
}

export interface ChangeEmailProps {
  isOpen: any;
  onClose: (status?: boolean, email?: string) => void;
}

export interface ChangeEmailSchema {
  email?: string;
  confirmEmail?: string;
}

export interface ChangeEmailSuccessProps {
  email?: string;
  isOpen: any;
  onClose: () => void;
}
