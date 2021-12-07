import { SelectOption } from "../Select/types";

export interface UsageDetailsProps {
  activityLasts: number;
  phoneCallDetails: PhoneProps[];
  smsDetails: SMSProps[];
  dataDetails: DataProps[];
  filterUsageOptions: SelectOption[];
  tabsName: string[];
  theme: string;
  defaultSeeMoreClicked?: boolean;
  isWhiteTabs?: boolean;
  title: string;
  description: string;
  ctaSeeMoreCallsLabel: string;
  ctaLoadMoreLabel: string;
  ctaSeeMoreURL: string;
  ctaTopupURL: string;
  ctaTopupText: string;
  durationLabel?: string;
}

export interface PhoneProps {
  phoneNumber: number;
  duration: string;
  currency: string;
  amount: string;
  callDate: string;
  // International || Roaming
  callingType: string;
}

export interface SMSProps {
  phoneNumber: string;
  smsCharges: string;
  smsTime: string;
}
export interface DataProps {
  cost: string;
  usedData: string;
  date: string;
}
