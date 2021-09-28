import { SelectOption } from "../components/Select/types";
export interface SelectNumberAndOrderDetailsLayoutProps {
  heading?: string;
}
export interface BuyPlanLayoutProps {
  hideButton?: boolean;
  noPadding?: boolean;
  fullWidth?: boolean;
  maxW?: string;
}

export interface SimPortInProps {
	pretitle?: string,
	doitLaterButtonLabel?: string,
	title?: string,
	dobTitle?: string,
	dobDesc?: string,
	dayFieldLabel?: string,
	monthFieldLabel?: string,
	yearFieldLabel?: string,
	mobileNumberLabel?: string,
	mobileNumberDesc?: string,
	currentProviderLabel?: string,
	currentProviderDesc?: string,
	contractInfo?: string,
	portingInfo?: string,
	consentOne?: string,
	consentTwo?: string,
	dataProtectionMessage?: string,
	termsAndConditions?: string,
	continueButtonLabel?: string,
	cancelbuttonlabel?: string,
	dayFieldErrorMessage?: string,
	monthFieldErrorMessage?: string,
	yearFieldErrorMessage?: string,
	currentProviderErrorMessage?: string,
	mobileNumberErrorMessage?: string,
	mobileNumberMaxLength?: string,
	mobileNumberFieldPattern?: string,
	currentProvidersOptions?: SelectOption[];
  currentProviderDefaultSelectValue?: string;
}