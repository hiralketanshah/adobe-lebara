import { BaseFormFields } from "../Formik/types";
import { BaseValidationMessages } from "../Formik/validations/types";

export interface FormFields extends BaseFormFields {
  fNamePlaceholder?: string;
  consentDescription?: string;
  userProfilePhoto?: string;
  ctaCancelURL?: string;
  editLinkLabel?: string;
  emailEditLinkURL?: string;
  passwordEditLinkURL?: string;
  changeEmailHeading?: string;
}

export interface ValidationMessages extends BaseValidationMessages {}

export interface SuccessModalProps {
  heading?: string;
  description?: string;
  beforeEmailText?: string;
  afterEmailText?: string;
}
export interface UserDetailsProps {
  heading?: string;
  description?: string;
  sectionUsernameHeading?: string;
  sectionAddressHeading?: string;
  sectionEmailPasswordHeading?: string;
  sectionConsentHeading?: string;
  changeEmailHeading?: string;
  frmFields?: FormFields;
  validationMessages?: ValidationMessages;
  successEmailModal?: SuccessModalProps;
  changePasswordSuccessMsg?: string;
  settingsUpdatedLabel?: string;

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

export interface ChangePasswordProps {
  changePasswordHeading?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  frmFields?: FormFields;
  validationMessages?: ValidationMessages;
}

export const CompCPDefaultBindings = {
  changePasswordHeading: "Change Password",
  oldPasswordLabel: "Old Password",
  oldPasswordPlacehodler: "Enter Old Password",
  newPasswordLabel: "New Password",
  newPasswordPlacehodler: "Enter New Password",
  confirmPasswordPlacehodler: "Enter Confrim Password",
  confirmNewPasswordLabel: "Confirm Password",
  oldPasswordRequiredMsg: "Please enter a password",
  newPasswordRequiredMsg: "Please enter a password",
  confirmPasswordRequiredMsg: "Please enter a password",
  passwordNotMatchErrorMessage: "Confirm Password should be same as New Password.",
  ctaButtonLabel: "Save",
  ctaCancelLabel: "Cancel",
}

export interface ChangeEmailPasswordProfileProps {
  frmFields?: FormFields;
  onEmailEdit: () => void;
  onPasswordEdit: (e:any) => void;
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

interface ChangeEmailFormFields extends FormFields {
  newEmailLabel?: string;
  newEmailPlacehodler?: string;
  newConfirmEmailLabel?: string;
  newConfirmEmailPlacehodler?: string;
  ctaContinueLabel?: string;
}
interface ChangeEmailValidationMessages extends ValidationMessages {
  confirmEmailNotMatchMsg?: string;
}
export interface ChangeEmailProps extends UserDetailsProps {
  frmFields?: ChangeEmailFormFields;
  validationMessages?: ChangeEmailValidationMessages;
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
  successModal?: SuccessModalProps;
}


export interface ChangePasswordSuccessProps extends ModalProps {
  changePasswordSuccessMsg?: string;
}

