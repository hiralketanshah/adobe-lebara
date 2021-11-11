export type PortInStatus = "No" | "Yes" | "ExistingPhone";
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
}
