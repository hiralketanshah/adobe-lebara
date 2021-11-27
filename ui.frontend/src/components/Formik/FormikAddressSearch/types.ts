export interface FormikAddressSearchProps {
  name: string;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  country?: string;
  postalCodeText?: string;
  onChange?: (value: any) => void;
}
