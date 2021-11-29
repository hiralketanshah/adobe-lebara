import { FormLabelProps, InputProps } from "@chakra-ui/react";
import { FieldValidator } from "formik/dist/types";

export interface FormikPasswordProps {
  name: string;
  flex?: number;
  label?: string;
  labelProps?: FormLabelProps;
  inputProps?: InputProps;
  isRequired?: boolean;
  validate?: FieldValidator;
  removeValidation?: boolean;
  isShowHide?: boolean;
  isShowHideButton?: boolean;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
}
