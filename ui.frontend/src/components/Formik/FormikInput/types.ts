import { FormLabelProps, InputProps } from "@chakra-ui/react";
import { FieldValidator } from "formik/dist/types";

export interface FormikInputProps {
  name: string;
  flex?: number;
  label?: string;
  labelProps?: FormLabelProps;
  inputProps?: InputProps;
  placeholder?: string;
  isRequired?: boolean;
  validate?: FieldValidator;
  loginButtonLabel? : string;
  exitingUserErrorMsg?: string;
  secondSubscriptionDisplayText?: string;
  revealInputToggle?: boolean;
  onClick?: () => void;
  isPrepaid?: boolean;
  ignoreValidations?: boolean;
}
