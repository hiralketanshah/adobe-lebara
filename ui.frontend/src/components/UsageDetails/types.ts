import { SelectOption } from "../Select/types";

export interface UsageDetailsProps {
  activityLasts: number;
  phoneCallDetails: PhoneProps[];
  smsDetails: SMSProps[];
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
}

export interface PhoneProps {
  phoneCode: number;
  phoneNumber: number;
  duration: string;
  currency: string;
  amount: string;
  callDate: string;
  callTime: string;
  avatarName: string;
  avatarSrc?: string;
  // International || Roaming
  callingType: string;
}

export interface SMSProps {
  phoneNumber: string;
  smsCharges: string;
  smsTime: string;
}
