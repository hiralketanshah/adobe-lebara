import { TabProps } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
export interface LoginFormSchema {
    email?: string;
    password?: string;
}
export interface GuestFormSchema {
    email?: string;
    lebaraMobile?: string;
    confirmLebaraMobile?: string;
}
export interface RegisterFormSchema {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface CreatePasswordFormSchema {
  pin: string;
  newPassword: string;
  reenterNewPassword: string;
}

export interface ResetPasswordSchema {
}

export interface CreateNewPasswordSchema {
  mobileNumber?: string;
  emailAddress?: string;
  pinRequiredValidationMsg?: string;
  pinLengthValidationMsg?: string;
  pwdRequiredValidationMsg?: string;
  pwdMinValdiationMsg?: string;
  pwdMaxValdiationMsg?: string;
  pwdConfirmMatchValidationMsg?: string;
  pwdConfirmRequiredValidationMsg?: string;
  pwdMinHint: string;
  alertSuccessSuffixMsg?: string;
  compHeading?: string;
  compHeadingDescription?: string;
  compResendPinText?: string;
  frmLabelPin?: string;
  frmLabelNewPwd?: string;
  frmLabelReEnterNewPwd?: string;
  frmPwd?: string;
  frmBtnPrimaryLabel?: string;
  frmBtnSecondaryLabel?: string;
  hideLabel?: string;
  showLabel?: string;
}

export interface loginModuleProps {
  loginModuleType : string;
  loginTabLabel : string;
  loginEmailAddressLabel : string;
  loginEmailMobileErrMessage: string;
  loginPasswordLabel : string;
  loginForgotPassWordmsg : string;
  loginResetLinkLabel : string;
  loginButton : string;
  extraBlockLoginText? : string;
  extraBlockLoginLinkText? : string;
  registrationTabLabel : string;
  registrationEmailAddress : string;
  registrationPassword :string;
  registrationConfirmPassword : string;
  registrationCtaLabel : string;
  registrationCtaLink : string;
  showLabel : string;
  hideLabel : string;
  extraBlockRegisterText? : string;
  extraBlockRegisterLinkText? : string;
  guestTabLabel : string;
  guestEmailAddressLabel : string;
  guestMobileNumberLabel : string;
  guestMobileNumberConfirmLabel: string;
  guestContinueLabel : string;
  emailFieldErrorMessage : string;
  validEmailFieldErrorMessage : string;
  passwordFieldErrorMessage : string;
  confirmPasswordFieldErrorMessage : string;
  validMobileNumberErrorMessage : string;
  mobileNumberNotMatchErrorMessage : string;
  mobileNumberMaxLength : string;
  mobileNumberFieldPattern : string;
  confirmPasswordFieldErrorMsg: string;
  errorEmailPatternValidMsg: string;
  errorPasswordPatternMinMsg: string;
  errorConfirmPasswordPatternNotMatchMsg: string;
  resetPwdTitle: string;
  resetPwdDescription: string;
  resetPwdEmailLabel: string;
  resetPwdMobileLabel: string;
  resetPwdButtonLabel: string;
  resetPwdButtonCancelLabel: string;
  extraBlockGuestText?: string;
  extraBlockGuestLinkText?: string;
}
export interface LoginTabsProps extends TabProps, loginModuleProps {
  icon?: IconType;
  isPasswordResetSucessfull?: boolean;
}