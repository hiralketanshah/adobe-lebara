import { FormLabelProps } from "@chakra-ui/react";

export interface FormikSelectOption {
  name: string;
  value: string;
}
export interface FormikSelectProps {
  name: string;
  flex?: number;
  label?: string;
  labelProps?: FormLabelProps;
  placeholder?: string;
  isRequired?: boolean;
  options: FormikSelectOption[];
  helperText?: string;
  isDisabled?: boolean;
}
