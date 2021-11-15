import { SelectOptionTypeString } from '../Select/types';

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

export interface ValidationMessages {
  emailRequiredMsg?: string;
  emailInValidMsg?: string;
  fNameRequiredMsg?: string;
  fNameInValidMsg?: string;
  lNameRequiredMsg?: string;
  lNameInValidMsg?: string;
  dayRequiredMsg?: string;
  dayInValidMsg?: string;
  monthRequiredMsg?: string;
  monthInValidMsg?: string;
  yearRequiredMsg?: string;
  yearInValidMsg?: string;
  yearInvalidAgeMsg?: string;
  shippingRequiredMsg?: string;
  portInNumberRequiredMsg?: string;
  portInNumberInValidMsg?: string;
  currentProviderRequiredMsg?: string;
}
export interface PortInOptionsFields {
  label: string;
  value: string;
}
export interface CurrentProviderListFields {
  name: string;
  value: string;
}
export interface FormFields {
  emailLabel?: string;
  emailPlaceholder?: string;
  fNameLabel?: string;
  fnamePlaceholder?: string;
  lNameLabel?: string;
  lNamePlaceholder?: string;
  dobLabel?: string;
  dayLabel?: string;
  dayPalceholder?: string;
  monthLabel?: string;
  monthPlaceholder?: string;
  yearLabel?: string;
  yearPlaceholder?: string;
  shippingLabel?: string;
  shippingPlaceholder?: string;
  streetLabel: string;
  streetPlaceholder:string;
  houseNumberLabel:string;
  houseNumberPlaceholder:string;
  zipCodeLabel:string;
  zipCodePlaceholder:string;
  cityLabel:string;
  postalcodePlaceholder:string;
  cityPlaceholder:string;
  cities: SelectOptionTypeString[];
  addressErrorRequired:string;
  streetLabelErrorMax:string;
  streetLabelErrorRequired:string;
  streetLabelErrorPattern:string;
  houseNumberErrorMax:string;
  houseNumberErrorRequired:string;
  houseNumberErrorPattern:string;
  zipCodeErrorMax:string;
  zipCodeErrorRequired:string;
  zipCodeErrorPattern:string;
  zipCodeErrorMin:string;
  cityErrorMax:string;
  cityErrorRequired:string;
  enterAddressManually: string;
  keyInAddress: string;
  saveAddress: string;
  addressKeyInText:string;
  emailAddressAlreadyExistMsg?: string;

  portInNumberLabel?: string;
  portInNumberPlaceHolder?: string;
  consentPreviewText?: string;
  consentDescription?: string;
  portingNumberLabel?: string;
  portInOptions: PortInOptionsFields[];
  currentProviderList: CurrentProviderListFields[];
  currentProviderHelperText?: string;
  currentProviderLabel?: string;
  currentProviderPlaceholder?: string;
  currentProviderInfoDescription?: string;
  currentProviderInfoLinkLabel?: string;
  currentProviderInfoLinkURL?: string;
  currentProviderUsageAcceptanceLabel?: string;
  currentProviderAdvertisingAcceptanceLabel?: string;
  currentProviderAdvertisingPreviewText?: string;
  exitingPhoneHelperLabel?: string;
  linkCTALabel?: string;
  buttonCTALabel?: string;
  ctaContinueLabel?: string;
  orTextLabel?: string;
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
  heading?:string;
  validationMessages: ValidationMessages;
  frmFields: FormFields;
  portingSectionHeading?: string;
}
