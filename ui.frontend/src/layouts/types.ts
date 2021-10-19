import { SelectOption } from "../components/Select/types";
export interface SelectNumberAndOrderDetailsLayoutProps {
  heading?: string;
}
export interface BuyPlanLayoutProps {
  hideButton?: boolean;
  noPadding?: boolean;
  fullWidth?: boolean;
  maxW?: string;
  paymentButtonLabel?: string;
  paymentMethodLabel?: string;
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

export interface OrderDetailsProps extends deleteCartItemCmsProps, topupCreditCmsProps{
	consentLabel?: string;
	viewPlansLabel?: string;
	addVoucherCodeLabel?: string;
	autoRenewDesc?: string;
	applyVoucherLabel?: string;
	autoRenewLabel?: string;
	freeSimLabel?: string;
	steps?: string[];
	paymentButtonLabel?: string;
	paymentMethodLabel?: string;
	selectedProductLabel?: string;
	phoneNumberLabel?: string;
	enterVoucherCodeLabel?: string;
	grandTotalLabel?: string;
	removeLabel?: string;
	showDetailsLabel?: string;
	voucherCodeInvalidMessage?: string;
	voucherCodeExpiredMessage?: string;
	privacyPolicyLabel?: string;
	privacyPolicyLink?: string;
	voucherCodeDiscountLabel?: string;
  }

  export interface deleteCartItemCmsProps {
	deleteCartItemTitle?: string;
	deleteCartItemDesc?: string;
	deleteCartItemYesButtonLabel?: string;
	deleteCartItemNoButtonLabel?: string;
  }

  export interface topupCreditCmsProps {
	topUpCreditLabel?: string;
	topUpRecommendedLabel?: string;
	topUpCapLabel?: string;
	topUpCapDesc?: string;
  }