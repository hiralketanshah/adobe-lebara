export interface PostpaidPersonalDetailsProps {}
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
