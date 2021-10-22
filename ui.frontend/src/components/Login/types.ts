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
export interface loginModuleProps {
  loginModuleType : string;
  loginLabel : string;
  loginEmailAddressLabel : string;
  loginPasswordLabel : string;
  loginForgotPassWordmsg : string;
  loginResetLinkTextLabel : string;
  loginResetLinkLabel : string;
  loginButton : string;
  loginRegistrationMessage : string;
  loginRegistrationCtaLabel : string;
  loginRegistrationCtaLink : string;
  registrationLabel : string;
  registrationEmailAddress : string;
  registrationPassword :string;
  registrationConfirmPassword : string;
  registrationContinueButton : string;
  registrationMessage : string;
  registrationCtaLabel : string;
  registrationCtaLink : string;
  showLabel : string;
  hideLabel : string;
  guestLoginLabel : string;
  guestEmailAddressLabel : string;
  guestMobileNumberLabel : string;
  guestForgotPasswordMsg : string;
  guestResetLinkTextLabel : string;
  guestResetLinkLabel : string;
  guestContinueLabel : string;
  emailFieldErrorMessage : string;
  validEmailFieldErrorMessage : string;
  passwordFieldErrorMessage : string;
  confirmPasswordFieldErrorMessage : string;
  validMobileNumberErrorMessage : string;
  mobileNumberNotMatchErrorMessage : string;
  mobileNumberMaxLength : string;
  mobileNumberFieldPattern : string;
}
export interface LoginTabsProps extends TabProps, loginModuleProps {
  icon?: IconType;
  isPasswordResetSucessfull?: boolean;
}
