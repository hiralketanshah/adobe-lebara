import { SelectOption } from "../Select/types";

export interface AboutLebaraProps {
	fileReferenceBackground?: string;
	imagePath?: string;
	pretitle?: string;
	description?: string;
	title?: string;
	linkURL?: string;
	actionsEnabled?: string;
	actions?: ButtonActionProps[];
}

export interface ButtonActionProps {
	title?: string;
	url?: string;
}

export interface TextBlockProps {
  slogan?: string;
  header?: string;
  subHeader?: string;
  buttonText?: string;
  linkURL?: string;
}

export interface SelectNumberAndOrderDetailsLayoutProps {
	heading?: string;
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
}