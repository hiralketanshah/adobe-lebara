import { SelectOptionTypeString } from '../Select/types';

export interface AddressCardProps {
  title?: string;
  initialStatus: AddressStatus;
  searchAddressText?: string;
  searchAddressSubText?: string;
  currentAddress?: string;
  addressesResult?: string[];
  value?: string;
  setValue?: (value: any) => void;
  padding?: boolean;
  formikForm?: any;
  onSetManual?: () => void;
  addressLabel?: string;
  streetLabel:string;
  streetPlaceholder:string;
  houseNumberLabel:string;
  houseNumberPlaceholder:string;
  zipCodeLabel:string;
  zipCodePlaceholder:string;
  cityLabel:string;
  postalcodePlaceholder:string;
  cityPlaceholder:string;
  cities:SelectOptionTypeString[];
  enterAddressManually: string;
  keyInAddress?: string;
  saveAddress: string;
  postalCodeText: string;
  country?: string;
  onSetAutomatic: () => void;
  onAddressChange: (value: any) => void;
  isDisabled?: boolean;
}

export type AddressStatus =
  | "Initial"
  | "SearchNewAddress"
  | "SearchNewAddressWithResults"
  | "SingleSearchResult"
  | "NewAddress";
