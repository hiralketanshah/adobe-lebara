type PortInStatus = "No" | "Yes" | "ExistingPhone";

export interface PostpaidDetails {
  pageTitle?: string;
  heading?:string;
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

export interface PostpaidDetailsErrors {
  emailRequiredMsg?: string;
  emailInValidMsg?: string;
  fNameRequiredMsg?: string;
  fNameInvalidMsg?: string;
  lNameRequiredMsg?: string;
  lNameInvalidMsg?: string;
  dayRequiredMsg?: string;
  dayInvalidMsg?: string;
  monthRequiredMsg?: string;
  monthInvalidMsg?: string;
  yearRequiredMsg?: string;
  yearInvalidMsg?: string;
  shippingAddress?: string;
  isAdvertisingAccepted?: string;
  portInStatus?: string;
  portInNumber?: string;
  currentProvider?: string;
  portInContractChecked?: string;
  portInConditionsAccepted?: string;
}

export interface PostpaidPersonalDetailsProps extends PostpaidDetails {}
